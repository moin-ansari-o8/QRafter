import { useEffect, useRef } from 'react';
import { Download, Image, FileCode } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';

export default function QRPreview({ config }) {
  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);

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
    }
  }, [config]);

  const handleDownload = (extension) => {
    if (qrCodeRef.current) {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      qrCodeRef.current.download({
        name: `qrafter-${timestamp}`,
        extension: extension,
      });
    }
  };

  return (
    <div className="space-y-6 p-6 glass rounded-2xl border border-gray-200 dark:border-slate-700 sticky top-24">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Preview
        </h2>
      </div>

      {/* QR Code Display */}
      <div className="flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700">
        <div ref={qrRef} className="flex items-center justify-center" />
      </div>

      {/* Download Buttons */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Download
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleDownload('png')}
            className="flex flex-col items-center gap-2 px-4 py-3 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg hover:from-primary-600 hover:to-primary-800 transition-all shadow-md hover:shadow-lg"
          >
            <Image className="w-5 h-5" />
            <span className="text-xs font-medium">PNG</span>
          </button>
          <button
            onClick={() => handleDownload('svg')}
            className="flex flex-col items-center gap-2 px-4 py-3 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg hover:from-primary-600 hover:to-primary-800 transition-all shadow-md hover:shadow-lg"
          >
            <FileCode className="w-5 h-5" />
            <span className="text-xs font-medium">SVG</span>
          </button>
          <button
            onClick={() => handleDownload('jpeg')}
            className="flex flex-col items-center gap-2 px-4 py-3 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg hover:from-primary-600 hover:to-primary-800 transition-all shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span className="text-xs font-medium">JPEG</span>
          </button>
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
