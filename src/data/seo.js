// Títulos e descrições de busca. Usado pelas páginas (título da aba) e pelo
// scripts/prerender-meta.mjs (HTML estático), para os dois nunca divergirem.
// Limites de exibição do Google: título até 60 caracteres, descrição até 155.
export const MARCA = 'Dra. Carolina Mergulhão'

export const SEO = {
  home: {
    title: `${MARCA} | Endocrinologista em São Paulo`,
    description: 'Endocrinologista e metabologista em São Paulo. Tratamento individualizado de emagrecimento, obesidade e saúde hormonal, muito além da balança.',
  },
  blog: {
    title: `Blog sobre emagrecimento | ${MARCA}`,
    description: 'Artigos da Dra. Carolina Mergulhão, endocrinologista em São Paulo, sobre emagrecimento, metabolismo, massa muscular, menopausa, sono e estresse.',
  },
  privacidade: {
    title: `Política de Privacidade | ${MARCA}`,
    description: 'Como o site da Dra. Carolina Mergulhão trata dados e cookies, de acordo com a LGPD: formulário de contato, medição com consentimento e seus direitos.',
  },
  contato: {
    title: `Agende sua consulta em São Paulo | ${MARCA}`,
    description: 'Agende sua consulta com a Dra. Carolina Mergulhão, endocrinologista em São Paulo. Atendimento presencial na Consolação. WhatsApp (11) 97648-1629.',
  },
}

// A marca só entra se couber no limite; senão o título do artigo vai sozinho.
export const tituloDoPost = (post) => {
  const comMarca = `${post.title} | ${MARCA}`
  return comMarca.length <= 60 ? comMarca : post.title
}
