import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useLanguage()

  const links = [
    { href: '#cars', label: t.nav.cars },
    { href: '#about', label: t.nav.about },
    { href: '#offers', label: t.nav.offers },
    { href: '#routes', label: t.nav.routes },
    { href: '#ziyarat', label: t.nav.ziyarat },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">🕋</span>
          <span className="header__logo-text">SaudiRides</span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="header__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
