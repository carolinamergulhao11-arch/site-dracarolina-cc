// Roda depois do `vite build`: gera um HTML por rota com title/meta/OG/JSON-LD estáticos,
// para que crawlers sem JS (WhatsApp, Facebook) e o Google recebam status 200 e metadados certos.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { POSTS, srcsetArte } from '../src/data/posts.js'
import { PERGUNTAS } from '../src/data/faq.js'
import { SEO, MARCA, tituloDoPost } from '../src/data/seo.js'
import { MAPA_URL } from '../src/data/contato.js'
import { HERO_FOTO } from '../src/data/imagens.js'

const SITE = 'https://dracarolinamergulhao.com.br'
const SITE_NAME = MARCA
// Recorte 1200x630 da foto do hero (vertical), usado como imagem da Dra. no schema Physician
const OG_IMAGE = '/assets/images/og/og-foto-dra-carolina-mergulhao.jpg'
// Cartão da marca para prévia de link (fonte em _originais/og/og-fonte.html)
const OG_CARD = '/assets/images/og/og-card-dra-carolina-mergulhao.jpg'
const INSTAGRAM = 'https://www.instagram.com/dracarolinamergulhao/'
const DIST = 'dist'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// JPG na prévia de link: WhatsApp e alguns crawlers não exibem WebP
const ogImage = (p) => SITE + p.replace(/\.webp$/, '.jpg')
// Largura/altura lidas do cabeçalho JPEG (marcador SOF), sem dependência externa
function jpegSize(file) {
  const b = readFileSync(file)
  for (let i = 2; i < b.length; i += 2 + b.readUInt16BE(i + 2)) {
    const m = b[i + 1]
    if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) {
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) }
    }
  }
  throw new Error(`Dimensões não encontradas em ${file}`)
}
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

function seoBlock({ title, description, path, image, type, jsonLd = [], preload, preloadSrcset, preloadSizes }) {
  const url = SITE + path
  const img = ogImage(image)
  const { width, height } = jpegSize(DIST + img.slice(SITE.length))
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:image" content="${img}">`,
    `<meta property="og:image:width" content="${width}">`,
    `<meta property="og:image:height" content="${height}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<meta name="twitter:image" content="${img}">`,
    preload
      ? `<link rel="preload" as="image" href="${preload}"${preloadSrcset ? ` imagesrcset="${preloadSrcset}" imagesizes="${preloadSizes}"` : ''} fetchpriority="high">`
      : '',
    ...jsonLd.map(ld),
  ].filter(Boolean).join('\n')
}

// @id estável: os artigos apontam para a mesma entidade (autoria) sem repetir os dados
const PHYSICIAN_ID = SITE + '/#medico'

const physician = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  '@id': PHYSICIAN_ID,
  name: 'Dra. Carolina Mergulhão',
  alternateName: 'Carolina de Abreu Gonçalves Mergulhão',
  description: 'Endocrinologista e metabologista em São Paulo. Tratamento individualizado de emagrecimento, obesidade e saúde hormonal.',
  url: SITE + '/',
  image: ogImage(OG_IMAGE),
  medicalSpecialty: 'Endocrine',
  telephone: '+5511976481629',
  hasMap: MAPA_URL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'R. da Consolação, 3741 - 12º andar - Cerqueira César',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '01416-001',
    addressCountry: 'BR',
  },
  sameAs: [INSTAGRAM],
}

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PERGUNTAS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

