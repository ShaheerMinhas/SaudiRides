import { createContext, useContext, useState, useEffect } from 'react'
import { translations, LANGUAGES } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]
  const t = translations[lang] || translations.en

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = current.dir
  }, [lang, current.dir])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages: LANGUAGES, dir: current.dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
