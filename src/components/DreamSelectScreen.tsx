/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, ArrowRight, Compass, Bookmark, LayoutGrid, Lock } from 'lucide-react';
import { DreamCharacter } from '../types';
import { DREAM_CHARACTERS, DREAM_CATEGORIES } from '../data/characters';
import { ChibiAvatar } from './ChibiAvatar';
import { ProfessionIcon } from './ProfessionIcon';
import { CrayonIcon } from './CrayonIcon';

// Custom photo loader helper with multiple formats fallback support
const ProfessionImage: React.FC<{ code: string; className?: string; alt?: string }> = ({ code, className = '', alt = '' }) => {
  const [srcIndex, setSrcIndex] = useState(0);
  
  const sources = [
    `https://i.postimg.cc/${code}/image.png`,
    `https://i.postimg.cc/${code}/image.jpg`,
    `https://i.postimg.cc/${code}/image.jpeg`,
    `https://i.postimg.cc/${code}/preview.png`,
    `https://i.postimg.cc/${code}/preview.jpg`,
    `https://postimg.cc/${code}`
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
      alt={alt}
      referrerPolicy="no-referrer"
    />
  );
};

// =========================================================================
// DECORATIVE DUNHUANG AURA & MOTIF SVG VECTORS (飞天与莲花艺术挂件)
// =========================================================================

const FlyingApsaraRibbon: React.FC<{ className?: string; color?: string }> = ({ className, color = '#AF311B' }) => (
  <svg viewBox="0 0 400 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 80 C 80 120, 150 10, 220 50 C 290 90, 310 -10, 390 30"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.25"
    />
    <path
      d="M20 85 C 90 125, 140 25, 230 60 C 300 95, 320 0, 380 40"
      stroke={color}
      strokeWidth="0.8"
      strokeDasharray="4 4"
      opacity="0.14"
    />
    <path
      d="M140 40 C 120 20, 95 30, 105 55 C 115 80, 140 70, 150 50"
      stroke={color}
      strokeWidth="1.2"
      opacity="0.2"
    />
    <path
      d="M260 70 C 280 90, 305 80, 295 55 C 285 30, 260 40, 250 60"
      stroke={color}
      strokeWidth="1.2"
      opacity="0.2"
    />
    <circle cx="50" cy="20" r="1.5" fill={color} opacity="0.3" />
    <circle cx="330" cy="90" r="2" fill={color} opacity="0.25" />
  </svg>
);

const DunhuangApsaraLineArt: React.FC<{ className?: string; color?: string }> = ({ className, color = '#AF311B' }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 120 40 C 125 35, 132 38, 130 45 C 128 50, 122 53, 118 48 C 116 45, 118 42, 120 40"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M 128 36 C 132 25, 142 28, 140 38 C 138 45, 131 43, 128 36 Z"
      fill={color}
      opacity="0.2"
      stroke={color}
      strokeWidth="1"
    />
    <path
      d="M 119 49 C 114 55, 95 65, 80 62 C 70 60, 60 45, 45 42"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M 116 52 C 120 54, 128 52, 134 45 C 138 41, 145 35, 148 38"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M 148 38 C 151 36, 152 32, 150 34 C 148 36, 151 38, 154 36"
      stroke={color}
      strokeWidth="1"
      opacity="0.6"
    />
    <path
      d="M 80 62 C 90 70, 75 90, 60 105 C 45 120, 25 125, 15 120"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M 136 41 C 130 50, 110 55, 100 68 C 90 80, 95 95, 115 100 C 135 105, 150 90, 140 75 C 130 60, 105 75, 90 90 Z"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.5"
    />
    <circle cx="155" cy="45" r="1.5" fill={color} opacity="0.5" />
    <circle cx="108" cy="115" r="1.2" fill={color} opacity="0.45" />
    <circle cx="28" cy="98" r="1.5" fill={color} opacity="0.45" />
  </svg>
);

const DunhuangLotusPaint: React.FC<{ className?: string; color?: string }> = ({ className, color = '#AF311B' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(50 50)">
      <circle cx="0" cy="0" r="45" stroke={color} strokeWidth="0.5" strokeDasharray="3 2" opacity="0.3" />
      <circle cx="0" cy="0" r="38" stroke={color} strokeWidth="1" opacity="0.15" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = i * 45;
        return (
          <g key={`l-petal-${i}`} transform={`rotate(${angle})`}>
            <path
              d="M 0 -6 C -11 -15, -11 -28, 0 -34 C 11 -32, 11 -15, 0 -6 Z"
              fill={`${color}06`}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.4"
            />
          </g>
        );
      })}
      <circle cx="0" cy="0" r="10" fill={`${color}12`} stroke={color} strokeWidth="0.8" opacity="0.5" />
    </g>
  </svg>
);

