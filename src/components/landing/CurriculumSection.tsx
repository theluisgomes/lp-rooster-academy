import { SectionTitle } from "@/components/ui/SectionTitle";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/content/landing-content";

/**
 * 3 columns desktop (>=1024px), 2 columns tablet (768-1023px), 1 column
 * mobile (<768px). Square/slightly-vertical rounded photos, centered copy.
 */
export function CurriculumSection() {
  const { curriculum } = landingContent;

  return (
    <section id={curriculum.id} className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionTitle as="h2" size="lg" className="mx-auto max-w-2xl text-center text-orange">
            {curriculum.title}
          </SectionTitle>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
          {curriculum.items.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 80}>
              <div className="flex flex-col items-center text-center">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <ResponsiveImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <h3 className="mt-5 text-display-md text-red">{item.title}</h3>
                <p className="mt-2 max-w-sm text-black">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
