import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

interface BlessingIntroScreenProps {
  userName: string;
  onNext: () => void;
  onBack: () => void;
}

export function BlessingIntroScreen({ userName, onNext, onBack }: BlessingIntroScreenProps) {
  const imageUrl = "https://i.postimg.cc/LJwhhpYr/wei-xin-tu-pian-20260530230446-9241-117.png";

  return (
    <div id="blessing-intro-screen" className="relative w-full h-full min-h-[85vh] flex flex-col items-center justify-center bg-rice-paper p-4 overflow-hidden select-none">
      
      {/* Mystical Faded Calendar Sheet Background to evoke 'seeing the calendar page behind it' */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-center z-0">
        <div className="w-[90%] max-w-[550px] aspect-[4/5] border-4 border-[#AF311B] rounded-2xl grid grid-cols-7 grid-rows-5 gap-2 p-4">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="border border-stone-900/30 rounded-lg flex items-center justify-center font-serif text-[10px] text-stone-950 font-bold">
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Traditional Corner Borders */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#AF311B]/20 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#AF311B]/20 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#AF311B]/20 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#AF311B]/20 rounded-br-lg pointer-events-none" />

      {/* Floating Zen Particles */}
      <div className="absolute w-72 h-72 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.1)_0%,transparent_75%)] pointer-events-none blur-xl top-[25%] left-[20%]" />
      <div className="absolute w-72 h-72 bg-[radial-gradient(circle_at_center,rgba(175,49,27,0.07)_0%,transparent_75%)] pointer-events-none blur-xl bottom-[20%] right-[15%]" />

      <div className="relative z-10 flex flex-col items-center max-w-[420px] text-center px-4 w-full">
        {/* Subtle Welcome Top Label */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-serif tracking-[0.25em] text-[#AF311B] bg-[#AF311B]/5 border border-[#AF311B]/15 px-3 py-1 rounded-full mb-6 font-bold"
        >
          ✦ 莫高福泽 · 灵韵传世 ✦
        </motion.div>

        {/* Centered Circular Image Canvas with Double Ring Calligraphy Halo */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 15 }}
          onClick={onNext}
          className="group relative cursor-pointer flex items-center justify-center"
        >
          {/* External Pulsing Soundwave Rings */}
          <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#AF311B]/15 animate-spin-slow pointer-events-none" />
          <div className="absolute -inset-1.5 rounded-full border-2 border-[#AF311B]/20 group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
          
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-[#AF311B] via-amber-400 to-[#AF311B] opacity-40 blur-[4px] group-hover:opacity-75 transition-opacity duration-500 pointer-events-none animate-pulse-slow" />

          {/* Core Circular image mask */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#AF311B] bg-white shadow-2xl transition-all duration-500 group-hover:scale-[1.03] flex items-center justify-center">
            <img 
              src={imageUrl} 
              alt="Mogra Blessing Stamp Graphic"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Floating interactive hint badges */}
          <div className="absolute -bottom-2 right-4 bg-[#AF311B] text-[#FFFCEB] text-[9px] font-serif tracking-widest px-2.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-1 shadow-md group-hover:bg-amber-500 transition-colors duration-300">
            <Sparkles className="w-3 h-3 text-amber-200 animate-pulse" />
            <span>轻触注入</span>
          </div>
        </motion.div>

        {/* Core Name Title & Traditional Text Callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 space-y-3.5"
        >
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-[0.3em] text-[#AF311B] translate-x-1.5">
            赐福
          </h1>
          
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#AF311B]/40 to-transparent mx-auto" />

          <p className="font-serif text-[13.5px] leading-relaxed text-stone-700 font-bold max-w-[340px] mx-auto">
            尊敬的居士 <span className="text-[#AF311B] bg-[#AF311B]/5 px-2 py-0.5 rounded border border-[#AF311B]/10">{userName}</span>，莫高法阵现已为你织就。轻触愿力法轮，开启智能姿态法眼，印刻今日大吉福瑞！
          </p>
        </motion.div>

        {/* Dynamic Launch Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onNext}
          className="mt-8 min-w-[200px] bg-gradient-to-r from-[#AF311B] to-[#C85C4F] hover:from-[#C85C4F] hover:to-[#AF311B] text-[#FFFCEB] font-serif text-[12px] font-black tracking-[0.2em] py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#AF311B]/15 cursor-pointer active:scale-97 transition-all flex items-center justify-center gap-2 hover:translate-y-[-1px]"
        >
          <span>开启智能姿态对齐</span>
          <ArrowRight className="w-4 h-4 text-amber-300" />
        </motion.button>

        {/* Subtle Back Link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onBack}
          className="mt-4 text-stone-400 hover:text-[#AF311B] font-serif text-[10px] font-bold tracking-widest transition"
        >
          返回前页
        </motion.button>
      </div>
    </div>
  );
}
