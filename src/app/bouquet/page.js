'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { decodeBouquet } from '@/lib/encoding';
import { flowers as flowerData, occasions, themes } from '@/lib/flowers';
import { incrementViews, getViews, incrementAppreciations, getAppreciations, hasAppreciated, setAppreciated } from '@/lib/storage';
import BouquetRenderer from '@/components/BouquetRenderer';
import PetalAnimation from '@/components/PetalAnimation';
import ErrorBoundary from '@/components/ErrorBoundary';

function BouquetContent() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get('d');

  const [bouquet, setBouquet] = useState(null);
  const [phase, setPhase] = useState('loading'); // loading, scheduled, bloom, card, full
  const [views, setViews] = useState(0);
  const [appreciations, setAppreciationsState] = useState(0);
  const [appreciated, setAppreciatedState] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!encoded) {
      setError(true);
      return;
    }

    const data = decodeBouquet(encoded);
    if (!data) {
      setError(true);
      return;
    }

    setBouquet(data);

    // Check if scheduled for future
    if (data.s) {
      const scheduledDate = new Date(data.s);
      if (scheduledDate > new Date()) {
        setPhase('scheduled');
        return;
      }
    }

    // Track views
    const v = incrementViews(encoded);
    setViews(v);
    setAppreciationsState(getAppreciations(encoded));
    setAppreciatedState(hasAppreciated(encoded));

    // Start bloom sequence
    setPhase('loading');
    const timer1 = setTimeout(() => setPhase('bloom'), 800);
    const timer2 = setTimeout(() => setShowPetals(true), 1200);
    const timer3 = setTimeout(() => setPhase('card'), 3000);
    const timer4 = setTimeout(() => setPhase('full'), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [encoded]);

  const handleAppreciate = useCallback(() => {
    if (appreciated || !encoded) return;
    const count = incrementAppreciations(encoded);
    setAppreciationsState(count);
    setAppreciated(encoded);
    setAppreciatedState(true);
  }, [appreciated, encoded]);

  const handleSendBack = () => {
    window.open('/build', '_blank');
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="text-center">
          <p className="font-script text-4xl mb-4">🥀</p>
          <h1 className="font-display text-lg tracking-widest mb-2">BOUQUET NOT FOUND</h1>
          <p className="text-charcoal/60 text-sm mb-8">This bouquet link seems to be invalid or expired.</p>
          <Link href="/build" className="btn-primary">
            CREATE YOUR OWN BOUQUET
          </Link>
        </div>
      </div>
    );
  }

  if (!bouquet) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="text-4xl animate-spin-slow mb-4">🌸</div>
          <p className="font-display text-sm tracking-widest text-charcoal/50">PREPARING YOUR BOUQUET...</p>
        </div>
      </div>
    );
  }

  // Check if scheduled
  if (phase === 'scheduled' && bouquet.s) {
    const scheduledDate = new Date(bouquet.s);
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6 animate-float">🌷</div>
          <h1 className="font-script text-4xl mb-4">A Bouquet is on its Way!</h1>
          <p className="text-charcoal/60 mb-6">
            Someone special has a surprise for you. Come back on:
          </p>
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <p className="font-display text-lg tracking-widest">
              {scheduledDate.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
            <p className="text-bloom-rose font-display tracking-wider mt-2">
              {scheduledDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <p className="text-xs text-charcoal/40">✨ Good things are worth waiting for</p>
        </div>
      </div>
    );
  }

  const themeData = themes.find(t => t.id === bouquet.t) || themes[0];
  const occasionData = occasions.find(o => o.id === bouquet.o);
  const themeStyle = bouquet.bw ? { filter: 'grayscale(100%)' } : {};

  return (
    <div
      className="min-h-screen transition-colors duration-1000 relative z-10"
    >
      {/* Petal animation */}
      <PetalAnimation active={showPetals} intensity="medium" />

      {/* Header */}
      <header className="py-6 text-center">
        <Link
          href="/"
          className="font-script text-3xl transition-colors hover:opacity-70"
          style={{ color: themeData.text }}
        >
          Bloomshire
        </Link>
      </header>

      {/* Loading phase */}
      {phase === 'loading' && (
        <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
          <div className="text-center">
            <div className="text-5xl animate-pulse mb-4">✨</div>
            <p className="font-display text-sm tracking-widest animate-pulse" style={{ color: `${themeData.text}80` }}>
              A BOUQUET IS BLOOMING FOR YOU...
            </p>
          </div>
        </div>
      )}

      {/* Bloom + Card + Full phases */}
      {phase !== 'loading' && (
        <div className="max-w-lg mx-auto px-4 pb-32 text-center">
          {/* Occasion tag */}
          {occasionData && phase === 'full' && (
            <div className="mb-4 animate-fade-in">
              <span
                className="inline-block px-4 py-1 rounded-full text-xs font-display tracking-wider"
                style={{ backgroundColor: `${themeData.accent}20`, color: themeData.accent }}
              >
                {occasionData.emoji} {occasionData.label}
              </span>
            </div>
          )}

          {/* Bouquet with bloom animation */}
          <div className={`transition-all duration-1000 ${phase === 'bloom' ? 'bloom-container bloomed' : ''} ${phase !== 'bloom' && phase !== 'loading' ? 'opacity-100' : ''}`}
            style={phase === 'loading' ? { opacity: 0, transform: 'scale(0)' } : phase !== 'bloom' ? { opacity: 1, transform: 'scale(1)' } : undefined}
          >
            <BouquetRenderer
              selectedFlowerIds={bouquet.f || []}
              vaseId={bouquet.v || 'modern'}
              animated={phase === 'bloom'}
              size={340}
            />
          </div>

          {/* Card reveal */}
          {(phase === 'card' || phase === 'full') && (
            <div
              className="mt-6 opacity-0 animate-card-reveal"
              style={{ animationDelay: phase === 'card' ? '0s' : '0s', animationFillMode: 'forwards' }}
            >
              <div
                className="letter-card max-w-sm mx-auto"
                style={{ backgroundColor: themeData.cardBg || '#ffffff' }}
              >
                <div className="relative z-10">
                  <p className="text-sm text-left">Dear {bouquet.c?.recipientName || 'Friend'}</p>
                  <p className="text-sm mt-3 whitespace-pre-wrap text-left">{bouquet.c?.message}</p>
                  <div className="text-right mt-4">
                    <p className="text-sm">{bouquet.c?.closing || 'Sincerely,'}</p>
                    <p className="text-sm font-medium">{bouquet.c?.senderName || 'Secret Admirer'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Flower meanings */}
          {phase === 'full' && (
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards', opacity: 0 }}>
              <h3 className="font-display text-xs tracking-widest mb-4" style={{ color: `${themeData.text}60` }}>
                YOUR BLOOMS & THEIR MEANINGS
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {(bouquet.f || []).map((fId) => {
                  const flower = flowerData.find(f => f.id === fId);
                  if (!flower) return null;
                  return (
                    <div key={fId} className="text-center">
                      <div className="w-12 h-12 mx-auto mb-1">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <circle cx="12" cy="12" r="10" fill={flower.color} opacity="0.3" />
                          <circle cx="12" cy="12" r="6" fill={flower.color} opacity="0.6" />
                        </svg>
                      </div>
                      <p className="text-xs font-medium">{flower.name}</p>
                      <p className="text-xs" style={{ color: `${themeData.text}50` }}>{flower.meaning}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          {phase === 'full' && (
            <div className="mt-10 space-y-4 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards', opacity: 0 }}>
              {/* Appreciation button */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={handleAppreciate}
                  disabled={appreciated}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${appreciated
                    ? 'bg-bloom-rose/20 text-bloom-rose cursor-default'
                    : 'bg-white shadow-sm hover:shadow-md hover:scale-105 active:scale-95'
                    }`}
                  style={!appreciated ? { color: themeData.accent } : undefined}
                >
                  <span className={`text-xl ${appreciated ? 'animate-wiggle' : ''}`}>
                    {appreciated ? '💖' : '🤍'}
                  </span>
                  <span className="text-sm font-medium">
                    {appreciated ? 'Appreciated!' : 'Send Appreciation'}
                  </span>
                  {appreciations > 0 && (
                    <span className="text-xs bg-bloom-rose/10 text-bloom-rose px-2 py-0.5 rounded-full">
                      {appreciations}
                    </span>
                  )}
                </button>
              </div>

              {/* Views counter */}
              <p className="text-xs" style={{ color: `${themeData.text}40` }}>
                👀 Viewed {views} {views === 1 ? 'time' : 'times'}
              </p>

              {/* Send one back */}
              <div className="pt-4">
                <button onClick={handleSendBack} className="btn-primary text-sm" style={{ backgroundColor: themeData.accent }}>
                  🌸 SEND ONE BACK
                </button>
              </div>

              {/* Create your own */}
              <Link href="/build" className="btn-ghost block text-sm">
                CREATE YOUR OWN BOUQUET
              </Link>

              {/* View garden */}
              <Link href="/garden" className="btn-ghost block text-sm">
                VIEW GARDEN
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Music indicator */}
      {bouquet.m && bouquet.m !== 'none' && phase === 'full' && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 text-sm">
            <span className="animate-pulse">🎵</span>
            <span className="text-xs text-charcoal/60">
              {bouquet.m === 'gentle' ? 'Gentle Piano' :
                bouquet.m === 'cheerful' ? 'Cheerful Ukulele' :
                  bouquet.m === 'romantic' ? 'Romantic Strings' :
                    bouquet.m === 'nature' ? 'Nature Sounds' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BouquetPage() {
  return (
    <ErrorBoundary fallbackMessage="This bouquet couldn't be opened. The link may be invalid or expired.">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="text-4xl animate-spin-slow mb-4">🌸</div>
            <p className="font-display text-sm tracking-widest text-charcoal/50">LOADING BOUQUET...</p>
          </div>
        </div>
      }>
        <BouquetContent />
      </Suspense>
    </ErrorBoundary>
  );
}
