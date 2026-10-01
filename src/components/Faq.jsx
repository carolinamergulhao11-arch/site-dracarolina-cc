import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import LineReveal from './motion/LineReveal'
import { PERGUNTAS } from '../data/faq'
import { WHATSAPP_URL } from '../data/contato'

export default function Faq() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="bg-off py-28 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
          <Reveal className="eyebrow text-verde-oliva mb-6">Dúvidas frequentes</Reveal>
          <LineReveal lines={['Perguntas', 'comuns']} className="uppercase text-section mb-8" />
          <Reveal delay={0.1} className="text-verde-escuro/70 leading-relaxed">
            Não encontrou sua dúvida?{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="text-verde-escuro underline underline-offset-4 decoration-verde-escuro/30 hover:decoration-verde-escuro">
              Fale pelo WhatsApp
            </a>
            .
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6 border-t border-verde-escuro/15">
          {PERGUNTAS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-verde-escuro/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? `faq-${i}` : undefined}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left text-[17px] font-medium text-verde-escuro hover:text-verde-oliva transition-colors"
                >
                  {item.q}
                  <span className={`relative w-3.5 h-3.5 shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">
                    <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-px bg-current" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 max-w-[640px] leading-relaxed text-verde-escuro/75">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
