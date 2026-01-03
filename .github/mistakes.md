# Project-Specific Mistakes Log

> Records mistakes made specifically in the QRafter project.

---

## 2026-01-04 - StyleSelector Buttons Invisible in Light Mode

**Problem:**
- Unselected style buttons (Dot Style, Corner Square Style, Corner Dot Style) were invisible in light mode
- Only the currently selected button was visible
- In dark mode, buttons were visible but styling was inconsistent
- Issue persisted despite multiple attempts to fix with `!important` overrides

**Root Cause:**
- StyleSelector.jsx used hardcoded inline styles with `style={{}}` attribute
- Unselected buttons: `borderColor: "#000000"`, `backgroundColor: "#ffffff"`, `color: "#000000"`
- Light mode background: `#f5f5f0` (newsprint-100) or `#ffffff` (white)
- **White buttons on white background = NO CONTRAST**
- Inline styles have higher specificity than CSS classes, so `dark:` Tailwind variants couldn't properly override them
- Using `!important` in className created specificity wars and inconsistent behavior

**Solution:**
- Removed ALL inline styles from button element
- Replaced with pure Tailwind utility classes using semantic color tokens from theme system
- **Active state (selected):**
  - Light: `border-ink-900 bg-ink-900 text-newsprint-50` (dark button on light bg)
  - Dark: `dark:border-newsprint-100 dark:bg-newsprint-100 dark:text-ink-900` (light button on dark bg)
- **Inactive state (unselected):**
  - Light: `border-ink-300 bg-newsprint-50 text-ink-900` (visible gray border + cream bg)
  - Dark: `dark:border-ink-500 dark:bg-ink-800 dark:text-newsprint-100` (gray border + dark bg)
- Added proper hover states for both themes
- Used conditional className string instead of style object

**Technical Details:**
```jsx
// ❌ BEFORE (Broken):
style={{
  borderColor: "#000000",
  backgroundColor: "#ffffff",  // Invisible in light mode!
  color: "#000000",
}}
className="dark:!border-white dark:!bg-transparent" // Specificity issues

// ✅ AFTER (Fixed):
className={`
  px-4 py-3 rounded-md border-2 font-semibold text-sm
  ${isActive
    ? "border-ink-900 bg-ink-900 text-newsprint-50 dark:border-newsprint-100 dark:bg-newsprint-100 dark:text-ink-900"
    : "border-ink-300 bg-newsprint-50 text-ink-900 hover:border-ink-500 dark:border-ink-500 dark:bg-ink-800 dark:text-newsprint-100"
  }
`}
```

**Lesson:**
1. **Never use hardcoded color values in inline styles** - they bypass the theme system
2. **Inline styles have highest specificity** - they prevent Tailwind's dark: variants from working
3. **Always use semantic color tokens** from tailwind.config.js (ink-*, newsprint-*, sepia-*)
4. **Test in BOTH themes immediately** - don't fix one mode and break the other
5. **Avoid `!important`** - it creates specificity wars and maintenance nightmares
6. **Use Tailwind's built-in dark: variants** - they're designed for theme switching

**Prevention Strategy:**
- Before adding styles, check if proper contrast exists in BOTH light and dark modes
- Use Tailwind classes with dark: variants instead of inline styles
- Reference THEME_SYSTEM.md for approved color combinations
- Test component immediately after changes in both themes
- **Ensure active/selected states are VISUALLY DISTINCT with accent colors, shadows, and effects**

**Related Files:**
- src/components/StyleSelector.jsx (Fixed)
- src/config/theme.js (Theme configuration)
- tailwind.config.js (Color tokens)
- THEME_SYSTEM.md (Documentation)

---

## 2026-01-04 - Active Button Not Visually Distinct

**Problem:**
- After fixing button visibility, the active/selected button wasn't prominent enough
- Users couldn't easily tell which button was currently selected
- Active buttons looked too similar to inactive buttons in both light and dark modes
- No clear visual hierarchy between selected and unselected states

**Root Cause:**
- Initial fix used same color family (ink colors) for both active and inactive states
- Only difference was dark vs light shades of the same color
- No additional visual cues (shadows, rings, scaling) to distinguish active state
- Active state: `border-ink-900 bg-ink-900` vs Inactive: `border-ink-300 bg-newsprint-50`
- Too subtle for users to quickly identify selected option

