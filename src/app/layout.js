import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className={cn(inter.className, "font-sans bg-white text-slate-900 antialiased")}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}


