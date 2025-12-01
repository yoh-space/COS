"use client";

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

export default function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (containerRef.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/images/lottie/page-loading.json',
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
      <div
        ref={containerRef}
        style={{ width: '200px', height: '200px' }}
      />
    </div>
  );
}
