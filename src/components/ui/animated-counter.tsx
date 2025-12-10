"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  decimals?: number;
  onComplete?: () => void;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  delay = 0,
  className = "",
  decimals = 0,
  onComplete,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasStarted, setHasStarted] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => {
    const formatted = decimals > 0 
      ? current.toFixed(decimals) 
      : Math.floor(current).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView && !hasStarted) {
      const timer = setTimeout(() => {
        setHasStarted(true);
        spring.set(value);
        if (onComplete) {
          setTimeout(onComplete, duration * 1000);
        }
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasStarted, value, spring, delay, duration, onComplete]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  index?: number;
  icon?: React.ReactNode;
}

export function AnimatedStatCard({ value, label, index = 0, icon }: StatCardProps) {
  // Parse the value to extract number and suffix
  const parseValue = (val: string): { number: number; suffix: string; prefix: string } => {
    const match = val.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (match) {
      return {
        prefix: match[1] || "",
        number: parseFloat(match[2]),
        suffix: match[3] || "",
      };
    }
    return { prefix: "", number: 0, suffix: val };
  };

  const { number, suffix, prefix } = parseValue(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative flex flex-col items-start"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <div className="relative flex items-baseline gap-1">
        {icon && (
          <span className="mr-2 text-blue-600 dark:text-blue-400">{icon}</span>
        )}
        <AnimatedCounter
          value={number}
          prefix={prefix}
          suffix={suffix}
          duration={2}
          delay={0.3 + index * 0.2}
          className="text-2xl font-bold text-gray-900 dark:text-white sm:text-4xl tabular-nums"
        />
      </div>
      
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
        className="text-sm text-gray-600 dark:text-slate-300 mt-1"
      >
        {label}
      </motion.span>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 + index * 0.2, duration: 0.6, ease: "easeOut" }}
        className="absolute -bottom-2 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-blue-600 dark:from-blue-500 to-blue-400/0"
      />
    </motion.div>
  );
}

export default AnimatedCounter;
