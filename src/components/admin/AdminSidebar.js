/**
 * G-wealth Republic — Admin Sidebar Navigation
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Home, Users, Calendar, FileText, BarChart3,
  Settings, Bell, Clipboard, Shield, Building, LogOut, ChevronLeft
} from "lucide-react";

export const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, permission: "view_reports" },
  { label: "Properties", href: "/admin/properties", icon: Home, permission: "manage_listings" },
  { label: "Leads & CRM", href: "/admin/leads", icon: Users, permission: "manage_leads" },
  { label: "Inspections", href: "/admin/inspections", icon: Calendar, permission: "manage_appointments" },
  { label: "Customers", href: "/admin/customers", icon: Building, permission: "manage_customers" },
  { label: "Content", href: "/admin/content", icon: FileText, permission: "manage_content" },
  { label: "Team", href: "/admin/team", icon: Users, permission: "manage_staff" },
  { label: "Notifications", href: "/admin/notifications", icon: Bell, permission: "manage_audit" },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: Clipboard, permission: "manage_audit" },
  { label: "Settings", href: "/admin/settings", icon: Settings, permission: "manage_settings" },
];

export function AdminSidebar({ collapsed, onToggle }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen overflow-y-auto border-r border-border bg-white transition-all duration-300 dark:bg-slate-900",
      collapsed ? "w-16" : "w-64 md:w-80"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <span className="font-serif text-xl font-bold text-blue dark:text-blue-light">G-wealth Admin</span>
        )}
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-ivory hover:text-blue dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-light"
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="py-4">
        {adminNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const visible = !item.permission || !user || hasPermissionCheck(user.role, item.permission);
          if (!visible) return null;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 mx-2 my-1 text-sm font-medium transition-all",
                isActive
                  ? "bg-blue/10 text-blue dark:bg-blue/20 dark:text-blue-light"
                  : "text-slate-600 hover:bg-ivory hover:text-blue dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-light"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4 dark:border-slate-700">
        <button
          onClick={logout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-ivory hover:text-blue dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-light",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

function hasPermissionCheck(role, permission) {
  const permissions = {
    "super-admin": ["view_reports", "manage_listings", "manage_leads", "manage_customers", "manage_appointments", "manage_content", "manage_staff", "manage_settings", "manage_audit"],
    "manager": ["view_reports", "manage_listings", "manage_leads", "manage_customers", "manage_appointments"],
    "sales-agent": ["view_assigned_leads", "manage_assigned_inspections"],
    "content-editor": ["manage_content", "edit_pages"],
  };
  return permissions[role]?.includes(permission) || false;
}
