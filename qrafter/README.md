# QRafter - Advanced QR Code Generator

![QRafter](https://github.com/user-attachments/assets/fa733ce2-77f8-4495-a731-4400bece9424)

**Craft Beautiful QR Codes in Seconds**

QRafter is a modern, fast, and beautiful QR code generator web application built with Vite + React. Generate customizable QR codes with logo support, offering a premium user experience with stunning UI/UX.

## ✨ Features

### Core Functionality
- **Real-time QR Code Generation**: Live preview as you type
- **Multiple Export Formats**: Download as PNG, SVG, or JPEG
- **Logo Support**: Upload and embed custom logos in your QR codes
- **Advanced Customization**: Complete control over appearance

### Customization Options
- 🎨 **Color Pickers**: Custom foreground and background colors
- 🔲 **Dot Styles**: Square, dots, rounded, extra-rounded, classy, and classy-rounded
- 📐 **Corner Styles**: Customize corner squares and dots separately
- 📏 **Size Control**: Adjustable from 256px to 1024px
- 🔧 **Error Correction**: Low, Medium, Quartile, and High levels
- 📐 **Margin Control**: Adjustable quiet zone around QR code

### Design Features
- 🌓 **Light & Dark Mode**: Smooth theme toggle with localStorage persistence
- 💎 **Modern UI**: Glassmorphism effects, smooth transitions, and premium feel
- 📱 **Responsive Design**: Mobile-first, works perfectly on all screen sizes
- ⚡ **Fast Performance**: Built with Vite for blazing fast development and builds

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/moin-ansari-o8/QRafter.git
cd QRafter/qrafter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.2
- **QR Generation**: qr-code-styling 1.9.2
- **Icons**: Lucide React 0.555.0

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎯 Usage

1. **Enter Content**: Type or paste your URL, text, or data
2. **Customize**: Choose colors, styles, and size
3. **Add Logo** (optional): Upload a logo to embed in the QR code
4. **Adjust Settings**: Fine-tune error correction and margins
5. **Download**: Export as PNG, SVG, or JPEG

## 🎨 Customization Examples

### Dot Styles
![Dot Style](https://github.com/user-attachments/assets/ff38a5d2-697b-445f-b515-4040b4ad482f)

### Color Customization
![Purple QR Code](https://github.com/user-attachments/assets/9f411066-d143-4fb7-b4fa-46c8253eb5b6)

### Dark Mode
![Dark Mode](https://github.com/user-attachments/assets/9e4de0ff-e05d-4b80-b991-26546a03f9e3)

## 📂 Project Structure

```
qrafter/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Logo, branding, theme toggle
│   │   ├── ThemeToggle.jsx         # Dark/light mode switcher
│   │   ├── QRPreview.jsx           # Live preview + download
│   │   ├── CustomizationPanel.jsx  # All customization controls
│   │   ├── ColorPicker.jsx         # Color selection component
│   │   └── StyleSelector.jsx       # Style selection component
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles + Tailwind
├── public/                         # Static assets
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
└── package.json                    # Dependencies and scripts
```

## 🔒 Security

- All processing happens client-side - no data is sent to any server
- No backend or database required
- Your data stays on your device

## 🎓 Tips

- **Logo Size**: Keep logos at 20-30% of QR code size for best scannability
- **Error Correction**: Use higher levels (Q or H) when adding logos
- **Contrast**: Ensure good contrast between foreground and background colors
- **Testing**: Always test your QR codes with multiple scanners

## 📊 Performance

- Production build: ~257KB (gzipped: ~80KB)
- First contentful paint: < 1s
- Lighthouse score: 95+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 💖 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- QR generation powered by [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ using Vite + React | QRafter © 2025
