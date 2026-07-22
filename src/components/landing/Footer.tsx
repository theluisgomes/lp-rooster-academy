import Image from "next/image";
import Link from "next/link";
import { landingContent } from "@/content/landing-content";

export function Footer() {
  const { footer, brand } = landingContent;

  return (
    <footer className="bg-black text-white">
      <div className="container-page flex flex-col items-center gap-6 py-12 text-center">
        <Image
          src={brand.roosterLogo}
          alt={brand.roosterLogoAlt}
          width={200}
          height={91}
          className="h-auto w-40"
        />

        <p className="max-w-md text-white/80">{footer.tagline}</p>

        <nav aria-label="Navegação do rodapé">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {footer.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-white/50">{footer.copyright}</p>
      </div>
    </footer>
  );
}