const DunhuangLuckyCloud: React.FC<{ className?: string; color?: string }> = ({ className, color = '#AF311B' }) => (
  <svg viewBox="0 0 80 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 15 35 C 5 35, 2 25, 12 20 C 10 10, 25 5, 32 12 C 40 5, 55 8, 52 18 C 62 15, 75 22, 68 32 C 60 40, 48 38, 42 35 Z"
      fill={`${color}03`}
      stroke={color}
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M 68 32 C 76 33, 80 40, 75 44 C 70 48, 62 44, 64 38"
      stroke={color}
      strokeWidth="0.8"
      opacity="0.3"
    />
  </svg>
);

// Crop parameters to focus precisely on symbolic professional tools and attributes
const getProfessionObjectCrop = (id: string) => {
  switch (id) {
    // 1. 医疗与健康
    case 'doctor':
      return { scale: 3.5, origin: '50% 68%', translateY: '10%' }; // Stethoscope / medical chart
    case 'nurse':
      return { scale: 3.8, origin: '42% 70%', translateY: '12%' }; // Heart beat line / sheet
    case 'dentist':
      return { scale: 3.6, origin: '38% 70%', translateY: '12%' }; // Smile care mirror / probe
    case 'vet':
      return { scale: 3.5, origin: '50% 75%', translateY: '15%' }; // Loved small puppy / kitty
    case 'nutritionist':
      return { scale: 3.5, origin: '48% 68%', translateY: '10%' }; // Wholesome avocado / recipe
    case 'counselor':
      return { scale: 3.8, origin: '45% 72%', translateY: '14%' }; // Time hourglass / counseling pad

    // 2. 教育与科研
    case 'chemist':
      return { scale: 3.4, origin: '50% 64%', translateY: '8%' }; // Erlenmeyer chemical flask
    case 'teacher':
      return { scale: 3.6, origin: '40% 70%', translateY: '12%' }; // Blackboard pointer / folder book
    case 'scientist':
      return { scale: 3.5, origin: '52% 64%', translateY: '8%' }; // Microscope / formula display
    case 'astronomer':
      return { scale: 3.5, origin: '53% 66%', translateY: '10%' }; // Stellar telescope gear lens
    case 'biologist':
      return { scale: 3.6, origin: '48% 68%', translateY: '10%' }; // Petri dish / plants
    case 'explorer':
      return { scale: 3.5, origin: '52% 72%', translateY: '14%' }; // Magnetic compass map / rope
    case 'archaeologist':
      return { scale: 3.7, origin: '45% 70%', translateY: '12%' }; // Ancient mask relic / brush
    case 'geographer':
      return { scale: 3.6, origin: '51% 68%', translateY: '10%' }; // Earth globe model / map

    // 3. 艺术与设计
    case 'painter':
      return { scale: 3.5, origin: '50% 72%', translateY: '14%' }; // Colored wooden palette / brush
    case 'musician':
      return { scale: 3.4, origin: '52% 74%', translateY: '16%' }; // Classical zither / instrument cords
    case 'dancer':
      return { scale: 3.5, origin: '48% 70%', translateY: '12%' }; // Silk flying ribbon lines
    case 'actor':
      return { scale: 3.6, origin: '45% 68%', translateY: '10%' }; // Stage character manuscript mask
    case 'singer':
      return { scale: 3.8, origin: '50% 66%', translateY: '10%' }; // Performance vocal microphone
    case 'photographer':
      return { scale: 3.7, origin: '48% 68%', translateY: '11%' }; // DSLR camera lens ring
    case 'designer':
      return { scale: 3.6, origin: '52% 70%', translateY: '12%' }; // Stylus tablet pen / style grid
    case 'architect':
      return { scale: 3.5, origin: '50% 72%', translateY: '14%' }; // Draftsman rule blueprint
    case 'writer':
      return { scale: 3.8, origin: '44% 72%', translateY: '14%' }; // Calligraphy letter script
    case 'esports':
      return { scale: 3.4, origin: '50% 74%', translateY: '16%' }; // Mechanical glowing mouse / keys

    // 4. 商业与法律
    case 'lawyer':
      return { scale: 3.5, origin: '48% 72%', translateY: '12%' }; // Law corpus book files
    case 'judge':
      return { scale: 3.6, origin: '50% 74%', translateY: '14%' }; // Gavel balance scale / courtroom wood
    case 'police':
      return { scale: 3.4, origin: '52% 65%', translateY: '8%' }; // Police badge gear / radio
    case 'firefighter':
      return { scale: 3.5, origin: '46% 72%', translateY: '12%' }; // Water pressurized ejector hose
    case 'entrepreneur':
      return { scale: 3.5, origin: '50% 70%', translateY: '12%' }; // Strategy analytics panel
    case 'banker':
      return { scale: 3.6, origin: '52% 68%', translateY: '10%' }; // Safe vaults / credit card ledger
    case 'accountant':
      return { scale: 3.6, origin: '48% 72%', translateY: '12%' }; // Counting desk calculator ledger

    // 5. 技术与工程
    case 'engineer':
      return { scale: 3.5, origin: '50% 72%', translateY: '14%' }; // Yellow hard hat / design map
    case 'programmer':
      return { scale: 3.5, origin: '48% 74%', translateY: '15%' }; // Development code screen lines
    case 'astronaut':
      return { scale: 3.4, origin: '52% 68%', translateY: '10%' }; // Orbit space visor helmet
    case 'mechanic':
      return { scale: 3.6, origin: '50% 70%', translateY: '12%' }; // Gear screwdriver set
    case 'athlete':
      return { scale: 3.5, origin: '48% 72%', translateY: '12%' }; // Championship sports track weights
    case 'magician':
      return { scale: 3.5, origin: '50% 68%', translateY: '10%' }; // Mystery top hat / wand cards

    // 6. 生活服务
    case 'chef':
      return { scale: 3.6, origin: '48% 72%', translateY: '14%' }; // Stainless cooking skillet pan
    case 'baker':
      return { scale: 3.5, origin: '50% 72%', translateY: '14%' }; // Wheat yeast oven pastry tray
    case 'hairdresser':
      return { scale: 3.6, origin: '50% 68%', translateY: '10%' }; // Silver shears / styling dryer comb
    case 'florist':
      return { scale: 3.5, origin: '48% 74%', translateY: '15%' }; // Beautiful bouquet / pruning shears
    case 'courier':
      return { scale: 3.5, origin: '46% 70%', translateY: '12%' }; // Safe express boxes / barcode gun
    case 'guide':
      return { scale: 3.5, origin: '50% 72%', translateY: '14%' }; // Megaphone speaker / tour pennant

    // 7. 交通物流
    case 'driver':
      return { scale: 3.5, origin: '50% 72%', translateY: '14%' }; // Steering cockpit instrumentation
    case 'captain':
      return { scale: 3.4, origin: '52% 68%', translateY: '10%' }; // Ship steering wheel / maritime log
    case 'pilot_job':
      return { scale: 3.5, origin: '50% 70%', translateY: '12%' }; // Flight cabin yoke panels
    case 'steward':
      return { scale: 3.6, origin: '48% 72%', translateY: '12%' }; // Cabin warm tea kettle tray

    // 8. 农业自然
    case 'farmer_job':
      return { scale: 3.5, origin: '48% 74%', translateY: '15%' }; // Golden harvest paddy wheat / spade
    case 'gardener':
      return { scale: 3.5, origin: '50% 72%', translateY: '14%' }; // Potted floral / bonsai water pot
    case 'zookeeper':
      return { scale: 3.5, origin: '48% 74%', translateY: '15%' }; // Sweet zoo baby panda / bamboo
    case 'ranger':
      return { scale: 3.5, origin: '50% 72%', translateY: '14%' }; // Forest binoculars scope / trees

    // 9. 媒体传播
    case 'reporter':
      return { scale: 3.6, origin: '48% 70%', translateY: '12%' }; // Reporting micro gear / prompt pad
    case 'editor':
      return { scale: 3.5, origin: '50% 72%', translateY: '14%' }; // Editorial red correction pen copy
    case 'streamer':
      return { scale: 3.6, origin: '50% 68%', translateY: '10%' }; // Studio ring light / mic mount

    default:
      return { scale: 3.5, origin: '50% 70%', translateY: '12%' };
  }
};

