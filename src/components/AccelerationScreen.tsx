/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DreamCharacter } from '../types';

interface AccelerationScreenProps {
  userName: string;
  chosenDream: DreamCharacter;
  onComplete: () => void;
}

const DRU_IMAGES = [
  'https://i.postimg.cc/9fZdqNjD/wei-xin-tu-pian-20260530041359-1494-219.png',
  'https://i.postimg.cc/dQHyDKTB/wei-xin-tu-pian-20260530041401-1495-219.png',
  'https://i.postimg.cc/bwbD6DFd/wei-xin-tu-pian-20260530041401-1496-219.png',
  'https://i.postimg.cc/fycqjjS1/wei-xin-tu-pian-20260530043521-1504-219.png',
  'https://i.postimg.cc/xTQ4j7BZ/wei-xin-tu-pian-20260530043522-1505-219.png',
  'https://i.postimg.cc/QdQN9RMF/7.png',
  'https://i.postimg.cc/TwkpyrhV/wei-xin-tu-pian-20260530041538-1499-219.png',
  'https://i.postimg.cc/LX3TY0MZ/wei-xin-tu-pian-20260530033818-1493-219.png'
];

export const AccelerationScreen: React.FC<AccelerationScreenProps> = ({
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);

  // Preload all 8 animatic sequence images to prevent flickering/blank frames
  useEffect(() => {
    DRU_IMAGES.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Smooth continuous loading progress. Takes about 3.5 seconds total.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2.5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 350); // elegant finish wait
          return 100;
        }
        return next;
      });
    }, 85);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Two complete cycles for the 8 images (each cycle covers exactly 50% of the progress bar)
  const calcActiveFrameIndex = () => {
    if (progress <= 50) {
      const ratio = progress / 50; // 0.0 to 1.0
      return Math.min(DRU_IMAGES.length - 1, Math.floor(ratio * DRU_IMAGES.length));
    } else {
      const ratio = (progress - 50) / 50; // 0.0 to 1.0
      return Math.min(DRU_IMAGES.length - 1, Math.floor(ratio * DRU_IMAGES.length));
    }
  };
  const activeFrameIndex = calcActiveFrameIndex();

  return (
    <div
      id="acceleration-screen"
      className="relative flex h-full w-full flex-col items-center justify-center bg-rice-paper text-[#2C1F15] overflow-hidden select-none"
    >
      {/* Background radial highlight for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(139,94,60,0.05)_100%)] pointer-events-none" />
      
      {/* Subtle mandala rings in warm golden tones matching other pages */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] border border-[#AF311B]/5 rounded-full rotate-45 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-dashed border-[#AF311B]/5 rounded-full pointer-events-none animate-spin" style={{ animationDuration: '80s' }} />

      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col items-center max-w-xl w-full px-8 text-center gap-2">
        
        {/* FRAMELESS TRANSITION IMAGE WINDOW */}
        <div className="w-full aspect-[1500/350] overflow-hidden flex items-center justify-center select-none mb-6">
          <img
            src={DRU_IMAGES[activeFrameIndex]}
            alt={`加载动画 ${activeFrameIndex + 1}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-100"
          />
        </div>

        {/* CUSTOM-TAILORED CAPSULE PROGRESS BAR CONTAINER */}
        <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center">
          
          {/* Main loader capsule with thick hand-drawn borders matching museum styling */}
          <div className="w-full h-7 sm:h-8 bg-[#FFFDF6] border-[4px] border-[#AF311B] rounded-full p-[2px] flex items-center shadow-[inset_0_4px_6px_rgba(175,49,27,0.06)] relative overflow-visible">
            
            {/* Animating fill with unified cinnabar motif */}
            <motion.div
              className="h-full bg-[#AF311B] rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
            
            {/* Trailing cute splash bubbles in cinnabar red */}
            {progress > 5 && progress < 95 && (
              <div 
                className="absolute flex items-center gap-1 pointer-events-none z-10"
                style={{ left: `calc(${progress}% - 2px)` }}
              >
                <div className="w-3 h-3 rounded-full bg-[#AF311B] border border-white animate-ping absolute" />
                <div className="flex gap-1 items-center ml-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#AF311B] border border-white" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AF311B] border border-white animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-1 h-1 rounded-full bg-[#AF311B] border border-white animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 h-0.5 rounded-full bg-[#AF311B]" />
                </div>
              </div>
            )}
          </div>

          {/* CUTE "loading..." BUBBLE STYLE TEXT */}
          <div className="mt-5 text-[#AF311B] font-serif text-xl sm:text-2xl font-black italic tracking-[0.25em] flex items-baseline justify-center gap-0.5 select-none md:text- shadow-sm">
            <span className="not-italic mr-1">loading</span>
            <span className="animate-bounce inline-block text-2xl" style={{ animationDelay: '0s' }}>.</span>
            <span className="animate-bounce inline-block text-2xl" style={{ animationDelay: '0.15s' }}>.</span>
            <span className="animate-bounce inline-block text-2xl" style={{ animationDelay: '0.3s' }}>.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
