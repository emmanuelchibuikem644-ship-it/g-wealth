/**
 * G-wealth Republic — Auth Context
 * Demo authentication system for the admin dashboard.
 * Uses localStorage to persist sessions client-side.
 * Note: This is a demo auth system. In production, use a proper auth provider like Supabase.
 */

"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authenticateAdmin, getAllUsers } from "@/lib/store";
import { SESSION_TIMEOUT_MINUTES, USER_ROLES } from "@/lib/constants";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  // Load session on mount
  useEffect(() => {
    const session = localStorage.getItem("gwealth-admin-session");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        const now = Date.now();
        // Check if session has expired
        if (parsed.expiresAt > now) {
          setUser(parsed.user);
          // Set up auto-expiration
          const timeout = setTimeout(() => {
            localStorage.removeItem("gwealth-admin-session");
            setUser(null);
          }, parsed.expiresAt - now);
          return () => clearTimeout(timeout);
        } else {
          localStorage.removeItem("gwealth-admin-session");
        }
      } catch (e) {
        localStorage.removeItem("gwealth-admin-session");
      }
    }
    setLoading(false);
  }, []);

  // Load all users on mount
  useEffect(() => {
    setAllUsers(getAllUsers());
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await authenticateAdmin(email, password);
    if (result.success) {
      const expiresAt = Date.now() + SESSION_TIMEOUT_MINUTES * 60 * 1000;
      const session = { user: result.user, expiresAt };
      localStorage.setItem("gwealth-admin-session", JSON.stringify(session));
      setUser(result.user);

      // Set up auto-expiration
      const timeout = setTimeout(() => {
        localStorage.removeItem("gwealth-admin-session");
        setUser(null);
      }, SESSION_TIMEOUT_MINUTES * 60 * 1000);

      // Record activity
      localStorage.setItem("gwealth-last-activity", Date.now().toString());

      return { success: true, user: result.user };
    }
    return { success: false, error: result.error };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("gwealth-admin-session");
    localStorage.removeItem("gwealth-last-activity");
    setUser(null);
  }, []);

  const isAuthenticated = !!user;
  const hasRole = (role) => user?.role === role;
  const hasPermission = (permission) => {
    if (!user) return false;
    const rolePermissions = {
      [USER_ROLES.SUPER_ADMIN]: ["manage_settings", "manage_staff", "manage_listings", "manage_leads", "manage_customers", "manage_payments", "manage_content", "view_reports", "manage_appointments", "manage_audit"],
      [USER_ROLES.MANAGER]: ["manage_listings", "manage_leads", "manage_customers", "view_reports", "manage_appointments"],
      [USER_ROLES.SALES_AGENT]: ["view_assigned_leads", "manage_assigned_inspections", "update_lead_stages", "add_notes"],
      [USER_ROLES.CONTENT_EDITOR]: ["manage_content", "edit_pages"],
    };
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    hasRole,
    hasPermission,
    allUsers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useRequireAuth() {
  const { user, loading, isAuthenticated } = useAuth();
  return { user, loading, isAuthenticated };
}
