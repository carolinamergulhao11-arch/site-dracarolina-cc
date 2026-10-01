import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Cada linha sobe de dentro de uma máscara. O gatilho (visível na tela) fica no título inteiro,
// que nunca é cortado; observar a linha em si falhava no Safari, porque ela começa escondida
// sob a máscara e o navegador a considerava fora da tela (a linha nunca aparecia).
// `immediate` anima no carregamento (hero); sem ele, anima ao entrar na tela.
export default function LineReveal({ lines, before = null, as = 'h2', className = '', delay = 0, immediate = false }) {
  const Tag = motion[as]
  const trigger = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '-60px' } }

  const linha = {
    hidden: { y: '105%' },
    show: (i) => ({ y: 0, transition: { duration: 1.1, delay: delay + i * 0.09, ease: EASE } }),
  }

  return (
    <Tag className={className} initial="hidden" {...trigger}>
      {before}
      {lines.map((line, i) => (
        // Folga no topo para acentos de maiúsculas (Ã, É, Ê) não serem cortados pela máscara
        <span key={i} className="block overflow-hidden pt-[0.18em] -mt-[0.18em] pb-[0.06em]">
          <motion.span className="block" variants={linha} custom={i}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
