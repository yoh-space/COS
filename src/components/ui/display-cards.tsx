"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  onClick?: () => void;
  index?: number;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-white" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  onClick,
  index = 0,
}: DisplayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden",
        "h-[200px] w-full rounded-2xl",
        "bg-gradient-to-br from-white via-white to-gray-50",
        "dark:from-gray-800 dark:via-gray-800 dark:to-gray-900",
        "border border-gray-200/60 dark:border-gray-700/60",
        "shadow-lg shadow-gray-200/40 dark:shadow-black/20",
        "hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/10",
        "hover:border-primary/40 dark:hover:border-primary/40",
        "transition-all duration-500 ease-out",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 blur-sm" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full p-5">
        {/* Header with icon and title */}
        <div className="flex items-start gap-3 mb-3">
          <div className={cn(
            "flex items-center justify-center",
            "w-10 h-10 rounded-xl",
            "bg-gradient-to-br from-primary to-primary/80",
            "shadow-lg shadow-primary/30",
            "group-hover:shadow-primary/50 group-hover:scale-110",
            "transition-all duration-300"
          )}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-base font-semibold leading-tight",
              "text-gray-900 dark:text-white",
              "group-hover:text-primary dark:group-hover:text-primary",
              "transition-colors duration-300",
              titleClassName
            )}>
              {title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {date}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="flex-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Bottom action hint */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50">
          <span className="text-xs font-medium text-primary/70 group-hover:text-primary transition-colors duration-300">
            Click to learn more
          </span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary/70 transition-colors duration-300 delay-75" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors duration-300 delay-150" />
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:from-primary/20 transition-all duration-500" />
      <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-xl group-hover:from-primary/15 transition-all duration-500" />
    </motion.div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    { title: "Featured 1", description: "Amazing content awaits" },
    { title: "Featured 2", description: "Discover more" },
    { title: "Featured 3", description: "Explore now" },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 w-full">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} index={index} />
      ))}
    </div>
  );
}
