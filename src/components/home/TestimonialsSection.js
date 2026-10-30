/**
 * G-wealth Republic — Testimonials Section
 */
import { siteContent } from "@/lib/data/content";
import { DemoBadge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const { testimonials } = siteContent;
  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">What Our Customers Say</h2>
          <p className="text-slate-600 md:text-lg">Hear from those who have found their dream properties with us.</p>
        </div>
        <div className="mx-auto max-w-2xl">
          {testimonials.slice(0, 1).map((t) => (
            <div key={t.id} className="relative rounded-xl bg-white p-8 shadow-sm">
              <div className="absolute top-4 right-4">
                <DemoBadge />
              </div>
              <div className="mb-4 flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <p className="font-serif text-xl italic text-slate-800 mb-6">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full" />
                <div>
                  <p className="font-bold text-navy">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonials.slice(1).map((t) => (
            <div key={t.id} className="relative rounded-xl bg-white p-6 shadow-sm">
              <DemoBadge className="absolute top-3 right-3" />
              <div className="mb-3 flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}
              </div>
              <p className="text-sm italic text-slate-700 mb-4">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full" />
                <div>
                  <p className="font-medium text-navy">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
