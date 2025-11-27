"use client";

import { useColorTheme } from "@/contexts/ThemeContext";
import { Palette } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeSwitcher() {
  const { colorTheme, setColorTheme, availableThemes, currentThemeName } =
    useColorTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeColors: Record<string, string> = {
    blue: "#4a6cf7",
    purple: "#8b5cf6",
    green: "#10b981",
    orange: "#f97316",
    teal: "#14b8a6",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-2 w-64 rounded-2xl bg-white p-4 shadow-2xl dark:bg-gray-dark"
          >
            <h3 className="mb-4 text-lg font-bold text-black dark:text-white">
              Choose Theme Color
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {availableThemes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => {
                    setColorTheme(theme);
                    setIsOpen(false);
                  }}
                  className="group relative flex flex-col items-center gap-2"
                  title={theme.charAt(0).toUpperCase() + theme.slice(1)}
                >
                  <div
                    className={`h-12 w-12 rounded-xl shadow-lg transition-all duration-300 hover:scale-110 ${
                      currentThemeName === theme
                        ? "ring-4 ring-offset-2 dark:ring-offset-gray-dark"
                        : ""
                    }`}
                    style={{
                      backgroundColor: themeColors[theme],
                      ringColor:
                        currentThemeName === theme
                          ? themeColors[theme]
                          : "transparent",
                    }}
                  >
                    {currentThemeName === theme && (
                      <div className="flex h-full items-center justify-center">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium capitalize text-body-color">
                    {theme}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-all duration-300 hover:shadow-3xl"
        style={{
          background: "var(--theme-gradient-primary)",
        }}
        title="Change Theme Color"
      >
        <Palette className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
