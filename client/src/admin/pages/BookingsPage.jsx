import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../api'

const STATUSES = ['all', 'new', 'in_progress', 'complete', 'cancelled']

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await adminApi.bookings()
        if (alive) setBookings(Array.isArray(data) ? data : [])
      } catch (err) {
        if (alive) setError(err.message)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return bookings
    return bookings.filter((b) => b.status === filter)
  }, [bookings, filter])

  if (loading) return <p className="admin-empty">Loading bookings…</p>
  if (error) return <div className="admin-error">{error}</div>

  return (
    <>
      <div className="admin-chip-row">
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            className={`admin-chip${filter === status ? ' is-active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="admin-empty">No bookings yet.</p>
      ) : (
        filtered.map((booking) => (
          <Link key={booking.id} to={`/admin/bookings/${booking.id}`} className="admin-list-link">
            <article className="admin-card">
              <div className="admin-card__row">
                <div>
                  <h2 className="admin-card__title">{booking.customer_name}</h2>
                  <p className="admin-card__meta">{booking.customer_phone}</p>
                  <p className="admin-card__meta">
                    {booking.route?.name || 'Route'} · {booking.car?.name || 'Car'}
                  </p>
                  <p className="admin-card__meta">
                    {booking.pickup_date} · SAR {booking.price}
                  </p>
                </div>
                <span className={`admin-badge admin-badge--${booking.status}`}>
                  {booking.status.replace('_', ' ')}
                </span>
              </div>
            </article>
          </Link>
        ))
      )}
    </>
  )
}
