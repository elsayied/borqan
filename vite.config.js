import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Allows deploying seamlessly to GitHub Pages or any subpath
  server: {
    port: 3000,
    host: true
  }
})
