
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h2 className="text-3xl font-bold text-foreground mb-2">Artwork Not Found</h2>
      <p className="text-muted-foreground mb-6">
        Sorry, we couldn&apos;t find the artwork you&apos;re looking for.
      </p>
      <Button asChild>
        <Link href="/">Return to Homepage</Link> 
      </Button>
    </div>
  );
}
