import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import LineReveal from './motion/LineReveal'
import { VIDEO } from '../data/video'

// Só o pôster vai no HTML do build; o vídeo (8 MB) é pedido apenas depois do clique, sem custo no LCP.
// Mesma gramática da seção Sobre: grid de 12 colunas, painel areia deslocado e pastilha sobreposta.
function Player() {
  const [tocando, setTocando] = useState(false)
  const [erro, setErro] = useState(false)
  const player = useRef(null)

  useEffect(() => { if (tocando) player.current?.focus() }, [tocando])

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -top-5 -right-4 bottom-8 left-8 md:-top-10 md:-right-10 md:bottom-10 md:left-14 bg-areia" />

      <div className="relative z-10 aspect-video bg-verde-escuro overflow-hidden">
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
            className="group absolute inset-0 w-full h-full focus-visible:outline-none"
          >
            <img
              src={VIDEO.poster}
              alt={VIDEO.alt}
              width={VIDEO.width}
              height={VIDEO.height}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-verde-escuro/0 transition-colors duration-500 group-hover:bg-verde-escuro/10" />
            {/* Botão à esquerda do centro: na capa, o rosto fica no terço direito */}
            <span className="absolute inset-0 flex items-center justify-start pl-[14%] md:pl-[16%]">
              <span className="relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28">
                <span className="absolute inset-0 rounded-full bg-verde-escuro/30 animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:hidden" />
                <span className="relative flex items-center justify-center w-full h-full rounded-full bg-verde-escuro text-creme ring-1 ring-creme/40 shadow-[0_4px_14px_rgba(14,22,19,0.3)] transition-transform duration-500 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-creme">
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true" className="ml-1">
                    <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
                  </svg>
                </span>
              </span>
            </span>
          </button>
        )}
        {erro && (
          <a href={VIDEO.src} target="_blank" rel="noopener" className="absolute inset-x-0 bottom-0 bg-verde-escuro/90 px-5 py-4 text-center text-sm text-creme underline underline-offset-4">
            Não foi possível reproduzir aqui. Assistir em nova aba
          </a>
        )}
      </div>

    </div>
  )
}

export default function VideoInstitucional({ comTitulo = true }) {
  if (!comTitulo) {
    return (
      <section aria-label="Vídeo de apresentação da Dra. Carolina" className="bg-off pb-24 md:pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-6 md:pt-10">
          <Reveal className="md:px-14"><Player /></Reveal>
        </div>
      </section>
    )
  }

  return (
    <section aria-label="Vídeo de apresentação da Dra. Carolina" className="bg-off py-28 md:py-44 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-14 md:gap-8">
        <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
          <Reveal className="eyebrow text-verde-oliva mb-6">Apresentação</Reveal>
          <LineReveal lines={['Conheça', 'a Dra.', 'Carolina']} className="uppercase text-section mb-8" />
          <Reveal delay={0.1} className="text-lg leading-relaxed text-verde-escuro/75 mb-10">
            Em 45 segundos, a Dra. Carolina apresenta o olhar com que conduz cada tratamento.
          </Reveal>
          <Reveal delay={0.2} className="text-[11px] tracking-[0.2em] uppercase text-verde-oliva">
            Endocrinologia e Metabologia
            <br />
            CRM-SP 137.944 · RQE 36.594
          </Reveal>
        </div>

        <Reveal delay={0.15} className="md:col-span-8 md:col-start-5 md:pt-4">
          <Player />
        </Reveal>
      </div>
    </section>
  )
}
