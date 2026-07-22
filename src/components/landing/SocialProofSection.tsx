import { SectionTracker } from "@/components/analytics/SectionTracker";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/content/landing-content";

/**
 * Turma 1 testimonials — real student comments as social proof.
 */
export function SocialProofSection() {
  const { socialProof } = landingContent;

  return (
    <SectionTracker sectionId={socialProof.id} className="section-y bg-cream">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            as="h2"
            size="lg"
            className="mx-auto max-w-3xl text-center text-orange"
          >
            {socialProof.title}
          </SectionTitle>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {socialProof.testimonials.map((item, index) => (
            <Reveal key={`${item.name}-${index}`} delayMs={index * 50}>
              <figure className="flex h-full flex-col rounded-lg bg-white p-6 lg:p-7">
                <blockquote className="flex-1 text-base leading-relaxed text-black">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm font-bold text-orange">
                  @{item.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionTracker>
  );
}
