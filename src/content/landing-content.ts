/**
 * Single source of truth for every text, price, link, list and image path
 * used across the landing page. Components must not hardcode copy — they
 * only read from this object.
 */

export interface CtaContent {
  label: string;
  href: string;
  /** Stable id for analytics (`cta_click`). */
  trackingId: string;
  /** Section / placement for analytics (`cta_location`). */
  trackingLocation: string;
}

export interface LandingContent {
  seo: {
    title: string;
    description: string;
    keywords: string[];
    siteName: string;
    ogImageAlt: string;
  };
  brand: {
    name: string;
    roosterLogo: string;
    roosterLogoAlt: string;
    metodoCrispyLettering: string;
    metodoCrispyLetteringAlt: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    headline: string;
    subtitle: string;
    backgroundImage: string;
    backgroundImageAlt: string;
    primaryCta: CtaContent;
  };
  benefits: {
    id: string;
    title: string;
    items: { title: string; description: string }[];
  };
  curriculum: {
    id: string;
    title: string;
    items: {
      title: string;
      description: string;
      image: string;
      alt: string;
    }[];
  };
  dreamChicken: {
    id: string;
    title: string;
    description: string;
    badge: string;
    primaryImage: string;
    primaryImageAlt: string;
    secondaryImage: string;
    secondaryImageAlt: string;
  };
  crunch: {
    id: string;
    title: string;
    cta: CtaContent;
    cutoutImage: string;
    cutoutImageAlt: string;
    transformation: {
      painTitle: string;
      painItems: string[];
      solutionTitle: string;
      solutionItems: string[];
    };
  };
  audience: {
    id: string;
    title: string;
    intro: string;
    items: string[];
  };
  socialProof: {
    id: string;
    title: string;
    testimonials: { name: string; quote: string }[];
  };
  mentor: {
    id: string;
    eyebrow: string;
    name: string;
    headline: string;
    description: string;
    image: string;
    imageAlt: string;
    credentials: { title: string; description: string }[];
    cta: CtaContent;
  };
  offer: {
    id: string;
    title: string;
    description: string;
    originalPrice: string;
    currentPrice: string;
    /** Numeric BRL value for JSON-LD / generate_lead (e.g. 198). */
    priceValue: number;
    installments: string;
    cta: CtaContent;
    includedTitle: string;
    includedItems: string[];
  };
  application: {
    id: string;
    title: string;
    description: string;
    formId: string;
    fields: {
      name: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      motivation: { label: string; placeholder: string };
      lgpd: { label: string };
    };
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
  };
  consent: {
    message: string;
    acceptLabel: string;
    declineLabel: string;
    privacyLinkLabel: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
    sections: { heading: string; body: string }[];
  };
  footer: {
    tagline: string;
    links: { label: string; href: string }[];
    copyright: string;
  };
}

