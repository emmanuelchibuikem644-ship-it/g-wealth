"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { siteContent } from "@/lib/data/content";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { DemoBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { Textarea } from "@/components/ui/form";
import { Select } from "@/components/ui/form";
import { submitContactForm } from "@/lib/store";
import { DemoNotice } from "@/components/DemoNotice";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const { contactInfo } = siteContent;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data) => {
    try {
      await submitContactForm(data);
      setIsSubmitted(true);
    } catch {
      setSubmitError("There was an error submitting your enquiry. Please try again.");
    }
  };

  return (
    <>
      <Navigation />
      <DemoNotice className="mb-4 mx-4 mt-4" />
      <main className="pt-16 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <nav className="mb-6 text-sm text-slate-500">
            <ol className="flex items-center gap-2">
              <li><a href="/" className="hover:text-gold">Home</a></li>
              <span>/</span>
              <li className="text-slate-700">Contact</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">Get In Touch</h1>
              <p className="text-slate-600 mb-8">Have questions about properties or the inspection process? Reach out to our team.</p>

              <div className="space-y-6">
                <div className="flex gap-4"><Mail className="h-5 w-5 text-gold" /><div><p className="font-medium text-navy">Email</p><p className="text-slate-600">{contactInfo?.email || "info@gwealth.com"}</p></div></div>
                <div className="flex gap-4"><Phone className="h-5 w-5 text-gold" /><div><p className="font-medium text-navy">Phone</p><p className="text-slate-600">{contactInfo?.phone || "+234-816-XXX-XXXX"}</p></div></div>
                <div className="flex gap-4"><MapPin className="h-5 w-5 text-gold" /><div><p className="font-medium text-navy">Address</p><p className="text-slate-600">{contactInfo?.address || "123 Victoria Island, Lagos, Nigeria"}</p></div></div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="font-serif text-xl font-semibold text-navy">Our Offices</h3>
                {contactInfo?.offices?.map((office) => (
                  <div key={office.city} className="rounded-lg border border-border p-4">
                    <h4 className="font-medium text-navy">{office.city}</h4>
                    <p className="text-sm text-slate-600 mt-1">{office.address}</p>
                    <p className="text-sm text-slate-600">{office?.phone || "N/A"}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <DemoBadge />
                <p className="text-xs text-slate-500 mt-1">Contact details are sample data. Replace with actual company info.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              {!isSubmitted ? (
                <>
                  <h2 className="font-serif text-2xl font-bold text-navy mb-6">Send us a message</h2>
                  {submitError && <p className="text-error mb-4">{submitError}</p>}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input label="Full Name" error={errors.fullName?.message} {...register("fullName", { required: "Full name is required" })} />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Input label="Phone" type="tel" error={errors.phone?.message} {...register("phone", { required: "Phone is required" })} />
                      <Input label="Email" type="email" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
                    </div>
                    <Select label="Subject" error={errors.subject?.message} {...register("subject", { required: "Subject is required" })}>
                      <option value="">Select subject</option>
                      <option value="Property Enquiry">Property Enquiry</option>
                      <option value="Payment Plan">Payment Plan</option>
                      <option value="Inspection Booking">Inspection Booking</option>
                      <option value="General Question">General Question</option>
                    </Select>
                    <Textarea label="Message" rows={5} error={errors.message?.message} {...register("message", { required: "Message is required" })} />
                    <Button type="submit" variant="primary" className="w-full" loading={isSubmitting}>Send Message</Button>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center">
                  <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                  <h2 className="font-serif text-2xl font-bold text-navy mb-2">Thank You!</h2>
                  <p className="text-slate-600 mb-4">Your message has been sent. Our team will contact you within 2 hours.</p>
                  <p className="text-sm text-slate-500">A lead record has been created. <DemoBadge inline /></p>
                </div>
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

