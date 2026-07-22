import type { Metadata } from "next";
import Link from "next/link";
import { landingContent } from "@/content/landing-content";

export const metadata: Metadata = {
  title: `${landingContent.privacy.title} | ${landingContent.brand.name}`,
  description:
    "Como a Rooster Academy trata dados pessoais nesta landing page do Método Crispy, em conformidade com a LGPD.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  const { privacy, brand } = landingContent;

  return (
    <main className="min-h-screen bg-cream">
      <div className="container-page section-y max-w-3xl">
        <Link
          href="/"
          className="inline-flex text-sm font-semibold text-orange underline-offset-2 hover:underline"
        >
          ← Voltar para a página inicial
        </Link>

        <h1 className="mt-8 text-display-md text-black">{privacy.title}</h1>
        <p className="mt-3 text-sm text-black/60">
          Última atualização: {privacy.lastUpdated} · {brand.name}
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {privacy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-black">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-black/80">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
