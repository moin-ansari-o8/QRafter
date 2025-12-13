/**
 * Professional Theme Configuration for QRafter
 *
 * This file defines semantic color tokens that ensure:
 * - Proper contrast ratios (WCAG AA: 4.5:1 for normal text)
 * - Consistent theming across all components
 * - Easy maintenance and theme updates
 */

export const THEME_COLORS = {
  // Light Theme
  light: {
    // Text Colors (Dark text on light backgrounds)
    text: {
      primary: "#1a1a1a", // Main text - ink-900
      secondary: "#404040", // Secondary text - ink-600
      tertiary: "#737373", // Subtle text - ink-400
      muted: "#a3a3a3", // Disabled/muted - ink-300
      inverse: "#f5f5f0", // Text on dark backgrounds
      accent: "#8b7355", // Accent text - sepia-600
      danger: "#a83232", // Error/danger text
      success: "#2d5016", // Success text
    },

    // Background Colors
    bg: {
      primary: "#f5f5f0", // Main background - newsprint-100
      secondary: "#ffffff", // Card backgrounds
      tertiary: "#fafaf9", // Input backgrounds - newsprint-50
      elevated: "rgba(255, 255, 255, 0.85)", // Glass effect
      inverse: "#1a1a1a", // Dark backgrounds for contrast
      accent: "#f2ede4", // Accent backgrounds - sepia-100
      danger: "#fde3e3", // Error backgrounds - archive-100
    },

    // Border Colors
    border: {
      primary: "#d4d4d4", // Default borders - ink-200
      secondary: "#e5e5e5", // Subtle borders - ink-100
      accent: "#8b7355", // Accent borders - sepia-600
      focus: "#8b7355", // Focus state
      danger: "#a83232", // Error borders
    },

    // Interactive States
    interactive: {
      hover: "#2d2d2d", // Hover state background
      active: "#1a1a1a", // Active/pressed state
      disabled: "#e5e5e5", // Disabled background
    },
  },

  // Dark Theme
  dark: {
    // Text Colors (Light text on dark backgrounds)
    text: {
      primary: "#e5e5e5", // Main text - ink-100
      secondary: "#a3a3a3", // Secondary text - ink-300
      tertiary: "#737373", // Subtle text - ink-400
      muted: "#525252", // Disabled/muted - ink-500
      inverse: "#1a1a1a", // Text on light backgrounds
      accent: "#c9ab7f", // Accent text - sepia-400
      danger: "#ed7575", // Error/danger text - archive-400
      success: "#3d5a27", // Success text
    },

    // Background Colors
    bg: {
      primary: "#1a1a1a", // Main background - ink-900
      secondary: "#2d2d2d", // Card backgrounds - ink-700
      tertiary: "#404040", // Input backgrounds - ink-600
      elevated: "rgba(45, 45, 45, 0.85)", // Glass effect
      inverse: "#f5f5f0", // Light backgrounds for contrast
      accent: "#5f4d3d", // Accent backgrounds - sepia-800
      danger: "#742c2c", // Error backgrounds - archive-900
    },

    // Border Colors
    border: {
      primary: "#525252", // Default borders - ink-500
      secondary: "#404040", // Subtle borders - ink-600
      accent: "#8b7355", // Accent borders - sepia-600
      focus: "#c9ab7f", // Focus state - sepia-400
      danger: "#ed7575", // Error borders - archive-400
    },

    // Interactive States
    interactive: {
      hover: "#404040", // Hover state background
      active: "#525252", // Active/pressed state
      disabled: "#2d2d2d", // Disabled background
    },
  },
};

/**
 * Get color value based on current theme
 * @param {string} category - Color category (text, bg, border, interactive)
 * @param {string} variant - Color variant (primary, secondary, etc.)
 * @param {boolean} isDark - Whether dark mode is active
 * @returns {string} Color value
 */
export const getThemeColor = (category, variant, isDark = false) => {
  const theme = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  return theme[category]?.[variant] || theme.text.primary;
};

/**
 * Semantic class mapping for easy component usage
 * Use these in your Tailwind classes for theme-aware styling
 */
export const SEMANTIC_CLASSES = {
  // Text
  textPrimary: "text-ink-900 dark:text-ink-100",
  textSecondary: "text-ink-600 dark:text-ink-300",
  textTertiary: "text-ink-400 dark:text-ink-400",
  textMuted: "text-ink-300 dark:text-ink-500",
  textAccent: "text-sepia-600 dark:text-sepia-400",
  textDanger: "text-archive-700 dark:text-archive-400",
  textSuccess: "text-success-600 dark:text-success-500",

  // Backgrounds
  bgPrimary: "bg-newsprint-100 dark:bg-ink-900",
  bgSecondary: "bg-white dark:bg-ink-700",
  bgTertiary: "bg-newsprint-50 dark:bg-ink-600",
  bgAccent: "bg-sepia-100 dark:bg-sepia-800",
  bgDanger: "bg-archive-100 dark:bg-archive-900",

  // Borders
  borderPrimary: "border-ink-200 dark:border-ink-500",
  borderSecondary: "border-ink-100 dark:border-ink-600",
  borderAccent: "border-sepia-600 dark:border-sepia-600",
  borderFocus: "focus:border-sepia-600 dark:focus:border-sepia-400",

  // Interactive
  hoverBg: "hover:bg-ink-50 dark:hover:bg-ink-600",
  activeBg: "active:bg-ink-100 dark:active:bg-ink-500",
};

export default THEME_COLORS;
