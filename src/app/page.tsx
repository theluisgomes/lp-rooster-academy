import { HeroSection } from "@/components/landing/HeroSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { CurriculumSection } from "@/components/landing/CurriculumSection";
import { DreamChickenSection } from "@/components/landing/DreamChickenSection";
import { CrunchSection } from "@/components/landing/CrunchSection";
import { MentorSection } from "@/components/landing/MentorSection";
import { OfferSection } from "@/components/landing/OfferSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <CurriculumSection />
      <DreamChickenSection />
      <CrunchSection />
      <MentorSection />
      <OfferSection />
      <Footer />
    </main>
  );
}
