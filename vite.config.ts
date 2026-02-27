import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium'

const vendorChunks: Record<string, string[]> = {
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-motion': ['framer-motion'],
  'vendor-ui': ['lucide-react', 'clsx', 'tailwind-merge'],
  'vendor-gsap': ['gsap'],
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cesium()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          for (const [chunkName, deps] of Object.entries(vendorChunks)) {
            if (deps.some((dep) => id.includes(`node_modules/${dep}`))) {
              return chunkName
            }
          }
          if (id.includes('node_modules/cesium')) {
            return 'vendor-cesium'
          }
        },
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 4500,
    target: 'es2020',
    cssMinify: true,
  },
})
