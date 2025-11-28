# Spotlight Cursor Effect

A modern, lightweight cursor spotlight effect that follows the user's mouse movement with a soft glowing effect.

## Features

✅ **Smooth Animation**: Uses requestAnimationFrame with linear interpolation (lerp) for buttery-smooth following
✅ **Performance Optimized**: Passive event listeners, will-change CSS property, no expensive re-renders
✅ **Theme Aware**: Different colors for light and dark modes
✅ **Non-Intrusive**: pointer-events: none ensures no interference with click events
✅ **Mobile Friendly**: Automatically hidden on touch devices
✅ **Production Ready**: Clean, modular, TypeScript-based implementation

## Implementation

### Component Location
`src/components/SpotlightCursor.tsx`

### Styling
Added to `src/styles/index.css`

### Integration
Integrated globally in `src/app/layout.tsx`

## Customization

### Adjust Spotlight Size
In `src/styles/index.css`, modify the width/height:
```css
.spotlight-cursor {
  width: 500px;  /* Change this */
  height: 500px; /* Change this */
  margin-left: -250px;  /* Half of width */
  margin-top: -250px;   /* Half of height */
}
```

### Adjust Colors
Modify the radial-gradient colors:
```css
background: radial-gradient(
  circle at center,
  rgba(74, 108, 247, 0.15) 0%,    /* Center color */
  rgba(74, 108, 247, 0.08) 25%,   /* Mid color */
  rgba(74, 108, 247, 0.03) 50%,   /* Outer color */
  transparent 70%                  /* Fade out */
);
```

### Adjust Follow Speed
In `src/components/SpotlightCursor.tsx`, modify the ease value:
```typescript
const ease = 0.15; // Lower = slower, Higher = faster (0.01 - 1.0)
```

### Change Blend Mode
In `src/styles/index.css`:
```css
mix-blend-mode: screen;  /* Try: lighten, overlay, soft-light, etc. */
```

## Performance Notes

- Uses `requestAnimationFrame` for optimal 60fps animation
- Passive event listeners prevent scroll jank
- `will-change: transform` hints browser for GPU acceleration
- Automatically disabled on touch devices to save resources
- No React re-renders - pure DOM manipulation

## Browser Support

Works in all modern browsers that support:
- CSS mix-blend-mode
- requestAnimationFrame
- CSS transforms

Gracefully degrades on older browsers (effect simply won't show).
