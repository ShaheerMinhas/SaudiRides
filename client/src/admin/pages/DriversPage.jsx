import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../api'

export default function DriversPage() {
  const [drivers, setDrivers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await adminApi.drivers()
        if (alive) setDrivers(Array.isArray(data) ? data : [])
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

  async function onDelete(id) {
    if (!confirm('Delete this driver?')) return
    try {
      await adminApi.deleteDriver(id)
      setDrivers((prev) => prev.filter((driver) => driver.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p className="admin-empty">Loading drivers…</p>

  return (
    <>
      <div className="admin-toolbar">
        <Link to="/admin/drivers/new" className="admin-btn admin-btn--primary">
          + Add driver
        </Link>
      </div>

      {error ? <div className="admin-error">{error}</div> : null}

      {drivers.length === 0 ? (
        <p className="admin-empty">No drivers yet.</p>
      ) : (
        drivers.map((driver) => (
          <article key={driver.id} className="admin-card">
            <div className="admin-card__row">
              <div>
                <h2 className="admin-card__title">{driver.name}</h2>
                <p className="admin-card__meta">
                  <a href={`tel:${driver.phone}`}>{driver.phone}</a>
                </p>
                <p className="admin-card__meta">Car: {driver.car?.name || 'Unassigned'}</p>
                <p className="admin-card__meta">
                  {driver.availability_status ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>
            <div className="admin-toolbar" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
              <Link to={`/admin/drivers/${driver.id}/edit`} className="admin-btn admin-btn--ghost">
                Edit
              </Link>
              <button type="button" className="admin-btn admin-btn--danger" onClick={() => onDelete(driver.id)}>
                Delete
              </button>
            </div>
          </article>
        ))
      )}
    </>
  )
}
