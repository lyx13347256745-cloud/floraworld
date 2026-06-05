/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DreamCharacter } from '../types';

interface GildedMedalProps {
  character: DreamCharacter;
  isAnimated?: boolean;
  className?: string; // custom size controls e.g. "w-16 h-16"
}

// Highly robust photo loader helper with multi-path postimg fallback support
export const GildedProfessionImage: React.FC<{ code: string; className?: string; alt?: string; style?: React.CSSProperties }> = ({ code, className = '', alt = '', style }) => {
  const [srcIndex, setSrcIndex] = useState(0);
  
  const sources = [
    `https://i.postimg.cc/${code}/image.png`,
    `https://i.postimg.cc/${code}/image.jpg`,
    `https://i.postimg.cc/${code}/image.jpeg`,
    `https://i.postimg.cc/${code}/preview.png`,
    `https://i.postimg.cc/${code}/preview.jpg`,
    `postimg.cc/${code}`
  ];
  
  const handleError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(srcIndex + 1);
    }
  };

  return (
    <img
      src={sources[srcIndex]}
      onError={handleError}
      className={className}
      style={style}
      alt={alt}
      referrerPolicy="no-referrer"
    />
  );
};

export const GildedMedal: React.FC<GildedMedalProps> = ({
  character,
  isAnimated = false,
  className = "w-full h-full",
}) => {
  // Derive gradients and accents directly from the character's designated primary theme color
  const accentColor = character.color || '#E05A36';
  
  // Safe unique suffix to prevent SVG clipping path collision
  const uid = character.id;

  return (
    <div className={`relative ${className} select-none flex items-center justify-center`}>
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full select-none pointer-events-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Unified Warm Background Gradient matching the app's style */}
          <radialGradient id={`innerWarmBgGrad-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF6" />
            <stop offset="100%" stopColor="#FAF6EE" />
          </radialGradient>

          {/* Rich Tubular Glossy Golden Gradient */}
          <linearGradient id={`glossyGoldGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFEE8" />
            <stop offset="25%" stopColor="#FBDC7A" />
            <stop offset="65%" stopColor="#E99E25" />
            <stop offset="100%" stopColor="#9C5D0C" />
          </linearGradient>

          {/* Inner Golden Gradient for Shield Frame */}
          <linearGradient id={`innerGoldGrad-${uid}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AA690E" />
            <stop offset="40%" stopColor="#FABD4B" />
            <stop offset="85%" stopColor="#FFEFBE" />
            <stop offset="100%" stopColor="#FFFDF5" />
          </linearGradient>

          {/* Wing Feather Volume Gradient */}
          <linearGradient id={`wingGoldGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5CE" />
            <stop offset="50%" stopColor="#F9A93A" />
            <stop offset="100%" stopColor="#BE620A" />
          </linearGradient>

          {/* Laurel Leaves Gradient */}
          <linearGradient id={`laurelLeafGrad-${uid}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#875304" />
            <stop offset="50%" stopColor="#E6A029" />
            <stop offset="100%" stopColor="#FFF6CD" />
          </linearGradient>

          {/* Pastel Sunburst Rays Gradient */}
          <radialGradient id={`sunburstGrad-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Drop Shadow for internal 3D depth */}
          <filter id={`badgeShadow-${uid}`} x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor={accentColor} floodOpacity="0.32" />
          </filter>

          {/* Precise inner star shield mask clip for transparent avatar image */}
          <clipPath id={`starShieldClip-${uid}`}>
            <path 
              d="M 250 134 
                 Q 288 145 308 182 
                 Q 352 182 364 216 
                 Q 338 254 334 290 
                 Q 356 328 331 342 
                 Q 288 328 250 350 
                 Q 212 328 169 342 
                 Q 144 328 166 290 
                 Q 162 254 136 216 
                 Q 148 182 192 182 
                 Q 212 145 250 134 Z" 
            />
          </clipPath>
        </defs>

        {/* LAYER 1: MULTI-TIER PUFFY GOLD FEATHER WINGS (Dynamic flapping on left & right if animated) */}
        <g filter={`url(#badgeShadow-${uid})`}>
          {/* LEFT WING */}
          <motion.g
            animate={isAnimated ? {
              rotate: [-8, 6, -8],
              x: [0, 3, 0],
              y: [0, -2, 0],
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '170px 240px' }}
          >
            {/* Top feather */}
            <path 
              d="M 170 195 
                 C 140 140, 70 145, 60 190 
                 C 50 220, 110 240, 170 215 Z" 
              fill={`url(#wingGoldGrad-${uid})`} 
              stroke="#FFF" 
              strokeWidth="3.5" 
            />
            <path d="M 100 185 C 130 185, 150 190, 160 195" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

            {/* Middle feather */}
            <path 
              d="M 170 225 
                 C 130 190, 50 230, 55 270 
                 C 60 300, 115 300, 170 260 Z" 
              fill={`url(#wingGoldGrad-${uid})`} 
              stroke="#FFF" 
              strokeWidth="3.5" 
            />
            <path d="M 85 235 C 120 235, 140 240, 155 242" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

            {/* Bottom feather */}
            <path 
              d="M 170 260 
                 C 135 250, 75 295, 95 330 
                 C 110 345, 145 325, 170 290 Z" 
              fill={`url(#wingGoldGrad-${uid})`} 
              stroke="#FFF" 
              strokeWidth="3.5" 
            />
            <path d="M 105 280 C 125 280, 145 280, 155 278" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </motion.g>

          {/* RIGHT WING */}
          <motion.g
            animate={isAnimated ? {
              rotate: [8, -6, 8],
              x: [0, -3, 0],
              y: [0, -2, 0],
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '330px 240px' }}
          >
            <g transform="translate(500, 0) scale(-1, 1)">
              {/* Top feather */}
              <path 
                d="M 170 195 
                   C 140 140, 70 145, 60 190 
                   C 50 220, 110 240, 170 215 Z" 
                fill={`url(#wingGoldGrad-${uid})`} 
                stroke="#FFF" 
                strokeWidth="3.5" 
              />
              <path d="M 100 185 C 130 185, 150 190, 160 195" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

              {/* Middle feather */}
              <path 
                d="M 170 225 
                   C 130 190, 50 230, 55 270 
                   C 60 300, 115 300, 170 260 Z" 
                fill={`url(#wingGoldGrad-${uid})`} 
                stroke="#FFF" 
                strokeWidth="3.5" 
              />
              <path d="M 85 235 C 120 235, 140 240, 155 242" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

              {/* Bottom feather */}
              <path 
                d="M 170 260 
                   C 135 250, 75 295, 95 330 
                   C 110 345, 145 325, 170 290 Z" 
                fill={`url(#wingGoldGrad-${uid})`} 
                stroke="#FFF" 
                strokeWidth="3.5" 
              />
              <path d="M 105 280 C 125 280, 145 280, 155 278" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            </g>
          </motion.g>
        </g>

        {/* LAYER 2: THE TRIPLE GOLDEN HEARTS/LEAVES AT THE BOTTOM OF THE SHIELD */}
        <g filter={`url(#badgeShadow-${uid})`}>
          <path d="M 230 405 C 215 425, 190 415, 195 395 C 190 375, 215 365, 230 385 L 230 405 Z" fill={`url(#laurelLeafGrad-${uid})`} stroke="#FFF" strokeWidth="2.5" />
          <path d="M 195 390 C 180 410, 155 400, 160 380 C 155 360, 180 350, 195 370 L 195 390 Z" fill={`url(#laurelLeafGrad-${uid})`} stroke="#FFF" strokeWidth="2.5" />
          <path d="M 160 370 C 145 390, 120 380, 125 360 C 120 340, 145 330, 160 350 L 160 370 Z" fill={`url(#laurelLeafGrad-${uid})`} stroke="#FFF" strokeWidth="2.5" />

          <path d="M 270 405 C 285 425, 310 415, 305 395 C 310 375, 285 365, 270 385 L 270 405 Z" fill={`url(#laurelLeafGrad-${uid})`} stroke="#FFF" strokeWidth="2.5" />
          <path d="M 305 390 C 320 410, 345 400, 340 380 C 345 360, 320 350, 305 370 L 305 390 Z" fill={`url(#laurelLeafGrad-${uid})`} stroke="#FFF" strokeWidth="2.5" />
          <path d="M 340 370 C 355 390, 380 380, 375 360 C 380 340, 355 330, 340 350 L 340 370 Z" fill={`url(#laurelLeafGrad-${uid})`} stroke="#FFF" strokeWidth="2.5" />

          <rect x="235" y="380" width="30" height="20" rx="10" fill={`url(#laurelLeafGrad-${uid})`} stroke="#FFF" strokeWidth="2.5" />
        </g>

        {/* LAYER 3: MAJESTIC ROUNDED-CORNER INTEGRATED GOLD STAR-SHIELD */}
        <g filter={`url(#badgeShadow-${uid})`}>
          <path 
            d="M 250 110 
               Q 295 125 320 165 
               Q 375 165 390 205 
               Q 360 255 355 295 
               Q 380 345 350 365 
               Q 295 345 250 375 
               Q 205 345 150 365 
               Q 120 345 145 295 
               Q 140 255 110 205 
               Q 125 165 180 165 
               Q 205 125 250 110 Z" 
            fill={`url(#glossyGoldGrad-${uid})`} 
            stroke="#835008" 
            strokeWidth="5.5" 
            strokeLinejoin="round" 
          />

          <path 
            d="M 250 120 
               Q 292 133 315 171 
               Q 366 171 380 209 
               Q 351 254 346 292 
               Q 370 338 342 355 
               Q 292 338 250 365 
               Q 208 338 158 355 
               Q 130 338 154 292 
               Q 149 254 120 209 
               Q 134 171 185 171 
               Q 208 133 250 120 Z" 
            fill={`url(#innerGoldGrad-${uid})`} 
            stroke="#FFF" 
            strokeWidth="2.5" 
          />

          <path 
            d="M 250 134 
               Q 288 145 308 182 
               Q 352 182 364 216 
               Q 338 254 334 290 
               Q 356 328 331 342 
               Q 288 328 250 350 
               Q 212 328 169 342 
               Q 144 328 166 290 
               Q 162 254 136 216 
               Q 144 182 192 182 
               Q 212 145 250 134 Z" 
            fill={`url(#innerWarmBgGrad-${uid})`} 
            stroke="#FFF" 
            strokeWidth="3.5" 
          />
        </g>

        {/* LAYER 4: INNER LIGHT RAYS */}
        <g>
          <g opacity="0.25">
            <polygon points="250,340 180,140 210,140" fill="#FFF" />
            <polygon points="250,340 230,140 270,140" fill="#FFF" />
            <polygon points="250,340 290,140 320,140" fill="#FFF" />
            <polygon points="250,340 150,180 170,195" fill="#FFF" />
            <polygon points="250,340 330,195 350,180" fill="#FFF" />
            <polygon points="250,340 140,230 150,250" fill="#FFF" />
            <polygon points="250,340 350,250 360,230" fill="#FFF" />
          </g>
          <circle cx="250" cy="240" r="100" fill={`url(#sunburstGrad-${uid})`} pointerEvents="none" />
        </g>

        {/* LAYER 5: CHARACTER AVATAR IMAGE WITH TRANSPARENT SHIELD CLIPPING */}
        <g clipPath={`url(#starShieldClip-${uid})`}>
          <foreignObject x="135" y="130" width="230" height="230">
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
              <GildedProfessionImage
                code={character.imgCode || 'GBtVS0Fn'}
                className="w-full h-full object-cover filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] scale-[1.26]"
                alt={character.name}
              />
            </div>
          </foreignObject>
        </g>
      </svg>

      {/* THREE-DIMENSIONAL SHINE OVERLAY REFLECTION */}
      <div 
        className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[34%] h-[12%] bg-white/20 rounded-full blur-[2px] pointer-events-none"
        style={{
          transform: 'translateX(-50%) rotate(-12deg)',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)'
        }}
      />
    </div>
  );
};
