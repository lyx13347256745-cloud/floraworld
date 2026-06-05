/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface CrayonCareIconProps {
  id: string; // 'water' | 'fertilize' | 'pest' | 'prune' | 'light' | 'cycle_water'
  color: string;
  size?: number;
  className?: string;
}

export const CrayonCareIcon: React.FC<CrayonCareIconProps> = ({ 
  id, 
  color, 
  size = 36, 
  className = '' 
}) => {
  // Renders beautiful, narrative-driven animated crayon paths representing each action
  const renderPaths = () => {
    switch (id) {
      case 'water': // 💧 Watering / Droplet from top to bottom
        return (
          <g>
            {/* Background static splash base */}
            <path
              d="M 14 40 Q 28 44, 42 40"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.3"
            />
            
            {/* Droplet dripping down with stretching shape */}
            <motion.g
              animate={{ 
                y: [-20, 10, 18],
                opacity: [0, 1, 0],
                scaleY: [1, 1.35, 0.65],
                scaleX: [1, 0.75, 1.35],
              }}
              transition={{ 
                duration: 1.8, 
                repeat: Infinity, 
                ease: [0.45, 0, 0.75, 1] 
              }}
              style={{ originX: "28px", originY: "10px" }}
            >
              {/* Soft inner color fill with crayon style */}
              <path
                d="M 28 10 C 21 22, 16 26, 16 32 C 16 38, 21 42, 28 42 C 35 38, 40 38, 40 32 C 40 26, 35 22, 28 10 Z"
                fill={color}
                fillOpacity="0.3"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* White light reflection scribble */}
              <path
                d="M 23 28 C 21 31, 22 34, 25 35"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </motion.g>

            {/* splash ripples starting when droplet lands */}
            <motion.path
              d="M 16 39 C 24 43, 32 43, 40 39"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                scale: [0.3, 1.15],
                opacity: [0, 0.85, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: 1.1, // trigger around landing timeframe
                ease: "easeOut"
              }}
              style={{ originX: "28px", originY: "41px" }}
            />
          </g>
        );

      case 'fertilize': // 🪵 Cultivation / Fertilizer Sack pouring fertilizer to soil mound
        return (
          <g>
            {/* Soil Mound */}
            <path
              d="M 14 42 Q 28 36, 42 42"
              fill="none"
              stroke="#8B5A2B"
              strokeWidth="3.2"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Sprout seedling growing slightly when grain lands */}
            <motion.g
              animate={{
                scale: [0.95, 1.15, 0.95],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ originX: "32px", originY: "38px" }}
            >
              {/* Seedling sprout stems */}
              <path
                d="M 32 38 Q 33 29, 36 24"
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Cute leaves */}
              <path
                d="M 36 24 C 41 24, 43 18, 36 19 Z"
                fill={color}
                fillOpacity="0.45"
                stroke={color}
                strokeWidth="1.5"
              />
            </motion.g>

            {/* Fertilizer sack bag pouring from top-left */}
            <motion.g
              animate={{
                rotate: [0, -30, 0],
                x: [0, 3, 0],
                y: [0, 1, 0]
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ originX: "22px", originY: "14px" }}
            >
              {/* Sack main body */}
              <path
                d="M 14 10 L 26 6 C 28 12, 28 18, 24 24 C 20 26, 14 24, 12 18 Z"
                fill={color}
                fillOpacity="0.35"
                stroke={color}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Sack tied string rope */}
              <path d="M 16 12 C 18 14, 20 14, 22 12" fill="none" stroke="#D69E2E" strokeWidth="1.5" />
            </motion.g>

            {/* Dropping pellets / fertilizer grains */}
            <motion.circle
              cx="22"
              cy="20"
              r="2"
              fill="#D69E2E"
              animate={{
                y: [2, 18],
                x: [0, 6],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: 0.7,
                ease: "linear"
              }}
            />
            <motion.circle
              cx="25"
              cy="22"
              r="1.5"
              fill="#835008"
              animate={{
                y: [-1, 14],
                x: [0, 4],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: 1.1,
                ease: "linear"
              }}
            />
          </g>
        );

      case 'pest': // 🐛 Pest / Bug appearing and then crossed out by Red X
        return (
          <g>
            {/* The Bug (caterpillar) */}
            <motion.g
              animate={{
                opacity: [1, 1, 0.25, 0.25, 1],
                scale: [1, 1.06, 0.9, 0.9, 1],
                y: [0, -1, 1, 0, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ originX: "28px", originY: "24px" }}
            >
              {/* Worm body - segmented cute caterpillar design */}
              <path
                d="M 14 29 Q 20 19, 26 27 T 38 27 T 46 21"
                fill="none"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Segment internal crayon lines */}
              <path
                d="M 15 28 Q 19 20, 25 26 T 37 26 T 45 20"
                fill="none"
                stroke="#15803d"
                strokeWidth="1.2"
                opacity="0.6"
              />
              {/* Tiny details */}
              <circle cx="20" cy="24" r="1.5" fill="#166534" />
              <circle cx="28" cy="25" r="1.5" fill="#166534" />
              <circle cx="36" cy="25" r="1.5" fill="#166534" />
              {/* Cute responsive eye */}
              <circle cx="44" cy="20" r="1.5" fill="#FFFFFF" />
              <circle cx="44.2" cy="19.8" r="0.7" fill="#000000" />
            </motion.g>

            {/* Red bold cancel X cross-out */}
            <motion.g
              animate={{
                opacity: [0, 0, 1, 1, 0],
                scale: [0.4, 0.4, 1.2, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.175, 0.885, 0.32, 1.25]
              }}
              style={{ originX: "28px", originY: "24px" }}
            >
              {/* Hand-drawn red diagonal strokes */}
              <path
                d="M 15 13 L 41 37"
                fill="none"
                stroke="#EF4444"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M 41 13 L 15 37"
                fill="none"
                stroke="#EF4444"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </motion.g>
          </g>
        );

      case 'prune': // ✂️ Scissors pruning (snip-snip-snip)
        return (
          <g>
            {/* Left pivoting scissor handle + right blade extending */}
            <motion.g
              animate={{ 
                rotate: [0, -15, 2, -15, 2, 0]
              }}
              transition={{ 
                duration: 2.2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ originX: "28px", originY: "22px" }}
            >
              {/* Left hand slot */}
              <path
                d="M 18 33 C 13 33, 12 27, 18 27 C 24 27, 23 33, 18 33 Z"
                fill={color}
                fillOpacity="0.2"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Right Blade */}
              <path
                d="M 28 22 Q 33 16, 36 10"
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </motion.g>

            {/* Right pivoting scissor handle + left blade extending */}
            <motion.g
              animate={{ 
                rotate: [0, 15, -2, 15, -2, 0]
              }}
              transition={{ 
                duration: 2.2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ originX: "28px", originY: "22px" }}
            >
              {/* Right hand slot */}
              <path
                d="M 38 33 C 33 33, 32 27, 38 27 C 44 27, 43 33, 38 33 Z"
                fill={color}
                fillOpacity="0.2"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Left Blade */}
              <path
                d="M 28 22 Q 23 16, 20 10"
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </motion.g>

            {/* Mini leaves falling like they were clipped */}
            <motion.path
              d="M 28 8 Q 30 11, 26 12 Z"
              fill={color}
              opacity="0.8"
              animate={{
                y: [0, 16],
                rotate: [0, 120],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: 0.6,
                ease: "easeOut"
              }}
            />

            {/* Pivot pin */}
            <circle cx="28" cy="22" r="2.5" fill="#D69E2E" stroke={color} strokeWidth="1" />
          </g>
        );

      case 'light': // ☀️ Supplementary light / Glowing Sun emitting yellow rays
        return (
          <g>
            {/* Warm soft pulsing yellow solar halo */}
            <motion.circle
              cx="28"
              cy="24"
              r="16"
              fill="#FBBF24"
              animate={{
                scale: [1, 1.32, 1],
                opacity: [0.15, 0.45, 0.15]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main solar body inside */}
            <motion.circle
              cx="28"
              cy="24"
              r="9.5"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="2.5"
              animate={{
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Radiant sunshine ray strokes expanding outward */}
            <g>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 28 + Math.cos(rad) * 12;
                const y1 = 24 + Math.sin(rad) * 12;
                const x2 = 28 + Math.cos(rad) * 20;
                const y2 = 24 + Math.sin(rad) * 20;
                return (
                  <motion.line
                    key={angle}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#D97706"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    animate={{
                      stroke: ["#D97706", "#FBBF24", "#D97706"],
                      scale: [1, 1.25, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: "easeInOut"
                    }}
                    style={{ originX: "28px", originY: "24px" }}
                  />
                );
              })}
            </g>
          </g>
        );

      case 'cycle_water': // 🔄 Water cycle circular arrows spinning twice before pause
        return (
          <g>
            {/* Main spinning container */}
            <motion.g
              animate={{
                rotate: [0, 360, 720, 720] // Rotates exactly two times (720 deg) and then rests
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut"
              }}
              style={{ originX: "28px", originY: "24px" }}
            >
              {/* Arrow segment 1 */}
              <path
                d="M 38 15 C 43 21, 43 31, 35 37"
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 31 35 L 36 38 L 37 32"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Arrow segment 2 */}
              <path
                d="M 18 33 C 13 27, 13 17, 21 11"
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 25 13 L 20 10 L 19 16"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>

            {/* Inside flowing droplet particles representing flowing fresh water */}
            <motion.circle
              cx="28"
              cy="24"
              r="2.5"
              fill={color}
              animate={{
                scale: [0.5, 1.2, 0.5],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
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
        style={{ filter: 'url(#crayon-displace-care)' }}
      >
        <defs>
          <filter id="crayon-displace-care" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        {renderPaths()}
      </svg>
    </div>
  );
};
