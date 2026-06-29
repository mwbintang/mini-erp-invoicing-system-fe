'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Global Error Caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex max-w-md flex-col items-center text-center space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Something went wrong</h1>
          <p className="text-sm text-gray-500">
            {error.message || "An unexpected error occurred in the application."}
          </p>
          {error.digest && (
            <p className="text-xs text-gray-400 mt-2">Reference ID: {error.digest}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center pt-4">
          <Button onClick={() => reset()} className="w-full sm:w-auto">
            Try again
          </Button>
          <Button variant="outline" onClick={() => router.push('/dashboard')} className="w-full sm:w-auto">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
