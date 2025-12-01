"use client";

import { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
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

    // Hide loader when page is fully loaded
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black transition-opacity duration-300">
      <div className="flex flex-col items-center">
        <div
          ref={containerRef}
          style={{ width: '200px', height: '200px' }}
        />
        <p className="mt-2 text-sm text-body-color dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
