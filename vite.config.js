import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// replace 'repo-name' with your actual repo name
export default defineConfig({
  base: '/all-laws/', 
  plugins: [react()],
})