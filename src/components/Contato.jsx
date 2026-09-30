import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import LineReveal from './motion/LineReveal'
import ImageReveal from './motion/ImageReveal'
import { WHATSAPP_URL, WHATSAPP_EXIBICAO, INSTAGRAM_URL, ENDERECO, MAPA_URL } from '../data/contato'

const LINK = 'underline underline-offset-4 decoration-creme/40 hover:decoration-creme transition-colors'

// Chamada de fechamento da home; o formulário completo fica em /contato/.
export default function Contato() {
  return (
    <section id="contato" className="bg-verde-escuro text-white py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-14 md:gap-8 items-center">
        <ImageReveal
          src="/assets/images/dra-carolina-mergulhao-cafe-varanda-editorial.webp"
          alt="Dra. Carolina Mergulhão, endocrinologista em São Paulo, segurando uma xícara de café"
          pos="center 20%"
          className="md:col-span-5 aspect-[4/5]"
        />

        <div className="md:col-span-6 md:col-start-7">
          <Reveal className="eyebrow text-bege-claro mb-6">Contato</Reveal>
          <LineReveal lines={['Agende sua', 'consulta']} className="uppercase text-section mb-8" />
          <Reveal delay={0.1} className="text-lg leading-relaxed text-creme/75 max-w-lg mb-12">
            O primeiro passo é uma avaliação completa, com tempo para entender sua história, seus exames e seus objetivos.
          </Reveal>

          <Reveal delay={0.15} as="dl" className="grid sm:grid-cols-2 border-t border-creme/15 mb-12">
            <div className="py-7 sm:pr-8 border-b border-creme/15 sm:border-r">
              <dt className="eyebrow text-bege-claro mb-3">Endereço</dt>
              <dd className="text-creme/85 leading-relaxed">
                {ENDERECO.linha1}
                <br />
                {ENDERECO.linha2}
                <br />
                <a href={MAPA_URL} target="_blank" rel="noopener" className={`inline-block mt-2 text-sm ${LINK}`}>Ver no mapa ↗</a>
              </dd>
            </div>
            <div className="py-7 sm:pl-8 border-b border-creme/15">
              <dt className="eyebrow text-bege-claro mb-3">WhatsApp</dt>
              <dd>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="font-serif text-3xl tracking-[0.04em] hover:text-bege-claro transition-colors">
                  {WHATSAPP_EXIBICAO}
                </a>
              </dd>
            </div>
            <div className="py-7 sm:pr-8 border-b border-creme/15 sm:border-r">
              <dt className="eyebrow text-bege-claro mb-3">Atendimento</dt>
              <dd className="text-creme/85">Presencial, em São Paulo<br /><span className="text-creme/60 text-sm">Consultas de 1 a 2 horas</span></dd>
            </div>
            <div className="py-7 sm:pl-8 border-b border-creme/15">
              <dt className="eyebrow text-bege-claro mb-3">Instagram</dt>
              <dd>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={`text-creme/85 ${LINK}`}>@dracarolinamergulhao</a>
              </dd>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contato/"
              className="text-center rounded-full bg-creme text-verde-escuro px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:bg-white hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"
            >
              Agendar pelo formulário
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="text-center rounded-full border border-creme/50 text-creme px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:bg-creme hover:text-verde-escuro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"
            >
              Falar no WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
