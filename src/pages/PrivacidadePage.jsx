import Seo from '../components/Seo'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LineReveal from '../components/motion/LineReveal'
import { SEO } from '../data/seo'
import { WHATSAPP_URL, WHATSAPP_EXIBICAO } from '../data/contato'

const SECOES = [
  {
    titulo: 'Quem somos',
    texto: [
      'Este site é da Dra. Carolina Mergulhão, endocrinologista e metabologista (CRM-SP 137.944, RQE 36.594), com consultório na R. da Consolação, 3741, 12º andar, Cerqueira César, São Paulo. Ela é a responsável pelo tratamento dos dados descritos aqui, nos termos da Lei Geral de Proteção de Dados (LGPD).',
    ],
  },
  {
    titulo: 'O que acontece com o formulário de contato',
    texto: [
      'Ao preencher o formulário da página de contato, o site apenas monta uma mensagem e abre o seu WhatsApp para você enviá-la. Nome, assunto e mensagem não passam por nenhum servidor deste site e não são guardados por ele. A conversa que se inicia no WhatsApp segue as regras do próprio WhatsApp.',
    ],
  },
  {
    titulo: 'Cookies e medição',
    texto: [
      'Com a sua permissão, usamos o Pixel da Meta (Facebook e Instagram) para saber quantas pessoas visitam o site, quais páginas são vistas e quantas clicam nos botões de WhatsApp. Isso nos ajuda a avaliar e melhorar a comunicação.',
      'O Pixel só é carregado depois que você clica em "Aceitar" no aviso de cookies. Se você recusar, ou não responder, nada é enviado à Meta.',
      'Quando permitido, a Meta recebe informações como a página visitada, o tipo de aparelho e navegador, o endereço IP e identificadores de cookies. Não enviamos seu nome, telefone, o conteúdo de mensagens nem qualquer informação sobre a sua saúde.',
    ],
  },
  {
    titulo: 'Como mudar de ideia',
    texto: [
      'Você pode alterar a sua escolha a qualquer momento no link "Preferências de cookies", no rodapé de qualquer página. Também é possível apagar os dados de navegação nas configurações do seu navegador.',
    ],
  },
  {
    titulo: 'Seus direitos',
    texto: [
      'A LGPD garante, entre outros, o direito de saber quais dados são tratados, corrigi-los, pedir a eliminação e revogar o consentimento. Para exercer qualquer um deles, fale com o consultório pelo WhatsApp.',
    ],
  },
  {
    titulo: 'Atualizações',
    texto: ['Esta política pode ser atualizada. A versão em vigor é sempre a desta página. Última atualização: outubro de 2026.'],
  },
]

export default function PrivacidadePage() {
  return (
    <>
      <Seo title={SEO.privacidade.title} />
      <Header />
      <main id="conteudo" className="bg-off pt-40 md:pt-52 pb-28 md:pb-40">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="eyebrow text-verde-oliva mb-6">Privacidade</div>
          <LineReveal as="h1" immediate lines={['Política de', 'privacidade']} className="uppercase text-display mb-12" />
          {SECOES.map((s) => (
            <section key={s.titulo} className="mb-10">
              <h2 className="font-sans tracking-normal text-[clamp(1.25rem,2vw,1.5rem)] font-medium text-verde-escuro mb-4">{s.titulo}</h2>
              {s.texto.map((p) => (
                <p key={p} className="text-base leading-relaxed text-verde-escuro/80 mb-4">{p}</p>
              ))}
            </section>
          ))}
          <p className="text-base leading-relaxed text-verde-escuro/80">
            Contato do consultório:{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-verde-oliva">
              WhatsApp {WHATSAPP_EXIBICAO}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
