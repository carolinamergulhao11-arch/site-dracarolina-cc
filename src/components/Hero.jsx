import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LineReveal from './motion/LineReveal'
import { HERO_FOTO } from '../data/imagens'

const MotionLink = motion.create(Link)

const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, 160])
  const fade = useTransform(scrollY, [0, 500], [1, 0])
  const reduce = useReducedMotion()

  return (
    <section id="inicio" className="relative h-svh min-h-[640px] flex items-end overflow-hidden text-white bg-verde-escuro">
      <motion.img
        style={{ y: reduce ? 0 : y }}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 2.6, ease: EASE }}
        src={HERO_FOTO.src}
        srcSet={HERO_FOTO.srcSet}
        sizes={HERO_FOTO.sizes}
        width={HERO_FOTO.width}
        height={HERO_FOTO.height}
        fetchPriority="high"
        alt={HERO_FOTO.alt}
        className="absolute inset-0 w-full h-full object-cover object-[center_15%] md:object-[110%_15%]"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(14,22,19,0.45) 0%, rgba(14,22,19,0) 22%, rgba(14,22,19,0.3) 45%, rgba(14,22,19,0.9) 100%)' }}
      />
      <div
        className="hidden md:block absolute inset-y-0 left-0 w-[60%]"
        style={{ background: 'linear-gradient(90deg, rgba(14,22,19,0.7) 0%, rgba(14,22,19,0.35) 60%, transparent 100%)' }}
      />

      <motion.div style={{ opacity: fade }} className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-16 md:pb-20">
        {/* O rótulo faz parte do H1 (palavra-chave "Endocrinologia · São Paulo"), com o mesmo visual de antes.
            Entrada só com deslocamento, sem opacity 0: conteúdo visível desde o 1º quadro (LCP) */}
        <LineReveal
          as="h1"
          immediate
          before={
            <motion.span
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              className="eyebrow block font-sans leading-normal text-bege-claro mb-6"
            >
              Endocrinologia &amp; Metabologia · São Paulo
            </motion.span>
          }
          lines={['Muito além', 'da balança']}
          className="uppercase text-display max-w-4xl mb-8"
        />
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <motion.p
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="text-base md:text-lg font-light max-w-md text-white/85 leading-relaxed"
          >
            Tratamento individualizado da obesidade, do metabolismo e da saúde hormonal.
          </motion.p>
          <MotionLink
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            to="/contato/"
            className="self-start md:self-auto inline-block rounded-full bg-white text-verde-escuro px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:bg-creme hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Agendar consulta
          </MotionLink>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="hidden md:flex absolute bottom-10 right-10 z-10 flex-col items-center gap-3 text-white/70"
        aria-hidden="true"
      >
        <span className="eyebrow [writing-mode:vertical-rl]">Role</span>
        <span className="relative w-px h-14 bg-white/25 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-white"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
