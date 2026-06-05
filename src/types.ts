/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AppStep {
  INTRO = 'INTRO',         // Phase 1: Caisson & Mohist Machinery Opening Logo
  ID_INPUT = 'ID_INPUT',   // Phase 2: Input ID/Nickname
  AUTH = 'AUTH',           // Phase 2.5: User Login & Register Auth Screen
  BLESSING_INTRO = 'BLESSING_INTRO', // Intermediary Blessing Intro portal
  GESTURE_ACTIVATION = 'GESTURE_ACTIVATION', // Camera/Mudra Gesture Mimic Activation
  DREAM_SELECT = 'DREAM_SELECT', // Phase 3: Choose Dream & Character Writeup
  ACCELERATION = 'ACCELERATION', // Transition Phase: Cosmic Space Acceleration Channel (3.0x speed)
  CALENDAR = 'CALENDAR',     // Phase 4: Daily Garden check-in stamp calendar
  RITUAL = 'RITUAL',       // Phase 5: Watering Cultivation Ceremony (Sowing, sprouting, blooming)
}

export interface DreamCharacter {
  id: string;
  name: string;        // Classical Devotee Title (e.g. 乐律供养人)
  modernRole: string;  // Modern Equivalent (e.g. 歌手/歌唱家)
  concept: string;     // Poetic concept slogan
  description: string; // Background write-up / Role depiction
  color: string;       // Accent color hex
  svgType: string;     // Reference key for customized SVG drawing
  imgCode?: string;    // Postimg URL 8-character code for the job photo
}

export interface RitualState {
  wateringCount: number;
  stage: number;       // 1: Seed, 2: Sprout, 3: Bud, 4: Half-open, 5: Fully Bloomed
  incenseLit: boolean;
  incenseBurnTime: number; // For smoke animation
}
