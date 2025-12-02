// QR Code Templates
export const TEMPLATES = {
  SOCIAL_MEDIA: {
    name: 'Social Media',
    icon: '📱',
    config: {
      dotsType: 'rounded',
      cornerSquareType: 'extra-rounded',
      dotsColor: '#8b5cf6',
      backgroundColor: '#ffffff',
    },
  },
  BUSINESS: {
    name: 'Business Card',
    icon: '💼',
    config: {
      dotsType: 'square',
      cornerSquareType: 'square',
      dotsColor: '#000000',
      backgroundColor: '#ffffff',
    },
  },
  CREATIVE: {
    name: 'Creative',
    icon: '🎨',
    config: {
      dotsType: 'classy-rounded',
      cornerSquareType: 'dot',
      dotsColor: '#ec4899',
      backgroundColor: '#fdf2f8',
    },
  },
  TECH: {
    name: 'Tech',
    icon: '⚡',
    config: {
      dotsType: 'dots',
      cornerSquareType: 'extra-rounded',
      dotsColor: '#3b82f6',
      backgroundColor: '#eff6ff',
    },
  },
  MINIMAL: {
    name: 'Minimal',
    icon: '⚪',
    config: {
      dotsType: 'square',
      cornerSquareType: 'square',
      dotsColor: '#374151',
      backgroundColor: '#f9fafb',
    },
  },
};

// Gradient Presets
export const GRADIENTS = {
  SUNSET: {
    name: 'Sunset',
    colors: ['#ff6b6b', '#ffd93d', '#ff8c42'],
    type: 'linear',
  },
  OCEAN: {
    name: 'Ocean',
    colors: ['#667eea', '#764ba2', '#f093fb'],
    type: 'linear',
  },
  FOREST: {
    name: 'Forest',
    colors: ['#11998e', '#38ef7d'],
    type: 'linear',
  },
  NEON: {
    name: 'Neon',
    colors: ['#f953c6', '#b91d73'],
    type: 'linear',
  },
  PURPLE: {
    name: 'Purple Dream',
    colors: ['#a8edea', '#fed6e3'],
    type: 'linear',
  },
  FIRE: {
    name: 'Fire',
    colors: ['#f12711', '#f5af19'],
    type: 'linear',
  },
};

// Frame Styles
export const FRAMES = {
  MODERN: {
    name: 'Modern',
    padding: 20,
    borderRadius: 16,
    borderWidth: 0,
    shadow: true,
  },
  VINTAGE: {
    name: 'Vintage',
    padding: 30,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#8b4513',
    shadow: false,
  },
  NEON: {
    name: 'Neon',
    padding: 25,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#ff00ff',
    glow: true,
  },
  MINIMAL: {
    name: 'Minimal',
    padding: 15,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#000000',
    shadow: false,
  },
};

// Filters
export const FILTERS = {
  NONE: { name: 'None', filter: null },
  VINTAGE: { name: 'Vintage', filter: 'sepia(0.5) contrast(1.2)' },
  BW: { name: 'Black & White', filter: 'grayscale(1)' },
  NEON: { name: 'Neon Glow', filter: 'brightness(1.2) saturate(1.5)' },
  BLUR: { name: 'Soft Focus', filter: 'blur(0.5px)' },
};

// Patterns
export const PATTERNS = {
  NONE: { name: 'None', pattern: null },
  DOTS: { name: 'Dots', pattern: 'dots' },
  LINES: { name: 'Lines', pattern: 'lines' },
  GRID: { name: 'Grid', pattern: 'grid' },
};

// Export Formats
export const EXPORT_FORMATS = [
  { value: 'png', label: 'PNG', icon: '🖼️', hasTransparency: true },
  { value: 'svg', label: 'SVG', icon: '📐', scalable: true },
  { value: 'jpeg', label: 'JPEG', icon: '📸' },
  { value: 'webp', label: 'WebP', icon: '🌐', modern: true },
];

// DPI Options
export const DPI_OPTIONS = [
  { value: 72, label: '72 DPI (Screen)' },
  { value: 150, label: '150 DPI (Draft Print)' },
  { value: 300, label: '300 DPI (Print Quality)' },
  { value: 600, label: '600 DPI (Professional)' },
];

// Seasonal Themes
export const SEASONAL_THEMES = {
  CHRISTMAS: {
    name: 'Christmas',
    colors: ['#ff0000', '#00ff00'],
    pattern: 'snowflakes',
    emoji: '🎄',
  },
  HALLOWEEN: {
    name: 'Halloween',
    colors: ['#ff6600', '#000000'],
    pattern: 'spooky',
    emoji: '🎃',
  },
  VALENTINE: {
    name: "Valentine's Day",
    colors: ['#ff1493', '#ff69b4'],
    pattern: 'hearts',
    emoji: '💖',
  },
  EASTER: {
    name: 'Easter',
    colors: ['#ffb6c1', '#98fb98'],
    pattern: 'eggs',
    emoji: '🐰',
  },
};

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = [
  { key: 'Ctrl+D', mac: 'Cmd+D', action: 'download', label: 'Download' },
  { key: 'Ctrl+S', mac: 'Cmd+S', action: 'save', label: 'Save Preset' },
  { key: 'Ctrl+Z', mac: 'Cmd+Z', action: 'undo', label: 'Undo' },
  { key: 'Ctrl+Y', mac: 'Cmd+Y', action: 'redo', label: 'Redo' },
  { key: 'Space', action: 'preview', label: 'Toggle Preview' },
  { key: 'T', action: 'theme', label: 'Toggle Theme' },
];

// Animation Types
export const ANIMATIONS = {
  NONE: { name: 'None', animation: null },
  PULSE: { name: 'Pulse', animation: 'pulse' },
  GRADIENT: { name: 'Animated Gradient', animation: 'gradient' },
  SCAN: { name: 'Scan Line', animation: 'scan' },
  SHIMMER: { name: 'Shimmer', animation: 'shimmer' },
};
