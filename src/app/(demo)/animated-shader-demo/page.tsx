"use client";

import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues with Three.js
const AnimatedShaderDemo = dynamic(
  () => import("@/components/ui/animated-shader-background.demo"),
  { ssr: false }
);

export default function AnimatedShaderDemoPage() {
  return <AnimatedShaderDemo />;
}
