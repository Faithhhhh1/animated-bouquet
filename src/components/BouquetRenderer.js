'use client';

import FlowerSVG from './FlowerSVG';
import VaseSVG from './VaseSVG';

/**
 * Returns tightly-clustered, organic positions for a bouquet.
 * Flowers fan out from a central point above the vase in a dome shape.
 */
function getBouquetPositions(count) {
  if (count === 0) return [];

  // Hand-tuned positions for small counts so they look intentional
  if (count === 1) {
    return [{ x: 50, y: 28, scale: 1.2, rotate: 0, z: 1 }];
  }
  if (count === 2) {
    return [
      { x: 40, y: 26, scale: 1.1, rotate: -12, z: 2 },
      { x: 60, y: 24, scale: 1.1, rotate: 10, z: 1 },
    ];
  }
  if (count === 3) {
    return [
      { x: 50, y: 18, scale: 1.15, rotate: 0, z: 3 },
      { x: 34, y: 30, scale: 1.0, rotate: -18, z: 2 },
      { x: 66, y: 28, scale: 1.0, rotate: 14, z: 1 },
    ];
  }
  if (count === 4) {
    return [
      { x: 42, y: 18, scale: 1.1, rotate: -6, z: 4 },
      { x: 58, y: 16, scale: 1.1, rotate: 6, z: 3 },
      { x: 30, y: 32, scale: 0.95, rotate: -20, z: 2 },
      { x: 70, y: 30, scale: 0.95, rotate: 18, z: 1 },
    ];
  }
  if (count === 5) {
    return [
      { x: 50, y: 14, scale: 1.15, rotate: 0, z: 5 },
      { x: 36, y: 24, scale: 1.05, rotate: -14, z: 4 },
      { x: 64, y: 22, scale: 1.05, rotate: 12, z: 3 },
      { x: 26, y: 36, scale: 0.9, rotate: -24, z: 2 },
      { x: 74, y: 34, scale: 0.9, rotate: 22, z: 1 },
    ];
  }

  // For 6+ flowers: dome-fan layout
  const positions = [];

  // Top-center hero flower
  positions.push({ x: 50, y: 12, scale: 1.15, rotate: 0, z: count });

  // Upper arc (up to 4 flowers fanning out)
  const upperCount = Math.min(count - 1, 4);
  const upperSpread = 18;
  for (let i = 0; i < upperCount; i++) {
    const t = upperCount === 1 ? 0 : (i / (upperCount - 1)) * 2 - 1; // -1 to 1
    const fanAngle = t * 40; // degrees from center
    const rad = (fanAngle * Math.PI) / 180;
    positions.push({
      x: 50 + Math.sin(rad) * (upperSpread + Math.abs(t) * 8),
      y: 20 + Math.abs(t) * 10,
      scale: 1.05 - Math.abs(t) * 0.1,
      rotate: fanAngle * 0.5,
      z: count - 1 - i,
    });
  }

  // Lower arc for remaining flowers
  const remaining = count - 1 - upperCount;
  for (let i = 0; i < remaining; i++) {
    const t = remaining === 1 ? 0 : (i / (remaining - 1)) * 2 - 1;
    const fanAngle = t * 55;
    const rad = (fanAngle * Math.PI) / 180;
    positions.push({
      x: 50 + Math.sin(rad) * (24 + Math.abs(t) * 6),
      y: 34 + Math.abs(t) * 6,
      scale: 0.85 - Math.abs(t) * 0.05,
      rotate: fanAngle * 0.45,
      z: remaining - i,
    });
  }

  return positions;
}

/**
 * Generates organic leaf paths for the foliage behind the flowers.
 * Uses curved paths instead of ellipses for a natural look.
 */
