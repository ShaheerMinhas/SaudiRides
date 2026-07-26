import { Link, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../AuthContext'

export default function MorePage() {
  const { admin, logout } = useAdminAuth()
  const navigate = useNavigate()

  async function onLogout() {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <>
      <article className="admin-card">
        <h2 className="admin-card__title">{admin?.name}</h2>
        <p className="admin-card__meta">{admin?.email}</p>
        <p className="admin-card__meta">Role: {admin?.role || 'admin'}</p>
      </article>

      <div className="admin-stack">
        <Link to="/admin/pricing" className="admin-btn admin-btn--ghost admin-btn--block">
          Car ↔ Route pricing
        </Link>
        <Link to="/" className="admin-btn admin-btn--ghost admin-btn--block">
          Open public site
        </Link>
        <button type="button" className="admin-btn admin-btn--danger admin-btn--block" onClick={onLogout}>
          Log out
        </button>
      </div>
    </>
  )
}