**Solution:**
- Changed active button to use **accent color (sepia)** instead of neutral ink colors
- Added multiple visual distinction layers:
  1. **Color**: Sepia-600/500 background (warm brown accent vs neutral gray)
  2. **Ring effect**: `ring-2 ring-sepia-300` (light) / `ring-sepia-700` (dark)
  3. **Shadow**: `shadow-lg` for depth
  4. **Scale**: `scale-[1.02]` for subtle size increase
  5. **White text** on both themes for maximum contrast

**Enhanced Styling:**
```jsx
// ✅ ACTIVE (Prominent):
isActive
  ? "border-sepia-600 bg-sepia-600 text-white shadow-lg scale-[1.02] ring-2 ring-sepia-300 
     dark:border-sepia-500 dark:bg-sepia-500 dark:text-white dark:ring-sepia-700"

// INACTIVE (Subtle):
  : "border-ink-300 bg-newsprint-50 text-ink-900 hover:border-ink-500 
     dark:border-ink-500 dark:bg-ink-800 dark:text-newsprint-100"
```

**Visual Indicators:**
- ✅ Different color family (sepia vs ink)
- ✅ Ring/outline effect
- ✅ Stronger shadow
- ✅ Slight scale increase
- ✅ Always white text for consistency
- ✅ Works in both light and dark modes

**Lesson:**
1. **Active states need MULTIPLE visual cues** - color alone isn't enough
2. **Use accent colors** (sepia, archive) for selected states, not just darker shades
3. **Layer effects**: color + shadow + ring + scale = unmistakable selection
4. **Test with real users** - what seems "obvious" to developers may not be to users
5. **Semantic colors matter**: accent colors signal "this is different/special"
6. **Consistency**: active elements should always use the same visual language

**Prevention Strategy:**
- Active/selected states must use accent colors from theme palette
- Combine at least 3 visual cues: color + shadow/ring + scale/transform
- Test by asking: "Can I instantly identify the selected option?"
- Compare active vs inactive side-by-side in both themes
- Use sepia/archive colors for important UI states, ink colors for neutral states

**Related Files:**
- src/components/StyleSelector.jsx (Enhanced active state)
- tailwind.config.js (Sepia accent colors)

---

## 2026-01-04 - Active Button Final Fix: Simple Black/White Inversion

**Problem:**
- Previous fix used sepia accent color for active buttons
- In light mode, sepia-600 background with white text wasn't prominent enough
- Overcomplicating with rings, scales, and accent colors
- User couldn't immediately identify active button

**Root Cause:**
- Overthinking the solution with fancy effects (rings, shadows, scales)
- Using accent colors (sepia) instead of simple high-contrast colors
- Active button needs MAXIMUM contrast, not aesthetic fancy effects

**Solution (Simple & Effective):**
- Light theme active: **BLACK background + WHITE text** (`bg-ink-900 text-white`)
- Dark theme active: **WHITE background + BLACK text** (`bg-newsprint-100 text-ink-900`)
- Removed unnecessary effects: no rings, no scale, just strong shadow
- Pure inversion = maximum contrast = instantly recognizable

**Final Working Code:**
```jsx
isActive
  ? "border-ink-900 bg-ink-900 text-white shadow-lg 
     dark:border-newsprint-100 dark:bg-newsprint-100 dark:text-ink-900"
  : "border-ink-300 bg-newsprint-50 text-ink-900 hover:border-ink-500 
     dark:border-ink-500 dark:bg-ink-800 dark:text-newsprint-100"
```

**Lesson:**
1. **KISS principle: Keep It Simple, Stupid** - don't overcomplicate UI
2. **Maximum contrast wins** - black/white inversion beats fancy accent colors
3. **Don't add effects for the sake of effects** - rings/scales added complexity without benefit
4. **Test with actual users** - developer aesthetics ≠ user clarity
5. **Simple inversion is universally understood** - black on white / white on black
6. **Listen to user feedback** - they said "it's too simple" and they were RIGHT

**Why This Works:**
- Black and white have the highest possible contrast ratio (21:1)
- No ambiguity - user instantly sees the difference
- Works perfectly in both light and dark themes
- No CSS conflicts or specificity issues
- Clean, professional, accessible

**Related Files:**
- src/components/StyleSelector.jsx (Final simple fix)

---

**Last Updated:** 2026-01-04
