import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { lenis } from './lib/lenis'
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

function Home() {
  // Chegando de outra página em /#secao, o navegador tenta rolar antes do React montar a seção.
  useEffect(() => {
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView()
  }, [])

  return (
    <>
      <Seo title={SEO.home.title} />
      <Header />
      <Hero />
      <Manifesto />
      <Especialidades />
      <Sobre />
      <Metodo />
      <Galeria />
      <Blog />
      <Contato />
      <Faq />
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
  }, [pathname])
}

export default function App() {
  useScrollTopOnNavigate()
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<PostPage />} />
      <Route path="/contato/" element={<ContatoPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
