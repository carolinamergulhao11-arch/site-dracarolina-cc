// Pixel da Meta, só depois do "Aceitar" do banner de cookies (LGPD). Sem autoConfig: o Pixel não
// lê botões nem campos de formulário sozinho. Nenhum evento leva nome, telefone ou mensagem.
const PIXEL_ID = '1069525239046134'
const CHAVE = 'cookies-meta'
const WHATSAPP = 'a[href^="https://wa.me/"]'

let ativo = false

export function escolhaSalva() {
  try {
    return localStorage.getItem(CHAVE)
  } catch {
    return null
  }
}

function carregar() {
  if (ativo) return
  ativo = true
  if (window.fbq) {
    window.fbq('consent', 'grant')
    return
  }
  const f = (window.fbq = function () {
    f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments)
  })
  window._fbq = f
  f.push = f
  f.loaded = true
  f.version = '2.0'
  f.queue = []
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(s)
  f('set', 'autoConfig', false, PIXEL_ID)
  f('init', PIXEL_ID)
}

// Chamado na abertura do site: quem já aceitou antes volta a ser medido.
export function iniciarPixel() {
  if (escolhaSalva() === 'aceito') carregar()
}

export function escolherCookies(aceitou) {
  try {
    localStorage.setItem(CHAVE, aceitou ? 'aceito' : 'recusado')
  } catch {
    // sem armazenamento: vale só nesta visita
  }
  if (aceitou) {
    carregar()
    rastrear('PageView')
  } else if (ativo) {
    ativo = false
    window.fbq('consent', 'revoke')
  }
}

export function rastrear(evento, params) {
  if (!ativo) return
  try {
    // eventID único: permite deduplicar com a API de Conversões, se ela for ligada depois
    const eventID = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    window.fbq('track', evento, params ?? {}, { eventID })
  } catch {
    // medição nunca pode quebrar o site
  }
}

// Todo link de WhatsApp do site conta como "Contact", sem editar cada botão.
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    if (e.target.closest?.(WHATSAPP)) rastrear('Contact')
  })
}
