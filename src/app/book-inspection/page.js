"use client";

/**
 * G-wealth Republic — Book an Inspection Page
 */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Calendar, Clock, Users, MessageSquare } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { Select } from "@/components/ui/form";
import { Textarea } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/form";
import { getProperties, submitAppointmentRequest } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { DemoNotice } from "@/components/DemoNotice";
import { DemoBadge } from "@/components/ui/badge";

export default function BookInspectionPage() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();

  const selectedPropId = watch("propertyId");

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    if (selectedPropId) {
      const prop = properties.find((p) => p.id === selectedPropId);
      setSelectedProperty(prop);
    }
  }, [selectedPropId, properties]);

  async function loadProperties() {
    const result = await getProperties({ publishedOnly: false });
    setProperties(result.data);
  }

  const onSubmit = async (data) => {
    try {
      await submitAppointmentRequest(data);
      setIsSubmitted(true);
    } catch {
      // handle error
    }
  };

  const today = new Date().toISOString().split("T")[0];

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
              <li className="text-slate-700">Book an Inspection</li>
            </ol>
          </nav>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-2">Book Property Inspection</h1>
          <p className="text-slate-600 mb-8 max-w-2xl">Schedule a guided inspection with our certified property consultants. We'll contact you to confirm your appointment.</p>

          {!isSubmitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input label="Full Name" error={errors.fullName?.message} {...register("fullName", { required: "Full name is required" })} />
                    <Input label="Email" type="email" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
                  </div>
                  <Input label="Phone Number" type="tel" error={errors.phone?.message} {...register("phone", { required: "Phone is required" })} />
                  <Select label="Property of Interest" error={errors.propertyId?.message} {...register("propertyId", { required: "Please select a property" })}>
                    <option value="">Select a property</option>
                    {properties.map((prop) => (
                      <option key={prop.id} value={prop.id}>{prop.title} — {formatCurrency(prop.price)}</option>
                    ))}
                  </Select>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Input label="Preferred Date" type="date" min={today} error={errors.preferredDate?.message} {...register("preferredDate", { required: "Date is required" })} />
                    <Input label="Preferred Time" type="time" error={errors.preferredTime?.message} {...register("preferredTime", { required: "Time is required" })} />
                    <Input label="Number of Visitors" type="number" min="1" max="10" defaultValue="1" error={errors.visitorCount?.message} {...register("visitorCount", { required: "Number of visitors is required" })} />
                  </div>
                  <Textarea label="Additional Message (optional)" rows={4} {...register("message")} />
                  <Checkbox label="I agree to the privacy policy and terms of service" {...register("consent", { required: "You must agree to proceed" })} />
                  {errors.consent && <p className="text-sm text-error">{errors.consent.message}</p>}
                  <Button type="submit" variant="gold" className="w-full" size="lg" loading={isSubmitting}>Submit Request</Button>
                </form>
              </div>

              {/* Property Summary */}
              <div className="lg:col-span-1">
                {selectedProperty ? (
                  <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-navy mb-4">Selected Property</h3>
                    <img src={selectedProperty.coverImage} alt={selectedProperty.title} className="mb-3 h-40 w-full rounded-lg object-cover" />
                    <h4 className="font-medium text-navy">{selectedProperty.title}</h4>
                    <p className="text-sm text-slate-600 mb-2">{selectedProperty.neighborhood}, {selectedProperty.city}</p>
                    <p className="text-2xl font-bold text-gold mb-4">{formatCurrency(selectedProperty.price)}</p>
                    <Badge variant="outline">Status: {selectedProperty.availabilityStatus}</Badge>
                    <p className="mt-3 text-xs text-slate-500">Your appointment request will be reviewed by our team within 1 business hour.</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Select a property to see its details here.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center py-16">
              <div className="mb-6 flex justify-center text-6xl">✓</div>
              <h2 className="font-serif text-3xl font-bold text-navy mb-4">Request Submitted</h2>
              <p className="text-slate-600 mb-6">Your inspection request has been received. Our team will contact you within 1 business hour to confirm your appointment.</p>
              <DemoBadge className="mb-6" />
              <div className="space-y-3">
                <Link href="/properties"><Button variant="gold">View More Properties</Button></Link>
                <Link href="/"><Button variant="outline">Back to Home</Button></Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
