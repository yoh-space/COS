"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { 
  Beaker, 
  Globe2, 
  FileText, 
  ArrowRight,
  ChevronRight,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";

// Dynamically import Lottie for better performance
const Lottie = dynamic(() => import("lottie-react"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-200 dark:bg-slate-800/50 rounded-2xl animate-pulse" />
  )
});

import Learning from "../../../public/images/lottie/Learning.json";

const researchAreas = [
  {
    id: 1,
    icon: Beaker,
    title: "Cutting-Edge Facilities",
    description: "State-of-the-art laboratories equipped with modern instrumentation including GC-MS, ICP-OES, and advanced computing clusters for groundbreaking research.",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    stats: { value: "15+", label: "Research Labs" }
  },
  {
    id: 2,
    icon: Globe2,
    title: "International Collaboration",
    description: "Our faculty and students collaborate with leading universities and research institutions worldwide, contributing to global scientific advancement.",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    stats: { value: "30+", label: "Partner Universities" }
  },
  {
    id: 3,
    icon: FileText,
    title: "Impactful Publications",
    description: "Over 200+ annual publications in high-impact international journals, advancing knowledge in space science, environmental sustainability, and biotechnology.",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    stats: { value: "200+", label: "Annual Publications" }
  },
];

const ResearchCard = ({ 
  item, 
  index, 
  isActive, 
  onClick 
}: { 
  item: typeof researchAreas[0]; 
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onClick={onClick}
      className={`
        group relative p-6 rounded-2xl cursor-pointer
        transition-all duration-500 ease-out
        ${isActive 
          ? `${item.bgColor} border-2 ${item.borderColor} shadow-xl` 
          : 'bg-gray-100 dark:bg-slate-800/30 border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:border-gray-300 dark:hover:border-white/10'
        }
      `}
    >
      {/* Active indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full bg-gradient-to-b ${item.color}`}
          />
        )}
      </AnimatePresence>

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`
          flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl
          bg-gradient-to-br ${item.color} shadow-lg
          ${isActive ? 'scale-110' : 'group-hover:scale-105'}
          transition-transform duration-300
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`
              text-lg font-bold transition-colors duration-300
              ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-slate-200 group-hover:text-gray-900 dark:group-hover:text-white'}
            `}>
              {item.title}
            </h3>
            <ChevronRight className={`
              w-5 h-5 transition-all duration-300
              ${isActive 
                ? 'text-gray-900 dark:text-white rotate-90' 
                : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1'
              }
            `} />
          </div>
          
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 pt-3 border-t border-gray-200 dark:border-white/10">
                  <div className={`
                    px-3 py-1.5 rounded-lg bg-gradient-to-r ${item.color}
                  `}>
                    <span className="text-lg font-bold text-white">{item.stats.value}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-slate-400">{item.stats.label}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const AboutSectionTwo = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-gray-50 dark:bg-slate-900"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: -50 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Section header for mobile */}
            <div className="lg:hidden mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4"
              >
                <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Research & Innovation</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Advancing Scientific{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                  Knowledge
                </span>
              </motion.h2>
            </div>

            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-white/10 overflow-hidden shadow-lg dark:shadow-none">
              {/* Animated background gradient */}
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
              />

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg"
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-4 left-4 p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg"
              >
                <TrendingUp className="w-5 h-5 text-white" />
              </motion.div>

              <Lottie 
                animationData={Learning} 
                className="relative z-10 w-full max-w-md mx-auto"
              />
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 grid grid-cols-3 gap-4"
            >
              {[
                { value: "6", label: "Departments" },
                { value: "50+", label: "Researchers" },
                { value: "95%", label: "Success Rate" },
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1, type: "spring" }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-gray-600 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Research Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section header for desktop */}
            <div className="hidden lg:block mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4"
              >
                <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Research & Innovation</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
              >
                Advancing Scientific{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                  Knowledge
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg text-gray-600 dark:text-slate-400"
              >
                Cutting-edge research across chemistry, physics, biology, mathematics, and applied sciences.
              </motion.p>
            </div>

            {/* Research Cards */}
            <div className="space-y-4">
              {researchAreas.map((item, index) => (
                <ResearchCard
                  key={item.id}
                  item={item}
                  index={index}
                  isActive={activeCard === index}
                  onClick={() => setActiveCard(index)}
                />
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8"
            >
              <a
                href="/resources/publication"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
              >
                <span>Explore Our Research</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
