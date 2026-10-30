/**
 * G-wealth Republic — WhatsApp Floating Button
 */
"use client";

import { siteContent } from "@/lib/data/content";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton({
  contextMessage = "Hello, I'm interested in your properties."
}) {
  const whatsappNumber = siteContent?.contactInfo?.whatsapp || "";
  const phone = whatsappNumber.replace(/\D/g, "");

  // Don't render the button if no WhatsApp number is configured.
  if (!phone) {
    return null;
  }

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(contextMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}