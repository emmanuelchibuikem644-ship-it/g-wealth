/**
 * G-wealth Republic — Homepage
 */
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { DemoNotice } from "@/components/DemoNotice";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { LocationsSection } from "@/components/home/LocationsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getProperties } from "@/lib/store";

export default async function HomePage() {
  const { data } = await getProperties({ featured: true, sortBy: "featuredOrder", sortOrder: "asc" });
  const heroProperty = data.find((p) => p.featuredOrder === 1) || data[0];

  return (
    <>
      <Navigation />
      <DemoNotice className="fixed top-16 left-0 right-0 z-50 border-b border-amber-200 rounded-none" />
      <main>
        <HeroSection featuredProperty={heroProperty} />
        <TrustSection />
        <FeaturedProperties />
        <WhyChooseSection />
        <HowItWorksSection />
        <LocationsSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

