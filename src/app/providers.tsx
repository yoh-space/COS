"use client";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ConvexProvider } from "convex/react";
import { ReactNode } from "react";
import { convex } from "./lib/convexClient";
import { ThemeProvider } from "next-themes";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ConvexProvider client={convex}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </ConvexProvider>
    </ThemeProvider>
  );
}
