"use client";

import { useState } from "react";
import { X, ExternalLink, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Testimonial } from "@/types/testimonial";

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TestimonialModal({ testimonial, isOpen, onClose }: TestimonialModalProps) {
  if (!testimonial) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Testimonial Details
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Client Info */}
                <div className="flex items-start gap-4 mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {testimonial.designation}
                    </p>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.star)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.star}/5
                      </span>
                    </div>
                  </div>
                </div>

                {/* Full Testimonial */}
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Review:
                  </h5>
                  <blockquote className="text-gray-900 dark:text-white text-base leading-relaxed italic border-l-4 border-blue-500 pl-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-r-lg">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                </div>

                {/* Project Link */}
                {testimonial.url && (
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div>
                      <h5 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                        View Project
                      </h5>
                      <p className="text-xs text-blue-700 dark:text-blue-400">
                        See the work we delivered for this client
                      </p>
                    </div>
                    <a
                      href={testimonial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Visit Project
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}