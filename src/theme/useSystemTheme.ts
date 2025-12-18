import { useEffect, useState } from "react";

/**
 * Custom hook to detect and monitor system theme preference
 * @returns {Object} Object containing system theme info
 */
export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const [isSystemDark, setIsSystemDark] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return;

    // Create media query to check for dark mode preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Function to update system theme
    const updateSystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDark = e.matches;
      setSystemTheme(isDark ? "dark" : "light");
      setIsSystemDark(isDark);
    };

    // Set initial value
    updateSystemTheme(mediaQuery);

    // Listen for changes in system theme
    mediaQuery.addEventListener("change", updateSystemTheme);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", updateSystemTheme);
  }, []);

  return {
    systemTheme, // 'light' | 'dark'
    isSystemDark, // boolean
    isSystemLight: !isSystemDark,
  };
}

/**
 * Utility function to get system theme synchronously
 * @returns {'light' | 'dark'} Current system theme
 */
export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
}

/**
 * Utility function to check if system is in dark mode
 * @returns {boolean} True if system is in dark mode
 */
export function isSystemDarkMode(): boolean {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
