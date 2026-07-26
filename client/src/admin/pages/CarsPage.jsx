import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi, mediaUrl } from '../api'

export default function CarsPage() {
  const [cars, setCars] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await adminApi.cars()
        if (alive) setCars(Array.isArray(data) ? data : [])
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
    if (!confirm('Delete this car?')) return
    try {
      await adminApi.deleteCar(id)
      setCars((prev) => prev.filter((car) => car.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p className="admin-empty">Loading cars…</p>

  return (
    <>
      <div className="admin-toolbar">
        <Link to="/admin/cars/new" className="admin-btn admin-btn--primary">
          + Add car
        </Link>
      </div>

      {error ? <div className="admin-error">{error}</div> : null}

      {cars.length === 0 ? (
        <p className="admin-empty">No cars yet.</p>
      ) : (
        cars.map((car) => (
          <article key={car.id} className="admin-card">
            <div className="admin-card__row">
              {car.picture_url ? (
                <img className="admin-thumb" src={mediaUrl(car.picture_url)} alt="" />
              ) : (
                <div className="admin-thumb" />
              )}
              <div style={{ flex: 1 }}>
                <h2 className="admin-card__title">{car.name}</h2>
                <p className="admin-card__meta">
                  {car.car_type} · {car.model || '—'} · {car.capacity} seats
                </p>
                <p className="admin-card__meta">{car.registration_number}</p>
                <p className="admin-card__meta">{car.is_available ? 'Available' : 'Unavailable'}</p>
              </div>
            </div>
            <div className="admin-toolbar" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
              <Link to={`/admin/cars/${car.id}/edit`} className="admin-btn admin-btn--ghost">
                Edit
              </Link>
              <button type="button" className="admin-btn admin-btn--danger" onClick={() => onDelete(car.id)}>
                Delete
              </button>
            </div>
          </article>
        ))
      )}
    </>
  )
}
