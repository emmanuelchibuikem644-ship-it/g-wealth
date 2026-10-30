/**
 * G-wealth Republic — Footer Component
 */
import Link from "next/link";
import { siteContent } from "@/lib/data/content";
import { DemoBadge } from "@/components/ui/badge";
import { BRAND } from "@/lib/constants";

export function Footer() {
  const contactInfo = siteContent?.contactInfo || {};
  const stats = siteContent?.stats || [];

  const footer = siteContent?.footer || {};

  const quickLinks = footer.quickLinks || [];
  const popularLocations = footer.popularLocations || [];
  const legalLinks = footer.legalLinks || [];
  const social = contactInfo.social || {};

  return (
    <footer className="border-t border-border bg-white">
      <div className="container mx-auto px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand & Stats */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-blue">
                {BRAND.name}
              </span>
              <DemoBadge />
            </div>

            <p className="text-sm text-slate-600 mb-6">
              {footer.description || ""}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-blue">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-blue mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-blue mb-4">
              Popular Locations
            </h3>


            <ul className="space-y-2">
              {popularLocations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-blue mb-4">
             Contact
           </h3>


            <div className="space-y-3 text-sm">
              <p className="text-slate-600">
                {contactInfo.email || ""}
              </p>

              <p className="text-slate-600">
                {contactInfo.phone || ""}
              </p>

              <p className="text-slate-600">
                {contactInfo.address || ""}
              </p>

              <div className="flex gap-4 pt-2">
                {Object.entries(social).map(([platform, url]) => (
                  url ? (
                    <Link
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-blue transition-colors"
                    >
                      <span className="sr-only">{platform}</span>

                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.38 0 0 5.38 0 12.01c0 5.33 3.82 9.84 8.84 10.64.64.12.88-.28.88-.62 0-.31-.01-1.27-.02-2.2-3.61.76-4.4-1.61-4.4-1.61-.6-1.52-1.45-1.93-1.45-1.93-1.17-.8.09-.78.09-.78 1.29.09 1.97 1.32 1.97 1.32 1.15 1.93 3.01 1.37 3.74 1.05.12-.83.43-1.37.78-1.69-2.71-.31-5.57-1.35-5.57-6.04 0-1.31.46-2.39 1.23-3.23-.12-.31-.54-1.55.12-3.24 0 0 1.01-.32 3.33 1.23a11.52 11.52 0 013.02-.41 11.52 11.52 0 013.02.41c2.31-1.55 3.32-1.23 3.32-1.23.66 1.69.24 2.93.12 3.24.77.84 1.23 1.92 1.23 3.23 0 4.7-3.86 5.73-6.57 6.08.44.38.82 1.15.82 2.31 0 1.67-.02 3.03-.02 3.44 0 .34.24.74.9.62A11.01 11.01 0 0024 12.01C24 5.38 18.63 0 12 0z" />
                      </svg>
                    </Link>
                  ) : null
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} G-wealth Republic. All rights reserved.
          </p>

          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-slate-500 hover:text-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
