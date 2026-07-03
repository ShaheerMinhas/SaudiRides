import { useLanguage } from '../i18n/LanguageContext'

export default function AboutUs() {
  const { t } = useLanguage()

  return (
    <section className="section section--alt" id="about">
      <div className="about">
        <div className="about__visual" aria-hidden="true">
          <div className="about__icon">🕋</div>
        </div>
        <div className="about__content">
          <h2 className="section__title">{t.about.title}</h2>
          <p className="about__text">{t.about.p1}</p>
          <p className="about__text">{t.about.p2}</p>
        </div>
      </div>
    </section>
  )
}
