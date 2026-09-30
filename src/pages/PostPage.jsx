import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useInView, useScroll } from 'framer-motion'
import Reveal from '../components/Reveal'
import LineReveal from '../components/motion/LineReveal'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import Seo from '../components/Seo'
import { tituloDoPost } from '../data/seo'
import PostCard from '../components/PostCard'
import CtaConsulta from '../components/CtaConsulta'
import { POSTS, getPostBySlug } from '../data/posts'
import { lenis } from '../lib/lenis'

const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function minutosDeLeitura(post) {
  const texto = [post.excerpt, ...post.sections.flatMap(s => [s.heading, ...s.paragraphs])].join(' ')
  return Math.max(1, Math.round(texto.split(/\s+/).length / 200))
}

function Secao({ section, index, onActive }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-30% 0px -60% 0px' })

  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <section ref={ref} id={slugify(section.heading)} className="mb-14 md:mb-16">
      <Reveal>
        <div className="font-serif text-3xl text-bege-claro mb-3">{String(index + 1).padStart(2, '0')}</div>
        <h2 className="font-sans tracking-normal text-[clamp(1.35rem,2vw,1.7rem)] font-medium leading-snug text-verde-escuro mb-6">
          {section.heading}
        </h2>
      </Reveal>
      {section.paragraphs.map((p, j) => (
        <p key={j} className="text-[17px] md:text-lg leading-[1.8] text-verde-escuro/80 mb-5">{p}</p>
      ))}
    </section>
  )
}

