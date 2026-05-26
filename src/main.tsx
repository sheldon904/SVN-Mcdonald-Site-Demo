import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { ConsentProvider } from './lib/consent'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ConsentProvider>
        <App />
      </ConsentProvider>
    </HelmetProvider>
  </StrictMode>,
)
