import { Upload } from 'lucide-react';
import ColorPicker from './ColorPicker';
import StyleSelector from './StyleSelector';

const DOT_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
];

const CORNER_SQUARE_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

const CORNER_DOT_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
];

const ERROR_CORRECTION_LEVELS = [
  { value: 'L', label: 'Low' },
  { value: 'M', label: 'Medium' },
  { value: 'Q', label: 'Quartile' },
  { value: 'H', label: 'High' },
];

export default function CustomizationPanel({ config, setConfig }) {
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig({ ...config, logo: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 p-6 glass rounded-2xl border border-gray-200 dark:border-slate-700 max-h-[calc(100vh-12rem)] overflow-y-auto">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Customize Your QR Code
        </h2>
      </div>

      {/* Input Data */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Content
        </label>
        <textarea
          value={config.data}
          onChange={(e) => setConfig({ ...config, data: e.target.value })}
          placeholder="Enter URL, text, or any data..."
          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
          rows="3"
        />
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Logo (Optional)
        </label>
        <div className="flex items-center gap-2">
          <label className="flex-1 cursor-pointer">
            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
              <Upload className="w-5 h-5" />
              <span className="text-sm">
                {config.logo ? 'Change Logo' : 'Upload Logo'}
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
          {config.logo && (
            <button
              type="button"
              onClick={() => setConfig({ ...config, logo: null })}
              className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Colors */}
      <ColorPicker
        label="Foreground Color"
        value={config.dotsColor}
        onChange={(color) => setConfig({ ...config, dotsColor: color })}
      />

      <ColorPicker
        label="Background Color"
        value={config.backgroundColor}
        onChange={(color) => setConfig({ ...config, backgroundColor: color })}
      />

      {/* Dot Style */}
      <StyleSelector
        label="Dot Style"
        value={config.dotsType}
        onChange={(type) => setConfig({ ...config, dotsType: type })}
        options={DOT_STYLES}
      />

      {/* Corner Square Style */}
      <StyleSelector
        label="Corner Square Style"
        value={config.cornerSquareType}
        onChange={(type) => setConfig({ ...config, cornerSquareType: type })}
        options={CORNER_SQUARE_STYLES}
      />

      {/* Corner Dot Style */}
      <StyleSelector
        label="Corner Dot Style"
        value={config.cornerDotType}
        onChange={(type) => setConfig({ ...config, cornerDotType: type })}
        options={CORNER_DOT_STYLES}
      />

      {/* Size */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Size: {config.size}px
        </label>
        <input
          type="range"
          min="256"
          max="1024"
          step="32"
          value={config.size}
          onChange={(e) =>
            setConfig({ ...config, size: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
      </div>

      {/* Margin */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Margin: {config.margin}
        </label>
        <input
          type="range"
          min="0"
          max="50"
          step="5"
          value={config.margin}
          onChange={(e) =>
            setConfig({ ...config, margin: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
      </div>

      {/* Error Correction */}
      <StyleSelector
        label="Error Correction Level"
        value={config.errorCorrectionLevel}
        onChange={(level) =>
          setConfig({ ...config, errorCorrectionLevel: level })
        }
        options={ERROR_CORRECTION_LEVELS}
      />
    </div>
  );
}
