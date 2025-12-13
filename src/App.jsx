import { Undo2, Redo2 } from "lucide-react";
import Header from "./components/Header";
import CustomizationPanel from "./components/CustomizationPanel";
import QRPreview from "./components/QRPreview";
import Templates from "./components/Templates";
import PresetsManager from "./components/PresetsManager";
import KeyboardShortcutsHelp from "./components/KeyboardShortcutsHelp";
import ToastProvider from "./components/ToastProvider";
import useQRStore from "./store/qrStore";
import { useKeyboardShortcuts } from "./utils/keyboard";
import toast from "react-hot-toast";
import { useState } from "react";

function App() {
  const { config, setConfig, undo, redo, canUndo, canRedo } = useQRStore();
  const [showTemplates, setShowTemplates] = useState(true);

  const handleDownload = () => {
    // Triggered by keyboard shortcut
    toast.info("Use the download buttons in the preview panel");
  };

  const handleSave = () => {
    toast.info("Click the Save button in the Presets section");
  };

  const handleUndo = () => {
    if (canUndo()) {
      undo();
      toast.success("Undone");
    }
  };

  const handleRedo = () => {
    if (canRedo()) {
      redo();
      toast.success("Redone");
    }
  };

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    download: handleDownload,
    save: handleSave,
    undo: handleUndo,
    redo: handleRedo,
  });

  return (
    <div className="min-h-screen bg-newsprint-100 dark:bg-ink-900">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Undo/Redo Toolbar */}
        <div className="flex items-center justify-end gap-3 mb-6 animate-fade-in">
          <button
            onClick={handleUndo}
            disabled={!canUndo()}
            className="p-2.5 glass text-ink-900 dark:text-newsprint-100 rounded-md border-2 border-ink-200 dark:border-ink-600 hover:border-sepia-600 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed shadow-paper hover:shadow-paper-lg group"
            title="Undo (Ctrl/Cmd+Z)"
          >
            <Undo2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo()}
            className="p-2.5 glass text-ink-900 dark:text-newsprint-100 rounded-md border-2 border-ink-200 dark:border-ink-600 hover:border-sepia-600 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed shadow-paper hover:shadow-paper-lg group"
            title="Redo (Ctrl/Cmd+Y)"
          >
            <Redo2 className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Section */}
        {showTemplates && (
          <div className="mb-8 card animate-slide-up">
            <Templates onSelectTemplate={(template) => setConfig(template)} />
            <button
              onClick={() => setShowTemplates(false)}
              className="mt-6 text-sm text-ink-600 dark:text-ink-400 hover:text-sepia-700 dark:hover:text-sepia-500 font-semibold transition-colors tracking-wide uppercase text-xs"
            >
              Hide templates ↑
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
          {/* Left Panel - Customization */}
          <div className="space-y-6">
            <CustomizationPanel config={config} setConfig={setConfig} />

            {/* Presets Manager */}
            <div className="card">
              <PresetsManager />
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <QRPreview config={config} />
          </div>
        </div>

        {!showTemplates && (
          <button
            onClick={() => setShowTemplates(true)}
            className="mt-8 mx-auto block text-sm text-ink-600 dark:text-ink-400 hover:text-sepia-700 dark:hover:text-sepia-500 font-semibold transition-colors tracking-wide uppercase text-xs border-b-2 border-transparent hover:border-sepia-600"
          >
            Show templates
          </button>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center border-t-2 border-ink-200 dark:border-ink-700 mt-12">
        <p className="text-sm text-ink-600 dark:text-ink-400 font-serif">
          Crafted with care ·{" "}
          <span className="font-bold text-ink-900 dark:text-newsprint-100">
            QRafter
          </span>{" "}
          © 2025
        </p>
      </footer>

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp />

      {/* Toast Notifications */}
      <ToastProvider />
    </div>
  );
}

export default App;
