import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
import * as React from "react";
import useTheme from ".";

export default function Toggler() {
  const { theme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid hydration mismatch
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-primary relative h-6 w-12 rounded-full transition-colors duration-300 ease-in-out dark:bg-gray-700"
    >
      <div
        className={`dark:bg-primary absolute top-0.5 left-0.5 flex h-5 w-5 transform items-center justify-center rounded-full bg-white transition-all duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <Moon size={12} className="text-white" />
        ) : (
          <Sun size={12} className="text-primary" />
        )}
      </div>
    </button>
  );
}
