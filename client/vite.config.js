import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiProxy = {
  target: 'http://127.0.0.1:3000',
  changeOrigin: true,
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/admin': {
        ...apiProxy,
        bypass(req) {
          if (req.headers.accept?.includes('text/html')) {
            return '/index.html'
          }
        },
      },
      '/rails': apiProxy,
      '/bookings': apiProxy,
      '/cars': apiProxy,
      '/routes': apiProxy,
      '/car_route_pricing': apiProxy,
      '/contact_messages': apiProxy,
    },
  },
})
