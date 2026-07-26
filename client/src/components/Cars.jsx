import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { mediaUrl, publicApi } from '../api/public'

export default function Cars() {
  const { t } = useLanguage()
  const [cars, setCars] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await publicApi.cars()
        if (alive) setCars(Array.isArray(data) ? data : [])
      } catch {
        if (alive) setError('Could not load cars')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <section className="section" id="cars">
      <div className="section__header">
        <h2 className="section__title">{t.cars.title}</h2>
        <p className="section__subtitle">{t.cars.subtitle}</p>
      </div>

      {loading ? <p className="section__subtitle">…</p> : null}
      {error ? <p className="section__subtitle">{error}</p> : null}

      <div className="cars-grid">
        {cars.map((car) => (
          <article key={car.id} className="car-card">
            {car.picture_url ? (
              <div className="car-card__media">
                <img
                  className="car-card__image"
                  src={mediaUrl(car.picture_url)}
                  alt={car.name}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="car-card__icon">🚗</div>
            )}
            <h3 className="car-card__name">{car.name}</h3>
            <p className="car-card__desc">
              {car.car_type}
              {car.model ? ` · ${car.model}` : ''} · {car.capacity} seats
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
