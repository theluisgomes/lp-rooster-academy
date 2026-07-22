import { SectionTracker } from "@/components/analytics/SectionTracker";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/content/landing-content";

/* Irregular octagon, eyeballed from the reference badge art */
const octagonStyle = {
  clipPath:
    "polygon(32% 2%, 72% 0%, 96% 22%, 100% 62%, 80% 94%, 42% 100%, 8% 84%, 0% 38%)",
};

/**
 * Asymmetric editorial composition on desktop: ~42% text column (card +
 * secondary photo) next to a ~58% primary photo, with a green hexagon badge
 * overlapping the seam between the two photos. On mobile it collapses into
 * a simple vertical sequence with the badge inline (no overlap).
 */
export function DreamChickenSection() {
  const { dreamChicken } = landingContent;

  return (
    <SectionTracker sectionId={dreamChicken.id} className="section-y">
      <div className="container-page">
        <Reveal>
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[38%_1fr] lg:gap-14">
            <div className="flex flex-col gap-6">
              <div className="rounded-lg bg-pale-yellow p-8 text-center lg:p-10">
                <SectionTitle as="h2" size="ml" className="text-black">
                  {dreamChicken.title}
                </SectionTitle>
                <p className="mt-4 leading-relaxed text-black">
                  {dreamChicken.description}
                </p>
              </div>

              <div className="relative aspect-[4/3] min-h-0 overflow-hidden rounded-lg lg:aspect-auto lg:flex-1">
                <ResponsiveImage
                  src={dreamChicken.secondaryImage}
                  alt={dreamChicken.secondaryImageAlt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-[6/7]">
              <ResponsiveImage
                src={dreamChicken.primaryImage}
                alt={dreamChicken.primaryImageAlt}
                fill
                sizes="(min-width: 1024px) 62vw, 100vw"
              />
            </div>

            {/* Mobile/tablet badge: last in the sequence, normal inline flow, no overlap */}
            <div className="flex justify-center lg:hidden">
              <div
                style={octagonStyle}
                className="flex h-32 w-32 items-center justify-center bg-green px-4 text-center text-sm font-semibold uppercase leading-tight text-white"
              >
                {dreamChicken.badge}
              </div>
            </div>

            {/* Desktop badge: absolutely positioned over the seam between the two photos */}
            <div
              style={octagonStyle}
              className="absolute top-1/2 left-[calc(38%+1.75rem)] hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-green px-6 text-center text-base font-semibold uppercase leading-tight text-white lg:flex"
            >
              {dreamChicken.badge}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionTracker>
  );
}
