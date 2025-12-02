"use client";

import { forwardRef, ReactNode } from "react";

interface HeroOverlayProps {
  badge?: {
    label: string;
    text: string;
  };
  title: string;
  description: string;
  ctaButtons?: Array<{
    text: string;
    href: string;
    primary?: boolean;
    icon?: ReactNode;
  }>;
  microDetails?: string[];
  className?: string;
  refs?: {
    badge?: React.RefObject<HTMLDivElement>;
    title?: React.RefObject<HTMLHeadingElement>;
    description?: React.RefObject<HTMLParagraphElement>;
    cta?: React.RefObject<HTMLDivElement>;
    microItems?: React.RefObject<HTMLLIElement>[];
  };
}

const HeroOverlay = forwardRef<HTMLDivElement, HeroOverlayProps>(
  (
    {
      badge,
      title,
      description,
      ctaButtons = [],
      microDetails = [],
      className = "",
      refs,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 pb-24 pt-36 sm:gap-8 sm:pt-44 md:px-10 lg:px-16 ${className}`}
      >
        {/* Badge */}
        {badge && (
          <div
            ref={refs?.badge as React.RefObject<HTMLDivElement>}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/90">
              {badge.label}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/60" />
            <span className="text-xs font-medium tracking-tight text-white">
              {badge.text}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          ref={refs?.title as React.RefObject<HTMLHeadingElement>}
          className="max-w-2xl text-left text-5xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl"
        >
          {title}
        </h1>

        {/* Description */}
        <p
          ref={refs?.description as React.RefObject<HTMLParagraphElement>}
          className="max-w-xl text-left text-base font-normal leading-relaxed tracking-normal text-white/95 drop-shadow-md sm:text-lg"
        >
          {description}
        </p>

        {/* CTA Buttons */}
        {ctaButtons.length > 0 && (
          <div
            ref={refs?.cta as React.RefObject<HTMLDivElement>}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            {ctaButtons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-tight shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  button.primary
                    ? "bg-white text-blue-600 hover:bg-white/90 hover:shadow-xl"
                    : "border-2 border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                }`}
              >
                {button.icon}
                {button.text}
              </a>
            ))}
          </div>
        )}

        {/* Micro Details */}
        {microDetails.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-6 text-xs font-medium tracking-tight text-white/90">
            {microDetails.map((detail, index) => (
              <li
                key={index}
                ref={refs?.microItems?.[index] as React.RefObject<HTMLLIElement>}
                className="flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

HeroOverlay.displayName = "HeroOverlay";

export default HeroOverlay;
