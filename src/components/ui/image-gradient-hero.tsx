"use client";

import { useRef, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import dynamic from "next/dynamic";

gsap.registerPlugin(SplitText, useGSAP);

// Dynamically import shader to avoid SSR issues
const AnoAI = dynamic(() => import("@/components/ui/animated-shader-background"), {
  ssr: false,
  loading: () => null,
});

interface HeroProps {
  title: string;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href: string; primary?: boolean }>;
  microDetails?: Array<string>;
  backgroundImage?: string;
  shaderColors?: {
    colorA?: string;
    colorB?: string;
    colorC?: string;
  };
  shaderOpacity?: number;
}

export default function ImageGradientHero({
  title,
  description,
  badgeText = "Academic Excellence",
  badgeLabel = "BDU College of Science",
  ctaButtons = [
    { text: "Get started", href: "#get-started", primary: true },
    { text: "View showcase", href: "#showcase" },
  ],
  microDetails = ["World-class education", "Cutting-edge research", "Academic excellence"],
  backgroundImage = "/images/hero/wisdom-building.jpeg",
  shaderColors = {
    colorA: "#0f172a",
    colorB: "#1e40af", 
    colorC: "#3b82f6",
  },
  shaderOpacity = 0.4,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const microRef = useRef<HTMLUListElement | null>(null);
  const microItem1Ref = useRef<HTMLLIElement | null>(null);
  const microItem2Ref = useRef<HTMLLIElement | null>(null);
  const microItem3Ref = useRef<HTMLLIElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(headerRef.current!, {
          type: "lines",
          wordsClass: "lines",
        });

        gsap.set(split.lines, {
          filter: "blur(16px)",
          yPercent: 30,
          autoAlpha: 0,
          scale: 1.06,
          transformOrigin: "50% 100%",
        });

        if (badgeRef.current) {
          gsap.set(badgeRef.current, { autoAlpha: 0, y: -8 });
        }
        if (paraRef.current) {
          gsap.set(paraRef.current, { autoAlpha: 0, y: 8 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
        }

        const microItems = [
          microItem1Ref.current,
          microItem2Ref.current,
          microItem3Ref.current,
        ].filter(Boolean);
        if (microItems.length > 0) {
          gsap.set(microItems, { autoAlpha: 0, y: 6 });
        }

        if (imageRef.current) {
          gsap.set(imageRef.current, { scale: 1.1, autoAlpha: 0 });
        }

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        if (imageRef.current) {
          tl.to(
            imageRef.current,
            { scale: 1, autoAlpha: 1, duration: 1.2 },
            0
          );
        }

        if (badgeRef.current) {
          tl.to(badgeRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.3);
        }

        tl.to(
          split.lines,
          {
            filter: "blur(0px)",
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
          },
          0.4
        );

        if (paraRef.current) {
          tl.to(
            paraRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.55"
          );
        }
        if (ctaRef.current) {
          tl.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35");
        }
        if (microItems.length > 0) {
          tl.to(
            microItems,
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
            "-=0.25"
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-screen overflow-hidden"
    >
      {/* Background Image Layer */}
      <div
        ref={imageRef}
        className="absolute inset-0 -z-20 h-full w-full"
        aria-hidden
      >
        <Image
          src={backgroundImage}
          alt="College of Science Building"
          fill
          priority
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Left Side Blur Overlay - Behind text area */}
      <div 
        className="absolute inset-y-0 left-0 w-full md:w-2/3 lg:w-1/2 -z-15"
        aria-hidden
      >
        {/* Blur layer */}
        <div 
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage: "linear-gradient(to right, black 0%, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 60%, transparent 100%)",
          }}
        />
        {/* Gradient overlay on blur */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(15, 23, 42, 0.85) 0%, rgba(30, 64, 175, 0.6) 50%, transparent 100%)",
            maskImage: "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Animated Shader Overlay */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 -z-10" aria-hidden>
          <AnoAI
            colorA={shaderColors.colorA}
            colorB={shaderColors.colorB}
            colorC={shaderColors.colorC}
            opacity={shaderOpacity}
            blendMode="overlay"
          />
        </div>
      </Suspense>

      {/* Base Gradient Overlays */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {/* Primary gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(37, 99, 235, 0.7) 0%, rgba(26, 22, 109, 0.5) 50%, rgba(14, 15, 43, 0.3) 100%)",
          }}
        />
        {/* Left side darkening for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.3) 40%, transparent 70%)",
          }}
        />
        {/* Top gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        {/* Bottom gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Diagonal Accent Shape - Right side */}
      <div
        className="absolute right-0 top-0 -z-5 h-full w-1/2 opacity-20"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(251, 176, 64, 0.4) 50%, rgba(251, 176, 64, 0.6) 100%)",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      {/* Animated particles/dots overlay */}
      <div className="absolute inset-0 -z-5 overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse delay-300" />
        <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-white/15 rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-amber-400/20 rounded-full animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 pb-24 pt-36 sm:gap-8 sm:pt-44 md:px-10 lg:px-16">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/90">
            {badgeLabel}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/60" />
          <span className="text-xs font-medium tracking-tight text-white">
            {badgeText}
          </span>
        </div>

        <h1
          ref={headerRef}
          className="max-w-2xl text-left text-5xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl"
        >
          {title}
        </h1>

        <p
          ref={paraRef}
          className="max-w-xl text-left text-base font-normal leading-relaxed tracking-normal text-white/95 drop-shadow-md sm:text-lg"
        >
          {description}
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-2">
          {ctaButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`rounded-lg px-6 py-3 text-sm font-semibold tracking-tight shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                button.primary
                  ? "bg-white text-blue-600 hover:bg-white/90 hover:shadow-xl"
                  : "border-2 border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              }`}
            >
              {button.text}
            </a>
          ))}
        </div>

        <ul
          ref={microRef}
          className="mt-8 flex flex-wrap gap-6 text-xs font-medium tracking-tight text-white/90"
        >
          {microDetails.map((detail, index) => {
            const refMap = [microItem1Ref, microItem2Ref, microItem3Ref];
            return (
              <li
                key={index}
                ref={refMap[index]}
                className="flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />{" "}
                {detail}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
  );
}
