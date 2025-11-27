"use client";
import * as React from "react";
import { Check, X } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";

interface PricingGlassCardProps {
  packageName: string;
  price: string;
  duration: string;
  subtitle: string;
  features: Array<{ text: string; status: "active" | "inactive" }>;
}

const PricingGlassCard = React.forwardRef<HTMLDivElement, PricingGlassCardProps>(
  ({ packageName, price, duration, subtitle, features }, ref) => {
    return (
      <div
        ref={ref}
        className="group h-[500px] w-full [perspective:1000px]"
      >
        <div className="relative h-full rounded-[30px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]">
          <div className="absolute inset-2 rounded-[35px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]"></div>
          
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-6 [transform:translate3d(0,0,26px)]">
            <h3 className="text-2xl font-bold text-white mb-2">{packageName}</h3>
            <p className="text-zinc-300 text-sm mb-4">{subtitle}</p>
          </div>

          {/* Features */}
          <div className="absolute top-24 left-0 right-0 bottom-20 p-6 overflow-y-auto [transform:translate3d(0,0,26px)]">
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  {feature.status === "active" ? (
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${feature.status === "active" ? "text-white" : "text-zinc-500"}`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="absolute bottom-6 left-6 right-6 [transform:translate3d(0,0,26px)]">
            <RainbowButton className="w-full">
              Get Started
            </RainbowButton>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
            {[
              { size: "80px", pos: "10px", z: "20px" },
              { size: "60px", pos: "15px", z: "40px" },
              { size: "40px", pos: "20px", z: "60px" },
            ].map((circle, index) => (
              <div
                key={index}
                className="absolute aspect-square rounded-full bg-white/10 shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out"
                style={{
                  width: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

PricingGlassCard.displayName = "PricingGlassCard";

export default PricingGlassCard;