import { useState } from 'react'
import Seo from '../components/Seo'
import { SEO } from '../data/seo'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import LineReveal from '../components/motion/LineReveal'
import ImageReveal from '../components/motion/ImageReveal'
import {
  whatsappLink, WHATSAPP_URL, WHATSAPP_EXIBICAO, INSTAGRAM_URL, ENDERECO, MAPA_URL, MAPA_EMBED,
} from '../data/contato'

const ASSUNTOS = [
  'Emagrecimento e obesidade',
  'Saúde da mulher e menopausa',
  'Composição corporal',
  'Sono e estresse',
  'Outro assunto',
]

const LABEL = 'block text-sm font-semibold text-verde-escuro mb-2.5'
const CAMPO = 'w-full rounded-2xl border border-bege-claro/70 bg-off/70 px-5 py-4 text-base text-verde-escuro placeholder:text-verde-escuro/40 transition-colors focus:outline-none focus:border-verde-escuro focus:bg-white'

// Monta a mensagem e abre o WhatsApp; nada é enviado a servidor nem guardado no site.
function enviar(e) {
  e.preventDefault()
  const dados = new FormData(e.currentTarget)
  const assunto = dados.get('assunto')
  const mensagem = dados.get('mensagem').trim()
  const linhas = [
    'Olá! Vim pelo site e gostaria de agendar uma avaliação.',
    `Nome: ${dados.get('nome').trim()}`,
    assunto && `Assunto: ${assunto}`,
    mensagem && `Mensagem: ${mensagem}`,
  ]
  window.open(whatsappLink(linhas.filter(Boolean).join('\n')), '_blank', 'noopener')
}

function Formulario() {
  return (
    <form onSubmit={enviar} className="bg-white border border-verde-escuro/10 rounded-3xl p-7 md:p-12 shadow-[0_30px_60px_-30px_rgba(36,64,58,0.25)]">
      <h2 className="font-sans tracking-normal text-2xl font-semibold text-verde-escuro mb-2">Envie sua mensagem</h2>
      <p className="text-verde-escuro/65 mb-9">Preencha os campos e a conversa abre no WhatsApp com tudo pronto.</p>

      <div className="space-y-6">
        <div>
          <label htmlFor="nome" className={LABEL}>Nome completo *</label>
          <input id="nome" name="nome" required minLength={2} autoComplete="name" placeholder="Seu nome completo" className={CAMPO} />
        </div>

        <div>
          <label htmlFor="assunto" className={LABEL}>Assunto</label>
          <div className="relative">
            <select id="assunto" name="assunto" defaultValue="" className={`${CAMPO} appearance-none pr-12 cursor-pointer`}>
              <option value="">Selecione um assunto</option>
              {ASSUNTOS.map(a => <option key={a}>{a}</option>)}
            </select>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-verde-escuro/60" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div>
          <label htmlFor="mensagem" className={LABEL}>Mensagem</label>
          <textarea id="mensagem" name="mensagem" rows={4} placeholder="Conte um pouco sobre sua situação ou dúvida" className={`${CAMPO} resize-y`} />
        </div>
      </div>

      <button
        type="submit"
        className="mt-9 w-full flex items-center justify-center gap-3 rounded-full bg-verde-escuro text-white py-4.5 text-[13px] font-semibold uppercase tracking-[0.16em] transition-all hover:bg-verde-oliva hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-escuro"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.2 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.17c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.37c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
        </svg>
        Enviar pelo WhatsApp
      </button>
      <p className="mt-5 text-center text-[13px] text-verde-escuro/50">
        O WhatsApp abre com a mensagem pronta. Nenhum dado fica salvo no site.
      </p>
    </form>
  )
}

// O iframe do Google Maps dispara ~17 requisições externas; só carrega quando a pessoa pede.
function Mapa() {
  const [ativo, setAtivo] = useState(false)
  const altura = 'w-full h-[360px] md:h-[440px]'

  if (ativo) {
    return (
      <iframe
        title="Localização do consultório"
        src={MAPA_EMBED}
        referrerPolicy="no-referrer-when-downgrade"
        className={`${altura} border-0`}
      />
    )
  }

  return (
    <div className={`${altura} bg-verde-escuro text-creme flex flex-col items-center justify-center gap-6 px-6 text-center`}>
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-bege-claro" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
      <p className="leading-relaxed text-creme/85">
        {ENDERECO.linha1}
        <br />
        {ENDERECO.linha2}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setAtivo(true)}
          className="rounded-full bg-creme text-verde-escuro px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-white"
        >
          Ver mapa aqui
        </button>
        <a
          href={MAPA_URL}
          target="_blank"
          rel="noopener"
          className="rounded-full border border-creme/50 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-creme hover:text-verde-escuro"
        >
          Abrir no Google Maps
        </a>
      </div>
    </div>
  )
}

export default function ContatoPage() {
  return (
    <>
      <Seo title={SEO.contato.title} />
      <Header />
      <main className="bg-off pt-36 md:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-14 md:gap-8">
          <div className="md:col-span-5">
            <Reveal className="eyebrow text-verde-oliva mb-6">Contato</Reveal>
            <LineReveal as="h1" immediate delay={0.1} lines={['Agende sua', 'consulta']} className="uppercase text-section mb-8" />
            <Reveal delay={0.2} className="text-lg leading-relaxed text-verde-escuro/75 mb-12">
              O primeiro passo é uma avaliação completa. Preencha o formulário ou fale direto pelos canais abaixo.
            </Reveal>

            <Reveal delay={0.25} as="dl" className="space-y-8 pt-10 border-t border-verde-escuro/15 mb-14">
              <div>
                <dt className="eyebrow text-verde-oliva mb-2.5">Endereço</dt>
                <dd className="leading-relaxed">
                  {ENDERECO.linha1}
                  <br />
                  {ENDERECO.linha2}, CEP {ENDERECO.cep}
                  <br />
                  <a href={MAPA_URL} target="_blank" rel="noopener" className="inline-block mt-2 py-2 -my-2 text-sm underline underline-offset-4 decoration-verde-escuro/30 hover:decoration-verde-escuro">
                    Ver no mapa ↗
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-verde-oliva mb-2.5">WhatsApp</dt>
                <dd>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="font-serif text-3xl tracking-[0.04em] hover:text-verde-oliva transition-colors">
                    {WHATSAPP_EXIBICAO}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-verde-oliva mb-2.5">Instagram</dt>
                <dd>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="inline-block py-2 -my-2 hover:text-verde-oliva transition-colors">
                    @dracarolinamergulhao
                  </a>
                </dd>
              </div>
            </Reveal>

            <ImageReveal
              src="/assets/images/dra-carolina-mergulhao-cafe-varanda-editorial.webp"
              alt="Dra. Carolina Mergulhão, endocrinologista em São Paulo, segurando uma xícara de café"
              pos="center 20%"
              className="hidden md:block aspect-[4/5]"
            />
          </div>

          <Reveal delay={0.2} className="md:col-span-6 md:col-start-7 md:sticky md:top-28 md:self-start">
            <Formulario />
          </Reveal>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-28 md:pb-40">
          <Mapa />
        </div>
      </main>
      <Footer />
    </>
  )
}
