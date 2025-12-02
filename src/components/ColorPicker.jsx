import { HexColorPicker } from 'react-colorful';
import { Popover } from '@headlessui/react';

export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <Popover className="relative">
          <Popover.Button
            className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-slate-600 shadow-sm hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary-500"
            style={{ backgroundColor: value }}
          />
          <Popover.Panel className="absolute z-10 mt-2">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700">
              <HexColorPicker color={value} onChange={onChange} />
            </div>
          </Popover.Panel>
        </Popover>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

