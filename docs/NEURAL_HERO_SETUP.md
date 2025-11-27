# Neural Network Hero Setup Guide

## ✅ Setup Complete

Your Next.js project has been successfully updated with the new neural network hero component while preserving the YoTech brand identity.

## What Was Done

### 1. Dependencies Installed
The following packages were added via pnpm:
- `gsap` - Animation library
- `three` - 3D graphics library
- `@gsap/react` - GSAP React integration
- `@react-three/drei` - React Three Fiber helpers
- `@react-three/fiber` - React renderer for Three.js

### 2. Component Created
- **Location**: `src/components/ui/neural-network-hero.tsx`
- **Features**:
  - Custom CPPN shader for animated neural network background
  - GSAP-powered text animations with blur and stagger effects
  - Fully responsive design
  - TypeScript support
  - Customizable props for title, description, badges, CTA buttons, and micro-details

### 3. Hero Component Updated
- **Location**: `src/components/Hero/index.tsx`
- **Changes**: Replaced the old hero with the new neural network hero
- **Brand Preserved**: 
  - Title: "Innovative Digital Solutions for Your Business Growth"
  - Description: YoTech's original brand message
  - CTAs: "Get In Touch" and "Explore More"
  - Badge: "YoTech" with "Digital Innovation"

## Project Structure

Your project already has the correct shadcn structure:
- ✅ TypeScript configured
- ✅ Tailwind CSS configured
- ✅ Components path: `src/components/ui/` (shadcn standard)
- ✅ Path aliases: `@/*` points to `src/*`

## Why `/components/ui` Matters

The `/components/ui` folder is the shadcn convention for:
1. **Reusable UI components** - Keeps design system components organized
2. **Easy imports** - Consistent import paths across the project
3. **shadcn CLI compatibility** - Future shadcn components will be added here
4. **Separation of concerns** - UI primitives separate from feature components

## Usage Example

```tsx
import NeuralNetworkHero from "@/components/ui/neural-network-hero";

export default function Page() {
  return (
    <NeuralNetworkHero
      title="Your Custom Title"
      description="Your custom description"
      badgeText="Custom Badge"
      badgeLabel="Label"
      ctaButtons={[
        { text: "Primary CTA", href: "#link", primary: true },
        { text: "Secondary CTA", href: "#link2" }
      ]}
      microDetails={["Detail 1", "Detail 2", "Detail 3"]}
    />
  );
}
```

## Testing

Run your development server to see the new hero in action:

```bash
pnpm dev
```

Visit `http://localhost:3000` to see the animated neural network hero with your YoTech branding.

## Notes

- The component uses `'use client'` directive for client-side rendering
- GSAP SplitText plugin is used for advanced text animations
- The shader creates a generative art background that animates over time
- All animations are optimized for performance with GSAP

## Customization

You can customize the hero by modifying the props in `src/components/Hero/index.tsx`:
- Change colors in the shader
- Adjust animation timings in GSAP
- Modify layout and spacing with Tailwind classes
- Update content to match your brand
