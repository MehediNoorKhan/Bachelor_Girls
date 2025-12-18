import { useEffect } from "react";
import {
  getSystemTheme,
  isSystemDarkMode,
  useSystemTheme,
} from "./useSystemTheme";

/**
 * Demo component showing different ways to detect system theme
 */
export function SystemThemeDemo() {
  // Method 1: Using the custom hook (reactive - updates automatically)
  const { systemTheme, isSystemDark, isSystemLight } = useSystemTheme();

  useEffect(() => {
    console.log("=== System Theme Detection Demo ===");

    // Method 2: Direct function calls (one-time check)
    const currentSystemTheme = getSystemTheme();
    const isDarkSystem = isSystemDarkMode();

    console.log("Hook - systemTheme:", systemTheme);
    console.log("Hook - isSystemDark:", isSystemDark);
    console.log("Hook - isSystemLight:", isSystemLight);
    console.log("Function - getSystemTheme():", currentSystemTheme);
    console.log("Function - isSystemDarkMode():", isDarkSystem);

    // Method 3: Direct media query (manual)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    console.log("Direct - mediaQuery.matches:", mediaQuery.matches);
  }, [systemTheme, isSystemDark, isSystemLight]);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold mb-2">System Theme Detection</h3>
      <div className="space-y-1 text-sm">
        <p>
          System Theme: <span className="font-mono">{systemTheme}</span>
        </p>
        <p>
          Is Dark: <span className="font-mono">{isSystemDark.toString()}</span>
        </p>
        <p>
          Is Light:{" "}
          <span className="font-mono">{isSystemLight.toString()}</span>
        </p>
      </div>

      <button
        onClick={() => {
          console.log("Current system theme:", getSystemTheme());
          console.log("Is system dark:", isSystemDarkMode());
        }}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Check System Theme
      </button>

      <p className="text-xs text-gray-600 mt-2">
        💡 Try changing your system theme in OS settings to see live updates!
      </p>
    </div>
  );
}

export default SystemThemeDemo;
