import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminApi, mediaUrl } from '../api'

const CAR_TYPES = ['SUV', 'Sedan', 'Van', 'Coaster']

const empty = {
  name: '',
  model: '',
  capacity: 4,
  registration_number: '',
  car_type: 'Sedan',
  is_available: true,
}

export default function CarFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [picture, setPicture] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    let alive = true
    ;(async () => {
      try {
        const car = await adminApi.car(id)
        if (!alive) return
        setForm({
          name: car.name || '',
          model: car.model || '',
          capacity: car.capacity || 4,
          registration_number: car.registration_number || '',
          car_type: car.car_type || 'Sedan',
          is_available: Boolean(car.is_available),
        })
        setPreview(mediaUrl(car.picture_url))
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
      const fd = new FormData()
      fd.append('car[name]', form.name)
      fd.append('car[model]', form.model)
      fd.append('car[capacity]', String(form.capacity))
      fd.append('car[registration_number]', form.registration_number)
      fd.append('car[car_type]', form.car_type)
      fd.append('car[is_available]', form.is_available ? 'true' : 'false')
      if (picture) fd.append('car[picture]', picture)

      if (isEdit) await adminApi.updateCar(id, fd)
      else await adminApi.createCar(fd)

      navigate('/admin/cars')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="admin-empty">Loading…</p>

  return (
    <>
      <Link to="/admin/cars" className="admin-btn admin-btn--ghost admin-btn--sm">
        ← Back
      </Link>

      <form className="admin-card" style={{ marginTop: '0.75rem' }} onSubmit={onSubmit}>
        {error ? <div className="admin-error">{error}</div> : null}

        {preview ? <img className="admin-thumb" src={preview} alt="" style={{ width: '100%', height: 160, marginBottom: '0.75rem' }} /> : null}

        <div className="admin-field">
          <label htmlFor="name">Name</label>
          <input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} required />
        </div>
        <div className="admin-field">
          <label htmlFor="model">Model</label>
          <input id="model" value={form.model} onChange={(e) => update('model', e.target.value)} />
        </div>
        <div className="admin-field">
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            type="number"
            min="1"
            value={form.capacity}
            onChange={(e) => update('capacity', Number(e.target.value))}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="registration_number">Registration number</label>
          <input
            id="registration_number"
            value={form.registration_number}
            onChange={(e) => update('registration_number', e.target.value)}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="car_type">Type</label>
          <select id="car_type" value={form.car_type} onChange={(e) => update('car_type', e.target.value)}>
            {CAR_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field admin-field--check">
          <input
            id="is_available"
            type="checkbox"
            checked={form.is_available}
            onChange={(e) => update('is_available', e.target.checked)}
          />
          <label htmlFor="is_available">Available</label>
        </div>
        <div className="admin-field">
          <label htmlFor="picture">Picture</label>
          <input
            id="picture"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null
              setPicture(file)
              if (file) setPreview(URL.createObjectURL(file))
            }}
          />
        </div>

        <button className="admin-btn admin-btn--primary admin-btn--block" type="submit" disabled={saving}>
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create car'}
        </button>
      </form>
    </>
  )
}
