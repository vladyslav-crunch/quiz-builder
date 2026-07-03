import Link from 'next/link';
import type { ReactNode } from 'react';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-radial-grid bg-[size:24px_24px] opacity-20" />
      <div className="absolute left-[-8rem] top-24 -z-10 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="absolute right-[-6rem] top-40 -z-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <Link
            href="/quizzes"
            className="group flex items-center gap-2 sm:gap-3 min-w-0"
          >
            <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-orange-700 text-base sm:text-lg font-bold text-slate-950 shadow-glow transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
              Q
            </span>
            <div className="hidden sm:block min-w-0">
              <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-white/45 truncate">
                Quiz Builder
              </p>
              <p className="text-sm sm:text-base font-semibold text-white truncate">
                Compose, ship, review
              </p>
            </div>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-white/80 flex-shrink-0">
            <Link
              className="rounded-full px-2 sm:px-4 py-2 transition hover:bg-white/8 hover:text-white whitespace-nowrap text-[11px] sm:text-sm"
              href="/quizzes"
            >
              Dashboard
            </Link>
            <Link
              className="rounded-full bg-white/10 px-2 sm:px-4 py-2 transition hover:bg-white/15 hover:text-white whitespace-nowrap text-[11px] sm:text-sm"
              href="/create"
            >
              Create
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
