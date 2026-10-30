
/**
 * G-wealth Republic — Top Navigation Bar
 * Premium transparent-to-solid scroll-aware navigation.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/data/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [favCount, setFavCount] = useState(0);

  const pathname = usePathname();

  // Detect page scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Use solid navigation on pages other than the homepage
  const solidNavbar = scrolled || pathname !== "/";

  // Load favourites count
  useEffect(() => {
    const updateFavourites = () => {
      const saved = localStorage.getItem("gwealth-demo-data");

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFavCount(parsed.favourites?.length || 0);
        } catch (error) {
          console.error("Unable to read favourites:", error);
        }
      } else {
        setFavCount(0);
      }
    };

    updateFavourites();

    window.addEventListener("storage", updateFavourites);

    return () => {
      window.removeEventListener("storage", updateFavourites);
    };
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <>
      {/* MAIN NAVIGATION */}
      <header
  className={cn(
    "fixed top-0 left-0 right-0 z-40 w-full border-b transition-all duration-300 ease-in-out",
    solidNavbar
      ? "border-slate-200"
      : "border-transparent"
  )}
  style={{
    backgroundColor: solidNavbar ? "" : "transparent",
    backdropFilter: solidNavbar ? "blur(16px)" : "none",
    WebkitBackdropFilter: solidNavbar ? "blur(16px)" : "none",
    boxShadow: solidNavbar
      ? "0 4px 20px rgba(15, 23, 42, 0.08)"
      : "none",
  }}
>
        <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-8">

          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMobile}
            className={cn(
              "shrink-0 text-2xl font-serif font-bold tracking-tight transition-colors duration-300",
              solidNavbar ? "text-blue" : "text-white"
            )}
          >
            G-wealth
            <span
              className={cn(
                "ml-1 transition-colors duration-300",
                solidNavbar ? "text-blue-light" : "text-gold"
              )}
            >
              Republic
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap text-sm font-medium transition-colors duration-300",
                  solidNavbar
                    ? "text-slate-700 hover:text-blue"
                    : "text-white hover:text-gold"
                )}
              >
                {item.label}

                {pathname === item.href && (
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 right-0 h-0.5 rounded-full",
                      solidNavbar ? "bg-blue" : "bg-gold"
                    )}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* DESKTOP ACTION BUTTONS */}
          <div className="hidden items-center gap-3 md:flex">

            {/* FAVOURITES */}
            <Link href="/favourites">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "relative transition-colors duration-300",
                  solidNavbar
                    ? "text-slate-700 hover:bg-slate-100 hover:text-blue"
                    : "!bg-transparent !text-white hover:!bg-white/10"
                )}
              >
                <Heart className="h-4 w-4" />
                <span>Favourites</span>

                {favCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-light px-1 text-xs font-bold text-white">
                    {favCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* BOOK INSPECTION */}
            <Link href="/book-inspection">
              <Button
                variant="blue"
                size="sm"
                className="!rounded-lg !bg-blue !px-4 !font-semibold !text-white shadow-md transition-all duration-300 hover:!-translate-y-0.5 hover:!bg-blue-light hover:shadow-lg"
              >
                Book Inspection
              </Button>
            </Link>

            {/* EXPLORE PROPERTIES */}
            <Link href="/properties">
              <Button
                variant="primary"
                size="sm"
                className="!rounded-lg !bg-gold !px-4 !font-semibold !text-slate-950 shadow-md transition-all duration-300 hover:!-translate-y-0.5 hover:!bg-amber-400 hover:shadow-lg"
              >
                Explore Properties
              </Button>
            </Link>

            {/* THEME TOGGLE */}
            <div
              className={cn(
                "flex items-center justify-center rounded-full p-2 transition-colors",
                solidNavbar
                  ? "hover:bg-slate-100"
                  : "hover:bg-white/10"
              )}
            >
              <ThemeToggle />
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className={cn(
              "rounded-lg p-2 transition-colors md:hidden",
              solidNavbar
                ? "text-slate-800 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            )}
            onClick={toggleMobile}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] transform border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-900",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* MOBILE MENU HEADER */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-700">
          <Link
            href="/"
            onClick={closeMobile}
            className="font-serif text-xl font-bold text-blue"
          >
            G-wealth <span className="text-blue-light">Republic</span>
          </Link>

          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* MOBILE LINKS */}
        <div className="overflow-y-auto py-4">
          <nav className="flex flex-col gap-1 px-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={cn(
                  "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue/10 text-blue"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* MOBILE ACTIONS */}
          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 px-4 pt-5 dark:border-slate-700">

            <Link href="/favourites" onClick={closeMobile}>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Heart className="mr-2 h-4 w-4" />
                Favourites ({favCount})
              </Button>
            </Link>

            <Link href="/book-inspection" onClick={closeMobile}>
              <Button
                variant="blue"
                className="w-full !bg-blue !text-white"
              >
                Book an Inspection
              </Button>
            </Link>

            <Link href="/properties" onClick={closeMobile}>
              <Button
                variant="primary"
                className="w-full !bg-gold !text-slate-950"
              >
                Explore Properties
              </Button>
            </Link>

            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Appearance
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close mobile menu"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeMobile}
        />
      )}
    </>
  );
}

