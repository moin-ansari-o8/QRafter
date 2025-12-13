import { useEffect, useRef, useState } from "react";
import { Download, Image, FileCode, Lightbulb } from "lucide-react";
import QRCodeStyling from "qr-code-styling";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

export default function QRPreview({ config }) {
  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);
  const [, setIsGenerating] = useState(false);

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

  useEffect(() => {
    if (qrCodeRef.current) {
      // Use a flag to avoid setState warnings
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

  const celebrateDownload = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleDownload = (extension) => {
    if (qrCodeRef.current) {
      try {
        const timestamp = new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/:/g, "-");
        qrCodeRef.current.download({
          name: `qrafter-${timestamp}`,
          extension: extension,
        });
        toast.success(`QR Code downloaded as ${extension.toUpperCase()}!`);
        celebrateDownload();
      } catch (error) {
        toast.error("Download failed. Please try again.");
        console.error("Download error:", error);
      }
    }
  };

  const exportFormats = [
    { ext: "png", label: "PNG", icon: Image },
    { ext: "svg", label: "SVG", icon: FileCode },
    { ext: "jpeg", label: "JPEG", icon: Image },
    { ext: "webp", label: "WebP", icon: Image },
  ];

  return (
    <div className="space-y-6 card">
      <div className="border-b-2 border-ink-200 dark:border-ink-700 pb-4">
        <h2 className="text-2xl font-bold font-serif text-ink-900 dark:text-newsprint-100 mb-1 flex items-center gap-2">
          <Download className="w-6 h-6 text-sepia-600 dark:text-sepia-500" />
          Preview
        </h2>
        <p className="text-xs text-ink-600 dark:text-newsprint-300 tracking-wide uppercase font-medium">
          Your QR code appears here
        </p>
      </div>

      {/* QR Code Display */}
      <div className="relative">
        <div className="flex items-center justify-center glass rounded-lg p-8 border-2 border-ink-300 dark:border-ink-600 shadow-paper-lg">
          <div ref={qrRef} className="flex items-center justify-center" />
        </div>
      </div>

      {/* Download Buttons */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-ink-900 dark:text-newsprint-100 flex items-center gap-2">
          <Download className="w-4 h-4 text-sepia-600 dark:text-sepia-500" />
          Export Options
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {exportFormats.map(({ ext, label, icon: Icon }) => (
            <button
              key={ext}
              onClick={() => handleDownload(ext)}
              className="flex flex-col items-center gap-2 px-4 py-4 bg-ink-900 text-newsprint-100 dark:bg-newsprint-100 dark:text-ink-900 rounded-md border-2 border-ink-900 dark:border-newsprint-100 hover:bg-ink-800 dark:hover:bg-newsprint-200 transition-all shadow-editorial hover:shadow-paper-lg font-semibold"
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="rounded-md bg-sepia-50 dark:bg-sepia-900/20 border-l-4 border-sepia-600 p-4">
        <p className="text-sm text-ink-800 dark:text-ink-200 leading-relaxed flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-sepia-700 dark:text-sepia-500 shrink-0 mt-0.5" />
          <span>
            <strong className="font-serif">Pro Tip:</strong> Use a higher error
            correction level when adding a logo to ensure scannability.
          </span>
        </p>
      </div>
    </div>
  );
}
