"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { extendedFeaturesData } from "./featuresData";
import { 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  Lightbulb
} from "lucide-react";

const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-gray-50 dark:bg-slate-900"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl"
        />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-blue-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Why Choose Us</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              College of Science
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Discover what makes Bahir Dar University College of Science a leading 
            institution for science education and research excellence in Ethiopia.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {extendedFeaturesData.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              isHovered={hoveredCard === feature.id}
              onHover={() => setHoveredCard(feature.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-white/5 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-gray-900 dark:text-white font-semibold">Ready to start your journey?</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">Join thousands of successful graduates</p>
              </div>
            </div>
            <Link
              href="/academics"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  feature: typeof extendedFeaturesData[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const FeatureCard = ({ feature, index, isHovered, onHover, onLeave }: FeatureCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative"
    >
      <div className={`
        relative h-full p-6 lg:p-8 rounded-2xl
        bg-white dark:bg-slate-800/50 
        backdrop-blur-sm
        border border-gray-200 dark:border-white/5
        shadow-lg shadow-gray-200/50 dark:shadow-none
        ${feature.shadowColor}
        ${feature.hoverShadow}
        hover:border-gray-300 dark:hover:border-white/10
        transition-all duration-500 ease-out
        overflow-hidden
      `}>
        {/* Gradient border on hover */}
        <div className={`
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        `}>
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-5 dark:opacity-10`} />
        </div>

        {/* Animated background glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHovered ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.color} rounded-full blur-3xl opacity-10 dark:opacity-20`}
        />

        <div className="relative z-10">
          {/* Icon and Stats Row */}
          <div className="flex items-start justify-between mb-6">
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className={`
                flex items-center justify-center w-14 h-14 rounded-xl
                bg-gradient-to-br ${feature.color}
                shadow-lg ${feature.shadowColor}
                text-white
              `}
            >
              {feature.icon}
            </motion.div>

            {/* Stats Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className={`
                px-3 py-1.5 rounded-lg 
                bg-gray-100 dark:bg-white/5
                border border-gray-200 dark:border-white/10
              `}
            >
              <span className="text-lg font-bold text-gray-900 dark:text-white">{feature.stats.value}</span>
              <span className="text-xs text-gray-600 dark:text-slate-400 ml-1">{feature.stats.label}</span>
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-slate-300 transition-all duration-300">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6 group-hover:text-gray-700 dark:group-hover:text-slate-300 transition-colors duration-300">
            {feature.paragraph}
          </p>

          {/* Learn More Link */}
          <div className="flex items-center text-sm font-medium">
            <span className={`
              text-transparent bg-clip-text bg-gradient-to-r ${feature.color}
              group-hover:opacity-100 opacity-70 transition-opacity duration-300
            `}>
              Learn more
            </span>
            <ChevronRight className={`
              w-4 h-4 ml-1 transition-all duration-300
              text-gray-400 dark:text-slate-500 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1
            `} />
          </div>
        </div>

        {/* Bottom gradient line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} origin-left`}
        />

        {/* Corner decoration */}
        <div className={`
          absolute -bottom-8 -right-8 w-24 h-24 rounded-full
          bg-gradient-to-br ${feature.color} opacity-5
          group-hover:opacity-10 group-hover:scale-150
          transition-all duration-700
        `} />
      </div>
    </motion.div>
  );
};

export default Features;
