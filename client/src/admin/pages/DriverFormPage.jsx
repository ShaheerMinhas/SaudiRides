import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminApi } from '../api'

const empty = {
  name: '',
  phone: '',
  car_id: '',
  availability_status: true,
}

export default function DriverFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [cars, setCars] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const carList = await adminApi.cars()
        if (!alive) return
        setCars(Array.isArray(carList) ? carList : [])

        if (isEdit) {
          const driver = await adminApi.driver(id)
          setForm({
            name: driver.name || '',
            phone: driver.phone || '',
            car_id: driver.car_id || '',
            availability_status: Boolean(driver.availability_status),
          })
        }
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
      const payload = {
        name: form.name,
        phone: form.phone,
        car_id: form.car_id || null,
        availability_status: form.availability_status,
      }
      if (isEdit) await adminApi.updateDriver(id, payload)
      else await adminApi.createDriver(payload)
      navigate('/admin/drivers')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="admin-empty">Loading…</p>

  return (
    <>
      <Link to="/admin/drivers" className="admin-btn admin-btn--ghost admin-btn--sm">
        ← Back
      </Link>

      <form className="admin-card" style={{ marginTop: '0.75rem' }} onSubmit={onSubmit}>
        {error ? <div className="admin-error">{error}</div> : null}

        <div className="admin-field">
          <label htmlFor="name">Name</label>
          <input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} required />
        </div>
        <div className="admin-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="car_id">Assigned car</label>
          <select id="car_id" value={form.car_id} onChange={(e) => update('car_id', e.target.value)}>
            <option value="">None</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name} · {car.registration_number}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field admin-field--check">
          <input
            id="availability_status"
            type="checkbox"
            checked={form.availability_status}
            onChange={(e) => update('availability_status', e.target.checked)}
          />
          <label htmlFor="availability_status">Available</label>
        </div>

        <button className="admin-btn admin-btn--primary admin-btn--block" type="submit" disabled={saving}>
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create driver'}
        </button>
      </form>
    </>
  )
}