export const getRollCompactCount = (id: string): string => {
  switch (id) {
    case 'health': return '12,854';
    case 'education': return '8,432';
    case 'art': return '24,195';
    case 'business': return '15,302';
    case 'tech': return '31,480';
    case 'service': return '19,820';
    case 'transport': return '6,423';
    case 'agriculture': return '4,115';
    case 'media': return '16,740';
    default: return '10,000';
  }
};

interface DreamSelectScreenProps {
  userName: string;
  onNext: (character: DreamCharacter) => void;
  onBack: () => void;
}

export const DreamSelectScreen: React.FC<DreamSelectScreenProps> = ({
  userName,
  onNext,
  onBack,
}) => {
  const [viewMode, setViewMode] = useState<'categories' | 'occupations'>('categories');
  const [activeIndex, setActiveIndex] = useState(4); // Default to index 4 (Technology) in the center of the carousel
  const [activeCoronationChar, setActiveCoronationChar] = useState<DreamCharacter | null>(null);

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Ongoing progression gating & history records state
  const [ongoingDreamId, setOngoingDreamId] = useState<string | null>(null);
  const [ongoingDaysCount, setOngoingDaysCount] = useState(0);
  const [completedDreamsList, setCompletedDreamsList] = useState<string[]>([]);
  const [showGatedAlert, setShowGatedAlert] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Load local storage states with account isolation
    const logged = localStorage.getItem('user_is_logged_in') === 'true';
    const phoneVal = localStorage.getItem('user_logged_phone') || '';
    
    const ongoingKey = logged && phoneVal ? `${phoneVal}_ongoing_dream_id` : 'ongoing_dream_id';
    const stampsKey = (dreamId: string) => logged && phoneVal ? `${phoneVal}_stamps_${dreamId}` : `stamps_${dreamId}`;
    const completedKey = logged && phoneVal ? `${phoneVal}_completed_dreams` : 'completed_dreams';

    const ongoing = localStorage.getItem(ongoingKey);
    if (ongoing) {
      setOngoingDreamId(ongoing);
      const savedStamps = localStorage.getItem(stampsKey(ongoing));
      if (savedStamps) {
        try {
          setOngoingDaysCount(Object.keys(JSON.parse(savedStamps)).length);
        } catch {
          setOngoingDaysCount(0);
        }
      }
    }

    const completed = localStorage.getItem(completedKey);
    if (completed) {
      try {
        setCompletedDreamsList(JSON.parse(completed));
      } catch {
        setCompletedDreamsList([]);
      }
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Find currently active category meta
  const activeCategory = DREAM_CATEGORIES[activeIndex] || DREAM_CATEGORIES[4];
  const selectedCategoryId = activeCategory.id;

  // Filter occupations matching this category's name prefix
  const filteredCharacters = DREAM_CHARACTERS.filter(char =>
    char.modernRole.startsWith(activeCategory.name)
  );

  const numChinese = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '镹'];

  // Check if selection needs gating lock
  const handleCheckGatingAndProceed = (targetChar: DreamCharacter) => {
    if (ongoingDreamId && ongoingDreamId !== targetChar.id) {
      // Find what the actual ongoing dream object is
      const ongoingObj = DREAM_CHARACTERS.find(c => c.id === ongoingDreamId);
      if (ongoingObj) {
        setShowGatedAlert(true);
        return;
      }
    }

    const logged = localStorage.getItem('user_is_logged_in') === 'true';
    const phoneVal = localStorage.getItem('user_logged_phone') || '';
    const ongoingKey = logged && phoneVal ? `${phoneVal}_ongoing_dream_id` : 'ongoing_dream_id';

    // Set the selected dream as ongoing in storage as soon as they set sail!
    localStorage.setItem(ongoingKey, targetChar.id);
    onNext(targetChar);
  };

  const handleSelectCategory = (catId: string) => {
    const idx = DREAM_CATEGORIES.findIndex(cat => cat.id === catId);
    if (idx !== -1) {
      setActiveIndex(idx);
      const category = DREAM_CATEGORIES[idx];
      const matched = DREAM_CHARACTERS.filter(char =>
        char.modernRole.startsWith(category.name)
      );
      if (matched.length > 0) {
        setActiveCoronationChar(matched[0]);
      }
    }
    setViewMode('occupations');
  };

  // If viewMode is occupations and activeCoronationChar is null or not in current list, auto-select first one.
  React.useEffect(() => {
    if (viewMode === 'occupations' && filteredCharacters.length > 0) {
      const isStillValid = activeCoronationChar && filteredCharacters.some(c => c.id === activeCoronationChar.id);
      if (!isStillValid) {
        setActiveCoronationChar(filteredCharacters[0]);
      }
    }
  }, [viewMode, activeIndex]);

  return (
    <div
      id="dream-select-screen"
      className={`relative flex h-full w-full flex-col bg-rice-paper select-none ${
        viewMode === 'categories' ? 'p-4 sm:p-5 md:p-6 lg:p-8 lg:overflow-hidden overflow-y-auto' : 'p-4 sm:p-6 md:p-8 overflow-y-auto'
      }`}
    >
      {/* SVG Global wax-crayon filter definition */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="crayon-displace" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Top clean unified Header Bar */}
      <div className="w-full flex items-center justify-between gap-4 z-50 shrink-0 mb-5 relative">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (viewMode === 'occupations') {
                setViewMode('categories');
              } else {
                onBack();
              }
            }}
            className="p-2 text-[#AF311B] hover:text-[#C85C4F] rounded-full hover:bg-amber-950/5 transition-colors cursor-pointer flex items-center justify-center bg-[#FAF4EA]/40"
            title="返回"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl sm:text-2xl md:text-3.5xl lg:text-[38px] font-black tracking-[0.04em] text-[#AF311B]">
              梦想天轨
            </span>
            {viewMode === 'occupations' && (
              <span className="font-serif text-[15px] sm:text-[18px] md:text-[22px] text-[#5C2718] font-black">
                · {activeCategory.name}卷（{filteredCharacters.length}种职业）
              </span>
            )}
          </div>
        </div>

        {/* User Capsule */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-1.5 bg-[#FDFCFA]/90 border border-[#AF311B]/20 rounded shadow-sm flex items-center gap-2 text-xs font-serif font-black text-[#AF311B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#AF311B] animate-pulse" />
            筑梦人 · <span className="font-sans font-extrabold">{userName}</span>
          </div>
        </div>
      </div>

      {/* Dynamic background floating Dunhuang elements (缓慢游走的飞天丝绸飘带与神圣祥云) */}
      <motion.div
        className="absolute top-[8%] left-[2%] w-60 h-28 pointer-events-none opacity-[0.22] z-0"
        animate={{
          y: [0, -12, 0],
          x: [0, 8, 0],
          rotate: [0, 1.8, 0]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <FlyingApsaraRibbon color="#AF311B" className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-[10%] right-[3%] w-64 h-32 pointer-events-none opacity-[0.16] z-0"
        animate={{
          y: [0, 14, 0],
          x: [0, -8, 0],
          rotate: [0, -2, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <DunhuangApsaraLineArt color="#cc9f68" className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute top-[45%] right-[1%] w-28 h-18 pointer-events-none opacity-[0.18] z-0"
        animate={{
          x: [0, -12, 0],
          y: [0, 6, 0]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <DunhuangLuckyCloud color="#88add0" className="w-full h-full" />
      </motion.div>

      {/* Ancient mural background vignette shading */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(139,94,60,0.06)_100%)] pointer-events-none" />

      {/* Frame boundary details */}
      <div className="absolute inset-2 md:inset-4 border border-amber-950/10 pointer-events-none rounded">
        <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-amber-900/20" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-[#AF311B]/15" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-[#AF311B]/15" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-amber-900/20" />
      </div>

      {/* PROGRESSIVE VIEW COMPONENT SWITCHER */}
      <div className="max-w-7xl mx-auto w-full flex-1 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* STAGE A: THE 9 COMPACT MANUSCRIPT-STYLE CATEGORIES */}
          {viewMode === 'categories' && (
            <motion.div
              key="categories-carousel-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full flex flex-col gap-5 items-center select-none"
            >
              {/* Guidance header label */}
              <div className="text-center shrink-0 relative z-10">
                <span className="font-serif text-xs md:text-sm text-[#A26D3F] tracking-[0.2em] font-black uppercase bg-[#FAF4EA]/80 px-4 py-1.5 rounded-full border border-amber-900/10 shadow-sm flex items-center justify-center gap-1.5">
                  ✏️ 请轻抹初心 · 开启九重梦想天轨 ✦
                </span>
              </div>

              {/* 3D Coverflow Slider Frame */}
              <div 
                className="relative w-full max-w-5xl h-[335px] sm:h-[370px] md:h-[415px] flex items-center justify-center overflow-visible mt-2 px-12 md:px-16"
                style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
              >
                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex((prev) => (prev - 1 + 9) % 9);
                  }}
                  className="absolute left-1 md:left-4 z-40 p-3 rounded-full border border-[#AF311B]/25 bg-[#FAF4EA]/90 hover:bg-[#FAF4EA] text-[#AF311B] shadow-md hover:shadow-xl hover:scale-110 transition-all active:scale-90 cursor-pointer flex items-center justify-center"
                  aria-label="上一卷"
                >
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </button>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex((prev) => (prev + 1) % 9);
                  }}
                  className="absolute right-1 md:right-4 z-40 p-3 rounded-full border border-[#AF311B]/25 bg-[#FAF4EA]/90 hover:bg-[#FAF4EA] text-[#AF311B] shadow-md hover:shadow-xl hover:scale-110 transition-all active:scale-90 cursor-pointer flex items-center justify-center"
                  aria-label="下一卷"
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </button>

                {/* Slider Tracks */}
                <div 
                  className="relative w-full h-full flex items-center justify-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {DREAM_CATEGORIES.map((cat, idx) => {
                    const total = DREAM_CATEGORIES.length;
                    let diff = idx - activeIndex;
                    const catRoles = DREAM_CHARACTERS.filter(char => char.modernRole.startsWith(cat.name));
                    const competitorCount = getRollCompactCount(cat.id);

                    // Shortest continuous path circular wrapping logic
                    if (diff > total / 2) diff -= total;
                    else if (diff < -total / 2) diff += total;

                    const isCenter = diff === 0;
                    const absDiff = Math.abs(diff);

                    // Render max out of bounds elements safely
                    if (absDiff > 3) return null;

                    // Responsive translation parameters
                    const isMobile = windowWidth < 640;
                    const isTablet = windowWidth >= 640 && windowWidth < 1024;
                    const factor = isMobile ? 85 : isTablet ? 145 : 210;

                    const translateX = diff * factor;
                    const scale = isCenter ? 1.05 : absDiff === 1 ? 0.8 : absDiff === 2 ? 0.62 : 0.45;
                    const rotateY = isCenter ? 0 : diff > 0 ? -28 : 28;
                    const translateZ = isCenter ? 0 : -140 * absDiff;
                    const opacity = isCenter ? 1 : absDiff === 1 ? 0.82 : absDiff === 2 ? 0.38 : 0.12;
                    const zIndex = 20 - absDiff;

                    return (
                      <motion.div
                        key={cat.id}
                        style={{
                          position: 'absolute',
                          zIndex,
                          opacity,
                          transformStyle: 'preserve-3d',
                          pointerEvents: absDiff <= 1 ? 'auto' : 'none',
                        }}
                        animate={{
                          transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 24,
                        }}
                        onClick={() => {
                          if (isCenter) {
                            handleSelectCategory(cat.id);
                          } else {
                            setActiveIndex(idx);
                          }
                        }}
                        className="group cursor-pointer select-none"
                      >
                        {/* Interactive Card content block */}
                        <div 
                          className={`relative w-[185px] sm:w-[220px] md:w-[250px] p-4 bg-[#FAF9F5] hover:bg-[#FFFDFB] border-2 rounded-2xl transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden h-[245px] sm:h-[285px] md:h-[325px] ${
                            isCenter 
                              ? 'border-[#AF311B]/60 shadow-[0_16px_36px_-6px_rgba(139,94,60,0.25)] ring-2 ring-amber-500/10' 
                              : 'border-[#AF311B]/15 shadow-sm opacity-95 hover:opacity-100'
                          }`}
                          style={{
                            boxShadow: isCenter ? '0 15px 35px -10px rgba(139,94,60,0.3), inset 0 0 15px rgba(180, 83, 9, 0.05)' : 'inset 0 0 10px rgba(0,0,0,0.02)'
                          }}
                        >
                          {/* Dunhuang Lotus background watermark in corner */}
                          <div className="absolute right-[-14px] bottom-[-14px] w-16 h-16 opacity-[0.06] group-hover:opacity-[0.14] transition-all duration-350 pointer-events-none flex items-center justify-center rotate-12 group-hover:rotate-45">
                            <DunhuangLotusPaint color={cat.themeColor} className="w-full h-full" />
                          </div>

                          {/* Top crayon edge highlight */}
                          <div 
                            className="absolute top-0 inset-x-0 h-[4px] opacity-80 group-hover:opacity-100 transition-opacity" 
                            style={{ backgroundColor: cat.themeColor }}
                          />

                          {/* Small circular Crayon Roll Number Index */}
                          <div 
                            className="absolute right-2.5 top-2.5 w-6 h-6 border border-dashed rounded-full flex items-center justify-center pointer-events-none opacity-[0.4] group-hover:opacity-90 transition-opacity duration-300 text-[10px] font-serif font-black" 
                            style={{ borderColor: `${cat.themeColor}60`, color: cat.themeColor }}
                          >
                            {numChinese[idx]}
                          </div>

                          {/* Crayon Badge and description elements */}
                          <div className="flex-1 flex flex-col items-center justify-center w-full mt-2">
                            <div 
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 relative"
                              style={{ 
                                background: `radial-gradient(circle, ${cat.themeColor}12 0%, ${cat.themeColor}04 100%)`,
                                border: `2px dashed ${cat.themeColor}25`
                              }}
                            >
                              <CrayonIcon id={cat.id} themeColor={cat.themeColor} size={isMobile ? 42 : 52} />
                              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: cat.themeColor }}>
                                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                              </div>
                            </div>

                            {/* Title text */}
                            <h4 className="font-serif text-sm sm:text-base md:text-[16px] font-black tracking-wider text-[#2C1F15] group-hover:text-[#AF311B] transition-colors mt-3 flex items-center justify-center gap-1.5">
                              <span>{cat.name}</span>
                              <span className="text-[10px] md:text-[11px] font-sans font-extrabold text-[#AF311B]/80 bg-[#FAF4EA] px-1.5 py-0.5 rounded border border-[#AF311B]/10 leading-none col-span-1">
                                {catRoles.length}种职业
                              </span>
                            </h4>
                            
                            <p className="text-[10px] sm:text-[11px] text-amber-950/60 font-serif leading-snug tracking-wider group-hover:text-amber-950 transition-colors line-clamp-2 mt-2 px-1">
                              {cat.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM DOTS INDICATORS */}
              <div className="flex items-center gap-2 relative z-10 mt-1">
                {DREAM_CATEGORIES.map((cat, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={`dot-${cat.id}`}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                      title={cat.name}
                    >
                      <div 
                        className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? '#AF311B' : 'rgba(175, 49, 27, 0.2)',
                          boxShadow: isActive ? '0 0 8px #AF311B' : 'none',
                          transform: isActive ? 'scale(1.2)' : 'none'
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Bottom confirmation CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 z-30 flex flex-col items-center gap-2.5 shrink-0"
              >
                {/* Regular Category Explore button */}
                <button
                  type="button"
                  onClick={() => handleSelectCategory(activeCategory.id)}
                  className="px-8 py-3 bg-gradient-to-r from-[#AF311B] to-[#C85C4F] text-[#FFFBEB] text-xs sm:text-sm font-serif font-black tracking-[0.25em] rounded-full border border-amber-400/20 shadow-[0_5px_22px_-5px_rgba(175,49,27,0.35)] hover:shadow-[0_8px_30px_-5px_rgba(175,49,27,0.5)] hover:scale-103 transition-all active:scale-97 cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  进入修习
                </button>
                <span className="text-[9.5px] text-[#A26D3F] font-serif tracking-widest opacity-85">
                  💡 点击侧栏卡片进行翻阅，或直接轻击中心卡片进入筑梦 ✦
                </span>




              </motion.div>
            </motion.div>
          )}

          {/* STAGE B: THE DETAILED SUB-CAREERS (MERGED SELECTION & PREVIEW) */}
          {viewMode === 'occupations' && activeCoronationChar && (
            <motion.div
              key="occupations-combined-view"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full flex-1 flex flex-col lg:flex-row gap-6 relative z-10 pb-4"
            >
              {/* Left Column: Responsive Grid + Primary Action at bottom (42% on desktop) */}
              <div className="w-full lg:w-[42%] xl:w-[42%] flex flex-col justify-between shrink-0 mb-4 lg:mb-0">
                <div>
                  <div className="text-left mb-3">
                    <span className="font-serif text-[11px] text-[#E05A36] tracking-[0.14em] font-black uppercase bg-[#FAF4EA]/80 px-3.5 py-1.5 rounded-full border border-[#E05A36]/20 shadow-sm inline-flex items-center gap-1.5">
                      👈 请轻按墨面 · 唤醒愿海星图
                    </span>
                  </div>
                  
                  {/* 4-per-row grid wrapping downwards */}
                  <div 
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 overflow-y-auto max-h-[340px] lg:max-h-[calc(100vh-320px)] pr-2"
                    style={{ scrollbarWidth: 'thin' }}
                  >
                    {filteredCharacters.map((char) => {
                      const isSelected = char.id === activeCoronationChar.id;
                      return (
                        <motion.div
                          key={char.id}
                          whileHover={{ y: -4, scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setActiveCoronationChar(char);
                          }}
                          className={`aspect-square rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden relative group bg-[#FAF9F5] ${
                            isSelected 
                              ? 'border-[#E05A36] shadow-[0_8px_20px_-4px_rgba(224,90,54,0.35)] ring-4 ring-[#E05A36]/15' 
                              : 'border-[#E05A36]/20 hover:border-[#E05A36]/65 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {/* Selected Indicator Checkmark / Badge */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-[#E05A36] text-[#FFFEDC] text-[9.5px] font-black px-2 py-0.5 rounded-full z-20 font-serif tracking-widest shadow-sm">
                              已选
                            </div>
                          )}

                          {/* Image preview (Zoomed and cropped to focus precisely on each profession's specific tools/items) */}
                          <div className="w-full h-full bg-[#EFECE4] overflow-hidden relative pb-6">
                            {(() => {
                              const crop = getProfessionObjectCrop(char.id);
                              return (
                                <ProfessionImage
                                  code={char.imgCode || ''}
                                  className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-[1.08]"
                                  style={{
                                    transform: `scale(${crop.scale}) translateY(${crop.translateY})`,
                                    transformOrigin: crop.origin
                                  }}
                                  alt={char.name}
                                />
                              );
                            })()}
                          </div>

                          {/* Beautiful Dunhuang-palette Name Overlay */}
                          <div className="absolute bottom-0 inset-x-0 bg-[#FAF9F5]/95 backdrop-blur-[2px] border-t border-amber-950/10 text-[#5C2718] text-[10.5px] sm:text-xs py-1.5 text-center font-serif font-black z-15 transition-colors group-hover:text-[#AF311B]">
                            {char.name}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Primary confirmation Explore button moved here for spacious ergonomics! */}
                <div className="mt-4 pt-2 border-t border-dashed border-[#E05A36]/10">
                  <button
                    onClick={() => {
                      handleCheckGatingAndProceed(activeCoronationChar);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-[#AF311B] to-[#C85C4F] text-xs sm:text-sm text-[#FFFBEB] font-serif font-black tracking-[0.4em] rounded-full border border-amber-400/20 shadow-[0_5px_22px_-5px_rgba(175,49,27,0.35)] hover:shadow-[0_8px_30px_-5px_rgba(175,49,27,0.5)] hover:scale-102 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    探索
                  </button>
                  <p className="text-[10px] text-center text-amber-900/50 font-serif tracking-wider mt-2.5">
                    ✦ 点击上方按键，携此无上宏愿进入功德法海 ✦
                  </p>
                </div>
              </div>

              {/* Right Column: Expanded character showcase dashboard (58% on desktop) */}
              <div className="flex-1 w-full lg:w-[58%] xl:w-[58%] flex flex-col gap-4 bg-[#FDFCFA]/90 border border-[#E05A36]/15 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-md">
                
                {/* Background watermarks for game roster feel */}
                <div className="absolute right-[-24px] bottom-[-24px] w-36 h-36 opacity-[0.05] pointer-events-none select-none">
                  <DunhuangLotusPaint color={activeCoronationChar.color} className="w-full h-full" />
                </div>
                
                {/* Image Section: Perfect, Complete Square view of the illustration portrait with no cropping */}
                <div className="relative w-full aspect-square max-h-[340px] lg:max-h-[380px] rounded-xl border border-amber-950/10 overflow-hidden shadow-sm bg-[#FAF6EE] flex items-center justify-center p-2">
                  <ProfessionImage
                    code={activeCoronationChar.imgCode || ''}
                    className="w-full h-full object-contain"
                    alt={activeCoronationChar.name}
                  />
                </div>

                {/* Info Text without button overlays */}
                <div className="flex-1 flex flex-col justify-between gap-3 text-left relative z-10">
                  <div>
                    {/* Header Name Block */}
                    <div className="flex items-baseline gap-2 mb-1.5 border-b border-[#E05A36]/10 pb-1.5">
                      <span className="font-serif text-2xl md:text-[26px] font-black text-[#AF311B] tracking-wider leading-none">
                        {activeCoronationChar.name}
                      </span>
                      <span className="text-[11px] text-amber-900/60 font-serif font-extrabold bg-[#FAF4EA] px-2 py-0.5 rounded border border-[#E05A36]/10">
                        {activeCoronationChar.modernRole.split(' · ')[0]}
                      </span>
                    </div>

                    <p className="text-[12px] md:text-[13px] leading-relaxed text-[#2C1F15]/90 font-serif tracking-wide text-justify h-[85px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                      {activeCoronationChar.description}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

         {/* GATING LOCK WARNING MODAL DIALOG */}
          <AnimatePresence>
            {showGatedAlert && (
              <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-[#FAF6EE] text-[#2C1F15] rounded-3xl p-6 sm:p-7 max-w-sm w-full border-4 border-[#AF311B]/25 shadow-2xl relative overflow-hidden text-center z-50"
                >
                  {/* Decorative corner borders */}
                  <div className="absolute inset-1.5 border border-[#AF311B]/10 rounded-2xl pointer-events-none" />
                  
                  <div className="w-14 h-14 mx-auto mb-3 bg-red-100/55 rounded-full flex items-center justify-center border border-red-200">
                    <Lock className="w-6 h-6 text-[#AF311B]" />
                  </div>

                  <h3 className="font-serif text-base font-black text-[#5C2718] tracking-widest mb-2">
                    🌸 宏志专一 · 轨路锁定
                  </h3>
                  
                  <p className="font-serif text-[11px] sm:text-[12px] text-stone-600 leading-relaxed mb-5 text-justify bg-[#FAF4EA] p-3 rounded-xl border border-amber-900/5">
                    施主当前正处于 <strong>【{DREAM_CHARACTERS.find(c => c.id === ongoingDreamId)?.name || '梦想探索'}】</strong> 培育之旅（已坚持 <strong>{ongoingDaysCount}/21天</strong>）。<br /><br />
                    施持梦想，最贵意专。您需在此天轨完成21天圆满打卡结愿典礼，或在右上角【设置】中选择【账号管理】重置清空存档，方可开启下一个梦想修持。
                  </p>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowGatedAlert(false);
                        const activeObj = DREAM_CHARACTERS.find(c => c.id === ongoingDreamId);
                        if (activeObj) onNext(activeObj);
                      }}
                      className="w-full py-2.5 bg-[#AF311B] text-white font-serif font-bold text-xs rounded-xl hover:bg-[#8D2312] transition-colors cursor-pointer"
                    >
                      ⚡ 承誓专一：立即回到原培育
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowGatedAlert(false)}
                      className="w-full py-1.5 text-stone-500 font-serif text-[11px] hover:text-[#AF311B] transition cursor-pointer"
                    >
                      暂且退回
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </AnimatePresence>
      </div>

    </div>
  );
};
