
'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showHomeButton = pathname !== '/';

  return (
    <div className="container mx-auto px-4 py-12">
      {showHomeButton && (
        <div className="mb-8">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Homepage
            </Link>
          </Button>
        </div>
      )}
      {children}
    </div>
  );
}
