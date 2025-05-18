import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Reemplaza esto con el nombre del repositorio
const repoName = 'proyecto-final-web'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`, // 👈 base correcta para GitHub Pages
})
