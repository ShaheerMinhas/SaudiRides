import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { publicApi } from '../api/public'

export default function Routes() {
  const { t } = useLanguage()
  const [routes, setRoutes] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await publicApi.routes({ route_type: 'standard' })
        if (alive) setRoutes(Array.isArray(data) ? data : [])
      } catch {
        if (alive) setError('Could not load routes')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <section className="section section--alt" id="routes">
      <div className="section__header">
        <h2 className="section__title">{t.routes.title}</h2>
        <p className="section__subtitle">{t.routes.subtitle}</p>
      </div>

      {loading ? <p className="section__subtitle">…</p> : null}
      {error ? <p className="section__subtitle">{error}</p> : null}

      <ul className="routes-list">
        {routes.map((route) => (
          <li key={route.id} className="routes-list__item">
            <span className="routes-list__dot" aria-hidden="true" />
            {route.origin} → {route.destination}
          </li>
        ))}
      </ul>
    </section>
  )
}
