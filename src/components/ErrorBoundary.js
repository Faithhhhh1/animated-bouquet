'use client';

import { Component } from 'react';
import Link from 'next/link';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🥀</div>
            <h1 className="font-display text-lg tracking-widest mb-2">SOMETHING WENT WRONG</h1>
            <p className="text-charcoal/60 text-sm mb-8">
              {this.props.fallbackMessage || 'Oops! Our flowers got a little wilted. Please try again.'}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="btn-primary block mx-auto"
              >
                TRY AGAIN
              </button>
              <Link href="/" className="btn-ghost block">
                BACK TO HOME
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
