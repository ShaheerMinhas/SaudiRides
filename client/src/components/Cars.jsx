import { useLanguage } from '../i18n/LanguageContext'
import { CAR_KEYS, CAR_ICONS } from '../i18n/translations'

export default function Cars() {
  const { t } = useLanguage()

  return (
    <section className="section" id="cars">
      <div className="section__header">
        <h2 className="section__title">{t.cars.title}</h2>
        <p className="section__subtitle">{t.cars.subtitle}</p>
      </div>
      <div className="cars-grid">
        {CAR_KEYS.map((key) => (
          <article key={key} className="car-card">
            <div className="car-card__icon">{CAR_ICONS[key]}</div>
            <h3 className="car-card__name">{t.cars.items[key].name}</h3>
            <p className="car-card__desc">{t.cars.items[key].desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
