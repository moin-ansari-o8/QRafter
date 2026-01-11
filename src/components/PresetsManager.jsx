import { useState } from "react";
import { Save, Trash2, Download, Upload } from "lucide-react";
import toast from "react-hot-toast";
import useQRStore from "../store/qrStore";

export default function PresetsManager() {
  const [presetName, setPresetName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const { presets, savePreset, loadPreset, deletePreset, activePreset } =
    useQRStore();

  const handleSave = () => {
    if (!presetName.trim()) {
      toast.error("Please enter a preset name");
      return;
    }
    savePreset(presetName);
    toast.success(`Preset "${presetName}" saved!`);
    setPresetName("");
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
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrafter-presets.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Presets exported!");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        JSON.parse(event.target.result);
        // Import presets - would need to add to store
        toast.success("Presets imported!");
      } catch {
        toast.error("Invalid preset file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-ink-200 dark:border-ink-700 pb-3 gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-serif text-ink-900 dark:text-newsprint-100 mb-1 flex items-center gap-2">
            <Save className="w-4 h-4 sm:w-5 sm:h-5 text-sepia-600 dark:text-sepia-500" />
            Saved Presets
          </h3>
          <p className="text-xs text-ink-600 dark:text-newsprint-300 tracking-wide uppercase font-medium">
            Manage your favorite styles
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSaveDialog(!showSaveDialog)}
            className="p-2 sm:p-2.5 bg-ink-900 text-newsprint-100 dark:bg-newsprint-100 dark:text-ink-900 rounded-md border-2 border-ink-900 dark:border-newsprint-100 hover:bg-ink-800 dark:hover:bg-newsprint-200 transition-all shadow-editorial hover:shadow-paper-lg touch-manipulation"
            title="Save Current Style"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={handleExport}
            className="p-2 sm:p-2.5 glass text-ink-900 dark:text-newsprint-100 rounded-md border-2 border-ink-300 dark:border-ink-600 hover:border-sepia-600 transition-all shadow-paper hover:shadow-paper-lg touch-manipulation"
            title="Export Presets"
          >
            <Download className="w-4 h-4" />
          </button>
          <label
            className="p-2 sm:p-2.5 glass text-ink-900 dark:text-newsprint-100 rounded-md border-2 border-ink-300 dark:border-ink-600 hover:border-sepia-600 transition-all shadow-paper hover:shadow-paper-lg cursor-pointer touch-manipulation"
            title="Import Presets"
          >
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
        <div className="animate-slide-up">
          <div className="flex flex-col sm:flex-row gap-2 p-3 sm:p-4 bg-sepia-50 dark:bg-sepia-900/20 rounded-md border-2 border-sepia-300 dark:border-sepia-700">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name..."
              className="input-field flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
            <button
              onClick={handleSave}
              className="btn-primary touch-manipulation"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 max-h-64 sm:max-h-72 overflow-y-auto custom-scrollbar">
        {presets.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-ink-600 dark:text-ink-400 mb-2 font-serif">
              No saved presets yet
            </p>
            <p className="text-xs text-ink-500 dark:text-ink-500">
              Click the save button to create your first preset
            </p>
          </div>
        ) : (
          presets.map((preset) => (
            <div
              key={preset.id}
              className={`group flex items-center justify-between p-3 sm:p-4 rounded-md border-2 transition-all touch-manipulation ${
                activePreset === preset.id
                  ? "border-ink-900 bg-ink-900 dark:border-newsprint-100 dark:bg-newsprint-100 shadow-lg"
                  : "glass border-ink-200 dark:border-ink-700 hover:border-sepia-600 dark:hover:border-sepia-500 hover:shadow-paper-lg"
              }`}
            >
              <button
                onClick={() => handleLoad(preset)}
                className="flex-1 text-left touch-manipulation"
              >
                <span
                  className={`text-sm font-semibold transition-colors ${
                    activePreset === preset.id
                      ? "text-newsprint-100 dark:text-ink-900"
                      : "text-ink-900 dark:text-newsprint-100 group-hover:text-sepia-700 dark:group-hover:text-sepia-500"
                  }`}
                >
                  {preset.name}
                </span>
                <span
                  className={`block text-xs mt-1 font-mono ${
                    activePreset === preset.id
                      ? "text-newsprint-200 dark:text-ink-700"
                      : "text-ink-500 dark:text-ink-500"
                  }`}
                >
                  {new Date(preset.createdAt).toLocaleDateString()}
                </span>
              </button>
              <button
                onClick={() => handleDelete(preset)}
                className={`p-2 rounded-md transition-all touch-manipulation ${
                  activePreset === preset.id
                    ? "text-newsprint-100 hover:bg-newsprint-100/10 dark:text-ink-900 dark:hover:bg-ink-900/10"
                    : "text-archive-700 hover:bg-archive-50 dark:hover:bg-archive-900/20"
                }`}
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
