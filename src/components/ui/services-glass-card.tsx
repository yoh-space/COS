"use client";
import * as React from "react";

interface ServicesGlassCardProps {
  icon: React.ReactNode;
  title: string;
  paragraph: string;
}

const ServicesGlassCard = React.forwardRef<HTMLDivElement, ServicesGlassCardProps>(
  ({ icon, title, paragraph }, ref) => {
    return (
      <div
        ref={ref}
        className="group h-[400px] w-full [perspective:1000px]"
      >
        <div className="relative h-full rounded-[30px] bg-gradient-to-br from-gray-100 to-white dark:from-zinc-900 dark:to-black shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]">
          <div className="absolute inset-2 rounded-[35px] border-b border-l border-gray-200/50 dark:border-white/20 bg-gradient-to-b from-gray-50/80 to-white/60 dark:from-white/30 dark:to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]"></div>
          
          {/* Icon */}
          <div className="absolute top-8 left-8 [transform:translate3d(0,0,30px)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-white/20 backdrop-blur-sm border border-primary/20 dark:border-white/30 shadow-lg transition-all duration-300 group-hover:bg-primary/20 dark:group-hover:bg-white/30 group-hover:scale-110">
              <div className="text-primary dark:text-white">
                {icon}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-28 left-0 right-0 bottom-8 p-8 [transform:translate3d(0,0,26px)]">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-zinc-300 text-sm leading-relaxed">
              {paragraph}
            </p>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
            {[
              { size: "100px", pos: "10px", z: "20px", opacity: "10" },
              { size: "70px", pos: "15px", z: "40px", opacity: "15" },
              { size: "40px", pos: "20px", z: "60px", opacity: "20" },
            ].map((circle, index) => (
              <div
                key={index}
                className={`absolute aspect-square rounded-full bg-primary/${circle.opacity} dark:bg-white/${circle.opacity} shadow-lg transition-all duration-500 ease-in-out group-hover:scale-110`}
                style={{
                  width: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                }}
              ></div>
            ))}
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-primary/80 rounded-b-[30px] [transform:translate3d(0,0,26px)]"></div>
        </div>
      </div>
    );
  }
);

ServicesGlassCard.displayName = "ServicesGlassCard";

export default ServicesGlassCard;