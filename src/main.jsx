import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './lib/lenis'
import App from './App.jsx'
import './index.css'

const app = (
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>
)

const root = document.getElementById('root')
// O build já coloca o HTML da rota no #root. Só reaproveitamos (hidratação) quando a URL é a mesma
// da renderizada; no caso do 404.html, que reescreve a URL antes do script, recriamos do zero.
if (root.hasChildNodes() && root.dataset.ssrPath === location.pathname) hydrateRoot(root, app)
else createRoot(root).render(app)
