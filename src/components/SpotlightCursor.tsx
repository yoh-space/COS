"use client";

import { useEffect, useRef } from "react";

export default function SpotlightCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth animation with easing
    const animate = () => {
      // Lerp (linear interpolation) for smooth following
      const ease = 0.15;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      spotlight.style.transform = `translate(${currentX}px, ${currentY}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Add event listener
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    // Start animation loop
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="spotlight-cursor"
      aria-hidden="true"
    />
  );
}
