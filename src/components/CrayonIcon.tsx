/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CrayonIconProps {
  id: string;
  themeColor: string;
  size?: number;
  className?: string;
}

export const CrayonIcon: React.FC<CrayonIconProps> = ({ id, themeColor, size = 64, className = '' }) => {
  // Let's render custom sketchy, hand-drawn vector paths for each of the 9 categories
  // Pre-drawn with multiple overlapping strokes to give a rich, doodled, wax-crayon appearance!
  const renderIconContent = () => {
    switch (id) {
      case 'health': // Heart with a plus symbol (Medical & Health)
        return (
          <g>
            {/* Sketchy overlapping heart fill */}
            <path
              d="M 28 14 C 23 8, 11 8, 8 16 C 5 24, 15 34, 28 42 C 41 34, 51 24, 48 16 C 45 8, 33 8, 28 14 Z"
              fill={themeColor}
              fillOpacity="0.25"
              stroke={themeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
              style={{ animationDuration: '3s' }}
            />
            {/* Inner doodle stitches */}
            <path
              d="M 16 18 C 20 16, 24 16, 28 20"
              fill="none"
              stroke="#FFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Sketchy plus sign */}
            <path
              d="M 24 28 L 32 28 M 28 24 L 28 32"
              fill="none"
              stroke="#AF311B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        );

      case 'education': // Open book with a star (Education & Science)
        return (
          <g>
            {/* Book baseline */}
            <path
              d="M 8 36 C 18 33, 28 36, 28 36 C 28 36, 38 33, 48 36"
              fill="none"
              stroke={themeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left page fold */}
            <path
              d="M 8 16 C 18 13, 28 16, 28 16 L 28 36 C 28 36, 18 33, 8 36 Z"
              fill={themeColor}
              fillOpacity="0.2"
              stroke={themeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right page fold */}
            <path
              d="M 48 16 C 38 13, 28 16, 28 16 L 28 36 C 28 36, 38 33, 48 36 Z"
              fill={themeColor}
              fillOpacity="0.22"
              stroke={themeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sketchy text lines inside page */}
            <path
              d="M 12 21 L 24 21 M 12 26 L 22 26 M 12 30 L 20 30 M 32 21 L 44 21 M 32 26 L 42 26"
              fill="none"
              stroke={themeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.75"
            />
            {/* Rising Sparkle Star */}
            <path
              d="M 28 6 L 30 11 L 35 11 L 31 14 L 33 19 L 28 16 L 23 19 L 25 14 L 21 11 L 26 11 Z"
              fill="#D97706"
              fillOpacity="0.8"
              stroke="#D97706"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'art': // Painter's Palette & Brush (Art & Design)
        return (
          <g>
            {/* Sketchy palette outline */}
            <path
              d="M 38 12 C 46 15, 49 26, 44 34 C 40 40, 24 44, 16 38 C 10 32, 8 20, 18 14 C 23 11, 28 15, 34 12 Z"
              fill={themeColor}
              fillOpacity="0.18"
              stroke={themeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Thumb hole */}
            <circle cx="18" cy="22" r="3" fill="#FFFDF9" stroke={themeColor} strokeWidth="1.5" />
            
            {/* Color paint blots (crayon circles) */}
            <circle cx="26" cy="18" r="3" fill="#EF4444" fillOpacity="0.75" />
            <circle cx="34" cy="22" r="3.2" fill="#3B82F6" fillOpacity="0.75" />
            <circle cx="32" cy="31" r="2.8" fill="#10B981" fillOpacity="0.75" />
            <circle cx="24" cy="33" r="3" fill="#F59E0B" fillOpacity="0.75" />

            {/* Sketchy Paintbrush */}
            <path
              d="M 12 36 L 41 8"
              fill="none"
              stroke="#B45309"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 39 10 L 43 6"
              fill="none"
              stroke="#4B5563"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 43 6 C 44 5, 45 6, 44 7 Z"
              fill="#D97706"
              stroke="#D97706"
              strokeWidth="1"
            />
          </g>
        );

      case 'business': // Scale of Justice / Money Bag (Business & Law)
        return (
          <g>
            {/* Law Scale - Balance Center Pole */}
            <path
              d="M 28 8 L 28 38 M 20 38 L 36 38"
              fill="none"
              stroke={themeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Crossbeam */}
            <path
              d="M 12 16 L 44 16"
              fill="none"
              stroke={themeColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Left cup chains and pan */}
            <path
              d="M 12 16 L 8 26 M 12 16 L 16 26"
              fill="none"
              stroke={themeColor}
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
            <path
              d="M 6 26 C 10 30, 14 30, 18 26 Z"
              fill={themeColor}
              fillOpacity="0.35"
              stroke={themeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right cup chains and pan */}
            <path
              d="M 44 16 L 40 26 M 44 16 L 48 26"
              fill="none"
              stroke={themeColor}
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
            <path
              d="M 38 26 C 42 30, 46 30, 50 26 Z"
              fill={themeColor}
              fillOpacity="0.35"
              stroke={themeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Coin/Star in center */}
            <circle cx="28" cy="14" r="2.5" fill="#F59E0B" />
          </g>
        );

      case 'tech': // Rocket of Discovery (Technology & Engineering)
        return (
          <g>
            {/* Rocket Body */}
            <path
              d="M 28 8 C 31 16, 32 23, 33 32 L 23 32 C 24 23, 25 16, 28 8 Z"
              fill={themeColor}
              fillOpacity="0.25"
              stroke={themeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Left fin */}
            <path
              d="M 23 26 L 17 32 L 23 32 Z"
              fill={themeColor}
              fillOpacity="0.4"
              stroke={themeColor}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Right fin */}
            <path
              d="M 33 26 L 39 32 L 33 32 Z"
              fill={themeColor}
              fillOpacity="0.4"
              stroke={themeColor}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Window */}
            <circle cx="28" cy="19" r="2.8" fill="#FFF" stroke={themeColor} strokeWidth="1.5" />
            {/* Thrust flame doodle */}
            <path
              d="M 25 33 C 25 38, 28 42, 28 42 C 28 42, 31 38, 31 33 Z"
              fill="#EF4444"
              fillOpacity="0.8"
              stroke="#DC2626"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 26.5 33 C 26.5 36, 28 38, 28 38 C 28 38, 29.5 36, 29.5 33 Z"
              fill="#F59E0B"
            />
          </g>
        );

      case 'service': // Steaming Tea/Coffee Cup (Life Service)
        return (
          <g>
            {/* Cup Outline */}
            <path
              d="M 14 18 L 42 18 C 42 18, 40 34, 28 34 C 16 34, 14 18, 14 18 Z"
              fill={themeColor}
              fillOpacity="0.25"
              stroke={themeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Handle */}
            <path
              d="M 42 21 C 47 22, 47 28, 42 30"
              fill="none"
              stroke={themeColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Saucer plate */}
            <path
              d="M 10 37 C 22 35, 34 35, 46 37"
              fill="none"
              stroke={themeColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Scribble steam lines */}
            <path
              d="M 22 13 C 22 10, 24 10, 24 7 C 24 7, 23 8, 22 11"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 28 13 C 28 9, 30 9, 30 6 C 30 6, 29 7, 28 10"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 34 14 C 34 11, 36 11, 36 8"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        );

      case 'transport': // Flying Wings & Stars (Transportation & Logistics)
        return (
          <g>
            {/* Left wing feather loop */}
            <path
              d="M 28 24 C 20 20, 10 21, 6 25 C 2 29, 8 32, 18 29 C 18 29, 23 27, 28 24 Z"
              fill={themeColor}
              fillOpacity="0.23"
              stroke={themeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right wing feather loop */}
            <path
              d="M 28 24 C 36 20, 46 21, 50 25 C 54 29, 48 32, 38 29 C 38 29, 33 27, 28 24 Z"
              fill={themeColor}
              fillOpacity="0.23"
              stroke={themeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Body Arrow/Plume representing transport vectors */}
            <path
              d="M 28 12 L 32 20 L 28 18 L 24 20 Z"
              fill="#D97706"
              stroke="#D97706"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            {/* Motion horizontal streaks */}
            <path
              d="M 12 34 L 18 34 M 38 34 L 44 34 M 20 37 L 36 37"
              fill="none"
              stroke={themeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          </g>
        );

      case 'agriculture': // Growing Sapling Sprout (Agriculture & Nature)
        return (
          <g>
            {/* Soil mound */}
            <path
              d="M 12 36 C 18 32, 38 32, 44 36 Z"
              fill="#78350F"
              fillOpacity="0.4"
              stroke={themeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Plant stem */}
            <path
              d="M 28 34 C 28 26, 29 18, 28 10"
              fill="none"
              stroke={themeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left Leaf block */}
            <path
              d="M 28 22 C 20 22, 17 15, 28 14 Z"
              fill="#10B981"
              fillOpacity="0.75"
              stroke={themeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Leaf block */}
            <path
              d="M 28 17 C 36 17, 39 10, 28 9 Z"
              fill="#10B981"
              fillOpacity="0.85"
              stroke={themeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sparkle drops of irrigation */}
            <circle cx="28" cy="5" r="1.5" fill="#3B82F6" />
          </g>
        );

      case 'media': // Megaphone/Speaker with sound waves (Media & Communication)
        return (
          <g>
            {/* Megaphone Cone */}
            <path
              d="M 14 26 L 14 20 L 26 15 L 34 15 L 34 31 L 26 31 Z"
              fill={themeColor}
              fillOpacity="0.22"
              stroke={themeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Handle */}
            <path
              d="M 24 28 L 24 35 L 20 35 L 20 29"
              fill="none"
              stroke={themeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Circular bell ring */}
            <path
              d="M 34 15 C 36 15, 36 31, 34 31 Z"
              fill={themeColor}
              fillOpacity="0.5"
              stroke={themeColor}
              strokeWidth="1.5"
            />
            {/* Emitted Soundwave ripples */}
            <path
              d="M 40 18 C 42 20, 42 26, 40 28"
              fill="none"
              stroke="#D97706"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-pulse"
            />
            <path
              d="M 44 14 C 47 17, 47 29, 44 32"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg
        viewBox="0 0 56 48"
        width="100%"
        height="100%"
        style={{ filter: 'url(#crayon-displace)' }}
      >
        {renderIconContent()}
      </svg>
    </div>
  );
};
