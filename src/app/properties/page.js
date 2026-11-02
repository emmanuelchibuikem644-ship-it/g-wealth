  /**
 * G-wealth Republic — Properties Listing Page
 */
"use client";
import { useState, Suspense } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Checkbox } from "@/components/ui/form";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getProperties } from "@/lib/store";
import { PROPERTY_TYPE_LABELS, CITIES, TITLE_DOCUMENTS, AVAILABILITY_STATUS } from "@/lib/constants";
import { Skeleton } from "@/components/ui/card";

const ptOptions = Object.entries(PROPERTY_TYPE_LABELS);
const docOptions = Object.entries(TITLE_DOCUMENTS);
const availOptions = Object.entries(AVAILABILITY_STATUS);

const PropertiesInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState(() => {
    const params = {};
    searchParams.forEach((value, key) => { params[key] = value; });
    return params;
  });

  const updateURL = (f) => {
    const params = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => { if (v) params.set(k, v); });
    router.push(`/properties?${params.toString()}`);
  };

  const loadProperties = async (f) => {
    setLoading(true);
    const result = await getProperties(f, { page: 1, limit: 12 });
    setProperties(result.data);
    setTotal(result.total);
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters };
    if (!value) delete newFilters[key]; else newFilters[key] = value;
    setFilters(newFilters);
    updateURL(newFilters);
    loadProperties(newFilters);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    let sortBy = "createdAt", sortOrder = "desc";
    if (value === "price-asc") { sortBy = "price"; sortOrder = "asc"; }
    else if (value === "price-desc") { sortBy = "price"; sortOrder = "desc"; }
    else if (value === "size") { sortBy = "size"; sortOrder = "desc"; }
    else if (value === "featured") { sortBy = "featured"; }
    loadProperties({ ...filters, sortBy, sortOrder });
  };

  const clearAll = () => {
    setFilters({});
    router.push("/properties");
    loadProperties({});
  };

  const activeCount = Object.keys(filters).filter(k => filters[k]).length;

  return (
    <>
      <Navigation />
      <main className="pt-16 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <nav className="mb-6 text-sm text-slate-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-blue-light">Home</Link></li>
              <span>/</span>
              <li className="text-slate-700">Properties</li>
            </ol>
          </nav>
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-blue mb-2">All Properties</h1>
            <p className="text-slate-600">{total} properties found</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-blue">Filters</h3>
                  {activeCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs">Clear All</Button>
                  )}
                </div>
                <FilterSection filters={filters} handleFilterChange={handleFilterChange} />
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-600">{properties.length} properties found</p>
                <Select onValueChange={handleSortChange}>
                  <option value="createdAt-desc">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="size">Largest First</option>
                  <option value="featured">Featured First</option>
                </Select>
              </div>
              {!loading && properties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500 mb-2">No properties found matching your criteria.</p>
                  <Button onClick={clearAll}>Clear Filters</Button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading ? (
                    [...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse rounded-xl bg-slate-200 h-80" />
                    ))
                  ) : (
                    properties.map((property, i) => (
                      <motion.div key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                        <PropertyCard property={property} />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading properties...</div>}>
      <PropertiesInner />
    </Suspense>

  );
}

function FilterSection({ filters, handleFilterChange }) {
  const [expanded, setExpanded] = useState({ location: true, type: true, availability: true, title: true, price: true });

  const toggle = (key) => setExpanded({ ...expanded, [key]: !expanded[key] });

  return (
    <>
      <CollapseSection title="Location" open={expanded.location} onToggle={() => toggle("location")}>
        {CITIES.map((city) => (
          <Checkbox key={city} label={city} checked={filters.city === city}
            onChange={(e) => handleFilterChange("city", e.target.checked ? city : "")} className="mb-1" />
        ))}
      </CollapseSection>

      <CollapseSection title="Property Type" open={expanded.type} onToggle={() => toggle("type")}>
        {ptOptions.map(([v]) => (
          <Checkbox key={v} label={PROPERTY_TYPE_LABELS[v]} checked={filters.propertyType === v}
            onChange={(e) => handleFilterChange("propertyType", e.target.checked ? v : "")} className="mb-1" />
        ))}
      </CollapseSection>

      <CollapseSection title="Availability" open={expanded.availability} onToggle={() => toggle("availability")}>
        {availOptions.map(([v]) => (
          <Checkbox key={v} label={AVAILABILITY_STATUS[v]} checked={filters.availability === v}
            onChange={(e) => handleFilterChange("availability", e.target.checked ? v : "")} className="mb-1" />
        ))}
      </CollapseSection>

      <CollapseSection title="Title Document" open={expanded.title} onToggle={() => toggle("title")}>
        {docOptions.map(([v]) => (
          <Checkbox key={v} label={TITLE_DOCUMENTS[v]} checked={filters.titleDocument === v}
            onChange={(e) => handleFilterChange("titleDocument", e.target.checked ? v : "")} className="mb-1" />
        ))}
      </CollapseSection>

      <CollapseSection title="Price Range" open={expanded.price} onToggle={() => toggle("price")}>
        <Input type="number" placeholder="Min (₦)" value={filters.minPrice || ""} onChange={(e) => handleFilterChange("minPrice", e.target.value)} className="mb-2" />
        <Input type="number" placeholder="Max (₦)" value={filters.maxPrice || ""} onChange={(e) => handleFilterChange("maxPrice", e.target.value)} />
      </CollapseSection>
    </>
  );
}

function CollapseSection({ title, open, onToggle, children }) {
  return (
    <div className="mb-4">
      <button onClick={onToggle} className="flex w-full items-center justify-between text-left">
        <span className="text-sm font-medium text-slate-700">{title}</span>
        {open ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

