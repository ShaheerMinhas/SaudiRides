import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from './AuthContext'
import './Admin.css'

const TABS = [
  { to: '/admin/bookings', label: 'Bookings', icon: '📋' },
  { to: '/admin/cars', label: 'Cars', icon: '🚗' },
  { to: '/admin/drivers', label: 'Drivers', icon: '🧑‍✈️' },
  { to: '/admin/routes', label: 'Routes', icon: '🗺️' },
  { to: '/admin/more', label: 'More', icon: '☰' },
]

const TITLES = {
  '/admin/bookings': 'Bookings',
  '/admin/cars': 'Cars',
  '/admin/drivers': 'Drivers',
  '/admin/routes': 'Routes',
  '/admin/pricing': 'Pricing',
  '/admin/more': 'More',
}

function titleFor(pathname) {
  if (pathname.startsWith('/admin/bookings/')) return 'Booking'
  if (pathname.includes('/cars/') && pathname.endsWith('/edit')) return 'Edit car'
  if (pathname.endsWith('/cars/new')) return 'New car'
  if (pathname.includes('/drivers/') && pathname.endsWith('/edit')) return 'Edit driver'
  if (pathname.endsWith('/drivers/new')) return 'New driver'
  if (pathname.includes('/routes/') && pathname.endsWith('/edit')) return 'Edit route'
  if (pathname.endsWith('/routes/new')) return 'New route'
  for (const key of Object.keys(TITLES)) {
    if (pathname === key || pathname.startsWith(`${key}/`)) return TITLES[key]
  }
  return 'Admin'
}

export default function AdminShell() {
  const { isAuthenticated, admin } = useAdminAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return (
    <div className="admin-app">
      <header className="admin-topbar">
        <div>
          <h1 className="admin-topbar__title">{titleFor(location.pathname)}</h1>
          <p className="admin-topbar__sub">{admin?.name || admin?.email}</p>
        </div>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>

      <nav className="admin-nav" aria-label="Admin">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => `admin-nav__link${isActive ? ' is-active' : ''}`}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
