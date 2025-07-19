
"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Artwork } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import InteractiveDisplayMockup from './InteractiveDisplayMockup';
import SvgLogoSwitcher from '@/components/interactive/SvgLogoSwitcher';
import DurgaTeaMotifSwitcher from '@/components/interactive/DurgaTeaMotifSwitcher';
import { cn } from '@/lib/utils';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { DownloadCloud } from 'lucide-react';


const ZOOM_SCALE_FULL = 2.0;

interface ArtworkDetailProps {
  initialArtwork: Artwork;
}

export default function ArtworkDetailClient({ initialArtwork }: ArtworkDetailProps) {
  const [artwork] = useState<Artwork>(initialArtwork);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, initialTx: 0, initialTy: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const wasDraggingRef = useRef(false);

  const imageViewportRefs = useRef<(HTMLDivElement | null)[]>([]);

  const allImages = useMemo(() => {
    return [artwork.imageUrl, ...(artwork.additionalImageUrls || [])].filter(url => !!url) as string[];
  }, [artwork.imageUrl, artwork.additionalImageUrls]);

  const plainArtworkTitle = useMemo(() => artwork.title.replace(/<br \/>/g, ' '), [artwork.title]);

  const isDurgaInlineSvg = useCallback((url: string) => artwork.id === '3' && typeof url === 'string' && (url.startsWith('<svg') || url.startsWith('<?xml')), [artwork.id]);
  const isYouthSocietySvgUrl = useCallback((url: string) => artwork.id === '7' && typeof url === 'string' && url.endsWith('.svg'), [artwork.id]);

  const isGenericSvgUrl = useCallback((url: string) => typeof url === 'string' && url.endsWith('.svg') && !isYouthSocietySvgUrl(url) && !isDurgaInlineSvg(url), [isYouthSocietySvgUrl, isDurgaInlineSvg]);
  const isGenericInlineSvgString = useCallback((url: string) => typeof url === 'string' && (url.startsWith('<svg') || url.startsWith('<?xml')) && !isYouthSocietySvgUrl(url) && !isDurgaInlineSvg(url), [isYouthSocietySvgUrl, isDurgaInlineSvg]);

  const isAnySvgString = useCallback((url: string) => isDurgaInlineSvg(url) || isGenericInlineSvgString(url), [isDurgaInlineSvg, isGenericInlineSvgString]);
  const isAnySvgUrl = useCallback((url: string) => isYouthSocietySvgUrl(url) || isGenericSvgUrl(url), [isYouthSocietySvgUrl, isGenericSvgUrl]);
  const isAnySvg = useCallback((url: string) => isAnySvgString(url) || isAnySvgUrl(url), [isAnySvgString, isAnySvgUrl]);


  const miscUniversityWorkId = '10';
  const kellardenFarmId = '1';
  const kellardenClothImageUrl = 'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/kfarm%2Fcloth.jpg?alt=media&token=6193b2d7-b7ee-4176-9b75-80082711a4fd';


  const handleImageClick = (index: number) => {
    if (wasDraggingRef.current && zoomedImageIndex === index) {
      wasDraggingRef.current = false;
      return;
    }
    wasDraggingRef.current = false;

    if (zoomedImageIndex === index) {
      setZoomedImageIndex(null);
      setTranslate({ x: 0, y: 0 });
    } else {
      setZoomedImageIndex(index);
      setTranslate({ x: 0, y: 0 });
    }
    setIsDragging(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomedImageIndex(null);
        setTranslate({ x: 0, y: 0 });
        setIsDragging(false);
        wasDraggingRef.current = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (zoomedImageIndex !== index) return;

    const url = allImages[index];
    if (isAnySvg(url)) return;

    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      initialTx: translate.x,
      initialTy: translate.y,
    });
    wasDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || zoomedImageIndex === null) return;

    const url = allImages[zoomedImageIndex];
    if (isAnySvg(url)) return;

    wasDraggingRef.current = true;

    const viewportRef = imageViewportRefs.current[zoomedImageIndex];
    if (!viewportRef) return;

    const imgElement = viewportRef.querySelector('img, svg');
    if (!imgElement) return;

    const imageNaturalWidth = (imgElement as HTMLImageElement).naturalWidth || imgElement.clientWidth;
    const imageNaturalHeight = (imgElement as HTMLImageElement).naturalHeight || imgElement.clientHeight;

    const viewportRect = viewportRef.getBoundingClientRect();

    let renderedImageWidth, renderedImageHeight;
    const viewportAspectRatio = viewportRect.width / viewportRect.height;
    const imageAspectRatio = imageNaturalWidth / imageNaturalHeight;

    if (imageAspectRatio > viewportAspectRatio) {
      renderedImageWidth = viewportRect.width;
      renderedImageHeight = viewportRect.width / imageAspectRatio;
    } else {
      renderedImageHeight = viewportRect.height;
      renderedImageWidth = viewportRect.height * imageAspectRatio;
    }

    const scaledWidth = renderedImageWidth * ZOOM_SCALE_FULL;
    const scaledHeight = renderedImageHeight * ZOOM_SCALE_FULL;

    const excessWidth = Math.max(0, scaledWidth - viewportRect.width);
    const excessHeight = Math.max(0, scaledHeight - viewportRect.height);

    const maxTranslateX = excessWidth / 2;
    const minTranslateX = -maxTranslateX;
    const maxTranslateY = excessHeight / 2;
    const minTranslateY = -maxTranslateY;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    let newTx = dragStart.initialTx + dx;
    let newTy = dragStart.initialTy + dy;

    newTx = Math.max(minTranslateX, Math.min(maxTranslateX, newTx));
    newTy = Math.max(minTranslateY, Math.min(maxTranslateY, newTy));

    setTranslate({ x: newTx, y: newTy });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    imageViewportRefs.current = imageViewportRefs.current.slice(0, allImages.length);
  }, [allImages.length]);

  const getImageTransformAndTransition = useCallback((url: string, index: number) => {
    let scale = 1;
    let currentOpacity = 1;
    let currentTranslateX = 0;
    let currentTranslateY = 0;

    let timingFunction = 'ease-in-out'; // Default timing
    let duration = '0.3s'; // Default duration

    if (artwork.id === '1' && index === 0) { // Kellarden Farm main image
      timingFunction = 'ease-out';
      duration = '0.5s'; // Increased duration
    }

    let transitionStyle = `transform ${duration} ${timingFunction}, opacity ${duration} ${timingFunction}`;

    if (zoomedImageIndex === index) {
      scale = ZOOM_SCALE_FULL;
      currentTranslateX = translate.x;
      currentTranslateY = translate.y;
      currentOpacity = 1;

      if (isDragging && !isAnySvg(url)) {
        transitionStyle = `opacity ${duration} ${timingFunction}`;
      }
    } else {
      scale = 1.0;
      currentOpacity = 1;
    }

    let transform = `scale(${scale})`;
    if (!isAnySvg(url) && zoomedImageIndex === index) {
      transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${scale})`;
    }

    return { transform, transition: transitionStyle, opacity: currentOpacity };
  }, [artwork.id, zoomedImageIndex, translate.x, translate.y, isDragging, isAnySvg]);


  const mainImageUrl = allImages.length > 0 ? allImages[0] : null;

  const youthSocietyArtworkId = '7';
  const durgaArtworkId = '3';
  
  const additionalImagesRaw = allImages.slice(1);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          
          {artwork.id === youthSocietyArtworkId && (
            <Card className="overflow-hidden rounded-lg group/carousel">
              <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                  {allImages.map((url, index) => (
                    <CarouselItem key={`ys-carousel-img-${index}`}>
                      <div className="p-1">
                        <div className="relative aspect-square bg-background rounded-md p-4">
                          <Image
                            src={url}
                            alt={`${plainArtworkTitle} - View ${index + 1}`}
                            fill
                            objectFit="contain"
                            unoptimized={true} // SVGs don't need optimization
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
              </Carousel>
            </Card>
          )}

          {artwork.id !== youthSocietyArtworkId && mainImageUrl && (
            <Card
              className={cn(
                "group transition-all duration-300 ease-in-out hover:shadow-xl",
                zoomedImageIndex === 0 ? "z-30 shadow-2xl ring-2 ring-primary" : "z-10",
              )}
              role="button"
              tabIndex={0}
              onClick={() => handleImageClick(0)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {handleImageClick(0);} }}
              aria-label={`View image for ${plainArtworkTitle} - View 1${zoomedImageIndex === 0 ? ' (zoomed)' : ''}`}
              aria-pressed={zoomedImageIndex === 0}
            >
              <div
                ref={(el) => { imageViewportRefs.current[0] = el; }}
                className={cn(
                  "relative w-full overflow-hidden rounded-lg",
                  artwork.id === '4' || artwork.id === '6' || artwork.id === '9' ? "aspect-square" :
                  artwork.id === miscUniversityWorkId && artwork.imageUrl.endsWith('.svg') ? "aspect-square p-12 bg-background" :
                  artwork.id === miscUniversityWorkId ? "aspect-[3/4]" :
                  artwork.id === '5' ? "aspect-[3/4]" :
                  "aspect-[4/3]",
                  isDurgaInlineSvg(mainImageUrl) ? "p-6" :
                  (isGenericSvgUrl(mainImageUrl) || isGenericInlineSvgString(mainImageUrl)) ? "p-6 bg-background" :
                  "bg-muted",
                  zoomedImageIndex === 0 && isDragging && !isAnySvg(mainImageUrl) ? "cursor-grabbing" : "",
                  zoomedImageIndex === 0 && !isDragging && !isAnySvg(mainImageUrl) ? "cursor-grab" : "cursor-pointer",
                  isAnySvg(mainImageUrl) ? "cursor-pointer" : ""
                )}
                style={isDurgaInlineSvg(mainImageUrl) ? { backgroundColor: '#5c4557' } : {}}
                onMouseDown={(e) => {if (zoomedImageIndex === 0) {handleMouseDown(e, 0);}}}
                onMouseMove={zoomedImageIndex === 0 ? handleMouseMove : undefined}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
              >
                {isAnySvgString(mainImageUrl) ? (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: mainImageUrl! }}
                    style={getImageTransformAndTransition(mainImageUrl, 0)}
                  />
                ) : (
                  <Image
                    src={mainImageUrl}
                    alt={`${plainArtworkTitle} - View 1`}
                    fill
                    objectFit={
                      (artwork.id === '9') ? "contain" :
                      (artwork.id === miscUniversityWorkId && artwork.imageUrl.endsWith('.svg')) ? "contain" :
                      (artwork.id === miscUniversityWorkId ) ? "cover" :
                      "cover"
                    }
                    priority
                    data-ai-hint={artwork.dataAiHint || 'artwork detail'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    unoptimized={isAnySvgUrl(mainImageUrl) ? true : undefined}
                    className="pointer-events-none"
                    style={getImageTransformAndTransition(mainImageUrl, 0)}
                  />
                )}
              </div>
            </Card>
          )}

          {artwork.imageCaption && (
            <Card className="mt-6 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground italic leading-relaxed">{artwork.imageCaption}</p>
              </CardContent>
            </Card>
          )}

          {artwork.id === kellardenFarmId && artwork.showLogoSwitcher && (
            <SvgLogoSwitcher />
          )}

          {artwork.id === durgaArtworkId && artwork.showMotifSwitcher && (
            <DurgaTeaMotifSwitcher />
          )}

          {artwork.id !== youthSocietyArtworkId && artwork.id !== miscUniversityWorkId && additionalImagesRaw.map((url, localIdx) => {
            const overallIndex = localIdx + 1;
            const imageStyles = getImageTransformAndTransition(url, overallIndex);

            let aspectRatioClass;
            let objectFit: "cover" | "contain" = "cover";
            if (artwork.id === kellardenFarmId && url === kellardenClothImageUrl) {
              aspectRatioClass = "aspect-[3/1]";
              objectFit = "cover";
            } else if (artwork.id === '4' || artwork.id === '6' || artwork.id === '9') {
              aspectRatioClass = "aspect-square";
               if (artwork.id === '9') {objectFit = "contain";} // 3D work
            } else if (artwork.id === '5') {
              aspectRatioClass = "aspect-[3/4]";
            } else {
              aspectRatioClass = "aspect-[4/3]";
            }

            return (
            <React.Fragment key={`image-group-${overallIndex}-${artwork.id}`}>
              <Card
                className={cn(
                  "group transition-all duration-300 ease-in-out hover:shadow-xl",
                  zoomedImageIndex === overallIndex ? "z-30 shadow-2xl ring-2 ring-primary" : "z-10",
                )}
                role="button" tabIndex={0} onClick={() => {handleImageClick(overallIndex);}}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {handleImageClick(overallIndex);} }}
                aria-label={`View image for ${plainArtworkTitle} - View ${overallIndex + 1}${zoomedImageIndex === overallIndex ? ' (zoomed)' : ''}`}
                aria-pressed={zoomedImageIndex === overallIndex}
              >
                <div ref={(el) => { imageViewportRefs.current[overallIndex] = el; }}
                  className={cn( "relative w-full overflow-hidden rounded-lg",
                     aspectRatioClass,
                     isDurgaInlineSvg(url) ? "p-6" : (isGenericSvgUrl(url) || isGenericInlineSvgString(url)) ? "p-6 bg-background" : "bg-muted",
                     zoomedImageIndex === overallIndex && isDragging && !isAnySvg(url) ? "cursor-grabbing" : "",
                     zoomedImageIndex === overallIndex && !isAnySvg(url) ? "cursor-grab" : "cursor-pointer",
                     isAnySvg(url) ? "cursor-pointer" : ""
                  )}
                  style={isDurgaInlineSvg(url) ? { backgroundColor: '#5c4557' } : {}}
                  onMouseDown={(e) => { if (zoomedImageIndex === overallIndex) {handleMouseDown(e, overallIndex);} }}
                  onMouseMove={zoomedImageIndex === overallIndex ? handleMouseMove : undefined}
                  onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}
                >
                  {isAnySvgString(url) ? (
                    <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: url }} style={imageStyles} />
                  ) : (
                    <Image src={url} alt={`${plainArtworkTitle} - View ${overallIndex + 1}`} fill objectFit={objectFit} priority={overallIndex < 2} data-ai-hint={artwork.dataAiHint || 'artwork detail'} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px" unoptimized={isAnySvgUrl(url) ? true : undefined} className="pointer-events-none" style={imageStyles} />
                  )}
                </div>
              </Card>
            </React.Fragment>
          );})}

          {artwork.id === miscUniversityWorkId && (
            <>
              {additionalImagesRaw.length > 0 && (() => {
                const url = additionalImagesRaw[0];
                const overallIndex = 1;
                const imageStyles = getImageTransformAndTransition(url, overallIndex);
                const caption = artwork.additionalImageCaptions?.[0];
                return (
                  <React.Fragment>
                  <Card
                    key={`additional-misc-uni-img-${artwork.id}-${overallIndex}`}
                    className={cn(
                      "group transition-all duration-300 ease-in-out hover:shadow-xl",
                      zoomedImageIndex === overallIndex ? "z-30 shadow-2xl ring-2 ring-primary" : "z-10",
                    )}
                    role="button" tabIndex={0} onClick={() => {handleImageClick(overallIndex);}}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {handleImageClick(overallIndex);} }}
                    aria-label={`View image for ${plainArtworkTitle} - View ${overallIndex + 1}${zoomedImageIndex === overallIndex ? ' (zoomed)' : ''}`}
                    aria-pressed={zoomedImageIndex === overallIndex}
                  >
                    <div ref={(el) => { imageViewportRefs.current[overallIndex] = el; }}
                      className={cn( "relative w-full aspect-[4/3] overflow-hidden rounded-lg",
                        isGenericSvgUrl(url) || isGenericInlineSvgString(url) ? "p-6 bg-background" : "bg-muted",
                        zoomedImageIndex === overallIndex && isDragging && !isAnySvg(url) ? "cursor-grabbing" : "",
                        zoomedImageIndex === overallIndex && !isAnySvg(url) ? "cursor-grab" : "cursor-pointer",
                        isAnySvg(url) ? "cursor-pointer" : ""
                      )}
                      onMouseDown={(e) => { if (zoomedImageIndex === overallIndex) {handleMouseDown(e, overallIndex);} }}
                      onMouseMove={zoomedImageIndex === overallIndex ? handleMouseMove : undefined}
                      onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}
                    >
                      {isAnySvgString(url) ? (
                        <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: url }} style={imageStyles} />
                      ) : (
                        <Image src={url} alt={`${plainArtworkTitle} - View ${overallIndex + 1}`} fill objectFit="cover" priority={overallIndex < 2} data-ai-hint={artwork.dataAiHint || 'artwork detail'} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px" unoptimized={isAnySvgUrl(url) ? true : undefined} className="pointer-events-none" style={imageStyles} />
                      )}
                    </div>
                  </Card>
                   {caption && (
                      <Card className="mt-2 mb-4 bg-card/80 backdrop-blur-sm shadow-sm">
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground italic leading-relaxed">{caption}</p>
                        </CardContent>
                      </Card>
                    )}
                  </React.Fragment>
                );
              })()}

              {additionalImagesRaw.length >= 3 && (
                <Card key={`misc-carousel-1-${artwork.id}`} className="overflow-hidden rounded-lg">
                  <Carousel opts={{ loop: true }} className="w-full group/carousel">
                    <CarouselContent>
                      {[additionalImagesRaw[1], additionalImagesRaw[2]].map((url, pairIdx) => {
                        if (!url) {return null;}
                        const overallIndex = (pairIdx === 0 ? 2 : 3);
                        const imageStyles = getImageTransformAndTransition(url, overallIndex);
                        return (
                          <CarouselItem key={`carousel-1-img-${overallIndex}`}>
                            <div
                              ref={(el) => { imageViewportRefs.current[overallIndex] = el; }}
                              className={cn(
                                "relative w-full aspect-[4/3] bg-muted group overflow-hidden rounded-lg",
                                "transition-all duration-300 ease-in-out",
                                zoomedImageIndex === overallIndex
                                  ? "z-30 shadow-2xl ring-2 ring-primary"
                                  : "z-10 hover:shadow-lg",
                                zoomedImageIndex === overallIndex && isDragging && !isAnySvg(url) ? "cursor-grabbing" : "",
                                zoomedImageIndex === overallIndex && !isAnySvg(url) ? "cursor-grab" : "cursor-pointer",
                                isAnySvg(url) ? "cursor-pointer" : "cursor-pointer"
                              )}
                              role="button" tabIndex={0} onClick={() => {handleImageClick(overallIndex);}}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {handleImageClick(overallIndex);} }}
                              aria-label={`View image for ${plainArtworkTitle} - View ${overallIndex + 1}${zoomedImageIndex === overallIndex ? ' (zoomed)' : ''}`}
                              aria-pressed={zoomedImageIndex === overallIndex}
                              onMouseDown={(e) => { if (zoomedImageIndex === overallIndex) {handleMouseDown(e, overallIndex);} }}
                              onMouseMove={zoomedImageIndex === overallIndex ? handleMouseMove : undefined}
                              onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}
                            >
                              {isAnySvgString(url) ? (
                                <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: url }} style={imageStyles} />
                              ) : (
                                <Image src={url} alt={`${plainArtworkTitle} - View ${overallIndex + 1}`} fill objectFit="cover" priority={overallIndex < 4} data-ai-hint={artwork.dataAiHint || 'artwork detail'} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 800px" unoptimized={isAnySvgUrl(url) ? true : undefined} className="pointer-events-none group-hover:scale-105" style={imageStyles} />
                              )}
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
                  </Carousel>
                </Card>
              )}

              {additionalImagesRaw.length >= 5 && (
                 <Card key={`misc-carousel-2-${artwork.id}`} className="overflow-hidden rounded-lg">
                  <Carousel opts={{ loop: true }} className="w-full group/carousel">
                    <CarouselContent>
                      {[additionalImagesRaw[3], additionalImagesRaw[4]].map((url, pairIdx) => {
                        if (!url) {return null;}
                        const overallIndex = (pairIdx === 0 ? 4 : 5);
                        const imageStyles = getImageTransformAndTransition(url, overallIndex);
                        return (
                          <CarouselItem key={`carousel-2-img-${overallIndex}`}>
                             <div
                              ref={(el) => { imageViewportRefs.current[overallIndex] = el; }}
                              className={cn(
                                "relative w-full aspect-[4/3] bg-muted group overflow-hidden rounded-lg",
                                "transition-all duration-300 ease-in-out",
                                zoomedImageIndex === overallIndex
                                  ? "z-30 shadow-2xl ring-2 ring-primary"
                                  : "z-10 hover:shadow-lg",
                                zoomedImageIndex === overallIndex && isDragging && !isAnySvg(url) ? "cursor-grabbing" : "",
                                zoomedImageIndex === overallIndex && !isAnySvg(url) ? "cursor-grab" : "cursor-pointer",
                                isAnySvg(url) ? "cursor-pointer" : "cursor-pointer"
                              )}
                              role="button" tabIndex={0} onClick={() => {handleImageClick(overallIndex);}}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {handleImageClick(overallIndex);} }}
                              aria-label={`View image for ${plainArtworkTitle} - View ${overallIndex + 1}${zoomedImageIndex === overallIndex ? ' (zoomed)' : ''}`}
                              aria-pressed={zoomedImageIndex === overallIndex}
                              onMouseDown={(e) => { if (zoomedImageIndex === overallIndex) {handleMouseDown(e, overallIndex);} }}
                              onMouseMove={zoomedImageIndex === overallIndex ? handleMouseMove : undefined}
                              onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}
                            >
                              {isAnySvgString(url) ? (
                                <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: url }} style={imageStyles} />
                              ) : (
                                <Image src={url} alt={`${plainArtworkTitle} - View ${overallIndex + 1}`} fill objectFit="cover" priority={overallIndex < 6} data-ai-hint={artwork.dataAiHint || 'artwork detail'} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 800px" unoptimized={isAnySvgUrl(url) ? true : undefined} className="pointer-events-none group-hover:scale-105" style={imageStyles} />
                              )}
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                     <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
                  </Carousel>
                </Card>
              )}

              {additionalImagesRaw.length >= 7 && (
                 <Card key={`misc-carousel-3-${artwork.id}`} className="overflow-hidden rounded-lg">
                  <Carousel opts={{ loop: true }} className="w-full group/carousel">
                    <CarouselContent>
                      {[additionalImagesRaw[5], additionalImagesRaw[6]].map((url, pairIdx) => {
                        if (!url) {return null;}
                        const overallIndex = (pairIdx === 0 ? 6 : 7);
                        const imageStyles = getImageTransformAndTransition(url, overallIndex);
                        return (
                          <CarouselItem key={`carousel-3-img-${overallIndex}`}>
                             <div
                              ref={(el) => { imageViewportRefs.current[overallIndex] = el; }}
                              className={cn(
                                "relative w-full aspect-[3/4] bg-muted group overflow-hidden rounded-lg", // New aspect ratio
                                "transition-all duration-300 ease-in-out",
                                zoomedImageIndex === overallIndex
                                  ? "z-30 shadow-2xl ring-2 ring-primary"
                                  : "z-10 hover:shadow-lg",
                                zoomedImageIndex === overallIndex && isDragging && !isAnySvg(url) ? "cursor-grabbing" : "",
                                zoomedImageIndex === overallIndex && !isAnySvg(url) ? "cursor-grab" : "cursor-pointer",
                                isAnySvg(url) ? "cursor-pointer" : "cursor-pointer"
                              )}
                              role="button" tabIndex={0} onClick={() => {handleImageClick(overallIndex);}}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {handleImageClick(overallIndex);} }}
                              aria-label={`View image for ${plainArtworkTitle} - View ${overallIndex + 1}${zoomedImageIndex === overallIndex ? ' (zoomed)' : ''}`}
                              aria-pressed={zoomedImageIndex === overallIndex}
                              onMouseDown={(e) => { if (zoomedImageIndex === overallIndex) {handleMouseDown(e, overallIndex);} }}
                              onMouseMove={zoomedImageIndex === overallIndex ? handleMouseMove : undefined}
                              onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}
                            >
                              {isAnySvgString(url) ? (
                                <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: url }} style={imageStyles} />
                              ) : (
                                <Image src={url} alt={`${plainArtworkTitle} - View ${overallIndex + 1}`} fill objectFit="cover" data-ai-hint={artwork.dataAiHint || 'artwork detail'} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 800px" unoptimized={isAnySvgUrl(url) ? true : undefined} className="pointer-events-none group-hover:scale-105" style={imageStyles} />
                              )}
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                     <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
                  </Carousel>
                </Card>
              )}

              {additionalImagesRaw.length > 7 && additionalImagesRaw.slice(7).map((url, idx) => {
                  if (!url) {return null;}
                  const overallIndex = 1 + 6 + (idx + 1);
                  const imageStyles = getImageTransformAndTransition(url, overallIndex);
                  return (
                    <Card
                      key={`additional-misc-uni-remaining-${artwork.id}-${overallIndex}`}
                      className={cn(
                        "group transition-all duration-300 ease-in-out hover:shadow-xl",
                        zoomedImageIndex === overallIndex ? "z-30 shadow-2xl ring-2 ring-primary" : "z-10",
                      )}
                      role="button" tabIndex={0} onClick={() => {handleImageClick(overallIndex);}}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {handleImageClick(overallIndex);} }}
                      aria-label={`View image for ${plainArtworkTitle} - View ${overallIndex + 1}${zoomedImageIndex === overallIndex ? ' (zoomed)' : ''}`}
                      aria-pressed={zoomedImageIndex === overallIndex}
                    >
                       <div ref={(el) => { imageViewportRefs.current[overallIndex] = el; }}
                        className={cn( "relative w-full aspect-[4/3] overflow-hidden rounded-lg", // Default aspect ratio for any further images
                          isGenericSvgUrl(url) || isGenericInlineSvgString(url) ? "p-6 bg-background" : "bg-muted",
                          zoomedImageIndex === overallIndex && isDragging && !isAnySvg(url) ? "cursor-grabbing" : "",
                          zoomedImageIndex === overallIndex && !isAnySvg(url) ? "cursor-grab" : "cursor-pointer",
                          isAnySvg(url) ? "cursor-pointer" : ""
                        )}
                        onMouseDown={(e) => { if (zoomedImageIndex === overallIndex) {handleMouseDown(e, overallIndex);} }}
                        onMouseMove={zoomedImageIndex === overallIndex ? handleMouseMove : undefined}
                        onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}
                      >
                        {isAnySvgString(url) ? (
                          <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: url }} style={imageStyles} />
                        ) : (
                          <Image src={url} alt={`${plainArtworkTitle} - View ${overallIndex + 1}`} fill objectFit="cover" data-ai-hint={artwork.dataAiHint || 'artwork detail'} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px" unoptimized={isAnySvgUrl(url) ? true : undefined} className="pointer-events-none" style={imageStyles} />
                        )}
                      </div>
                    </Card>
                  );
              })}
            </>
          )}
        </div>

        <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-20 self-start">
          <Card className={cn(
            "relative",
            artwork.specialDetailImage ? "!overflow-visible" : ""
            )}>
            <CardHeader>
              <CardTitle className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: artwork.title }} />
              <CardDescription className="text-base text-muted-foreground">
                {artwork.category} - {artwork.creationDate}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Description</h3>
                <p className="text-foreground/80 whitespace-pre-wrap">
                  {artwork.description || "No description available."}
                </p>
              </div>
              <Separator />
               {artwork.toolsUsed && artwork.toolsUsed.length > 0 && (
                <>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Tools</h3>
                    <p className="text-sm text-foreground/80 mb-0.5">
                      {artwork.toolsUsed.join(', ')}
                    </p>
                  </div>
                  <Separator />
                </>
              )}
              {artwork.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {artwork.downloadablePdfUrl && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Actions</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild variant="outline" className="flex-grow sm:flex-grow-0">
                        <Link href={artwork.downloadablePdfUrl} target="_blank" rel="noopener noreferrer">
                          <DownloadCloud className="mr-2 h-4 w-4" />
                          Read PDF
                        </Link>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            {artwork.specialDetailImage && (
              <div
                className={cn(
                  "absolute -top-3 -right-3 md:-top-4 md:-right-4",
                  "w-16 h-16 md:w-20 md:h-20",
                  "rounded-full overflow-hidden border-2 border-background bg-muted shadow-lg z-10 p-1",
                  "group transition-transform duration-300 ease-in-out hover:scale-125"
                )}
                title={`${plainArtworkTitle} - Detail`}
              >
                <Image
                  src={artwork.specialDetailImage}
                  alt={`${plainArtworkTitle} - detail accent`}
                  fill
                  objectFit="contain"
                  unoptimized={isAnySvgUrl(artwork.specialDetailImage) || isAnySvgString(artwork.specialDetailImage)}
                  className="transition-transform duration-300 group-hover:scale-110"
                  data-ai-hint="logo detail"
                />
              </div>
            )}
          </Card>
        </div>
      </div>

      {artwork.interactiveDisplay && artwork.interactiveDisplay.contentImageUrl && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-3 text-foreground text-center lg:text-left">Concept Landing Page: Interactive View</h3>
          <InteractiveDisplayMockup
            contentImageUrl={artwork.interactiveDisplay.contentImageUrl}
            artworkTitle={plainArtworkTitle}
          />
        </div>
      )}
    </>
  );
}
