/**
 * Production-safe logger utility
 * Disables console output in production to improve performance
 */

const isDevelopment = process.env.NODE_ENV === "development";

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) console.log(...args);
  },
  error: (...args: unknown[]) => {
    if (isDevelopment) console.error(...args);
  },
  warn: (...args: unknown[]) => {
    if (isDevelopment) console.warn(...args);
  },
  info: (...args: unknown[]) => {
    if (isDevelopment) console.info(...args);
  },
  debug: (...args: unknown[]) => {
    if (isDevelopment) console.debug(...args);
  },
};

/**
 * Suppress all console output in production
 * Call this in your app's entry point (layout.tsx)
 */
export function suppressConsoleInProduction() {
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
    console.info = () => {};
    console.debug = () => {};
  }
}
