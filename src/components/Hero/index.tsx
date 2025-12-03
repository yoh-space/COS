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
  backgroundImage: string;
}

export default function Hero({
  title = "College of Science",
  subtitle = "Bahir Dar University",
  description = "Advancing knowledge and innovation in natural sciences. Excellence in education, research, and community service.",
  primaryCTA = { text: "Apply Now", href: "/admissions" },
  secondaryCTA = { text: "Explore Programs", href: "/programs" },
  stats = [
    { value: "5000+", label: "Students" },
    { value: "200+", label: "Faculty" },
    { value: "15+", label: "Programs" },
  ],
  backgroundImage = "/images/hero/wisdom-building.jpeg",
}: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Bahir Dar University College of Science"
          fill
          priority
          quality={85}
          className="object-cover"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className={`max-w-3xl transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Badge */}
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm transition-all delay-200 duration-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
            <span className="text-sm font-medium text-blue-100">{subtitle}</span>
          </div>

          {/* Main Title */}
          <h1
            className={`mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl transition-all delay-300 duration-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={`mb-8 text-lg leading-relaxed text-slate-200 sm:text-xl transition-all delay-500 duration-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {description}
          </p>

          {/* CTA Buttons */}
          <div
            className={`mb-12 flex flex-wrap gap-4 transition-all delay-700 duration-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
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
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
            >
              {secondaryCTA.text}
            </Link>
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div
              className={`flex flex-wrap gap-8 border-t border-white/20 pt-8 transition-all delay-900 duration-700 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-3xl font-bold text-white sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-sm text-slate-300">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all delay-1000 duration-700 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-300">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border-2 border-white/30 p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