export const landingContent: LandingContent = {
  seo: {
    title: "Método Crispy | Rooster Academy",
    description:
      "Aprenda a fazer o frango frito americano secreto das grandes redes. Receita profissional com empanamento crispy, sem fritadeira de pressão e com apenas 10 ingredientes.",
    keywords: [
      "método crispy",
      "frango frito americano",
      "rooster academy",
      "curso de frango frito",
      "empanamento crispy",
      "negócio gastronômico",
    ],
    siteName: "Rooster Academy",
    ogImageAlt: "Método Crispy — Rooster Academy",
  },

  brand: {
    name: "Rooster Academy",
    roosterLogo: "/logos/rooster-academy-logo.png",
    roosterLogoAlt: "Rooster Academy",
    metodoCrispyLettering: "/logos/metodo-crispy-lettering.svg",
    metodoCrispyLetteringAlt: "Método Crispy",
  },

  hero: {
    eyebrow: "Rooster Academy",
    title: "Método Crispy",
    headline:
      "Aprenda a fazer o frango frito americano secreto das grandes redes!",
    subtitle:
      "Domine uma receita profissional, com o famoso empanamento crispy, sem precisar de fritadeira de pressão e utilizando apenas 10 ingredientes.",
    backgroundImage: "/images/hero/hero-bg.jpg",
    backgroundImageAlt:
      "Pilha de frango frito crocante recebendo um fio de molho cremoso",
    primaryCta: {
      label: "Quero aprender",
      href: "#cadastro",
      trackingId: "hero_primary",
      trackingLocation: "hero",
    },
  },

  benefits: {
    id: "beneficios",
    title: "Por Que Aprender com a Rooster Academy?",
    items: [
      {
        title: "Sem Fritadeira de Pressão",
        description:
          "Método simplificado que não requer equipamentos caros ou especializados.",
      },
      {
        title: "Alta Margem de Lucro",
        description:
          "Poucos ingredientes, processo otimizado e resultado profissional.",
      },
      {
        title: "Receitas Premiadas",
        description:
          "Testadas em operação real e reconhecidas nacionalmente.",
      },
      {
        title: "Para Todos",
        description:
          "Ideal tanto para iniciantes quanto para quem já tem restaurante.",
      },
    ],
  },

  curriculum: {
    id: "conteudo",
    title: "O Que Você Vai Aprender",
    items: [
      {
        title: "Receita Exclusiva",
        description:
          "Frango frito americano 3x campeão com técnicas profissionais.",
        image: "/images/curriculum/receita-exclusiva.jpg",
        alt: "Coxa de frango frito americano",
      },
      {
        title: "Empanamento Crispy",
        description:
          "Receita para negócios gastronômicos com padrão e rentabilidade.",
        image: "/images/curriculum/empanamentos.jpg",
        alt: "Porção de frango frito em embalagem da Rooster",
      },
      {
        title: "Método Sem Pressão",
        description:
          "Técnica acessível sem necessidade de fritadeira de pressão.",
        image: "/images/curriculum/metodo-sem-pressao.jpg",
        alt: "Preparação de frango frito em uma panela",
      },
      {
        title: "Frango Frito Meu Negócio",
        description:
          "Receita aplicada na prática na linha de produção da marca Rooster Crispy Kitchen",
        image: "/images/curriculum/frango-frito-negocio.jpg",
        alt: "Porção de frango frito crocante em tigela branca",
      },
      {
        title: "Estratégia de Negócio",
        description:
          "Sugestão de cardápio, fornecedores, embalagens e tabela de precificação da receita",
        image: "/images/curriculum/estrategia-negocio.jpg",
        alt: "Frango frito crocante com molho sendo finalizado",
      },
      {
        title: "Suporte Exclusivo",
        description: "Comunidade privada e acesso direto ao mentor.",
        image: "/images/curriculum/suporte.jpg",
        alt: "Profissional segurando duas peças de frango frito",
      },
    ],
  },

  dreamChicken: {
    id: "frango-dos-sonhos",
    title: "Prepare o frango dos sonhos",
    description:
      "O segredo do frango frito americano das grandes franquias, de um jeito simples que você pode começar a fazer da cozinha da sua casa.",
    badge: "Ultra fácil e prático",
    primaryImage: "/images/showcase/classic-box.jpg",
    primaryImageAlt:
      "Classic Box Rooster com frango frito crocante e batata frita",
    secondaryImage: "/images/showcase/rooster-bites.jpg",
    secondaryImageAlt:
      "Rooster Bites com molho e picles em tigela branca",
  },

  crunch: {
    id: "crocancia",
    title: "Casquinha CRRRRROK CRRRRROK CRRRRROK",
    cta: {
      label: "Quero me inscrever",
      href: "#cadastro",
      trackingId: "crunch_enroll",
      trackingLocation: "crunch",
    },
    cutoutImage: "/images/showcase/frango-explosao.png",
    cutoutImageAlt: "Duas coxas de frango frito crocante em explosão",
    transformation: {
      painTitle: "Você já passou por isso?",
      painItems: [
        "Seu empanado desgruda na fritura.",
        "Frango sem gosto e sem graça.",
        "O frango fica encharcado de óleo.",
        "A casquinha perde a crocância poucos minutos depois de fritar.",
        "Você já tentou receitas do YouTube e nenhuma ficou igual.",
        "Acha que precisa investir em equipamentos caros para conseguir um resultado profissional.",
      ],
      solutionTitle: "Com o Método Crispy, você aprende a fazer:",
      solutionItems: [
        "Empanamento altamente crispado.",
        "Frango extremamente suculento e sequinho por dentro.",
        "Casquinha altamente crocante.",
        "Receita simples, com apenas 10 ingredientes.",
        "Método fácil de aplicar na prática.",
        "Pode ser feito na panela ou em fritadeira aberta convencional.",
      ],
    },
  },

  audience: {
    id: "para-quem",
    title: "Para quem é o Método Crispy?",
    intro: "Este treinamento é ideal para quem:",
    items: [
      "Quer abrir um delivery de frango frito.",
      "Já possui um restaurante e deseja adicionar um produto de alta margem.",
      "Busca uma renda extra com um produto diferenciado.",
      "Quer preparar um frango frito profissional em casa.",
      "Deseja aprender uma receita profissional para surpreender amigos, familiares ou clientes.",
    ],
  },

  socialProof: {
    id: "depoimentos",
    title: "Veja o que os alunos da Turma 1 estão dizendo",
    testimonials: [
      {
        name: "gfteama vare",
        quote:
          "Excelente curso 👏 Está me ajudando até em outra empresa. Compensa muito!",
      },
      {
        name: "nego.gyz",
        quote:
          "Curso muito bom, mudou totalmente minha visão sobre fritadeiras.",
      },
      {
        name: "carlalainesilviocesar",
        quote:
          "Estou fazendo o curso e adorando os resultados! Fazer a receita e dar super certo na primeira tentativa foi fantástico, muito bem explicado e sem precisar ter investimentos altos — isso foi bem importante para mim que estou iniciando agora! Super recomendo o curso!",
      },
      {
        name: "natyesasso",
        quote:
          "Top 🔥, vale muito o investimento. Curso na prática de como fazer frango frito!",
      },
      {
        name: "rener_molina",
        quote:
          "Único curso que realmente aprendi o método para fazer frango crocante americano, estou adorando o curso, super indico. Top!",
      },
      {
        name: "franguitojr",
        quote:
          "Tivemos uma mentoria com a @rooster.academy, e o resultado foi 100%. O resultado ficou diferente, muito bom.",
      },
      {
        name: "gabrielmonteiromtb",
        quote:
          "Uma experiência incrível de negócio, o curso muito explicativo e simples ao mesmo tempo. O Luis me parece ser muito humano em querer ver o sucesso de todos. Super recomendo — para o pessoal que está na dúvida em adquirir o treinamento, vale muito a pena. Muito satisfeito. Obrigado!",
      },
      {
        name: "resulta.agencia",
        quote:
          "Eu tô fazendo o curso e posso confirmar: a receita funciona mesmo! 🍗 É simples, eficaz e o melhor de tudo — não precisa de nenhum equipamento mirabolante. Estou impressionada com os resultados!",
      },
    ],
  },

  mentor: {
    id: "mentor",
    eyebrow: "O Mentor",
    name: "Luis Henrique Dobrovolski Lopes",
    headline:
      "Especialista em frango frito, empanamentos e negócios gastronômicos",
    description:
      "Tudo o que ele ensina foi testado, validado e deu resultado no mercado real. Com anos de experiência e múltiplos prêmios, Luis transformou sua paixão por frango frito em um império gastronômico reconhecido nacionalmente.",
    image: "/images/mentor/luis-henrique.jpg",
    imageAlt:
      "Luis Henrique Dobrovolski Lopes sorrindo no palco, segurando um prêmio",
    credentials: [
      {
        title: "3x Melhor Frango Frito",
        description: "Fundador da Rooster Crispy Kitchen",
      },
      {
        title: "Rooster Academy",
        description: "Escola referência no segmento",
      },
      {
        title: "Dark Kitchen Expert",
        description: "Operou 6 marcas simultaneamente",
      },
      {
        title: "CEO Multimarca",
        description: "Presente no varejo, educação e franquias",
      },
    ],
    cta: {
      label: "Saiba mais",
      href: "#cadastro",
      trackingId: "mentor_more",
      trackingLocation: "mentor",
    },
  },

  offer: {
    id: "oferta",
    title: "Método Crispy Completo",
    description:
      "1 ano de acesso a todo o conteúdo, atualizações futuras e suporte exclusivo.",
    originalPrice: "R$ 498",
    currentPrice: "R$ 198",
    priceValue: 198,
    installments: "ou 12x de R$ 20,48 no cartão*",
    cta: {
      label: "Garantir minha vaga agora!",
      href: "#cadastro",
      trackingId: "offer_apply",
      trackingLocation: "offer",
    },
    includedTitle: "O Que Está Incluído:",
    includedItems: [
      "1 ano de acesso ao curso completo",
      "Planilha de custos e precificação indicada",
      "Checklist de ingredientes, lista de equipamentos e utensílios",
      "Acesso à comunidade privada e grupo no WhatsApp",
      "Certificado de conclusão",
    ],
  },

  application: {
    id: "cadastro",
    title: "Candidate-se à turma",
    description:
      "Preencha o formulário abaixo. Nossa equipe analisa cada candidatura e entra em contato com os próximos passos.",
    formId: "turma_application",
    fields: {
      name: {
        label: "Nome completo",
        placeholder: "Seu nome",
      },
      phone: {
        label: "Telefone / WhatsApp",
        placeholder: "(11) 99999-9999",
      },
      email: {
        label: "E-mail",
        placeholder: "seu@email.com",
      },
      motivation: {
        label: "Por que você quer aplicar para a turma?",
        placeholder:
          "Conte um pouco sobre sua motivação, experiência e o que espera do Método Crispy…",
      },
      lgpd: {
        label:
          "Autorizo a Rooster Academy a entrar em contato comigo pelos dados informados, de acordo com a Política de Privacidade.",
      },
    },
    submitLabel: "Enviar candidatura",
    submittingLabel: "Enviando…",
    successTitle: "Candidatura enviada!",
    successMessage:
      "Recebemos seus dados. Em breve nossa equipe entrará em contato.",
    errorMessage:
      "Não foi possível enviar sua candidatura. Tente novamente em alguns instantes.",
  },

  consent: {
    message:
      "Usamos cookies e tecnologias semelhantes para medir audiência e melhorar campanhas. Você pode aceitar ou recusar.",
    acceptLabel: "Aceitar",
    declineLabel: "Recusar",
    privacyLinkLabel: "Política de Privacidade",
  },

  privacy: {
    title: "Política de Privacidade",
    lastUpdated: "22 de julho de 2026",
    sections: [
      {
        heading: "Quem somos",
        body: "A Rooster Academy é responsável pelo tratamento dos dados pessoais coletados nesta landing page do Método Crispy, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).",
      },
      {
        heading: "Dados que coletamos",
        body: "Ao se candidatar à turma, coletamos nome, telefone, e-mail e a motivação informada no formulário. Também podemos registrar parâmetros de campanha (UTMs) e dados técnicos de navegação (via cookies/analytics), quando você consentir.",
      },
      {
        heading: "Finalidade",
        body: "Utilizamos esses dados para analisar candidaturas, entrar em contato sobre a turma, medir o desempenho desta página e, com o seu consentimento, personalizar anúncios.",
      },
      {
        heading: "Cookies e métricas",
        body: "Com o seu aceite no banner de cookies, podemos ativar ferramentas de analytics e publicidade (por exemplo via Google Tag Manager). Sem o aceite, essas tags permanecem bloqueadas (Consent Mode).",
      },
      {
        heading: "Seus direitos",
        body: "Você pode solicitar acesso, correção ou exclusão dos seus dados, além de retirar o consentimento a qualquer momento, entrando em contato pelo e-mail informado abaixo.",
      },
      {
        heading: "Contato",
        body: "Para exercer seus direitos ou tirar dúvidas sobre privacidade, escreva para contato@roosteracademy.com.br.",
      },
    ],
  },

  footer: {
    tagline: "O segredo do frango frito americano, direto para a sua cozinha.",
    links: [
      { label: "O Que Você Vai Aprender", href: "#conteudo" },
      { label: "Para quem é", href: "#para-quem" },
      { label: "Depoimentos", href: "#depoimentos" },
      { label: "Método Crispy Completo", href: "#oferta" },
      { label: "Candidatura", href: "#cadastro" },
      { label: "Política de Privacidade", href: "/privacidade" },
    ],
    copyright: `© ${new Date().getFullYear()} Rooster Academy. Todos os direitos reservados.`,
  },
};
