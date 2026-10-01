import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { escolhaSalva, escolherCookies } from '../lib/pixel'

const BOTAO = 'min-h-11 rounded-full px-6 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors'

// Só no cliente (começa fechado), para o HTML do build e a hidratação ficarem iguais.
export default function ConsentBanner() {
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    if (escolhaSalva() === null) setAberto(true)
    const reabrir = () => setAberto(true)
    window.addEventListener('abrir-cookies', reabrir)
    return () => window.removeEventListener('abrir-cookies', reabrir)
  }, [])

  if (!aberto) return null

  const escolher = (aceitou) => {
    escolherCookies(aceitou)
    setAberto(false)
  }

  return (
    <section
      aria-label="Preferências de cookies"
      className="fixed z-100 inset-x-4 bottom-4 md:right-auto md:left-6 md:bottom-6 md:max-w-md rounded-2xl bg-verde-escuro text-creme p-5 shadow-[0_10px_30px_rgba(14,22,19,0.35)]"
    >
      <p className="text-sm leading-relaxed mb-4">
        Usamos cookies de medição (Meta) para entender como o site é usado e melhorar nossa comunicação. Você escolhe se
        quer permitir. Saiba mais na{' '}
        <Link to="/privacidade/" className="underline underline-offset-2 hover:text-white">Política de Privacidade</Link>.
      </p>
      <div className="flex gap-3">
        <button type="button" onClick={() => escolher(true)} className={`${BOTAO} bg-creme text-verde-escuro hover:bg-white`}>
          Aceitar
        </button>
        <button type="button" onClick={() => escolher(false)} className={`${BOTAO} border border-creme/50 hover:bg-creme hover:text-verde-escuro`}>
          Recusar
        </button>
      </div>
    </section>
  )
}
