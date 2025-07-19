"use client";

import React from 'react';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react'; 
import type { Artwork } from '@/types';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';

interface HomePageClientProps {
  initialArtworks: Artwork[];
}

export default function HomePageClient({ initialArtworks }: HomePageClientProps) {
  const artworks = initialArtworks;

  return (
    <>
      <div className="relative text-foreground overflow-x-hidden">
        <div className="container mx-auto max-w-screen-xl">

          <main className="px-8 overflow-x-hidden">
            <section className="min-h-[85vh] flex flex-col justify-start items-start pt-20 md:pt-24"> {/* Adjusted min-height */}
              <Link href="/about" className="group">
                <div className="relative">
                  <h1
                    className="font-black leading-none text-foreground tracking-wide transition-colors duration-300 group-hover:text-primary"
                    style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
                  >
                    yianni
                  </h1>
                  <h2
                    className="font-black leading-none text-foreground tracking-wide opacity-20 transition-colors duration-300 group-hover:text-primary"
                    style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
                  >
                    galiatsatos
                  </h2>
                </div>
              </Link>
            </section>

            {/* Artwork section starts after the hero section */}
            <section className="pt-16 pb-16">
              {artworks.length > 0 ? (
                <ArtworkGrid artworks={artworks} />
              ) : (
                <p className="text-center text-muted-foreground">No artworks to display.</p>
              )}
            </section>

            <section className="py-24 text-center">
              <h2
                className="font-black leading-none text-foreground tracking-wide"
                style={{ fontSize: 'clamp(3rem, 9vw, 3.5rem)' }}
              >
                contact
                <span
                  className="font-black leading-none text-foreground tracking-wide opacity-20"
                  style={{ fontSize: 'clamp(3rem, 9vw, 3.5rem)' }}
                >
                  {'\u00A0'}me
                </span>
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-8 text-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center gap-x-4 mt-2">
                    <a
                      href="tel:4844524027"
                      aria-label="Call Yianni Galiatsatos"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Phone className="w-6 h-6" />
                    </a>
                    <a
                      href="https://bsky.app/profile/yiannig.bsky.social"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Yianni Galiatsatos on Bluesky"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <svg id="Layer_1_bluesky" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.87 23.87" className="w-6 h-6">
                        <rect width="23.87" height="23.87" rx="5.26" ry="5.26" fill="transparent" />
                        <path d="M11.93,11.21c-.65-1.27-2.43-3.63-4.08-4.8-1.58-1.12-2.19-.92-2.58-.74-.46.21-.54.91-.54,1.32s.23,3.39.37,3.89c.49,1.64,2.23,2.2,3.83,2.02.08-.01.17-.02.25-.03-.08.01-.17.02-.25.03-2.35.35-4.44,1.2-1.7,4.25,3.01,3.12,4.12-.67,4.7-2.59.57,1.92,1.23,5.57,4.64,2.59,2.56-2.59.7-3.9-1.65-4.25-.08,0-.17-.02-.25-.03.08.01.17.02-.25.03,1.6.18,3.34-.38,3.83-2.02.15-.5.37-3.48.37-3.89s-.08-1.12-.54-1.32c-.4-.18-1-.37-2.58.74-1.65,1.17-3.43,3.53-4.08,4.8Z" fill="currentColor" />
                      </svg>
                    </a>
                    <a
                      href="https://dribbble.com/YianniG"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Yianni Galiatsatos on Dribbble"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.87 23.87" className="w-6 h-6">
                        <rect width="23.87" height="23.87" rx="5.26" ry="5.26" fill="transparent"/>
                        <path d="M20.4,11.63c0-.47-.07-.94-.16-1.4-.11-.55-.27-1.08-.48-1.59-.22-.5-.47-.98-.79-1.44-.31-.45-.65-.86-1.03-1.25-.38-.37-.81-.74-1.26-1.03-.45-.31-.93-.56-1.43-.78-.5-.21-1.05-.38-1.58-.48-.56-.11-1.14-.18-1.71-.18s-1.15.07-1.7.18c-.53.1-1.08.27-1.58.48-.5.22-1,.48-1.44.78-.44.3-.88.66-1.25,1.03-.39.39-.74.8-1.03,1.25-.32.47-.58.94-.77,1.44-.23.51-.39,1.04-.5,1.59-.09.43-.15.88-.16,1.3-.02.13-.02.26-.02.41,0,.57.06,1.14.18,1.69.11.55.27,1.08.5,1.59.2.5.46.98.77,1.44.3.44.64.86,1.03,1.25.37.39.81.74,1.25,1.03.45.3.94.56,1.44.77.5.22,1.05.39,1.58.5.56.12,1.14.16,1.7.16s1.15-.04,1.71-.16c.53-.11,1.08-.28,1.58-.5.5-.21.99-.47,1.43-.77.45-.3.88-.64,1.26-1.03.38-.39.73-.81,1.03-1.25.32-.47.57-.94.79-1.44.21-.51.37-1.04.48-1.59.11-.56.18-1.14.18-1.69,0-.12,0-.21-.02-.32h0ZM11.95,4.71c1.83,0,3.51.68,4.78,1.8-.02.03-1.05,1.59-3.77,2.62-1.23-2.27-2.6-4.07-2.7-4.21.55-.13,1.11-.21,1.69-.21h0ZM10.22,4.92h0s0,0-.03,0c.02,0,.02,0,.03,0h0ZM8.85,5.4c.1.13,1.44,1.95,2.69,4.17-3.46.92-6.48.88-6.67.88.47-2.24,1.96-4.1,3.98-5.05h0ZM6.57,16.77c-1.15-1.28-1.85-2.97-1.85-4.82,0-.09,0-.16,0-.23.12,0,3.7.08,7.42-1.03.2.4.4.82.59,1.24-.1,0-.2.04-.29.08-3.91,1.25-5.88,4.76-5.88,4.76h0ZM11.95,19.17c-1.68,0-3.21-.58-4.44-1.54h0s-.07-.05-.16-.13c.05.05.1.08.16.13.02-.03,1.42-3.04,5.68-4.52.02,0,.03,0,.05,0,1.01,2.64,1.43,4.86,1.54,5.49-.87.36-1.82.58-2.82.58h0ZM15.99,17.93c-.07-.44-.46-2.55-1.41-5.16,2.34-.37,4.36.26,4.52.31-.34,2.02-1.48,3.76-3.11,4.85h0ZM14.15,11.63c-.07-.13-.12-.25-.16-.37-.12-.26-.23-.5-.34-.76-.05-.09-.09-.19-.15-.29,2.86-1.16,4.01-2.83,4.04-2.86.89,1.09,1.48,2.46,1.61,3.95,0,.19.03.37.03.58-.1-.03-2.56-.56-5.03-.24h0Z" fill="currentColor" style={{ fillRule: 'evenodd' }} />
                      </svg>
                    </a>
                     <a
                      href="mailto:ygaliatsatos@gmail.com"
                      aria-label="Email Yianni Galiatsatos"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Mail className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
