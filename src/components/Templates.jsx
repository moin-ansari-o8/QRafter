import { TEMPLATES } from "../constants/templates";
import toast from "react-hot-toast";
import { Layers } from "lucide-react";
import useQRStore from "../store/qrStore";

export default function Templates({ onSelectTemplate }) {
  const { activeTemplate, setActiveTemplate } = useQRStore();

  const handleSelect = (template) => {
    onSelectTemplate(template.config);
    setActiveTemplate(template.name);
    toast.success(`${template.name} template applied!`);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h3 className="text-lg sm:text-xl font-bold font-serif text-ink-900 dark:text-newsprint-100 mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-sepia-600 dark:text-sepia-500" />
          Quick Start Templates
        </h3>
        <p className="text-xs text-ink-600 dark:text-newsprint-300 tracking-wide uppercase font-medium">
          Choose a pre-designed template
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4">
        {Object.values(TEMPLATES).map((template) => (
          <button
            key={template.name}
            onClick={() => handleSelect(template)}
            className={`group flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-md border-2 transition-all duration-200 touch-manipulation ${
              activeTemplate === template.name
                ? "border-ink-900 bg-ink-900 dark:border-newsprint-100 dark:bg-newsprint-100 shadow-lg"
                : "glass border-ink-200 dark:border-ink-700 hover:border-sepia-600 dark:hover:border-sepia-500 hover:shadow-paper-lg active:shadow-inset"
            }`}
          >
            <span
              className={`text-3xl sm:text-4xl transition-transform duration-200 group-hover:scale-110 ${
                activeTemplate === template.name ? "scale-110" : ""
              }`}
            >
              {template.icon}
            </span>
            <span
              className={`text-xs sm:text-sm font-semibold text-center ${
                activeTemplate === template.name
                  ? "text-newsprint-100 dark:text-ink-900"
                  : "text-ink-900 dark:text-newsprint-100"
              }`}
            >
              {template.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
