"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface DrawLineTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  strokeWidth?: number;
  duration?: number;
}

export const DrawLineText: React.FC<DrawLineTextProps> = ({
  text,
  className,
  strokeWidth = 1.5,
  duration = 2,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const textElement = textRef.current;
    if (!textElement) return;

    let tl: gsap.core.Timeline | null = null;
    
    const timerId = setTimeout(() => {
        if (textElement && typeof (textElement as any).getTotalLength === 'function') {
            const length = (textElement as any).getTotalLength();
            gsap.set(textElement, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });

            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: true,
                    once: true,
                },
            });

            tl.to(textElement, {
                strokeDashoffset: 0,
                duration: duration,
                ease: 'power2.inOut',
            });
        }
    }, 100);

    return () => {
        clearTimeout(timerId);
        if (tl) {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
            tl.kill();
        }
    };
  }, [text, duration]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      {...props}
    >
      <span className="opacity-0" aria-hidden="true">{text}</span>
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          ref={textRef}
          x="0"
          y="50%"
          dominantBaseline="middle"
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        >
          {text}
        </text>
      </svg>
    </div>
  );
};
