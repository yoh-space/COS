"use client";

import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

interface SingleTestimonialProps {
  testimonial: Testimonial;
  index?: number;
}

const SingleTestimonial = ({ testimonial, index = 0 }: SingleTestimonialProps) => {
  const { star, name, image, content, designation, url } = testimonial;
  const [isImageError, setIsImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="w-full group"
    >
      <div
        className={`
        relative h-full p-6 lg:p-8 rounded-2xl
        bg-white dark:bg-gray-800/80
        border border-gray-200/80 dark:border-gray-700/50
        shadow-lg shadow-gray-200/40 dark:shadow-black/20
        hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-primary/5
        hover:border-primary/30 dark:hover:border-primary/30
        transition-all duration-500 ease-out
        overflow-hidden
      `}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quote decoration */}
        <div className="absolute top-4 right-4 text-6xl font-serif text-primary/10 dark:text-primary/5 leading-none select-none">
          &ldquo;
        </div>

        <div className="relative z-10">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < star
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {star}.0
            </span>
          </div>

          {/* Content */}
          <p className="text-gray-700 dark:text-gray-300 text-base lg:text-lg leading-relaxed mb-6">
            {content}
          </p>

          {/* Author info */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-full opacity-60 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800">
                {isImageError ? (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg">
                    {name.charAt(0)}
                  </div>
                ) : (
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    onError={() => setIsImageError(true)}
                  />
                )}
              </div>
            </div>

            {/* Name and designation */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                {name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {designation}
              </p>
            </div>
          </div>

          {/* Project link */}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 pt-5 border-t border-gray-100 dark:border-gray-700/50 text-sm font-medium text-primary hover:gap-3 transition-all duration-300"
            >
              <span>View Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Decorative corner accent */}
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:from-primary/20 transition-all duration-500" />
      </div>
    </motion.div>
  );
};

export default SingleTestimonial;
