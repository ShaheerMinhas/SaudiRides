import { apiUrl, mediaUrl as resolveMediaUrl } from '../api/public'

const TOKEN_KEY = 'saudirides_admin_token'
const ADMIN_KEY = 'saudirides_admin_user'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredAdmin() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_KEY) || 'null')
  } catch {
    return null
  }
}

export function setSession(token, admin) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ADMIN_KEY)
}

export function mediaUrl(url) {
  return resolveMediaUrl(url)
}

async function parseBody(response) {
  if (response.status === 204) return null
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return { errors: [text] }
  }
}

export async function api(path, { method = 'GET', body, formData, auth = true } = {}) {
  const headers = {}
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }
  if (body != null && !formData) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(apiUrl(path), {
    method,
    headers,
    body: formData || (body != null ? JSON.stringify(body) : undefined),
  })

  const data = await parseBody(response)

  if (!response.ok) {
    const message = data?.errors?.join?.(', ') || data?.errors || `Request failed (${response.status})`
    const error = new Error(Array.isArray(message) ? message.join(', ') : String(message))
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export const adminApi = {
  login: (email, password) =>
    api('/admin/login', { method: 'POST', body: { email, password }, auth: false }),

  logout: () => api('/admin/logout', { method: 'DELETE' }),

  bookings: () => api('/admin/bookings'),
  booking: (id) => api(`/admin/bookings/${id}`),
  assignDriver: (id, driver_id) =>
    api(`/admin/bookings/${id}/assign_driver`, { method: 'PATCH', body: { driver_id } }),
  updateBookingStatus: (id, status) =>
    api(`/admin/bookings/${id}/status`, { method: 'PATCH', body: { status } }),

  cars: () => api('/admin/cars'),
  car: (id) => api(`/admin/cars/${id}`),
  createCar: (formData) => api('/admin/cars', { method: 'POST', formData }),
  updateCar: (id, formData) => api(`/admin/cars/${id}`, { method: 'PATCH', formData }),
  deleteCar: (id) => api(`/admin/cars/${id}`, { method: 'DELETE' }),

  drivers: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return api(`/admin/drivers${qs ? `?${qs}` : ''}`)
  },
  driver: (id) => api(`/admin/drivers/${id}`),
  createDriver: (driver) => api('/admin/drivers', { method: 'POST', body: { driver } }),
  updateDriver: (id, driver) => api(`/admin/drivers/${id}`, { method: 'PATCH', body: { driver } }),
  deleteDriver: (id) => api(`/admin/drivers/${id}`, { method: 'DELETE' }),

  routes: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return api(`/admin/routes${qs ? `?${qs}` : ''}`)
  },
  route: (id) => api(`/admin/routes/${id}`),
  createRoute: (route) => api('/admin/routes', { method: 'POST', body: { route } }),
  updateRoute: (id, route) => api(`/admin/routes/${id}`, { method: 'PATCH', body: { route } }),
  deleteRoute: (id) => api(`/admin/routes/${id}`, { method: 'DELETE' }),

  createRouteStop: (routeId, route_stop) =>
    api(`/admin/routes/${routeId}/route_stops`, { method: 'POST', body: { route_stop } }),
  updateRouteStop: (id, route_stop) =>
    api(`/admin/route_stops/${id}`, { method: 'PATCH', body: { route_stop } }),
  deleteRouteStop: (id) => api(`/admin/route_stops/${id}`, { method: 'DELETE' }),

  pricings: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return api(`/admin/car_route_pricings${qs ? `?${qs}` : ''}`)
  },
  createPricing: (car_route_pricing) =>
    api('/admin/car_route_pricings', { method: 'POST', body: { car_route_pricing } }),
  updatePricing: (id, car_route_pricing) =>
    api(`/admin/car_route_pricings/${id}`, { method: 'PATCH', body: { car_route_pricing } }),
  deletePricing: (id) => api(`/admin/car_route_pricings/${id}`, { method: 'DELETE' }),
}
