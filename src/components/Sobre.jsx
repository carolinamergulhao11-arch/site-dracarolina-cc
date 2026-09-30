import Reveal from './Reveal'
import LineReveal from './motion/LineReveal'
import ImageReveal from './motion/ImageReveal'

const CREDENCIAIS = [
  { sigla: 'UFRJ', texto: 'Formação em Medicina' },
  { sigla: 'IEDE', texto: 'Endocrinologia e Metabologia' },
  { sigla: 'SBEM', texto: 'Especialista desde 2007' },
  { sigla: 'ABRAN', texto: 'Nutrologia' },
  { sigla: 'FAPES', texto: 'Medicina Integrativa' },
]

export default function Sobre() {
  return (
    <section id="sobre" className="bg-areia py-28 md:py-44 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-5 relative self-start">
          <ImageReveal
            src="/assets/images/dra-carolina-mergulhao-bracos-cruzados-editorial.webp"
            alt="Dra. Carolina Mergulhão, endocrinologista e metabologista em São Paulo"
            pos="center 12%"
            className="aspect-[3/4]"
          />
          <Reveal delay={0.4} className="absolute -bottom-6 -right-4 md:-right-10 bg-verde-escuro text-creme px-7 py-6">
            <div className="font-serif text-5xl leading-none mb-2">2007</div>
            <div className="eyebrow text-bege-claro text-[0.62rem]">Especialista SBEM</div>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-16">
          <Reveal className="eyebrow text-verde-oliva mb-6">Sobre</Reveal>
          <LineReveal lines={['Dra. Carolina', 'Mergulhão']} className="uppercase text-section mb-10" />
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-verde-escuro/85 mb-6">
              Formada pela UFRJ e especializada em Endocrinologia e Metabologia pelo IEDE, a Dra. Carolina Mergulhão
              foi além da grade curricular tradicional. Aprofundou-se em Nutrologia pela ABRAN-SP e em Medicina
              Integrativa pela FAPES, construindo um olhar mais completo sobre obesidade, metabolismo e saúde hormonal.
            </p>
            <p className="text-lg leading-relaxed text-verde-escuro/85">
              Especialista pela Sociedade Brasileira de Endocrinologia e Metabologia desde 2007 e membro ativa da
              instituição, transforma ciência em tratamento individualizado, muito além da balança.
            </p>
          </Reveal>

          <Reveal delay={0.2} as="ul" className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8 mt-14 pt-10 border-t border-verde-escuro/15">
            {CREDENCIAIS.map(c => (
              <li key={c.sigla}>
                <div className="font-serif text-3xl tracking-[0.06em] mb-1.5">{c.sigla}</div>
                <div className="text-[13px] text-verde-escuro/65">{c.texto}</div>
              </li>
            ))}
          </Reveal>

          <Reveal delay={0.3} className="mt-12 text-[11px] tracking-[0.2em] uppercase text-verde-oliva">
            CRM-SP 137.944 · RQE 36.594
          </Reveal>
        </div>
      </div>
    </section>
  )
}
