import { useLanguage } from '../i18n/LanguageContext'

const OFFER_ICONS = ['✈️', '🛣️', '🕐', '🗣️', '👨‍👩‍👧‍👦', '❄️']

export default function Offers() {
  const { t } = useLanguage()

  return (
    <section className="section" id="offers">
      <div className="section__header">
        <h2 className="section__title">{t.offers.title}</h2>
      </div>
      <div className="offers-grid">
        {t.offers.items.map((item, i) => (
          <article key={item.title} className="offer-card">
            <span className="offer-card__icon" aria-hidden="true">{OFFER_ICONS[i]}</span>
            <h3 className="offer-card__title">{item.title}</h3>
            <p className="offer-card__desc">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
