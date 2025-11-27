"use client"
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import { useState } from "react";
import { useLottie } from "lottie-react";

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation, url } = testimonial;
  const [isImageError, setIsImageError] = useState(false);
  const options = {
    animationData: require('/public/images/lottie/rating.json'),
    loop: true,
    autoplay: true,
    style: { width: 150, height: 150 },
  };
  const { View } = useLottie(options);


  // Lottie rating animation
  // Only show the animation if star is 4 or 5, else fallback to text
  const showLottie = typeof window !== "undefined" && star >= 4;

  return (
    <div className="w-full group">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 lg:p-6 xl:p-8">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Quote icon */}
  <div className="absolute top-6 right-6 text-blue-100 dark:text-blue-900/30 text-5xl font-serif">&quot;</div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-1 mb-4">
            {showLottie ? (
              View
            ) : (
              <span className="text-yellow-400 text-xl font-bold">{star}★</span>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              {star}.0
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed font-light relative">
            <span className="absolute -left-4 text-blue-500 dark:text-blue-400 text-xl">&quot;</span>
            {content}
          </p>
          
          <div className="flex items-center">
            <div className="relative mr-5 h-14 w-14 flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full w-full overflow-hidden rounded-full p-0.5">
                {isImageError ? (
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                    {name.charAt(0)}
                  </div>
                ) : (
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="rounded-full object-cover"
                    onError={() => setIsImageError(true)}
                  />
                )}
              </div>
            </div>
            
            <div className="w-full">
              <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
                {name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                {designation}
              </p>
              
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-300 mt-1"
                >
                  View Project
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;