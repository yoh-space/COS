# Color Theme System Documentation

## Overview

This application uses a centralized color theme system that allows easy customization of the entire app's color scheme. Admins and users can switch between predefined themes or customize colors through CSS variables.

## Architecture

### 1. Theme Context (`src/contexts/ThemeContext.tsx`)

The core of the theme system. It provides:
- **ColorThemeProvider**: React context provider that manages theme state
- **useColorTheme**: Hook to access and modify the current theme
- **colorThemes**: Predefined theme configurations

### 2. CSS Variables (`src/styles/index.css`)

All theme colors are defined as CSS variables:

```css
--theme-primary: #4a6cf7
--theme-primary-light: #6b8aff
--theme-primary-dark: #3451d9
--theme-secondary: #6366f1
--theme-secondary-light: #818cf8
--theme-secondary-dark: #4f46e5
--theme-accent: #3b82f6
--theme-accent-light: #60a5fa
--theme-success: #10b981
--theme-warning: #f59e0b
--theme-error: #ef4444
--theme-info: #3b82f6
--theme-gradient-primary: linear-gradient(...)
--theme-gradient-secondary: linear-gradient(...)
--theme-gradient-accent: linear-gradient(...)
--theme-gradient-hero: linear-gradient(...)
```

### 3. Tailwind Integration (`tailwind.config.js`)

Theme colors are integrated into Tailwind CSS:

```javascript
colors: {
  theme: {
    primary: "var(--theme-primary)",
    "primary-light": "var(--theme-primary-light)",
    // ... more colors
  }
}
```

## Available Themes

1. **Blue** (Default)
   - Primary: #4a6cf7
   - Professional and trustworthy

2. **Purple**
   - Primary: #8b5cf6
   - Creative and modern

3. **Green**
   - Primary: #10b981
   - Fresh and eco-friendly

4. **Orange**
   - Primary: #f97316
   - Energetic and warm

5. **Teal**
   - Primary: #14b8a6
   - Calm and sophisticated

## Usage

### Using Theme Colors in Components

#### Method 1: Tailwind Classes
```tsx
<div className="bg-theme-primary text-white">
  Content
</div>
```

#### Method 2: Inline Styles (Recommended for dynamic colors)
```tsx
<div style={{ backgroundColor: "var(--theme-primary)" }}>
  Content
</div>
```

#### Method 3: Gradients
```tsx
<div style={{ background: "var(--theme-gradient-hero)" }}>
  Content
</div>
```

#### Method 4: Color Mixing (for transparency)
```tsx
<div style={{
  backgroundColor: "color-mix(in srgb, var(--theme-primary) 15%, transparent)"
}}>
  Content
</div>
```

### Accessing Theme in JavaScript

```tsx
import { useColorTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { colorTheme, setColorTheme, currentThemeName } = useColorTheme();
  
  return (
    <div>
      <p>Current theme: {currentThemeName}</p>
      <button onClick={() => setColorTheme('purple')}>
        Switch to Purple
      </button>
    </div>
  );
}
```

## Theme Switcher Component

A floating button (`ThemeSwitcher`) is available in the bottom-right corner of the app. It allows users to:
- View all available themes
- Switch between themes with a single click
- See the currently active theme

## Adding a New Theme

1. Open `src/contexts/ThemeContext.tsx`
2. Add a new theme to the `colorThemes` object:

```typescript
export const colorThemes: Record<string, ColorTheme> = {
  // ... existing themes
  red: {
    name: 'Red',
    colors: {
      primary: '#ef4444',
      primaryLight: '#f87171',
      primaryDark: '#dc2626',
      secondary: '#f43f5e',
      secondaryLight: '#fb7185',
      secondaryDark: '#e11d48',
      accent: '#ec4899',
      accentLight: '#f472b6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      secondary: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
      accent: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      hero: 'linear-gradient(135deg, #ef4444 0%, #f43f5e 50%, #ec4899 100%)',
    },
  },
};
```

3. Add the theme color to `ThemeSwitcher.tsx`:

```typescript
const themeColors: Record<string, string> = {
  // ... existing colors
  red: "#ef4444",
};
```

## Customizing Theme Colors

### For Developers

Edit the CSS variables in `src/styles/index.css`:

```css
:root {
  --theme-primary: #your-color;
  --theme-gradient-hero: linear-gradient(...);
}
```

### For Admins (Future Enhancement)

Create an admin panel that:
1. Allows color picker input for each theme variable
2. Saves custom colors to database or localStorage
3. Applies colors dynamically using the `applyThemeToDOM` function

## Best Practices

1. **Always use theme variables** instead of hardcoded colors
2. **Use inline styles** for dynamic theme colors (better than Tailwind for theme switching)
3. **Test in both light and dark modes** when adding new themed components
4. **Use color-mix()** for creating transparent variations
5. **Maintain contrast ratios** for accessibility (WCAG AA: 4.5:1 for text)

## Migration Guide

To convert existing hardcoded colors to theme colors:

### Before:
```tsx
<div className="bg-blue-600 text-white">
  Content
</div>
```

### After:
```tsx
<div 
  className="text-white"
  style={{ backgroundColor: "var(--theme-primary)" }}
>
  Content
</div>
```

### Before (gradient):
```tsx
<div className="bg-gradient-to-r from-blue-600 to-indigo-600">
  Content
</div>
```

### After:
```tsx
<div style={{ background: "var(--theme-gradient-hero)" }}>
  Content
</div>
```

## Troubleshooting

### Theme not applying
- Ensure `ColorThemeProvider` is wrapping your app in `providers.tsx`
- Check browser console for errors
- Clear localStorage and refresh

### Colors not updating
- Make sure you're using CSS variables, not hardcoded values
- Check if the component is inside the provider
- Verify the CSS variable name is correct

### Dark mode issues
- Test theme colors in both light and dark modes
- Use appropriate contrast for dark backgrounds
- Consider using `dark:` variants for additional customization

## Performance

- Theme switching is instant (no page reload required)
- Theme preference is saved to localStorage
- CSS variables are highly performant
- No runtime CSS generation

## Future Enhancements

1. **Admin Dashboard**: Visual theme editor with color pickers
2. **Custom Themes**: Allow users to create and save custom themes
3. **Theme Presets**: More predefined themes (dark variants, high contrast, etc.)
4. **Per-Page Themes**: Different themes for different sections
5. **Theme Scheduling**: Auto-switch themes based on time of day
6. **Export/Import**: Share theme configurations
