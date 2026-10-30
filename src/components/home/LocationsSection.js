/**
 * G-wealth Republic — Locations Section
 */
import Link from "next/link";
import { siteContent } from "@/lib/data/content";

export function LocationsSection() {
  const { locations } = siteContent;
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">Our Locations</h2>
          <p className="text-slate-600 md:text-lg">Premium properties across Nigeria's key cities</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc) => (
            <Link key={loc.city} href={`/properties?city=${encodeURIComponent(loc.city)}`} className="group block">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={loc.image}
                  alt={loc.city}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-serif text-2xl font-bold text-white">{loc.city}</h3>
                  <p className="text-sm text-slate-200 mt-1">{loc.subtitle}</p>
                  <p className="text-sm text-gold mt-2">{loc.propertyCount} Properties Available</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
