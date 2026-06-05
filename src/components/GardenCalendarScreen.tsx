/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Trash2, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  Award,
  CheckCircle2,
  Sliders,
  RefreshCw,
  ShieldCheck,
  X
} from 'lucide-react';
import { DreamCharacter } from '../types';

interface GardenCalendarScreenProps {
  userName: string;
  chosenDream: DreamCharacter;
  onNext: (stampCount: number) => void;
  onBack: () => void;
  onEnterBlessingIntro?: () => void;
}

// Custom photo loader helper for profession images
const ProfessionImage: React.FC<{ code: string; className?: string; alt?: string; style?: React.CSSProperties }> = ({ code, className = '', alt = '', style }) => {
  const [srcIndex, setSrcIndex] = useState(0);
  
  const sources = [
    `https://i.postimg.cc/${code}/image.png`,
    `https://i.postimg.cc/${code}/image.jpg`,
    `https://i.postimg.cc/${code}/image.jpeg`,
    `https://i.postimg.cc/${code}/preview.png`,
    `https://i.postimg.cc/${code}/preview.jpg`,
    `postimg.cc/${code}`
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
      style={style}
      alt={alt}
      referrerPolicy="no-referrer"
    />
  );
};

// SVG Paper Noise Texture overlay component
const GrainyParchmentTexture: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.22] mix-blend-overlay z-0 select-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <filter id="vermilion-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#vermilion-noise)" fill="transparent" />
    </svg>
  </div>
);

// Define exactly the 5 custom planting/care methods with their respective URLs
interface CareAction {
  id: string;
  name: string;
  img: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  description: string;
}

const CARE_ACTIONS: CareAction[] = [
  {
    id: 'fertilize',
    name: '施肥',
    img: 'https://i.postimg.cc/nzpbkFPX/wei-xin-tu-pian-20260530225046-9239-117.png',
    color: '#854D0E',
    bgColor: '#FEF9C3',
    borderColor: '#FDE047',
    textColor: '#854D0E',
    description: '施大愿善因妙肥，丰盈心脉，加速愿力萌发生长。',
  },
  {
    id: 'pest',
    name: '除虫',
    img: 'https://i.postimg.cc/cCkp0Q12/wei-xin-tu-pian-20260530222657-9177-117.png',
    color: '#166534',
    bgColor: '#F0FDF4',
    borderColor: '#86EFAC',
    textColor: '#166534',
    description: '拂散杂念心魔侵扰，清净法界，护持灵植慧根。',
  },
  {
    id: 'bless',
    name: '赐福',
    img: 'https://i.postimg.cc/kMfY0XL5/wei-xin-tu-pian-20260530230446-9241-117.png',
    color: '#AF311B',
    bgColor: '#FFF7ED',
    borderColor: '#FDBA74',
    textColor: '#AF311B',
    description: '妙结大慈手印，注无畏慈悲愿力，得功德圆满。',
  },
  {
    id: 'prune',
    name: '修剪',
    img: 'https://i.postimg.cc/442qKQZj/wei-xin-tu-pian-20260530225544-9240-117.png',
    color: '#991B1B',
    bgColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    textColor: '#991B1B',
    description: '剪去尘俗繁余挂碍，精纯神识，明心见性无挂碍。',
  },
  {
    id: 'water',
    name: '浇水',
    img: 'https://i.postimg.cc/xCTp8cZy/wei-xin-tu-pian-20260530222003-9176-117.png',
    color: '#1E3A8A',
    bgColor: '#EFF6FF',
    borderColor: '#93C5FD',
    textColor: '#1E40AF',
    description: '灌无量活水清泉，洗尘除垢，滋养勃勃勃生机。',
  }
];

const GESTURE_CONFIGS: Record<string, {
  label: string;
  title: string;
  gestureName: string;
  imgUrl: string;
  desc: string;
}> = {
  fertilize: {
    label: '印记施肥',
    title: '功德金泥 · 纳福施肥契印',
    gestureName: '施肥契印',
    imgUrl: 'https://i.postimg.cc/9F2fBsSf/shi-fei.png',
    desc: '点击“开始契合”，结“施肥契印”，布施愿力完成掌纹契合法度'
  },
  pest: {
    label: '印记除虫',
    title: '净澈法界 · 清净除虫契印',
    gestureName: '除虫契印',
    imgUrl: 'https://i.postimg.cc/xdXjCQkh/chu-chong.png',
    desc: '点击“开始契合”，结“除虫契印”，布施愿力完成掌纹契合法度'
  },
  bless: {
    label: '印记赐福',
    title: '大圣大慈 · 执手契印赐福',
    gestureName: '施无畏印与与愿印',
    imgUrl: 'https://i.postimg.cc/75strqmh/wei-xin-tu-pian-20260530231611-9263-117.png',
    desc: '点击“开始契合”，结“施无畏印”与“与愿印”，布施愿力完成掌纹契合法度'
  },
  prune: {
    label: '印记修剪',
    title: '精纯神识 · 般若修剪契印',
    gestureName: '修剪契印',
    imgUrl: 'https://i.postimg.cc/28TC7yh0/xiu-jian.png',
    desc: '点击“开始契合”，结“修剪契印”，布施愿力完成掌纹契合法度'
  },
  water: {
    label: '印记浇水',
    title: '无量活水 · 甘露浇水契印',
    gestureName: '浇水契印',
    imgUrl: 'https://i.postimg.cc/XqbnQysk/jiao-shui-shou-shi.png',
    desc: '点击“开始契合”，结“浇水契印”，布施愿力完成掌纹契合法度'
  }
};

