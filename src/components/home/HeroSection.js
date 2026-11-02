"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form";
import { CITIES, PROPERTY_TYPE_LABELS } from "@/lib/constants";
import { siteContent } from "@/lib/data/content";
import { useRouter } from "next/navigation";

const FALLBACK_IMAGE =
  "engin-akyurt-iw8RG8_lS1I-unsplash.jpg";

export function HeroSection({ featuredProperty }) {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [imageSrc, setImageSrc] = useState(FALLBACK_IMAGE);

  // Load the featured property's image or use the fallback.
  useEffect(() => {
    const propertyImage =
      typeof featuredProperty?.coverImage === "string"
        ? featuredProperty.coverImage.trim()
        : "";

    setImageSrc(propertyImage || FALLBACK_IMAGE);
  }, [featuredProperty?.coverImage]);

  // Parallax background animation.
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "30%"]
  );

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location) params.set("city", location);
    if (propertyType) params.set("propertyType", propertyType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/properties?${params.toString()}`);
  };

  const words = siteContent.hero.headline.split(" ");

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-slate-950">

      {/* HERO BACKGROUND IMAGE */}
      <motion.img
        key={imageSrc}
        src={imageSrc}
        alt="Luxury real estate property"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ y: parallaxY }}
        onError={() => {
          if (imageSrc !== FALLBACK_IMAGE) {
            setImageSrc(FALLBACK_IMAGE);
          }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        fetchPriority="high"
        aria-hidden="true"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 z-[1] bg-black/50" />

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-6 pb-32 text-center">

        <motion.h1
          className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.1,
                ease: "easeOut",
              }}
            >
              {word === "Land" || word === "Confidence" ? (
                <span className="text-blue">{word}</span>
              ) : (
                word
              )}
              {" "}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-3xl text-lg text-slate-200 sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {siteContent.hero.supportingText}
        </motion.p>

        {/* HERO BUTTONS */}
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link href="/properties">
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 shadow-lg"
            >
              {siteContent.hero.primaryCta}
            </Button>
          </Link>

          <Link href="/book-inspection">
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              {siteContent.hero.secondaryCta}
            </Button>
          </Link>
        </motion.div>

        {/* TRUST INDICATORS */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {siteContent.hero.trustIndicators.map((ind, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span>{ind.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* PROPERTY SEARCH PANEL */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 rounded-xl bg-white p-2 shadow-2xl sm:p-4"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 1.2,
          ease: "easeOut",
        }}
      >
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 gap-3 sm:grid-cols-5"
        >
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-0 bg-slate-50"
          >
            <option value="">Location</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>

          <Select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="border-0 bg-slate-50"
          >
            <option value="">Property Type</option>
            {Object.entries(PROPERTY_TYPE_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </Select>

          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border-0 bg-slate-50"
          />

          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border-0 bg-slate-50"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            size="md"
          >
            <Search className="mr-1 h-4 w-4" />
            Search
          </Button>
        </form>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-white/60"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <span className="mb-1 text-xs">Scroll to explore</span>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
