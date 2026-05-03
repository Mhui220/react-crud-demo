import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://employee-admin-api-h4g2cqejepbhcbhf.southeastasia-01.azurewebsites.net",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
