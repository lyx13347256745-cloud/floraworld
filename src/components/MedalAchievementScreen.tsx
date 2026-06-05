/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { DreamCharacter } from '../types';
import { GildedMedal } from './GildedMedal';

interface MedalAchievementScreenProps {
  userName: string;
  chosenDream: DreamCharacter;
  stampCount: number; // passed from Calendar
  onBack: () => void;
  onReset: () => void;
}

export const MedalAchievementScreen: React.FC<MedalAchievementScreenProps> = ({
  userName,
  chosenDream,
  stampCount,
  onBack,
  onReset,
}) => {
  // Placing states
  const [isPlaced, setIsPlaced] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const [placeProgress, setPlaceProgress] = useState(0);

  // Automatically archive completion on load
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('user_is_logged_in') === 'true';
    const loggedPhone = localStorage.getItem('user_logged_phone') || '';
    const completedKey = isLoggedIn && loggedPhone ? `${loggedPhone}_completed_dreams` : 'completed_dreams';
    const ongoingKey = isLoggedIn && loggedPhone ? `${loggedPhone}_ongoing_dream_id` : 'ongoing_dream_id';

    // 1. Add to completed dreams array
    const completedStr = localStorage.getItem(completedKey);
    let completedList: string[] = [];
    if (completedStr) {
      try {
        completedList = JSON.parse(completedStr);
      } catch {
        completedList = [];
      }
    }
    if (!completedList.includes(chosenDream.id)) {
      completedList.push(chosenDream.id);
      localStorage.setItem(completedKey, JSON.stringify(completedList));
    }

    // 3. Clear current ongoing id so player can initiate another dream on back/home
    localStorage.removeItem(ongoingKey);
  }, [chosenDream.id]);

  // Handle Placing Medal in Duobao cabinet
  const handlePlaceMedal = () => {
    setIsPlacing(true);
    setPlaceProgress(0);
    
    let currentPct = 0;
    const interval = setInterval(() => {
      currentPct += Math.floor(Math.random() * 20) + 15;
      if (currentPct >= 100) {
        currentPct = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsPlacing(false);
          setIsPlaced(true);
          
          // Enshrine into localStorage (isolate by logged-in status or guest status)
          const isLoggedIn = localStorage.getItem('user_is_logged_in') === 'true';
          const loggedPhone = localStorage.getItem('user_logged_phone') || '';
          const localKey = isLoggedIn && loggedPhone ? `user_unlocked_medals_${loggedPhone}` : `user_unlocked_medals_guest`;

          const unlockedStr = localStorage.getItem(localKey);
          let unlockedList: string[] = [];
          if (unlockedStr) {
            try {
              unlockedList = JSON.parse(unlockedStr);
            } catch {
              unlockedList = [];
            }
          }
          if (!unlockedList.includes(chosenDream.id)) {
            unlockedList.push(chosenDream.id);
            localStorage.setItem(localKey, JSON.stringify(unlockedList));
          }

          // Automatically activate and reveal the cabinet of medals when placed
          const uploadedKey = isLoggedIn && loggedPhone ? `cabinet_is_uploaded_${loggedPhone}` : 'cabinet_is_uploaded';
          localStorage.setItem(uploadedKey, 'true');
        }, 500);
      }
      setPlaceProgress(currentPct);
    }, 100);
  };

  // Sparkle stars layout based on the badge image style (little elegant floating 4-pointed stars)
  const sparklesList = [
    { x: '22%', y: '16%', size: 14, delay: 0.2 },
    { x: '78%', y: '12%', size: 18, delay: 0.8 },
    { x: '15%', y: '62%', size: 16, delay: 1.4 },
    { x: '84%', y: '58%', size: 12, delay: 0.5 },
    { x: '48%', y: '6%', size: 20, delay: 1.1 },
    { x: '50%', y: '92%', size: 15, delay: 1.7 },
  ];

  return (
    <div
      id="medal-achievement-screen"
      className="relative w-full h-full min-h-screen bg-rice-paper overflow-y-auto flex flex-col items-center justify-start select-none px-4 pt-20 pb-24"
    >
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.16] mix-blend-overlay z-0 select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="felt-noise-medal">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#felt-noise-medal)" fill="transparent" />
        </svg>
      </div>

      {/* FLOATING SPARKLY FOUR-POINT STARS (GLITTER EFFECT) */}
      {sparklesList.map((spark, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-300 pointer-events-none z-10"
          style={{ left: spark.x, top: spark.y }}
          animate={{
            scale: [0.4, 1.4, 0.4],
            opacity: [0.2, 0.9, 0.2],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: spark.delay,
            ease: "easeInOut"
          }}
        >
          {/* Custom vector shiny star */}
          <svg width={spark.size} height={spark.size} viewBox="0 0 24 24" fill="currentColor" className="text-amber-300/95">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
          </svg>
        </motion.div>
      ))}

      {/* TOP FLOATING INTERACTIVE ACTION BUTTONS */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50">
        {/* Step back button */}
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.12, rotate: -6 }}
          whileTap={{ scale: 0.92 }}
          className="w-11 h-11 text-[#AF311B] hover:text-[#C85C4F] rounded-full hover:bg-amber-950/5 transition-all cursor-pointer flex items-center justify-center bg-[#FAF4EA]/80 border border-[#AF311B]/15 shadow-md active:scale-95"
          title="返回"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </motion.button>

        {/* Restart and Clear progress button */}
        <motion.button
          type="button"
          onClick={onReset}
          whileHover={{ scale: 1.12, rotate: 18 }}
          whileTap={{ scale: 0.92 }}
          className="w-11 h-11 text-[#AF311B] hover:text-[#C85C4F] rounded-full hover:bg-amber-950/5 transition-all cursor-pointer flex items-center justify-center bg-[#FAF4EA]/80 border border-[#AF311B]/15 shadow-md active:scale-95"
          title="重新开始"
        >
          <RotateCcw className="w-5 h-5 stroke-[2.5]" />
        </motion.button>
      </div>

      {/* CENTRAL GLORIOUS MEDAL COMPONENT (1-TO-1 COPY OF THE SMOOTH 3D DESIGN WITH WINGS AND LAUREL) */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 85, damping: 15 }}
        whileHover={{ scale: 1.05 }}
        className="relative w-[320px] sm:w-[480px] aspect-square max-h-[55vh] z-20 flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(224,89,54,0.45)]"
      >
        <GildedMedal character={chosenDream} isAnimated={true} className="w-full h-full" />
      </motion.div>

      {/* COHESIVE CONGRATULATION DESCRIPTIVE RIBBON CARD PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-2 text-center max-w-sm px-5 z-30 flex flex-col items-center"
      >
        <span className="font-serif text-[11px] text-[#A26D3F] tracking-[0.2em] font-black uppercase bg-white/60 px-3.5 py-1.5 rounded-full border border-amber-900/10 shadow-sm inline-flex items-center gap-1">
          ✨ 宿命证章 · 大功告成 ✦
        </span>
        <h2 className="font-serif text-lg sm:text-xl font-black text-[#8D2312] mt-3 tracking-widest leading-snug">
          恭喜筑梦人 🌟【<span className="font-sans font-extrabold text-[#AF311B]">{userName}</span>】
        </h2>
        <p className="font-serif text-stone-600 text-[11.5px] mt-1.5 leading-relaxed tracking-wider bg-[#FAF4EA]/85 p-3 rounded-xl border border-amber-950/5">
          您持守初心，已在【<strong className="text-[#AF311B]">{chosenDream.name}</strong>】修行轨道上修证圆满 <strong>21日签入记录</strong>！此尊荣印记现在可被安奉并永久入列您的《多宝阁勋章展示架》，古朴长青。
        </p>
      </motion.div>

      {/* PLACE MEDAL BUTTON AREA */}
      <div className="mt-6 w-full max-w-sm flex flex-col gap-2.5 z-30 px-5">
        {!isPlaced ? (
          <div className="space-y-3">
            {isPlacing ? (
              <div className="bg-[#FAF4EA]/90 p-4 rounded-xl border border-amber-900/10 text-center animate-pulse shadow-sm">
                <p className="text-[10px] text-amber-900/80 font-serif mb-2 tracking-wider">
                  ⛩️ 正在打通妙法天轨，将【{chosenDream.name}】奉入多宝阁展位...
                </p>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden border border-amber-950/5">
                  <motion.div 
                    className="bg-[#AF311B] h-full rounded-full"
                    animate={{ width: `${placeProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={handlePlaceMedal}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-3 bg-gradient-to-r from-[#AF311B] to-[#C85C4F] text-[#FFFBEB] text-[12px] font-serif font-black tracking-[0.25em] rounded-xl border border-amber-400/20 shadow-lg hover:brightness-110 cursor-pointer flex items-center justify-center gap-2 animate-bounce-slow"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                放置勋章至展架 ➔
              </motion.button>
            )}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3 text-center"
          >
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
              <p className="text-[11px] text-emerald-800 font-serif leading-relaxed font-bold">
                🎉 放置大功告成！您的专属【{chosenDream.name}】已落落大方放置到多宝阁柜中！
              </p>
            </div>
            
            <motion.button
              type="button"
              onClick={onBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-[#FAF4EA] hover:bg-[#FAF6EE] text-[#AF311B] border border-[#AF311B]/20 text-[12px] font-serif font-black tracking-[0.2em] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              返回大殿修新愿 🌸
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
