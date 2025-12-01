"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import lottie, { AnimationItem } from 'lottie-web';

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    // Detect route change
    const currentPath = pathname + searchParams.toString();
    const prevPath = previousPath.current;
    
    if (currentPath !== prevPath) {
      setIsLoading(true);
      previousPath.current = currentPath;
      
      // Hide loader after a short delay (simulating page load)
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isLoading && containerRef.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/images/lottie/page-route-loading.json',
      });
    }

    if (!isLoading && animationRef.current) {
      animationRef.current.destroy();
      animationRef.current = null;
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div
        ref={containerRef}
        style={{ width: '150px', height: '150px' }}
      />
    </div>
  );
}
