import { createContext, useContext, useMemo, useState } from 'react'
import { adminApi, clearSession, getStoredAdmin, getToken, setSession } from './api'

const AuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(getToken())
  const [admin, setAdmin] = useState(getStoredAdmin())

  const value = useMemo(
    () => ({
      token,
      admin,
      isAuthenticated: Boolean(token),
      async login(email, password) {
        const data = await adminApi.login(email, password)
        setSession(data.token, data.admin)
        setToken(data.token)
        setAdmin(data.admin)
        return data.admin
      },
      async logout() {
        try {
          if (getToken()) await adminApi.logout()
        } catch {
          // ignore logout network errors
        }
        clearSession()
        setToken(null)
        setAdmin(null)
      },
      forceLogout() {
        clearSession()
        setToken(null)
        setAdmin(null)
      },
    }),
    [token, admin],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
