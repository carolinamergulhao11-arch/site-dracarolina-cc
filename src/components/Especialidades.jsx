import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import LineReveal from './motion/LineReveal'
import ImageReveal from './motion/ImageReveal'

const OUTRAS = [
  {
    title: 'Saúde da Mulher e Menopausa',
    text: 'Transição menopáusica, terapia hormonal individualizada e impacto hormonal no peso e metabolismo, com atenção aos sintomas que muitas vezes são ignorados.',
  },
  {
    title: 'Composição Corporal e Massa Muscular',
    text: 'Preservação e ganho de massa muscular, suplementação proteica orientada e prevenção do efeito sanfona.',
  },
  {
    title: 'Sono e Recuperação',
    text: 'Sono como pilar metabólico ativo no tratamento, não apenas descanso. Noites mal dormidas afetam hormônios, apetite e a resposta do corpo ao tratamento.',
  },
  {
    title: 'Estresse e Cortisol',
    text: 'Como o estresse crônico trava o emagrecimento e desequilibra o metabolismo. Entender essa relação é parte essencial de um tratamento que funciona de verdade.',
  },
]

const EASE = [0.16, 1, 0.3, 1]

function Linha({ item, numero, delay }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className="group relative border-t border-verde-escuro/15 last:border-b"
    >
      <span className="absolute inset-0 bg-areia origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      <div className="relative grid md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10 md:px-4">
        <span className="md:col-span-1 font-serif text-2xl text-bege-claro">{numero}</span>
        <h3 className="md:col-span-5 font-serif font-normal uppercase tracking-[0.04em] text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight transition-transform duration-500 md:group-hover:translate-x-3">
          {item.title}
        </h3>
        <p className="md:col-span-6 text-base leading-relaxed text-verde-escuro/75 md:pt-1.5">{item.text}</p>
      </div>
    </motion.li>
  )
}

export default function Especialidades() {
  return (
    <section id="especialidades" className="bg-off pb-28 md:pb-44">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-16 md:mb-24 pt-16 md:pt-20 border-t border-verde-escuro/15">
          <div className="md:col-span-3 eyebrow text-verde-oliva pt-4">Especialidades</div>
          <LineReveal lines={['Como cuidamos', 'de você']} className="md:col-span-9 uppercase text-section" />
        </div>

        {/* Pilar principal */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center mb-24 md:mb-36">
          <ImageReveal
            src="/assets/images/dra-carolina-mergulhao-macacao-verde-sorriso-aberto-editorial.webp"
            alt="Dra. Carolina Mergulhão, especialista em emagrecimento e obesidade"
            pos="center top"
            className="md:col-span-6 aspect-[4/5]"
          />
          <Reveal delay={0.15} className="md:col-span-5 md:col-start-8">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-serif text-2xl text-bege-claro">01</span>
              <span className="eyebrow text-verde-oliva">Pilar principal</span>
            </div>
            <h3 className="font-serif font-normal uppercase tracking-[0.04em] text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.05] mb-7">
              Emagrecimento e Obesidade
            </h3>
            <p className="text-lg leading-relaxed text-verde-escuro/80 mb-5">
              Tratamento individualizado, muito além da balança. Terapia farmacológica quando indicada, sempre com
              acompanhamento médico responsável e ajustes ao longo de todo o processo.
            </p>
            <p className="text-base leading-relaxed text-verde-escuro/65 mb-10">
              O foco é perder gordura preservando massa muscular, com um plano que considera hormônios, sono e
              estresse para que o resultado se sustente.
            </p>
            <Link to="/contato/" className="group inline-flex items-center gap-4 py-2 -my-2 eyebrow text-verde-escuro">
              <span className="relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-current after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-0">
                Agendar avaliação
              </span>
              <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
            </Link>
          </Reveal>
        </div>

        <ul>
          {OUTRAS.map((item, i) => (
            <Linha key={item.title} item={item} numero={`0${i + 2}`} delay={i * 0.08} />
          ))}
        </ul>
      </div>
    </section>
  )
}
