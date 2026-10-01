import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import Reveal from '../components/Reveal'
import LineReveal from '../components/motion/LineReveal'
import PostCard from '../components/PostCard'
import CtaConsulta from '../components/CtaConsulta'
import { PAGINAS, getPagina, tituloDaPagina } from '../data/paginas'
import { POSTS } from '../data/posts'
import { ENDERECO, MAPA_URL } from '../data/contato'

const LARGURA = 'max-w-[1400px] mx-auto px-6 md:px-10'

// Molde das páginas de tema: o conteúdo vem de src/data/paginas.js.
export default function PaginaTema({ slug }) {
  const pagina = getPagina(slug)

  const posts = pagina.posts.map((s) => POSTS.find((p) => p.slug === s)).filter(Boolean)
  const outras = PAGINAS.filter((p) => p.slug !== pagina.slug)

  return (
    <>
      <Seo title={tituloDaPagina(pagina)} />
      <Header />
      <main id="conteudo" className="bg-off pt-40 md:pt-52">
        <div className={`${LARGURA} pb-20 md:pb-28`}>
          <Reveal fade={false} className="eyebrow text-verde-oliva mb-6">{pagina.eyebrow}</Reveal>
          <LineReveal as="h1" immediate lines={pagina.h1} className="uppercase text-section mb-10" />
          <Reveal fade={false} delay={0.1} className="max-w-3xl">
            {pagina.intro.map((t) => (
              <p key={t} className="text-lg md:text-xl leading-relaxed text-verde-escuro/80 mb-5">{t}</p>
            ))}
          </Reveal>
        </div>

        {pagina.consultorio && (
          <div className={`${LARGURA} pb-20 md:pb-28`}>
            <Reveal className="bg-areia px-8 py-10 md:px-14 md:py-14 grid md:grid-cols-12 gap-8 md:gap-10">
              <div className="md:col-span-5">
                <div className="eyebrow text-verde-oliva mb-4">Endereço</div>
                <p className="text-lg leading-relaxed text-verde-escuro">
                  {ENDERECO.linha1}
                  <br />
                  {ENDERECO.linha2}
                  <br />
                  CEP {ENDERECO.cep}
                </p>
                <a href={MAPA_URL} target="_blank" rel="noopener" className="inline-block mt-4 py-2 -my-2 text-sm underline underline-offset-4 decoration-verde-escuro/30 hover:decoration-verde-escuro">
                  Ver no Google Maps
                </a>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <div className="eyebrow text-verde-oliva mb-4">Atendimento</div>
                <p className="text-lg leading-relaxed text-verde-escuro">Presencial e particular. Não atendemos por convênio.</p>
              </div>
            </Reveal>
          </div>
        )}

        {pagina.secoes.map((s) => (
          <section key={s.h} className="border-t border-verde-escuro/15">
            <div className={`${LARGURA} py-14 md:py-20 grid md:grid-cols-12 gap-6 md:gap-8`}>
              <h2 className="md:col-span-4 font-sans tracking-normal text-[clamp(1.35rem,2vw,1.7rem)] font-medium leading-snug text-verde-escuro">{s.h}</h2>
              <Reveal className="md:col-span-7 md:col-start-6">
                {s.p.map((t) => (
                  <p key={t} className="text-base md:text-lg leading-relaxed text-verde-escuro/75 mb-5 last:mb-0">{t}</p>
                ))}
              </Reveal>
            </div>
          </section>
        ))}

        <section className="border-t border-verde-escuro/15">
          <div className={`${LARGURA} py-14 md:py-20 grid md:grid-cols-12 gap-6 md:gap-8`}>
            <h2 className="md:col-span-4 uppercase text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight">Perguntas frequentes</h2>
            <div className="md:col-span-7 md:col-start-6 border-t border-verde-escuro/15">
              {pagina.faq.map((f) => (
                <details key={f.q} className="group border-b border-verde-escuro/15">
                  <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none text-[17px] font-medium text-verde-escuro hover:text-verde-oliva transition-colors [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="relative w-3.5 h-3.5 shrink-0 transition-transform duration-500 group-open:rotate-45" aria-hidden="true">
                      <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                      <span className="absolute inset-y-0 left-1/2 w-px bg-current" />
                    </span>
                  </summary>
                  <p className="pb-7 max-w-[640px] leading-relaxed text-verde-escuro/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div className={`${LARGURA} pt-8 md:pt-12`}>
          <CtaConsulta />
        </div>

        {posts.length > 0 && (
          <div className={`${LARGURA} pt-24 md:pt-32`}>
            <h2 className="uppercase text-section mb-12 pb-8 border-b border-verde-escuro/15">Leia também</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {posts.map((p) => <li key={p.slug}><PostCard post={p} /></li>)}
            </ul>
          </div>
        )}

        <nav aria-label="Outros temas" className={`${LARGURA} pt-24 md:pt-32 pb-28 md:pb-40`}>
          <div className="eyebrow text-verde-oliva mb-6">Outros temas</div>
          <ul className="flex flex-wrap gap-3">
            {outras.map((p) => (
              <li key={p.slug}>
                <Link to={`/${p.slug}/`} className="inline-block rounded-full border border-verde-escuro/20 px-5 py-3 text-[13px] text-verde-escuro hover:border-verde-escuro transition-colors">
                  {p.menu}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <WhatsAppFloat />
      <Footer />
    </>
  )
}
