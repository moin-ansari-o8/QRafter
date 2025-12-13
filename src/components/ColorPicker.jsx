import { HexColorPicker } from "react-colorful";
import { Popover } from "@headlessui/react";
import { Palette } from "lucide-react";

export default function ColorPicker({ label, icon, value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-ink-900 dark:text-newsprint-100 flex items-center gap-2">
        {icon && (
          <span className="text-sepia-600 dark:text-sepia-500">{icon}</span>
        )}
        {label}
      </label>
      <div className="flex items-center gap-3">
        <Popover className="relative">
          <Popover.Button
            className="relative w-12 h-12 rounded-md border-2 border-ink-300 dark:border-ink-600 shadow-paper hover:shadow-paper-lg hover:border-sepia-600 transition-all focus:outline-none focus:ring-2 focus:ring-sepia-500 focus:ring-offset-2 group overflow-hidden"
            style={{ backgroundColor: value }}
          >
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Palette className="w-5 h-5 text-white drop-shadow-lg" />
            </div>
          </Popover.Button>
          <Popover.Panel className="absolute z-10 mt-2">
            <div className="bg-white dark:bg-ink-800 p-4 rounded-lg shadow-paper-xl border-2 border-ink-200 dark:border-ink-600">
              <HexColorPicker color={value} onChange={onChange} />
            </div>
          </Popover.Panel>
        </Popover>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
