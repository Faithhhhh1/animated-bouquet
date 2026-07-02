'use client';

import { useEffect, useState } from 'react';

export default function CloverLeafAnimation() {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        const count = 10;
        const newLeaves = Array.from({ length: count }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 12,
            duration: 10 + Math.random() * 8,
            size: 14 + Math.random() * 10,
            rotation: Math.random() * 360,
            opacity: 0.3 + Math.random() * 0.35,
        }));
        setLeaves(newLeaves);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden" aria-hidden="true">
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    className="petal"
                    style={{
                        left: `${leaf.left}%`,
                        animation: `petalDrift ${leaf.duration}s ease-in-out ${leaf.delay}s infinite`,
                    }}
                >
                    {/* Four-leaf clover SVG */}
                    <svg
                        width={leaf.size}
                        height={leaf.size}
                        viewBox="0 0 40 40"
                        style={{
                            transform: `rotate(${leaf.rotation}deg)`,
                            opacity: leaf.opacity,
                            filter: 'drop-shadow(0 1px 2px rgba(0,80,0,0.2))',
                        }}
                    >
                        {/* Top leaf */}
                        <ellipse cx="20" cy="12" rx="7" ry="9" fill="#4caf50" />
                        {/* Bottom leaf */}
                        <ellipse cx="20" cy="28" rx="7" ry="9" fill="#388e3c" />
                        {/* Left leaf */}
                        <ellipse cx="12" cy="20" rx="9" ry="7" fill="#43a047" />
                        {/* Right leaf */}
                        <ellipse cx="28" cy="20" rx="9" ry="7" fill="#66bb6a" />
                        {/* Center dot */}
                        <circle cx="20" cy="20" r="2.5" fill="#2e7d32" />
                        {/* Tiny stem */}
                        <path d="M20,29 C20,34 21,38 22,40" stroke="#2e7d32" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                </div>
            ))}
        </div>
    );
}
