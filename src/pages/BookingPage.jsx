import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { CAR_KEYS } from '../i18n/translations'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function BookingPage() {
  const { t } = useLanguage()

  return (
    <div className="booking-page">
      <header className="booking-page__header">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">🕋</span>
          <span className="header__logo-text">SaudiRides</span>
        </Link>
        <LanguageSwitcher />
      </header>

      <main className="booking-page__main">
        <h1 className="booking-page__title">{t.booking.title}</h1>
        <p className="booking-page__subtitle">{t.booking.subtitle}</p>

        <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
          <div className="booking-form__field">
            <label htmlFor="name">{t.booking.name}</label>
            <input id="name" type="text" required />
          </div>
          <div className="booking-form__field">
            <label htmlFor="phone">{t.booking.phone}</label>
            <input id="phone" type="tel" required />
          </div>
          <div className="booking-form__field">
            <label htmlFor="pickup">{t.booking.pickup}</label>
            <input id="pickup" type="text" required />
          </div>
          <div className="booking-form__field">
            <label htmlFor="dropoff">{t.booking.dropoff}</label>
            <input id="dropoff" type="text" required />
          </div>
          <div className="booking-form__field">
            <label htmlFor="date">{t.booking.date}</label>
            <input id="date" type="date" required />
          </div>
          <div className="booking-form__field">
            <label htmlFor="vehicle">{t.booking.vehicle}</label>
            <select id="vehicle" required>
              <option value="">—</option>
              {CAR_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t.cars.items[key].name}
                </option>
              ))}
            </select>
          </div>
          <p className="booking-form__note">{t.booking.placeholder}</p>
          <button type="submit" className="btn btn--primary btn--lg">
            {t.booking.submit}
          </button>
        </form>

        <Link to="/" className="booking-page__back">
          ← {t.booking.back}
        </Link>
      </main>
    </div>
  )
}
