import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/content/landing-content";

/**
 * Desktop: 50% orange panel (title) / 50% cream panel (2x2 benefits grid).
 * Mobile/tablet (<1024px): stacks into a single column — title first, then
 * the four benefits in one column, per spec.
 */
export function BenefitsSection() {
  const { benefits } = landingContent;

  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal>
          <div className="grid overflow-hidden rounded-lg lg:grid-cols-[52%_1fr]">
            <div className="relative overflow-hidden bg-orange px-8 py-12 lg:px-14 lg:py-16">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute left-[10%] top-[12%] h-[88%] w-[78%]"
              >
                <polygon
                  points="48,0 88,14 100,48 88,82 55,100 20,93 0,62 10,18"
                  fill="var(--color-red)"
                />
              </svg>
              <SectionTitle
                as="h2"
                size="lg"
                className="relative z-10 text-white"
              >
                {benefits.title}
              </SectionTitle>
            </div>

            <div className="grid grid-cols-1 gap-8 bg-cream px-8 py-12 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-14 lg:px-14 lg:py-16">
              {benefits.items.map((item) => (
                <div key={item.title}>
                  <h3 className="text-display-md text-orange">{item.title}</h3>
                  <p className="mt-3 text-black">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
