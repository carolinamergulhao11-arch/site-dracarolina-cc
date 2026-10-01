import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import { SEO } from '../data/seo'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import Reveal from '../components/Reveal'
import LineReveal from '../components/motion/LineReveal'
import PostCard, { ZOOM } from '../components/PostCard'
import CtaConsulta from '../components/CtaConsulta'
import { POSTS, srcsetArte } from '../data/posts'

const CATEGORIAS = [...new Set(POSTS.map(p => p.category))]

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-5 py-2.5 text-[12px] font-medium tracking-[0.06em] border transition-colors ${
        active ? 'bg-verde-escuro border-verde-escuro text-white' : 'border-verde-escuro/20 text-verde-escuro hover:border-verde-escuro'
      }`}
    >
      {children}
    </button>
  )
}

export default function BlogPage() {
  const [params, setParams] = useSearchParams()
  const categoria = CATEGORIAS.includes(params.get('categoria')) ? params.get('categoria') : null
  const lista = categoria ? POSTS.filter(p => p.category === categoria) : POSTS
  const [destaque, ...demais] = lista

  // Sem fade no 1º carregamento (a arte em destaque é o LCP); só ao trocar de categoria.
  const primeiraVez = useRef(true)
  useEffect(() => { primeiraVez.current = false }, [])

  return (
    <>
      <Seo title={SEO.blog.title} />
      <Header />
      <main id="conteudo" className="bg-off pt-36 md:pt-48 pb-28 md:pb-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
            <div className="md:col-span-8">
              <Reveal className="eyebrow text-verde-oliva mb-6">Blog</Reveal>
              <LineReveal as="h1" immediate delay={0.1} lines={['Conteúdo', 'para você']} className="uppercase text-display" />
            </div>
            <Reveal delay={0.2} className="md:col-span-4 text-verde-escuro/75 leading-relaxed">
              Artigos sobre emagrecimento, metabolismo, saúde hormonal e os hábitos que sustentam o tratamento.
            </Reveal>
          </div>

          <Reveal delay={0.25} className="pb-10 mb-12 md:mb-16 border-b border-verde-escuro/15">
            <nav className="flex flex-wrap gap-2.5" aria-label="Categorias">
              <Pill active={!categoria} onClick={() => setParams({})}>Todos</Pill>
              {CATEGORIAS.map(c => (
                <Pill key={c} active={categoria === c} onClick={() => setParams({ categoria: c })}>{c}</Pill>
              ))}
            </nav>
          </Reveal>

          <motion.div
            key={categoria ?? 'todos'}
            initial={primeiraVez.current ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to={`/blog/${destaque.slug}/`} className="group grid md:grid-cols-12 gap-8 md:gap-12 items-center mb-16 md:mb-24">
              <div className="md:col-span-7 overflow-hidden">
                <img src={destaque.image} srcSet={srcsetArte(destaque.image)} sizes="(min-width: 768px) 58vw, 100vw" alt={destaque.title} fetchPriority="high" className={`w-full aspect-video object-cover ${ZOOM}`} />
              </div>
              <div className="md:col-span-5">
                <div className="eyebrow text-verde-oliva mb-4">{destaque.category}</div>
                <h2 className="font-sans tracking-normal font-medium text-[clamp(1.6rem,2.6vw,2.4rem)] leading-snug text-verde-escuro mb-5 group-hover:text-verde-oliva transition-colors">
                  {destaque.title}
                </h2>
                <p className="leading-relaxed text-verde-escuro/70 mb-8">{destaque.excerpt}</p>
                <span className="inline-flex items-center gap-3 eyebrow text-verde-escuro">
                  Ler artigo <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                </span>
              </div>
            </Link>

            {demais.length > 0 && (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                {demais.map(post => (
                  <li key={post.slug}><PostCard post={post} /></li>
                ))}
              </ul>
            )}
          </motion.div>

          <CtaConsulta className="mt-24 md:mt-32" />
        </div>
      </main>
      <WhatsAppFloat />
      <Footer />
    </>
  )
}
