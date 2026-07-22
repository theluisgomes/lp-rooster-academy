import { CTAButton } from "@/components/ui/CTAButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/content/landing-content";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 flex-shrink-0 text-orange"
    >
      <path
        d="M4 10.5L8 14.5L16 6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6 flex-shrink-0 text-orange"
    >
      <rect x="3" y="9" width="18" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 13H21" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 9V20" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 9C12 9 8.5 9 7.5 6.8C6.7 5 8.5 3.5 10 4.5C11.5 5.5 12 9 12 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 9C12 9 15.5 9 16.5 6.8C17.3 5 15.5 3.5 14 4.5C12.5 5.5 12 9 12 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/**
 * Desktop: price column (left, CTA directly under the price) beside a cream
 * "what's included" card (right, independent height — no grid row-span, so
 * its height never stretches the price column and leaves a gap above the
 * CTA). Mobile: title+price -> included list -> CTA, achieved by hiding the
 * in-column CTA below `lg` and showing a second copy right after the list.
 */
export function OfferSection() {
  const { offer } = landingContent;

  return (
    <section id={offer.id} className="section-y">
      <div className="container-page">
        <Reveal>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-x-14">
            <div>
              <SectionTitle as="h2" size="ml" className="text-black">
                {offer.title}
              </SectionTitle>
              <p className="mt-4 text-lg text-orange lg:text-xl">
                {offer.description}
              </p>

              <div className="mt-8 flex flex-wrap items-start gap-5">
                <span className="text-display-xl text-orange">{offer.currentPrice}</span>
                <span className="mt-3 text-xl text-black/40 line-through">
                  {offer.originalPrice}
                </span>
              </div>
              <p className="mt-2 text-lg text-orange lg:text-xl">
                {offer.installments}
              </p>

              {/* Desktop/tablet-up CTA: sits right below the price, in normal flow. */}
              <div className="mt-8 hidden lg:block">
                <CTAButton
                  label={offer.cta.label}
                  href={offer.cta.href}
                  variant="yellowSolid"
                  size="xl"
                  typeface="sans"
                  className="w-full max-w-[560px]"
                />
              </div>
            </div>

            <div className="rounded-lg bg-cream p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <GiftIcon />
                <h3 className="text-xl font-bold text-black lg:text-2xl">
                  {offer.includedTitle}
                </h3>
              </div>
              <ul className="mt-6 flex flex-col gap-4">
                {offer.includedItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 rounded-full bg-peach px-4 py-2.5"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white">
                      <CheckIcon />
                    </span>
                    <span className="font-bold text-black">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile/tablet CTA: appears after the included list, matching the
                required reading order (title+price -> list -> CTA). */}
            <div className="lg:hidden">
              <CTAButton
                label={offer.cta.label}
                href={offer.cta.href}
                variant="yellowSolid"
                size="xl"
                typeface="sans"
                className="w-full"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
