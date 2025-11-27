"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(SplitText, useGSAP);

interface HeroProps {
  title: string;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href: string; primary?: boolean }>;
  microDetails?: Array<string>;
  backgroundImage?: string;
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
  backgroundImage = "/images/hero/science-building.jpg",
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
      {/* Background Image with Gradient Overlay */}
      <div
        ref={imageRef}
        className="absolute inset-0 -z-10 h-full w-full"
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
        {/* Gradient Overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(26, 22, 109, 0.75) 50%, rgba(14, 15, 43, 0.65) 100%)",
          }}
        />
        <div className="pointer-events-none absolute dakrblue-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        <div className="pointer-events-none absolute navy-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* Diagonal Accent Shape */}
      <div
        className="absolute right-0 top-0 -z-5 h-full w-1/2 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(251, 176, 64, 0.4) 50%, rgba(251, 176, 64, 0.6) 100%)",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

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
