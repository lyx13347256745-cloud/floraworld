/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ChibiAvatarProps {
  type: string;
  size?: number;
  className?: string;
  isAnimated?: boolean;
}

export const ChibiAvatar: React.FC<ChibiAvatarProps> = ({
  type,
  size = 120,
  className = '',
  isAnimated = false,
}) => {
  // Common visual accents: hand-drawn crayon/sketch filter (rough borders, soft shadows)
  const roughFilterId = `rough-sketch-${type}`;

  // Shared facial base (peach skin, cute rosy cheeks, circular sparkling eyes, tiny smiling red mouth)
  const renderFaceBase = () => (
    <g id="face-base">
      {/* Neck */}
      <rect x="52" y="65" width="16" height="15" fill="#FFE3D1" rx="4" />
      {/* Face Circle */}
      <circle cx="60" cy="45" r="26" fill="#FFEEDC" stroke="#7C2D12" strokeWidth="2.5" />
      {/* Rosy Cheeks */}
      <circle cx="43" cy="51" r="5" fill="#FF8D8D" opacity="0.6" />
      {/* Rosy Cheeks Right */}
      <circle cx="77" cy="51" r="5" fill="#FF8D8D" opacity="0.6" />
      {/* Simple Smile */}
      <path d="M 56 53 Q 60 57 64 53" fill="none" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
      {/* Big Cute Round Eyes */}
      <circle cx="46" cy="43" r="3.5" fill="#1E293B" />
      <circle cx="74" cy="43" r="3.5" fill="#1E293B" />
      {/* Eye Highlights */}
      <circle cx="45" cy="41.5" r="1.2" fill="#FFFFFF" />
      <circle cx="73" cy="41.5" r="1.2" fill="#FFFFFF" />
      {/* Eyebrows */}
      <path d="M 41 37 Q 46 35 49 37" fill="none" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 71 37 Q 74 35 79 37" fill="none" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round" />
      {/* Ears */}
      <circle cx="33" cy="45" r="5" fill="#FFEEDC" stroke="#7C2D12" strokeWidth="2" />
      <circle cx="87" cy="45" r="5" fill="#FFEEDC" stroke="#7C2D12" strokeWidth="2" />
    </g>
  );

  const getAvatarContent = () => {
    switch (type) {
      case 'singer':
        return (
          <g id="portrait-singer">
            {/* Background elements */}
            <path d="M 15 25 L 20 15 L 25 22 Z" fill="#FDBA74" opacity="0.7" />
            <path d="M 95 35 L 105 32 L 98 42 Z" fill="#93C5FD" opacity="0.7" />
            <circle cx="20" cy="80" r="4" fill="#F472B6" />
            <circle cx="102" cy="75" r="5" fill="#FDBA74" />
            {/* Hair back */}
            <path d="M 33 40 Q 20 60 30 75 Q 40 80 50 72 Z" fill="#474340" />
            <path d="M 87 40 Q 100 60 90 75 Q 80 80 70 72 Z" fill="#474340" />
            
            {renderFaceBase()}

            {/* Hair Front / Bangs */}
            <path d="M 32 40 Q 60 12 88 40 Q 75 28 60 33 Q 45 28 32 40 Z" fill="#474340" stroke="#1E1E1C" strokeWidth="1.5" />
            {/* Cross necklace as shown in drawing */}
            <path d="M 56 75 L 64 75 M 60 71 L 60 81" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
            {/* Clothes (Red/Orange coat as drawn) */}
            <path d="M 34 76 C 34 76 40 70 60 70 C 80 70 86 76 86 76 L 82 92 C 82 95 78 98 75 98 L 45 98 C 42 98 38 95 38 92 Z" fill="#EF4444" stroke="#7C2D12" strokeWidth="2" />
            {/* Inner blue top */}
            <path d="M 52 70 L 68 70 L 60 78 Z" fill="#3B82F6" />
            {/* Silver Cross on top */}
            <path d="M 60 75 L 60 83 M 56 78 L 64 78" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            {/* Microphome held in hand as in drawing */}
            <g transform="translate(18, 55)">
              {/* Mic Stand handle */}
              <rect x="18" y="22" width="5" height="18" fill="#475569" rx="1.5" />
              {/* Mesh head */}
              <circle cx="20.5" cy="18" r="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
              <line x1="16" y1="18" x2="25" y2="18" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="20.5" y1="13" x2="20.5" y2="23" stroke="#FFFFFF" strokeWidth="1" />
            </g>
          </g>
        );

      case 'doctor':
        return (
          <g id="portrait-doctor">
            {/* Floating Cross Accents */}
            <path d="M 18 20 H 26 M 22 16 V 24" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 98 56 H 104 M 101 53 V 59" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            
            {/* Hair */}
            <path d="M 31 38 Q 60 14 89 38 Q 94 50 82 58 Q 60 62 38 58 Q 26 50 31 38" fill="#3B82F6" stroke="#1E293B" strokeWidth="2" />
            
            {renderFaceBase()}

            {/* Glasses */}
            <circle cx="45" cy="43" r="10" fill="none" stroke="#EA580C" strokeWidth="2" />
            <circle cx="75" cy="43" r="10" fill="none" stroke="#EA580C" strokeWidth="2" />
            <line x1="55" y1="43" x2="65" y2="43" stroke="#EA580C" strokeWidth="2" />
            <line x1="35" y1="43" x2="31" y2="45" stroke="#EA580C" strokeWidth="2" />
            <line x1="85" y1="43" x2="89" y2="45" stroke="#EA580C" strokeWidth="2" />

            {/* Clothes (Doctor's Coat with stethoscope) */}
            <path d="M 32 76 Q 60 68 88 76 L 84 98 H 36 Z" fill="#FFFFFF" stroke="#7C2D12" strokeWidth="2" />
            <path d="M 50 71 L 60 84 L 70 71" fill="none" stroke="#FFEEDC" strokeWidth="2" />
            {/* Red Shirt showing inside */}
            <path d="M 54 84 L 60 92 L 66 84 Z" fill="#EF4444" />
            {/* Stethoscope */}
            <path d="M 42 66 Q 42 84 60 84 Q 78 84 78 66" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 60 84 L 60 91" stroke="#64748B" strokeWidth="2.5" />
            <circle cx="60" cy="93" r="3.5" fill="#EA580C" />
          </g>
        );

      case 'scientist':
        return (
          <g id="portrait-scientist">
            {/* Sparkles / Science Accents */}
            <path d="M 22 25 L 26 30 L 22 35 L 18 30 Z" fill="#14B8A6" />
            <circle cx="95" cy="22" r="3" fill="#A855F7" />
            {/* Wavy hair with a deep blue color as drawn */}
            <path d="M 31 40 Q 20 18 60 18 Q 100 18 89 40 L 92 65 Q 60 60 28 65 Z" fill="#1E3A8A" />
            
            {renderFaceBase()}

            {/* Glasses */}
            <rect x="36" y="38" width="16" height="11" rx="2" fill="none" stroke="#475569" strokeWidth="2" />
            <rect x="68" y="38" width="16" height="11" rx="2" fill="none" stroke="#475569" strokeWidth="2" />
            <line x1="52" y1="43" x2="68" y2="43" stroke="#475569" strokeWidth="2" />

            {/* Clothes */}
            <path d="M 32 76 Q 60 68 88 76 L 82 98 H 38 Z" fill="#FFFFFF" stroke="#7C2D12" strokeWidth="2" />
            {/* Inner purple shirt */}
            <path d="M 52 70 L 68 70 L 60 80 Z" fill="#8B5CF6" />
            {/* Lab Beaker in hand representing science */}
            <g transform="translate(14, 52)">
              {/* Flask body */}
              <path d="M 12 28 L 6 38 Q 5 40 7 42 L 23 42 Q 25 40 24 38 L 18 28 Z" fill="#14B8A6" opacity="0.8" stroke="#115E59" strokeWidth="1.5" />
              {/* Flask neck */}
              <rect x="12" y="20" width="6" height="8" fill="#E2E8F0" stroke="#115E59" strokeWidth="1.5" />
              {/* Bubbles */}
              <circle cx="15" cy="14" r="2" fill="#2DD4BF" />
              <circle cx="11" cy="9" r="1.5" fill="#2DD4BF" opacity="0.6" />
              <circle cx="21" cy="11" r="1.5" fill="#2DD4BF" opacity="0.8" />
            </g>
          </g>
        );

      case 'nurse':
        return (
          <g id="portrait-nurse">
            {/* Red plus signs as shown in drawings */}
            <path d="M 16 35 H 24 M 20 31 V 39" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            <path d="M 100 22 H 106 M 103 19 V 25" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            
            {/* Orange hair background as drawn */}
            <path d="M 30 46 Q 16 30 60 22 Q 104 30 90 46 L 88 66 Q 60 60 32 66 Z" fill="#EA580C" />
            
            {renderFaceBase()}

            {/* Nurse Cap */}
            <path d="M 40 26 L 46 12 L 74 12 L 80 26 Z" fill="#FFFFFF" stroke="#7C2D12" strokeWidth="2" />
            <path d="M 56 19 H 64 M 60 15 V 23" stroke="#F43F5E" strokeWidth="2.2" strokeLinecap="round" />

            {/* Clothes */}
            <path d="M 32 76 Q 60 70 88 76 L 82 98 H 38 Z" fill="#FFFFFF" stroke="#7C2D12" strokeWidth="2" />
            {/* Collar lines */}
            <path d="M 46 73 L 42 82 M 74 73 L 78 82" stroke="#FDA4AF" strokeWidth="1.5" />
            {/* Clipboard / tablet representation in hand */}
            <rect x="12" y="65" width="16" height="22" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
            <rect x="15" y="62" width="10" height="4" rx="1" fill="#475569" />
            <line x1="16" y1="71" x2="24" y2="71" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="16" y1="76" x2="24" y2="76" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="16" y1="81" x2="21" y2="81" stroke="#94A3B8" strokeWidth="1.5" />
          </g>
        );

      case 'pilot':
        return (
          <g id="portrait-pilot">
            {/* Flight Trail / Small Plane Behind */}
            <path d="M 12 35 Q 28 20 62 16 Q 96 12 108 30" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="4 4" />
            <path d="M 108 30 L 102 24 L 111 26 Z" fill="#F43F5E" />

            {/* Pilot Cap / Flight hat (Verdigris Red Cap) */}
            <path d="M 28 42 L 34 22 Q 60 10 86 22 L 92 42 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
            {/* Yellow emblem ornament */}
            <circle cx="60" cy="18" r="4.5" fill="#FBBF24" stroke="#7C2D12" strokeWidth="1" />
            <polygon points="60,11 62,15 66,15 63,18 64,22 60,20 56,22 57,18 54,15 58,15" fill="#FBBF24" />

            {renderFaceBase()}

            {/* Scarf / Aviator tie/collar blowing in the wind as drawn */}
            <path d="M 50 72 L 40 85 L 20 82 L 32 72 Z" fill="#14B8A6" stroke="#0D9488" strokeWidth="1.5" />
            <path d="M 70 72 L 80 85 L 100 82 L 88 72 Z" fill="#14B8A6" stroke="#0D9488" strokeWidth="1.5" />

            {/* Clothes */}
            <path d="M 32 76 Q 60 70 88 76 L 82 98 H 38 Z" fill="#991B1B" stroke="#7C2D12" strokeWidth="2" />
            {/* Gold Buttons */}
            <circle cx="60" cy="82" r="2" fill="#FBBF24" />
            <circle cx="60" cy="90" r="2" fill="#FBBF24" />
          </g>
        );

      case 'farmer':
        return (
          <g id="portrait-farmer">
            {/* Leaf Accents / Sun rays */}
            <path d="M 18 20 Q 25 15 25 25 Q 15 25 18 20 Z" fill="#22C55E" opacity="0.8" />
            <circle cx="100" cy="25" r="4" fill="#FBBF24" />
            
            {/* Straw/Woven farmers hat (Dunhuang yellow hat as shown in drawings) */}
            <path d="M 28 32 Q 60 8 92 32 L 98 42 Q 60 30 22 42 Z" fill="#FCD34D" stroke="#7C2D12" strokeWidth="2" />
            <ellipse cx="60" cy="22" rx="4" ry="7" fill="none" stroke="#B45309" strokeWidth="1.5" />

            {renderFaceBase()}

            {/* Green onions / Leeks background (holds plant) as drawn */}
            <g transform="translate(18, 55)">
              {/* Leek stalks and roots */}
              <line x1="5" y1="28" x2="16" y2="12" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
              <line x1="12" y1="28" x2="22" y2="6" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="8" y1="28" x2="10" y2="18" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
              {/* Leek white bottom bulb */}
              <ellipse cx="6" cy="28" rx="3.5" ry="5" fill="#FFFFFF" stroke="#7C2D12" strokeWidth="1.5" />
            </g>

            {/* Clothes (Earth tone/green overall) */}
            <path d="M 32 76 Q 60 70 88 76 L 82 98 H 38 Z" fill="#15803D" stroke="#7C2D12" strokeWidth="2" />
            {/* Brown sash */}
            <path d="M 38 74 Q 60 76 82 74 M 42 85 H 78" stroke="#F59E0B" strokeWidth="3" />
          </g>
        );

      case 'vet':
        return (
          <g id="portrait-vet">
            {/* Sweet Heart Accents */}
            <path d="M 18 22 C 14 18, 10 21, 10 25 C 10 32, 18 36, 18 36 C 18 36, 26 32, 26 25 C 26 21, 22 18, 18 22 Z" fill="#EC4899" />
            <path d="M 102 44 C 99 41, 96 43, 96 46 C 96 51, 102 54, 102 54 C 102 54, 108 51, 108 46 C 108 43, 105 41, 102 44 Z" fill="#EC4899" opacity="0.8" />

            {/* Wavy Hair (Black with red ribbon) */}
            <path d="M 28 42 Q 15 62 26 77 Q 35 83 45 74 Z" fill="#332A26" />
            <path d="M 92 42 Q 105 62 94 77 Q 85 83 75 74 Z" fill="#332A26" />

            {renderFaceBase()}

            {/* Hair accessory (Pink ribbon bow) */}
            <circle cx="34" cy="28" r="4" fill="#F472B6" />
            <polygon points="34,28 26,20 26,36" fill="#F472B6" />
            <polygon points="34,28 42,20 42,36" fill="#F472B6" />

            {/* Cute Puppy under arm (holds dog as in drawing) */}
            <g transform="translate(10, 60)">
              {/* Dog Head */}
              <circle cx="16" cy="22" r="11" fill="#D97706" stroke="#7C2D12" strokeWidth="1.5" />
              {/* Dog Ears */}
              <ellipse cx="6" cy="16" rx="4" ry="7" fill="#7C2D12" />
              <ellipse cx="26" cy="16" rx="4" ry="7" fill="#7C2D12" />
              {/* Dog Eyes */}
              <circle cx="12" cy="20" r="1.5" fill="#1E293B" />
              <circle cx="20" cy="20" r="1.5" fill="#1E293B" />
              {/* Dog Nose/Mouth */}
              <circle cx="16" cy="24" r="2" fill="#1E293B" />
              {/* Heart floating near dog */}
              <path d="M 28 10 C 26.5 8, 24.5 9, 24.5 11 C 24.5 14, 28 16, 28 16 C 28 16, 31.5 14, 31.5 11 C 31.5 9, 29.5 8, 28 10 Z" fill="#EF4444" />
            </g>

            {/* Clothes (Blue vest coat) */}
            <path d="M 36 76 C 36 76 43 71 60 71 C 77 71 84 76 84 76 L 80 98 H 40 Z" fill="#3B82F6" stroke="#7C2D12" strokeWidth="2" />
            <circle cx="60" cy="80" r="2.5" fill="#FFFFFF" />
            <path d="M 52 71 L 60 84 L 68 71" fill="none" stroke="#FFEEDC" strokeWidth="2" />
          </g>
        );

      case 'chef':
        return (
          <g id="portrait-chef">
            {/* Fire / Cooking sparks */}
            <path d="M 18 25 Q 14 15 20 10 Q 24 16 18 25 Z" fill="#F97316" />
            <circle cx="102" cy="30" r="4.5" fill="#EF4444" />
            
            {/* Tall White Chef's Hat (Classical white hat) */}
            <path d="M 38 22 C 34 22, 32 10, 44 8 C 50 4, 70 4, 76 8 C 88 10, 86 22, 82 22 Z" fill="#FFFFFF" stroke="#7C2D12" strokeWidth="2" />
            <rect x="38" y="19" width="44" height="6" fill="#F8FAFC" stroke="#7C2D12" strokeWidth="1.5" />
            
            {renderFaceBase()}

            {/* Spatula / Ladle representation inside drawing */}
            <g transform="translate(14, 52)">
              {/* Spatula rod */}
              <line x1="5" y1="36" x2="16" y2="12" stroke="#94A3B8" strokeWidth="2" />
              {/* Spatula square paddle */}
              <rect x="12" y="8" width="8" height="10" rx="1.5" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5" transform="rotate(30, 16, 13)" />
              {/* Slits in spatula */}
              <line x1="15" y1="11" x2="18" y2="15" stroke="#94A3B8" strokeWidth="1" />
            </g>

            {/* Clothes (Chef coat with red neck-scarf) */}
            <path d="M 32 76 Q 60 70 88 76 L 82 98 H 38 Z" fill="#FFFFFF" stroke="#7C2D12" strokeWidth="2" />
            {/* Double buttons */}
            <circle cx="50" cy="82" r="2" fill="#475569" />
            <circle cx="50" cy="90" r="2" fill="#475569" />
            <circle cx="70" cy="82" r="2" fill="#475569" />
            <circle cx="70" cy="90" r="2" fill="#475569" />
            {/* Red neck-scarf */}
            <path d="M 46 72 Q 60 84 74 72 L 60 75 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
          </g>
        );

      case 'engineer':
        return (
          <g id="portrait-engineer">
            {/* Gears pattern background */}
            <circle cx="20" cy="22" r="6" fill="none" stroke="#64748B" strokeWidth="2.5" strokeDasharray="3 3" />
            <path d="M 98 25 L 108 25 M 103 20 L 103 30" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

            {/* Blue and silver headphones / safety gears as in drawing */}
            <path d="M 31 42 Q 31 16 60 16 Q 89 16 89 42" fill="none" stroke="#1E293B" strokeWidth="5.5" strokeLinecap="round" />
            <rect x="25" y="34" width="8" height="15" rx="3" fill="#3B82F6" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="87" y="34" width="8" height="15" rx="3" fill="#3B82F6" stroke="#1E293B" strokeWidth="1.5" />

            {renderFaceBase()}

            {/* Steer Wheel held in hand */}
            <g transform="translate(10, 60)">
              {/* External Ring */}
              <circle cx="16" cy="22" r="10" fill="none" stroke="#475569" strokeWidth="3" />
              {/* Spokes */}
              <line x1="16" y1="12" x2="16" y2="32" stroke="#475569" strokeWidth="2" />
              <line x1="6" y1="22" x2="26" y2="22" stroke="#475569" strokeWidth="2" />
              {/* Center Hub */}
              <circle cx="16" cy="22" r="2.5" fill="#EF4444" />
            </g>

            {/* Clothes (Heavy Work/Pilot uniform blue coat as drawn) */}
            <path d="M 32 76 Q 60 70 88 76 L 82 98 H 38 Z" fill="#1E3A8A" stroke="#7C2D12" strokeWidth="2" />
            {/* Yellow sash strap */}
            <path d="M 40 76 L 82 96" stroke="#FBBF24" strokeWidth="4.5" />
            <path d="M 80 76 L 38 96" stroke="#FBBF24" strokeWidth="4.5" />
          </g>
        );

      default:
        return (
          <g>
            {renderFaceBase()}
          </g>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`select-none overflow-visible ${className} ${
        isAnimated ? 'transition-all duration-300 hover:scale-105 active:scale-95' : ''
      }`}
      style={{ filter: `drop-shadow(0 4px 6px rgba(0, 0, 0, 0.08))` }}
    >
      <defs>
        {/* Soft crayon-like rough glow filter if needed */}
        <filter id={roughFilterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      
      {/* Background Frame Circle with Mineral Orange palette */}
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="rgba(253, 186, 116, 0.15)"
        stroke="#FDBA74"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      {/* Inner subtle board */}
      <circle
        cx="60"
        cy="60"
        r="44"
        fill="#FFFAF4"
        stroke="#EA580C"
        strokeWidth="1"
        opacity="0.9"
      />

      {/* Actual drawn avatar */}
      <g filter={undefined}>{getAvatarContent()}</g>
    </svg>
  );
};
