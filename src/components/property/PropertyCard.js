"use client";

/**
 * G-wealth Republic — Property Card Component
 * Reusable property card with favourite toggle and compare action.
 */
import Link from "next/link";
import { Heart, Share2, BarChartHorizontal as Compare } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPropertyTypeLabel, getTitleDocumentLabel, getAvailabilityColor } from "@/lib/utils";
import { isFavourite, toggleFavourite, isComparing, toggleCompare } from "@/lib/store";
import { useState, useEffect } from "react";

export function PropertyCard({ property, compact = false, showCompare = false, className }) {
  const [isFav, setIsFav] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  useEffect(() => {
    setIsFav(isFavourite(property.id));
    setIsCompared(isComparing(property.id));
  }, [property.id]);

  const handleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleFavourite(property.id);
    setIsFav(updated.includes(property.id));
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleCompare(property.id);
    setIsCompared(updated.includes(property.id));
  };

  const favClasses = "absolute top-3 right-3 z-10 rounded-full p-1.5 bg-white/80 backdrop-blur text-slate-600 hover:text-blue-light hover:bg-white transition-all";
  const badgeColor = getAvailabilityColor(property.availabilityStatus);

  if (compact) {
    return (
      <Link href={`/properties/${property.slug}`} className={cn("group block", className)}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
          <img
            src={property.coverImage}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <button onClick={handleFavourite} className={favClasses}>
            <Heart className={cn("h-4 w-4", isFav && "fill-gold text-gold")} />
          </button>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-serif text-base font-semibold text-navy group-hover:text-gold transition-colors">{property.title}</h3>
          <p className="text-sm text-slate-600">{property.location || property.neighborhood}, {property.city}</p>
          <p className="text-lg font-bold text-navy">{formatCurrency(property.price)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/properties/${property.slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-slate-100">
        <img
          src={property.coverImage}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <StatusBadge status={property.availabilityStatus} label={property.availabilityStatus} color={badgeColor} />
          {property.featured && <Badge variant="gold" className="mt-1">Featured</Badge>}
        </div>
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button onClick={handleFavourite} className="rounded-full bg-white/80 p-1.5 text-slate-600 hover:bg-white hover:text-gold transition-all">
            <Heart className={cn("h-4 w-4", isFav && "fill-gold text-gold")} />
          </button>
          {showCompare && (
            <button onClick={handleCompare} className="rounded-full bg-white/80 p-1.5 text-slate-600 hover:bg-white hover:text-navy transition-all">
              <Compare className={cn("h-4 w-4", isCompared && "fill-navy text-navy")} />
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-serif text-xl font-semibold text-navy group-hover:text-gold transition-colors line-clamp-1">{property.title}</h3>
          <Badge variant="outline" className="text-xs">{getPropertyTypeLabel(property.propertyType)}</Badge>
        </div>
        <p className="text-sm text-slate-600">{property.neighborhood}, {property.city}</p>
        <div className="flex items-baseline gap-3">
          <p className="text-2xl font-bold text-navy">{formatCurrency(property.price)}</p>
          <span className="text-sm text-slate-500">• {property.size.toLocaleString()} sqm</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{getTitleDocumentLabel(property.titleDocument)}</span>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2 group-hover:bg-navy group-hover:text-white transition-colors">
          View Details
        </Button>
      </div>
    </Link>
  );
}
