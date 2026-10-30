/**
 * G-wealth Republic — Property Detail Page
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import { Heart, Share2, BarChartHorizontal as CompareIcon, MapPin } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { DemoBadge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyPaymentCalculator } from "@/components/property/PropertyPaymentCalculator";
import { InspectionBookingForm } from "@/components/property/InspectionBookingForm";
import { SimilarProperties } from "@/components/property/SimilarProperties";
import { getPropertyBySlug } from "@/lib/store";
import { formatCurrency, getPropertyTypeLabel, getTitleDocumentLabel, getAvailabilityColor } from "@/lib/utils";
import { DemoNotice } from "@/components/DemoNotice";

export async function generateMetadata({ params }) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return {};
  return {
    title: `${property.title} | G-wealth Republic`,
    description: property.shortDescription || property.description,
  };
}

export default async function PropertyDetailPage({ params }) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) notFound();

  const badgeColor = getAvailabilityColor(property.availabilityStatus);
  const amenityIcons = { "Fencing": "🛡️", "Access Road": "🛣️", "Water": "💧", "Electricity": "⚡", "Gym": "🏋️", "Swimming Pool": "🏊", "Security": "👮" };

  return (
    <>
      <Navigation />
      <DemoNotice className="mb-4 mx-4 mt-4" />
      <main className="pt-16 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-slate-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-gold">Home</Link></li>
              <span>/</span>
              <li><Link href="/properties" className="hover:text-gold">Properties</Link></li>
              <span>/</span>
              <li className="text-slate-700">{property.title}</li>
            </ol>
          </nav>

          {/* Gallery */}
          <div className="mb-8">
            <PropertyGallery images={property.galleryImages} title={property.title} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content (col 2) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Action Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusBadge status={property.availabilityStatus} color={badgeColor} />
                  <DemoBadge />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm"><Heart className="h-4 w-4 mr-1" /> Save</Button>
                  <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-1" /> Share</Button>
                  <Button variant="outline" size="sm"><CompareIcon className="h-4 w-4 mr-1" /> Compare</Button>
                </div>
              </div>

              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-2">{property.title}</h1>
                <p className="text-slate-600 mb-4">{property.neighborhood}, {property.city}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gold">{formatCurrency(property.price)}</span>
                  <span className="text-sm text-slate-500 ml-2">({property.size} sqm)</span>
                </div>
                <Badge variant="outline">{getPropertyTypeLabel(property.propertyType)}</Badge>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-serif text-xl font-bold text-navy mb-3">Property Description</h2>
                <p className="text-slate-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-serif text-xl font-bold text-navy mb-3">Amenities</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-white p-3 border border-border">
                      <span className="text-lg">{amenityIcons[amenity] || "✓"}</span>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h2 className="font-serif text-xl font-bold text-navy mb-3">Property Details</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><dt className="text-slate-500">Property Type</dt><dd className="text-navy font-medium">{getPropertyTypeLabel(property.propertyType)}</dd></div>
                  <div><dt className="text-slate-500">Title Document</dt><dd className="text-navy font-medium">{getTitleDocumentLabel(property.titleDocument)}</dd></div>
                  <div><dt className="text-slate-500">Availability</dt><dd className="text-navy font-medium">{property.availabilityStatus}</dd></div>
                  <div><dt className="text-slate-500">Size</dt><dd className="text-navy font-medium">{property.size.toLocaleString()} sqm</dd></div>
                  <div><dt className="text-slate-500">Address</dt><dd className="text-navy font-medium">{property.address}</dd></div>
                  <div><dt className="text-slate-500">Payment Plan</dt><dd className="text-navy font-medium">{property.paymentPlan ? `${property.paymentPlan.depositPercent}% deposit, ${property.paymentPlan.months} months` : "Not available"}</dd></div>
                </dl>
              </div>

              {/* Payment Calculator */}
              <div>
                <h2 className="font-serif text-xl font-bold text-navy mb-3">Pricing & Payment</h2>
                <PropertyPaymentCalculator property={property} />
              </div>

              {/* Map */}
              <div>
                <h2 className="font-serif text-xl font-bold text-navy mb-3">Location</h2>
                <div className="aspect-[3/2] rounded-xl bg-slate-100 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-8 w-8 text-navy mx-auto mb-2" />
                    <p className="text-navy font-medium">{property.city}, Nigeria</p>
                    <p className="text-sm text-slate-500 mt-1">Demo coordinates: {property.coordinates?.lat}, {property.coordinates?.lng}</p>
                    <p className="text-xs text-slate-400 mt-2">Map integration is in demo mode.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-navy mb-4">Book an Inspection</h3>
                <InspectionBookingForm property={property} />
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-navy mb-3">Title Information</h3>
                <p className="text-sm text-slate-600 mb-3">Title: {getTitleDocumentLabel(property.titleDocument)}</p>
                <p className="text-xs text-slate-500">All title information is demo data. Verify before purchase.</p>
              </div>
              <div className="rounded-xl gold-gradient p-6 text-center text-navy">
                <p className="font-bold mb-2">Need help?</p>
                <Button variant="primary" size="sm" asChild>
                  <a href={`https://wa.me/2348004932584?text=Interested in ${encodeURIComponent(property.title)}`} target="_blank" rel="noopener noreferrer">Open WhatsApp</a>
                </Button>
              </div>
            </div>
          </div>

          <SimilarProperties currentPropertyId={property.id} city={property.city} />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
