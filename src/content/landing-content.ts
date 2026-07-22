/**
 * Single source of truth for every text, price, link, list and image path
 * used across the landing page. Components must not hardcode copy — they
 * only read from this object.
 *
 * NOTE: this content is kept verbatim as provided by the client brief.
 * `curriculum.items[1].description` ("Receita Crispy e receita de
 * armazenamento") likely has a typo in the source material, but it is
 * intentionally left untouched here per explicit instruction.
 */

export interface LandingContent {
  seo: {
    title: string;
    description: string;
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
    subtitle: string;
    backgroundImage: string;
    backgroundImageAlt: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  benefits: {
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
    title: string;
    description: string;
    badge: string;
    primaryImage: string;
    primaryImageAlt: string;
    secondaryImage: string;
    secondaryImageAlt: string;
  };
  crunch: {
    title: string;
    verticalLabel: string;
    cta: { label: string; href: string };
    features: string[];
    cutoutImage: string;
    cutoutImageAlt: string;
    biteImage: string;
    biteImageAlt: string;
  };
  mentor: {
    eyebrow: string;
    name: string;
    headline: string;
    description: string;
    image: string;
    imageAlt: string;
    credentials: { title: string; description: string }[];
    cta: { label: string; href: string };
  };
  offer: {
    id: string;
    title: string;
    description: string;
    originalPrice: string;
    currentPrice: string;
    installments: string;
    cta: { label: string; href: string };
    includedTitle: string;
    includedItems: string[];
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
      "Aprenda o método de frango frito americano da Rooster Academy, com receitas premiadas, técnicas profissionais e estratégias de negócio.",
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
    subtitle: "Segredo do Frango Frito Americano Revelado",
    backgroundImage: "/images/hero/hero-bg.jpg",
    backgroundImageAlt:
      "Pilha de frango frito crocante recebendo um fio de molho cremoso",
    primaryCta: {
      label: "Quero aprender",
      href: "#oferta",
    },
    secondaryCta: {
      label: "Ver demonstração",
      href: "#conteudo",
    },
  },

  benefits: {
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
        title: "Empanamentos Diversos",
        description: "Receita Crispy e receita de armazenamento.",
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
        title: "Padronização",
        description:
          "Processos para alta qualidade e consistência em cada preparo.",
        image: "/images/curriculum/padronizacao.jpg",
        alt: "Tiras de frango frito servidas em um prato",
      },
      {
        title: "Estratégias de Negócio",
        description: "Mentalidade e linha de produção.",
        image: "/images/curriculum/estrategias.jpg",
        alt: "Frango frito sendo finalizado com molho",
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
    title: "Prepare o frango dos sonhos",
    description:
      "O segredo do frango frito americano das grandes franquias, de um jeito simples que você pode começar a fazer da cozinha da sua casa.",
    badge: "Ultra fácil e prático",
    primaryImage: "/images/showcase/frango-dos-sonhos.jpg",
    primaryImageAlt:
      "Prato com tiras de frango frito crocante e três potes de molhos",
    secondaryImage: "/images/showcase/frango-com-molho.jpg",
    secondaryImageAlt:
      "Tiras de frango frito sobre fundo vermelho e verde-água",
  },

  crunch: {
    title: "Casquinha CRRRRROK CRRRRROK CRRRRROK",
    verticalLabel: "crocância",
    cta: {
      label: "Quero me inscrever",
      href: "#oferta",
    },
    features: [
      "Técnica de marinação para máxima suculência",
      "Sistema de empanamento em camadas",
      "Controle preciso de temperatura e tempo",
      "Dicas para manter a crocância por mais tempo",
    ],
    cutoutImage: "/images/showcase/frango-explosao.png",
    cutoutImageAlt: "Duas coxas de frango frito crocante em explosão",
    biteImage: "/images/showcase/crocancia.jpg",
    biteImageAlt: "Boca mordendo um pedaço de frango frito crocante",
  },

  mentor: {
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
      href: "#oferta",
    },
  },

  offer: {
    id: "oferta",
    title: "Método Crispy Completo",
    description:
      "Acesso vitalício a todo o conteúdo, atualizações futuras e suporte exclusivo.",
    originalPrice: "R$ 498",
    currentPrice: "R$ 198",
    installments: "ou 12x de R$ 20,48 no cartão*",
    cta: {
      label: "Garantir minha vaga agora!",
      href: "INSERIR_LINK_DO_CHECKOUT",
    },
    includedTitle: "O Que Está Incluído:",
    includedItems: [
      "Acesso vitalício ao curso completo",
      "Planilha de custos e margem de lucro",
      "Checklist de ingredientes e utensílios",
      "Acesso à comunidade privada",
      "Certificado de conclusão",
    ],
  },

  footer: {
    tagline: "O segredo do frango frito americano, direto para a sua cozinha.",
    links: [
      { label: "O Que Você Vai Aprender", href: "#conteudo" },
      { label: "Método Crispy Completo", href: "#oferta" },
    ],
    copyright: `© ${new Date().getFullYear()} Rooster Academy. Todos os direitos reservados.`,
  },
};
