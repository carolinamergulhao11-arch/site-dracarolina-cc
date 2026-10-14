import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import LineReveal from './motion/LineReveal'
import { VIDEO } from '../data/video'

// Só o pôster vai no HTML do build; o vídeo (8 MB) é pedido apenas depois do clique, sem custo no LCP.
export default function VideoInstitucional({ comTitulo = true }) {
  const [tocando, setTocando] = useState(false)
  const [erro, setErro] = useState(false)
  const player = useRef(null)

  useEffect(() => { if (tocando) player.current?.focus() }, [tocando])

  return (
    <section aria-label="Vídeo de apresentação da Dra. Carolina" className={comTitulo ? 'bg-off py-28 md:py-44' : 'bg-off pb-20 md:pb-28'}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {comTitulo && (
          <div className="grid md:grid-cols-12 gap-8 mb-14 md:mb-20 pt-16 md:pt-20 border-t border-verde-escuro/15">
            <Reveal className="md:col-span-3 eyebrow text-verde-oliva pt-4">Apresentação</Reveal>
            <div className="md:col-span-9">
              <LineReveal as="h2" lines={['Conheça a', 'Dra. Carolina']} className="uppercase text-section mb-6" />
              <Reveal delay={0.1} className="max-w-xl text-lg leading-relaxed text-verde-escuro/75">
                Em poucos segundos, a Dra. Carolina apresenta o olhar com que conduz cada tratamento.
              </Reveal>
            </div>
          </div>
        )}

        <Reveal className="relative aspect-video bg-verde-escuro overflow-hidden">
          {tocando ? (
            <video
              ref={player}
              src={VIDEO.src}
              poster={VIDEO.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
              aria-label={VIDEO.titulo}
              onError={() => setErro(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={() => setTocando(true)}
              aria-label="Reproduzir vídeo de apresentação da Dra. Carolina"
              className="group absolute inset-0 w-full h-full"
            >
              <img
                src={VIDEO.poster}
                alt={VIDEO.alt}
                width={VIDEO.width}
                height={VIDEO.height}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-verde-escuro/20 transition-colors duration-500 group-hover:bg-verde-escuro/10" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-verde-escuro text-creme ring-1 ring-creme/40 shadow-[0_4px_14px_rgba(14,22,19,0.3)] transition-transform duration-500 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-creme">
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true" className="ml-1">
                    <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
                  </svg>
                </span>
              </span>
              <span className="absolute left-5 bottom-5 md:left-8 md:bottom-7 eyebrow text-creme">45 segundos</span>
            </button>
          )}
          {erro && (
            <a href={VIDEO.src} target="_blank" rel="noopener" className="absolute inset-x-0 bottom-0 bg-verde-escuro/90 px-5 py-4 text-center text-sm text-creme underline underline-offset-4">
              Não foi possível reproduzir aqui. Assistir em nova aba
            </a>
          )}
        </Reveal>
      </div>
    </section>
  )
}
