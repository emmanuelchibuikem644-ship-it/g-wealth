"use client";

/**
 * G-wealth Republic — Inspection Booking Form (Property Detail)
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/form";
import { Select } from "@/components/ui/form";
import { Textarea } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { submitAppointmentRequest } from "@/lib/store";

export function InspectionBookingForm({ property }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data) => {
    await submitAppointmentRequest({ ...data, propertyId: property.id });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl bg-success-bg p-8 text-center">
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="font-serif text-xl font-bold text-navy mb-2">Request Submitted</h3>
        <p className="text-sm text-slate-700">Your inspection request has been received. We'll contact you to confirm within 1 business hour.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Full Name" error={errors.fullName?.message} {...register("fullName", { required: "Required" })} />
        <Input label="Email" type="email" error={errors.email?.message} {...register("email", { required: "Required" })} />
      </div>
      <Input label="Phone" type="tel" error={errors.phone?.message} {...register("phone", { required: "Required" })} />
      <Input type="hidden" {...register("propertyId")} value={property.id} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Preferred Date" type="date" min={today} error={errors.preferredDate?.message} {...register("preferredDate", { required: "Required" })} />
        <Input label="Preferred Time" type="time" error={errors.preferredTime?.message} {...register("preferredTime", { required: "Required" })} />
        <Input label="Visitors" type="number" min="1" max="10" defaultValue="2" error={errors.visitorCount?.message} {...register("visitorCount", { required: "Required" })} />
      </div>
      <div className="rounded-lg bg-navy/5 p-4">
        <h4 className="font-medium text-navy mb-1">Property: {property.title}</h4>
        <p className="text-lg font-bold text-gold">{formatCurrency(property.price)}</p>
      </div>
      <Textarea label="Additional Message" rows={4} {...register("message")} />
      <Checkbox label="I agree to the privacy policy" {...register("consent", { required: "Required" })} />
      {errors.consent && <p className="text-sm text-error">{errors.consent.message}</p>}
      <Button type="submit" variant="gold" className="w-full" loading={isSubmitting}>Book Inspection</Button>
    </form>
  );
}
