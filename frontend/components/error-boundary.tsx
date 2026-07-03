'use client';

import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRefresh = () => {
    const w = globalThis as unknown as { location?: { reload?: () => void } };
    w.location?.reload?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="rounded-3xl border border-white/10 bg-white/6 p-8 text-center shadow-glow backdrop-blur-xl max-w-md">
            <p className="text-xs uppercase tracking-[0.28em] text-white/40">
              Error
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">
              Something went wrong
            </h2>
            <p className="mt-4 text-white/70">
              {this.state.error?.message ||
                'An unexpected error occurred. Please try refreshing the page.'}
            </p>
            <button
              onClick={this.handleRefresh}
              className="mt-6 rounded-full bg-gradient-to-r from-accent-500 to-orange-700 px-6 py-3 font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
