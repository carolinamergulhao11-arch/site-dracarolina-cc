// Roda depois do `vite build`: gera um HTML por rota com title/meta/OG/JSON-LD estáticos,
// para que crawlers sem JS (WhatsApp, Facebook) e o Google recebam status 200 e metadados certos.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { POSTS } from '../src/data/posts.js'
import { PERGUNTAS } from '../src/data/faq.js'
import { SEO, MARCA, tituloDoPost } from '../src/data/seo.js'

const SITE = 'https://dracarolinamergulhao.com.br'
const SITE_NAME = MARCA
const HERO = '/assets/images/dra-carolina-mergulhao-hero-sorrindo-varanda.webp'
// Recorte 1200x630 para prévia de link (a foto do hero é vertical e sairia cortada)
const OG_IMAGE = '/assets/images/og/dra-carolina-mergulhao-og.jpg'
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

function seoBlock({ title, description, path, image, type, jsonLd = [], preload }) {
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
    preload ? `<link rel="preload" as="image" href="${preload}" fetchpriority="high">` : '',
    ...jsonLd.map(ld),
  ].filter(Boolean).join('\n')
}

const physician = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dra. Carolina Mergulhão',
  alternateName: 'Carolina de Abreu Gonçalves Mergulhão',
  description: 'Endocrinologista e metabologista em São Paulo. Tratamento individualizado de emagrecimento, obesidade e saúde hormonal.',
  url: SITE + '/',
  image: ogImage(OG_IMAGE),
  medicalSpecialty: 'Endocrine',
  telephone: '+5511976481629',
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
const render = (block) => template.replace(MARKER, block)

const routes = [
  {
    path: '/',
    file: `${DIST}/index.html`,
    block: seoBlock({
      ...SEO.home,
      path: '/',
      image: OG_IMAGE,
      type: 'website',
      preload: HERO,
      jsonLd: [physician, faqPage],
    }),
  },
  {
    path: '/blog/',
    file: `${DIST}/blog/index.html`,
    block: seoBlock({
      ...SEO.blog,
      path: '/blog/',
      image: POSTS[0].image,
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
      image: OG_IMAGE,
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
        author: { '@type': 'Person', name: SITE_NAME, jobTitle: 'Endocrinologista e Metabologista', url: SITE + '/' },
        publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE}/assets/logos/logo-horizontal.png` } },
        mainEntityOfPage: `${SITE}/blog/${post.slug}/`,
      }],
    }),
  })),
]

for (const r of routes) {
  mkdirSync(r.file.slice(0, r.file.lastIndexOf('/')), { recursive: true })
  writeFileSync(r.file, render(r.block))
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE}${r.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(`${DIST}/sitemap.xml`, sitemap)

console.log(`prerender-meta: ${routes.length} páginas + sitemap.xml`)
