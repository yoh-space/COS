"use client";

import { useState } from "react";
import { Testimonial } from "@/types/testimonial";
import TestimonialModal from "@/components/ui/testimonial-modal";
import { motion } from "framer-motion";
import { 
  Microscope, 
  GraduationCap, 
  FlaskConical, 
  Trophy, 
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Research Excellence",
    designation: "Our faculty and students publish cutting-edge research in international journals, contributing to scientific advancement in chemistry, physics, biology, and mathematics.",
    content: "200+ Annual Publications in Top Journals. Our research teams consistently produce groundbreaking work that advances scientific knowledge globally.",
    image: "/images/success-stories/research.jpg",
    url: "/resources/publication",
    star: 5,
  },
  {
    id: 2,
    name: "Alumni Success",
    designation: "Distinguished Graduates Leading in Academia and Industry",
    content: "Our alumni hold prestigious positions in universities, research institutions, and industries worldwide, making significant contributions to science and technology.",
    image: "/images/success-stories/alumni.jpg",
    url: "/about/background",
    star: 5,
  },
  {
    id: 3,
    name: "Laboratory Excellence",
    designation: "State-of-the-Art Research Facilities",
    content: "Equipped with modern instrumentation including GC-MS, ICP-OES, and advanced computing clusters for cutting-edge research across all departments.",
    image: "/images/success-stories/lab.jpg",
    url: "/laboratories",
    star: 5,
  },
  {
    id: 4,
    name: "Student Achievements",
    designation: "National and International Recognition",
    content: "Our students consistently win awards in national science competitions and secure scholarships for international graduate programs.",
    image: "/images/success-stories/students.jpg",
    url: "/academics",
    star: 5,
  },
  {
    id: 5,
    name: "Community Impact",
    designation: "Bridging Science and Society",
    content: "Through outreach programs, we engage with local communities, schools, and industries to promote STEM education and sustainable development.",
    image: "/images/success-stories/community.jpg",
    url: "/services",
    star: 5,
  },
];

const cardIcons = [
  <Microscope key="microscope" className="w-5 h-5 text-white" />,
  <GraduationCap key="graduation" className="w-5 h-5 text-white" />,
  <FlaskConical key="flask" className="w-5 h-5 text-white" />,
  <Trophy key="trophy" className="w-5 h-5 text-white" />,
  <Users key="users" className="w-5 h-5 text-white" />,
];

const cardColors = [
  { gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30", hover: "hover:shadow-amber-500/40" },
  { gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/30", hover: "hover:shadow-blue-500/40" },
  { gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30", hover: "hover:shadow-emerald-500/40" },
  { gradient: "from-purple-500 to-violet-600", shadow: "shadow-purple-500/30", hover: "hover:shadow-purple-500/40" },
  { gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/30", hover: "hover:shadow-rose-500/40" },
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
    <section className="relative z-10 py-16 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Achievements</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Success Stories
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Celebrating achievements in research, education, and community impact at the College of Science.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
          <div className="flex md:grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 min-w-max md:min-w-0">
            {testimonialData.map((testimonial, index) => (
              <div key={testimonial.id} className="w-[280px] md:w-auto flex-shrink-0">
                <SuccessCard
                  testimonial={testimonial}
                  icon={cardIcons[index]}
                  colors={cardColors[index]}
                  index={index}
                  onClick={() => handleCardClick(testimonial)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <TestimonialModal
        testimonial={selectedTestimonial}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

interface SuccessCardProps {
  testimonial: Testimonial;
  icon: React.ReactNode;
  colors: { gradient: string; shadow: string; hover: string };
  index: number;
  onClick: () => void;
}

const SuccessCard = ({ testimonial, icon, colors, index, onClick }: SuccessCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className={`
        relative h-full min-h-[280px] p-6 rounded-2xl
        bg-white dark:bg-gray-800/80
        border border-gray-200/80 dark:border-gray-700/50
        shadow-lg ${colors.shadow} ${colors.hover}
        hover:border-transparent
        transition-all duration-500 ease-out
        overflow-hidden
      `}>
        {/* Gradient border on hover */}
        <div className={`
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
          bg-gradient-to-br ${colors.gradient}
          transition-opacity duration-500
          -z-10
        `} />
        <div className="absolute inset-[1px] rounded-2xl bg-white dark:bg-gray-800 -z-10" />

        {/* Icon */}
        <div className={`
          inline-flex items-center justify-center
          w-12 h-12 rounded-xl mb-4
          bg-gradient-to-br ${colors.gradient}
          shadow-lg ${colors.shadow}
          group-hover:scale-110 group-hover:rotate-3
          transition-transform duration-300
        `}>
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
          {testimonial.name}
        </h3>

        {/* Subtitle */}
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
          {testimonial.designation}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-4">
          {testimonial.content}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.star)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-amber-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Action */}
        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        </div>

        {/* Decorative elements */}
        <div className={`
          absolute -top-20 -right-20 w-40 h-40 rounded-full
          bg-gradient-to-br ${colors.gradient} opacity-5
          group-hover:opacity-10 group-hover:scale-150
          transition-all duration-700
        `} />
      </div>
    </motion.div>
  );
};

export default Testimonials;
