/**
 * G-wealth Republic — FAQ Section
 */
"use client";

import { useState } from "react";
import { siteContent } from "@/lib/data/content";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const { faqs } = siteContent;

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600 md:text-lg">Everything you need to know about our properties and process.</p>
        </div>
        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-3 border border-border rounded-lg bg-white">
              <button
                className="flex w-full items-center justify-between p-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-navy">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-5 w-5 text-slate-500" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-2">
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                      <span className="inline-block mt-2 text-xs text-slate-400">Category: {faq.category}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
