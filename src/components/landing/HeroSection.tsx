import Image from "next/image";
import { SectionTracker } from "@/components/analytics/SectionTracker";
import { CTAButton } from "@/components/ui/CTAButton";
import { landingContent } from "@/content/landing-content";

/**
 * Full-bleed hero. The single <h1> of the page lives here, rendered through
 * the official "Método Crispy" SVG lettering (its `alt` text is the
 * accessible name), per the brief's requirement of one h1 + SVG title.
 */
export function HeroSection() {
  const { hero, brand } = landingContent;

  return (
    <SectionTracker
      sectionId="hero"
      className="relative flex min-h-[600px] items-center justify-center overflow-hidden lg:min-h-[820px]"
    >
      <Image
        src={hero.backgroundImage}
        alt={hero.backgroundImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Flat, semi-transparent tint for text legibility (no CSS gradient) */}
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-orange/30" aria-hidden="true" />

      <div className="container-page relative z-10 flex min-w-0 flex-col items-center py-16 text-center">
        <div className="mx-auto mb-6 w-full max-w-[230px]">
          <Image
            src={brand.roosterLogo}
            alt={hero.eyebrow}
            width={400}
            height={182}
            className="h-auto w-full"
            priority
          />
        </div>

        <h1 className="mx-auto w-full min-w-0 max-w-[640px]">
          <Image
            src={brand.metodoCrispyLettering}
            alt={hero.title}
            width={689}
            height={584}
            className="h-auto w-full"
            priority
          />
        </h1>

        <p className="mx-auto mt-5 max-w-[720px] text-xl font-bold text-white sm:text-2xl lg:mt-6 lg:text-[2rem] lg:leading-snug">
          {hero.headline}
        </p>

        <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-white/95 sm:text-lg lg:text-xl">
          {hero.subtitle}
        </p>

        <div className="mt-8 flex w-full justify-center lg:mt-10">
          <CTAButton
            label={hero.primaryCta.label}
            href={hero.primaryCta.href}
            variant="white"
            size="lg"
            fullWidthOnMobile
            trackingId={hero.primaryCta.trackingId}
            trackingLocation={hero.primaryCta.trackingLocation}
          />
        </div>
      </div>
    </SectionTracker>
  );
}
