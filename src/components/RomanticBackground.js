'use client';

import InteractivePetals from './InteractivePetals';
import CloverLeafAnimation from './CloverLeafAnimation';
import HeartGlowEffect from './HeartGlowEffect';


export default function RomanticBackground() {
    return (
        <>
            {/* Dark pink gradient background */}
            <div className="fixed inset-0 z-[1]" style={{
                background: 'radial-gradient(ellipse at center, #f8c8d8 0%, #e8a0b8 35%, #d4768e 70%, #b85070 100%)',
            }} />

            {/* Soft vignette overlay */}
            <div className="fixed inset-0 z-[1]" style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(140,40,70,0.3) 100%)',
            }} />



            {/* Shiny pulsing hearts */}
            <HeartGlowEffect />

            {/* Interactive falling rose petals (mouse-reactive) */}
            <InteractivePetals />

            {/* Falling clover leaves */}
            <CloverLeafAnimation />
        </>
    );
}
