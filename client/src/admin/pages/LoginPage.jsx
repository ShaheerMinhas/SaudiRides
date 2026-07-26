import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../AuthContext'
import '../Admin.css'

export default function LoginPage() {
  const { login, isAuthenticated } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('admin@saudirides.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={location.state?.from || '/admin/bookings'} replace />
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email.trim(), password)
      navigate(location.state?.from || '/admin/bookings', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-app admin-login">
      <form className="admin-login__card" onSubmit={onSubmit}>
        <div className="admin-login__brand">
          <div aria-hidden="true">🕋</div>
          <h1>SaudiRides Admin</h1>
          <p>Phone-friendly operations panel</p>
        </div>

        {error ? <div className="admin-error">{error}</div> : null}

        <div className="admin-field">
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="admin-field">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <button className="admin-btn admin-btn--primary admin-btn--block" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
