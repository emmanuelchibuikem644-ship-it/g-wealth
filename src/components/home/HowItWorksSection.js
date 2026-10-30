/**
 * G-wealth Republic — How It Works Section
 */
import { siteContent } from "@/lib/data/content";
import { Search, Calendar, CreditCard, Home } from "lucide-react";

const iconMap = { "search": Search, "calendar": Calendar, "credit-card": CreditCard, "home": Home };

export function HowItWorksSection() {
  const { howItWorks } = siteContent;
  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-blue mb-4">{howItWorks.headline}</h2>
          <p className="text-slate-600 md:text-lg">{howItWorks.subheading}</p>
        </div>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-px bg-blue/30 hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {howItWorks.steps.map((step) => {
              const Icon = iconMap[step.icon] || Search;
              return (
                <div key={step.step} className="relative text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue/10 text-blue mx-auto">
                    <span className="font-bold text-xl">{step.step}</span>
                  </div>
                  <div className="mb-2 flex justify-center">
                    <div className="rounded-lg bg-blue/10 p-2">
                      <Icon className="h-5 w-5 text-blue" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                  {step.step < 4 && (
                    <div className="hidden md:block absolute top-8 -right-2 text-gold">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
