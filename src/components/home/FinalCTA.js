/**
 * G-wealth Republic — Final CTA Section
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative py-24 text-center text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.picsum.photos/seed/final-cta/1920/600')" }} />
      <div className="absolute inset-0 bg-navy/70" />
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Your Next Property Starts Here</h2>
        <p className="max-w-2xl mx-auto mb-8 text-slate-200">Take the first step towards property ownership. Our team is ready to guide you through every step of the journey.</p>
        <div className="flex flex-col gap-3 justify-center sm:flex-row">
          <Link href="/properties">
            <Button variant="gold" size="lg" className="shadow-lg">Explore Properties</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">Speak to Our Team</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
