import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const FRASE = 'O peso é só a parte visível. O tratamento olha para o metabolismo, os hormônios, o sono e a massa muscular que estão por trás dele.'
const WORDS = FRASE.split(' ')

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

// Frase que "acende" palavra a palavra conforme o scroll.
export default function Manifesto() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })

  return (
    <section className="bg-off py-28 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3 eyebrow text-verde-oliva pt-3">Nossa filosofia</div>
        <p ref={ref} className="md:col-span-9 font-serif uppercase text-[clamp(1.75rem,3.6vw,3.4rem)] leading-[1.22] tracking-[0.03em] text-verde-escuro">
          {reduce
            ? FRASE
            : WORDS.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / WORDS.length, (i + 1) / WORDS.length]}>
                  {w}
                </Word>
              ))}
        </p>
      </div>
    </section>
  )
}
