import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminApi } from '../api'

const empty = {
  name: '',
  origin: '',
  destination: '',
  route_type: 'standard',
  is_active: true,
  stopsText: '',
}

export default function RouteFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [existingStops, setExistingStops] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    let alive = true
    ;(async () => {
      try {
        const route = await adminApi.route(id)
        if (!alive) return
        const stops = (route.route_stops || []).sort((a, b) => a.stop_order - b.stop_order)
        setExistingStops(stops)
        setForm({
          name: route.name || '',
          origin: route.origin || '',
          destination: route.destination || '',
          route_type: route.route_type || 'standard',
          is_active: Boolean(route.is_active),
          stopsText: stops.map((s) => s.stop_name).join('\n'),
        })
      } catch (err) {
        if (alive) setError(err.message)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [id, isEdit])

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const stopNames = form.stopsText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

      const payload = {
        name: form.name,
        origin: form.origin,
        destination: form.destination,
        route_type: form.route_type,
        is_active: form.is_active,
      }

      if (form.route_type === 'ziyarat') {
        const kept = stopNames.map((stop_name, index) => {
          const existing = existingStops[index]
          return existing
            ? { id: existing.id, stop_name, stop_order: index + 1 }
            : { stop_name, stop_order: index + 1 }
        })
        const destroyed = existingStops.slice(stopNames.length).map((stop) => ({
          id: stop.id,
          _destroy: true,
        }))
        payload.route_stops_attributes = [...kept, ...destroyed]
      } else if (existingStops.length) {
        payload.route_stops_attributes = existingStops.map((stop) => ({
          id: stop.id,
          _destroy: true,
        }))
      }

      if (isEdit) await adminApi.updateRoute(id, payload)
      else await adminApi.createRoute(payload)

      navigate('/admin/routes')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="admin-empty">Loading…</p>

  return (
    <>
      <Link to="/admin/routes" className="admin-btn admin-btn--ghost admin-btn--sm">
        ← Back
      </Link>

      <form className="admin-card" style={{ marginTop: '0.75rem' }} onSubmit={onSubmit}>
        {error ? <div className="admin-error">{error}</div> : null}

        <div className="admin-field">
          <label htmlFor="name">Name</label>
          <input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} required />
        </div>
        <div className="admin-field">
          <label htmlFor="origin">Origin</label>
          <input id="origin" value={form.origin} onChange={(e) => update('origin', e.target.value)} required />
        </div>
        <div className="admin-field">
          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            value={form.destination}
            onChange={(e) => update('destination', e.target.value)}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="route_type">Type</label>
          <select id="route_type" value={form.route_type} onChange={(e) => update('route_type', e.target.value)}>
            <option value="standard">standard</option>
            <option value="ziyarat">ziyarat</option>
          </select>
        </div>
        <div className="admin-field admin-field--check">
          <input
            id="is_active"
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => update('is_active', e.target.checked)}
          />
          <label htmlFor="is_active">Active</label>
        </div>

        {form.route_type === 'ziyarat' ? (
          <div className="admin-field">
            <label htmlFor="stops">Stops (one per line)</label>
            <textarea
              id="stops"
              value={form.stopsText}
              onChange={(e) => update('stopsText', e.target.value)}
              placeholder={'Jabal al-Noor\nCave of Hira'}
            />
          </div>
        ) : null}

        <button className="admin-btn admin-btn--primary admin-btn--block" type="submit" disabled={saving}>
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create route'}
        </button>
      </form>
    </>
  )
}
