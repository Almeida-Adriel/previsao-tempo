import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/previsao-tempo/',  // Nome do repositório aqui
  plugins: [react()],
})
