/**
 * G-wealth Republic — Trust/Credibility Section
 */
import { siteContent } from "@/lib/data/content";
import { Shield, Tag, ClipboardCheck, Headphones, FileText } from "lucide-react";

const iconMap = { "shield-check": Shield, "tag": Tag, "clipboard-check": ClipboardCheck, "headphones": Headphones, "file-text": FileText };

export function TrustSection() {
  const { trust } = siteContent;
  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-blue mb-4">{trust.headline}</h2>
          <p className="text-slate-600 md:text-lg">{trust.subheading}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trust.items.map((item, i) => {
            const Icon = iconMap[item.icon] || Shield;
            return (
              <div key={i} className="group rounded-xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue/10 text-blue group-hover:bg-blue/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-blue mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
