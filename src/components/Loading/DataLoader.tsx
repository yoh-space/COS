"use client";

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface DataLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizeMap = {
  sm: { width: '80px', height: '80px' },
  md: { width: '120px', height: '120px' },
  lg: { width: '180px', height: '180px' },
};

export default function DataLoader({ size = 'md', text = 'Loading...' }: DataLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (containerRef.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/images/lottie/loading.json',
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, []);

  const dimensions = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        ref={containerRef}
        style={{ width: dimensions.width, height: dimensions.height }}
      />
      {text && (
        <p className="mt-4 text-sm text-body-color dark:text-gray-400">{text}</p>
      )}
    </div>
  );
}
