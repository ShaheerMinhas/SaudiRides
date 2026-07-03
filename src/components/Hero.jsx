import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <span className="hero__badge">Hajj & Umrah Transport</span>
        <h1 className="hero__title">{t.hero.title}</h1>
        <p className="hero__subtitle">{t.hero.subtitle}</p>
        <Link to="/booking" className="btn btn--primary btn--lg">
          {t.hero.cta}
        </Link>
      </div>
      <div className="hero__visual" aria-hidden="true">
        <div className="hero__mosque">🕌</div>
      </div>
    </section>
  )
}
