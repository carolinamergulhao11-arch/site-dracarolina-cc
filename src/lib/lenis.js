import Lenis from 'lenis'

// Rolagem suave; o próprio Lenis desliga com prefers-reduced-motion e trata links /#âncora na mesma página.
// Só existe no navegador: no build (renderização no servidor) não há window, e todo uso acontece em efeitos.
export const lenis = typeof window === 'undefined' ? null : new Lenis({ autoRaf: true, anchors: true })
