import { useState, useEffect } from "react";

export default function StyleSelector({
  label,
  icon,
  value,
  onChange,
  options,
}) {
  const [isDark, setIsDark] = useState(false);

  // Track theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-newsprint-100">
        {icon && (
          <span className="text-sepia-600 dark:text-sepia-500">{icon}</span>
        )}
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {options.map((option) => {
          const isActive = value === option.value;

          // Active button styles
          if (isActive) {
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className="touch-manipulation"
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "6px",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  minHeight: "44px",
                  backgroundColor: isDark ? "#f5f5f0" : "#1a1a1a",
                  color: isDark ? "#1a1a1a" : "#f5f5f0",
                  border: isDark ? "2px solid #f5f5f0" : "2px solid #1a1a1a",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  transform: "scale(1.02)",
                }}
              >
                {option.label}
              </button>
            );
          }

          // Inactive button styles
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className="touch-manipulation"
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "0.875rem",
                cursor: "pointer",
                minHeight: "44px",
                backgroundColor: isDark ? "#2d2d2d" : "#ffffff",
                color: isDark ? "#e5e5e5" : "#1a1a1a",
                border: isDark ? "2px solid #737373" : "2px solid #a3a3a3",
                transition: "all 0.2s",
                boxShadow: isDark
                  ? "0 1px 3px rgba(0, 0, 0, 0.3)"
                  : "0 1px 3px rgba(0, 0, 0, 0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#8b7355";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 4px 8px rgba(0, 0, 0, 0.4)"
                  : "0 4px 8px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark
                  ? "#737373"
                  : "#a3a3a3";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 1px 3px rgba(0, 0, 0, 0.3)"
                  : "0 1px 3px rgba(0, 0, 0, 0.08)";
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
