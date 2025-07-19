
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Artwork } from '@/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ArtworkCardProps {
  artwork: Artwork;
}

function ArtworkCard({ artwork }: ArtworkCardProps) {
  const plainTitle = artwork.title.replace(/<br \/>/g, ' ');
  // Correctly check if the URL path ends with .svg, ignoring query parameters.
  const isSvg = typeof artwork.imageUrl === 'string' && artwork.imageUrl.split('?')[0].endsWith('.svg');

  return (
    <Link href={`/artworks/${artwork.id}`} aria-label={`View details for ${plainTitle}`} className="block group">
      <Card className="relative overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-in-out">
        {/* Image Layer - This div will define the card's aspect ratio and height */}
        <div className={cn(
          "relative",
          "aspect-video", // Ensure all cards have the same aspect ratio
          isSvg ? "bg-background" : "bg-muted",
          // Only add padding to SVGs that are NOT the Youth Society emblem
          isSvg && artwork.id !== '7' && "p-4"
        )}>
          {(typeof artwork.imageUrl === 'string' && (artwork.imageUrl.startsWith('http://') || artwork.imageUrl.startsWith('https://'))) ? (
            <Image
              src={artwork.imageUrl}
              alt={plainTitle}
              fill
              data-ai-hint={artwork.dataAiHint || 'artwork project'}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "transition-transform duration-300 group-hover:scale-105",
                isSvg ? (artwork.id === '7' ? 'object-cover' : 'object-contain') : 'object-cover'
              )}
              unoptimized={isSvg}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-sm text-destructive-foreground p-4 text-center">
              Image not available for {plainTitle}
            </div>
          )}
        </div>

        {/* Text Overlay Layer - Positioned absolutely to cover the card */}
        <div className="absolute inset-0 bg-black/70 p-4 md:p-6 flex flex-col justify-end
                        opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
          <h3
            className="text-xl md:text-2xl font-bold text-white hyphens-auto break-words mb-1"
            dangerouslySetInnerHTML={{ __html: artwork.title }}
          />
          <p className="text-sm text-white/80 line-clamp-3">
            {artwork.description}
          </p>
        </div>
      </Card>
    </Link>
  );
}

export default ArtworkCard;
