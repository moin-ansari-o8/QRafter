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
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
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
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isActive = value === option.value;
          
          // Active button styles
          if (isActive) {
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  backgroundColor: isDark ? "#ffffff" : "#000000",
                  color: isDark ? "#000000" : "#ffffff",
                  border: isDark ? "2px solid #ffffff" : "2px solid #000000",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
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
              style={{
                padding: "12px 16px",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                backgroundColor: isDark ? "#2d2d2d" : "#fafaf9",
                color: isDark ? "#ffffff" : "#1a1a1a",
                border: isDark ? "2px solid #525252" : "2px solid #d4d4d4",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#8b7355";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? "#525252" : "#d4d4d4";
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
