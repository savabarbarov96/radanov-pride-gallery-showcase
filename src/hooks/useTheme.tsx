import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set dark mode as default as requested
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      return savedTheme || 'dark'; // Default to dark mode
    }
    return 'dark';
  });

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Component that handles location-based theme logic
export const LocationBasedTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme class
    root.classList.remove('light', 'dark');
    
    // Check if current route is admin route
    const isAdminRoute = location.pathname.startsWith('/admin');
    
    // Force light theme for admin routes, otherwise use user's theme preference
    const effectiveTheme = isAdminRoute ? 'light' : theme;
    
    // Add current theme class
    root.classList.add(effectiveTheme);
    
    // Save to localStorage only if not admin route
    if (!isAdminRoute) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, location.pathname]);

  return <>{children}</>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};