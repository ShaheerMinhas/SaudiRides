import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../api'

export default function RoutesPage() {
  const [routes, setRoutes] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await adminApi.routes()
        if (alive) setRoutes(Array.isArray(data) ? data : [])
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
    if (!confirm('Delete this route?')) return
    try {
      await adminApi.deleteRoute(id)
      setRoutes((prev) => prev.filter((route) => route.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p className="admin-empty">Loading routes…</p>

  return (
    <>
      <div className="admin-toolbar">
        <Link to="/admin/routes/new" className="admin-btn admin-btn--primary">
          + Add route
        </Link>
      </div>

      {error ? <div className="admin-error">{error}</div> : null}

      {routes.length === 0 ? (
        <p className="admin-empty">No routes yet.</p>
      ) : (
        routes.map((route) => (
          <article key={route.id} className="admin-card">
            <div className="admin-card__row">
              <div>
                <h2 className="admin-card__title">{route.name}</h2>
                <p className="admin-card__meta">
                  {route.origin} → {route.destination}
                </p>
                <p className="admin-card__meta">
                  {route.route_type} · {route.is_active ? 'Active' : 'Inactive'}
                </p>
                {route.route_stops?.length ? (
                  <p className="admin-card__meta">
                    Stops: {route.route_stops.map((s) => s.stop_name).join(', ')}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="admin-toolbar" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
              <Link to={`/admin/routes/${route.id}/edit`} className="admin-btn admin-btn--ghost">
                Edit
              </Link>
              <button type="button" className="admin-btn admin-btn--danger" onClick={() => onDelete(route.id)}>
                Delete
              </button>
            </div>
          </article>
        ))
      )}
    </>
  )
}
