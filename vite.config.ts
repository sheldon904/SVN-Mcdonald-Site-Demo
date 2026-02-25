import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const vendorChunks: Record<string, string[]> = {
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-motion': ['framer-motion'],
  'vendor-ui': ['lucide-react', 'clsx', 'tailwind-merge'],
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
  }
})
