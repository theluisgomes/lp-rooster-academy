# Método Crispy — Rooster Academy

Landing page da Rooster Academy para o curso **Método Crispy**, construída com Next.js (App Router), TypeScript e Tailwind CSS, reproduzindo a identidade visual da marca (cores, tipografia arredondada/retrô, composição editorial) com componentes React reais — sem seções renderizadas como imagem.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS v4 (configuração via `@theme` em `globals.css`, sem `tailwind.config.js`)
- `next/image` para todas as fotografias (otimização automática em WebP/AVIF, lazy-load abaixo da dobra, `priority` só na imagem do hero)
- `next/font/google` para as fontes (ver seção "Tipografia" abaixo)
- **GTM-first** analytics (`dataLayer` + Consent Mode v2) + formulário de candidatura (Server Action → webhook)

## Como rodar

```bash
npm install
cp .env.example .env.local   # preencha SITE_URL / GTM / webhook
npm run dev                  # http://localhost:3000
```

Outros comandos:

```bash
npm run build     # build de produção
npm run start      # roda o build de produção localmente
npm run lint       # ESLint
```

## Variáveis de ambiente

Veja [`.env.example`](.env.example):

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica (metadata, sitemap, OG, JSON-LD). Sem barra no final. |
| `NEXT_PUBLIC_GTM_ID` | ID do container GTM (`GTM-XXXX`). Sem ele, o GTM não carrega. |
| `LEADS_WEBHOOK_URL` | Endpoint que recebe o JSON do formulário de candidatura. Em dev, se ausente, o lead é logado no console e o submit ainda sucede. Em produção é obrigatória. |

Configure as mesmas variáveis no painel da Vercel (Project → Settings → Environment Variables).

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx              # fontes, metadata SEO, GTM, Consent Banner
│   ├── page.tsx                # monta as seções da landing, em ordem
│   ├── robots.ts / sitemap.ts  # indexação
│   ├── opengraph-image.tsx     # OG 1200×630
│   ├── privacidade/page.tsx    # política LGPD
│   ├── actions/submit-application.ts
│   └── globals.css
├── components/
│   ├── analytics/              # GTM, ConsentBanner, SectionTracker, LandingAnalytics
│   ├── landing/                # seções (Hero … Offer + ApplicationForm)
│   ├── seo/JsonLd.tsx
│   └── ui/                     # CTAButton (com tracking), …
├── content/landing-content.ts  # copy, preços, CTAs, textos do form
├── hooks/useScrollDepth.ts
└── lib/
    ├── analytics/              # dataLayer, consent, UTM
    ├── application-schema.ts
    └── site.ts
```

## Editando o conteúdo

**Todo o texto, preços, links e imagens da página vêm de [`src/content/landing-content.ts`](src/content/landing-content.ts).** Nenhum componente tem texto fixo — para alterar qualquer copy, preço, item de lista ou caminho de imagem, edite apenas esse arquivo. Os componentes em `src/components/landing/` só leem esse objeto.

### Conversão (candidatura)

Os CTAs de conversão apontam para `#cadastro` (formulário com nome, telefone, e-mail, motivação e checkbox LGPD). O submit vai para a Server Action [`submitApplication`](src/app/actions/submit-application.ts), que valida com Zod e faz `POST` em `LEADS_WEBHOOK_URL` com:

```json
{
  "name": "...",
  "phone": "11999999999",
  "email": "...",
  "motivation": "...",
  "submittedAt": "ISO-8601",
  "utm": { "utm_source": "...", "gclid": "..." },
  "source": "lp-rooster-academy",
  "formId": "turma_application"
}
```

UTMs (`utm_*`, `gclid`, `fbclid`) são capturados da query string e persistidos em `sessionStorage` para acompanhar o lead até o submit.

### Imagens

As fotos usadas hoje são aproximações reais (fotografadas da própria marca) selecionadas a partir da pasta `img/` do repositório e já redimensionadas/otimizadas para `public/images/`. Para substituir por uma foto final:

1. Coloque o novo arquivo em `public/images/<secao>/`.
2. Atualize o caminho correspondente em `landing-content.ts` (e o texto de `alt`, se a imagem mudar de conteúdo).

Todas as imagens passam por `next/image`, então qualquer arquivo novo já sai otimizado (tamanhos responsivos, WebP/AVIF, lazy-load) sem configuração adicional.

## SEO

Já incluso:

- Metadata completa (`title`, `description`, `keywords`, `canonical`, Open Graph, Twitter)
- `metadataBase` via `NEXT_PUBLIC_SITE_URL`
- `robots.ts` + `sitemap.ts`
- `opengraph-image.tsx` (1200×630)
- JSON-LD (`Organization` + `Course` + `Offer` + `WebPage`)
- Favicon / apple icon a partir do logo

## Analytics (GTM-first)

O React **só** faz `dataLayer.push`. GA4, Meta Pixel e Google Ads ficam configurados **dentro do GTM** (não há pixels hardcoded).

### Consent Mode v2 + LGPD

1. Defaults `denied` rodam em um script inline no `layout` **antes** do GTM (`afterInteractive`).
2. Banner no rodapé: Aceitar / Recusar → `consent update` + `localStorage`.
3. Página [`/privacidade`](src/app/privacidade/page.tsx) linkada no banner e no footer.

### Mapa de eventos (`dataLayer`)

| Evento | Quando | Params |
| --- | --- | --- |
| `cta_click` | Clique em CTA | `cta_id`, `cta_label`, `cta_location` |
| `scroll_depth` | 25 / 50 / 75 / 100% | `percent` |
| `section_view` | Seção entra no viewport (1×) | `section_id` |
| `form_start` | Primeiro foco no formulário | `form_id` |
| `form_submit` | Submit iniciado | `form_id` |
| `generate_lead` | Server Action OK | `form_id`, `value`, `currency` |
| `form_error` | Validação ou falha | `form_id`, `error_type` |

`page_view` fica a cargo da tag de configuração do GA4 no GTM.

### Checklist no console do GTM

1. Criar container e copiar o ID para `NEXT_PUBLIC_GTM_ID`.
2. **Consent Initialization** + tags que respeitam Consent Mode.
3. Tag **GA4 Configuration** (Measurement ID).
4. Triggers **Custom Event** espelhando a tabela acima; no GA4 marque `generate_lead` como conversão.
5. Tag **Meta Pixel** (base) + evento `Lead` no trigger `generate_lead`.
6. (Opcional) Google Ads conversion no mesmo trigger.
7. **Preview** (Tag Assistant) → validar events no `dataLayer` → **Submit** / Publish.

Como testar localmente: abra o DevTools → Console → `dataLayer` após clicar CTAs / rolar / enviar o form. No GTM Preview, conecte a URL de preview/produção.

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

Ou conectando o repositório diretamente pelo dashboard da Vercel. Defina `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GTM_ID` e `LEADS_WEBHOOK_URL` no ambiente de Production (e Preview, se quiser). Para outros provedores, rode `npm run build && npm run start` (requer Node.js 18+).
