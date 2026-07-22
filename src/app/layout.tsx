import type { Metadata } from "next";
import { Inter, Titan_One } from "next/font/google";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { JsonLd } from "@/components/seo/JsonLd";
import { landingContent } from "@/content/landing-content";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

/*
 * Fallback display font (chunky, rounded, retro) until the official brand
 * font is available. Swapping later only requires changing this import and
 * the `--font-display` line in globals.css.
 */
const titanOne = Titan_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-titan-one",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = getSiteUrl();
const { seo, brand } = landingContent;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: seo.siteName,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  icons: {
    icon: [{ url: brand.roosterLogo, type: "image/png" }],
    apple: [{ url: brand.roosterLogo }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

  return (
    <html lang="pt-BR" className={`${titanOne.variable} ${inter.variable}`}>
      <body>
        {/* Consent Mode v2 defaults must run before GTM (afterInteractive). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
            `.trim(),
          }}
        />
        <JsonLd />
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
