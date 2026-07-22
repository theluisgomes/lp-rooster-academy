import { CTAButton } from "@/components/ui/CTAButton";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/content/landing-content";

/**
 * Large white area. Desktop: headline+CTA opposite the cutout photo on top,
 * then a vertical rotated "crocância" label beside the bite photo and the
 * italic feature list below. Mobile: vertical flow (headline -> CTA ->
 * cutout -> [small horizontal label] -> bite photo -> list).
 */
export function CrunchSection() {
  const { crunch } = landingContent;

  return (
    <section className="section-y bg-white">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <h2 className="text-display-lg text-orange">{crunch.title}</h2>
              <div className="mt-6">
                <CTAButton
                  label={crunch.cta.label}
                  href={crunch.cta.href}
                  variant="yellowOutline"
                  typeface="sans"
                  className="uppercase"
                  fullWidthOnMobile
                />
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-xs lg:mx-0 lg:max-w-[500px]">
              <ResponsiveImage
                src={crunch.cutoutImage}
                alt={crunch.cutoutImageAlt}
                fill
                rounded="none"
                sizes="(min-width: 1024px) 500px, 320px"
              />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex flex-col gap-8 lg:mt-16 lg:grid lg:grid-cols-[auto_1fr_1fr] lg:items-center lg:gap-10">
            <p className="text-center text-display-md text-orange lg:hidden">
              {crunch.verticalLabel}
            </p>
            <div className="hidden [writing-mode:vertical-rl] rotate-180 text-display-lg text-orange lg:flex lg:items-center lg:justify-center">
              {crunch.verticalLabel}
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-lg lg:mx-0 lg:aspect-[9/16]">
              <ResponsiveImage
                src={crunch.biteImage}
                alt={crunch.biteImageAlt}
                fill
                sizes="(min-width: 1024px) 360px, 320px"
              />
            </div>

            <ul className="flex flex-col gap-6 lg:gap-8">
              {crunch.features.map((feature) => (
                <li
                  key={feature}
                  className="max-w-md text-xl font-bold italic text-orange lg:text-2xl"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
