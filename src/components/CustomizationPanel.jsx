import {
  Upload,
  FileText,
  ImageIcon,
  Palette,
  Circle,
  Square,
  Grid3x3,
  Shield,
  Maximize2,
  BoxSelect,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import ColorPicker from "./ColorPicker";
import StyleSelector from "./StyleSelector";

const DOT_STYLES = [
  { value: "square", label: "Square" },
  { value: "dots", label: "Dots" },
  { value: "rounded", label: "Rounded" },
  { value: "extra-rounded", label: "Extra Rounded" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy Rounded" },
];

const CORNER_SQUARE_STYLES = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Dot" },
  { value: "extra-rounded", label: "Extra Rounded" },
];

const CORNER_DOT_STYLES = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Dot" },
];

const ERROR_CORRECTION_LEVELS = [
  { value: "L", label: "Low" },
  { value: "M", label: "Medium" },
  { value: "Q", label: "Quartile" },
  { value: "H", label: "High" },
];

export default function CustomizationPanel({ config, setConfig }) {
  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);
  const [, setIsGenerating] = useState(false);

  // Initialize QR code
  useEffect(() => {
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: config.size,
        height: config.size,
        data: config.data || "https://qrafter.dev",
        margin: config.margin,
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          errorCorrectionLevel: config.errorCorrectionLevel,
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 5,
        },
        dotsOptions: {
          type: config.dotsType,
          color: config.dotsColor,
        },
        backgroundOptions: {
          color: config.backgroundColor,
        },
        cornersSquareOptions: {
          type: config.cornerSquareType,
          color: config.dotsColor,
        },
        cornersDotOptions: {
          type: config.cornerDotType,
          color: config.dotsColor,
        },
        image: config.logo || undefined,
      });

      if (qrRef.current) {
        qrCodeRef.current.append(qrRef.current);
      }
    }
  }, []);

  // Update QR code when config changes
  useEffect(() => {
    if (qrCodeRef.current) {
      const updateTimeout = setTimeout(() => {
        setIsGenerating(true);
      }, 0);

      qrCodeRef.current.update({
        width: config.size,
        height: config.size,
        data: config.data || "https://qrafter.dev",
        margin: config.margin,
        qrOptions: {
          errorCorrectionLevel: config.errorCorrectionLevel,
        },
        dotsOptions: {
          type: config.dotsType,
          color: config.dotsColor,
        },
        backgroundOptions: {
          color: config.backgroundColor,
        },
        cornersSquareOptions: {
          type: config.cornerSquareType,
          color: config.dotsColor,
        },
        cornersDotOptions: {
          type: config.cornerDotType,
          color: config.dotsColor,
        },
        image: config.logo || undefined,
      });

      setTimeout(() => setIsGenerating(false), 100);

      return () => clearTimeout(updateTimeout);
    }
  }, [config]);

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
    <div className="space-y-4 sm:space-y-6 card">
      <div className="border-b-2 border-ink-200 dark:border-ink-700 pb-3 sm:pb-4">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-ink-900 dark:text-newsprint-100 mb-1 flex items-center gap-2">
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-sepia-600 dark:text-sepia-500" />
          Customize
        </h2>
        <p className="text-xs text-ink-600 dark:text-newsprint-300 tracking-wide uppercase font-medium">
          Personalize every aspect
        </p>
      </div>

      {/* Mobile QR Preview (Sticky) */}
      <div className="lg:hidden sticky top-16 z-40 -mx-7 px-7 pt-2 pb-4 bg-newsprint-100 dark:bg-ink-900">
        <div className="mx-auto w-fit">
          <div className="flex items-center justify-center glass rounded-lg p-4 sm:p-6 border-2 border-ink-300 dark:border-ink-600 shadow-paper-lg bg-newsprint-50 dark:bg-ink-800">
            <div
              ref={qrRef}
              className="flex items-center justify-center"
              style={{
                width: "min(280px, calc(100vw - 6rem))",
                height: "min(280px, calc(100vw - 6rem))",
              }}
            />
          </div>
        </div>
      </div>

      {/* Input Data */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-newsprint-100">
          <FileText className="w-4 h-4 text-sepia-600 dark:text-sepia-500" />
          Content
        </label>
        <textarea
          value={config.data}
          onChange={(e) => setConfig({ ...config, data: e.target.value })}
          placeholder="Enter URL, text, or any data..."
          className="input-field resize-none"
          rows="3"
        />
      </div>

      {/* Logo Upload */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-newsprint-100">
          <ImageIcon className="w-4 h-4 text-sepia-600 dark:text-sepia-500" />
          Logo (Optional)
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <label className="flex-1 cursor-pointer group">
            <div className="flex items-center justify-center gap-2 px-4 py-3 glass border-2 border-dashed border-ink-300 dark:border-ink-600 rounded-md hover:border-sepia-600 dark:hover:border-sepia-500 transition-all duration-150 touch-manipulation">
              <Upload className="w-5 h-5 text-ink-600 dark:text-newsprint-100 group-hover:text-sepia-700 dark:group-hover:text-sepia-400 transition-colors" />
              <span className="text-sm font-semibold text-ink-700 dark:text-newsprint-100 group-hover:text-sepia-700 dark:group-hover:text-sepia-400">
                {config.logo ? "Change Logo" : "Upload Logo"}
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
              className="btn-danger touch-manipulation"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Colors */}
      <ColorPicker
        label="Foreground Color"
        icon={<Circle className="w-4 h-4" />}
        value={config.dotsColor}
        onChange={(color) => setConfig({ ...config, dotsColor: color })}
      />

      <ColorPicker
        label="Background Color"
        icon={<Square className="w-4 h-4" />}
        value={config.backgroundColor}
        onChange={(color) => setConfig({ ...config, backgroundColor: color })}
      />

      {/* Dot Style */}
      <StyleSelector
        label="Dot Style"
        icon={<Grid3x3 className="w-4 h-4" />}
        value={config.dotsType}
        onChange={(type) => setConfig({ ...config, dotsType: type })}
        options={DOT_STYLES}
      />

      {/* Corner Square Style */}
      <StyleSelector
        label="Corner Square Style"
        icon={<Square className="w-4 h-4" />}
        value={config.cornerSquareType}
        onChange={(type) => setConfig({ ...config, cornerSquareType: type })}
        options={CORNER_SQUARE_STYLES}
      />

      {/* Corner Dot Style */}
      <StyleSelector
        label="Corner Dot Style"
        icon={<Circle className="w-4 h-4" />}
        value={config.cornerDotType}
        onChange={(type) => setConfig({ ...config, cornerDotType: type })}
        options={CORNER_DOT_STYLES}
      />

      {/* Size */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-newsprint-100">
          <Maximize2 className="w-4 h-4 text-sepia-600 dark:text-sepia-500" />
          Size:{" "}
          <span className="text-sepia-700 dark:text-sepia-400 font-mono">
            {config.size}px
          </span>
        </label>
        <input
          type="range"
          min="256"
          max="1024"
          step="8"
          value={config.size}
          onChange={(e) =>
            setConfig({ ...config, size: parseInt(e.target.value) })
          }
          className="w-full range-slider"
        />
      </div>

      {/* Margin */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-newsprint-100">
          <BoxSelect className="w-4 h-4 text-sepia-600 dark:text-sepia-500" />
          Margin:{" "}
          <span className="text-sepia-700 dark:text-sepia-400 font-mono">
            {config.margin}px
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={config.margin}
          onChange={(e) =>
            setConfig({ ...config, margin: parseInt(e.target.value) })
          }
          className="w-full range-slider"
        />
      </div>

      {/* Error Correction */}
      <StyleSelector
        label="Error Correction Level"
        icon={<Shield className="w-4 h-4" />}
        value={config.errorCorrectionLevel}
        onChange={(level) =>
          setConfig({ ...config, errorCorrectionLevel: level })
        }
        options={ERROR_CORRECTION_LEVELS}
      />
    </div>
  );
}