function Compartilhar({ post }) {
  const [copiado, setCopiado] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // Sem permissão de clipboard: o link continua visível na barra do navegador.
    }
  }

  const botao = 'inline-block py-2 -my-2 text-sm text-verde-escuro/75 hover:text-verde-escuro underline underline-offset-4 decoration-verde-escuro/25 hover:decoration-verde-escuro transition-colors'
  return (
    <div>
      <div className="eyebrow text-verde-oliva mb-4">Compartilhar</div>
      <div className="flex gap-6">
        <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`} target="_blank" rel="noopener" className={botao}>
          WhatsApp
        </a>
        <button type="button" onClick={copiar} className={botao}>
          {copiado ? 'Link copiado' : 'Copiar link'}
        </button>
      </div>
    </div>
  )
}

function Post({ post }) {
  const [ativa, setAtiva] = useState(0)
  const { scrollYProgress } = useScroll()
  const related = POSTS.filter(p => p.slug !== post.slug).slice(0, 3)

  function irPara(e, id) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) lenis.scrollTo(el, { offset: -110 })
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 inset-x-0 h-0.5 bg-bege-claro origin-left z-[110]" aria-hidden="true" />

      <article className="bg-off pt-28 md:pt-40">
        {/* Topo: título à esquerda, arte à direita */}
        <header className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-12 items-center pb-16 md:pb-24 border-b border-verde-escuro/15">
          {/* Sem zoom: as artes têm texto na borda, que o recorte do ImageReveal cortaria */}
          <Reveal className="md:col-span-6 md:order-2">
            <img src={post.image} alt={post.title} fetchPriority="high" className="w-full aspect-video object-cover" />
          </Reveal>
          <div className="md:col-span-6 md:order-1">
            <Reveal className="flex items-center gap-4 mb-8 text-[12px]">
              <Link to="/blog/" className="inline-block py-2 -my-2 eyebrow text-verde-escuro/60 hover:text-verde-escuro transition-colors">← Blog</Link>
              <span className="w-6 h-px bg-verde-escuro/25" />
              <Link to={`/blog/?categoria=${encodeURIComponent(post.category)}`} className="inline-block py-2 -my-2 eyebrow text-verde-oliva hover:text-verde-escuro transition-colors">
                {post.category}
              </Link>
            </Reveal>
            <LineReveal as="h1" immediate delay={0.1} lines={[post.title]} className="uppercase text-[clamp(2rem,3.8vw,3.6rem)] leading-[1.08] mb-8" />
            <Reveal delay={0.25} className="text-lg md:text-xl leading-relaxed text-verde-escuro/75 mb-8">{post.excerpt}</Reveal>
            <Reveal delay={0.35} className="text-[13px] text-verde-escuro/60">
              Por <span className="text-verde-escuro font-medium">Dra. Carolina Mergulhão</span> · Endocrinologista · {minutosDeLeitura(post)} min de leitura
            </Reveal>
          </div>
        </header>

        {/* Corpo + lateral */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-8 pt-16 md:pt-24">
          <div className="md:col-span-7 max-w-[680px]">
            {post.sections.map((section, i) => (
              <Secao key={section.heading} section={section} index={i} onActive={setAtiva} />
            ))}

            <div className="md:hidden pt-10 border-t border-verde-escuro/15 mb-14">
              <Compartilhar post={post} />
            </div>

            {/* Autoria */}
            <Reveal className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[7rem_1fr] gap-6 items-start pt-12 border-t border-verde-escuro/15">
              <img
                src="/assets/images/dra-carolina-mergulhao-bracos-cruzados-editorial.webp"
                alt="Dra. Carolina Mergulhão"
                loading="lazy"
                className="w-full aspect-square object-cover object-[center_15%]"
              />
              <div>
                <div className="eyebrow text-verde-oliva mb-2">Sobre a autora</div>
                <div className="font-serif uppercase tracking-[0.04em] text-2xl mb-1">Dra. Carolina Mergulhão</div>
                <div className="text-[12px] tracking-[0.08em] text-verde-escuro/55 mb-4">
                  Endocrinologista e Metabologista · CRM-SP 137.944 · RQE 36.594
                </div>
                <p className="text-base leading-relaxed text-verde-escuro/75 mb-4">
                  Formada pela UFRJ, especialista pela SBEM desde 2007, com formação em Nutrologia e Medicina Integrativa.
                  Transforma ciência em tratamento individualizado, muito além da balança.
                </p>
                <a href="/#sobre" className="inline-block py-2 -my-2 text-sm underline underline-offset-4 decoration-verde-escuro/30 hover:decoration-verde-escuro">
                  Conheça a Dra. Carolina
                </a>
              </div>
            </Reveal>
          </div>

          <aside className="hidden md:block md:col-span-3 md:col-start-10 md:sticky md:top-28 md:self-start space-y-12">
            <nav aria-label="Neste artigo">
              <div className="eyebrow text-verde-oliva mb-5">Neste artigo</div>
              <ol className="border-l border-verde-escuro/15">
                {post.sections.map((s, i) => {
                  const id = slugify(s.heading)
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={e => irPara(e, id)}
                        aria-current={ativa === i ? 'true' : undefined}
                        className={`block -ml-px pl-5 py-2 border-l text-[14px] leading-snug transition-colors ${
                          ativa === i ? 'border-verde-escuro text-verde-escuro font-medium' : 'border-transparent text-verde-escuro/55 hover:text-verde-escuro'
                        }`}
                      >
                        {s.heading}
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>
            <Compartilhar post={post} />
          </aside>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 md:pt-32">
          <CtaConsulta />
        </div>

        {related.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-28 md:pb-40">
            <div className="flex items-end justify-between gap-6 mb-12 pb-8 border-b border-verde-escuro/15">
              <h2 className="uppercase text-section">Leia também</h2>
              <Link to="/blog/" className="inline-block py-2 -my-2 eyebrow text-verde-escuro whitespace-nowrap hover:text-verde-oliva transition-colors">Todos os artigos →</Link>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {related.map(p => <li key={p.slug}><PostCard post={p} /></li>)}
            </ul>
          </div>
        )}
      </article>
    </>
  )
}

export default function PostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <Navigate to="/blog/" replace />

  return (
    <>
      <Seo title={tituloDoPost(post)} />
      <Header />
      {/* key: ao trocar de artigo, reinicia animações e o índice ativo */}
      <Post key={post.slug} post={post} />
      <WhatsAppFloat />
      <Footer />
    </>
  )
}
