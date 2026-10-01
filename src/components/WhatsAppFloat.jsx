import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { WHATSAPP_URL } from '../data/contato'

// Nas cores da marca; na home só aparece depois do hero, para não disputar com o CTA principal.
export default function WhatsAppFloat() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [passouHero, setPassouHero] = useState(false)

  useMotionValueEvent(scrollY, 'change', y => setPassouHero(y > window.innerHeight * 0.8))

  const visivel = pathname !== '/' || passouHero

  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          aria-label="Falar no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-90 w-14 h-14 rounded-full flex items-center justify-center bg-verde-escuro text-creme ring-1 ring-creme/40 shadow-[0_4px_14px_rgba(14,22,19,0.3)] hover:bg-verde-oliva transition-colors"
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.2 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.17c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.37c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
