import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 sm:p-2.5 rounded-md glass border-2 border-ink-200 dark:border-ink-600 hover:border-sepia-600 dark:hover:border-sepia-500 shadow-paper hover:shadow-paper-lg transition-all duration-150 group touch-manipulation"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-ink-900 group-hover:scale-110 transition-transform duration-200" />
      )}
    </button>
  );
}
