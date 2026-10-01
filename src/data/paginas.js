// Páginas de tema (uma busca por página). O molde é src/pages/PaginaTema.jsx; SEO e sitemap saem
// de scripts/prerender-meta.mjs. Textos informativos, sem promessa de resultado e sem nome de medicamento.
import { MARCA } from './seo.js'

export const PUBLICADO = '2026-10-01'

export const PAGINAS = [
  {
    slug: 'emagrecimento',
    menu: 'Emagrecimento e obesidade',
    titulo: 'Endocrinologista para emagrecer em São Paulo',
    description: 'Emagrecimento com endocrinologista em São Paulo: avaliação completa, tratamento individualizado e foco em preservar massa muscular. Consulta presencial.',
    eyebrow: 'Emagrecimento e obesidade',
    h1: ['Endocrinologista para', 'emagrecer em São Paulo'],
    intro: [
      'O peso na balança é só a parte visível. Na endocrinologia, emagrecer começa por entender por que o corpo está acumulando gordura: hormônios, metabolismo, sono, estresse, massa muscular e o histórico de tentativas anteriores.',
      'A Dra. Carolina Mergulhão atende em São Paulo, de forma presencial, com um plano pensado para a sua rotina e para o seu corpo, muito além da balança.',
    ],
    secoes: [
      {
        h: 'Por que emagrecer não é só comer menos',
        p: [
          'As calorias importam, mas não explicam tudo. Os hormônios que regulam fome e saciedade, o funcionamento da tireoide, a resistência à insulina, a qualidade do sono e o estresse crônico influenciam como o corpo gasta e armazena energia.',
          'Por isso duas pessoas com a mesma rotina podem ter respostas diferentes. Entender o que está por trás do peso é o primeiro passo para um tratamento que faça sentido.',
        ],
      },
      {
        h: 'Como é a avaliação',
        p: [
          'A primeira consulta é presencial e costuma levar de 1 a 2 horas, sem tempo engessado. A Dra. Carolina conversa com calma sobre o seu histórico de saúde e de peso, a alimentação, a rotina de sono e de estresse, os medicamentos em uso, os exames que você já tem e a sua composição corporal.',
          'Quando necessário, são solicitados exames complementares para completar o quadro.',
        ],
      },
      {
        h: 'Tratamento individualizado',
        p: [
          'Não existe protocolo único. O plano pode envolver ajustes na alimentação e na atividade física, atenção ao sono e ao estresse e, quando houver indicação médica, terapia farmacológica, sempre com acompanhamento próximo e ajustes ao longo do tempo.',
          'A indicação de qualquer medicamento é definida em consulta, depois da avaliação de cada caso.',
        ],
      },
      {
        h: 'Preservar a massa muscular',
        p: [
          'Perder peso não é o mesmo que perder gordura. Quando o emagrecimento é rápido demais e sem acompanhamento, uma parte do que se perde pode ser músculo, o que tende a deixar o metabolismo mais lento e favorecer o efeito sanfona.',
          'Por isso o acompanhamento olha para a composição corporal, e não só para o número da balança.',
        ],
      },
      {
        h: 'Retornos e acompanhamento',
        p: [
          'Emagrecer de forma sustentável é um processo. Os retornos permitem avaliar como o seu corpo está respondendo, ajustar a conduta e cuidar da manutenção do resultado.',
        ],
      },
      {
        h: 'Para quem é',
        p: [
          'Para pessoas com sobrepeso ou obesidade, para quem já tentou várias dietas e reganhou o peso, e para quem quer emagrecer com segurança e acompanhamento médico. Cada indicação é avaliada individualmente em consulta.',
        ],
      },
    ],
    faq: [
      {
        q: 'O tratamento para emagrecer é individualizado?',
        a: 'Sim. O plano considera o seu histórico, os exames, a rotina, os hormônios, o sono e o estresse, e é ajustado ao longo do acompanhamento.',
      },
      {
        q: 'Preciso usar medicação para emagrecer?',
        a: 'Nem sempre. A indicação depende da avaliação médica de cada caso. Quando há indicação, o uso é feito com acompanhamento e ajustes ao longo do tratamento.',
      },
      {
        q: 'Quanto tempo leva a consulta?',
        a: 'Costuma levar de 1 a 2 horas, sem tempo engessado. O atendimento é presencial, no consultório da Consolação, em São Paulo.',
      },
      {
        q: 'Vocês atendem por convênio?',
        a: 'Não. O atendimento é particular.',
      },
    ],
    posts: ['emagrecimento-massa-muscular', 'composicao-corporal-massa-muscular', 'sono-estresse-emagrecimento'],
  },
  {
    slug: 'menopausa',
    menu: 'Menopausa e saúde da mulher',
    titulo: 'Menopausa e metabolismo: tratamento em São Paulo',
    description: 'Menopausa e metabolismo com endocrinologista em São Paulo: o que muda no corpo, peso, sono e terapia hormonal individualizada quando indicada.',
    eyebrow: 'Saúde da mulher',
    h1: ['Menopausa e', 'metabolismo'],
    intro: [
      'A transição menopáusica vai além das ondas de calor. A queda dos hormônios sexuais influencia o peso, o sono, o humor, a massa muscular e a saúde dos ossos, e muitos desses sinais passam despercebidos por anos.',
      'A Dra. Carolina Mergulhão, endocrinologista e metabologista, acompanha essa fase em São Paulo com um olhar que une hormônios e metabolismo.',
    ],
    secoes: [
      {
        h: 'O que muda no corpo na transição menopáusica',
        p: [
          'Com a redução do estrogênio e da progesterona, o corpo tende a mudar a forma de armazenar gordura, com mais acúmulo na região abdominal, e a perder massa muscular com mais facilidade. O sono também costuma ser afetado, assim como o humor e a disposição.',
          'Esses sintomas variam muito de uma mulher para outra e podem começar anos antes da última menstruação, na fase chamada perimenopausa.',
        ],
      },
      {
        h: 'Ganho de peso e sono',
        p: [
          'A menopausa, por si só, não explica todo o ganho de peso, mas as mudanças hormonais, o sono pior e a perda de massa muscular se somam e favorecem o acúmulo de gordura. Dormir mal, por sua vez, afeta o apetite e a disposição para se cuidar.',
          'Olhar para esses fatores em conjunto ajuda a montar um plano que funcione de verdade.',
        ],
      },
      {
        h: 'Terapia hormonal individualizada',
        p: [
          'A terapia hormonal pode ser uma opção para tratar sintomas da menopausa, mas não é indicada para todas as mulheres. A decisão depende dos sintomas, do histórico pessoal e familiar, dos exames e da avaliação de riscos e benefícios.',
          'Quando indicada, é individualizada e acompanhada de perto, com reavaliações ao longo do tempo.',
        ],
      },
      {
        h: 'Como é o acompanhamento',
        p: [
          'A consulta é presencial e costuma levar de 1 a 2 horas. A Dra. Carolina avalia os sintomas, o histórico e os exames, e define com você o que fazer, incluindo alimentação, atividade física, sono e, quando indicado, o tratamento hormonal.',
        ],
      },
      {
        h: 'Quando procurar um endocrinologista',
        p: [
          'Quando surgirem ciclos irregulares, ondas de calor, sono ruim, mudança de peso sem explicação ou queda de disposição. Quanto antes os sinais são avaliados, mais opções existem para cuidar da transição com qualidade de vida.',
        ],
      },
    ],
    faq: [
      {
        q: 'A menopausa faz engordar?',
        a: 'As mudanças hormonais, do sono e da massa muscular tendem a favorecer o acúmulo de gordura, principalmente na região abdominal. Cada mulher responde de um jeito, e isso é avaliado em consulta.',
      },
      {
        q: 'Toda mulher precisa de terapia hormonal?',
        a: 'Não. A indicação depende dos sintomas, do histórico e dos exames, e é decidida individualmente depois da avaliação médica.',
      },
      {
        q: 'Posso procurar antes da menopausa?',
        a: 'Sim. Os sintomas podem começar na perimenopausa, e a avaliação nessa fase ajuda a entender o que está acontecendo no seu corpo.',
      },
    ],
    posts: ['menopausa-metabolismo', 'sono-estresse-emagrecimento'],
  },
  {
    slug: 'composicao-corporal',
    menu: 'Composição corporal e massa muscular',
    titulo: 'Composição corporal e massa muscular',
    description: 'Composição corporal com endocrinologista em São Paulo: como perder gordura preservando a massa muscular, com orientação individual sobre proteína e treino.',
    eyebrow: 'Composição corporal',
    h1: ['Composição corporal e', 'massa muscular'],
    intro: [
      'Duas pessoas com o mesmo peso podem ter corpos muito diferentes por dentro, com quantidades distintas de gordura e de músculo. É a composição corporal que ajuda a entender a sua saúde e o seu metabolismo.',
      'No acompanhamento com a Dra. Carolina Mergulhão, o objetivo é perder gordura preservando a massa muscular.',
    ],
    secoes: [
      {
        h: 'O que é composição corporal',
        p: [
          'É a proporção entre massa de gordura, massa muscular, ossos e água no corpo. A balança mostra só o total e não diferencia o que foi perdido ou ganho, por isso o peso sozinho conta pouco da história.',
        ],
      },
      {
        h: 'Por que a massa muscular importa',
        p: [
          'O músculo é um tecido metabolicamente ativo: mesmo em repouso, ele consome energia. Também contribui para a força, a postura, o equilíbrio e a saúde dos ossos, e ganha ainda mais importância com o passar dos anos.',
        ],
      },
      {
        h: 'Perder gordura sem perder músculo',
        p: [
          'Emagrecer muito rápido e sem orientação aumenta a chance de perder músculo junto com a gordura, o que tende a deixar o metabolismo mais lento e facilitar o reganho do peso. Um plano bem conduzido procura reduzir esse risco.',
        ],
      },
      {
        h: 'Proteína e treino de força',
        p: [
          'A quantidade de proteína ideal varia de pessoa para pessoa e depende de exames, da composição corporal e da rotina. O excesso sem orientação também pode trazer riscos.',
          'O treino de força costuma ser um aliado importante, com orientação adequada à sua condição de saúde.',
        ],
      },
      {
        h: 'Como acompanhamos',
        p: [
          'Na consulta, a Dra. Carolina avalia a sua composição corporal, entende a sua rotina e define as estratégias de alimentação, suplementação quando necessária e atividade física, com retornos para ajustar a conduta.',
        ],
      },
    ],
    faq: [
      {
        q: 'O peso na balança não basta?',
        a: 'Não. O peso não mostra se o que mudou foi gordura ou músculo. A composição corporal ajuda a acompanhar o que realmente está acontecendo.',
      },
      {
        q: 'Preciso comer muita proteína?',
        a: 'A quantidade certa varia por pessoa e depende de exames e da composição corporal. A Dra. Carolina define a necessidade individual, sem fórmulas genéricas.',
      },
      {
        q: 'Treino de força é obrigatório?',
        a: 'Costuma ser um dos pilares do cuidado com a massa muscular, sempre com orientação adequada à sua condição de saúde.',
      },
    ],
    posts: ['composicao-corporal-massa-muscular', 'emagrecimento-massa-muscular'],
  },
  {
    slug: 'sono-e-estresse',
    menu: 'Sono e estresse',
    titulo: 'Sono, estresse e cortisol no emagrecimento',
    description: 'Como sono e estresse afetam fome, cortisol e peso: o que o endocrinologista avalia e como cuidar disso no tratamento de emagrecimento, em São Paulo.',
    eyebrow: 'Sono e estresse',
    h1: ['Sono, estresse e', 'cortisol no emagrecimento'],
    intro: [
      'Dieta e treino em dia, e o peso não se move. Muitas vezes, a explicação está no sono e no estresse, que influenciam hormônios, apetite e a forma como o corpo responde ao tratamento.',
      'A Dra. Carolina Mergulhão inclui esses dois fatores na avaliação de quem busca emagrecer em São Paulo.',
    ],
    secoes: [
      {
        h: 'O sono como pilar metabólico',
        p: [
          'Dormir bem não é só descansar. Noites mal dormidas afetam os hormônios que regulam fome e saciedade, tendem a aumentar a vontade de alimentos mais calóricos e reduzem a disposição para se exercitar.',
        ],
      },
      {
        h: 'Cortisol e estresse crônico',
        p: [
          'O cortisol é um hormônio que ajuda o corpo a responder ao estresse. Quando o estresse é constante, esse equilíbrio pode se alterar e interferir no apetite, no acúmulo de gordura e na energia ao longo do dia.',
        ],
      },
      {
        h: 'Como isso afeta fome e peso',
        p: [
          'Sono ruim e estresse crônico se alimentam entre si e, juntos, podem dificultar a perda de peso mesmo com boa alimentação e atividade física. Reconhecer esse ciclo ajuda a escolher o que ajustar primeiro.',
        ],
      },
      {
        h: 'O que se avalia na consulta',
        p: [
          'A Dra. Carolina conversa sobre a sua rotina de sono, o nível de estresse, o histórico de saúde e os exames, e pede avaliações complementares quando fazem sentido para o seu caso. Não existe um exame único que serve para todas as pessoas.',
        ],
      },
      {
        h: 'Cuidar do sono e do estresse no tratamento',
        p: [
          'Esses fatores entram no plano junto com a alimentação, a atividade física e, quando indicado, o tratamento medicamentoso. O objetivo é um tratamento completo, que olhe para a pessoa e não só para o peso.',
        ],
      },
    ],
    faq: [
      {
        q: 'O estresse pode atrapalhar o emagrecimento?',
        a: 'Sim. O estresse crônico pode interferir no apetite e no metabolismo e dificultar a perda de peso, por isso ele é avaliado no tratamento.',
      },
      {
        q: 'Dormir mal engorda?',
        a: 'Dormir pouco ou mal tende a favorecer o aumento do apetite e a escolha de alimentos mais calóricos, o que pode dificultar o controle do peso.',
      },
      {
        q: 'Preciso fazer exame de cortisol?',
        a: 'Depende da avaliação clínica. Não há um exame que sirva para todas as pessoas, e a indicação é feita em consulta.',
      },
    ],
    posts: ['sono-estresse-emagrecimento', 'menopausa-metabolismo'],
  },
  {
    slug: 'sobre',
    menu: 'Sobre a Dra. Carolina',
    titulo: 'Dra. Carolina Mergulhão, endocrinologista em São Paulo',
    description: 'Conheça a Dra. Carolina Mergulhão, endocrinologista e metabologista em São Paulo: formação, especialização pela SBEM desde 2007 e forma de atender.',
    eyebrow: 'Sobre',
    h1: ['Dra. Carolina', 'Mergulhão'],
    intro: [
      'Endocrinologista e metabologista, a Dra. Carolina Mergulhão atende em São Paulo com foco em emagrecimento, obesidade e saúde hormonal, sempre com um tratamento individualizado, muito além da balança.',
      'CRM-SP 137.944 · RQE 36.594.',
    ],
    secoes: [
      {
        h: 'Formação',
        p: [
          'Formada em Medicina pela UFRJ, especializou-se em Endocrinologia e Metabologia pelo IEDE. Aprofundou-se em Nutrologia pela ABRAN-SP e em Medicina Integrativa pela FAPES, construindo um olhar mais completo sobre obesidade, metabolismo e saúde hormonal.',
        ],
      },
      {
        h: 'Especialização e sociedade médica',
        p: [
          'Especialista pela Sociedade Brasileira de Endocrinologia e Metabologia desde 2007 e membro ativo da instituição, a Dra. Carolina atualiza a prática com a ciência e a transforma em tratamento individualizado.',
        ],
      },
      {
        h: 'Como a Dra. Carolina atende',
        p: [
          'O atendimento é sempre presencial e particular. A primeira consulta costuma levar de 1 a 2 horas, sem tempo engessado, para que o seu histórico, os seus exames e os seus objetivos sejam compreendidos com calma.',
          'Depois, os retornos permitem acompanhar a resposta do tratamento e ajustar a conduta ao longo do tempo.',
        ],
      },
      {
        h: 'Áreas de atuação',
        p: [
          'Emagrecimento e obesidade, saúde da mulher e menopausa, composição corporal e massa muscular, e a relação do sono e do estresse com o metabolismo.',
        ],
      },
    ],
    faq: [
      {
        q: 'Qual é a formação da Dra. Carolina?',
        a: 'Medicina pela UFRJ, especialização em Endocrinologia e Metabologia pelo IEDE, Nutrologia pela ABRAN-SP e Medicina Integrativa pela FAPES. É especialista pela SBEM desde 2007.',
      },
      {
        q: 'A Dra. Carolina atende por convênio?',
        a: 'Não. O atendimento é particular e presencial.',
      },
      {
        q: 'Onde fica o consultório?',
        a: 'Na R. da Consolação, 3741, 12º andar, Cerqueira César, São Paulo.',
      },
    ],
    posts: ['emagrecimento-massa-muscular', 'menopausa-metabolismo'],
  },
  {
    slug: 'consultorio',
    menu: 'Consultório',
    titulo: 'Endocrinologista na Consolação, São Paulo',
    description: 'Consultório da Dra. Carolina Mergulhão, endocrinologista na Consolação, Cerqueira César. Atendimento presencial e particular. Agende pelo WhatsApp.',
    eyebrow: 'Consultório',
    h1: ['Endocrinologista na', 'Consolação, São Paulo'],
    intro: [
      'O consultório da Dra. Carolina Mergulhão fica na região da Consolação e do Cerqueira César, em São Paulo. O atendimento é presencial e particular.',
    ],
    consultorio: true,
    secoes: [
      {
        h: 'Como é a primeira consulta',
        p: [
          'A consulta inicial costuma levar de 1 a 2 horas, sem tempo engessado. A Dra. Carolina conversa com calma sobre o seu histórico, a rotina, os exames que você já tem e os seus objetivos, e define com você o plano de tratamento.',
          'Se tiver exames, laudos ou a lista de medicamentos em uso, leve para a consulta.',
        ],
      },
      {
        h: 'Como agendar',
        p: [
          'O agendamento é feito pelo WhatsApp ou pelo formulário da página de contato. Dia e horário são combinados diretamente com o consultório.',
        ],
      },
    ],
    faq: [
      {
        q: 'Vocês atendem por convênio?',
        a: 'Não. O atendimento é particular.',
      },
      {
        q: 'Como agendo uma consulta?',
        a: 'Pelo WhatsApp (11) 97648-1629 ou pelo formulário da página de contato.',
      },
      {
        q: 'Quanto tempo leva a consulta?',
        a: 'Costuma levar de 1 a 2 horas, sem tempo engessado.',
      },
    ],
    posts: ['emagrecimento-massa-muscular', 'composicao-corporal-massa-muscular'],
  },
]

export const getPagina = (slug) => PAGINAS.find((p) => p.slug === slug)

// A marca só entra se couber nos 60 caracteres do título de busca.
export const tituloDaPagina = (pagina) => {
  const comMarca = `${pagina.titulo} | ${MARCA}`
  return comMarca.length <= 60 ? comMarca : pagina.titulo
}
