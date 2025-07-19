
// src/components/gsap/reveal-on-scroll.tsx
"use client";

import React, { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  revealType?: 'fade' | 'slideUp' | 'fadeInUp' | 'zoomIn';
  delay?: number;
  duration?: number;
  staggerAmount?: number; // Renamed from stagger for clarity with GSAP stagger object
  start?: string;
  once?: boolean;
  yOffset?: number; // For slideUp/fadeInUp
  scaleOffset?: number; // For zoomIn
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className,
  revealType = 'fadeInUp',
  delay = 0,
  duration = 1.5, 
  staggerAmount = 0.25, // Changed stagger back to 0.25
  start = "top 80%", 
  once = true,
  yOffset = 30, 
  scaleOffset = 0.9, 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const childrenToAnimate = Array.from(element.children) as HTMLElement[];
    if (childrenToAnimate.length === 0) return;

    // Initial state (hidden) based on revealType
    let initialVars: gsap.TweenVars = { opacity: 0 };
    if (revealType === 'fadeInUp' || revealType === 'slideUp') {
      initialVars.y = yOffset;
    }
    if (revealType === 'zoomIn') {
      initialVars.scale = scaleOffset;
    }
    gsap.set(childrenToAnimate, initialVars);

    // Animation properties
    const animProps: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: duration,
      delay: delay,
      ease: 'power2.out', 
      stagger: childrenToAnimate.length > 1 ? staggerAmount : 0,
      scrollTrigger: {
        trigger: element,
        start: start,
        toggleActions: 'play none none none',
        once: once,
      },
    };
    
    // Refine animation properties based on revealType for the 'to' state
    if (revealType === 'fade') {
      animProps.y = 0; 
      animProps.scale = 1; 
    } else if (revealType === 'slideUp') {
       animProps.scale = 1;
    } else if (revealType === 'fadeInUp') {
       animProps.scale = 1;
    } else if (revealType === 'zoomIn') {
       animProps.y = 0;
    }


    const tl = gsap.to(childrenToAnimate, animProps);

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      gsap.killTweensOf(childrenToAnimate);
    };
  }, [revealType, delay, duration, staggerAmount, start, once, yOffset, scaleOffset]);

  return (
    <div ref={sectionRef} className={cn(className)}>
      {children}
    </div>
  );
};

export { RevealOnScroll };
