
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always initialize to 'dark' to match the server-rendered HTML.
  // The actual theme will be loaded from localStorage in the effect below.
  const [theme, setTheme] = useState<Theme>('dark'); 

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    let storedTheme: Theme | null = null;
    try {
      storedTheme = localStorage.getItem('theme') as Theme | null;
    } catch (e) {
      console.warn("Could not access localStorage for theme preference.");
    }
    
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      setTheme(storedTheme);
    }
    // If no theme in storage, it will default to the 'dark' state.
  }, []); // Empty dependency array means this runs once on mount.


  useEffect(() => {
    // This effect synchronizes the `theme` state with the <html> class and localStorage.
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }

    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // localStorage might be unavailable
      console.warn("Could not save theme preference to localStorage.");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
