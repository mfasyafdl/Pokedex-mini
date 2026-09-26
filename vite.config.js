import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/pokedex-mini/', // replace with your own repo name
  plugins: [react()],
})
