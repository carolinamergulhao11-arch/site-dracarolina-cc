import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { lenis } from './lib/lenis'
import { rastrear } from './lib/pixel'
import ConsentBanner from './components/ConsentBanner'
import Seo from './components/Seo'
import { SEO } from './data/seo'
import Header from './components/Header'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Sobre from './components/Sobre'
import Especialidades from './components/Especialidades'
import Galeria from './components/Galeria'
import Metodo from './components/Metodo'
import Blog from './components/Blog'
import Contato from './components/Contato'
import Faq from './components/Faq'
import WhatsAppFloat from './components/WhatsAppFloat'
import Footer from './components/Footer'
import PostPage from './pages/PostPage'
import BlogPage from './pages/BlogPage'
import ContatoPage from './pages/ContatoPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivacidadePage from './pages/PrivacidadePage'

function Home() {
  // Chegando de outra página em /#secao, o navegador tenta rolar antes do React montar a seção.
  useEffect(() => {
    if (!location.hash) return
    try {
      // getElementById aceita qualquer texto; querySelector lançava erro com #1 ou #utm=...
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
    } catch {
      // hash malformado (ex.: % solto): ignora e fica no topo
    }
  }, [])

  return (
    <>
      <Seo title={SEO.home.title} />
      <Header />
      <main id="conteudo">
        <Hero />
        <Manifesto />
        <Especialidades />
        <Sobre />
        <Metodo />
        <Galeria />
        <Blog />
        <Contato />
        <Faq />
      </main>
      <WhatsAppFloat />
      <Footer />
    </>
  )
}

// Ao trocar de página, começa do topo (links /#secao são tratados pela Home).
function useScrollTopOnNavigate() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!location.hash) lenis.scrollTo(0, { immediate: true, force: true })
    rastrear('PageView')
  }, [pathname])
}

export default function App() {
  useScrollTopOnNavigate()
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<PostPage />} />
      <Route path="/contato/" element={<ContatoPage />} />
      <Route path="/privacidade/" element={<PrivacidadePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <ConsentBanner />
    </>
  )
}
