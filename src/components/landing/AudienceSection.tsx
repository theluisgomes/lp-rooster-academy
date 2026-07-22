import { SectionTracker } from "@/components/analytics/SectionTracker";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/content/landing-content";

/**
 * "Para quem é" — single-purpose audience checklist after the crunch
 * transformation.
 */
export function AudienceSection() {
  const { audience } = landingContent;

  return (
    <SectionTracker sectionId={audience.id} className="section-y">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle as="h2" size="lg" className="text-orange">
              {audience.title}
            </SectionTitle>
            <p className="mt-4 text-lg text-black lg:text-xl">
              {audience.intro}
            </p>
          </div>
        </Reveal>

        <ul className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 lg:mt-12">
          {audience.items.map((item, index) => (
            <Reveal key={item} delayMs={index * 60}>
              <li className="flex items-start gap-4 rounded-lg bg-cream px-5 py-4 text-left lg:px-6 lg:py-5">
                <span
                  className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-base font-semibold leading-relaxed text-black lg:text-lg">
                  {item}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </SectionTracker>
  );
}
