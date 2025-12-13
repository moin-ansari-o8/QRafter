export default function StyleSelector({
  label,
  icon,
  value,
  onChange,
  options,
}) {
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
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              style={{
                padding: "12px 16px",
                borderRadius: "6px",
                border: "2px solid",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
                ...(isActive
                  ? {
                      borderColor: "#000000",
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }
                  : {
                      borderColor: "#000000",
                      backgroundColor: "#ffffff",
                      color: "#000000",
                    }),
              }}
              className={
                isActive
                  ? ""
                  : "dark:!border-white dark:!bg-transparent dark:!text-white"
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
