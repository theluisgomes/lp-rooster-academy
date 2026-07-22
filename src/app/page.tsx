import { ApplicationFormSection } from "@/components/landing/ApplicationFormSection";
import { AudienceSection } from "@/components/landing/AudienceSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { CrunchSection } from "@/components/landing/CrunchSection";
import { CurriculumSection } from "@/components/landing/CurriculumSection";
import { DreamChickenSection } from "@/components/landing/DreamChickenSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { MentorSection } from "@/components/landing/MentorSection";
import { OfferSection } from "@/components/landing/OfferSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { LandingAnalytics } from "@/components/analytics/LandingAnalytics";

export default function Home() {
  return (
    <main>
      <LandingAnalytics />
      <HeroSection />
      <BenefitsSection />
      <CurriculumSection />
      <DreamChickenSection />
      <CrunchSection />
      <AudienceSection />
      <SocialProofSection />
      <MentorSection />
      <OfferSection />
      <ApplicationFormSection />
      <Footer />
    </main>
  );
}
