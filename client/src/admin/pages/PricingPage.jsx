import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../api'

export default function PricingPage() {
  const [pricings, setPricings] = useState([])
  const [cars, setCars] = useState([])
  const [routes, setRoutes] = useState([])
  const [form, setForm] = useState({ car_id: '', route_id: '', price: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const [p, c, r] = await Promise.all([adminApi.pricings(), adminApi.cars(), adminApi.routes()])
      setPricings(Array.isArray(p) ? p : [])
      setCars(Array.isArray(c) ? c : [])
      setRoutes(Array.isArray(r) ? r : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function onCreate(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await adminApi.createPricing({
        car_id: Number(form.car_id),
        route_id: Number(form.route_id),
        price: Number(form.price),
      })
      setForm({ car_id: '', route_id: '', price: '' })
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function onDelete(id) {
    if (!confirm('Delete this price?')) return
    try {
      await adminApi.deletePricing(id)
      setPricings((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p className="admin-empty">Loading pricing…</p>

  return (
    <>
      <Link to="/admin/more" className="admin-btn admin-btn--ghost admin-btn--sm">
        ← More
      </Link>

      {error ? <div className="admin-error" style={{ marginTop: '0.75rem' }}>{error}</div> : null}

      <h3 className="admin-section-title">Add price</h3>
      <form className="admin-card" onSubmit={onCreate}>
        <div className="admin-field">
          <label htmlFor="car_id">Car</label>
          <select
            id="car_id"
            value={form.car_id}
            onChange={(e) => setForm((prev) => ({ ...prev, car_id: e.target.value }))}
            required
          >
            <option value="">Select car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="route_id">Route</label>
          <select
            id="route_id"
            value={form.route_id}
            onChange={(e) => setForm((prev) => ({ ...prev, route_id: e.target.value }))}
            required
          >
            <option value="">Select route</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="price">Price (SAR)</label>
          <input
            id="price"
            type="number"
            min="1"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
            required
          />
        </div>
        <button className="admin-btn admin-btn--primary admin-btn--block" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Add pricing'}
        </button>
      </form>

      <h3 className="admin-section-title">All prices</h3>
      {pricings.length === 0 ? (
        <p className="admin-empty">No pricing rows yet.</p>
      ) : (
        pricings.map((item) => (
          <article key={item.id} className="admin-card">
            <div className="admin-card__row">
              <div>
                <h2 className="admin-card__title">SAR {item.price}</h2>
                <p className="admin-card__meta">{item.car?.name || `Car #${item.car_id}`}</p>
                <p className="admin-card__meta">{item.route?.name || `Route #${item.route_id}`}</p>
              </div>
              <button type="button" className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => onDelete(item.id)}>
                Delete
              </button>
            </div>
          </article>
        ))
      )}
    </>
  )
}
