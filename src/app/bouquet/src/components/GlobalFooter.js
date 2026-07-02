'use client';

import Link from 'next/link';

export default function GlobalFooter() {
  return (
    <footer className="relative z-10 py-8 text-center border-t border-charcoal/5">
      <p className="text-xs text-charcoal/40 font-display tracking-[0.2em]">
        MADE WITH 💗 FOR the one I LOVE
      </p>
      <p className="text-[10px] text-charcoal/30 font-display tracking-widest mt-1">
        — BY Arsth
      </p>
      <div className="flex items-center justify-center gap-4 mt-3">
        <Link href="/" className="text-[10px] text-charcoal/30 hover:text-bloom-rose transition-colors tracking-widest font-display">
          HOME
        </Link>
        <span className="text-charcoal/15">·</span>
        <Link href="/build" className="text-[10px] text-charcoal/30 hover:text-bloom-rose transition-colors tracking-widest font-display">
          BUILD
        </Link>
        <span className="text-charcoal/15">·</span>
        <Link href="/garden" className="text-[10px] text-charcoal/30 hover:text-bloom-rose transition-colors tracking-widest font-display">
          GARDEN
        </Link>
      </div>
      <p className="text-[10px] text-charcoal/20 mt-3 font-display tracking-wider">
        BLOOMSHIRE © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
