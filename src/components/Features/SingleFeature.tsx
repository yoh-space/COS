"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Feature } from "@/types/feature";
import { ChevronRight } from "lucide-react";

interface SingleFeatureProps {
  feature: Feature;
  index?: number;
  color?: string;
  bgColor?: string;
  shadowColor?: string;
}

const SingleFeature = ({ 
  feature, 
  index = 0,
  color = "from-blue-500 to-indigo-600",
  bgColor = "bg-blue-500/10",
  shadowColor = "shadow-blue-500/20"
}: SingleFeatureProps) => {
  const { icon, title, paragraph } = feature;
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
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      <div className={`
        relative h-full p-6 lg:p-8 rounded-2xl
        bg-slate-800/50 backdrop-blur-sm
        border border-white/5
        shadow-xl ${shadowColor}
        hover:shadow-2xl
        hover:border-white/10
        transition-all duration-500 ease-out
        overflow-hidden
      `}>
        {/* Gradient overlay on hover */}
        <div className={`
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        `}>
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-10`} />
        </div>

        {/* Animated background glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${color} rounded-full blur-3xl opacity-0 group-hover:opacity-20`}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`
              flex items-center justify-center w-14 h-14 rounded-xl mb-6
              bg-gradient-to-br ${color}
              shadow-lg ${shadowColor}
              text-white
            `}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-300">
            {paragraph}
          </p>

          {/* Learn More Link */}
          <div className="flex items-center text-sm font-medium">
            <span className={`
              text-transparent bg-clip-text bg-gradient-to-r ${color}
              group-hover:opacity-100 opacity-70 transition-opacity duration-300
            `}>
              Learn more
            </span>
            <ChevronRight className={`
              w-4 h-4 ml-1 transition-all duration-300
              text-slate-500 group-hover:text-white group-hover:translate-x-1
            `} />
          </div>
        </div>

        {/* Bottom gradient line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} origin-left opacity-0 group-hover:opacity-100`}
        />

        {/* Corner decoration */}
        <div className={`
          absolute -bottom-8 -right-8 w-24 h-24 rounded-full
          bg-gradient-to-br ${color} opacity-5
          group-hover:opacity-10 group-hover:scale-150
          transition-all duration-700
        `} />
      </div>
    </motion.div>
  );
};

export default SingleFeature;
