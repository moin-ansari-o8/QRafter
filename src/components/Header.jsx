import { QrCode, Newspaper } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b-2 border-ink-200 dark:border-ink-700">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-ink-900 dark:bg-newsprint-100 rounded border-2 border-ink-900 dark:border-newsprint-100 flex items-center justify-center shadow-editorial transition-all hover:shadow-paper-lg">
                <QrCode
                  className="w-6 h-6 sm:w-7 sm:h-7 text-newsprint-100 dark:text-ink-900"
                  strokeWidth={2.5}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-ink-900 dark:text-newsprint-100 tracking-tight">
                  QRafter
                </h1>
                <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-sepia-600 dark:text-sepia-500" />
              </div>
              <p className="text-[10px] sm:text-xs text-ink-600 dark:text-ink-400 font-medium tracking-wide uppercase">
                Editorial QR Code Generator
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
