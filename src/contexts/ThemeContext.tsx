"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ColorTheme {
  name: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    accent: string;
    accentLight: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    hero: string;
  };
}

export const colorThemes: Record<string, ColorTheme> = {
  blue: {
    name: 'Blue',
    colors: {
      primary: '#4a6cf7',
      primaryLight: '#6b8aff',
      primaryDark: '#3451d9',
      secondary: '#6366f1',
      secondaryLight: '#818cf8',
      secondaryDark: '#4f46e5',
      accent: '#3b82f6',
      accentLight: '#60a5fa',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
      accent: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      hero: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #6366f1 100%)',
    },
  },
  purple: {
    name: 'Purple',
    colors: {
      primary: '#8b5cf6',
      primaryLight: '#a78bfa',
      primaryDark: '#7c3aed',
      secondary: '#a855f7',
      secondaryLight: '#c084fc',
      secondaryDark: '#9333ea',
      accent: '#d946ef',
      accentLight: '#e879f9',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#8b5cf6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
      accent: 'linear-gradient(135deg, #d946ef 0%, #a855f7 100%)',
      hero: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%)',
    },
  },
  green: {
    name: 'Green',
    colors: {
      primary: '#10b981',
      primaryLight: '#34d399',
      primaryDark: '#059669',
      secondary: '#14b8a6',
      secondaryLight: '#2dd4bf',
      secondaryDark: '#0d9488',
      accent: '#06b6d4',
      accentLight: '#22d3ee',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      secondary: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      accent: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      hero: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
    },
  },
  orange: {
    name: 'Orange',
    colors: {
      primary: '#f97316',
      primaryLight: '#fb923c',
      primaryDark: '#ea580c',
      secondary: '#f59e0b',
      secondaryLight: '#fbbf24',
      secondaryDark: '#d97706',
      accent: '#ef4444',
      accentLight: '#f87171',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      secondary: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      accent: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      hero: 'linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #ef4444 100%)',
    },
  },
  teal: {
    name: 'Teal',
    colors: {
      primary: '#14b8a6',
      primaryLight: '#2dd4bf',
      primaryDark: '#0d9488',
      secondary: '#06b6d4',
      secondaryLight: '#22d3ee',
      secondaryDark: '#0891b2',
      accent: '#0ea5e9',
      accentLight: '#38bdf8',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      accent: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      hero: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #0ea5e9 100%)',
    },
  },
};

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (themeName: string) => void;
  availableThemes: string[];
  currentThemeName: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ColorThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentThemeName, setCurrentThemeName] = useState<string>('blue');
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(colorThemes.blue);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('colorTheme');
    if (savedTheme && colorThemes[savedTheme]) {
      setCurrentThemeName(savedTheme);
      setColorThemeState(colorThemes[savedTheme]);
      applyThemeToDOM(colorThemes[savedTheme]);
    } else {
      applyThemeToDOM(colorThemes.blue);
    }
  }, []);

  const applyThemeToDOM = (theme: ColorTheme) => {
    const root = document.documentElement;
    
    // Apply CSS variables
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-primary-light', theme.colors.primaryLight);
    root.style.setProperty('--theme-primary-dark', theme.colors.primaryDark);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-secondary-light', theme.colors.secondaryLight);
    root.style.setProperty('--theme-secondary-dark', theme.colors.secondaryDark);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-accent-light', theme.colors.accentLight);
    root.style.setProperty('--theme-success', theme.colors.success);
    root.style.setProperty('--theme-warning', theme.colors.warning);
    root.style.setProperty('--theme-error', theme.colors.error);
    root.style.setProperty('--theme-info', theme.colors.info);
    
    // Apply gradients
    root.style.setProperty('--theme-gradient-primary', theme.gradients.primary);
    root.style.setProperty('--theme-gradient-secondary', theme.gradients.secondary);
    root.style.setProperty('--theme-gradient-accent', theme.gradients.accent);
    root.style.setProperty('--theme-gradient-hero', theme.gradients.hero);
  };

  const setColorTheme = (themeName: string) => {
    if (colorThemes[themeName]) {
      setCurrentThemeName(themeName);
      setColorThemeState(colorThemes[themeName]);
      applyThemeToDOM(colorThemes[themeName]);
      localStorage.setItem('colorTheme', themeName);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        availableThemes: Object.keys(colorThemes),
        currentThemeName,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useColorTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
};
