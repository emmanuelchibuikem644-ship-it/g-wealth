/**
 * G-wealth Republic — App Providers
 * Wraps the application with context providers.
 */
"use client";

import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/components/auth/AuthContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
}
