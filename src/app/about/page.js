/**
 * G-wealth Republic — About Page
 */
import Link from "next/link";
import { siteContent } from "@/lib/data/content";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { DemoBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoNotice } from "@/components/DemoNotice";

export default function AboutPage() {
  const contactInfo = siteContent?.contactInfo || {};

  return (
    <>
      <Navigation />
      <DemoNotice className="mb-4 mx-4 mt-4" />
      <main className="pt-16 pb-16">
        <section className="py-20 text-center text-white relative bg-cover" style={{ backgroundImage: "url('https://images.picsum.photos/seed/about-hero/1600/500')" }}>
          <div className="absolute inset-0 bg-navy/70" />
          <div className="relative container mx-auto px-6 lg:px-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="max-w-3xl mx-auto text-lg text-slate-200">G-wealth Republic was founded with a vision to transform the Nigerian real estate landscape through transparency, integrity, and exceptional service.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-serif text-3xl font-bold text-navy mb-6">Building Dreams, One Plot At A Time</h2>
                <p className="text-slate-600 mb-4">Founded in 2020, G-wealth Republic has grown from a small team serving Lagos to a multi-city platform covering Lagos, Abuja, Port Harcourt, and Asaba. We have helped over 500 families find their perfect property.</p>
                <p className="text-slate-600 mb-4">Our approach combines deep local knowledge with modern technology. Every property in our portfolio undergoes a thorough verification process, and we maintain transparent pricing with clear payment terms.</p>
                <p className="text-slate-600">
                  <DemoBadge inline /> This is sample company narrative for demonstration purposes.
                </p>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden">
                <img src="https://images.picsum.photos/seed/about-story/800/600" alt="Company story" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-ivory py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-xl bg-white p-8 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-navy mb-3">Our Mission</h3>
                <p className="text-slate-600">To provide transparent, verified property opportunities that make property ownership accessible and stress-free for every Nigerian.</p>
              </div>
              <div className="rounded-xl bg-white p-8 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-navy mb-3">Our Vision</h3>
                <p className="text-slate-600">To be Nigeria's most trusted and innovative property platform, setting new standards for transparency and customer satisfaction in real estate.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-navy text-center mb-12">Core Values</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm text-center">
                <div className="mb-3 text-3xl">🛡️</div>
                <h3 className="font-bold text-navy mb-2">Integrity</h3>
                <p className="text-sm text-slate-600">We operate with honesty and transparency in every interaction.</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm text-center">
                <div className="mb-3 text-3xl">🎯</div>
                <h3 className="font-bold text-navy mb-2">Excellence</h3>
                <p className="text-sm text-slate-600">We strive for excellence in every property we present.</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm text-center">
                <div className="mb-3 text-3xl">🤝</div>
                <h3 className="font-bold text-navy mb-2">Trust</h3>
                <p className="text-sm text-slate-600">Building lasting relationships through consistent delivery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-navy py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-white text-center mb-4">Our Leadership Team</h2>
            <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">Meet the founders and leaders driving G-wealth Republic's mission.</p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {siteContent?.teamMembers?.map((member) => (
                <div key={member.id} className="text-center">
                  <img src={member.avatar || "/placeholder-avatar.png"} alt={member.name || "Team member"} className="h-24 w-24 rounded-full mx-auto mb-3 object-cover" />
                  <h3 className="font-bold text-white">{member.name}</h3>
                  <p className="text-gold text-sm mb-2">{member.title}</p>
                  <p className="text-xs text-slate-300">{(member.bio || "").slice(0, 80)}...</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Details */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-navy mb-4">Company Registration</h2>
              <p className="text-sm text-slate-600 mb-4">
                <DemoBadge inline /> All registration details below are sample data for demonstration only.
              </p>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><dt className="text-slate-500">Company Name</dt><dd className="text-navy font-medium">G-wealth Republic Ltd</dd></div>
                <div><dt className="text-slate-500">CAC Registration</dt><dd className="text-navy font-medium">[Placeholder — not a real number]</dd></div>
                <div><dt className="text-slate-500">Email</dt><dd className="text-navy font-medium">{contactInfo.email || "Email not configured"}</dd></div>
                <div><dt className="text-slate-500">Phone</dt><dd className="text-navy font-medium">{contactInfo.phone || "Phone not configured"}</dd></div>
                <div className="md:col-span-2"><dt className="text-slate-500">Registered Address</dt><dd className="text-navy font-medium">{contactInfo.address || "Address not configured"}</dd></div>
              </dl>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-ivory py-16 text-center">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-navy mb-4">Ready to find your property?</h2>
            <Link href="/contact">
              <Button variant="gold" size="lg">Speak to Our Team</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}