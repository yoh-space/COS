"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  stats?: Array<{ value: string; label: string }>;
  backgroundImages: string[];
}

function Hero({
  title = "College of Science",
  subtitle = "Bahir Dar University",
  description = "Advancing knowledge and innovation in natural sciences. Excellence in education, research, and community service.",
  primaryCTA = { text: "Contact us", href: "/contact" },
  secondaryCTA = { text: "Explore Programs", href: "/academics" },
  stats = [
    { value: "5000+", label: "Students" },
    { value: "200+", label: "Faculty" },
    { value: "15+", label: "Programs" },
  ],
  backgroundImages = ["/images/hero/wisdom-building.jpeg"],
}: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (backgroundImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 via-black/20 to-transparent dark:from-black/60 dark:via-black/30 z-30 pointer-events-none" />

      <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-white dark:bg-slate-900">
        {/* Background Images */}
        <div className="absolute inset-0">
          {backgroundImages.map((img, index) => (
            <Image
              key={img}
              src={img}
              alt="Bahir Dar University College of Science"
              fill
              priority={index === 0}
              quality={85}
              className={`object-cover transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
          {/* Overlay Gradient - Enhanced for Light Theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 via-slate-800/20 to-transparent dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent dark:from-slate-900/60" />
        </div>

        {/* Content Container */}
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div
            ref={contentRef}
            className={`max-w-3xl transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            {/* Badge */}
            <div
              className={`mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/15 dark:border-blue-400/30 dark:bg-blue-500/10 px-4 py-2 backdrop-blur-sm transition-all delay-200 duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500 dark:bg-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-100">{subtitle}</span>
            </div>

            {/* Main Title */}
            <h1
              className={`mb-6 text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-7xl transition-all delay-300 duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              className={`mb-8 text-base leading-relaxed text-white/95 drop-shadow-md sm:text-lg lg:text-xl transition-all delay-500 duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              {description}
            </p>

            {/* CTA Buttons */}
            <div
              className={`mb-12 flex flex-wrap gap-4 transition-all delay-700 duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              <Link
                href={primaryCTA.href}
                className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105"
              >
                {primaryCTA.text}
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white/80 dark:border-white/30 dark:bg-white/10 px-8 py-4 font-semibold text-slate-900 dark:text-white backdrop-blur-sm transition-all hover:bg-white dark:hover:bg-white/20 hover:border-slate-400 dark:hover:border-white/50"
              >
                {secondaryCTA.text}
              </Link>
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div
                className={`flex flex-wrap gap-8 border-t border-slate-300 dark:border-white/20 pt-8 transition-all delay-900 duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all delay-1000 duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-slate-600 dark:text-slate-300">Scroll to explore</span>
            <div className="h-8 w-5 rounded-full border-2 border-slate-400 dark:border-white/30 p-1">
              <div className="h-2 w-1 animate-bounce rounded-full bg-slate-600 dark:bg-white/60" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HeroSection() {
  return (
    <Hero
      title="College of Science"
      subtitle="Bahir Dar University"
      description="Advancing knowledge and innovation in natural sciences. Excellence in education, research, and community service."
      primaryCTA={{ text: "Contact Us", href: "/contact" }}
      secondaryCTA={{ text: "Explore Programs", href: "#programs" }}
      stats={[
        { value: "5000+", label: "Students" },
        { value: "200+", label: "Faculty" },
        { value: "15+", label: "Programs" },
      ]}
      backgroundImages={[
        "/images/hero/wisdom-building.jpeg",
        "/images/hero/peda-campus.jpeg",
        "/images/hero/peda-campus2.jpeg",
      ]}
    />
  );
}
