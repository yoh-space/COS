import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;

  return (
    // The main container for the card with improved styling and hover effect
    <div 
      className="
        wow fadeInUp
        group relative overflow-hidden rounded-lg bg-gray-50 p-8 shadow-lg transition-all duration-300
        hover:bg-primary/10 hover:shadow-2xl dark:bg-gray-800 dark:hover:bg-primary/10
        border border-gray-200 dark:border-gray-700
      "
      data-wow-delay=".15s"
    >
      {/* Absolute positioned background for a subtle animation on hover */}
      <div 
        className="
          absolute inset-0 z-0 bg-primary/5 transition-transform duration-500 ease-in-out
          group-hover:scale-110 group-hover:bg-primary/15
        "
      />

      {/* Content wrapper to ensure content is above the background and correctly spaced */}
      <div className="relative z-10">
        {/* Icon container with a more polished look */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20">
          {icon}
        </div>
        
        {/* Title with improved typography and color handling for dark mode */}
        <h3 className="mb-4 text-2xl font-bold leading-tight text-black sm:text-3xl dark:text-white">
          {title}
        </h3>
        
        {/* Paragraph with better readability and spacing */}
        <p className="text-body-color pr-[10px] text-base leading-relaxed text-gray-600 dark:text-gray-300">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;