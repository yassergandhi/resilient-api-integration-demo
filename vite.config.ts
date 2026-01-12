import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'huhuGERMAN',
        short_name: 'huhu',
        description: 'Offline-first PWA for A1 German',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // You will need to add these to /public later
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})