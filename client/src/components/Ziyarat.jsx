import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { publicApi } from '../api/public'

export default function Ziyarat() {
  const { t } = useLanguage()
  const [routes, setRoutes] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await publicApi.routes({ route_type: 'ziyarat' })
        if (alive) setRoutes(Array.isArray(data) ? data : [])
      } catch {
        if (alive) setError('Could not load ziyarat')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const makkah = useMemo(
    () => routes.filter((route) => /makkah|mecca/i.test(`${route.name} ${route.origin}`)),
    [routes],
  )
  const madinah = useMemo(
    () => routes.filter((route) => /madinah|medina/i.test(`${route.name} ${route.origin}`)),
    [routes],
  )
  const other = useMemo(
    () => routes.filter((route) => !makkah.includes(route) && !madinah.includes(route)),
    [routes, makkah, madinah],
  )

  const groups = [
    { key: 'makkah', title: `🕋 ${t.ziyarat.makkah.title}`, items: makkah },
    { key: 'madinah', title: `🕌 ${t.ziyarat.madinah.title}`, items: madinah },
    ...other.map((route) => ({
      key: `route-${route.id}`,
      title: route.name,
      items: [route],
    })),
  ].filter((group) => group.items.length > 0)

  return (
    <section className="section" id="ziyarat">
      <div className="section__header">
        <h2 className="section__title">{t.ziyarat.title}</h2>
        <p className="section__subtitle">{t.ziyarat.subtitle}</p>
      </div>

      {loading ? <p className="section__subtitle">…</p> : null}
      {error ? <p className="section__subtitle">{error}</p> : null}

      <div className="ziyarat-grid">
        {groups.map((group) => (
          <article key={group.key} className="ziyarat-card">
            <h3 className="ziyarat-card__title">{group.title}</h3>
            {group.items.map((route) => (
              <ul key={route.id} className="ziyarat-card__list">
                {(route.route_stops || [])
                  .slice()
                  .sort((a, b) => a.stop_order - b.stop_order)
                  .map((stop) => (
                    <li key={stop.id || stop.stop_name}>{stop.stop_name}</li>
                  ))}
              </ul>
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}
