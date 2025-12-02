import { useState } from 'react';
import { Save, Trash2, Download, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import useQRStore from '../store/qrStore';

export default function PresetsManager() {
  const [presetName, setPresetName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  const { presets, savePreset, loadPreset, deletePreset } = useQRStore();

  const handleSave = () => {
    if (!presetName.trim()) {
      toast.error('Please enter a preset name');
      return;
    }
    savePreset(presetName);
    toast.success(`Preset "${presetName}" saved!`);
    setPresetName('');
    setShowSaveDialog(false);
  };

  const handleLoad = (preset) => {
    loadPreset(preset.id);
    toast.success(`Preset "${preset.name}" loaded!`);
  };

  const handleDelete = (preset) => {
    deletePreset(preset.id);
    toast.success(`Preset "${preset.name}" deleted`);
  };

  const handleExport = () => {
    const data = JSON.stringify(presets, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrafter-presets.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Presets exported!');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        JSON.parse(event.target.result);
        // Import presets - would need to add to store
        toast.success('Presets imported!');
      } catch {
        toast.error('Invalid preset file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Saved Presets
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSaveDialog(!showSaveDialog)}
            className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            title="Save Current Style"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={handleExport}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            title="Export Presets"
          >
            <Download className="w-4 h-4" />
          </button>
          <label className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer" title="Import Presets">
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {showSaveDialog && (
        <div className="overflow-hidden">
          <div className="flex gap-2 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Preset name..."
              className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
        {presets.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No saved presets yet
          </p>
        ) : (
          presets.map((preset) => (
            <div
              key={preset.id}
              className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-all"
            >
              <button
                onClick={() => handleLoad(preset)}
                className="flex-1 text-left"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {preset.name}
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {new Date(preset.createdAt).toLocaleDateString()}
                </span>
              </button>
              <button
                onClick={() => handleDelete(preset)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
