
/**
 * G-wealth Republic — Theme Context
 * Manages dark/light mode theme across the application.
 */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Load saved theme when the application starts
  useEffect(() => {
    const saved = localStorage.getItem("gwealth-theme");

    const initialTheme =
      saved === "dark" || saved === "light" ? saved : "light";

    setTheme(initialTheme);
    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark"
    );

    setMounted(true);
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";

      localStorage.setItem("gwealth-theme", next);

      document.documentElement.classList.toggle(
        "dark",
        next === "dark"
      );

      return next;
    });
  }, []);

  // Allow other components to change the theme
  const changeTheme = useCallback((newTheme) => {
    if (newTheme !== "light" && newTheme !== "dark") return;

    setTheme(newTheme);
    localStorage.setItem("gwealth-theme", newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme: changeTheme,
        mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for accessing theme
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
