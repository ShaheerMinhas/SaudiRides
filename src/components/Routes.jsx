import { useLanguage } from '../i18n/LanguageContext'

export default function Routes() {
  const { t } = useLanguage()

  return (
    <section className="section section--alt" id="routes">
      <div className="section__header">
        <h2 className="section__title">{t.routes.title}</h2>
        <p className="section__subtitle">{t.routes.subtitle}</p>
      </div>
      <ul className="routes-list">
        {t.routes.items.map((route) => (
          <li key={route} className="routes-list__item">
            <span className="routes-list__dot" aria-hidden="true" />
            {route}
          </li>
        ))}
      </ul>
    </section>
  )
}
