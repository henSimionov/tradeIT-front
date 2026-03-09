import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import './i18n'
import { Router } from './Router/Router'
import { config } from './config'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={config.clerk.publishableKey}>
      <Router />
    </ClerkProvider>
  </StrictMode>,
)
