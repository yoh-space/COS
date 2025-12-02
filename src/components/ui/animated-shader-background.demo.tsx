"use client";

import AnoAI from "@/components/ui/animated-shader-background";
import { Sparkles, Zap, Layers } from "lucide-react";

export default function AnimatedShaderDemo() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Shader Background */}
      <AnoAI
        colorA="#0f172a"
        colorB="#1e40af"
        colorC="#3b82f6"
        opacity={1}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/90">
            Animated Shader Background
          </span>
        </div>

        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
          Dynamic WebGL Shader Animation
        </h1>

        <p className="mb-8 max-w-xl text-lg text-white/80">
          A performant Three.js shader background with flowing noise patterns,
          customizable colors, and smooth animations.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg transition-all hover:bg-white/90 hover:shadow-xl">
            <Zap className="h-4 w-4" />
            Get Started
          </button>
          <button className="flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20">
            <Layers className="h-4 w-4" />
            View Docs
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              title: "Performant",
              description: "GPU-accelerated WebGL rendering with optimized shaders",
              icon: <Zap className="h-5 w-5" />,
            },
            {
              title: "Customizable",
              description: "Easily adjust colors, opacity, and blend modes",
              icon: <Layers className="h-5 w-5" />,
            },
            {
              title: "Responsive",
              description: "Automatically adapts to any screen size",
              icon: <Sparkles className="h-5 w-5" />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10"
            >
              <div className="mb-3 inline-flex rounded-lg bg-blue-500/20 p-2 text-blue-400">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
