'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '@/components/theme/ThemeProvider';

const InteractiveCursor = () => {
  const { theme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        scale: 0,
        duration: 0.3,
      });
    };

    const handleMouseDown = () => {
       gsap.to(follower, {
        scale: 0.7,
        duration: 0.3,
      });
    };

    const handleMouseUp = () => {
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
      });
    };

    const handleLinkHover = (add: boolean) => {
      if (!follower) return;
      if (add) {
        const primaryColorValue = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        gsap.to(follower, {
          scale: 2,
          duration: 0.3,
          backgroundColor: `hsla(${primaryColorValue}, 0.5)`,
          borderWidth: '0px',
        });
      } else {
        gsap.to(follower, {
          scale: 1,
          duration: 0.3,
          backgroundColor: 'transparent',
          borderWidth: '2px',
        });
      }
    };
    
    document.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"], .theme-toggle-button-3d');
    
    const enterListener = () => handleLinkHover(true);
    const leaveListener = () => handleLinkHover(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', enterListener);
      el.addEventListener('mouseleave', leaveListener);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', enterListener);
        el.removeEventListener('mouseleave', leaveListener);
      });
    };
  }, []);
  
  const cursorColor = theme === 'dark' ? 'hsl(var(--primary-foreground))' : 'hsl(var(--primary))';
  const followerColor = theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--primary))';

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full"
        style={{ backgroundColor: cursorColor, top: 0, left: 0, opacity: 0, transform: 'scale(0)' }}
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed z-[9998] h-8 w-8 rounded-full border-2"
        style={{ borderColor: followerColor, top: '-14px', left: '-14px', opacity: 0, transform: 'scale(0)' }}
      />
    </>
  );
};

export default InteractiveCursor;
