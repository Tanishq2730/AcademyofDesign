"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Start with the value the no-FOUC inline script already set on <html>.
  const [theme, setTheme] = useState("dark");

  // Sync state with whatever the inline script applied before paint.
  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") ||
      localStorage.getItem("theme") ||
      "dark";
    setTheme(current);
  }, []);

  const applyTheme = useCallback((next) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
