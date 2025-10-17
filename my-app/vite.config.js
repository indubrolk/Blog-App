import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Forward local API calls to Express backend during dev
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
