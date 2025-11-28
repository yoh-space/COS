"use client";

import { useState } from "react";
import { Testimonial } from "@/types/testimonial";
import DisplayCards from "@/components/ui/display-cards";
import TestimonialModal from "@/components/ui/testimonial-modal";
import { Star, User, Award, Heart, Trophy } from "lucide-react";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Research Excellence",
    designation: "🔬 Our faculty and students publish cutting-edge research in international journals, contributing to scientific advancement in chemistry, physics, biology, and mathematics. Over 200+ publications annually in high-impact journals.",
    content:
      "200+ Annual Publications in Top Journals",
    image: "/images/success-stories/research.jpg",
    url: "/publication",
    star: 5,
  },
  {
    id: 2,
    name: "Alumni Success",
    designation: "Distinguished Graduates Leading in Academia and Industry",
    content:
      "Our alumni hold prestigious positions in universities, research institutions, and industries worldwide, making significant contributions to science and technology.",
    image: "/images/success-stories/alumni.jpg",
    url: "/about/background",
    star: 5,
  },
  {
    id: 3,
    name: "Laboratory Excellence",
    designation: "State-of-the-Art Research Facilities",
    content:
      "Equipped with modern instrumentation including GC-MS, ICP-OES, and advanced computing clusters for cutting-edge research across all departments.",
    image: "/images/success-stories/lab.jpg",
    url: "/laboratories",
    star: 5,
  },
  {
    id: 4,
    name: "Student Achievements",
    designation: "National and International Recognition",
    content:
      "Our students consistently win awards in national science competitions and secure scholarships for international graduate programs.",
    image: "/images/success-stories/students.jpg",
    url: "/academics",
    star: 5,
  },
  {
    id: 5,
    name: "Community Impact",
    designation: "Bridging Science and Society",
    content:
      "Through outreach programs, we engage with local communities, schools, and industries to promote STEM education and sustainable development.",
    image: "/images/success-stories/community.jpg",
    url: "/services",
    star: 5,
  },
];

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);
  };
  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            Our Success Stories
          </h2>
          <p className="text-base text-body-color dark:text-body-color-dark max-w-2xl mx-auto">
            Celebrating achievements in research, education, and community impact at the College of Science.
          </p>
        </div>

        <div className="flex justify-center mt-16">
          <DisplayCards
            cards={[
              {
                icon: <Star className="size-4 text-yellow-300" />,
                title: testimonialData[0].name,
                description: testimonialData[0].content.slice(0, 45) + "...",
                date: "⭐⭐⭐⭐⭐",
                titleClassName: "text-yellow-500",
                className: "[grid-area:stack] hover:-translate-y-12 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                onClick: () => handleCardClick(testimonialData[0]),
              },
              {
                icon: <User className="size-4 text-blue-300" />,
                title: testimonialData[1].name,
                description: testimonialData[1].content.slice(0, 45) + "...",
                date: "⭐⭐⭐⭐⭐",
                titleClassName: "text-blue-500",
                className: "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-2 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                onClick: () => handleCardClick(testimonialData[1]),
              },
              {
                icon: <Award className="size-4 text-green-300" />,
                title: testimonialData[2].name,
                description: testimonialData[2].content.slice(0, 45) + "...",
                date: "⭐⭐⭐⭐⭐",
                titleClassName: "text-green-500",
                className: "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-6 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                onClick: () => handleCardClick(testimonialData[2]),
              },
              {
                icon: <Heart className="size-4 text-purple-300" />,
                title: testimonialData[3].name,
                description: testimonialData[3].content.slice(0, 45) + "...",
                date: "⭐⭐⭐⭐⭐",
                titleClassName: "text-purple-500",
                className: "[grid-area:stack] translate-x-36 translate-y-24 hover:translate-y-14 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                onClick: () => handleCardClick(testimonialData[3]),
              },
              {
                icon: <Trophy className="size-4 text-pink-300" />,
                title: testimonialData[4].name,
                description: testimonialData[4].content.slice(0, 45) + "...",
                date: "⭐⭐⭐⭐⭐",
                titleClassName: "text-pink-500",
                className: "[grid-area:stack] translate-x-48 translate-y-32 hover:translate-y-22",
                onClick: () => handleCardClick(testimonialData[4]),
              },
            ]}
          />
        </div>

        <TestimonialModal
          testimonial={selectedTestimonial}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
      <div className="absolute right-0 top-5 z-[-1]">
        <svg
          width="238"
          height="531"
          viewBox="0 0 238 531"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="422.819"
            y="-70.8145"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 422.819 -70.8145)"
            fill="url(#paint0_linear_83:2)"
          />
          <rect
            opacity="0.3"
            x="426.568"
            y="144.886"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 426.568 144.886)"
            fill="url(#paint1_linear_83:2)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_83:2"
              x1="517.152"
              y1="-251.373"
              x2="517.152"
              y2="459.865"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_83:2"
              x1="455.327"
              y1="-35.673"
              x2="455.327"
              y2="675.565"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-5 left-0 z-[-1]">
        <svg
          width="279"
          height="106"
          viewBox="0 0 279 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373"
              stroke="url(#paint0_linear_72:302)"
            />
            <path
              d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"
              stroke="url(#paint1_linear_72:302)"
            />
            <path
              d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.7589 88.2373 90.3692C109.97 82.3821 116.861 71.9642 156.615 74.7423C178.778 76.291 195.31 80.2985 205.911 73.3533C216.513 66.408 224.994 58.7682 243.016 60.1572C255.835 61.1453 265.278 61.8936 278 56.3373"
              stroke="url(#paint2_linear_72:302)"
            />
            <path
              d="M-57 35L50.0728 97.8548C55.5501 102.022 70.8513 108.759 88.2373 102.369C109.97 94.3821 116.861 83.9642 156.615 86.7423C178.778 88.291 195.31 92.2985 205.911 85.3533C216.513 78.408 224.994 70.7682 243.016 72.1572C255.835 73.1453 265.278 73.8936 278 68.3373"
              stroke="url(#paint3_linear_72:302)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_72:302"
              x1="256.267"
              y1="53.6717"
              x2="-40.8688"
              y2="8.15715"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_72:302"
              x1="256.267"
              y1="42.6717"
              x2="-40.8688"
              y2="-2.84285"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_72:302"
              x1="256.267"
              y1="64.6717"
              x2="-40.8688"
              y2="19.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_72:302"
              x1="256.267"
              y1="76.6717"
              x2="-40.8688"
              y2="31.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Testimonials;
