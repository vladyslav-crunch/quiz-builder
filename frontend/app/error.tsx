'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="rounded-3xl border border-white/10 bg-white/6 p-8 text-center shadow-glow backdrop-blur-xl max-w-md">
        <p className="text-xs uppercase tracking-[0.28em] text-white/40">
          Error
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white">
          Something went wrong
        </h1>
        <p className="mt-4 text-white/70">
          {error.message ||
            'An unexpected error occurred while loading this page.'}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="rounded-full bg-gradient-to-r from-accent-500 to-orange-700 px-6 py-3 font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
          >
            Try again
          </button>
          <button
            onClick={() => router.push('/')}
            className="rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}
