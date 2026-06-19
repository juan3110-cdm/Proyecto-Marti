import React from 'react';
import { GOLD } from '../tokens';

/**
 * Proyecto Martí brand icon — yellow circle with outline building silhouette.
 * Matches the real logo: three buildings in dark stroke on gold circle.
 */
export const BrandIcon: React.FC<{ size?: number }> = ({ size = 80 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gold circle background */}
      <circle cx="40" cy="40" r="40" fill={GOLD} />

      {/* Buildings outline — stroke style matching real logo */}
      {/* Left building (short, wide) */}
      <rect x="14" y="46" width="16" height="20" rx="0"
        stroke="#1a1a1a" strokeWidth="2.5" fill="none"
        strokeLinejoin="round" />
      {/* Left building top cutout (open top) */}
      <line x1="14" y1="46" x2="30" y2="46" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />

      {/* Middle-left building (tallest, angled top-left) */}
      <path d="M 28 24 L 28 66 L 46 66 L 46 30 Z"
        stroke="#1a1a1a" strokeWidth="2.5" fill="none"
        strokeLinejoin="round" strokeLinecap="round" />
      {/* Angled top detail */}
      <line x1="28" y1="24" x2="36" y2="24" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />

      {/* Right building (medium height, two vertical stripes) */}
      <rect x="47" y="34" width="18" height="32" rx="0"
        stroke="#1a1a1a" strokeWidth="2.5" fill="none"
        strokeLinejoin="round" />
      {/* Vertical stripe inside right building */}
      <line x1="54" y1="34" x2="54" y2="66" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />

      {/* Ground line */}
      <line x1="10" y1="66" x2="70" y2="66" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
