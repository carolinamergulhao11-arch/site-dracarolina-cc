import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'

// Usado só no build (scripts/prerender-meta.mjs): devolve o HTML da rota para ir dentro do #root.
export function render(url) {
  return renderToString(
    <MotionConfig reducedMotion="user">
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </MotionConfig>,
  )
}
