
"use client";

import type { Artwork } from '@/types';
import ArtworkCard from './ArtworkCard';
import { RevealOnScroll } from '@/components/gsap/reveal-on-scroll'; // Import RevealOnScroll

interface ArtworkGridProps {
  artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  if (artworks.length === 0) {
    return <p className="text-center text-muted-foreground">No artworks to display.</p>;
  }

  return (
    // Wrap the mapping of ArtworkCards with RevealOnScroll, making it the grid container
    <RevealOnScroll className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {artworks.map((artwork) => (
        <ArtworkCard 
          key={artwork.id} 
          artwork={artwork} 
        />
      ))}
    </RevealOnScroll>
  );
}
