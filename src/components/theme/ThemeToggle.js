
"use client";

import { useTheme } from "@/components/theme/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={className}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      ) : (
        <Sun className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      )}
    </button>
  );
}
