import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

import { INSTAGRAM_URL } from '../data/contato'
import { lenis } from '../lib/lenis'

// `page`: rota própria (Link do router); sem ele, âncora de seção da home.
const LINKS = [
  { href: '/#especialidades', label: 'Especialidades' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#metodo', label: 'Método' },
  { href: '/blog/', label: 'Blog', page: true },
  { href: '/#faq', label: 'FAQ' },
  { href: '/contato/', label: 'Contato', page: true },
]

function NavLink({ link, className, onClick }) {
  return link.page
    ? <Link to={link.href} className={className} onClick={onClick}>{link.label}</Link>
    : <a href={link.href} className={className} onClick={onClick}>{link.label}</a>
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)
  const botaoMenu = useRef(null)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()

  // Menu aberto: a página por trás não rola e o Esc fecha, devolvendo o foco ao botão.
  useEffect(() => {
    if (!open) return
    lenis.stop()
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      botaoMenu.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useMotionValueEvent(scrollY, 'change', y => {
    setAtTop(y < 40)
    setHidden(y > 300 && y > scrollY.getPrevious())
  })

  // Transparente só sobre o hero da home; nas outras páginas e com o menu aberto, sólido.
  const light = pathname === '/' && atTop && !open

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden && !open ? '-100%' : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-100 transition-colors duration-500 ${
        light ? 'bg-transparent text-white' : 'bg-off text-verde-escuro border-b border-verde-escuro/10'
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[120] focus:rounded-full focus:bg-verde-escuro focus:px-5 focus:py-2.5 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.16em] focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 py-3">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="transition-transform duration-200 hover:scale-[1.03]">
          <img
            src="/assets/logos/logo-horizontal.webp"
            alt="Dra. Carolina Mergulhão"
            width={560}
            height={109}
            className={`h-9 min-[360px]:h-11 md:h-12 w-auto transition-[filter] duration-500 ${light ? 'brightness-0 invert' : ''}`}
          />
        </Link>
        <ul className="hidden lg:flex lg:gap-8 xl:gap-10 text-[12px] tracking-[0.18em] uppercase font-medium">
          {LINKS.map(link => (
            <li key={link.href}>
              <NavLink
                link={link}
                className={`relative pb-1 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-current after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300 ${
                  link.page && pathname.startsWith(link.href) ? 'after:scale-x-100' : 'after:scale-x-0'
                }`}
              />
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 md:gap-6">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" aria-label="Instagram da Dra. Carolina Mergulhão" className="p-3 -m-3 transition-opacity hover:opacity-70">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <Link
            to="/contato/"
            className={`hidden lg:inline-block rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              light ? 'bg-white text-verde-escuro hover:bg-creme' : 'bg-verde-escuro text-white hover:bg-verde-oliva'
            }`}
          >
            Agendar consulta
          </Link>
          <button
            ref={botaoMenu}
            className="lg:hidden relative w-11 h-11 -mr-2"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen(o => !o)}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 0 : -6 }}
              transition={{ duration: 0.25 }}
              className="absolute left-2 top-1/2 w-7 h-px bg-current origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="absolute left-2 top-1/2 w-7 h-px bg-current"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? 0 : 6 }}
              transition={{ duration: 0.25 }}
              className="absolute left-2 top-1/2 w-7 h-px bg-current origin-center"
            />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.ul
              id="menu-mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden flex flex-col gap-5 absolute top-full inset-x-0 bg-off border-b border-verde-escuro/10 p-7 text-sm tracking-[0.18em] uppercase overflow-hidden"
            >
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <NavLink link={link} onClick={() => setOpen(false)} />
                </motion.li>
              ))}
              <li>
                <Link to="/contato/" onClick={() => setOpen(false)} className="inline-block rounded-full bg-verde-escuro text-white px-6 py-3 text-xs font-semibold tracking-wider">
                  Agendar consulta
                </Link>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
