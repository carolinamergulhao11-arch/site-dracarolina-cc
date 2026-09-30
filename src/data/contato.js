export const WHATSAPP_NUMERO = '5511976481629'
export const WHATSAPP_EXIBICAO = '(11) 97648-1629'

export const whatsappLink = (texto) => `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`

export const WHATSAPP_URL = whatsappLink('Olá! Estou enviando esta mensagem através do link de WhatsApp disponível no site.')

export const INSTAGRAM_URL = 'https://www.instagram.com/dracarolinamergulhao/'

export const ENDERECO = {
  linha1: 'R. da Consolação, 3741, 12º andar',
  linha2: 'Cerqueira César, São Paulo, SP',
  cep: '01416-001',
}

export const MAPA_URL = 'https://www.google.com/maps/search/?api=1&query=R.+da+Consola%C3%A7%C3%A3o,+3741,+Cerqueira+C%C3%A9sar,+S%C3%A3o+Paulo+-+SP'
export const MAPA_EMBED = 'https://www.google.com/maps?q=R.+da+Consola%C3%A7%C3%A3o,+3741+-+Cerqueira+C%C3%A9sar,+S%C3%A3o+Paulo+-+SP,+01416-001&output=embed'
