"use client";

/**
 * G-wealth Republic — Property Comparison Page
 * Compare up to 3 properties side by side.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCompareList, getPropertyById, clearCompareList, toggleCompare } from "@/lib/store";
import { formatCurrency, getPropertyTypeLabel, getTitleDocumentLabel } from "@/lib/utils";
import { DemoNotice } from "@/components/DemoNotice";

export default function ComparePage() {
  const [compareList, setCompareList] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const ids = getCompareList();
    setCompareList(ids);
    loadProperties(ids);
  }, []);

  async function loadProperties(ids) {
    const props = [];
    for (const id of ids) {
      const prop = await getPropertyById(id);
      if (prop) props.push(prop);
    }
    setProperties(props);
  }

  const removeFromCompare = (propertyId) => {
    toggleCompare(propertyId);
    const newIds = getCompareList();
    setCompareList(newIds);
    setProperties(properties.filter((p) => p.id !== propertyId));
  };

  const clearAll = () => {
    clearCompareList();
    setCompareList([]);
    setProperties([]);
  };

  const comparisonFields = [
    { key: "price", label: "Price" },
    { key: "location", label: "Location" },
    { key: "type", label: "Property Type" },
    { key: "size", label: "Size (sqm)" },
    { key: "title", label: "Title Document" },
    { key: "availability", label: "Availability" },
    { key: "paymentPlan", label: "Payment Plan" },
    { key: "featured", label: "Featured" },
  ];

  if (properties.length === 0) {
    return (
      <>
        <Navigation />
        <DemoNotice className="mb-4 mx-4 mt-4" />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="py-16 text-center">
              <p className="text-slate-500 mb-4">No properties in your comparison list.</p>
              <Link href="/properties">
                <Button variant="gold">Browse Properties</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  const getFieldValue = (property, field) => {
    switch (field.key) {
      case "price": return formatCurrency(property.price);
      case "location": return `${property.neighborhood}, ${property.city}`;
      case "type": return getPropertyTypeLabel(property.propertyType);
      case "size": return property.size.toLocaleString();
      case "title": return getTitleDocumentLabel(property.titleDocument);
      case "availability": return property.availabilityStatus;
      case "paymentPlan": return property.paymentPlan ? `₦${property.paymentPlan.monthlyAmount.toLocaleString()}/mo x ${property.paymentPlan.months} months` : "Not available";
      case "featured": return property.featured ? "Yes" : "No";
      default: return "—";
    }
  };

  return (
    <>
      <Navigation />
      <DemoNotice className="mb-4 mx-4 mt-4" />
      <main className="pt-16 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold text-navy">Compare Properties</h1>
            <Button variant="ghost" size="sm" onClick={clearAll}>Clear All</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr>
                  <th className="text-left font-serif text-navy p-4 bg-ivory">Property</th>
                  {properties.map((prop) => (
                    <th key={prop.id} className="p-4 bg-ivory">
                      <img src={prop.coverImage} alt={prop.title} className="mx-auto h-20 w-full rounded-lg object-cover" />
                      <p className="mt-2 font-medium text-navy text-center">{prop.title}</p>
                      <button onClick={() => removeFromCompare(prop.id)} className="mt-1 text-slate-400 hover:text-error">
                        <X className="h-4 w-4 mx-auto" />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field) => (
                  <tr key={field.key} className="border-t border-border">
                    <td className="p-4 font-medium text-slate-700 bg-ivory">{field.label}</td>
                    {properties.map((prop) => (
                      <td key={prop.id} className="p-4 text-center text-sm text-slate-900">
                        {getFieldValue(prop, field)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            <p>Comparing {properties.length} of 3 properties.</p>
            {compareList.length >= 3 && <p>Add more by visiting property detail pages (max 3 allowed).</p>}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
