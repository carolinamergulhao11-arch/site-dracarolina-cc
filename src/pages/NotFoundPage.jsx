import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LineReveal from '../components/motion/LineReveal'
import { MARCA } from '../data/seo'

export default function NotFoundPage() {
  return (
    <>
      <Seo title={`Página não encontrada | ${MARCA}`} />
      <Header />
      <main className="bg-off pt-40 md:pt-52 pb-28 md:pb-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="eyebrow text-verde-oliva mb-6">Erro 404</div>
          <LineReveal as="h1" immediate lines={['Página não', 'encontrada']} className="uppercase text-display mb-8" />
          <p className="text-lg leading-relaxed text-verde-escuro/75 max-w-xl mb-12">
            O endereço que você acessou não existe ou mudou de lugar. Você pode voltar ao início, ler os artigos do blog
            ou agendar sua consulta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="text-center rounded-full bg-verde-escuro text-white px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:bg-verde-oliva"
            >
              Voltar ao início
            </Link>
            <Link
              to="/blog/"
              className="text-center rounded-full border border-verde-escuro/30 text-verde-escuro px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:border-verde-escuro"
            >
              Ver o blog
            </Link>
            <Link
              to="/contato/"
              className="text-center rounded-full border border-verde-escuro/30 text-verde-escuro px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:border-verde-escuro"
            >
              Agendar consulta
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
