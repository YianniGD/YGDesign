'use client';

import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import SiteFooter from '@/components/layout/SiteFooter';
import PageAnimator from '@/components/layout/PageAnimator';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import ThemeToggleButton from '@/components/theme/ThemeToggleButton';
import InteractiveCursor from '@/components/interactive/InteractiveCursor';
import ParticleBackground from '@/components/interactive/ParticleBackground';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <InteractiveCursor />
      <ParticleBackground />
      <main className="flex-grow relative z-10">
        <PageAnimator>{children}</PageAnimator>
      </main>
      <SiteFooter />
      <Toaster />

      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggleButton />
      </div>
    </ThemeProvider>
  );
}
