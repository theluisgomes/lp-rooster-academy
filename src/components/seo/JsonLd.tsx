import { landingContent } from "@/content/landing-content";
import { getSiteUrl } from "@/lib/site";

/**
 * Organization + Course (+ Offer) structured data for rich results.
 * Rendered as a single JSON-LD script; no client JS required.
 */
export function JsonLd() {
  const { seo, brand, offer, mentor } = landingContent;
  const siteUrl = getSiteUrl();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: brand.name,
        url: siteUrl,
        logo: `${siteUrl}${brand.roosterLogo}`,
      },
      {
        "@type": "Course",
        "@id": `${siteUrl}/#course`,
        name: "Método Crispy",
        description: seo.description,
        url: siteUrl,
        provider: { "@id": `${siteUrl}/#organization` },
        instructor: {
          "@type": "Person",
          name: mentor.name,
        },
        offers: {
          "@type": "Offer",
          price: offer.priceValue,
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/#cadastro`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: {
          "@type": "WebSite",
          name: seo.siteName,
          url: siteUrl,
        },
        about: { "@id": `${siteUrl}/#course` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
