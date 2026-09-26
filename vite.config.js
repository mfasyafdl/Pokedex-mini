import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Pokedex-mini/', // matches exact repository casing on GitHub
  plugins: [react()],
})
