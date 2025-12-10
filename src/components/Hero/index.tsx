"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedStatCard } from "@/components/ui/animated-counter";
import { HeroLoader, HeroSkeleton } from "@/components/ui/hero-loader";

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
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const promises = backgroundImages.map((src) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
      setIsLoading(false);
    };
    loadImages();
  }, [backgroundImages]);

  // Image carousel
  useEffect(() => {
    if (backgroundImages.length <= 1 || !showContent) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length, showContent]);

  const handleLoadComplete = () => {
    setShowContent(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <>
      {/* Modern Loading Screen */}
      <HeroLoader 
        isLoading={isLoading} 
        onLoadComplete={handleLoadComplete}
        minDuration={1800}
      />

      {/* Header gradient overlay */}
      <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 via-black/20 to-transparent dark:from-black/60 dark:via-black/30 z-30 pointer-events-none" />

      <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-slate-900">
        {/* Background Images with smooth transitions */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {backgroundImages.map((img, index) => (
              index === currentImageIndex && (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={img}
                    alt="Bahir Dar University College of Science"
                    fill
                    priority={index === 0}
                    quality={85}
                    className="object-cover"
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
          
          {/* Animated gradient overlay */}
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
        </div>

        {/* Content Container */}
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!showContent ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl"
              >
                <HeroSkeleton />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                ref={contentRef}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-3xl"
              >
                {/* Badge */}
                <motion.div
                  variants={itemVariants}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/15 px-4 py-2 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-blue-500"
                  />
                  <span className="text-sm font-medium text-blue-100">{subtitle}</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  variants={itemVariants}
                  className="mb-6 text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-7xl"
                >
                  {title.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                      className="inline-block mr-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  className="mb-8 text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl"
                >
                  {description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="mb-12 flex flex-wrap gap-4">
                  <Link
                    href={primaryCTA.href}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-blue-500/25"
                  >
                    <span className="relative z-10">{primaryCTA.text}</span>
                    <svg
                      className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-blue-700"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                  <Link
                    href={secondaryCTA.href}
                    className="group inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
                  >
                    {secondaryCTA.text}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>

                {/* Animated Stats */}
                {stats && stats.length > 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Stats container with glass effect */}
                    <div className="flex flex-wrap gap-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:gap-12">
                      {stats.map((stat, index) => (
                        <AnimatedStatCard
                          key={index}
                          value={stat.value}
                          label={stat.label}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Image indicators */}
        {backgroundImages.length > 1 && showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-24 right-8 flex gap-2"
          >
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        )}

        {/* Scroll Indicator */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-slate-400">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-10 w-6 rounded-full border-2 border-white/30 p-1"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-2 w-2 rounded-full bg-white/60"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
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
        { value: "200+", label: "Faculty Members" },
        { value: "15+", label: "Academic Programs" },
        { value: "50+", label: "Research Projects" },
      ]}
      backgroundImages={[
        "/images/hero/wisdom-building.jpeg",
        "/images/hero/peda-campus.jpeg",
        "/images/hero/peda-campus2.jpeg",
      ]}
    />
  );
}
