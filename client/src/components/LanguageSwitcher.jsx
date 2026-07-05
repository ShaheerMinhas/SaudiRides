import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher() {
  const { lang, setLang, languages } = useLanguage()

  return (
    <select
      className="lang-switcher"
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      aria-label="Select language"
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  )
}
