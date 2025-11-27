"use client";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ColorThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ColorThemeProvider>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </ColorThemeProvider>
    </ThemeProvider>
  );
}
