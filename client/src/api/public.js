const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export function apiUrl(path) {
  if (!path) return API_BASE || ''
  if (/^https?:\/\//i.test(path)) return path
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`
}

export function mediaUrl(url) {
  if (!url) return null
  try {
    const base = API_BASE || window.location.origin
    const parsed = new URL(url, base)
    if (API_BASE) {
      const api = new URL(API_BASE)
      return `${api.origin}${parsed.pathname}${parsed.search}`
    }
    return `${parsed.pathname}${parsed.search}`
  } catch {
    return url
  }
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

export async function api(path, { method = 'GET', body } = {}) {
  const headers = {}
  if (body != null) headers['Content-Type'] = 'application/json'

  const response = await fetch(apiUrl(path), {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
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

export const publicApi = {
  cars: () => api('/cars'),
  routes: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return api(`/routes${qs ? `?${qs}` : ''}`)
  },
  pricing: (carId, routeId) =>
    api(`/car_route_pricing?car_id=${encodeURIComponent(carId)}&route_id=${encodeURIComponent(routeId)}`),
  createBooking: (booking) => api('/bookings', { method: 'POST', body: { booking } }),
  createContactMessage: (contact_message) =>
    api('/contact_messages', { method: 'POST', body: { contact_message } }),
}
