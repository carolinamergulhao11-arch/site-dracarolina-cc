// Foto do hero em 3 larguras (900/1400/2000); o navegador escolhe pela tela e pela densidade de pixels.
// Compartilhado entre o Hero e o preload gerado em scripts/prerender-meta.mjs.
const BASE = '/assets/images/dra-carolina-mergulhao-endocrinologista-sao-paulo'

export const HERO_FOTO = {
  src: `${BASE}-1400.webp`,
  srcSet: `${BASE}-900.webp 900w, ${BASE}-1400.webp 1400w, ${BASE}-2000.webp 2000w`,
  // No celular a foto é recortada pela altura (object-cover) e fica ~40% mais larga que a tela.
  sizes: '(max-width: 767px) 140vw, 100vw',
  width: 2000,
  height: 3000,
  alt: 'Dra. Carolina Mergulhão, endocrinologista e metabologista em São Paulo',
}
