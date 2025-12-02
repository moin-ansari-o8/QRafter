import { useState } from 'react';
import Header from './components/Header';
import CustomizationPanel from './components/CustomizationPanel';
import QRPreview from './components/QRPreview';

function App() {
  const [config, setConfig] = useState({
    data: 'https://github.com/moin-ansari-o8/QRafter',
    size: 512,
    margin: 10,
    dotsColor: '#000000',
    backgroundColor: '#ffffff',
    dotsType: 'rounded',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
    errorCorrectionLevel: 'M',
    logo: null,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Customization */}
          <div>
            <CustomizationPanel config={config} setConfig={setConfig} />
          </div>

          {/* Right Panel - Preview */}
          <div>
            <QRPreview config={config} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Made with ❤️ using Vite + React | QRafter © 2025
        </p>
      </footer>
    </div>
  );
}

export default App;

