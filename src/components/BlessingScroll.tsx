/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { DreamCharacter } from '../types';
import { ChibiAvatar } from './ChibiAvatar';

interface BlessingScrollProps {
  userName: string;
  chosenDream: DreamCharacter;
  wateringCount: number;
  onReset: () => void;
}

// Poetic encouraging blessings corresponding to the core of each career type (De-buddhified)
const BLESSING_SCRIPTS: Record<string, { code: string; line1: string; line2: string; line3: string; blessing: string }> = {
  singer: {
    code: '妙音心振',
    line1: '歌呗心乐，声抚红尘客。',
    line2: '将斑斓理想化为天籁，共鸣四海。',
    line3: '以此清音拂试凡俗躁，指引温暖方向。',
    blessing: '唯愿你琴心长驻、以歌载梦，让悠扬妙响伴随执着步伐，回荡在属于你的人生星空。'
  },
  doctor: {
    code: '大医精诚',
    line1: '杏林施妙手，仁心度风雨劫。',
    line2: '用冷静与专业，筑起最坚固的安全防线。',
    line3: '治病疗身，打破痛楚桎梏，重构璀璨生机。',
    blessing: '唯愿你福泽绵延、大爱长照。妙手除忧、护航生命，在每个昼夜播撒康复的春风。'
  },
  scientist: {
    code: '格物致知',
    line1: '极微格物，求索广袤时空与星轨。',
    line2: '在严谨推演算理中，剖析万物规律。',
    line3: '驱散迷雾愚昧，开启引航真理之大光。',
    blessing: '唯愿你探索之火永续、思维明澈，在无穷无尽的客观奥妙里，得悟不凡成就。'
  },
  nurse: {
    code: '馨温照护',
    line1: '手持甘露露瓶，播洒关切呵护在榻前。',
    line2: '温柔如煦，用毫无怨言的专注润物无声。',
    line3: '抚平痛楚，点亮闪烁的生命引路夜灯。',
    blessing: '唯愿你心怀大爱、信念皎洁。用春风般的照料，舒缓世界每一处角落的喧嚣与创残。'
  },
  pilot: {
    code: '翼乘万里',
    line1: '扶摇振翅，御风穿行在万米云层。',
    line2: '飞越山川湖海，联结城市与行者的期许。',
    line3: '天堑变通途，消弥界限，速达温情。',
    blessing: '唯愿你云程万里、乘风破浪。安全起落于碧空经纬，踏实丈量大好河山的壮阔。'
  },
  farmer: {
    code: '躬耕生机',
    line1: '躬耕厚土，用质朴汗水润泽万民颗粒。',
    line2: '敬畏天时，培育满垄绿野与金华五谷。',
    line3: '春生秋熟，德润万物，丰足人间仓禀。',
    blessing: '唯愿你心田丰沃、生生不息。行于芬芳沃野，收获沉甸甸的理想繁花与饱满硕果。'
  },
  vet: {
    code: '生灵共融',
    line1: '万物有灵，用平等纯净之诚关爱无言伴友。',
    line2: '祛除飞禽走兽之创疾，解危救困不辍。',
    line3: '心系统领同伴，勾建和谐大美世界。',
    blessing: '唯愿你温柔相伴、灵瑞随行。感受自然万物的无保留敬爱，散发治愈生灵的明亮微光。'
  },
  chef: {
    code: '调和五味',
    line1: '调和水火，烹制珍馐饱足风尘旅人。',
    line2: '烟火腾腾，带给辛劳行者最踏实的美味。',
    line3: '在热气一餐间，融入最真挚的温暖慰藉。',
    blessing: '唯愿你柴米有香、烟火长留。用美味疗愈疲惫灵魂，福寿安康，生活热气腾腾。'
  },
  engineer: {
    code: '天工智筑',
    line1: '操执墨规矩尺，驾驭枢机铺就坦途大道。',
    line2: '筑桥跨海，立起摩天高楼直插云深处。',
    line3: '用巧思与数字技术赋能世俗，顺畅前排。',
    blessing: '唯愿你思如泉涌、志坚如铁。在浩瀚的建设洪流里勾画不朽巨作，行健在广阔新天。'
  }
};