export const GardenCalendarScreen: React.FC<GardenCalendarScreenProps> = ({
  userName,
  chosenDream,
  onNext,
  onBack,
  onEnterBlessingIntro,
}) => {
  // Base date set to June 6, 2026
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 6)); 
  const [selectedDay, setSelectedDay] = useState<number>(6); // Pre-select today
  const [activeCareId, setActiveCareId] = useState<string>('bless'); // Default chosen action on right bento

  // The calendar holds a persistent record of stamped days
  const [stamps, setStamps] = useState<Record<number, string>>({});
  const [stampFeedback, setStampFeedback] = useState<string | null>(null);

  // States for 20-day achievement target
  const [showAchievementModal, setShowAchievementModal] = useState<boolean>(false);
  const [hasShownAchievement, setHasShownAchievement] = useState<boolean>(false);

  // Ripple effect states triggered on clicking the 5 care indicators
  const [triggeredRipples, setTriggeredRipples] = useState<{ id: number; key: string }[]>([]);

  const triggerRippleEffect = (actionId: string) => {
    const newId = Date.now();
    setTriggeredRipples((prev) => [...prev, { id: newId, key: actionId }]);
    
    // Auto clear ripple record after 2.5s for seamless rendering loop
    setTimeout(() => {
      setTriggeredRipples((prev) => prev.filter((r) => r.id !== newId));
    }, 2500);
  };

  // Helper to render ripples centered on a specific care button
  const renderCareRipple = (actionId: string) => {
    const activeRips = triggeredRipples.filter((r) => r.key === actionId);
    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible flex items-center justify-center">
        <AnimatePresence>
          {activeRips.map((rip) => (
            <div key={rip.id} className="absolute pointer-events-none flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.1, opacity: 0.9 }}
                animate={{ scale: [0.1, 1.4, 2.8], opacity: [0.9, 0.4, 0] }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="absolute w-20 h-20 rounded-full border-3 border-orange-400/80 shadow-[0_0_15px_rgba(249,115,22,0.35)]"
              />
              <motion.div
                initial={{ scale: 0.1, opacity: 0.8 }}
                animate={{ scale: [0.1, 1.4, 2.8], opacity: [0.8, 0.3, 0] }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                className="absolute w-20 h-20 rounded-full border-2 border-orange-500/50"
              />
              <motion.div
                initial={{ scale: 0.1, opacity: 0.7 }}
                animate={{ scale: [0.1, 1.4, 2.8], opacity: [0.7, 0.2, 0] }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.45 }}
                className="absolute w-20 h-20 rounded-full border border border-[#AF311B]/30"
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  // Camera Auth States for Blessing Stamp Action
  const [showGestureAuth, setShowGestureAuth] = useState<boolean>(false);
  const [isAlignmentStarted, setIsAlignmentStarted] = useState<boolean>(false);
  const [cameraState, setCameraState] = useState<'requesting' | 'active' | 'denied' | 'simulated'>('requesting');
  const [detectionState, setDetectionState] = useState<'align' | 'scanning' | 'matched'>('align');
  const [progress, setProgress] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [logs, setLogs] = useState<string>('法镜启，正在侦测双手气脉，请将两只手对准预设位置...');
  const overlayOpacity = 0.85;
  const [leftHandInPosition, setLeftHandInPosition] = useState<boolean>(false);
  const [rightHandInPosition, setRightHandInPosition] = useState<boolean>(false);

  const leftHandRef = React.useRef(false);
  const rightHandRef = React.useRef(false);

  React.useEffect(() => {
    leftHandRef.current = leftHandInPosition;
  }, [leftHandInPosition]);

  React.useEffect(() => {
    rightHandRef.current = rightHandInPosition;
  }, [rightHandInPosition]);

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const bluetoothActiveRef = React.useRef(false);

  const activeGestureConfig = GESTURE_CONFIGS[activeCareId] || GESTURE_CONFIGS['bless'];
  const gestureImgUrl = activeGestureConfig.imgUrl;

  // Automatically reset calibration state when modal opens/closes
  React.useEffect(() => {
    if (!showGestureAuth) {
      setIsAlignmentStarted(false);
    }
  }, [showGestureAuth]);

  // Stable video ref binder callback to prevent React's inline ref null-refresh cycle
  const setVideoRef = React.useCallback((el: HTMLVideoElement | null) => {
    if (el) {
      videoRef.current = el;
      if (stream && el.srcObject !== stream) {
        el.srcObject = stream;
      }
    }
  }, [stream]);

  // Webcam init and analyzer inside calendar screen
  React.useEffect(() => {
    if (!showGestureAuth || !isAlignmentStarted) {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      return;
    }

    setCameraState('requesting');
    setDetectionState('scanning');
    setProgress(0);
    setLeftHandInPosition(false);
    setRightHandInPosition(false);
    setLogs(`✦ 布施愿力 ✦ 请对照对焦框内的指引，模仿“${activeGestureConfig.gestureName}”将双手移至对应框区`);

    let activeStream: MediaStream | null = null;
    
    async function initCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user', 
            width: { ideal: 640 }, 
            height: { ideal: 640 } 
          }
        });
        
        activeStream = mediaStream;
        setStream(mediaStream);
        setCameraState('active');
        setLogs(`✦ 布施愿力 ✦ 请对照对焦框内的指引，模仿“${activeGestureConfig.gestureName}”将双手移至对应框区`);
      } catch (err) {
        console.warn('Webcam access was denied or device is missing. Fallback to simulation:', err);
        setCameraState('simulated');
        setLogs('✦ 境像禅通 ✦ 传统法眼开启异常，已为您开启法空心印模拟分析');
      }
    }

    initCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showGestureAuth, isAlignmentStarted, activeCareId]);

  // Real-time analysis of webcam frames
  React.useEffect(() => {
    if (!showGestureAuth || !isAlignmentStarted || cameraState !== 'active') return;

    let active = true;
    const analysisCanvas = document.createElement('canvas');
    analysisCanvas.width = 120;
    analysisCanvas.height = 120;
    const context = analysisCanvas.getContext('2d');

    const checkFrame = () => {
      if (!active) return;
      if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) {
        // Run checks with slight throttle when stream is not fully ready
        setTimeout(() => {
          if (active) requestAnimationFrame(checkFrame);
        }, 150);
        return;
      }

      if (context) {
        try {
          context.save();
          context.translate(analysisCanvas.width, 0);
          context.scale(-1, 1);
          context.drawImage(videoRef.current, 0, 0, 120, 120);
          context.restore();

          const frameData = context.getImageData(0, 0, 120, 120);
          const pixels = frameData.data;

          let leftSkinSum = 0;
          let leftTotal = 0;
          let rightSkinSum = 0;
          let rightTotal = 0;

          for (let y = 48; y < 102; y++) {
            for (let x = 0; x < 120; x++) {
              const pixelIndex = (y * 120 + x) * 4;
              const r = pixels[pixelIndex];
              const g = pixels[pixelIndex + 1];
              const b = pixels[pixelIndex + 2];

              const passesSkinTest = 
                r > 55 && g > 35 && b > 20 &&
                r > g && r > b &&
                Math.abs(r - g) > 10 &&
                (r - g) > 8;

              if (x >= 18 && x <= 48) {
                leftTotal++;
                if (passesSkinTest) leftSkinSum++;
              } else if (x >= 72 && x <= 102) {
                rightTotal++;
                if (passesSkinTest) rightSkinSum++;
              }
            }
          }

          if (bluetoothActiveRef.current) {
            setLeftHandInPosition(true);
            setRightHandInPosition(true);
          } else {
            const leftSkinRatio = leftSkinSum / leftTotal;
            const rightSkinRatio = rightSkinSum / rightTotal;

            const isLeftReady = leftSkinRatio > 0.12;
            const isRightReady = rightSkinRatio > 0.12;

            // Use functional state updates to strictly enforce bailout and avoid unnecessary renders
            setLeftHandInPosition((prev) => prev !== isLeftReady ? isLeftReady : prev);
            setRightHandInPosition((prev) => prev !== isRightReady ? isRightReady : prev);
          }

        } catch (error) {
          console.warn("webcam pixel analysis bypassed: ", error);
        }
      }

      // Check once every 150ms instead of 60 FPS for performance and zero flickering
      setTimeout(() => {
        if (active) {
          requestAnimationFrame(checkFrame);
        }
      }, 150);
    };

    requestAnimationFrame(checkFrame);

    return () => {
      active = false;
    };
  }, [showGestureAuth, isAlignmentStarted, cameraState]);

  // Simulation loop for simulated mode
  React.useEffect(() => {
    if (!showGestureAuth || !isAlignmentStarted || cameraState !== 'simulated') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const drawSimulation = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#181512';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(time * 0.1);
      ctx.strokeStyle = 'rgba(235, 161, 75, 0.12)';
      ctx.lineWidth = 1;
      for (let ring = 50; ring <= 220; ring += 40) {
        ctx.beginPath();
        ctx.arc(0, 0, ring, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      const handFloat = Math.sin(time * 2.5) * 6;
      ctx.fillStyle = 'rgba(235, 161, 75, 0.04)';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 170 + handFloat, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(drawSimulation);
    };

    setLeftHandInPosition(true);
    setRightHandInPosition(true);
    drawSimulation();

    const simInterval = setInterval(() => {
      setLeftHandInPosition(true);
      setRightHandInPosition(true);
    }, 150);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(simInterval);
    };
  }, [showGestureAuth, isAlignmentStarted, cameraState]);

  // Calibration progress loop - progress is handled inside state callback to avoid tearing down the interval
  React.useEffect(() => {
    if (!showGestureAuth || !isAlignmentStarted || detectionState !== 'scanning') return;

    const scanTicker = setInterval(() => {
      const handsAreReady = activeCareId === 'bless'
        ? (leftHandRef.current && rightHandRef.current)
        : (leftHandRef.current || rightHandRef.current);

      if (handsAreReady) {
        setProgress((prev) => {
          const nextProgress = prev + Math.floor(Math.random() * 8) + 4;
          const cappedProgress = nextProgress >= 100 ? 100 : nextProgress;
          
          if (cappedProgress >= 100) {
            clearInterval(scanTicker);
            setDetectionState('matched');
            setLogs(`✨ 妙音圆满！${activeGestureConfig.label}激活圆满！恭喜注入大吉利愿力印记！`);
            
            setTimeout(() => {
              applyStampImmediate(activeCareId);
              setShowGestureAuth(false);
            }, 1800);
          } else {
            if (cappedProgress > 80) {
              setLogs('🪐 灵光显圣，天池九重门枢正在转动...');
            } else if (cappedProgress > 50) {
              setLogs(`🧬 ${activeGestureConfig.label}二十微节点相互契合，愿力灌注中...`);
            } else {
              setLogs('📜 镜像契印重合中，滤去尘念杂音...');
            }
          }
          return cappedProgress;
        });
      } else {
        if (activeCareId === 'bless') {
          setLogs('⚠️ 双手印契中断：未检测到双手都在对焦框内，请将双手对准金框虚影！');
        } else {
          setLogs('⚠️ 印契中断：未检测到手势在对焦框内，请将手对准金框虚影！');
        }
      }
    }, 220);

    return () => {
      clearInterval(scanTicker);
    };
  }, [showGestureAuth, isAlignmentStarted, detectionState, activeCareId]);

  // Start Calibration Trigger Function
  const startScanningAndEnforceAlignment = () => {
    if (detectionState === 'matched' || detectionState === 'scanning') return;
    setDetectionState('scanning');
    setProgress(5);
    setLogs('🔍 开始手势校准检测，请保持双手置于指引框内并握定姿势...');
  };

  // Toggle Simulated Fallback
  const toggleFallbackMode = () => {
    bluetoothActiveRef.current = true;
    setLeftHandInPosition(true);
    setRightHandInPosition(true);
    setLogs('✦ 蓝牙智联 ✦ 蓝牙手势传感器连接成功！进入姿态心印追踪。');
  };

  // Load stamps on mount linked to the selected dream role
  React.useEffect(() => {
    const logged = localStorage.getItem('user_is_logged_in') === 'true';
    const phoneVal = localStorage.getItem('user_logged_phone') || '';
    const stampsKey = logged && phoneVal ? `${phoneVal}_stamps_${chosenDream.id}` : `stamps_${chosenDream.id}`;
    
    const saved = localStorage.getItem(stampsKey);
    if (saved) {
      try {
        setStamps(JSON.parse(saved));
      } catch {
        setStamps({});
      }
    } else {
      setStamps({});
    }
  }, [chosenDream.id]);

  // Synchronize dynamic dates to active month grid
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); 
  
  const monthNames = [
    '孟春 · 正月', '仲春 · 二月', '季春 · 三月', 
    '孟夏 · 四月', '仲夏 · 五月', '季夏 · 六月', 
    '孟秋 · 七月', '仲秋 · 八月', '季秋 · 九月', 
    '孟冬 · 十月', '仲冬 · 十一月', '季冬 · 腊月'
  ];
  const formattedMonthName = monthNames[month] || `${month + 1}月`;

  // Total days in active month
  const totalDays = new Date(year, month + 1, 0).getDate();
  // Day of week for the first day (0 = Sunday, 1 = Monday...)
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Internal helper to stamp day immediately
  const applyStampImmediate = (actionId: string) => {
    const logged = localStorage.getItem('user_is_logged_in') === 'true';
    const phoneVal = localStorage.getItem('user_logged_phone') || '';
    const stampsKey = logged && phoneVal ? `${phoneVal}_stamps_${chosenDream.id}` : `stamps_${chosenDream.id}`;

    setStamps((prev) => {
      const updated = {
        ...prev,
        [selectedDay]: actionId
      };
      localStorage.setItem(stampsKey, JSON.stringify(updated));
      
      const count = Object.keys(updated).length;
      if (count >= 20 && !hasShownAchievement) {
        setShowAchievementModal(true);
        setHasShownAchievement(true);
      }
      return updated;
    });
    
    // Play warm toast confirmation
    const action = CARE_ACTIONS.find(a => a.id === actionId);
    if (action) {
      setStampFeedback(`已在 ${month + 1}月${selectedDay}日 录入「${action.name}」修行功德印记`);
      // Autoclear feedback
      setTimeout(() => setStampFeedback(null), 3000);
    }
  };

  // Handle stamping a day (Triggers ripple & Checks for conditional blessing auth camera modal)
  const handleApplyStamp = (actionId: string) => {
    // A. Always trigger beautiful pond ripple underneath 5 layout circles
    triggerRippleEffect(actionId);

    // B. Now all actions require webcam hand-gesture simulation
    bluetoothActiveRef.current = false;
    setShowGestureAuth(true);
  };

  // Quick Demo Complete Helper with custom target days
  const handleQuickReachDays = (targetDays: number) => {
    const logged = localStorage.getItem('user_is_logged_in') === 'true';
    const phoneVal = localStorage.getItem('user_logged_phone') || '';
    const stampsKey = logged && phoneVal ? `${phoneVal}_stamps_${chosenDream.id}` : `stamps_${chosenDream.id}`;

    const updated: Record<number, string> = {};
    const actionsPool = ['fertilize', 'pest', 'bless', 'prune', 'water'];
    for (let d = 1; d <= targetDays; d++) {
      updated[d] = actionsPool[(d - 1) % actionsPool.length];
    }
    setStamps(updated);
    localStorage.setItem(stampsKey, JSON.stringify(updated));

    if (targetDays >= 21) {
      if (!hasShownAchievement) {
        setShowAchievementModal(true);
        setHasShownAchievement(true);
      }
      setStampFeedback("修行圆满！已快速录入 21 天养护记录 🏵️");
    } else {
      setStampFeedback(`快速修行！已录入 ${targetDays} 天养护记录 🏵️`);
    }
    setTimeout(() => setStampFeedback(null), 3000);
  };

  // Clear stamp on a day
  const handleRemoveStamp = (dayNum: number) => {
    const logged = localStorage.getItem('user_is_logged_in') === 'true';
    const phoneVal = localStorage.getItem('user_logged_phone') || '';
    const stampsKey = logged && phoneVal ? `${phoneVal}_stamps_${chosenDream.id}` : `stamps_${chosenDream.id}`;

    setStamps((prev) => {
      const copy = { ...prev };
      delete copy[dayNum];
      localStorage.setItem(stampsKey, JSON.stringify(copy));
      return copy;
    });
  };

  // Calendar calculations
  const blanks = Array(firstDayIndex).fill(null);
  const daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
  const calendarCells = [...blanks, ...daysInMonth];

  const checkInDaysCount = Object.keys(stamps).length;

  return (
    <div
      id="garden-calendar-screen"
      className="relative flex h-full w-full flex-col justify-between bg-rice-paper text-[#2C1F15] overflow-y-auto px-4 md:px-8 py-5 select-none"
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(139,94,60,0.06)_100%)] pointer-events-none" />

      {/* TOP LEFT RETURN ICON */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-4 left-4 z-50 p-2.5 text-[#AF311B] hover:text-[#C85C4F] rounded-full hover:bg-amber-950/5 transition-colors cursor-pointer flex items-center justify-center bg-[#FAF4EA]/70 border border-[#AF311B]/15 shadow-sm active:scale-95"
        title="返回"
      >
        <ArrowLeft className="w-5 h-5 flex-shrink-0" />
      </button>

      {/* DUAL COLUMN MAIN LAYOUT */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* =============== LEFT COLUMN BOX: 5 GARDEN CARE ACTIVITIES (lg:col-span-5) =============== */}
        <div 
          id="left-actions-card"
          className="rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden border-3 border-[#AF311B]/20 lg:col-span-5 bg-[#FAF6EE]"
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.85)_0%,rgba(244,233,212,0.3)_100%)] pointer-events-none z-0" />
          <div className="absolute inset-1.5 border border-amber-900/10 rounded-2xl pointer-events-none" />

          {/* Header Panel */}
          <div className="relative z-10 text-left border-b border-amber-900/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-[#AF311B] text-[#FFEFC7] text-[8px] font-serif font-black rounded tracking-widest leading-none">
                灵护
              </span>
              <h3 className="font-serif text-base font-black text-[#5C2718] tracking-widest">
                日常五种种植养护印契
              </h3>
            </div>
            <p className="text-[10px] text-stone-500 font-serif mt-1 leading-relaxed">
              点击下方任一圆圈来施展种植养护，印章将盖印在右侧选定日期（默认为今日）。
            </p>
          </div>

          {/* THE 5 CARE ACTIONS FLOATING CELESTIAL CIRCLES (NO SQUARE CARDS, ONLY ANIMATED ORANGE CIRCLES WITH BLESS GREATER IN THE MIDDLE) */}
          <div className="relative z-10 w-full flex-grow flex items-center justify-center my-4 min-h-[310px] md:min-h-[340px]">
            {/* Background Sacred Geometric Rings */}
            <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-orange-300/30 animate-[spin_120s_linear_infinite]" />
            <div className="absolute w-[160px] h-[160px] rounded-full border border-orange-300/15" />

            {/* Micro constellation pointer lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="12" y1="12" x2="50" y2="50" stroke="#AF311B" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="88" y1="12" x2="50" y2="50" stroke="#AF311B" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="12" y1="88" x2="50" y2="50" stroke="#AF311B" strokeWidth="0.5" strokeDasharray="2" />
              <line x1="88" y1="88" x2="50" y2="50" stroke="#AF311B" strokeWidth="0.5" strokeDasharray="2" />
            </svg>

            {/* Concentric Divine Water Ripples from Click action removed from general background to be placed locally underneath each button */}

            <div className="relative w-full max-w-[280px] md:max-w-[310px] aspect-square">
              
              {/* 1. 施肥 - Top Left */}
              <div className="absolute left-0 top-0 flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {renderCareRipple('fertilize')}
                  <motion.button
                    type="button"
                    onClick={() => {
                      setActiveCareId('fertilize');
                      handleApplyStamp('fertilize');
                    }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.94 }}
                    className={`relative w-20 h-20 rounded-full border-3 flex items-center justify-center overflow-hidden transition-all shadow-md ${
                      activeCareId === 'fertilize' 
                        ? 'border-orange-500 bg-amber-100/90 shadow-[0_0_15px_rgba(249,115,22,0.55)] ring-4 ring-amber-400/30' 
                        : 'border-orange-500/80 hover:border-orange-500 bg-white/70 hover:bg-orange-50/50'
                    }`}
                  >
                    <motion.img
                      src={CARE_ACTIONS[0].img}
                      alt="施肥"
                      referrerPolicy="no-referrer"
                      animate={{ 
                        y: [0, -4, 0],
                        scale: [1, 1.04, 1]
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-[92%] h-[92%] object-contain rounded-full"
                    />
                  </motion.button>
                </div>
                <span className="mt-1.5 px-2 py-0.5 rounded-full bg-orange-100 border border-orange-200/50 text-[10px] font-serif font-black text-stone-700 shadow-3xs">
                  1. 施肥
                </span>
              </div>

              {/* 2. 除虫 - Top Right */}
              <div className="absolute right-0 top-0 flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {renderCareRipple('pest')}
                  <motion.button
                    type="button"
                    onClick={() => {
                      setActiveCareId('pest');
                      handleApplyStamp('pest');
                    }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.94 }}
                    className={`relative w-20 h-20 rounded-full border-3 flex items-center justify-center overflow-hidden transition-all shadow-md ${
                      activeCareId === 'pest' 
                        ? 'border-orange-500 bg-amber-100/90 shadow-[0_0_15px_rgba(249,115,22,0.55)] ring-4 ring-amber-400/30' 
                        : 'border-orange-500/80 hover:border-orange-500 bg-white/70 hover:bg-orange-50/50'
                    }`}
                  >
                    <motion.img
                      src={CARE_ACTIONS[1].img}
                      alt="除虫"
                      referrerPolicy="no-referrer"
                      animate={{ 
                        y: [0, -3, 0],
                        rotate: [0, 2.5, -2.5, 0]
                      }}
                      transition={{
                        duration: 4.0,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-[92%] h-[92%] object-contain rounded-full"
                    />
                  </motion.button>
                </div>
                <span className="mt-1.5 px-2 py-0.5 rounded-full bg-orange-100 border border-orange-200/50 text-[10px] font-serif font-black text-stone-700 shadow-3xs">
                  2. 除虫
                </span>
              </div>

              {/* 3. 赐福 - CENTER STAR SPOTLIGHT (Signature hands with extra glow & larger scale) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-15">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                  {renderCareRipple('bless')}
                  <motion.button
                    type="button"
                    onClick={() => {
                      setActiveCareId('bless');
                      handleApplyStamp('bless');
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 flex items-center justify-center overflow-hidden transition-all shadow-lg p-1 ${
                      activeCareId === 'bless' 
                        ? 'border-[#AF311B] bg-gradient-to-br from-amber-50 to-orange-100/60 shadow-[0_0_22px_rgba(175,49,27,0.55)] ring-5 ring-amber-300/40' 
                        : 'border-orange-600 hover:border-[#AF311B] bg-[#FFEFC7]/60 hover:bg-orange-50'
                    }`}
                  >
                    {/* Subtle radiating solar flares for bless state */}
                    {activeCareId === 'bless' && (
                      <motion.div 
                        animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.4, 0.15] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute inset-0 bg-amber-400 rounded-full blur-xs" 
                      />
                    )}
                    <motion.img
                      src={CARE_ACTIONS[2].img}
                      alt="赐福"
                      referrerPolicy="no-referrer"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        y: [0, -4, 0]
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-[94%] h-[94%] object-contain rounded-full relative z-10"
                    />
                  </motion.button>
                </div>
                <span className="mt-2 px-3 py-1 rounded-full bg-[#AF311B] text-[#FFFEDC] text-[10.5px] font-serif font-black shadow-md border border-amber-300 relative z-20 flex items-center gap-1">
                  3. 赐福 (大吉祥) ✦
                </span>
              </div>

              {/* 4. 修剪 - Bottom Left */}
              <div className="absolute left-0 bottom-0 flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {renderCareRipple('prune')}
                  <motion.button
                    type="button"
                    onClick={() => {
                      setActiveCareId('prune');
                      handleApplyStamp('prune');
                    }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.94 }}
                    className={`relative w-20 h-20 rounded-full border-3 flex items-center justify-center overflow-hidden transition-all shadow-md ${
                      activeCareId === 'prune' 
                        ? 'border-orange-500 bg-amber-100/90 shadow-[0_0_15px_rgba(249,115,22,0.55)] ring-4 ring-amber-400/30' 
                        : 'border-orange-500/80 hover:border-orange-500 bg-white/70 hover:bg-orange-50/50'
                    }`}
                  >
                    <motion.img
                      src={CARE_ACTIONS[3].img}
                      alt="修剪"
                      referrerPolicy="no-referrer"
                      animate={{ 
                        y: [0, -3.5, 0],
                        scale: [1, 1.03, 1]
                      }}
                      transition={{
                        duration: 3.6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-[92%] h-[92%] object-contain rounded-full"
                    />
                  </motion.button>
                </div>
                <span className="mt-1.5 px-2 py-0.5 rounded-full bg-orange-100 border border-orange-200/50 text-[10px] font-serif font-black text-stone-700 shadow-3xs">
                  4. 修剪
                </span>
              </div>

              {/* 5. 浇水 - Bottom Right */}
              <div className="absolute right-0 bottom-0 flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {renderCareRipple('water')}
                  <motion.button
                    type="button"
                    onClick={() => {
                      setActiveCareId('water');
                      handleApplyStamp('water');
                    }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.94 }}
                    className={`relative w-20 h-20 rounded-full border-3 flex items-center justify-center overflow-hidden transition-all shadow-md ${
                      activeCareId === 'water' 
                        ? 'border-orange-500 bg-amber-100/90 shadow-[0_0_15px_rgba(249,115,22,0.55)] ring-4 ring-amber-400/30' 
                        : 'border-orange-500/80 hover:border-orange-500 bg-white/70 hover:bg-orange-50/50'
                    }`}
                  >
                    <motion.img
                      src={CARE_ACTIONS[4].img}
                      alt="浇水"
                      referrerPolicy="no-referrer"
                      animate={{ 
                        y: [0, -5, 0],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-[92%] h-[92%] object-contain rounded-full"
                    />
                  </motion.button>
                </div>
                <span className="mt-1.5 px-2 py-0.5 rounded-full bg-orange-100 border border-orange-200/50 text-[10px] font-serif font-black text-stone-700 shadow-3xs">
                  5. 浇水
                </span>
              </div>

            </div>
          </div>

          {/* Under bento interactive guide log */}
          <div className="relative z-10 bg-[#FAF4EA] border border-amber-900/10 p-3 rounded-xl text-left mt-4 text-[10.5px] leading-relaxed text-[#5C2718]">
            <span className="text-[9px] text-[#A26D3F] font-black block tracking-widest uppercase mb-1 font-serif">
              当前养护行为注解
            </span>
            <span className="font-serif block text-stone-700 font-bold min-h-[32px]">
              「{CARE_ACTIONS.find(a => a.id === activeCareId)?.name}」：
              {CARE_ACTIONS.find(a => a.id === activeCareId)?.description}
            </span>
          </div>

        </div>

        {/* =============== RIGHT COLUMN BOX: INTERACTIVE VERMILION CALENDAR (lg:col-span-7) =============== */}
        <div 
          id="right-calendar-card"
          className="rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden text-white border-3 border-[#AF311B]/25 lg:col-span-7"
          style={{
            backgroundColor: '#FF4E20', // Traditional Vermilion lacquer
            backgroundImage: `radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.22) 0%, transparent 85%), 
              repeating-linear-gradient(45deg, rgba(0,0,0,0.012) 0px, rgba(0,0,0,0.012) 2px, transparent 2px, transparent 12px),
              repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 3px, transparent 3px, transparent 15px)`,
          }}
        >
          {/* Paper and paint texture overlay */}
          <GrainyParchmentTexture />

          {/* Elegant dual internal margins borders */}
          <div className="absolute inset-2 border-2 border-white/10 rounded-2xl pointer-events-none" />
          <div className="absolute inset-3 border border-dashed border-white/5 rounded-2xl pointer-events-none" />

          {/* Dynamic Passport Header Card */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFFDF9] rounded-2xl p-3 text-stone-800 border border-white/10 shadow-md z-10 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-amber-50 rounded-xl border border-amber-900/10 overflow-hidden flex items-center justify-center shrink-0">
                <ProfessionImage
                  code={chosenDream.imgCode || ''}
                  className="max-h-[140%] max-w-[140%] object-contain"
                  alt={chosenDream.name}
                />
              </div>
              <div className="text-left">
                <div className="flex gap-1.5 items-center">
                  <span className="text-[9.5px] bg-[#AF311B] text-white px-1.5 py-0.5 rounded font-serif font-black">
                    修行者
                  </span>
                  <span className="text-xs font-black font-serif text-[#5C2718]">
                    {userName}
                  </span>
                </div>
                <div className="text-[10.5px] text-stone-500 font-serif mt-0.5">
                  修持梦想：<span className="text-[#AF311B] font-extrabold">{chosenDream.name}</span>
                </div>
              </div>
            </div>



            {/* Core signing stats and claim reward buttons */}
            <div className="flex flex-col items-center sm:items-end w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-stone-200 sm:pl-4">
              <div className="flex justify-between sm:justify-start items-center gap-2 w-full sm:w-auto">
                <span className="text-[10px] text-stone-400 font-serif">功德满签进度:</span>
                <span className="text-xs font-mono font-black text-[#AF311B] bg-amber-50 px-1.5 py-0.5 rounded">
                  {checkInDaysCount} / 21 天
                </span>
              </div>
              
              <div className="flex items-center gap-2 mt-1 w-full sm:w-auto justify-between sm:justify-end">
                <div className="w-24 bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full" 
                    style={{ width: `${Math.min(100, (checkInDaysCount / 21) * 100)}%` }} 
                  />
                </div>
                <span className="text-[9.5px] font-mono font-black text-[#AF311B] bg-amber-50/70 px-1.5 py-0.5 rounded min-w-[34px] text-center leading-none">
                  {Math.round(Math.min(100, (checkInDaysCount / 21) * 100))}%
                </span>
              </div>
            </div>
          </div>

          {/* Months Navigation Bar */}
          <div className="flex items-center justify-between border-b border-white/15 pb-2.5 mb-3.5 z-10 relative">
            <button 
              type="button"
              onClick={() => {
                const prev = new Date(year, month - 1, 1);
                setCurrentDate(prev);
                setSelectedDay(1);
              }}
              className="p-1 px-3 bg-[#FFF3EC]/15 hover:bg-[#FFF3EC]/35 text-white active:scale-95 transition-all rounded border border-white/20 font-serif text-[10.5px] font-black tracking-wider flex items-center justify-center gap-0.5 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> 上月印期
            </button>

            <div className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full border border-white/15 shadow-inner">
              <Calendar className="w-3 h-3 text-amber-200" />
              <span className="font-serif text-[11.5px] font-black text-[#FFF8ED] tracking-widest">
                {year} · {formattedMonthName}
              </span>
            </div>

            <button 
              type="button"
              onClick={() => {
                const next = new Date(year, month + 1, 1);
                setCurrentDate(next);
                setSelectedDay(1);
              }}
              className="p-1 px-3 bg-[#FFF3EC]/15 hover:bg-[#FFF3EC]/35 text-white active:scale-95 transition-all rounded border border-white/20 font-serif text-[10.5px] font-black tracking-wider flex items-center justify-center gap-0.5 cursor-pointer"
            >
              下月印期 <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Date Indicator Box */}
          <div className="text-center font-serif text-xs mb-3 text-amber-100 font-semibold tracking-widest z-10 relative">
            当前选中：<b className="text-white text-sm bg-stone-900/40 px-2 py-0.5 rounded border border-white/10 font-mono">{month + 1}月{selectedDay}日</b> （点选下方日期格，并在左侧选择施加印记）
          </div>

          {/* Month Grid */}
          <div className="flex-1 flex flex-col justify-between z-10 relative">
            {/* Week labels */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {['日', '一', '二', '三', '四', '五', '六'].map((lbl, idx) => (
                <span 
                  key={lbl} 
                  className={`font-serif font-black text-xs pb-1.5 border-b border-white/15 ${
                    idx === 0 || idx === 6 ? 'text-amber-200' : 'text-stone-100'
                  }`}
                >
                  {lbl}
                </span>
              ))}
            </div>

            {/* Cells matrices */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 my-1 flex-grow">
              {calendarCells.map((val, cellIdx) => {
                if (val === null) {
                  return <div key={`blank-${cellIdx}`} className="aspect-square opacity-20" />;
                }

                const dayNum = val;
                const isSelected = dayNum === selectedDay;
                const stampId = stamps[dayNum];
                const activeAction = CARE_ACTIONS.find(a => a.id === stampId);
                const isToday = dayNum === 6 && month === 5 && year === 2026; // June 6
                const hasStamp = !!stampId;

                let cellClass = "";
                if (isSelected) {
                  cellClass = "border-amber-400 bg-white text-[#2C1F15] shadow-[0_5px_15px_rgba(0,0,0,0.3)] z-10 scale-[1.04]";
                } else if (hasStamp) {
                  cellClass = "border-white bg-[#FFFDF9] text-stone-800 shadow-sm";
                } else if (isToday) {
                  cellClass = "border-[#FFFEDC] border-dashed bg-white/20 font-bold text-white";
                } else {
                  cellClass = "border-white/10 hover:border-white/30 bg-[#FAF4EA]/5 text-stone-100 hover:bg-white/10";
                }

                const dayLabelColor = isSelected 
                  ? 'text-[#AF311B] font-extrabold' 
                  : hasStamp 
                  ? 'text-[#AF311B] font-bold' 
                  : isToday 
                  ? 'text-amber-200 font-extrabold' 
                  : 'text-white/80';

                return (
                  <motion.div
                    key={`day-${dayNum}`}
                    onClick={() => setSelectedDay(dayNum)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square rounded-xl border cursor-pointer transition-all relative overflow-hidden select-none flex items-center justify-center ${cellClass}`}
                  >
                    {/* Top corner numeric day label - absolutely positioned to prevent overlap issues */}
                    <div className="absolute top-1 left-1.5 z-20">
                      <span className={`text-[10px] font-mono font-bold leading-none ${dayLabelColor}`}>
                        {dayNum}
                      </span>
                    </div>

                    {isToday && !hasStamp && (
                      <span className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse z-20" title="今日" />
                    )}

                    {/* Big Sacred Stamp Artwork filling the frame */}
                    {activeAction ? (
                      <motion.div 
                        initial={{ scale: 0.4, rotate: -15, opacity: 0 }}
                        animate={{ 
                          scale: [1, 1.06, 0.97, 1],
                          y: [0, -3.5, 0],
                          rotate: [0, 3.5, -3.5, 0],
                          opacity: 1
                        }}
                        transition={{
                          scale: {
                            duration: 3.8 + (dayNum % 3) * 0.9,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          y: {
                            duration: 4.2 + (dayNum % 4) * 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          rotate: {
                            duration: 5.0 + (dayNum % 3) * 1.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          opacity: {
                            duration: 0.35,
                            ease: "easeOut"
                          }
                        }}
                        className="absolute inset-1 z-10 flex items-center justify-center pointer-events-none"
                      >
                        <img
                          src={activeAction.img}
                          alt={activeAction.name}
                          referrerPolicy="no-referrer"
                          className="w-[90%] h-[90%] object-contain rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.22)] bg-white p-0.5 border border-amber-300"
                        />
                      </motion.div>
                    ) : (
                      isSelected && (
                        <span className="text-[9px] text-[#AF311B]/60 font-serif font-black tracking-tighter z-10 absolute bottom-1.5">
                          待契合
                        </span>
                      )
                    )}

                    {/* Clear stamp helper */}
                    {activeAction && isSelected && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveStamp(dayNum);
                        }}
                        className="absolute bottom-1 right-1 p-0.5 bg-red-100/90 hover:bg-red-200 text-red-700 rounded transition shadow-md z-25 active:scale-90"
                        title="擦除印记"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Medal claim footer */}
          <div className="pt-2.5 mt-2 border-t border-white/10 flex flex-wrap justify-between items-center gap-2 z-10 relative">
            <span className="text-[9.5px] text-white/70 font-serif">
              满21天修行即得莫高终极勋章
            </span>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => handleQuickReachDays(8)}
                className="text-[9.5px] font-serif text-amber-200/90 hover:text-white font-black hover:underline cursor-pointer bg-white/5 hover:bg-white/10 px-2 py-1 rounded border border-white/10 transition"
              >
                ⚡ 一键达8天
              </button>
              <button
                type="button"
                onClick={() => handleQuickReachDays(21)}
                className="text-[9.5px] font-serif text-amber-200/90 hover:text-white font-black hover:underline cursor-pointer bg-white/5 hover:bg-white/10 px-2 py-1 rounded border border-white/10 transition"
              >
                ⚡ 一键达21天
              </button>

              {checkInDaysCount >= 21 && (
                <button
                  type="button"
                  onClick={() => onNext(checkInDaysCount)}
                  className="py-1 px-3 bg-gradient-to-r from-yellow-400 to-amber-300 text-[#5C2718] font-serif font-black text-[10px] tracking-wider rounded-lg shadow-md hover:scale-103 active:scale-97 transition cursor-pointer"
                >
                  🏅 开启盛典 · 领取勋章 ✦
                </button>
              )}
            </div>
          </div>

          {/* Micro-feedback toast overlay inside the calendar */}
          <AnimatePresence>
            {stampFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#AF311B] text-[#FFFEDC] font-serif text-[10.5px] tracking-wider px-4 py-1.5 rounded-full border border-amber-300/20 shadow-xl z-50 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                <span>{stampFeedback}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* FOOTER TIP SECTION */}
      <div className="relative z-10 w-full max-w-6xl mx-auto border-t border-[#E05A36]/10 pt-4 mt-auto bg-rice-paper/85 backdrop-blur-sm">
        <div className="text-center flex items-center justify-center gap-2 max-w-2xl mx-auto py-1">
          <span className="text-xs">🏵️</span>
          <p className="text-[10px] leading-relaxed text-amber-900/60 font-serif tracking-widest text-center">
            提示：点击右侧日期选择打卡黄页，点击左侧任一图标盖下功德法印。累积满 21 天修行可直取尊荣。
          </p>
        </div>
      </div>

      {/* ACHIEVEMENT SUCCESS MODAL DIALOG */}
      <AnimatePresence>
        {showAchievementModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-[#FAF6EE] text-[#2C1F15] rounded-3xl p-8 max-w-md w-full border-4 border-amber-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden text-center z-50"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500" />
              <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-emerald-200/20 rounded-full blur-2xl pointer-events-none" />

              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-full border-2 border-amber-300 flex items-center justify-center shadow-lg relative">
                <Award className="w-8 h-8 text-amber-600 animate-pulse" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-500 animate-bounce" />
              </div>

              <h2 className="font-serif text-lg sm:text-xl font-black text-[#5C2718] tracking-widest mb-3">
                ✦ 工巧修行 · 功圆德满 ✦
              </h2>
              
              <p className="font-serif text-xs text-stone-700 leading-relaxed mb-6 px-2">
                恭喜您！日常登记已累计完成 <span className="text-[#AF311B] font-extrabold text-base underline mx-0.5">21天</span>，获得专属于您的莫高尊荣勋章，修行大功告成！
              </p>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAchievementModal(false);
                    onNext(checkInDaysCount);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#AF311B] to-[#E05A36] text-white font-serif font-black text-xs tracking-widest rounded-full shadow-[0_4px_16px_rgba(175,49,27,0.3)] hover:scale-102 active:scale-98 transition cursor-pointer"
                >
                  ✨ 立即开启授勋盛典 ✔
                </button>
                <button
                  type="button"
                  onClick={() => setShowAchievementModal(false)}
                  className="w-full py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 font-serif text-[11px] font-black rounded-lg transition"
                >
                  继续保留记录
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BLESSING GESTURE CAM DETECTOR MODAL */}
      <AnimatePresence>
        {showGestureAuth && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#181512]/92 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#FAF6EE] text-[#2C1F15] rounded-3xl p-6 max-w-md w-full border-4 border-[#AF311B]/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col items-center"
            >
              {/* Decorative Traditional Borders */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#AF311B]/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#AF311B]/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#AF311B]/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#AF311B]/40 pointer-events-none" />

              <button
                type="button"
                onClick={() => setShowGestureAuth(false)}
                className="absolute top-3 right-3 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition cursor-pointer z-50"
                title="关闭"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5 mb-1.5 justify-center mt-2">
                <span className="px-1.5 py-0.5 bg-[#AF311B] text-white text-[9.5px] font-serif font-black rounded tracking-widest leading-none">
                  {activeGestureConfig.label}
                </span>
                <h3 className="font-serif text-base font-black text-[#5C2718] tracking-widest text-center">
                  {activeGestureConfig.title}
                </h3>
              </div>

              <div className="font-serif text-center mt-1 mb-2 space-y-0.5">
                <div className="text-[11px] font-bold text-[#AF311B] tracking-wider">
                  筑梦人：{userName}
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#A26D3F] leading-relaxed px-2">
                  {activeGestureConfig.desc}
                </div>
              </div>

              {/* Progress and fit alignment status shown right below the title info */}
              <div className="w-full max-w-[280px] bg-[#FAF4EA] border border-[#AF311B]/15 p-2 rounded-xl text-center space-y-1 mb-3.5">
                <div className="flex justify-between text-[9px] font-mono font-bold text-stone-600 px-1 items-center">
                  <span className="font-serif">十方天轨契合度</span>
                  <span className="text-[#AF311B] text-xs font-black">{progress}%</span>
                </div>
                <div className="relative w-full h-1.5 bg-stone-200/60 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 via-[#AF311B] to-[#C85C4F]"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
              </div>

              {/* Viewport container */}
              <div className={`relative w-full aspect-square rounded-2xl overflow-hidden border-3 border-[#AF311B]/15 shadow-inner flex items-center justify-center p-0.5 mb-4 max-w-[320px] transition-all duration-300 ${
                isAlignmentStarted ? 'bg-stone-950' : 'bg-white'
              }`}>
                
                {!isAlignmentStarted ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 relative h-full w-full">
                    {/* The image with 85% opacity */}
                    <img
                      src={gestureImgUrl}
                      alt="手势参考"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-85 scale-90"
                    />
                    
                    {/* Orange button in the middle: "开始契合" */}
                    <div className="z-10 flex flex-col items-center justify-center gap-1">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsAlignmentStarted(true);
                          startScanningAndEnforceAlignment();
                        }}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-serif text-[11.5px] font-black tracking-widest px-6 py-2.5 rounded-full shadow-[0_4px_14px_rgba(244,114,22,0.35)] border border-orange-400/25 active:scale-95 transition-all text-center shrink-0 cursor-pointer"
                      >
                        开始契合
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Always rendered, smooth opacity transition to prevent flickering */}
                    <video
                      ref={setVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] z-0 transition-opacity duration-300 ${
                        cameraState === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    />

                    <canvas
                      ref={canvasRef}
                      width={320}
                      height={320}
                      style={{ width: '100%', height: '100%' }}
                      className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 ${
                        cameraState === 'simulated' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    />

                    {cameraState === 'requesting' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-200/90 z-10 bg-stone-950/95 space-y-2.5 p-4">
                        <RefreshCw className="w-9 h-9 animate-spin text-[#AF311B]" />
                        <p className="font-serif text-[10px] font-black tracking-widest animate-pulse text-center leading-relaxed">
                          正在接入传统法眼...<br/>
                          请允许浏览器对摄像头的调用授权。
                        </p>
                      </div>
                    )}

                    {(cameraState === 'active' || cameraState === 'simulated') && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300"
                        style={{ opacity: overlayOpacity }}
                      >
                        <img
                          src={gestureImgUrl}
                          alt="手势参考"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain mix-blend-lighten scale-90"
                        />
                      </div>
                    )}

                    {(cameraState === 'active' || cameraState === 'simulated') && (
                      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-3">
                        <div className="absolute inset-3 border border-white/5 rounded-xl pointer-events-none" />

                        {detectionState === 'scanning' && (
                          <motion.div
                            initial={{ y: 15 }}
                            animate={{ y: 280 }}
                            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.2, ease: 'easeInOut' }}
                            className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#AF311B] to-transparent shadow-[0_0_10px_rgba(175,49,27,0.8)] z-10"
                          />
                        )}

                        {activeCareId === 'bless' ? (
                          <>
                            {/* Left Target zone */}
                            <div className="absolute left-[12%] top-[38%] w-[33%] h-[48%] flex flex-col items-center justify-start p-1.5 pointer-events-none">
                              <div className={`text-[8.5px] font-serif px-2 py-0.5 rounded-full shadow-md transition-all duration-300 ${leftHandInPosition ? 'bg-emerald-600 text-white font-black' : 'bg-stone-900/85 text-amber-200/70'}`}>
                                {leftHandInPosition ? '左手：就位 ✔' : '左手：寻找中'}
                              </div>
                            </div>

                            {/* Right Target zone */}
                            <div className="absolute right-[12%] top-[38%] w-[33%] h-[48%] flex flex-col items-center justify-start p-1.5 pointer-events-none">
                              <div className={`text-[8.5px] font-serif px-2 py-0.5 rounded-full shadow-md transition-all duration-300 ${rightHandInPosition ? 'bg-emerald-600 text-white font-black' : 'bg-stone-900/85 text-amber-200/70'}`}>
                                {rightHandInPosition ? '右手：就位 ✔' : '右手：寻找中'}
                              </div>
                            </div>
                          </>
                        ) : (
                          /* "直接就是在图片下方中间有个就位就行" */
                          <div className="absolute inset-x-0 bottom-[8%] flex justify-center pointer-events-none z-30">
                            <div className={`text-[10px] font-serif px-3 py-1 rounded-full shadow-lg transition-all duration-300 border border-white/10 ${
                              (leftHandInPosition || rightHandInPosition)
                                ? 'bg-emerald-600 text-white font-black scale-105'
                                : 'bg-stone-950/85 text-amber-200/75 animate-pulse'
                            }`}>
                              {(leftHandInPosition || rightHandInPosition) ? '契印：已就位 ✔' : '契印：寻找中...'}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="absolute top-2 left-2 bg-[#AF311B]/95 text-[#FFFCEB] text-[8px] font-serif tracking-widest px-2 py-0.5 rounded-full border border-amber-400/20 flex items-center gap-1 z-30">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        activeCareId === 'bless'
                          ? (leftHandInPosition && rightHandInPosition ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse')
                          : (leftHandInPosition || rightHandInPosition ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse')
                      }`} />
                      <span>{cameraState === 'active' ? '莫高精细识别中' : '蓝牙法力传感器就位'}</span>
                    </div>

                    <AnimatePresence>
                      {detectionState === 'matched' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[#AF311B]/95 backdrop-blur-[3px] flex flex-col items-center justify-center p-4 text-[#FFFCEB] z-30"
                        >
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="w-11 h-11 bg-amber-400/20 rounded-full border-2 border-amber-300 flex items-center justify-center mb-2"
                          >
                            <CheckCircle2 className="w-6 h-6 text-amber-300" />
                          </motion.div>
                          
                          <h4 className="font-serif text-xs font-black text-amber-300 tracking-[0.2em] mb-1 animate-bounce">
                            ✦ {activeGestureConfig.gestureName} · 大功告成 ✦
                          </h4>
                          <p className="font-serif text-[9.5px] text-amber-50 max-w-xs leading-relaxed text-center px-2">
                            {activeCareId === 'bless'
                              ? '双手契印已获圆满感知，极乐愿力大吉。即将录入本期打卡记录...'
                              : '种植契印已获圆满感知，养护功德大吉。即将录入本期打卡记录...'}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>

              {/* Logs metrics indicators */}
              <div className="w-full max-w-[320px] bg-stone-100 p-3 rounded-2xl border border-stone-200/40 space-y-3 text-left">
                <div className="bg-[#FAF4EA] border border-[#AF311B]/10 p-2.5 rounded-xl text-[10.5px] leading-relaxed text-[#5C2718] font-serif">
                  <div className="flex gap-1.5 items-start">
                    <div className="flex flex-col gap-0.5 items-center mt-0.5 shrink-0">
                      <span className={`w-1.5 h-1.5 rounded-full ${leftHandInPosition ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                      <span className={`w-1.5 h-1.5 rounded-full ${rightHandInPosition ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                    </div>
                    <span>{logs}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1 text-[8.5px] font-serif text-stone-400">
                <ShieldCheck className="w-3 h-3 text-green-600 shrink-0" />
                <span>法眼隐私：安全沙盒独立分析运算，不存任何个人图像。</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
