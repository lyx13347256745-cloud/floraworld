/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';

interface CaissonLogoProps {
  onNext: () => void;
  onOpenSettings?: () => void;
}

export const CaissonLogo: React.FC<CaissonLogoProps> = ({ onNext }) => {
  const [isActivating, setIsActivating] = useState(false);

  const handleLaunch = () => {
    if (isActivating) return;
    setIsActivating(true);
    // Directly trigger next, allowing the shared-lotus layout transition to execute instantly
    onNext();
  };

  return (
    <div
      id="caisson-logo-container"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-rice-paper select-none p-4 sm:p-6"
    >
      {/* Background Classical Ambient Textures */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(87,61,48,0.03)_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,78,32,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,78,32,0.005)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-20 z-0" />

      {/* CENTER ARTBOARD - CLICKABLE TO START */}
      <div 
         onClick={handleLaunch}
         className="relative w-[96vw] sm:w-[92vw] max-w-[860px] h-[82vh] max-h-[85vh] flex flex-col items-center justify-center z-10 p-0.5 cursor-pointer active:scale-98 transition-transform duration-300"
      >
        {/* Elegant warm soft glowing ring backing */}
        <div className="absolute w-[95%] h-[95%] bg-[radial-gradient(circle_at_center,rgba(255,78,32,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* Clean Lotus & Title Custom Artwork from User Link - replacing all former items */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <motion.img
            layoutId="shared-lotus"
            src="https://i.postimg.cc/TPP7t832/wei-xin-tu-pian-20260530215912-9149-117.png"
            alt="花花世界"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain select-none mix-blend-multiply filter drop-shadow-[0_8px_30px_rgba(87,61,48,0.05)]"
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          />
        </div>
      </div>
    </div>
  );
};

