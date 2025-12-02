import { TEMPLATES } from '../constants/templates';
import toast from 'react-hot-toast';

export default function Templates({ onSelectTemplate }) {
  const handleSelect = (template) => {
    onSelectTemplate(template.config);
    toast.success(`${template.name} template applied!`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Quick Start Templates
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.values(TEMPLATES).map((template) => (
          <button
            key={template.name}
            onClick={() => handleSelect(template)}
            className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-all"
          >
            <span className="text-3xl">{template.icon}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {template.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
