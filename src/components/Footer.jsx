import { Link } from 'react-router-dom'
import { PAGINAS } from '../data/paginas'
import { WHATSAPP_URL, WHATSAPP_EXIBICAO, INSTAGRAM_URL, ENDERECO } from '../data/contato'

const NAV = [
  { href: '/#especialidades', label: 'Especialidades' },
  { href: '/sobre/', label: 'Sobre', page: true },
  { href: '/#metodo', label: 'Método' },
  { href: '/blog/', label: 'Blog', page: true },
  { href: '/#faq', label: 'FAQ' },
  { href: '/contato/', label: 'Contato', page: true },
]

const LINK = 'inline-block py-1.5 hover:text-white transition-colors'

export default function Footer() {
  return (
    <footer className="bg-verde-escuro text-creme/80 pt-24 md:pt-32 pb-10 px-6 md:px-10 text-sm">
      <div className="max-w-[1400px] mx-auto">
        <p className="font-serif uppercase tracking-[0.04em] text-display text-creme mb-20 md:mb-28">
          Muito além
          <br />
          da balança
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 pt-12 border-t border-creme/15 mb-16">
          <img src="/assets/logos/logo-vertical-white.webp" alt="Dra. Carolina Mergulhão" width={420} height={192} loading="lazy" className="h-24 w-auto" />

          <div>
            <div className="eyebrow text-bege-claro mb-5">Navegação</div>
            <ul className="space-y-1">
              {NAV.map(l => (
                <li key={l.href}>
                  {l.page
                    ? <Link to={l.href} className={LINK}>{l.label}</Link>
                    : <a href={l.href} className={LINK}>{l.label}</a>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow text-bege-claro mb-5">Tratamentos</div>
            <ul className="space-y-1">
              {PAGINAS.filter(p => p.slug !== 'sobre').map(p => (
                <li key={p.slug}><Link to={`/${p.slug}/`} className={LINK}>{p.menu}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow text-bege-claro mb-5">Contato</div>
            <ul className="space-y-1">
              <li><a href={WHATSAPP_URL} target="_blank" rel="noopener" className={LINK}>{WHATSAPP_EXIBICAO}</a></li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={LINK}>Instagram</a></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-bege-claro mb-5">Localização</div>
            <p className="leading-relaxed">
              {ENDERECO.linha1}
              <br />
              {ENDERECO.linha2}
              <br />
              CEP {ENDERECO.cep}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 pt-8 pr-20 border-t border-creme/15 text-xs text-creme/50">
          <span>&copy; 2026 Dra. Carolina Mergulhão</span>
          <span>Endocrinologia e Metabologia · CRM-SP 137.944 · RQE 36.594</span>
          <span className="flex gap-5">
            <Link to="/privacidade/" className="hover:text-creme">Política de Privacidade</Link>
            <button type="button" onClick={() => window.dispatchEvent(new Event('abrir-cookies'))} className="hover:text-creme">
              Preferências de cookies
            </button>
          </span>
        </div>
      </div>
    </footer>
  )
}
