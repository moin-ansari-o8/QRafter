import { useState } from "react";
import { Download, Image, FileCode } from "lucide-react";
import useQRStore from "../store/qrStore";

export default function FloatingDownloadButton() {
  const [showMenu, setShowMenu] = useState(false);
  const { qrCodeInstance } = useQRStore();

  const exportFormats = [
    { ext: "png", label: "PNG", icon: Image },
    { ext: "svg", label: "SVG", icon: FileCode },
    { ext: "jpeg", label: "JPEG", icon: Image },
    { ext: "webp", label: "WebP", icon: Image },
  ];

  const handleDownload = (extension) => {
    // Get the QR code instance from the global store or directly trigger download
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");

    // This will be triggered via event or direct call
    const event = new CustomEvent("downloadQR", {
      detail: { extension, filename: `qrafter-${timestamp}` },
    });
    window.dispatchEvent(event);

    setShowMenu(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showMenu && (
        <div className="absolute bottom-16 right-0 glass-card rounded-lg p-3 shadow-paper-xl border-2 border-ink-300 dark:border-ink-600 min-w-[160px]">
          <div className="space-y-2">
            {exportFormats.map(({ ext, label, icon: Icon }) => (
              <button
                key={ext}
                onClick={() => handleDownload(ext)}
                className="w-full flex items-center gap-3 px-3 py-2 text-ink-900 dark:text-newsprint-100 hover:bg-sepia-100 dark:hover:bg-sepia-900/30 rounded-md transition-colors text-left font-semibold text-sm"
              >
                <Icon className="w-4 h-4 text-sepia-600 dark:text-sepia-500" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-3 glass rounded-md border-2 border-ink-300 dark:border-ink-600 shadow-paper-xl hover:shadow-editorial transition-all touch-manipulation text-ink-900 dark:text-newsprint-100 hover:border-ink-900 dark:hover:border-newsprint-100"
        title="Download QR Code"
      >
        <Download className="w-5 h-5" />
      </button>
    </div>
  );
}
