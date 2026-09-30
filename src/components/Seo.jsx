import { useEffect } from 'react'

// Só o título da aba na navegação interna; o texto vem de src/data/seo.js, o mesmo
// usado no HTML estático gerado por scripts/prerender-meta.mjs.
export default function Seo({ title }) {
  useEffect(() => {
    document.title = title
  }, [title])
  return null
}
