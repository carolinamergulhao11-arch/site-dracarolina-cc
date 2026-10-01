import { motion } from 'framer-motion'

// `fade={false}`: só desliza (sem opacity 0), para o conteúdo do topo da página estar visível desde o
// primeiro quadro, já que o HTML vem renderizado do build (e conta para o LCP).
export default function Reveal({ children, className = '', delay = 0, as = 'div', fade = true }) {
  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag
      className={className}
      initial={fade ? { opacity: 0, y: 24 } : { y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
