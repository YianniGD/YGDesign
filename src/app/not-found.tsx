
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <AlertTriangle className="w-20 h-20 text-destructive mb-6" />
      <h1 className="text-4xl font-bold text-foreground mb-3">Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t seem to exist. It might have been moved, deleted, or you might have mistyped the URL.
      </p>
      <Button asChild size="lg">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}
