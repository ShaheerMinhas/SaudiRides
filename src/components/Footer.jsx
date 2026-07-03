import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">🕋 SaudiRides</span>
          <p className="footer__tagline">{t.footer.tagline}</p>
        </div>

        <div className="footer__contact">
          <div className="footer__item">
            <span className="footer__label">{t.footer.phone}</span>
            <a href="tel:+966500000000">+966 50 000 0000</a>
          </div>
          <div className="footer__item">
            <span className="footer__label">{t.footer.whatsapp}</span>
            <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer">
              +966 50 000 0000
            </a>
          </div>
          <div className="footer__item">
            <span className="footer__label">{t.footer.email}</span>
            <a href="mailto:info@saudiarides.com">info@saudiarides.com</a>
          </div>
          <div className="footer__item">
            <span className="footer__label">{t.footer.address}</span>
            <span>{t.footer.addressValue}</span>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} SaudiRides. {t.footer.rights}</p>
      </div>
    </footer>
  )
}
