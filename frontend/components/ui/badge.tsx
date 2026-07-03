import type { ReactNode } from 'react';

export function Badge({
  children,
  variant = 'default',
}: {
  children: ReactNode;
  variant?: 'default' | 'success' | 'neutral';
}) {
  const variants = {
    default:
      'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/70',
    success:
      'rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200',
    neutral:
      'rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-2 text-sm text-white/60',
  };

  return <span className={variants[variant]}>{children}</span>;
}
