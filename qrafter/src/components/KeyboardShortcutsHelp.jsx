import { Keyboard } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { KEYBOARD_SHORTCUTS } from '../constants/templates';

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all z-50"
        title="Keyboard Shortcuts"
      >
        <Keyboard className="w-5 h-5" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ⌨️ Keyboard Shortcuts
            </Dialog.Title>

            <div className="space-y-2">
              {KEYBOARD_SHORTCUTS.map((shortcut) => (
                <div
                  key={shortcut.action}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {shortcut.label}
                  </span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded">
                    {isMac ? shortcut.mac || shortcut.key : shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Got it!
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
