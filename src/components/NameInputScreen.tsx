/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface NameInputScreenProps {
  onNext: (name: string) => void;
  onBack: () => void;
  onOpenSettings?: () => void;
}

const DEFAULT_NICKNAMES = [
  '妙菡', '灵犀', '若水', '沙泉', '星罗',
  '飞天', '听风', '闻笙', '流云', '舒云'
];

export const NameInputScreen: React.FC<NameInputScreenProps> = ({ onNext, onBack, onOpenSettings }) => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleGenerateRandom = () => {
    const randomIndex = Math.floor(Math.random() * DEFAULT_NICKNAMES.length);
    setNickname(`${DEFAULT_NICKNAMES[randomIndex]}筑梦者`);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed) {
      setError('亲爱的筑梦者，称呼不可留白。');
      return;
    }
    onNext(trimmed);
  };

  return (
    <div
      id="name-input-screen"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-auto bg-rice-paper px-6 py-12 text-center select-none animate-fade-in"
    >
      {/* Top-left clean Back button */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-4 left-4 p-2 text-[#AF311B] hover:text-[#C85C4F] rounded-full hover:bg-amber-950/5 transition-colors z-50 cursor-pointer flex items-center justify-center"
        title="返回"
      >
        <ArrowLeft className="w-5 h-5 pointer-events-auto" />
      </button>

      {/* Background radial highlight for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(139,94,60,0.05)_100%)] pointer-events-none" />
      
      {/* Subtle mandala rings in warm golden tones */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#AF311B]/5 rounded-full rotate-45 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-dashed border-[#AF311B]/5 rounded-full pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />

      {/* Exquisite Antiquarian Box Border */}
      <div className="relative w-full max-w-lg bg-[#FDFCFA]/95 border border-[#AF311B]/20 p-8 md:p-12 rounded shadow-[0_15px_40px_rgba(139,94,60,0.15)] z-10 mt-4">
        {/* Fine-line double frames */}
        <div className="absolute inset-2 border border-[#AF311B]/10 rounded pointer-events-none" />
        
        {/* Ancient Dunhuang Corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#AF311B]" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#AF311B]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#AF311B]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#AF311B]" />

        {/* Dynamic header emblem */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Spinning decorative compass */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
              className="absolute inset-0 border border-dashed border-[#AF311B]/25 rounded-full"
            />
            {/* emblem key - perfectly centered Lotus with shared layoutId */}
            <motion.img
              layoutId="shared-lotus"
              src="https://i.postimg.cc/x1hG8NcJ/he-hua.png"
              alt="莲花"
              referrerPolicy="no-referrer"
              className="w-[85%] h-[85%] object-contain mix-blend-multiply z-10 pointer-events-none"
              transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            />
          </div>
        </div>

        {/* Poetry title */}
        <h2 className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-[#AF311B] font-black text-shadow-classical mb-6">
          提笔镌号
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
          {/* Custom Styled Engraving Input Container */}
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              maxLength={20}
              placeholder="请输入你的专属ID昵称或筑梦法号..."
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 bg-[#FCF9F2] text-center border border-[#AF311B]/35 text-[#2C1F15] placeholder-amber-900/40 rounded shadow-inner text-base font-serif font-bold tracking-widest focus:outline-none focus:border-[#AF311B] focus:ring-1 focus:ring-[#AF311B]/40 transition-all duration-300"
            />
            
            {/* Bottom decorative copper slate line */}
            <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-transparent via-[#AF311B] to-transparent" />
          </div>

          {/* Quick random generator */}
          <button
            type="button"
            onClick={handleGenerateRandom}
            className="text-xs text-[#AF311B] hover:text-[#8E2312] font-serif font-black tracking-widest underline underline-offset-4 cursor-pointer focus:outline-none active:scale-95 transition-all"
          >
            ✦ 随机摇落
          </button>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-[#AF311B] font-bold tracking-wider"
              >
                ⚠️ {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons with classical cinnabar accents */}
          <div className="flex w-full justify-center items-center mt-4">
            <button
              type="submit"
              className="px-10 py-2.5 bg-gradient-to-r from-[#AF311B] to-[#C85C4F] text-[#FFFBEB] text-xs font-serif font-black tracking-[0.2em] rounded shadow-[0_4px_12px_rgba(175,49,27,0.15)] hover:from-[#952512] hover:to-[#AF311B] transition-all active:scale-98 cursor-pointer border border-amber-400/10"
            >
              契定本心 →
            </button>
          </div>
        </form>
      </div>

      {/* Decorative side brackets */}
      <div className="absolute bottom-10 left-12 border-l border-[#AF311B]/15 h-16 pointer-events-none" />
      <div className="absolute bottom-10 right-12 border-r border-[#AF311B]/15 h-16 pointer-events-none" />
    </div>
  );
};
