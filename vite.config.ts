import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const vendorChunks: Record<string, string[]> = {
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-motion': ['framer-motion'],
  'vendor-ui': ['lucide-react', 'clsx', 'tailwind-merge'],
  'vendor-gmaps': ['@googlemaps/js-api-loader'],
  'vendor-gsap': ['gsap'],
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          for (const [chunkName, deps] of Object.entries(vendorChunks)) {
            if (deps.some((dep) => id.includes(`node_modules/${dep}`))) {
              return chunkName
            }
          }
        },
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1100,
    // Minification target — modern browsers only (smaller output)
    target: 'es2020',
    // Enable CSS minification
    cssMinify: true,
  },
})
