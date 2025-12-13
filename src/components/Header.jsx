import { QrCode, Newspaper } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b-2 border-ink-200 dark:border-ink-700">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-12 h-12 bg-ink-900 dark:bg-newsprint-100 rounded border-2 border-ink-900 dark:border-newsprint-100 flex items-center justify-center shadow-editorial transition-all hover:shadow-paper-lg">
                <QrCode
                  className="w-7 h-7 text-newsprint-100 dark:text-ink-900"
                  strokeWidth={2.5}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold font-serif text-ink-900 dark:text-newsprint-100 tracking-tight">
                  QRafter
                </h1>
                <Newspaper className="w-5 h-5 text-sepia-600 dark:text-sepia-500" />
              </div>
              <p className="text-xs text-ink-600 dark:text-ink-400 font-medium tracking-wide uppercase">
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
