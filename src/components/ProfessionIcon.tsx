/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Stethoscope,
  HeartPulse,
  Activity,
  PawPrint,
  Pill,
  Apple,
  Brain,
  BookOpen,
  FlaskConical,
  Telescope,
  Dna,
  Atom,
  Compass,
  Globe,
  Palette,
  Music,
  Sparkles,
  Smile,
  Mic,
  Camera,
  Layers,
  Ruler,
  PenTool,
  Gamepad2,
  Scale,
  Gavel,
  Shield,
  Flame,
  TrendingUp,
  Landmark,
  Calculator,
  Cpu,
  Code,
  Rocket,
  Wrench,
  Trophy,
  Wand2,
  ChefHat,
  Scissors,
  Flower2,
  Package,
  Map,
  Car,
  Anchor,
  Plane,
  Heart,
  Sprout,
  Trees,
  Megaphone,
  FileText,
  Video
} from 'lucide-react';

interface ProfessionIconProps {
  charId: string;
  color: string;
  size?: number;
  className?: string;
}

export const ProfessionIcon: React.FC<ProfessionIconProps> = ({
  charId,
  color,
  size = 40,
  className = '',
}) => {
  // Get icon component based on charId
  const getIcon = () => {
    switch (charId) {
      // 1. 医疗与健康
      case 'doctor': return Stethoscope;
      case 'nurse': return HeartPulse;
      case 'dentist': return Activity;
      case 'vet': return PawPrint;
      case 'pharmacist': return Pill;
      case 'nutritionist': return Apple;
      case 'counselor': return Brain;
      // 2. 教育与科研
      case 'teacher': return BookOpen;
      case 'scientist': return FlaskConical;
      case 'astronomer': return Telescope;
      case 'biologist': return Dna;
      case 'chemist': return Atom;
      case 'explorer': return Compass;
      case 'archaeologist': return Compass;
      case 'geographer': return Globe;
      // 3. 艺术与娱乐
      case 'painter': return Palette;
      case 'musician': return Music;
      case 'dancer': return Sparkles;
      case 'actor': return Smile;
      case 'singer': return Mic;
      case 'photographer': return Camera;
      case 'designer': return Layers;
      case 'architect': return Ruler;
      case 'writer': return PenTool;
      case 'esports': return Gamepad2;
      // 4. 商业与法律
      case 'lawyer': return Scale;
      case 'judge': return Gavel;
      case 'police': return Shield;
      case 'firefighter': return Flame;
      case 'entrepreneur': return TrendingUp;
      case 'banker': return Landmark;
      case 'accountant': return Calculator;
      // 5. 技术与工程
      case 'engineer': return Cpu;
      case 'programmer': return Code;
      case 'astronaut': return Rocket;
      case 'mechanic': return Wrench;
      case 'athlete': return Trophy;
      case 'magician': return Wand2;
      // 6. 生活服务
      case 'chef': return ChefHat;
      case 'baker': return Flame;
      case 'hairdresser': return Scissors;
      case 'florist': return Flower2;
      case 'courier': return Package;
      case 'guide': return Map;
      // 7. 交通与物流
      case 'driver': return Car;
      case 'captain': return Anchor;
      case 'pilot_job': return Plane;
      case 'steward': return Heart;
      // 8. 农业与自然
      case 'farmer_job': return Sprout;
      case 'gardener': return Sprout;
      case 'zookeeper': return PawPrint;
      case 'ranger': return Trees;
      // 9. 媒体与传播
      case 'reporter': return Megaphone;
      case 'editor': return FileText;
      case 'streamer': return Video;
      default: return Sparkles;
    }
  };

  const IconComponent = getIcon();

  return (
    <div 
      className={`flex items-center justify-center rounded-full border border-dashed transition-all duration-300 ${className}`}
      style={{ 
        borderColor: `${color}40`,
        backgroundColor: `${color}08`,
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      <IconComponent 
        style={{ color: color }} 
        size={size * 0.55} 
        strokeWidth={1.8}
      />
    </div>
  );
};
