import type { Metadata } from "next";
import { Inter, Titan_One } from "next/font/google";
import { landingContent } from "@/content/landing-content";
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

export const metadata: Metadata = {
  title: landingContent.seo.title,
  description: landingContent.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${titanOne.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
