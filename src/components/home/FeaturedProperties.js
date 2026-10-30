"use client";

/**
 * G-wealth Republic — Featured Properties Carousel
 */
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getProperties } from "@/lib/store";

export function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setLoading(true);
    const result = await getProperties({ featured: true, sortBy: "featuredOrder", sortOrder: "asc" });
    setProperties(result.data.slice(0, 8));
    setLoading(false);
  }

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 10);
      setCanScrollRight(scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 320;
    const target = direction === "left" ? scrollRef.current.scrollLeft - amount : scrollRef.current.scrollLeft + amount;
    scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-8 text-center">Featured Properties</h2>
          <div className="flex gap-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[300px] animate-pulse rounded-xl bg-slate-200 h-[400px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Featured Properties</h2>
          <Link href="/properties">
            <Button variant="ghost" size="sm">View All Properties →</Button>
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No featured properties at the moment.</div>
        ) : (
          <>
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((property, i) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <PropertyCard property={property} compact />
                </motion.div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative">
              <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-2">
                {properties.map((property, i) => (
                  <motion.div
                    key={property.id}
                    className="min-w-[280px]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <PropertyCard property={property} compact />
                  </motion.div>
                ))}
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className="rounded-full bg-navy text-white p-2 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className="rounded-full bg-navy text-white p-2 disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
