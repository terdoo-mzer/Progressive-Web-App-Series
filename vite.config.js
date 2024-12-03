import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoupdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        "name": "Scan To Pay",
        "short_name": "Scan To Pay",
        "start_url": "http://localhost:5173/signin",
        "display": "standalone",
        "orientation": "any",
        "background_color": "#fff",
        "theme_color": "#fff",
        "icons": [
          {
            "src": "/icons/psg-512x512.png",
            "type": "image/png",
            "sizes": "512x512"
          },
          {
            "src": "/icons/psg-192x192.png",
            "type": "image/png",
            "sizes": "192x192",
          },
          {
            "src": "/icons/psg-144x144.png",
            "type": "image/png",
            "sizes": "144x144",
          }
        ],
        "description": "Recreating a fast and efficient shopping experience for our customers!",
        "lang": "en",
        "categories": ["E-commerce"],
        "id": "/", // Auto-generated unique ID
        "scope": "/",
        "screenshots": [
           {
            "src": "https://placehold.co/600x1200",
             "sizes": "600x1200",
             "type": "image/png",
             "form_factor": "narrow",
             "label": "Scan-to-pay"
           },
           {
            "src": "https://placehold.co/600x1200",
             "sizes": "600x1200",
             "type": "image/png",
             "form_factor": "narrow",
             "label": "Scan-to-pay"
           },
           {
            "src": "https://placehold.co/600x1200",
             "sizes": "600x1200",
             "type": "image/png",
             "form_factor": "narrow",
             "label": "Scan-to-pay"
           },
        ],
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
