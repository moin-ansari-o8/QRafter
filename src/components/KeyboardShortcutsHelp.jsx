import { Keyboard } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { KEYBOARD_SHORTCUTS } from "../constants/templates";

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 bg-ink-900 dark:bg-newsprint-100 text-newsprint-100 dark:text-ink-900 rounded-md border-2 border-ink-900 dark:border-newsprint-100 shadow-editorial hover:shadow-paper-xl transition-all z-50"
        title="Keyboard Shortcuts"
      >
        <Keyboard className="w-5 h-5" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full bg-white dark:bg-ink-800 rounded-lg shadow-paper-xl border-2 border-ink-300 dark:border-ink-600 p-6">
            <Dialog.Title className="text-xl font-bold font-serif text-ink-900 dark:text-newsprint-100 mb-4 flex items-center gap-2 border-b-2 border-ink-200 dark:border-ink-700 pb-3">
              <Keyboard className="w-6 h-6 text-sepia-600" />
              Keyboard Shortcuts
            </Dialog.Title>

            <div className="space-y-2">
              {KEYBOARD_SHORTCUTS.map((shortcut) => (
                <div
                  key={shortcut.action}
                  className="flex items-center justify-between p-3 bg-newsprint-50 dark:bg-ink-900 rounded-md border border-ink-200 dark:border-ink-700"
                >
                  <span className="text-sm text-ink-700 dark:text-ink-300 font-medium">
                    {shortcut.label}
                  </span>
                  <kbd className="px-2.5 py-1 text-xs font-bold font-mono text-ink-900 dark:text-newsprint-100 bg-white dark:bg-ink-700 border-2 border-ink-300 dark:border-ink-600 rounded shadow-inset">
                    {isMac ? shortcut.mac || shortcut.key : shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full btn-primary"
            >
              Got it!
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