const template = readFileSync(`${DIST}/index.html`, 'utf8')
const MARKER = /<!--seo[\s\S]*?<!--\/seo-->/
if (!MARKER.test(template)) throw new Error('Bloco <!--seo--> não encontrado em dist/index.html')
// CSP por metatag (o GitHub Pages não permite cabeçalhos HTTP). Só no build: o Vite dev usa scripts
// inline de hot reload. Cada <script> inline executável do template entra por hash; JSON-LD é dado, não conta.
const inlineHashes = [...template.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(([, code]) => `'sha256-${createHash('sha256').update(code).digest('base64')}'`)
const CSP = [
  "default-src 'self'",
  `script-src 'self' ${inlineHashes.join(' ')}`,
  "style-src 'self' 'unsafe-inline'", // Framer Motion anima via atributo style
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  'frame-src https://www.google.com', // mapa do Contato, carregado sob demanda
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')
const CHARSET = '<meta charset="UTF-8">'
if (!template.includes(CHARSET)) throw new Error('meta charset não encontrado em dist/index.html')
const SEGURANCA = `${CHARSET}\n<meta http-equiv="Content-Security-Policy" content="${CSP}">\n<meta name="referrer" content="strict-origin-when-cross-origin">`
const render = (block) => template.replace(MARKER, () => block).replace(CHARSET, () => SEGURANCA)

const routes = [
  {
    path: '/',
    file: `${DIST}/index.html`,
    block: seoBlock({
      ...SEO.home,
      path: '/',
      image: OG_CARD,
      type: 'website',
      preload: HERO_FOTO.src,
      preloadSrcset: HERO_FOTO.srcSet,
      preloadSizes: HERO_FOTO.sizes,
      jsonLd: [physician, faqPage],
    }),
  },
  {
    path: '/blog/',
    file: `${DIST}/blog/index.html`,
    block: seoBlock({
      ...SEO.blog,
      path: '/blog/',
      image: OG_CARD,
      preload: POSTS[0].image,
      // Mesmo srcset/sizes do destaque em BlogPage.jsx, para o preload baixar o arquivo que será usado
      preloadSrcset: srcsetArte(POSTS[0].image),
      preloadSizes: '(min-width: 768px) 58vw, 100vw',
      type: 'website',
      jsonLd: [{
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `Blog | ${SITE_NAME}`,
        url: `${SITE}/blog/`,
        inLanguage: 'pt-BR',
        author: { '@type': 'Person', name: SITE_NAME },
        blogPost: POSTS.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${SITE}/blog/${post.slug}/`,
          image: ogImage(post.image),
        })),
      }],
    }),
  },
  {
    path: '/contato/',
    file: `${DIST}/contato/index.html`,
    block: seoBlock({
      ...SEO.contato,
      path: '/contato/',
      image: OG_CARD,
      type: 'website',
      jsonLd: [{
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        url: `${SITE}/contato/`,
        inLanguage: 'pt-BR',
        about: physician,
      }],
    }),
  },
  ...POSTS.map((post) => ({
    path: `/blog/${post.slug}/`,
    file: `${DIST}/blog/${post.slug}/index.html`,
    block: seoBlock({
      title: tituloDoPost(post),
      description: post.description,
      path: `/blog/${post.slug}/`,
      image: post.image,
      type: 'article',
      preload: post.image,
      jsonLd: [{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: ogImage(post.image),
        datePublished: post.publicado,
        dateModified: post.atualizado ?? post.publicado,
        keywords: post.tags.join(', '),
        articleSection: post.category,
        inLanguage: 'pt-BR',
        author: { '@type': 'Person', '@id': PHYSICIAN_ID, name: SITE_NAME, jobTitle: 'Endocrinologista e Metabologista', url: SITE + '/' },
        publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE}/assets/logos/logo-horizontal.png` } },
        mainEntityOfPage: `${SITE}/blog/${post.slug}/`,
      }, {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE + '/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE}/blog/${post.slug}/` },
        ],
      }],
    }),
    lastmod: post.atualizado ?? post.publicado,
  })),
]

for (const r of routes) {
  mkdirSync(r.file.slice(0, r.file.lastIndexOf('/')), { recursive: true })
  writeFileSync(r.file, render(r.block))
}

// lastmod só onde há uma data de verdade (a do conteúdo); com a data do build, o Google passa a ignorá-lo
const maisRecente = POSTS.map((p) => p.atualizado ?? p.publicado).sort().at(-1)
routes.find((r) => r.path === '/blog/').lastmod = maisRecente
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE}${r.path}</loc>${r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`
writeFileSync(`${DIST}/sitemap.xml`, sitemap)

console.log(`prerender-meta: ${routes.length} páginas + sitemap.xml`)