export const BlessingScroll: React.FC<BlessingScrollProps> = ({
  userName,
  chosenDream,
  wateringCount,
  onReset,
}) => {
  // Use chosenDream.svgType to seamlessly match all 54 occupations back to the 9 primary blessing templates!
  const script = BLESSING_SCRIPTS[chosenDream.svgType] || BLESSING_SCRIPTS.singer;

  return (
    <div
      id="blessing-scroll-screen"
      className="relative flex h-full w-full flex-col items-center justify-start overflow-y-auto bg-rice-paper py-8 px-4 md:px-8 select-none animate-fade-in"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(139,94,60,0.05)_100%)] pointer-events-none" />

      {/* Dynamic celebratory background particles layout */}
      <div className="absolute inset-x-0 top-0 h-96 bg-[linear-gradient(to_bottom,rgba(175,49,27,0.07),transparent)] pointer-events-none" />

      {/* Floating stars/glow effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#AF311B]/4 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#D97706]/4 rounded-full blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-lg mb-12 flex flex-col items-center z-10"
      >
        {/* SCROLL TOP AXIS / ROLL WOOD (挂轴顶轴) */}
        <div className="w-full flex items-center justify-between mb-2">
          {/* Left Wooden Cap */}
          <div className="w-4 h-6 bg-gradient-to-r from-amber-800 to-amber-950 rounded-l shadow" />
          {/* Rod connector */}
          <div className="flex-1 h-3 bg-gradient-to-b from-amber-600 to-amber-800 border-y border-amber-950 shadow" />
          {/* Right Wooden Cap */}
          <div className="w-4 h-6 bg-gradient-to-l from-amber-800 to-amber-950 rounded-r shadow" />
        </div>

        {/* SCROLL CANVAS PAPER (挂画主体) */}
        <div className="w-[95%] bg-[#F9F0E1] text-[#291A11] p-6 md:p-10 border-x border-[#AF311B]/15 shadow-[0_15px_40px_rgba(139,94,60,0.1),_inset_0_0_40px_rgba(217,119,6,0.08)] relative">
          
          {/* Traditional decorative cinnabar borders */}
          <div className="absolute inset-3 border-2 border-[#AF311B]/20 pointer-events-none" />
          <div className="absolute inset-4 border border-[#AF311B]/10 pointer-events-none" />

          {/* Corner stamps / patterns */}
          <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-[#AF311B]" />
          <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-[#AF311B]" />
          <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-[#AF311B]" />
          <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-[#AF311B]" />

          {/* CINNABAR ANCIENT STAMP (印章 - "执着筑梦" in classical form) */}
          <div className="absolute top-8 right-8 w-11 h-11 border-2 border-[#AF311B] text-[#AF311B] font-serif font-black text-[10px] leading-tight flex items-center justify-center p-1 uppercase rotate-6 pointer-events-none tracking-tighter bg-[#F9F0E1]/80 select-none">
            执着<br />筑梦
          </div>

          <div className="absolute bottom-16 left-8 w-10 h-10 border-2 border-dashed border-[#AF311B] text-[#AF311B] font-bold text-[8px] leading-tight flex items-center justify-center rotate-[-12deg] pointer-events-none select-none">
            一花<br />一梦
          </div>

          {/* Scroll Header */}
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#AF311B] font-semibold">COSMIC SOUL PORTRAIT</span>
            <h2 className="font-serif text-xl md:text-2xl font-black tracking-[0.4em] text-[#AF311B] mt-0.5">
              心愿观照画卷
            </h2>
            <div className="w-16 h-[2px] bg-[#AF311B] mx-auto mt-2" />
          </div>

          {/* Chibi Portrait Frame inside the Scroll */}
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 bg-[#FCF9F2] border border-[#AF311B]/15 rounded-full mb-3 shadow-inner">
              <ChibiAvatar type={chosenDream.svgType} size={100} className="filter contrast-[1.05]" />
            </div>
            
            <div className="text-center">
              <p className="text-[10px] tracking-[0.25em] text-[#AF311B]/70 font-semibold uppercase leading-none">
                筑梦之人名帖 / DREAMER NAME
              </p>
              <h3 className="font-serif text-lg font-black text-[#5C2718] tracking-widest mt-1.5 font-bold">
                {userName}
              </h3>
            </div>
          </div>

          {/* POETIC CHINESE SCRIPT */}
          <div className="py-5 px-4 bg-[#F2E5CE]/50 border-y border-[#AF311B]/15 flex flex-col gap-3 font-serif text-center relative">
            <h4 className="text-xs text-[#AF311B] tracking-[0.3em] font-extrabold pb-1">
              《 {script.code} · 梦想心愿指南 》
            </h4>
            <div className="text-sm text-[#4E2B1A] font-bold leading-relaxed tracking-[0.18em] flex flex-col gap-1.5 md:gap-2">
              <p>{script.line1}</p>
              <p>{script.line2}</p>
              <p>{script.line3}</p>
            </div>
          </div>

          {/* Personal blessing prediction based on career option */}
          <div className="mt-6 text-center px-2">
            <p className="text-[10px] text-[#AF311B]/60 font-semibold tracking-widest leading-none">
              ◆ 理想前行寄语 ◆
            </p>
            <p className="font-serif text-xs md:text-sm text-[#5C2718] font-bold tracking-[0.14em] leading-relaxed mt-2.5 bg-[#FEFCF8]/95 p-3 border border-orange-400/20 rounded">
              {script.blessing}
            </p>
          </div>

          {/* Bottom Stamp Line */}
          <div className="mt-8 flex justify-center items-center gap-1.5 text-xs text-[#AF311B]/55 font-serif font-black tracking-widest">
            <span>⚜</span>
            <span>梦想共鸣之海·筑梦圆满</span>
            <span>⚜</span>
          </div>

        </div>

        {/* SCROLL BOTTOM AXIS / ROLL WOOD (挂轴底轴) */}
        <div className="w-full flex items-center justify-between mt-2">
          {/* Left Wooden Cap */}
          <div className="w-4 h-6 bg-gradient-to-r from-amber-800 to-amber-950 rounded-l shadow" />
          {/* Rod connector */}
          <div className="flex-1 h-3 bg-gradient-to-b from-amber-600 to-amber-800 border-y border-amber-950 shadow" />
          {/* Right Wooden Cap */}
          <div className="w-4 h-6 bg-gradient-to-l from-amber-800 to-amber-950 rounded-r shadow" />
        </div>

        {/* ACTIONS PANEL */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => {
              window.print();
            }}
            className="flex-1 py-3 bg-[#FEFCF8] hover:bg-[#F5EBD5] border border-[#AF311B]/25 text-[#AF311B] text-xs font-serif font-black tracking-[0.25em] rounded shadow-sm hover:shadow active:scale-97 cursor-pointer"
          >
            🖨️ 镌刻拓印画卷
          </button>
          
          <button
            onClick={onReset}
            className="flex-1 py-3 bg-gradient-to-r from-[#AF311B] to-[#C85C4F] hover:from-[#952512] hover:to-[#AF311B] text-[#FFFCEB] text-xs font-serif font-black tracking-[0.25em] rounded border border-amber-400/10 shadow-[0_4px_12px_rgba(175,49,27,0.15)] active:scale-97 cursor-pointer"
          >
            ⚜ 重新种下梦想 ⚜
          </button>
        </div>

      </motion.div>
    </div>
  );
};
