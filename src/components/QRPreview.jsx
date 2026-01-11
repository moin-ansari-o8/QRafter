import { useEffect, useRef, useState } from "react";
import { Download, Image, FileCode } from "lucide-react";
import QRCodeStyling from "qr-code-styling";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

export default function QRPreview({ config, isMobile = false }) {
  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);
  const qrContainerRef = useRef(null);
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



  // Listen for download events from FloatingDownloadButton
  useEffect(() => {
    const handleDownloadEvent = (e) => {
      if (qrCodeRef.current) {
        try {
          qrCodeRef.current.download({
            name: e.detail.filename,
            extension: e.detail.extension,
          });
          toast.success(
            `QR Code downloaded as ${e.detail.extension.toUpperCase()}!`
          );
          celebrateDownload();
        } catch (error) {
          toast.error("Download failed. Please try again.");
          console.error("Download error:", error);
        }
      }
    };

    window.addEventListener("downloadQR", handleDownloadEvent);
    return () => window.removeEventListener("downloadQR", handleDownloadEvent);
  }, []);

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
    <div className={isMobile ? "" : "space-y-4 sm:space-y-6 card"}>
      {/* Desktop only: Show Preview heading */}
      {!isMobile && (
        <div className="border-b-2 border-ink-200 dark:border-ink-700 pb-3 sm:pb-4">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-ink-900 dark:text-newsprint-100 mb-1 flex items-center gap-2">
            <Download className="w-5 h-5 sm:w-6 sm:h-6 text-sepia-600 dark:text-sepia-500" />
            Preview
          </h2>
          <p className="text-xs text-ink-600 dark:text-newsprint-300 tracking-wide uppercase font-medium">
            Your QR code appears here
          </p>
        </div>
      )}

      {/* QR Code Display */}
      <div
        ref={qrContainerRef}
        className={`${isMobile ? "sticky top-16 z-40 mb-4" : ""}`}
      >
        <div className="flex items-center justify-center glass rounded-lg p-4 sm:p-8 border-2 border-ink-300 dark:border-ink-600 shadow-paper-lg overflow-hidden bg-newsprint-50 dark:bg-ink-800">
          <div
            ref={qrRef}
            className="flex items-center justify-center w-full"
            style={{
              maxWidth: "100%",
              maxHeight: isMobile ? "280px" : "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
