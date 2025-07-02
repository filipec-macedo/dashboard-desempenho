// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // necessário para Vercel reconhecer a pasta final
  },
  server: {
    port: 3000, // opcional, facilita desenvolvimento local
  },
})
