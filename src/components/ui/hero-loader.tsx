"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroLoaderProps {
  isLoading: boolean;
  onLoadComplete?: () => void;
  minDuration?: number;
}

export function HeroLoader({ 
  isLoading, 
  onLoadComplete,
  minDuration = 1500 
}: HeroLoaderProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      // Animate progress to 100
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 5;
        });
      }, minDuration / 20);

      // Hide loader after minimum duration
      const timer = setTimeout(() => {
        setShowLoader(false);
        onLoadComplete?.();
      }, minDuration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else {
      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(progressInterval);
    }
  }, [isLoading, minDuration, onLoadComplete]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-900"
        >
          {/* Background gradient animation */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] bg-gradient-conic from-blue-500/10 via-transparent to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20"
            />
          </div>

          {/* Loader content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Animated logo/icon */}
            <div className="relative">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-500 dark:border-t-blue-500 dark:border-r-blue-400"
              />
              
              {/* Middle ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border-2 border-transparent border-b-blue-500 border-l-blue-400 dark:border-b-blue-400 dark:border-l-blue-300"
              />

              {/* Center icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30"
              >
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Text */}
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                College of Science
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-1 text-sm text-gray-600 dark:text-slate-400"
              >
                Bahir Dar University
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="w-48">
              <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-center text-xs text-gray-500 dark:text-slate-500"
              >
                Loading... {Math.round(progress)}%
              </motion.p>
            </div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                className="absolute h-1 w-1 rounded-full bg-blue-500/60 dark:bg-blue-400/60"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Skeleton loader for content - theme aware
export function HeroSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Badge skeleton */}
      <div className="mb-6 h-10 w-48 rounded-full bg-gray-300/50 dark:bg-slate-700/50" />
      
      {/* Title skeleton */}
      <div className="mb-6 space-y-3">
        <div className="h-12 w-3/4 rounded-lg bg-gray-300/50 dark:bg-slate-700/50" />
        <div className="h-12 w-1/2 rounded-lg bg-gray-300/50 dark:bg-slate-700/50" />
      </div>
      
      {/* Description skeleton */}
      <div className="mb-8 space-y-2">
        <div className="h-5 w-full rounded bg-gray-300/50 dark:bg-slate-700/50" />
        <div className="h-5 w-4/5 rounded bg-gray-300/50 dark:bg-slate-700/50" />
      </div>
      
      {/* Buttons skeleton */}
      <div className="mb-12 flex gap-4">
        <div className="h-14 w-36 rounded-lg bg-gray-300/50 dark:bg-slate-700/50" />
        <div className="h-14 w-40 rounded-lg bg-gray-300/50 dark:bg-slate-700/50" />
      </div>
      
      {/* Stats skeleton */}
      <div className="flex gap-8 rounded-xl border border-gray-200/50 dark:border-white/10 bg-gray-100/50 dark:bg-white/5 p-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-10 w-20 rounded bg-gray-300/50 dark:bg-slate-700/50" />
            <div className="h-4 w-16 rounded bg-gray-300/50 dark:bg-slate-700/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroLoader;
