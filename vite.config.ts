import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Relative asset paths so dist/ works from any sub-path (GitHub Pages, Netlify, Vercel).
  base: './',
})
