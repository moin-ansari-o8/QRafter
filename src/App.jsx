import { Undo2, Redo2 } from 'lucide-react';
import Header from './components/Header';
import CustomizationPanel from './components/CustomizationPanel';
import QRPreview from './components/QRPreview';
import Templates from './components/Templates';
import PresetsManager from './components/PresetsManager';
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp';
import ToastProvider from './components/ToastProvider';
import useQRStore from './store/qrStore';
import { useKeyboardShortcuts } from './utils/keyboard';
import toast from 'react-hot-toast';
import { useState } from 'react';

function App() {
  const { config, setConfig, undo, redo, canUndo, canRedo } = useQRStore();
  const [showTemplates, setShowTemplates] = useState(true);

  const handleDownload = () => {
    // Triggered by keyboard shortcut
    toast.info('Use the download buttons in the preview panel');
  };

  const handleSave = () => {
    toast.info('Click the Save button in the Presets section');
  };

  const handleUndo = () => {
    if (canUndo()) {
      undo();
      toast.success('Undone');
    }
  };

  const handleRedo = () => {
    if (canRedo()) {
      redo();
      toast.success('Redone');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Undo/Redo Toolbar */}
        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            onClick={handleUndo}
            disabled={!canUndo()}
            className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo (Ctrl/Cmd+Z)"
          >
            <Undo2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo()}
            className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo (Ctrl/Cmd+Y)"
          >
            <Redo2 className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Section */}
        {showTemplates && (
          <div className="mb-8 p-6 glass rounded-2xl border border-gray-200 dark:border-slate-700">
            <Templates onSelectTemplate={(template) => setConfig(template)} />
            <button
              onClick={() => setShowTemplates(false)}
              className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Hide templates
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Customization */}
          <div className="space-y-6">
            <CustomizationPanel config={config} setConfig={setConfig} />
            
            {/* Presets Manager */}
            <div className="p-6 glass rounded-2xl border border-gray-200 dark:border-slate-700">
              <PresetsManager />
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div>
            <QRPreview config={config} />
          </div>
        </div>

        {!showTemplates && (
          <button
            onClick={() => setShowTemplates(true)}
            className="mt-4 text-sm text-primary-500 hover:text-primary-700"
          >
            Show templates
          </button>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Made with ❤️ using Vite + React | QRafter © 2025
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

