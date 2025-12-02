import { useEffect, useRef, useState } from 'react';
import { Download, Image, FileCode, Sparkles } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

export default function QRPreview({ config }) {
  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);
  const [, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: config.size,
        height: config.size,
        data: config.data || 'https://qrafter.dev',
        margin: config.margin,
        qrOptions: {
          typeNumber: 0,
          mode: 'Byte',
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
        data: config.data || 'https://qrafter.dev',
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
      origin: { y: 0.6 }
    });
  };

  const handleDownload = (extension) => {
    if (qrCodeRef.current) {
      try {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        qrCodeRef.current.download({
          name: `qrafter-${timestamp}`,
          extension: extension,
        });
        toast.success(`QR Code downloaded as ${extension.toUpperCase()}!`);
        celebrateDownload();
      } catch (error) {
        toast.error('Download failed. Please try again.');
        console.error('Download error:', error);
      }
    }
  };

  const exportFormats = [
    { ext: 'png', label: 'PNG', icon: Image, color: 'from-blue-500 to-blue-700' },
    { ext: 'svg', label: 'SVG', icon: FileCode, color: 'from-purple-500 to-purple-700' },
    { ext: 'jpeg', label: 'JPEG', icon: Image, color: 'from-green-500 to-green-700' },
    { ext: 'webp', label: 'WebP', icon: Sparkles, color: 'from-pink-500 to-pink-700' },
  ];

  return (
    <div className="space-y-6 p-6 glass rounded-2xl border border-gray-200 dark:border-slate-700 sticky top-24">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Preview
        </h2>
      </div>

      {/* QR Code Display */}
      <div className="flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700 relative overflow-hidden">
        <div ref={qrRef} className="flex items-center justify-center relative z-10" />
      </div>

      {/* Download Buttons */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Download
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {exportFormats.map(({ ext, label, icon: Icon, color }) => (
            <button
              key={ext}
              onClick={() => handleDownload(ext)}
              className={`flex flex-col items-center gap-2 px-4 py-3 bg-gradient-to-br ${color} text-white rounded-lg hover:shadow-lg transition-all`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
        <p className="text-xs text-primary-900 dark:text-primary-100">
          💡 <strong>Tip:</strong> Use a higher error correction level if you're adding a logo to ensure the QR code remains scannable.
        </p>
      </div>
    </div>
  );
}