function FoliageSVG({ flowerCount }) {
  // More flowers = more foliage
  const density = Math.min(flowerCount, 8);

  // Leaf path generator — curved, tapered shapes
  const makeLeaf = (cx, cy, length, angle, width = 0.35) => {
    const rad = (angle * Math.PI) / 180;
    const tipX = cx + Math.cos(rad) * length;
    const tipY = cy + Math.sin(rad) * length;
    const perpRad = rad + Math.PI / 2;
    const w = length * width;
    const cp1x = cx + Math.cos(rad) * length * 0.4 + Math.cos(perpRad) * w;
    const cp1y = cy + Math.sin(rad) * length * 0.4 + Math.sin(perpRad) * w;
    const cp2x = cx + Math.cos(rad) * length * 0.4 - Math.cos(perpRad) * w;
    const cp2y = cy + Math.sin(rad) * length * 0.4 - Math.sin(perpRad) * w;
    return `M${cx},${cy} Q${cp1x},${cp1y} ${tipX},${tipY} Q${cp2x},${cp2y} ${cx},${cy}`;
  };

  // Define leaf clusters spreading from the center-bottom of bouquet
  const leaves = [
    // Left side — sweeping outward
    { cx: 48, cy: 52, len: 26, angle: -120, color: '#4a7c59', opacity: 0.55 },
    { cx: 46, cy: 48, len: 22, angle: -140, color: '#5a8a5a', opacity: 0.45 },
    { cx: 44, cy: 55, len: 20, angle: -100, color: '#6a9b6a', opacity: 0.4 },
    { cx: 42, cy: 42, len: 18, angle: -155, color: '#7aaa7a', opacity: 0.35 },
    // Right side — sweeping outward
    { cx: 52, cy: 52, len: 26, angle: -60, color: '#4a7c59', opacity: 0.55 },
    { cx: 54, cy: 48, len: 22, angle: -40, color: '#5a8a5a', opacity: 0.45 },
    { cx: 56, cy: 55, len: 20, angle: -80, color: '#6a9b6a', opacity: 0.4 },
    { cx: 58, cy: 42, len: 18, angle: -25, color: '#7aaa7a', opacity: 0.35 },
    // Center top — filling behind flowers
    { cx: 50, cy: 46, len: 20, angle: -90, color: '#5a8a5a', opacity: 0.4 },
    { cx: 47, cy: 44, len: 16, angle: -110, color: '#6a9b6a', opacity: 0.35 },
    { cx: 53, cy: 44, len: 16, angle: -70, color: '#6a9b6a', opacity: 0.35 },
    // Extra fills for larger bouquets
    { cx: 38, cy: 50, len: 24, angle: -135, color: '#3d6b2e', opacity: 0.3 },
    { cx: 62, cy: 50, len: 24, angle: -45, color: '#3d6b2e', opacity: 0.3 },
  ];

  // Only show leaves proportional to flower count
  const visibleLeaves = leaves.slice(0, Math.min(4 + density, leaves.length));

  return (
    <g>
      {/* Soft green wash behind everything */}
      <ellipse cx="50" cy="44" rx={18 + density * 2} ry={12 + density} fill="#4a7c59" opacity="0.08" />

      {/* Organic leaf shapes */}
      {visibleLeaves.map((leaf, i) => (
        <path
          key={i}
          d={makeLeaf(leaf.cx, leaf.cy, leaf.len, leaf.angle)}
          fill={leaf.color}
          opacity={leaf.opacity}
          stroke={leaf.color}
          strokeWidth="0.3"
        />
      ))}

      {/* Baby's breath / filler dots */}
      {density >= 3 && (
        <g opacity="0.5">
          {[
            [28, 36], [72, 34], [22, 42], [78, 40],
            [32, 28], [68, 26], [26, 50], [74, 48],
            [35, 22], [65, 20], [38, 44], [62, 42],
          ].slice(0, density + 2).map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="1.2" fill="white" opacity="0.7" />
              <circle cx={x + 2} cy={y - 1.5} r="0.9" fill="white" opacity="0.5" />
              <circle cx={x - 1.5} cy={y + 1} r="0.8" fill="white" opacity="0.4" />
            </g>
          ))}
        </g>
      )}

      {/* Stems converging to vase center */}
      <g opacity="0.5" strokeLinecap="round">
        <path d="M50 50 C50 58, 50 66, 50 76" stroke="#4a7c59" strokeWidth="1.8" fill="none" />
        <path d="M44 48 C44 55, 46 65, 48 76" stroke="#4a7c59" strokeWidth="1.2" fill="none" />
        <path d="M56 48 C56 55, 54 65, 52 76" stroke="#4a7c59" strokeWidth="1.2" fill="none" />
        {density >= 4 && (
          <>
            <path d="M38 50 C40 58, 44 66, 47 76" stroke="#4a7c59" strokeWidth="0.9" fill="none" />
            <path d="M62 50 C60 58, 56 66, 53 76" stroke="#4a7c59" strokeWidth="0.9" fill="none" />
          </>
        )}
        {density >= 6 && (
          <>
            <path d="M32 52 C36 60, 42 68, 46 76" stroke="#4a7c59" strokeWidth="0.7" fill="none" />
            <path d="M68 52 C64 60, 58 68, 54 76" stroke="#4a7c59" strokeWidth="0.7" fill="none" />
          </>
        )}
      </g>
    </g>
  );
}

export default function BouquetRenderer({
  selectedFlowerIds = [],
  vaseId = 'modern',
  animated = false,
  size = 340,
  className = '',
}) {
  const positions = getBouquetPositions(selectedFlowerIds.length);
  const flowerSize = size * 0.32; // Larger flowers
  const vaseSize = size * 0.52;
  const height = size * 1.2;

  return (
    <div
      className={`bouquet-wrapper relative mx-auto ${className}`}
      style={{ width: size, height }}
    >
      {/* Soft shadow under bouquet */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: 4,
          width: size * 0.4,
          height: 12,
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Foliage & stems SVG layer */}
      <svg
        viewBox="0 0 100 120"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <FoliageSVG flowerCount={selectedFlowerIds.length} />
      </svg>

      {/* Flowers */}
      {selectedFlowerIds.map((flowerId, index) => {
        const pos = positions[index];
        if (!pos) return null;
        const delay = animated ? index * 0.15 : 0;
        return (
          <div
            key={`${flowerId}-${index}`}
            className={`absolute ${animated ? 'bloom-container' : ''}`}
            style={{
              left: `${pos.x}%`,
              top: `${(pos.y / 120) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${pos.rotate}deg) scale(${pos.scale})`,
              zIndex: pos.z + 1,
              animationDelay: animated ? `${delay}s` : undefined,
              animationFillMode: 'forwards',
              ...(animated ? {} : { opacity: 1 }),
              // Subtle drop shadow on each flower for depth
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.08))',
            }}
          >
            <FlowerSVG flowerId={flowerId} size={flowerSize} />
          </div>
        );
      })}

      {/* Vase — overlaps the bottom of stems */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: 0,
          zIndex: selectedFlowerIds.length + 2,
        }}
      >
        <VaseSVG vaseId={vaseId} size={vaseSize} />
      </div>
    </div>
  );
}
