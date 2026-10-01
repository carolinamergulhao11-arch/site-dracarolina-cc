import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Título que sobe linha a linha de dentro de uma máscara.
// `immediate` anima no carregamento (hero); sem ele, anima ao entrar na tela.
export default function LineReveal({ lines, before = null, as = 'h2', className = '', delay = 0, immediate = false }) {
  const Tag = as
  const trigger = immediate
    ? { animate: { y: 0 } }
    : { whileInView: { y: 0 }, viewport: { once: true, margin: '-60px' } }

  return (
    <Tag className={className}>
      {before}
      {lines.map((line, i) => (
        // Folga no topo para acentos de maiúsculas (Ã, É, Ê) não serem cortados pela máscara
        <span key={i} className="block overflow-hidden pt-[0.18em] -mt-[0.18em] pb-[0.06em]">
          <motion.span
            className="block"
            initial={{ y: '105%' }}
            {...trigger}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
