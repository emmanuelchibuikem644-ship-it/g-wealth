"use client";

/**
 * G-wealth Republic — Admin Layout
 * Wraps all admin routes with auth protection, sidebar, and header.
 */
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAuth } from "@/components/auth/AuthContext";
import { cn } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/badge";
import { ThemeProvider, useTheme } from "@/components/theme/ThemeContext";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, isAuthenticated } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isLoginPage = pathname === "/admin/login" || pathname.startsWith("/admin/login/");

  // Redirect to login if not authenticated (except on login page)
  useEffect(() => {
    if (loading) return;
    if (!isLoginPage && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [loading, isAuthenticated, isLoginPage, router]);

  // If on login page, render without layout wrapper
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <div className="text-center text-white">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent mx-auto" />
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-ivory" theme={theme} onToggleTheme={toggleTheme}>
        {/* Sidebar */}
        <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Content Area */}
      <div className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        {/* Header */}
        <AdminHeader sidebarCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} theme={theme} onToggleTheme={toggleTheme} />

        {/* Content */}
        <main className="p-6 lg:p-8">
          <div className="mb-4">
            <DemoBadge />
            <span className="ml-2 text-xs text-slate-500">Admin Demo Mode</span>
          </div>
          {children}
        </main>
      </div>
      </div>
    </ThemeProvider>
  );
}
