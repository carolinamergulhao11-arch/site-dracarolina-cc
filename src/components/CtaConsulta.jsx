import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { WHATSAPP_URL } from '../data/contato'

export default function CtaConsulta({ className = '' }) {
  return (
    <Reveal className={`bg-verde-escuro text-white px-8 py-14 md:px-16 md:py-20 grid md:grid-cols-12 gap-8 items-center ${className}`}>
      <div className="md:col-span-8">
        <div className="eyebrow text-bege-claro mb-5">Prefere conversar?</div>
        <p className="font-serif uppercase tracking-[0.04em] text-[clamp(1.8rem,3.4vw,3rem)] leading-tight">
          Cada corpo responde de um jeito. Vamos entender o seu.
        </p>
      </div>
      <div className="md:col-span-4 flex flex-col gap-3 md:items-end">
        <Link
          to="/contato/"
          className="text-center rounded-full bg-creme text-verde-escuro px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:bg-white hover:-translate-y-0.5"
        >
          Agendar consulta
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          className="text-center rounded-full border border-creme/50 text-creme px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:bg-creme hover:text-verde-escuro"
        >
          Falar no WhatsApp
        </a>
      </div>
    </Reveal>
  )
}
