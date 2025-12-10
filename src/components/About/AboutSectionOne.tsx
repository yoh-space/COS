"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { 
  GraduationCap, 
  FlaskConical, 
  Microscope, 
  Users, 
  Globe, 
  Heart,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Sparkles
} from "lucide-react";

// Dynamically import Lottie for better performance
const Lottie = dynamic(() => import("lottie-react"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-200 dark:bg-slate-800/50 rounded-2xl animate-pulse" />
  )
});

// Import animations
import ratingAnimation from "../../../public/images/lottie/rating.json";
import Visa from "../../../public/images/lottie/Visa.json";

const features = [
  { icon: GraduationCap, text: "World-class faculty", color: "from-blue-500 to-blue-600" },
  { icon: FlaskConical, text: "State-of-the-art laboratories", color: "from-emerald-500 to-emerald-600" },
  { icon: Microscope, text: "Cutting-edge research", color: "from-purple-500 to-purple-600" },
  { icon: Briefcase, text: "Industry partnerships", color: "from-amber-500 to-amber-600" },
  { icon: Globe, text: "International collaborations", color: "from-cyan-500 to-cyan-600" },
  { icon: Heart, text: "Community engagement", color: "from-rose-500 to-rose-600" },
  { icon: BookOpen, text: "Quality education", color: "from-indigo-500 to-indigo-600" },
  { icon: Users, text: "Career development", color: "from-teal-500 to-teal-600" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const FeatureItem = ({ 
  icon: Icon, 
  text, 
  color, 
  index 
}: { 
  icon: typeof GraduationCap; 
  text: string; 
  color: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
    >
      <div className={`
        relative flex items-center justify-center w-12 h-12 rounded-xl
        bg-gradient-to-br ${color} shadow-lg
        group-hover:scale-110 group-hover:shadow-xl
        transition-all duration-300
      `}>
        <Icon className="w-5 h-5 text-white" />
        <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="text-base font-medium text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
        {text}
      </span>
      <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

const AboutSectionOne = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-white dark:bg-slate-900"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">About Us</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Excellence in Science{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Education & Research
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-slate-400 mb-8 leading-relaxed"
            >
              Bahir Dar University College of Science is committed to advancing scientific 
              knowledge through world-class education, cutting-edge research, and community engagement.
            </motion.p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-2 mb-8">
              {features.map((feature, index) => (
                <FeatureItem
                  key={feature.text}
                  icon={feature.icon}
                  text={feature.text}
                  color={feature.color}
                  index={index}
                />
              ))}
            </div>

            {/* Stats Banner */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-white/10"
            >
              <div className="flex-shrink-0 w-16 h-16">
                <Lottie animationData={ratingAnimation} loop />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">1000+ Students Annually</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">Across 6 departments of excellence</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 relative"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative bg-gray-100 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-white/10">
              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-lg"
              >
                <span className="text-sm font-semibold text-white">Top Rated</span>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg"
              >
                <span className="text-sm font-semibold text-white">Since 1963</span>
              </motion.div>

              <Lottie 
                animationData={Visa} 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent origin-center"
        />
      </div>
    </section>
  );
};

export default AboutSectionOne;
