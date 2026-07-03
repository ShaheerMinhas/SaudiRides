import { useLanguage } from '../i18n/LanguageContext'

export default function Ziyarat() {
  const { t } = useLanguage()

  return (
    <section className="section" id="ziyarat">
      <div className="section__header">
        <h2 className="section__title">{t.ziyarat.title}</h2>
        <p className="section__subtitle">{t.ziyarat.subtitle}</p>
      </div>
      <div className="ziyarat-grid">
        <article className="ziyarat-card">
          <h3 className="ziyarat-card__title">🕋 {t.ziyarat.makkah.title}</h3>
          <ul className="ziyarat-card__list">
            {t.ziyarat.makkah.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="ziyarat-card">
          <h3 className="ziyarat-card__title">🕌 {t.ziyarat.madinah.title}</h3>
          <ul className="ziyarat-card__list">
            {t.ziyarat.madinah.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
