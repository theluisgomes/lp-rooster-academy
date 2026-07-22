import { CTAButton } from "@/components/ui/CTAButton";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/content/landing-content";

/**
 * Desktop: very-rounded portrait on the left, content on the right (headline
 * display type + name + copy + 2x2 credential grid + divider + CTA).
 * Mobile: image, title, description, credentials in sequence.
 */
export function MentorSection() {
  const { mentor } = landingContent;

  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[38%_1fr] lg:gap-14">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[3rem] lg:mx-0 lg:aspect-auto lg:h-full lg:max-w-none">
              <ResponsiveImage
                src={mentor.image}
                alt={mentor.imageAlt}
                fill
                rounded="none"
                sizes="(min-width: 1024px) 38vw, 90vw"
              />
            </div>

            <div className="flex flex-col">
              <SectionTitle as="h2" size="xl" className="text-orange">
                {mentor.eyebrow}
              </SectionTitle>
              <p className="mt-2 font-display text-2xl text-orange">
                {mentor.name}
              </p>

              <h3 className="mt-8 text-xl font-bold text-black lg:text-2xl">
                {mentor.headline}
              </h3>
              <p className="mt-4 text-black/80">{mentor.description}</p>

              <div className="mt-8 grid grid-cols-1 gap-y-6 gap-x-10 sm:grid-cols-2">
                {mentor.credentials.map((credential) => (
                  <div key={credential.title}>
                    <p className="font-bold text-black">{credential.title}</p>
                    <p className="mt-1 text-black/80">{credential.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-6 border-t border-black/15 pt-6 sm:flex-row sm:items-center sm:justify-end">
                <CTAButton
                  label={mentor.cta.label}
                  href={mentor.cta.href}
                  variant="black"
                  typeface="sans"
                  fullWidthOnMobile
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
