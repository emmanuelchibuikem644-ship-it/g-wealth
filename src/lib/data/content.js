/**
 * G-wealth Republic — Seed Content Data
 * Public website content managed by Content Editors.
 */

export const siteContent = {
  hero: {
    headline: "Own Land With Confidence.",
    supportingText: "Discover verified property opportunities, transparent pricing and a smarter path to owning land and homes across Nigeria.",
    primaryCta: "Explore Properties",
    secondaryCta: "Book an Inspection",
    trustIndicators: [
      { text: "Transparent Pricing", icon: "tag" },
      { text: "Inspection Support", icon: "map-pin" },
      { text: "Documented Properties", icon: "file-text" },
    ],
  },

  trust: {
    headline: "Your Property Journey, Simplified",
    subheading: "We streamline every step from viewing to ownership with verified processes and dedicated support.",
    items: [
      {
        title: "Verified Documentation",
        description: "Every property comes with documented title information and due diligence records. We provide complete transparency on legal status.",
        icon: "shield-check",
      },
      {
        title: "Transparent Pricing",
        description: "No hidden fees. Clear payment terms and flexible instalment plans. What you see is what you pay.",
        icon: "tag",
      },
      {
        title: "Guided Inspections",
        description: "Our certified property consultants guide you through every step, from site visits to payment documentation.",
        icon: "clipboard-check",
      },
      {
        title: "Dedicated Support",
        description: "Personal property advisor, 24/7 WhatsApp support, and a seamless transaction process from start to finish.",
        icon: "headphones",
      },
      {
        title: "Clear Documentation",
        description: "Standardised contract templates and transparent paperwork. We guide you through every legal document.",
        icon: "file-text",
      },
    ],
  },

  whyChoose: {
    headline: "Why Choose G-wealth Republic?",
    subheading: "Premium properties, transparent process, dedicated service.",
    features: [
      { title: "Verified Documentation", description: "Every property is verified with proper title documentation and due diligence.", icon: "shield" },
      { title: "Transparent Pricing", description: "Clear, upfront pricing with no hidden fees or surprise charges.", icon: "tag" },
      { title: "Flexible Payment", description: "Multiple payment options and instalment plans tailored to your budget.", icon: "credit-card" },
      { title: "Expert Guidance", description: "Dedicated property advisors guide you through the entire process.", icon: "user-check" },
    ],
  },

  howItWorks: {
    headline: "How It Works",
    subheading: "Your path to property ownership in four simple steps.",
    steps: [
      { step: 1, title: "Browse Properties", description: "Explore our curated collection of verified properties across Lagos, Abuja, Port Harcourt and Asaba.", icon: "search" },
      { step: 2, title: "Schedule Inspection", description: "Book a guided property inspection at your preferred date and time with our certified consultants.", icon: "calendar" },
      { step: 3, title: "Confirm & Pay", description: "Confirm your preferred property and make your initial deposit through our secure payment process.", icon: "credit-card" },
      { step: 4, title: "Complete & Move In", description: "Complete the documentation and handover process. Your property journey is complete.", icon: "home" },
    ],
  },

  locations: [
    { city: "Lagos", subtitle: "Nigeria's Commercial Hub", description: "Premium residential and commercial properties across Lagos's most sought-after neighborhoods.", propertyCount: 7, image: "https://images.picsum.photos/seed/lagos-hero/800/600" },
    { city: "Abuja", subtitle: "Federal Capital Territory", description: "Strategically located residential plots and luxury homes in Abuja's planned neighborhoods.", propertyCount: 3, image: "https://images.picsum.photos/seed/abuja-hero/800/600" },
    { city: "Port Harcourt", subtitle: "Oil & Gas Capital", description: "Residential plots and commercial land in Port Harcourt's established neighborhoods.", propertyCount: 1, image: "https://images.picsum.photos/seed/ph-hero/800/600" },
    { city: "Asaba", subtitle: "Delta State Capital", description: "Affordable residential plots and executive homes in Asaba's growing residential areas.", propertyCount: 2, image: "https://images.picsum.photos/seed/asaba-hero/800/600" },
  ],

  testimonials: [
    { id: "t1", name: "Adewale Johnson", title: "Property Owner — Ibeju-Lekki Plot", content: "G-wealth Republic made purchasing my first plot incredibly smooth. Documentation was transparent and inspection was thorough.", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AJ", rating: 5, demoLabel: true },
    { id: "t2", name: "Sarah Okafor", title: "Home Buyer — Lekki Apartment", content: "The team found me the perfect apartment. Their mortgage calculator helped me plan payments accurately.", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SA", rating: 5, demoLabel: true },
    { id: "t3", name: "Michael Eze", title: "Investor — Abuja Plot", content: "I've purchased three properties through G-wealth Republic. Transparent pricing and flexible payment plans.", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ME", rating: 4, demoLabel: true },
  ],

  faqs: [
    { question: "How do property inspections work?", answer: "Book an inspection through our website or contact our team. A certified consultant will meet you at the property at your preferred time, guide you through, and explain payment options.", category: "Inspections" },
    { question: "What title documents are available?", answer: "We work with Certificate of Occupancy (C of O), Governor's Consent, Deed of Assignment, and Survey plans. Each property's title is listed on its detail page.", category: "Documentation" },
    { question: "Can I pay in instalments?", answer: "Yes, we offer flexible payment plans. Details are shown on each property page. Minimum deposit is typically 20%.", category: "Payments" },
    { question: "How do I reserve a property?", answer: "Book a site inspection first. After inspection, pay the initial deposit (typically 20%) to reserve. The deposit is non-refundable.", category: "Reservations" },
    { question: "What documents are needed for purchase?", answer: "Valid government-issued ID, proof of address, Tax ID, bank details, and any additional docs for the specific title type.", category: "Documentation" },
    { question: "How can I contact your team?", answer: "Via WhatsApp, email, or booking a call through our website. We respond within 2 hours during business hours.", category: "Contact" },
    { question: "What happens after I submit an appointment request?", answer: "Our team receives a notification and reviews your date/time. We confirm via email and SMS.", category: "Appointments" },
    { question: "Can prices and availability change?", answer: "Prices and availability are subject to change until a formal reservation agreement is signed.", category: "General" },
  ],
  contactInfo: {
    email: "info@gwealth.com",
    phone: "+234-816-XXX-XXXX",
    address: "123 Victoria Island, Lagos, Nigeria",
    offices: [
      { city: "Lagos", address: "123 Victoria Island, Lagos", phone: "+234-816-XXX-XXXX" },
      { city: "Abuja", address: "456 Central Business District, Abuja", phone: "+234-816-XXX-XXXX" },
    ],
  },
};
export default siteContent;
