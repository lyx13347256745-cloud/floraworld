/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings } from 'lucide-react';
import { AppStep, DreamCharacter } from './types';
import { CaissonLogo } from './components/CaissonLogo';
import { NameInputScreen } from './components/NameInputScreen';
import { AuthScreen } from './components/AuthScreen';
import { BlessingIntroScreen } from './components/BlessingIntroScreen';
import { GestureActivationScreen } from './components/GestureActivationScreen';
import { DreamSelectScreen } from './components/DreamSelectScreen';
import { AccelerationScreen } from './components/AccelerationScreen';
import { GardenCalendarScreen } from './components/GardenCalendarScreen';
import { MedalAchievementScreen } from './components/MedalAchievementScreen';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.INTRO);
  const [userName, setUserName] = useState('');
  const [chosenDream, setChosenDream] = useState<DreamCharacter | null>(null);
  const [wateringCount, setWateringCount] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [stampCount, setStampCount] = useState(0);
  const [blessingSourceStep, setBlessingSourceStep] = useState<AppStep | null>(null);
  
  // Settings and Login Modal states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load registered username or standard nickname if any on mount
  useState(() => {
    const saved = localStorage.getItem('user_registered_nickname');
    if (saved) {
      setUserName(saved);
    }
  });

  const handleReset = () => {
    setStep(AppStep.INTRO);
    setUserName('');
    setChosenDream(null);
    setWateringCount(0);
    setShowScroll(false);
    setStampCount(0);
    setBlessingSourceStep(null);
  };

  return (
    <div id="app-root-frame" className="relative flex flex-col h-screen w-screen overflow-hidden bg-rice-paper text-ink font-sans selection:bg-[#AF311B] selection:text-[#FFFCEB]">
      
      {/* Universal Floating Settings Icon (Top Right) on every single page step/view */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          className="p-2.5 bg-[#FAF4EA]/85 hover:bg-[#F5EBD5] text-[#AF311B] hover:text-[#C85C4F] rounded-full border border-[#AF311B]/15 shadow-md active:scale-95 cursor-pointer flex items-center justify-center transition-all duration-200"
          title="系统设置与登录注册存档"
        >
          <Settings className="w-5 h-5 animate-spin-hover" />
        </button>
      </div>

      {/* Main Container Screen Transitions */}
      <main className="flex-1 w-full h-full relative z-10">
        <AnimatePresence>
          {/* STEP 1: Caisson & Mohist Machinery Opening Logo */}
          {step === AppStep.INTRO && (
            <motion.div
              key="intro-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0 w-full h-full bg-rice-paper"
            >
              <CaissonLogo onNext={() => setStep(AppStep.ID_INPUT)} />
            </motion.div>
          )}

          {/* STEP 2: Name Input Screen */}
          {step === AppStep.ID_INPUT && (
            <motion.div
              key="id-input-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0 w-full h-full pt-14 bg-rice-paper"
            >
              <NameInputScreen
                onNext={(name) => {
                  setUserName(name);
                  setStep(AppStep.AUTH);
                }}
                onBack={() => setStep(AppStep.INTRO)}
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
            </motion.div>
          )}

          {/* STEP 2.5: Authentication/Registration Screen */}
          {step === AppStep.AUTH && (
            <motion.div
              key="auth-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full pt-14 bg-rice-paper"
            >
              <AuthScreen
                userName={userName}
                onSuccess={(updatedName) => {
                  setUserName(updatedName);
                  setStep(AppStep.BLESSING_INTRO);
                }}
                onBack={() => setStep(AppStep.ID_INPUT)}
                onSkip={() => setStep(AppStep.BLESSING_INTRO)}
              />
            </motion.div>
          )}

          {/* STEP 2.6: Intermediary Blessing Intro Screen */}
          {step === AppStep.BLESSING_INTRO && (
            <motion.div
              key="blessing-intro-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full pt-14 bg-rice-paper"
            >
              <BlessingIntroScreen
                userName={userName}
                onNext={() => setStep(AppStep.GESTURE_ACTIVATION)}
                onBack={() => {
                  if (blessingSourceStep === AppStep.CALENDAR) {
                    setStep(AppStep.CALENDAR);
                    setBlessingSourceStep(null);
                  } else {
                    const loggedIn = localStorage.getItem('user_is_logged_in') === 'true';
                    setStep(loggedIn ? AppStep.ID_INPUT : AppStep.AUTH);
                  }
                }}
              />
            </motion.div>
          )}

          {/* STEP 2.8: Camera Mudra Gesture Activation Screen */}
          {step === AppStep.GESTURE_ACTIVATION && (
            <motion.div
              key="gesture-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full pt-14 bg-rice-paper"
            >
              <GestureActivationScreen
                userName={userName}
                onSuccess={() => {
                  if (blessingSourceStep === AppStep.CALENDAR) {
                    setStep(AppStep.CALENDAR);
                    setBlessingSourceStep(null);
                  } else {
                    setStep(AppStep.DREAM_SELECT);
                  }
                }}
                onBack={() => {
                  setStep(AppStep.BLESSING_INTRO);
                }}
              />
            </motion.div>
          )}

          {/* STEP 3: Dream/Role Select Screen */}
          {step === AppStep.DREAM_SELECT && (
            <motion.div
              key="dream-select-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full h-full pt-14"
            >
              <DreamSelectScreen
                userName={userName}
                onNext={(character) => {
                  setChosenDream(character);
                  setStep(AppStep.ACCELERATION);
                }}
                onBack={() => {
                  setStep(AppStep.GESTURE_ACTIVATION);
                }}
              />
            </motion.div>
          )}

          {/* TRANSITION STEP: Cosmic Space Acceleration Channel */}
          {step === AppStep.ACCELERATION && (
            <motion.div
              key="acceleration-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full z-50 bg-rice-paper"
            >
              <AccelerationScreen
                userName={userName}
                chosenDream={chosenDream!}
                onComplete={() => {
                  setStep(AppStep.CALENDAR);
                }}
              />
            </motion.div>
          )}

          {/* STEP 4: Daily Garden check-in stamp calendar */}
          {step === AppStep.CALENDAR && (
            <motion.div
              key="calendar-step"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full pt-14"
            >
              <GardenCalendarScreen
                userName={userName}
                chosenDream={chosenDream!}
                onNext={(count) => {
                  setStampCount(count);
                  setStep(AppStep.RITUAL);
                }}
                onBack={() => setStep(AppStep.DREAM_SELECT)}
                onEnterBlessingIntro={() => {
                  setBlessingSourceStep(AppStep.CALENDAR);
                  setStep(AppStep.BLESSING_INTRO);
                }}
              />
            </motion.div>
          )}

          {/* STEP 5: Award Ceremony and Medal Honor Screen */}
          {step === AppStep.RITUAL && (
            <motion.div
              key="ritual-step"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full pt-14"
            >
              <MedalAchievementScreen
                userName={userName}
                chosenDream={chosenDream!}
                stampCount={stampCount}
                onBack={() => setStep(AppStep.DREAM_SELECT)}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Classic decorative red stamp on main page right corner (traditional cinnabar style) */}
      <div className="absolute bottom-4 right-4 z-40 bg-[#AF311B]/5 border border-[#AF311B]/20 py-1 px-2.5 rounded text-[8px] font-mono tracking-[0.2em] text-[#AF311B]/80 font-black pointer-events-none hidden md:block">
        VER.DUNHUANG.LOTUS.MOHIST.1.0
      </div>

      {/* Settings overlay component supporting phone login-signup persistence */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        currentUserName={userName}
        onUpdateUserName={(name) => {
          setUserName(name);
          // Sync to custom name inputs
        }}
      />

    </div>
  );
}
