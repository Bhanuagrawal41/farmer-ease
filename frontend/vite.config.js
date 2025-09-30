import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  
  // 🛑 FINAL FIX: ADD THIS PROXY CONFIGURATION BLOCK 🛑
  server: {
    // This tells Vite: "Forward all requests that start with /api to the Node.js server."
    proxy: {
      '/api': {
        // Your Node.js/Express server is running on Port 5000
        target: 'http://localhost:5000',
        changeOrigin: true, // Required for correct host headers
        secure: false, // Use false for development/localhost
        // Optional: rewrite the path if your Node.js routes didn't start with /api
        // but since yours do, this is clean.
      }
    }
  }
  // 🛑 END PROXY CONFIGURATION BLOCK 🛑
})