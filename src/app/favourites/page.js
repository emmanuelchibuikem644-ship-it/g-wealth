/**
 * G-wealth Republic — Favourites Page
 */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { getFavourites, getPropertyById } from "@/lib/store";
import { DemoNotice } from "@/components/DemoNotice";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    refreshFavourites();
  }, []);

  async function refreshFavourites() {
    const ids = getFavourites();
    setFavourites(ids);
    const props = [];
    for (const id of ids) {
      const prop = await getPropertyById(id);
      if (prop) props.push(prop);
    }
    setProperties(props.reverse());
  }

  const handleFavouriteChange = () => {
    refreshFavourites();
  };

  if (favourites.length === 0) {
    return (
      <>
        <Navigation />
        <DemoNotice className="mb-4 mx-4 mt-4" />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <nav className="mb-6 text-sm text-slate-500">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:text-gold">Home</Link></li>
                <span>/</span>
                <li className="text-slate-700">Favourites</li>
              </ol>
            </nav>
            <div className="py-16 text-center">
              <Heart className="h-16 w-16 text-slate-300 mx-auto mb-6" />
              <h2 className="font-serif text-2xl font-bold text-navy mb-2">No Favourite Properties</h2>
              <p className="text-slate-600 mb-6">Save properties you're interested in and they'll appear here.</p>
              <Link href="/properties">
                <Button variant="gold" size="lg">Browse Properties</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <DemoNotice className="mb-4 mx-4 mt-4" />
      <main className="pt-16 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <nav className="mb-6 text-sm text-slate-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-gold">Home</Link></li>
              <span>/</span>
              <li className="text-slate-700">Favourites</li>
            </ol>
          </nav>

          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-serif text-3xl font-bold text-navy">Your Favourite Properties</h1>
            <span className="text-slate-500">{favourites.length} {favourites.length === 1 ? "property" : "properties"} saved</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <div key={property.id} className="relative">
                <PropertyCard property={property} compact />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
