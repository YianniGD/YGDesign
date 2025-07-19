'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder to prevent layout shift and match dimensions
    return <div className="w-12 h-12 rounded-full bg-muted/50" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "theme-toggle-button-3d", // Custom class for 3D styling
        // Base sizing
        "rounded-full w-12 h-12",
        // Flex properties for icon centering
        "inline-flex items-center justify-center",
        "relative overflow-hidden" // Needed for AnimatePresence positioning
      )}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          {theme === 'light' ? (
            <Moon className="h-[1.5rem] w-[1.5rem] fill-current" />
          ) : (
            <Sun className="h-[1.5rem] w-[1.5rem] fill-current" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

export default React.memo(ThemeToggleButton);