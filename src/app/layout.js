import "./globals.css";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "G-wealth Republic — Premium Nigerian Real Estate",
  description: "Discover verified property opportunities across Lagos, Abuja, Port Harcourt, and Asaba. Transparent pricing, flexible payment plans, and guided inspections.",
  keywords: "Nigerian real estate, property for sale, Lagos, Abuja, Port Harcourt, Asaba, land, houses, apartments, real estate Nigeria",
  authors: [{ name: "G-wealth Republic" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://gwealth-republic.com",
    title: "G-wealth Republic — Premium Nigerian Real Estate",
    description: "Discover verified property opportunities across Lagos, Abuja, Port Harcourt, and Asaba.",
    siteName: "G-wealth Republic",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#1E3A8A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-sans scroll-smooth">
      <body className={cn("font-sans bg-white text-slate-900 antialiased")}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}


