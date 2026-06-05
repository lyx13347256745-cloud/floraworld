/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Sliders } from 'lucide-react';
import { DreamCharacter } from '../types';
import { ChibiAvatar } from './ChibiAvatar';

interface WateringRitualScreenProps {
  userName: string;
  chosenDream: DreamCharacter;
  onComplete: (wateringCount: number) => void;
  onBack: () => void;
}

// Poetic encouraging mindfulness mantras that float up during watering
const MINDFULNESS_MANTRAS = [
  '一花一木，皆是修行',
  '坚守当下，不忘初心',
  '执念深埋，破土有期',
  '日夜灌溉，希望常新',
  '微芒刺破，春华绽放',
  '素香萦绕，心境澄明',
  '积水成川，踏实笃行',
  '百折不挠，志存高远',
  '心神宁定，繁花自开',
  '步履不停，终达彼岸'
];

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
}

export const WateringRitualScreen: React.FC<WateringRitualScreenProps> = ({
  userName,
  chosenDream,
  onComplete,
  onBack,
}) => {
  const [wateringCount, setWateringCount] = useState(0);
  const [isWatering, setIsWatering] = useState(false);
  const [isIncenseLit, setIsIncenseLit] = useState(true); // Lit by default for maximum oriental atmosphere!
  const [incenseTimer, setIncenseTimer] = useState(0);
  
  // Interactive visual particles
  const [waterParticles, setWaterParticles] = useState<Particle[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  // Incense burner smoke simulation trigger
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isIncenseLit) {
      interval = setInterval(() => {
        setIncenseTimer((prev) => prev + 1);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isIncenseLit]);

  // Determine the current growth stage (1 to 6) based on watering counts
  const getGrowthStage = (count: number) => {
    if (count === 0) return 1;
    if (count <= 2) return 2;
    if (count <= 4) return 3;
    if (count <= 6) return 4;
    if (count <= 8) return 5;
    return 6;
  };

  const currentStage = getGrowthStage(wateringCount);

  // Growth Stage Title (Mindfulness/Oriental craft style)
  const getStageTitle = (stage: number) => {
    switch (stage) {
      case 1: return '万象萌芽之种';
      case 2: return '金茎初碧新叶';
      case 3: return '法蕾凝脂含苞';
      case 4: return '机巧妙华半吐';
      case 5: return '瑞气重瓣盛绽';
      case 6: return '德泽圆满藻井';
      default: return '万象萌芽之种';
    }
  };

  // Growth Stage Poetic Descriptions (De-buddhified, highly career-oriented)
  const getStagePoem = (stage: number) => {
    switch (stage) {
      case 1: return '万象伊始，一念微存。金沙天河的水波里，安睡着一颗承载执着追求的幼小梦想种子。';
      case 2: return '新叶惊雷破土，纯真舒展。你倾注的每一次专注甘露，都在滋润着细弱的生机节节而上。';
      case 3: return '重瓣含羞，凝脂萌苞。在日夜执着的付出中，梦想最纯粹的初始幽香正慢慢发散。';
      case 4: return '巧转关锁，天门半露。梦想半带花颜惊艳流露，古代巧匠的匠心轮轨正悄然蓄势未来。';
      case 5: return '祥云瑞气，芳华大开！重重叠叠的飞天重瓣在温润中神采挺立，现代拼搏之志尽显锋芒！';
      case 6: return '功德大成，藻井升华！整座宏大玄妙的敦煌藻井完全化育而生，带你穿梭古今，梦想破万重浪！';
      default: return '埋下一颗纯粹的心愿，以不懈的执着浇灌。一念初起，希望自生。';
    }
  };

  const handleWater = (e?: React.MouseEvent) => {
    if (wateringCount >= 10) return;

    // Immediately increment watering growth for ultimate responsive clicking!
    setWateringCount((prev) => Math.min(prev + 1, 10));

    // Calculate click coordinates in case user clicked in the pond container directly
    let targetX = 140 + Math.random() * 80;
    if (e) {
      const container = e.currentTarget.getBoundingClientRect();
      const relativeX = e.clientX - container.left;
      if (relativeX > 50 && relativeX < container.width - 50) {
        targetX = relativeX;
      }
    }

    // Spawn splashes around center
    const baseId = Date.now() * 1000 + Math.floor(Math.random() * 1000);
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: baseId + i,
      x: targetX + (Math.random() * 40 - 20),
      y: 60 + Math.random() * 40,
    }));
    setWaterParticles((prev) => [...prev, ...newParticles]);

    // Lift poetic floating thought bubble
    const randomSutra = MINDFULNESS_MANTRAS[Math.floor(Math.random() * MINDFULNESS_MANTRAS.length)];
    setFloatingTexts((prevTexts) => [
      ...prevTexts,
      {
        id: Date.now() * 10000 + Math.floor(Math.random() * 10000),
        text: randomSutra,
        x: targetX - 50 + (Math.random() * 30 - 15),
        y: 120 + Math.random() * 40,
      }
    ]);

    // Trigger visual watering splash state
    setIsWatering(true);
    setTimeout(() => {
      setIsWatering(false);
      setWaterParticles((prev) => prev.filter((p) => p.id < baseId || p.id >= baseId + 6));
    }, 700);
  };

  // Delete expired floating text messages
  useEffect(() => {
    if (floatingTexts.length > 0) {
      const timer = setTimeout(() => {
        setFloatingTexts((prev) => prev.slice(1));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [floatingTexts]);

  const progressPercent = (wateringCount / 10) * 100;

  return (
    <div
      id="watering-ritual-screen"
      className="relative flex h-full w-full flex-col bg-rice-paper overflow-hidden select-none animate-fade-in p-4 lg:p-6"
    >
      {/* Top Background Gradient Radiants */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(139,94,60,0.06)_100%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-70 transition-all duration-1000 pointer-events-none"
        style={{
          background: wateringCount >= 9 
            ? 'radial-gradient(circle, rgba(175,49,27,0.07) 0%, rgba(243,235,212,0.1) 80%)'
            : 'radial-gradient(circle, rgba(217,119,6,0.04) 0%, rgba(243,235,212,0.1) 80%)'
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(175,49,27,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(175,49,27,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-50" />

      {/* HEADER SECTION: Back Chevron */}
      <div className="w-full flex items-center justify-between z-30 mb-2 pointer-events-none">
        <button
          type="button"
          onClick={onBack}
          className="p-2 text-[#AF311B] hover:text-[#C85C4F] rounded-full hover:bg-amber-950/5 transition-colors pointer-events-auto cursor-pointer flex items-center justify-center border border-[#AF311B]/15 bg-white/40 shadow-sm"
          title="返回前一步"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Incense Burner Toggle on Top Right */}
        <button
          onClick={() => setIsIncenseLit(!isIncenseLit)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-serif font-black border transition-all pointer-events-auto cursor-pointer ${
            isIncenseLit 
              ? 'bg-[#0B6A4E]/10 text-[#0B6A4E] border-[#0B6A4E]/30 animate-pulse'
              : 'bg-[#F5EBD5]/60 text-amber-900 border-[#AF311B]/15'
          }`}
        >
          <span>{isIncenseLit ? '🕯️ 越窑博山炉 (香熏袅袅)' : '🔥 点燃安神香'}</span>
        </button>
      </div>

      {/* CORE DISPLAY TILES: split into credentials (top-left) and staging details */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4 z-20 mt-1 pointer-events-none">
        
        {/* LEFT-TOP: Chosen Modern Role Photo & Career Title Card */}
        <div 
          id="credentials-scroll" 
          className="flex items-center gap-3.5 bg-[#FEFCF8]/95 p-3.5 rounded-xl border border-[#AF311B]/25 shadow-md backdrop-blur-md max-w-[350px] w-full relative pointer-events-auto transform hover:scale-[1.01] transition-transform"
        >
          {/* Classical corner gold trims */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#AF311B]/60" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#AF311B]/60" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#AF311B]/60" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#AF311B]/60" />

          {/* Avatar frame */}
          <div className="relative shrink-0 border-2 border-double border-amber-900/30 p-1 rounded-lg bg-[#FAF4EA] shadow-inner">
            <ChibiAvatar type={chosenDream.svgType} size={76} className="rounded-md" />
            <div className="absolute -top-1.5 -right-1.5 bg-[#AF311B] text-white p-0.5 rounded-full shadow border border-[#FFEEDC]">
              <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono bg-[#AF311B] text-[#FFFCEB] px-1.5 py-0.5 rounded font-black tracking-widest uppercase">契合筑梦人</span>
              <span className="text-[10px] text-amber-900/70 font-semibold font-serif truncate">"{userName}"</span>
            </div>
            <h3 className="font-serif text-lg font-black text-[#5C2718] tracking-widest leading-none truncate mt-2">
              {chosenDream.modernRole.split(' · ')[0]}
            </h3>
            <p className="text-[11px] text-[#A26D3F] font-serif tracking-wide truncate mt-1.5 font-bold">
              九重相通：{chosenDream.name}
            </p>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#0B6A4E] animate-pulse" />
              <span className="text-[9px] text-emerald-900 font-serif font-black tracking-widest">水月净土 · 培植仙莲中</span>
            </div>
          </div>
        </div>

        {/* RIGHT-TOP: Dynamic Growth descriptions depending on watering counts */}
        <div 
          id="stage-detail-scroll" 
          className="bg-[#FEFCF8]/95 p-3.5 rounded-xl border border-amber-900/20 shadow-md backdrop-blur-md max-w-[360px] w-full relative pointer-events-auto text-right flex flex-col items-end transform hover:scale-[1.01] transition-transform"
        >
          {/* Classical corner gold trims */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-[#0B6A4E]/40" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-[#0B6A4E]/40" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-[#0B6A4E]/40" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-[#0B6A4E]/40" />

          <span className="text-[10px] text-[#AF311B] font-mono tracking-widest font-black uppercase">STAGE DESCRIPTION</span>
          <h2 className="font-serif text-base font-black text-[#5C2718] tracking-widest mt-1 flex items-center gap-1.5">
            ♢ {getStageTitle(currentStage)}
          </h2>
          <p className="text-[11px] text-[#8D674B] font-serif font-semibold text-right leading-relaxed mt-2 max-w-sm">
            “{getStagePoem(currentStage)}”
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="text-[10px] text-amber-900/60 font-serif font-black tracking-widest">成长修为值 :</span>
            <span className="font-mono text-xl font-black text-[#AF311B] tracking-tight leading-none">
              +{wateringCount * 120}
            </span>
          </div>
        </div>

      </div>

      {/* CENTER: LOTUS CULTIVATION LAKE ("中间是养莲的地方") */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative min-h-[300px] my-2 z-10">
        
        {/* Clickable Pond container */}
        <div 
          onClick={(e) => handleWater(e)}
          title="点击此区域浇水吧！"
          className="relative w-full max-w-[460px] aspect-square rounded-full border border-[#AF311B]/15 bg-[radial-gradient(circle_at_center,#FCF9F2_50%,rgba(139,94,60,0.02)_100%)] shadow-[inset_0_4px_30px_rgba(139,94,60,0.06),0_10px_40px_rgba(0,0,0,0.04)] flex items-center justify-center cursor-pointer transition-all hover:border-[#AF311B]/35 group"
        >
          {/* Subtle instructions banner overlay */}
          <div className="absolute -top-7 inset-x-0 mx-auto text-center pointer-events-none text-[10px] text-amber-900/70 font-serif tracking-[0.25em] font-black animate-bounce flex items-center justify-center gap-1 bg-[#FAF4EA]/80 px-4 py-1 rounded-full border border-amber-900/10 max-w-[280px]">
            <span>⛲ 鼠标轻按莲池 即可浇筑甘露</span>
          </div>

          {/* Concentric rotating ripples representing Dunhuang mechanical lock wheels */}
          <div className="absolute inset-4 rounded-full border border-dashed border-[#AF311B]/15 pointer-events-none" />
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
            className="absolute inset-10 rounded-full border border-double border-[#AF311B]/10 pointer-events-none"
          />

          <motion.div
            animate={{ rotate: wateringCount * 36 }}
            transition={{ type: 'spring', stiffness: 25 }}
            className="absolute inset-[15%] rounded-full border border-[#0B6A4E]/10 pointer-events-none flex items-center justify-center"
          >
            {/* Hour marker pins representing caisson grid */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-[1px] bg-[#AF311B]/5"
                style={{ transform: `rotate(${i * 45}deg)` }}
              />
            ))}
          </motion.div>

          {/* Ring 3 - Outer halo ripple */}
          <div className="absolute inset-[30%] rounded-full border border-dashed border-[#AF311B]/20 pointer-events-none opacity-40 group-hover:scale-105 transition-transform duration-500" />

          {/* ACTIVE LOTUS RENDER PORTALS */}
          <div className="relative w-64 h-64 flex items-center justify-center z-20 pointer-events-none">
            <AnimatePresence mode="wait">

              {/* GROW STATE 1: Seed structure (count === 0) */}
              {wateringCount === 0 && (
                <motion.div
                  key="stage-seed-core"
                  initial={{ scale: 0.1, opacity: 0 }}
                  animate={{ scale: [0.96, 1.05, 0.96], opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 0.3 }
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-16 bg-gradient-to-t from-orange-600 via-amber-400 to-[#FFFCEB] rounded-full filter drop-shadow-[0_0_15px_rgba(245,158,11,0.9)] shadow-[inset_0_3px_12px_rgba(255,255,255,0.73)] flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 70%, 50% 100%, 0% 70%)' }}>
                    <div className="w-4 h-6 border-2 border-amber-600/20 rounded-full animate-pulse" />
                  </div>
                  <span className="text-[10px] text-[#A26D3F] font-serif tracking-[0.25em] mt-3.5 font-black bg-[#FEFCF8]/90 px-3 py-0.5 rounded shadow-sm border border-amber-900/10">妙境神种</span>
                </motion.div>
              )}

              {/* GROW STATE 2: Sprout (count === 1 || count === 2) */}
              {(wateringCount === 1 || wateringCount === 2) && (
                <motion.div
                  key="stage-sprout-core"
                  initial={{ scale: 0.6, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center"
                >
                  <svg viewBox="0 0 100 100" className="w-32 h-32 text-emerald-600 drop-shadow-[0_4px_10px_rgba(16,185,129,0.4)]">
                    {/* Leaf 1 */}
                    <path d="M 50 85 C 43 70, 24 64, 32 46 C 40 52, 45 64, 50 85 Z" fill="#34D399" stroke="#047857" strokeWidth="1.5" />
                    {/* Leaf 2 */}
                    <path d="M 50 85 C 57 65, 75 58, 66 38 C 58 45, 53 60, 50 85 Z" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
                    <circle cx="50" cy="74" r="5" fill="#FBBF24" />
                  </svg>
                  <span className="text-[10px] text-emerald-900 font-serif tracking-[0.2em] mt-2 font-black bg-[#FEFCF8]/90 px-3 py-0.5 rounded shadow-sm border border-emerald-900/10">初露仙碧</span>
                </motion.div>
              )}

              {/* GROW STATE 3: Budding cocoon (count === 3 || count === 4) */}
              {(wateringCount === 3 || wateringCount === 4) && (
                <motion.div
                  key="stage-bud-core"
                  initial={{ scale: 0.7, opacity: 0, y: 15 }}
                  animate={{ scale: [0.97, 1.03, 0.97], opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: -15 }}
                  transition={{
                    scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 0.4 }
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <svg viewBox="0 0 120 120" className="w-40 h-40 filter drop-shadow-[0_5px_12px_rgba(244,63,94,0.35)]">
                    <path d="M 60 100 C 30 90, 30 55, 46 32 C 32 50, 40 78, 60 100 Z" fill="#047857" opacity="0.55" />
                    <path d="M 60 100 C 90 90, 90 55, 74 32 C 88 50, 80 78, 60 100 Z" fill="#047857" opacity="0.55" />
                    <path d="M 60 100 C 42 76, 32 52, 60 10 C 88 52, 78 76, 60 100 Z" fill="url(#core-bud-grad)" stroke="#DC2626" strokeWidth="1.5" />
                    <path d="M 60 10 L 60 100" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    <defs>
                      <linearGradient id="core-bud-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F43F5E" />
                        <stop offset="60%" stopColor="#EA580C" />
                        <stop offset="100%" stopColor="#7C2D12" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[10px] text-[#AF311B] font-serif tracking-[0.2em] mt-2 font-black bg-[#FEFCF8]/90 px-3 py-0.5 rounded shadow-sm border border-red-900/10">法蕾含露</span>
                </motion.div>
              )}

              {/* GROW STATE 4: Mechanics Half Open (count === 5 || count === 6) */}
              {(wateringCount === 5 || wateringCount === 6) && (
                <motion.div
                  key="stage-half-core"
                  initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center justify-center"
                >
                  <svg viewBox="0 0 150 150" className="w-48 h-48 filter drop-shadow-[0_6px_15px_rgba(239,68,68,0.4)]">
                    <circle cx="75" cy="75" r="54" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                    {Array.from({ length: 6 }).map((_, i) => (
                      <path
                        key={`mid-cog-${i}`}
                        d="M 75 75 L 75 16 L 85 30 L 65 30 Z"
                        fill="#D97706"
                        opacity="0.25"
                        transform={`rotate(${i * 60} 75 75)`}
                      />
                    ))}
                    {/* Flaring petals */}
                    <path d="M 75 115 C 30 92, 20 54, 42 34 C 54 54, 63 88, 75 115 Z" fill="url(#core-petal-half)" stroke="#B91C1C" strokeWidth="1" />
                    <path d="M 75 115 C 120 92, 130 54, 108 34 C 96 54, 87 88, 75 115 Z" fill="url(#core-petal-half)" stroke="#B91C1C" strokeWidth="1" />
                    <path d="M 75 115 C 58 88, 52 64, 75 28 C 98 64, 92 88, 75 115 Z" fill="#FCD34D" opacity="0.9" />
                    <circle cx="75" cy="62" r="10" fill="#FFFBEB" />
                    <defs>
                      <linearGradient id="core-petal-half" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F97316" />
                        <stop offset="60%" stopColor="#EF4444" />
                        <stop offset="100%" stopColor="#7C2D12" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[10px] text-[#AF311B] font-serif tracking-[0.2em] mt-2 font-black bg-[#FEFCF8]/90 px-3 py-0.5 rounded shadow-sm border border-orange-900/10">机锁初脱</span>
                </motion.div>
              )}

              {/* GROW STATE 5: Highly Complete Full Lotus Bloom (count === 7 || count === 8) */}
              {(wateringCount === 7 || wateringCount === 8) && (
                <motion.div
                  key="stage-bloom-core"
                  initial={{ scale: 0.6, opacity: 0, rotate: 20 }}
                  animate={{ scale: [1, 1.02, 1], opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center"
                >
                  <svg viewBox="0 0 200 200" className="w-56 h-56 filter drop-shadow-[0_6px_20px_rgba(244,63,94,0.45)]">
                    {/* Base petals */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <path
                        key={`base-leaf-${i}`}
                        d="M 100 100 C 115 115, 135 135, 100 165 C 65 135, 85 115, 100 100 Z"
                        fill="#065F46"
                        opacity="0.7"
                        stroke="#0D9488"
                        strokeWidth="1.2"
                        transform={`rotate(${i * 45} 100 100)`}
                      />
                    ))}
                    {/* Cinnabar red petals */}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <path
                        key={`cin-petal-${i}`}
                        d="M 100 100 C 112 68, 126 48, 100 18 C 74 48, 88 68, 100 100 Z"
                        fill="url(#cin-grad-stage5)"
                        stroke="#7F1D1D"
                        strokeWidth="1"
                        transform={`rotate(${i * 36} 100 100)`}
                      />
                    ))}
                    <circle cx="100" cy="100" r="14" fill="#FDF9C4" stroke="#D97706" strokeWidth="1.5" />
                    <defs>
                      <linearGradient id="cin-grad-stage5" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EA580C" />
                        <stop offset="60%" stopColor="#F43F5E" />
                        <stop offset="100%" stopColor="#581C0C" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[10px] text-[#AF311B] font-serif tracking-[0.2em] mt-2 font-black bg-[#FEFCF8]/90 px-3 py-0.5 rounded shadow-sm border border-red-500/20">瑞彩芳华</span>
                </motion.div>
              )}

              {/* GROW STATE 6: Ultimate Shimmering Caisson Lotus Ascension (count >= 9) */}
              {wateringCount >= 9 && (
                <motion.div
                  key="stage-ultimate-core"
                  initial={{ scale: 0.5, opacity: 0, rotate: 180 }}
                  animate={{ scale: [1, 1.03, 1], opacity: 1, rotate: 360 }}
                  transition={{
                    scale: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 1.5, ease: 'easeOut' }
                  }}
                  className="flex flex-col items-center justify-center text-center"
                >
                  {/* Glowing backdrop circular aura */}
                  <div className="absolute inset-[-30px] rounded-full bg-gradient-to-r from-[#AF311B]/15 via-amber-500/10 to-[#AF311B]/15 blur-2xl animate-pulse pointer-events-none" />

                  <svg viewBox="0 0 200 200" className="w-60 h-60 filter drop-shadow-[0_0_24px_rgba(217,119,6,0.6)]">
                    {/* Bottom Emerald Mandala leaves */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <path
                        key={`stage6-b-leaf-${i}`}
                        d="M 100 100 C 120 120, 140 140, 100 172 C 60 140, 80 120, 100 100 Z"
                        fill="#065F46"
                        opacity="0.9"
                        stroke="#0D9488"
                        strokeWidth="1.5"
                        transform={`rotate(${i * 45} 100 100)`}
                      />
                    ))}

                    {/* Concentric red petal halo - 12 count */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <path
                        key={`stage6-r-petal-${i}`}
                        d="M 100 100 C 115 70, 130 50, 100 20 C 70 50, 85 70, 100 100 Z"
                        fill="url(#cinnabar-grad-stage6)"
                        stroke="#7F1D1D"
                        strokeWidth="1"
                        transform={`rotate(${i * 30} 100 100)`}
                      />
                    ))}

                    {/* Inner gold concentric petals - 8 count */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <path
                        key={`stage6-g-petal-${i}`}
                        d="M 100 100 C 110 80, 120 65, 100 40 C 80 65, 90 80, 100 100 Z"
                        fill="url(#gold-grad-stage6)"
                        stroke="#B45309"
                        strokeWidth="1.2"
                        transform={`rotate(${i * 45 + 15} 100 100)`}
                      />
                    ))}

                    {/* Core seedbed pod */}
                    <circle cx="100" cy="100" r="18" fill="#FFFCEB" stroke="#D97706" strokeWidth="2" />
                    {Array.from({ length: 9 }).map((_, i) => {
                      const angle = i * 40;
                      return (
                        <circle
                          key={`stage6-dot-${i}`}
                          cx="100"
                          cy="91"
                          r="2.5"
                          fill="#D97706"
                          transform={`rotate(${angle} 100 100)`}
                        />
                      );
                    })}
                    <circle cx="100" cy="100" r="4" fill="#D97706" />

                    <defs>
                      <linearGradient id="cinnabar-grad-stage6" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EA580C" />
                        <stop offset="50%" stopColor="#EF4444" />
                        <stop offset="100%" stopColor="#581C0C" />
                      </linearGradient>
                      <linearGradient id="gold-grad-stage6" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFCEB" />
                        <stop offset="40%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#78350F" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[11px] text-[#AF311B] font-serif tracking-[0.3em] mt-3 font-extrabold animate-pulse bg-[#FEFCF8]/95 px-4 py-1 rounded-full border border-orange-500/35 shadow-md uppercase">九重天藻井 · 圆满法华</span>
                </motion.div>
              )}

            </AnimatePresence>

            {/* FLOWING DROPS ANIMATIONS */}
            {waterParticles.map((pt) => (
              <motion.div
                key={pt.id}
                initial={{ x: pt.x - 130, y: pt.y - 120, opacity: 1, scale: 1 }}
                animate={{ y: pt.y + 160, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.55, ease: 'easeIn' }}
                className="absolute w-2 h-4.5 bg-gradient-to-b from-[#AF311B] via-yellow-400 to-white rounded-full z-30 pointer-events-none"
              />
            ))}

            {/* FLOATING TEXT MESSAGES RISING CHIP */}
            <AnimatePresence>
              {floatingTexts.map((fText) => (
                <motion.div
                  key={fText.id}
                  initial={{ x: fText.x - 120, y: fText.y - 110, opacity: 0, scale: 0.8 }}
                  animate={{ y: fText.y - 180, opacity: [0, 0.95, 0], scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                  className="absolute pointer-events-none z-40 font-serif text-[11px] md:text-xs text-[#AF311B] font-black bg-white/95 px-3 py-1 border border-[#AF311B]/35 rounded shadow-lg tracking-widest flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span className="text-[#AF311B]">♢</span> {fText.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* INCENSE SMOKE FILAMENTS (LIT OR SIMULATED) */}
            {isIncenseLit && (
              <div className="absolute inset-x-0 bottom-4 pointer-events-none overflow-visible w-full h-[10px]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={`smoke-${i}-${incenseTimer}`}
                    initial={{
                      x: -25 + Math.random() * 50,
                      y: 40,
                      opacity: 0,
                      scale: 0.2
                    }}
                    animate={{
                      x: [-20 + Math.random() * 40, -10 + Math.random() * 20, -50 + Math.random() * 20],
                      y: [-20, -100, -200],
                      opacity: [0, 0.35, 0],
                      scale: [0.3, 1, 2.2]
                    }}
                    transition={{
                      duration: 4.5 + i * 0.7,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      delay: i * 0.8
                    }}
                    className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#AF311B]/3 blur-xl border border-dashed border-[#AF311B]/1"
                  />
                ))}
              </div>
            )}

          </div>

          {/* ACTIVE FLASK WATER POUR JUG TRIGGER */}
          <AnimatePresence>
            {isWatering && (
              <motion.div
                initial={{ rotate: 0, x: 90, y: -90, opacity: 0 }}
                animate={{ rotate: -55, x: 70, y: -70, opacity: 1 }}
                exit={{ rotate: 0, x: 90, y: -90, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute pointer-events-none z-30"
                style={{ top: '8%', right: '15%' }}
              >
                <svg viewBox="0 0 100 100" className="w-14 h-14 text-[#AF311B]">
                  {/* Ornate gold watering pot */}
                  <path d="M 40 30 L 45 10 L 55 10 L 60 30 L 70 70 A 20 20 0 1 1 30 70 Z" fill="#FEFCF8" stroke="#D97706" strokeWidth="2.5" />
                  <ellipse cx="50" cy="50" rx="6" ry="10" fill="none" stroke="#AF311B" strokeWidth="1.5" />
                  {/* Pouring stream line */}
                  <path d="M 45 6 C 30 -12, -22 15, 5 44" fill="none" stroke="#AF311B" strokeWidth="2" strokeDasharray="3 2" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WATER CAN FLOATER COMPONENT IF CLICK DISCOVERY NEEDED */}
          <div className="absolute right-2 bottom-6 animate-pulse bg-white/90 p-2.5 rounded-full border border-amber-900/10 shadow-md group-hover:scale-105 pointer-events-none">
            <span className="text-xl">🏺</span>
          </div>

        </div>

      </div>

      {/* BOTTOM PROGRESS TIMELINE BAR CONTROLLER */}
      <div className="w-full max-w-2xl mx-auto bg-[#FEFCF8]/95 p-4 border border-[#AF311B]/15 rounded-xl shadow-lg z-20 shrink-0 select-none pointer-events-auto transform hover:translate-y-[-1px] transition-transform">
        
        <div className="flex justify-between items-center mb-1 text-[11px] font-serif font-black text-[#5C2718]">
          <span className="tracking-widest">🌸 天池培植度 : {wateringCount}/10 灌</span>
          <span className="tracking-widest font-mono font-bold text-[#AF311B]">{Math.round(progressPercent)}%</span>
        </div>

        {/* Cinnabar Gold Segmented progress pipeline */}
        <div className="w-full h-[6px] bg-[#EBDCB6] rounded-full overflow-hidden p-[1px] border border-[#AF311B]/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-[#AF311B] via-[#D97706] to-[#FBBF24] rounded-full"
          />
        </div>

        {/* Interactive milestones indicators */}
        <div className="flex justify-between text-[10px] text-amber-900/60 font-serif tracking-widest mt-2 px-1 font-semibold">
          <span className={wateringCount >= 0 ? 'text-[#AF311B] font-black' : ''}>梦神种 (0)</span>
          <span className={wateringCount >= 2 ? 'text-[#AF311B] font-black' : ''}>生初芽 (2)</span>
          <span className={wateringCount >= 4 ? 'text-[#AF311B] font-black' : ''}>孕法蕾 (4)</span>
          <span className={wateringCount >= 7 ? 'text-[#AF311B] font-black' : ''}>瓣巧绽 (7)</span>
          <span className={wateringCount >= 9 ? 'text-[#0B6A4E] font-black font-extrabold' : ''}>圆满藻井 (10)</span>
        </div>

        {/* CONTINUOUS PROGRESSION TO STEP 5 - ACTIVATE WHEN FULL */}
        <AnimatePresence>
          {wateringCount >= 10 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-4 flex justify-center"
            >
              <button
                onClick={() => onComplete(wateringCount)}
                className="px-8 py-3 bg-gradient-to-r from-[#AF311B] to-[#952512] text-[#FFFCEB] font-serif font-black text-xs tracking-[0.35em] rounded-lg border border-amber-400/20 shadow-[0_0_20px_rgba(175,49,27,0.4)] hover:shadow-[0_0_30px_rgba(175,49,27,0.6)] hover:brightness-110 active:scale-97 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>⚜ 功德金篇 · 观照愿卷 ⚜</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
