import type { ReactNode } from 'react';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/6 shadow-glow backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
