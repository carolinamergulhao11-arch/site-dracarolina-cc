import Lenis from 'lenis'

// Rolagem suave; o próprio Lenis desliga com prefers-reduced-motion e trata links /#âncora na mesma página.
export const lenis = new Lenis({ autoRaf: true, anchors: true })
