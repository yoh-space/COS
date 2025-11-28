"use client";
import * as React from "react";
import { Check, X } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";

interface ProgramGlassCardProps {
  packageName: string;
  price: string;
  duration: string;
  subtitle: string;
  features: {
    text: string;
    status: "active" | "inactive";
  }[];
}

const ProgramGlassCard = React.forwardRef<HTMLDivElement, ProgramGlassCardProps>(
  ({ packageName, price, duration, subtitle, features }, ref) => {
    return (
      <div
        ref={ref}
        className="relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 dark:border-gray-700/30 dark:bg-gray-800/20 dark:hover:bg-gray-800/30"
      >
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-tr from-blue-500/30 to-teal-500/30 blur-3xl"></div>

        <div className="relative z-10">
          <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            {packageName}
          </h3>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>

          <div className="mb-6 flex items-end gap-2">
            <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {price}
            </span>
            <span className="mb-1 text-gray-500 dark:text-gray-400">
              /{duration}
            </span>
          </div>

          <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>

          <ul className="mb-8 space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${feature.status === "active"
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                      : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
                    }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  className={`text-sm ${feature.status === "active"
                      ? "text-gray-700 dark:text-gray-200"
                      : "text-gray-400 dark:text-gray-500"
                    }`}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <button className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/25">
            View Details
          </button>
        </div>
      </div>
    );
  }
);

ProgramGlassCard.displayName = "ProgramGlassCard";

export default ProgramGlassCard;