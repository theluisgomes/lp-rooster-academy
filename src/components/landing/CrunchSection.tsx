import { SectionTracker } from "@/components/analytics/SectionTracker";
import { CTAButton } from "@/components/ui/CTAButton";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/content/landing-content";

/**
 * Casquinha Crock (approved) + Dor → Solução transformation that replaces
 * the old side feature list under "crocância".
 */
export function CrunchSection() {
  const { crunch } = landingContent;
  const { transformation } = crunch;

  return (
    <SectionTracker sectionId={crunch.id} className="section-y bg-white">
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
                  trackingId={crunch.cta.trackingId}
                  trackingLocation={crunch.cta.trackingLocation}
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
          <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-14">
            <div>
              <h3 className="text-display-md text-red">
                {transformation.painTitle}
              </h3>
              <ul className="mt-6 flex flex-col gap-4">
                {transformation.painItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-black">
                    <span
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red text-sm font-bold text-white"
                      aria-hidden="true"
                    >
                      ✕
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-display-md text-orange">
                {transformation.solutionTitle}
              </h3>
              <ul className="mt-6 flex flex-col gap-4">
                {transformation.solutionItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-black">
                    <span
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green text-sm font-bold text-white"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionTracker>
  );
}
