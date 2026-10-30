
import { siteContent } from "@/lib/data/content";
import { Shield, Tag, CreditCard, UserCheck } from "lucide-react";

const iconMap = { "shield": Shield, "tag": Tag, "credit-card": CreditCard, "user-check": UserCheck };

export function WhyChooseSection() {
  const { whyChoose } = siteContent;
  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-blue mb-4">{whyChoose.headline}</h2>
          <p className="text-slate-600 md:text-lg">{whyChoose.subheading}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {whyChoose.features.map((feat, i) => {
            const Icon = iconMap[feat.icon] || Shield;
            return (
              <div key={i} className="rounded-xl bg-white p-6 shadow-sm text-center transition-all duration-300 hover:shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-blue/5 text-blue mx-auto">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-blue mb-2">{feat.title}</h3>
                <p className="text-slate-600">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
