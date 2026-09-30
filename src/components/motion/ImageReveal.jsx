import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const mask = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1] } },
}

const zoom = {
  hidden: { scale: 1.25 },
  show: { scale: 1.12, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } },
}

// Foto revelada por máscara (de baixo para cima) com leve parallax durante o scroll.
// O gatilho fica no wrapper sem clip-path: o Chrome não considera visível um alvo 100% recortado.
export default function ImageReveal({ src, alt, className = '', pos = 'center' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div variants={mask} className="absolute inset-0 overflow-hidden">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          variants={zoom}
          style={{ y, objectPosition: pos }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  )
}
