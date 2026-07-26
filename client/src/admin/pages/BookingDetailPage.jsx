import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { adminApi } from '../api'

const STATUS_OPTIONS = ['new', 'in_progress', 'complete', 'cancelled']

export default function BookingDetailPage() {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)
  const [drivers, setDrivers] = useState([])
  const [driverId, setDriverId] = useState('')
  const [status, setStatus] = useState('new')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const [b, d] = await Promise.all([adminApi.booking(id), adminApi.drivers()])
      setBooking(b)
      setDrivers(Array.isArray(d) ? d : [])
      setDriverId(b.driver_id || '')
      setStatus(b.status || 'new')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  async function onAssign(e) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')
    try {
      const updated = await adminApi.assignDriver(id, driverId || null)
      setBooking((prev) => ({ ...prev, ...updated }))
      setStatus(updated.status || 'in_progress')
      setMessage('Driver assigned')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function onStatus(e) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')
    try {
      const updated = await adminApi.updateBookingStatus(id, status)
      setBooking((prev) => ({ ...prev, ...updated }))
      setMessage('Status updated')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="admin-empty">Loading…</p>
  if (!booking) return <div className="admin-error">{error || 'Booking not found'}</div>

  return (
    <>
      <Link to="/admin/bookings" className="admin-btn admin-btn--ghost admin-btn--sm">
        ← Back
      </Link>

      {error ? <div className="admin-error" style={{ marginTop: '0.75rem' }}>{error}</div> : null}
      {message ? (
        <div className="admin-card" style={{ marginTop: '0.75rem', color: 'var(--admin-ok)' }}>
          {message}
        </div>
      ) : null}

      <article className="admin-card" style={{ marginTop: '0.75rem' }}>
        <div className="admin-card__row">
          <h2 className="admin-card__title">{booking.customer_name}</h2>
          <span className={`admin-badge admin-badge--${booking.status}`}>
            {booking.status?.replace('_', ' ')}
          </span>
        </div>
        <dl className="admin-detail-grid">
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${booking.customer_phone}`}>{booking.customer_phone}</a>
            </dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{booking.customer_email}</dd>
          </div>
          <div>
            <dt>Route</dt>
            <dd>{booking.route?.name || '—'}</dd>
          </div>
          <div>
            <dt>Car</dt>
            <dd>{booking.car?.name || '—'}</dd>
          </div>
          <div>
            <dt>Driver</dt>
            <dd>{booking.driver?.name || 'Unassigned'}</dd>
          </div>
          <div>
            <dt>Pickup</dt>
            <dd>
              {booking.pickup_date} {String(booking.pickup_time || '').slice(11, 16) || booking.pickup_time}
            </dd>
          </div>
          <div>
            <dt>From</dt>
            <dd>{booking.pickup_location}</dd>
          </div>
          <div>
            <dt>To</dt>
            <dd>{booking.dropoff_location}</dd>
          </div>
          <div>
            <dt>Passengers</dt>
            <dd>{booking.passenger_count}</dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd>SAR {booking.price}</dd>
          </div>
        </dl>
        {booking.special_instructions ? (
          <p className="admin-card__meta">{booking.special_instructions}</p>
        ) : null}
      </article>

      <h3 className="admin-section-title">Assign driver</h3>
      <form className="admin-card" onSubmit={onAssign}>
        <div className="admin-field">
          <label htmlFor="driver">Driver</label>
          <select id="driver" value={driverId} onChange={(e) => setDriverId(e.target.value)} required>
            <option value="">Select driver</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name} · {driver.phone}
              </option>
            ))}
          </select>
        </div>
        <button className="admin-btn admin-btn--primary admin-btn--block" type="submit" disabled={saving}>
          Assign & set in progress
        </button>
      </form>

      <h3 className="admin-section-title">Update status</h3>
      <form className="admin-card" onSubmit={onStatus}>
        <div className="admin-field">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
        <button className="admin-btn admin-btn--primary admin-btn--block" type="submit" disabled={saving}>
          Save status
        </button>
      </form>
    </>
  )
}
