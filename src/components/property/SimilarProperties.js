/**
 * G-wealth Republic — Similar Properties Component
 */
import Link from "next/link";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getProperties } from "@/lib/store";

export async function SimilarProperties({ currentPropertyId, city }) {
  const { data } = await getProperties({ city, limit: 4 });
  const similar = data.filter((p) => p.id !== currentPropertyId).slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-serif text-2xl font-bold text-navy mb-6">Similar Properties</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {similar.map((property) => (
          <PropertyCard key={property.id} property={property} compact />
        ))}
      </div>
    </section>
  );
}
