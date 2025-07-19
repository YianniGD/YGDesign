
"use client";

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PageAnimatorProps {
  children: ReactNode;
}

export default function PageAnimator({ children }: PageAnimatorProps) {
  const pathname = usePathname();
  return (
    <div key={pathname} className={cn("animate-fadeInPage", "h-full", "flex flex-col")}>
      {children}
    </div>
  );
}
