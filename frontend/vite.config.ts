import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
      '/login': 'http://localhost:5001',
      '/logout': 'http://localhost:5001',
      '/register': 'http://localhost:5001',
      '/doctor': 'http://localhost:5001',
      '/patient': 'http://localhost:5001',
      '/static': 'http://localhost:5001',
      '/assets': 'http://localhost:5001',
    },
  },
})
