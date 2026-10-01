import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { lenis } from '../lib/lenis'
import Reveal from './Reveal'
import LineReveal from './motion/LineReveal'

const FOTOS = [
  { src: '/assets/images/dra-carolina-mergulhao-macacao-verde-sorrindo-editorial.webp', alt: 'Dra. Carolina Mergulhão sorrindo', pos: 'center 12%' },
  { src: '/assets/images/dra-carolina-mergulhao-blazer-branco-verde-editorial.webp', alt: 'Dra. Carolina Mergulhão de blazer', pos: 'center 15%' },
  { src: '/assets/images/dra-carolina-mergulhao-notebook-oculos-editorial.webp', alt: 'Dra. Carolina Mergulhão trabalhando', pos: 'center 10%' },
  { src: '/assets/images/dra-carolina-mergulhao-com-pet-sorrindo-editorial.webp', alt: 'Dra. Carolina Mergulhão com seu pet', pos: 'center 15%' },
]

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

const ArrowIcon = ({ direction = 'left' }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: direction === 'right' ? 'scaleX(-1)' : undefined }}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
)

export default function Galeria() {
  const [openIndex, setOpenIndex] = useState(null)
  const gridRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ['start end', 'end start'] })
  // Colunas pares e ímpares em velocidades opostas.
  const ySlow = useTransform(scrollYProgress, [0, 1], [60, -60])
  const yFast = useTransform(scrollYProgress, [0, 1], [-20, 120])
  const reduce = useReducedMotion()
  const dialogRef = useRef(null)
  const origem = useRef(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const abrir = (i, e) => { origem.current = e.currentTarget; setOpenIndex(i) }
  const prev = useCallback(() => setOpenIndex(i => (i - 1 + FOTOS.length) % FOTOS.length), [])
  const next = useCallback(() => setOpenIndex(i => (i + 1) % FOTOS.length), [])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Tab') {
        // mantém o foco dentro do diálogo
        const foco = dialogRef.current?.querySelectorAll('button')
        if (!foco?.length) return
        const primeiro = foco[0], ultimo = foco[foco.length - 1]
        if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus() }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus() }
        else if (!dialogRef.current.contains(document.activeElement)) { e.preventDefault(); primeiro.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, close, prev, next])

  const aberto = openIndex !== null
  // Aberto: a página por trás não rola e o foco vai para o diálogo; ao fechar, volta para a foto de origem.
  useEffect(() => {
    if (!aberto) return
    lenis.stop()
    dialogRef.current?.querySelector('button')?.focus()
    const volta = origem.current
    return () => {
      lenis.start()
      volta?.focus()
    }
  }, [aberto])

  return (
    <section className="bg-verde-escuro pb-28 md:pb-44 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-16 md:mb-24 pt-16 md:pt-20 border-t border-creme/15">
          <Reveal className="md:col-span-3 eyebrow text-bege-claro pt-4">Galeria</Reveal>
          <LineReveal lines={['A Dra. Carolina']} className="md:col-span-9 uppercase text-section text-white" />
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {FOTOS.map((foto, i) => (
            <motion.button
              key={foto.src}
              type="button"
              onClick={(e) => abrir(i, e)}
              style={{ y: reduce ? 0 : i % 2 ? yFast : ySlow }}
              aria-label={`Ampliar foto: ${foto.alt}`}
              className={`relative overflow-hidden aspect-[3/4] group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme ${i % 2 ? 'md:mt-20' : ''}`}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                style={{ objectPosition: foto.pos }}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Galeria de fotos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center px-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute top-3 right-3 p-3 text-white/80 hover:text-white transition-colors"
            >
              <CloseIcon />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Foto anterior"
              className="absolute left-1 md:left-5 p-3 text-white/70 hover:text-white transition-colors"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Próxima foto"
              className="absolute right-1 md:right-5 p-3 text-white/70 hover:text-white transition-colors"
            >
              <ArrowIcon direction="right" />
            </button>
            <motion.img
              key={FOTOS[openIndex].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              src={FOTOS[openIndex].src}
              alt={FOTOS[openIndex].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85svh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
