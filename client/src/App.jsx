import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import LandingPage from './pages/LandingPage'
import BookingPage from './pages/BookingPage'
import { AdminAuthProvider } from './admin/AuthContext'
import AdminShell from './admin/AdminShell'
import LoginPage from './admin/pages/LoginPage'
import BookingsPage from './admin/pages/BookingsPage'
import BookingDetailPage from './admin/pages/BookingDetailPage'
import CarsPage from './admin/pages/CarsPage'
import CarFormPage from './admin/pages/CarFormPage'
import DriversPage from './admin/pages/DriversPage'
import DriverFormPage from './admin/pages/DriverFormPage'
import RoutesPage from './admin/pages/RoutesPage'
import RouteFormPage from './admin/pages/RouteFormPage'
import PricingPage from './admin/pages/PricingPage'
import MorePage from './admin/pages/MorePage'
import './App.css'

function AdminProviderLayout() {
  return (
    <AdminAuthProvider>
      <Outlet />
    </AdminAuthProvider>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<BookingPage />} />

          <Route path="/admin" element={<AdminProviderLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route element={<AdminShell />}>
              <Route index element={<Navigate to="bookings" replace />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="bookings/:id" element={<BookingDetailPage />} />
              <Route path="cars" element={<CarsPage />} />
              <Route path="cars/new" element={<CarFormPage />} />
              <Route path="cars/:id/edit" element={<CarFormPage />} />
              <Route path="drivers" element={<DriversPage />} />
              <Route path="drivers/new" element={<DriverFormPage />} />
              <Route path="drivers/:id/edit" element={<DriverFormPage />} />
              <Route path="routes" element={<RoutesPage />} />
              <Route path="routes/new" element={<RouteFormPage />} />
              <Route path="routes/:id/edit" element={<RouteFormPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="more" element={<MorePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
