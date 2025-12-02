import { useState } from 'react';

export default function ColorPicker({ label, value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-slate-600 shadow-sm hover:scale-105 transition-transform"
          style={{ backgroundColor: value }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          placeholder="#000000"
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-0 h-0 opacity-0 absolute"
        />
      </div>
    </div>
  );
}
