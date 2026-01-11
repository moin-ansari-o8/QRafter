import { Undo2, Redo2 } from "lucide-react";
import Header from "./components/Header";
import CustomizationPanel from "./components/CustomizationPanel";
import QRPreview from "./components/QRPreview";
import Templates from "./components/Templates";
import PresetsManager from "./components/PresetsManager";
import FloatingDownloadButton from "./components/FloatingDownloadButton";
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

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
        {/* Undo/Redo Toolbar */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 mb-4 sm:mb-6 animate-fade-in">
          <button
            onClick={handleUndo}
            disabled={!canUndo()}
            className="p-2 sm:p-2.5 glass text-ink-900 dark:text-newsprint-100 rounded-md border-2 border-ink-200 dark:border-ink-600 hover:border-sepia-600 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed shadow-paper hover:shadow-paper-lg group touch-manipulation"
            title="Undo (Ctrl/Cmd+Z)"
          >
            <Undo2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo()}
            className="p-2 sm:p-2.5 glass text-ink-900 dark:text-newsprint-100 rounded-md border-2 border-ink-200 dark:border-ink-600 hover:border-sepia-600 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed shadow-paper hover:shadow-paper-lg group touch-manipulation"
            title="Redo (Ctrl/Cmd+Y)"
          >
            <Redo2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Templates Section */}
        {showTemplates && (
          <div className="mb-6 sm:mb-8 card animate-slide-up">
            <Templates onSelectTemplate={(template) => setConfig(template)} />
            <button
              onClick={() => setShowTemplates(false)}
              className="mt-4 sm:mt-6 text-sm text-ink-600 dark:text-ink-400 hover:text-sepia-700 dark:hover:text-sepia-500 font-semibold transition-colors tracking-wide uppercase text-xs touch-manipulation"
            >
              Hide templates ↑
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 animate-fade-in">
          {/* Left Panel - Customization */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <CustomizationPanel config={config} setConfig={setConfig} />

            {/* Presets Manager */}
            <div className="card">
              <PresetsManager />
            </div>
          </div>

          {/* Right Panel - Desktop Preview (sticky column) */}
          <div className="hidden lg:block order-1 lg:order-2 lg:sticky lg:top-24 h-fit">
            <QRPreview config={config} isMobile={false} />
          </div>
        </div>

        {!showTemplates && (
          <button
            onClick={() => setShowTemplates(true)}
            className="mt-6 sm:mt-8 mx-auto block text-sm text-ink-600 dark:text-ink-400 hover:text-sepia-700 dark:hover:text-sepia-500 font-semibold transition-colors tracking-wide uppercase text-xs border-b-2 border-transparent hover:border-sepia-600 touch-manipulation"
          >
            Show templates
          </button>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 text-center border-t-2 border-ink-200 dark:border-ink-700 mt-8 sm:mt-12">
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400 font-serif">
          Developed by{" "}
          <a
            href="https://yourstrulymoin.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink-900 dark:text-newsprint-100 hover:text-sepia-700 dark:hover:text-sepia-400 transition-colors underline decoration-1 underline-offset-2"
          >
            Moin Ansari
          </a>
        </p>
      </footer>

      {/* Floating Download Button */}
      <FloatingDownloadButton />

      {/* Toast Notifications */}
      <ToastProvider />
    </div>
  );
}

export default App;
