# Método Crispy — Rooster Academy

Landing page da Rooster Academy para o curso **Método Crispy**, construída com Next.js (App Router), TypeScript e Tailwind CSS, reproduzindo a identidade visual da marca (cores, tipografia arredondada/retrô, composição editorial) com componentes React reais — sem seções renderizadas como imagem.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS v4 (configuração via `@theme` em `globals.css`, sem `tailwind.config.js`)
- `next/image` para todas as fotografias (otimização automática em WebP/AVIF, lazy-load abaixo da dobra, `priority` só na imagem do hero)
- `next/font/google` para as fontes (ver seção "Tipografia" abaixo)

## Como rodar

```bash
npm install
npm run dev       # http://localhost:3000
```

Outros comandos:

```bash
npm run build     # build de produção
npm run start      # roda o build de produção localmente
npm run lint       # ESLint
```

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx        # fontes, <html lang="pt-BR">, metadata (SEO)
│   ├── page.tsx           # monta as seções da landing, em ordem
│   └── globals.css        # tokens de cor, tipografia display, container, clamp()
├── components/
│   ├── landing/            # uma seção por arquivo (Hero, Benefits, Curriculum, ...)
│   └── ui/                 # CTAButton, SectionTitle, ResponsiveImage, Reveal
├── content/
│   └── landing-content.ts  # TODO o texto, preços, links, listas e caminhos de imagem
public/
├── logos/                   # logo Rooster Academy + lettering SVG "Método Crispy"
├── images/                  # fotos otimizadas, organizadas por seção
└── fonts/                   # reservada para a fonte oficial da marca (ver abaixo)
```

## Editando o conteúdo

**Todo o texto, preços, links e imagens da página vêm de [`src/content/landing-content.ts`](src/content/landing-content.ts).** Nenhum componente tem texto fixo — para alterar qualquer copy, preço, item de lista ou caminho de imagem, edite apenas esse arquivo. Os componentes em `src/components/landing/` só leem esse objeto.

### Link de checkout

O campo `offer.cta.href` está como placeholder (`"INSERIR_LINK_DO_CHECKOUT"`). Substitua pela URL real do checkout antes de publicar:

```ts
// src/content/landing-content.ts
offer: {
  cta: {
    href: "https://seu-checkout-real.com/...",
  },
},
```

### Imagens

As fotos usadas hoje são aproximações reais (fotografadas da própria marca) selecionadas a partir da pasta `img/` do repositório e já redimensionadas/otimizadas para `public/images/`. Para substituir por uma foto final:

1. Coloque o novo arquivo em `public/images/<secao>/`.
2. Atualize o caminho correspondente em `landing-content.ts` (e o texto de `alt`, se a imagem mudar de conteúdo).

Todas as imagens passam por `next/image`, então qualquer arquivo novo já sai otimizado (tamanhos responsivos, WebP/AVIF, lazy-load) sem configuração adicional.

## Cores e tipografia

### Paleta

As cores da marca estão centralizadas como Tailwind theme tokens em `src/app/globals.css` (bloco `@theme`), então podem ser usadas como utilitários normais (`bg-orange`, `text-red`, `bg-cream`, etc.):

| Token | Hex |
| --- | --- |
| `orange` | `#E8490D` |
| `orange-dark` | `#C9340B` |
| `red` | `#B5160C` |
| `yellow` | `#FFAE00` |
| `cream` | `#FBEFDD` |
| `pale-yellow` | `#FDE592` |
| `mint` | `#DFF4EF` |
| `green` | `#47792F` |
| `black` | `#101010` |
| `white` | `#FFFFFF` |

### Tipografia

Enquanto a fonte oficial da marca não está disponível, os títulos usam **Titan One** (via `next/font/google`) como fallback de display — arredondada, pesada e retrô, compatível com o estilo de caixa mista das referências. Os textos correntes usam **Inter**.

Para trocar pela fonte oficial quando ela chegar:

1. Adicione os arquivos da fonte em `public/fonts/`.
2. Troque o import de `Titan_One` em `src/app/layout.tsx` por `next/font/local`, apontando para os arquivos.
3. Ajuste a linha `--font-display` em `src/app/globals.css` se o nome da variável mudar.

Nenhum outro arquivo precisa ser tocado — todos os títulos consomem a fonte via a variável `--font-display`/classe `.text-display-*`.

O lettering "Método Crispy" do Hero usa o SVG oficial (`public/logos/metodo-crispy-lettering.svg`), não uma fonte aproximada.

## Acessibilidade

- Um único `<h1>` na página (Hero, com o SVG do lettering como conteúdo e `alt` acessível).
- Hierarquia `h2`/`h3` consistente em cada seção.
- `alt` descritivo em todas as imagens de conteúdo.
- Estados de foco (`:focus-visible`), hover e active visíveis em todos os links/botões.
- Áreas clicáveis com altura mínima de 44px.
- Animações de entrada (`Reveal`) são desabilitadas automaticamente sob `prefers-reduced-motion: reduce`, e a página funciona 100% sem elas.

## Deploy

O projeto é um app Next.js padrão, pronto para deploy na [Vercel](https://vercel.com):

```bash
npx vercel
```

Ou conectando o repositório diretamente pelo dashboard da Vercel. Nenhuma variável de ambiente é necessária. Para outros provedores, rode `npm run build && npm run start` (requer Node.js 18+).
