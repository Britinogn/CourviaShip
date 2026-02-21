// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import nuxt vite plugin if you have it

export default defineConfig({
  plugins: [vue() /* ... other plugins */],

  server: {
    // Allow ALL Outray subdomains
    allowedHosts: [
      '.outray.app',      // ← wildcard (dot is important!)
      'localhost',
      '127.0.0.1',
      '::1'               // IPv6 localhost (optional but good)
    ],

    // Optional but recommended for tunnels
    host: '0.0.0.0',      // Bind to all interfaces
    port: 3000,           // or 5173 if that's your port
    hmr: {
      clientPort: 3000,   // helps with tunneling
    }
  }
})