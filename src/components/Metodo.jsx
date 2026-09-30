import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import LineReveal from './motion/LineReveal'

const ETAPAS = [
  {
    title: 'Avaliação completa',
    text: 'Histórico de saúde, exames, hábitos de sono, nível de estresse e composição corporal. O ponto de partida é entender a pessoa por trás do peso na balança.',
  },
  {
    title: 'Diagnóstico individualizado',
    text: 'Cada corpo responde de um jeito. O diagnóstico cruza dados hormonais, metabólicos e de estilo de vida para identificar o que realmente trava o emagrecimento.',
  },
  {
    title: 'Plano de tratamento',
    text: 'Terapia farmacológica quando indicada, orientação nutricional, preservação de massa muscular e ajustes de sono e estresse, tudo desenhado para o seu caso.',
  },
  {
    title: 'Acompanhamento contínuo',
    text: 'Consultas de retorno para ajustar o plano conforme a resposta do corpo, garantindo resultado sustentável e sem efeito sanfona.',
  },
]

function Etapa({ etapa, index, active, onActive }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })

  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: active ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
      className="md:min-h-[55vh] flex flex-col justify-center py-10 md:py-0 border-t border-creme/15 md:border-0"
    >
      <div className="font-serif text-[clamp(4.5rem,9vw,8rem)] leading-none text-bege-claro mb-6">0{index + 1}</div>
      <h3 className="font-serif font-normal uppercase tracking-[0.04em] text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight text-white mb-5">
        {etapa.title}
      </h3>
      <p className="text-base md:text-lg leading-relaxed text-creme/75 max-w-lg">{etapa.text}</p>
    </motion.div>
  )
}

export default function Metodo() {
  const [active, setActive] = useState(0)
  const stepsRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 0.5', 'end 0.5'] })

  return (
    <section id="metodo" className="bg-verde-escuro text-white py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-8">
        <div className="md:col-span-5 md:sticky md:top-28 md:self-start md:h-[calc(100svh-14rem)] flex flex-col">
          <Reveal className="eyebrow text-bege-claro mb-6">Como funciona</Reveal>
          <LineReveal lines={['Método', 'Dra. Carolina', 'Mergulhão']} className="uppercase text-section mb-6" />
          <Reveal delay={0.1} className="text-creme/70 mb-10">Quatro etapas para transformar sua vida.</Reveal>

          <div className="hidden md:flex items-center gap-5 mt-auto mb-10">
            <div className="font-serif text-xl w-16 overflow-hidden h-7 relative">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  0{active + 1}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="relative h-px flex-1 max-w-56 bg-creme/20">
              <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 bg-bege-claro origin-left" />
            </div>
            <span className="font-serif text-xl text-creme/50">04</span>
          </div>

          <Reveal delay={0.2}>
            <Link
              to="/contato/"
              className="inline-block rounded-full bg-creme text-verde-escuro px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:bg-white hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"
            >
              Iniciar meu tratamento
            </Link>
          </Reveal>
        </div>

        <div ref={stepsRef} className="md:col-span-6 md:col-start-7">
          {ETAPAS.map((etapa, i) => (
            <Etapa key={etapa.title} etapa={etapa} index={i} active={active === i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  )
}
