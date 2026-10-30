 /**
 * G-wealth Republic — Properties Listing Page
 */
"use client";
import { useState } from "react";
import Link from "next/link";
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

export default function PropertiesPage() {
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
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="outline" size="sm" onClick={() => document.getElementById("filter-drawer").showModal()} className="w-fit md:hidden">
              <Filter className="h-4 w-4 mr-1" /> Filters ({activeCount})
            </Button>
            <div className="flex items-center gap-4 ml-auto">
              <Select defaultValue="newest" onChange={handleSortChange} className="w-48">
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="size">Largest Size</option>
                <option value="featured">Featured First</option>
              </Select>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          <dialog id="filter-drawer" className="fixed inset-0 z-50 bg-black/50 md:hidden">
            <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-xl shadow-xl w-full max-w-sm h-[80vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-serif text-lg font-semibold">Filters</h3>
                  <button onClick={() => document.getElementById("filter-drawer").close()} className="p-1">✕</button>
                </div>
                <div className="overflow-y-auto p-4 space-y-4">
                  <FilterSection filters={filters} handleFilterChange={handleFilterChange} />
                </div>
                <div className="p-4 border-t flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => document.getElementById("filter-drawer").close()}>Apply</Button>
                  <Button variant="ghost" size="sm" className="flex-1" onClick={clearAll}>Clear All</Button>
                </div>
              </div>
            </div>
          </dialog>

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden w-64 shrink-0 xl:block">
              <div className="sticky top-20 space-y-6 rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-serif text-lg font-semibold text-navy">Filters</h3>
                <FilterSection filters={filters} handleFilterChange={handleFilterChange} />
                <div className="border-t border-border pt-4">
                  <Button variant="outline" className="w-full" onClick={clearAll}>Clear All Filters</Button>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-[400px] w-full" />)}
                </div>
              ) : properties.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-slate-500 mb-4">No properties match your search.</p>
                  <Button variant="gold" onClick={clearAll}>Clear All Filters</Button>
                </div>
              ) : (
                <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {properties.map((property, i) => (
                    <motion.div key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
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
