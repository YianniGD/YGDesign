
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface InteractiveDisplayMockupProps {
  contentImageUrl: string;
  artworkTitle: string;
}

export default function InteractiveDisplayMockup({
  contentImageUrl,
  artworkTitle,
}: InteractiveDisplayMockupProps) {
  const [isActuallyScrollable, setIsActuallyScrollable] = useState(false);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const scrollableCardRef = useRef<HTMLDivElement>(null);

  const checkScrollability = useCallback(() => {
    const cardElement = scrollableCardRef.current;
    if (cardElement) {
      if (cardElement.scrollHeight > cardElement.clientHeight) {
        setIsActuallyScrollable(true);
      } else {
        setIsActuallyScrollable(false);
        setUserHasScrolled(true); // If not scrollable, act as if user "scrolled" to hide indicator
      }
    }
  }, []);

  useEffect(() => {
    // Initial check after a short delay to allow image to potentially load dimensions
    const initialCheckTimeout = setTimeout(checkScrollability, 100); 
    window.addEventListener('resize', checkScrollability);
    
    return () => {
      clearTimeout(initialCheckTimeout);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [checkScrollability, contentImageUrl]); // Re-check if image URL changes

  // Additional check on image load, as scrollHeight might not be accurate until image is fully loaded
  const handleImageLoad = useCallback(() => {
    setTimeout(checkScrollability, 50); // Short delay after load
  }, [checkScrollability]);

  const handleScroll = () => {
    if (!userHasScrolled) {
      setUserHasScrolled(true);
    }
  };

  return (
    <Card
      ref={scrollableCardRef}
      className={cn(
        "group shadow-md border overflow-y-auto relative",
        "[&::-webkit-scrollbar]:hidden" // Hides scrollbar on WebKit browsers
      )}
      style={{ maxHeight: '600px' }}
      role="region"
      aria-label={`Scrollable content for ${artworkTitle}`}
      tabIndex={0}
      onScroll={handleScroll}
    >
      <CardContent className={cn("p-0")}>
        <Image
          src={contentImageUrl}
          alt={`${artworkTitle} scrollable content`}
          width={1000} // Provide an appropriate base width
          height={3000} // Provide an appropriate base height, can be very large
          quality={85}
          data-ai-hint="long scrollable design"
          className="block object-contain"
          priority // Consider if this image is critical for LCP
          onLoad={handleImageLoad} // Check scrollability after image loads
        />
      </CardContent>
      {isActuallyScrollable && (
        <div 
          className={cn(
            "absolute top-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none",
            "transition-opacity duration-500 ease-out", 
            userHasScrolled ? "opacity-0" : "opacity-100" 
          )}
          aria-hidden="true"
        >
          <span 
            className="text-md text-white mb-2 tracking-wide" 
            style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.6))' }} 
          >
            Scroll to explore
          </span>
          <ChevronDown 
            className="h-[6.25rem] w-[6.25rem] text-white animate-bounce" 
            strokeWidth={2.5} 
            style={{ filter: 'drop-shadow(0 3px 6px hsl(var(--accent)))' }} 
          />
        </div>
      )}
    </Card>
  );
}
