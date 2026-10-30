/**
 * G-wealth Republic — Admin Header
 */
"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { Menu, Bell, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function AdminHeader({ sidebarCollapsed, onToggleSidebar }) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur-md dark:bg-slate-900/90">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Sidebar Toggle + Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-slate-600 hover:bg-ivory md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={onToggleSidebar}
            className="hidden md:block rounded-lg p-2 text-slate-600 hover:bg-ivory dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {sidebarCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 3 24 18" fill="none" stroke="currentColor">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </button>
          <nav className="text-sm text-slate-500 dark:text-slate-400">
            <span className="font-medium text-blue dark:text-blue-light">Dashboard</span>
          </nav>
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="rounded-lg p-2 text-slate-600 hover:bg-ivory dark:text-slate-300 dark:hover:bg-slate-800 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-light text-xs text-blue font-bold">3</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-lg p-2 text-slate-600 hover:bg-ivory dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <img src={user?.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=User"} alt={user?.fullName} className="h-8 w-8 rounded-full" />
              <span className="hidden sm:block text-sm font-medium">{user?.fullName}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-border py-2 dark:bg-slate-800 dark:border-slate-700">
                <a href="#profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-ivory dark:text-slate-200 dark:hover:bg-slate-700">Profile</a>
                <a href="#settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-ivory dark:text-slate-200 dark:hover:bg-slate-700">Settings</a>
                <hr className="border-border my-1 dark:border-slate-700" />
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-ivory dark:text-slate-200 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
