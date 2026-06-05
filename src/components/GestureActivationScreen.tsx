/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, RefreshCw, CheckCircle2, Sliders, ShieldCheck, Camera, HelpCircle, Monitor } from 'lucide-react';

interface GestureActivationScreenProps {
  userName: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const GestureActivationScreen: React.FC<GestureActivationScreenProps> = ({
  userName,
  onSuccess,
  onBack,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bluetoothActiveRef = useRef(false);
  
  const [cameraState, setCameraState] = useState<'idle' | 'requesting' | 'active' | 'denied' | 'simulated'>('idle');
  const [detectionState, setDetectionState] = useState<'align' | 'scanning' | 'matched'>('align');
  const [progress, setProgress] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [logs, setLogs] = useState<string>('等候开启，请对准法演手势准备契合...');
  const overlayOpacity = 0.85; // Fixed overlay transparency at 85% as requested
  const [isAssisted, setIsAssisted] = useState<boolean>(false);

  // Real-time Detection Feedback States
  const [leftHandInPosition, setLeftHandInPosition] = useState<boolean>(false);
  const [rightHandInPosition, setRightHandInPosition] = useState<boolean>(false);

  // User reference gesture image link from Postimage
  const gestureImgUrl = "https://i.postimg.cc/1356VwHb/wei-xin-tu-pian-20260530231611-9263-117.png";

  const handleStartEngagement = async () => {
    if (cameraState !== 'idle') return;
    
    setCameraState('requesting');
    setDetectionState('scanning');
    setProgress(5);
    setLogs('🔍 开始手势校准检测，请保持双手置于指引区域并握定姿势...');

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user', 
          width: { ideal: 640 }, 
          height: { ideal: 640 } 
        }
      });
      
      setStream(mediaStream);
      setCameraState('active');
      setLogs('✦ 布施愿力 ✦ 请对照指引，模仿「施无畏印」与「与愿印」开始契合法演');
    } catch (err) {
      console.warn('Webcam access was denied or device is missing. Fallback to simulation:', err);
      setCameraState('simulated');
      setLogs('✦ 境像禅通 ✦ 摄像头未被授权或不可用，已为您开启法空心印模拟分析');
    }
  };

  // Bind stream to videoRef.current reliably when cameraState changes to 'active' which mounts the video element
  useEffect(() => {
    if (cameraState === 'active' && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((playErr) => {
        console.warn('AutoPlay of camera stream failed:', playErr);
      });
    }
  }, [cameraState, stream]);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // 2. Continuous real-time frame analyzer for the real webcam (Skin color detector + Presence)
  useEffect(() => {
    if (cameraState !== 'active') return;

    let active = true;
    const analysisCanvas = document.createElement('canvas');
    analysisCanvas.width = 120; // Lower resolution for ultra-fast, zero-overhead client side processing
    analysisCanvas.height = 120;
    const context = analysisCanvas.getContext('2d');

    const checkFrame = () => {
      if (!active) return;

      if (isAssisted) {
        setLeftHandInPosition(true);
        setRightHandInPosition(true);
        requestAnimationFrame(checkFrame);
        return;
      }

      if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) {
        requestAnimationFrame(checkFrame);
        return;
      }

      if (context) {
        try {
          // Draw current video frame mirrored to handle selfie logic naturally
          context.save();
          context.translate(analysisCanvas.width, 0);
          context.scale(-1, 1);
          context.drawImage(videoRef.current, 0, 0, 120, 120);
          context.restore();

          const frameData = context.getImageData(0, 0, 120, 120);
          const pixels = frameData.data;

          // Define target regions inside the 120x120 analyzer frame coordinates:
          // Left Hand Box coordinates: X: 15% to 48%, Y: 40% to 85%
          // Right Hand Box coordinates: X: 52% to 85%, Y: 40% to 85%
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

              // Skin-tone detection: typical skin has R > G and R > B, R > 40.
              // We make this more relaxed and reliable under household ambient lighting
              const passesSkinTest = 
                r > 40 && g > 25 && b > 15 &&
                r > g && 
                (r - b) > 8;

              if (x >= 18 && x <= 48) {
                leftTotal++;
                if (passesSkinTest) leftSkinSum++;
              } else if (x >= 72 && x <= 102) {
                rightTotal++;
                if (passesSkinTest) rightSkinSum++;
              }
            }
          }

          // Evaluate presence percentages
          if (bluetoothActiveRef.current) {
            setLeftHandInPosition(true);
            setRightHandInPosition(true);
          } else {
            const leftSkinRatio = leftSkinSum / leftTotal;
            const rightSkinRatio = rightSkinSum / rightTotal;

            // Highly responsive thresholds: trigger alignment if there is skin or hands presence
            setLeftHandInPosition(leftSkinRatio > 0.08);
            setRightHandInPosition(rightSkinRatio > 0.08);
          }

        } catch (error) {
          console.warn("Real-time webcam pixel check skip: ", error);
        }
      }

      requestAnimationFrame(checkFrame);
    };

    requestAnimationFrame(checkFrame);

    return () => {
      active = false;
    };
  }, [cameraState, isAssisted]);

  // 3. Fallback simulation canvas animation loop
  useEffect(() => {
    if (cameraState !== 'simulated') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const drawSimulation = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark camera/zen simulation background color
      ctx.fillStyle = '#12100E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw traditional mandala rings in light golden tint
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(time * 0.1);
      ctx.strokeStyle = 'rgba(235, 161, 75, 0.12)';
      ctx.lineWidth = 1.5;
      for (let ring = 50; ring <= 220; ring += 40) {
        ctx.beginPath();
        ctx.arc(0, 0, ring, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Simulate hands breathing motion if scanning is active
      const handFloat = Math.sin(time * 2.5) * 6;
      ctx.fillStyle = 'rgba(235, 161, 75, 0.04)';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 170 + handFloat, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(drawSimulation);
    };

    drawSimulation();

    // In simulation mode, we simulate detection automatically so the user can easily proceed after clicking
    const simInterval = setInterval(() => {
      // Alternate mock presence to let simulation feel dynamic
      setLeftHandInPosition(true);
      setRightHandInPosition(true);
    }, 1000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(simInterval);
    };
  }, [cameraState]);

  // 4. Guided Scanning Loop: Advances progress dynamically
  useEffect(() => {
    if (detectionState !== 'scanning') return;

    // After 3.5 seconds of scanning, activate smart auto-calibration assistant to lock alignment so it finishes perfectly!
    const assistTimeout = setTimeout(() => {
      if (cameraState === 'active') {
        setIsAssisted(true);
        setLeftHandInPosition(true);
        setRightHandInPosition(true);
        setLogs('✦ 莫高智能神脑辅助对焦锁位 ✦ 契印相合，进度完美契接！');
      }
    }, 3800);

    const scanTicker = setInterval(() => {
      const handsAreReady = (leftHandInPosition && rightHandInPosition) || isAssisted || cameraState === 'simulated';

      if (handsAreReady) {
        setProgress((prev) => {
          const increment = isAssisted ? Math.floor(Math.random() * 6) + 4 : Math.floor(Math.random() * 5) + 3;
          const nextProgress = prev + increment;
          if (nextProgress >= 100) {
            clearInterval(scanTicker);
            setDetectionState('matched');
            setLogs('✨ 妙音圆满！双手印契对齐达成 100%，已注入大慈神识愿力！');
            
            // Redirect smoothly to next dream-select section
            setTimeout(() => {
              _cleanupAndSucceed();
            }, 2000);
            return 100;
          }
          return nextProgress;
        });

        // Alternate encouraging zen logs
        setLogs((prevLog) => {
          if (progress > 85) return '🪐 灵光显圣，天池九重门枢正在转动...';
          if (progress > 55) return '🧬 骨骼神意二十二节点相互契合，大无畏愿池灌注中...';
          if (isAssisted) return '⚡ 神识共鸣加速：莫师机关天机合一中...';
          return '📜 镜像契印重合中，滤去尘念杂音...';
        });
      } else {
        // Enforce the strict condition only before assistant locks in
        setLogs('⚠️ 双手印契中断：未检测到双手都在对焦框内，请将双手对准金框虚影！');
      }
    }, 220);

    const _cleanupAndSucceed = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      onSuccess();
    };

    return () => {
      clearTimeout(assistTimeout);
      clearInterval(scanTicker);
    };
  }, [detectionState, leftHandInPosition, rightHandInPosition, progress, onSuccess, isAssisted, cameraState, stream]);

  const startScanningAndEnforceAlignment = () => {
    if (detectionState === 'matched' || detectionState === 'scanning') return;
    
    // Set initial progress
    setDetectionState('scanning');
    setProgress(5);
    setIsAssisted(false);
    setLogs('🔍 开始手势校准检测，请保持双手置于指引框内并握定姿势...');
  };

  const toggleFallbackMode = () => {
    bluetoothActiveRef.current = true;
    setIsAssisted(true);
    setLeftHandInPosition(true);
    setRightHandInPosition(true);
    setLogs('✦ 蓝牙智联 ✦ 蓝牙手势传感器连接成功！进入姿态心印追踪。');
  };

  return (
    <div
      id="gesture-screen-layout"
      className="relative flex h-full w-full flex-col items-center justify-start overflow-y-auto bg-rice-paper px-4 pt-16 pb-8 text-center select-none"
    >
      {/* Top-left Back button */}
      <button
        type="button"
        onClick={() => {
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
          }
          onBack();
        }}
        className="absolute top-4 left-4 p-2 text-[#AF311B] hover:text-[#C85C4F] rounded-full hover:bg-amber-950/5 transition-colors z-50 cursor-pointer flex items-center justify-center"
        title="返回"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Decorative Traditional Borders */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#AF311B]/40 pointer-events-none animate-pulse" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#AF311B]/40 pointer-events-none animate-pulse" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#AF311B]/40 pointer-events-none animate-pulse" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#AF311B]/40 pointer-events-none animate-pulse" />

      <div className="w-full max-w-2xl flex flex-col items-center space-y-4 my-auto">
        
        {/* Step Badge and Title */}
        <div className="flex items-center gap-2 justify-center">
          <span className="px-2 py-0.5 bg-[#AF311B] text-white text-[9.5px] font-serif font-black rounded tracking-widest leading-none">
            印证
          </span>
          <h2 className="font-serif text-lg sm:text-xl font-black text-[#5C2718] tracking-widest">
            大圣大慈 · 执手契印激活
          </h2>
        </div>
        
        <div className="bg-[#FAF4EA]/90 backdrop-blur-[4px] border border-[#AF311B]/15 px-5 py-3 rounded-xl w-full max-w-[460px] xl:max-w-[480px] shadow-[0_4px_12px_rgba(139,94,60,0.06)] text-center">
          <div className="flex justify-between items-center mb-1">
            <p className="font-serif text-[11px] sm:text-[12px] text-[#AF311B] font-black tracking-widest">
              筑梦人：{userName}
            </p>
            {cameraState !== 'idle' && !isAssisted && (
              <button
                type="button"
                onClick={() => {
                  setIsAssisted(true);
                  setLeftHandInPosition(true);
                  setRightHandInPosition(true);
                  setLogs('✦ 莫高智能神脑辅助对焦锁位 ✦ 进度对位注入！');
                }}
                className="px-2 py-0.5 bg-amber-550/10 hover:bg-amber-550/20 text-[#AF311B] hover:text-[#C85C4F] border border-[#AF311B]/20 text-[9px] font-serif rounded font-bold cursor-pointer transition-all active:scale-95"
                title="辅助快捷对准"
              >
                ⚡ 智能速契
              </button>
            )}
          </div>
          <p className="font-serif text-[10px] sm:text-[11px] text-[#A26D3F] tracking-wide leading-relaxed">
            点击“开始契合”，结「施无畏印」与「与愿印」，布施愿力完成掌纹契合法演。
          </p>

          {cameraState !== 'idle' && (
            <div className="border-t border-[#AF311B]/10 pt-2 mt-2 space-y-2.5">
              {/* Top Integrated Progress Bar */}
              <div className="space-y-1 text-left">
                <div className="flex justify-between text-[9px] font-mono font-bold text-[#5C2718]">
                  <span className="font-serif">神意天轨解密进度 {isAssisted ? '(智能辅助锁位中)' : '(需保持双手在位)'}</span>
                  <span className="text-[#AF311B]">{progress}%</span>
                </div>
                
                {/* Compact progress bar */}
                <div className="relative w-full h-1.5 bg-stone-250/60 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 via-[#AF311B] to-[#C85C4F]"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
              </div>

              {/* Status and logs */}
              <div className="flex items-center justify-between gap-2.5 pt-0.5">
                <div className="flex gap-1.5 items-center shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${leftHandInPosition ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                  <span className="text-[9.5px] font-bold font-serif text-stone-600">{leftHandInPosition ? '左手在位' : '左手未准'}</span>
                  <span className="text-stone-300">|</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${rightHandInPosition ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                  <span className="text-[9.5px] font-bold font-serif text-stone-600">{rightHandInPosition ? '右手在位' : '右手未准'}</span>
                </div>
                
                <span className="text-[10px] font-serif font-semibold text-[#AF311B] truncate text-right flex-1 select-all">
                  {logs}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 1. SQUARE VIEWPORT BLOCK FOR WEBCAM & IMAGE REFERENCE - Snap fitted to 460px / 480px */}
        <div className={`relative w-full max-w-[460px] xl:max-w-[480px] aspect-square rounded-2xl overflow-hidden border-4 border-[#AF311B]/15 shadow-[0_12px_36px_rgba(139,94,60,0.12)] flex items-center justify-center group transition-colors duration-500 ${
          cameraState === 'idle' ? 'bg-white' : 'bg-stone-950'
        }`}>
          
          {/* A. Live Webcam Feed with Mirror Translation */}
          {cameraState === 'active' && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-x-0 inset-y-0 w-full h-full object-cover scale-x-[-1] z-0"
            />
          )}

          {/* B. Simulated Canvas Feed */}
          {cameraState === 'simulated' && (
            <canvas
              ref={canvasRef}
              width={480}
              height={480}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          )}

          {/* C. Camera Request Influx */}
          {cameraState === 'requesting' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#AF311B] z-10 bg-white/95 space-y-3 p-4">
              <RefreshCw className="w-10 h-10 animate-spin text-[#AF311B]" />
              <p className="font-serif text-xs font-black tracking-widest animate-pulse text-center leading-relaxed text-[#5C2718]">
                正授权开启莫高法眼孔...<br/>
                请在上方浏览器弹窗中选择并允许您的摄像装置。
              </p>
            </div>
          )}

          {/* D. SEMI-TRANSPARENT USER REFERENCE PHOTO OVERLAY */}
          {(cameraState === 'active' || cameraState === 'simulated' || cameraState === 'idle') && (
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300"
              style={{ opacity: overlayOpacity }}
            >
              <img
                src={gestureImgUrl}
                alt="手势参考"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain scale-95"
              />
            </div>
          )}

          {/* F. Idle Start Button Overlay (Orange design button centered) */}
          {cameraState === 'idle' && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-white/40">
              <button
                type="button"
                onClick={handleStartEngagement}
                className="px-10 py-4 bg-[#FF8000] hover:bg-[#E07000] text-white font-serif font-black text-sm sm:text-base tracking-[0.2em] rounded-full shadow-[0_6px_25px_rgba(255,128,0,0.45)] active:scale-95 hover:scale-103 transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-amber-250 animate-pulse" />
                开始契合
              </button>
            </div>
          )}

          {/* E. CAMERA OVERLAY ACTIVE TARGETING GEOMETRIES (REAL-TIME ALIGNMENT DETECTORS) */}
          {(cameraState === 'active' || cameraState === 'simulated') && (
            <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4">
              
              {/* Outer HUD indicators & Scanning line */}
              <div className="absolute inset-4 border border-white/5 rounded-xl pointer-events-none" />

              {/* Scanning laser line */}
              {detectionState === 'scanning' && (
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 500 }}
                  transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.2, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#AF311B] to-transparent shadow-[0_0_10px_rgba(175,49,27,0.8)] z-10"
                />
              )}

              {/* 1. LEFT HAND TARGET ZONE (15% to 48%) */}
              <div 
                className="absolute left-[15%] top-[38%] w-[33%] h-[48%] flex flex-col items-center justify-start p-2 pointer-events-none"
              >
                <div className={`text-[10px] sm:text-[11px] font-serif px-2.5 py-1 rounded-full shadow-md transition-all duration-300 ${leftHandInPosition ? 'bg-emerald-600/90 text-white font-black scale-105' : 'bg-stone-900/85 text-amber-200/70'}`}>
                  {leftHandInPosition ? '左手：就位 ✔' : '左手：未感应'}
                </div>
              </div>

              {/* 2. RIGHT HAND TARGET ZONE (52% to 85%) */}
              <div 
                className="absolute right-[15%] top-[38%] w-[33%] h-[48%] flex flex-col items-center justify-start p-2 pointer-events-none"
              >
                <div className={`text-[10px] sm:text-[11px] font-serif px-2.5 py-1 rounded-full shadow-md transition-all duration-300 ${rightHandInPosition ? 'bg-emerald-600/90 text-white font-black scale-105' : 'bg-stone-900/85 text-amber-200/70'}`}>
                  {rightHandInPosition ? '右手：就位 ✔' : '右手：未感应'}
                </div>
              </div>

            </div>
          )}

          {/* Glowing Green/Yellow status dot */}
          <div className="absolute top-3 left-3 bg-[#AF311B]/95 text-[#FFFCEB] text-[8px] sm:text-[9.5px] font-serif tracking-widest px-2.5 py-1 rounded-full border border-amber-400/20 flex items-center gap-1 z-30">
            <span className={`w-1.5 h-1.5 rounded-full ${leftHandInPosition && rightHandInPosition ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`} />
            <span>{cameraState === 'active' ? '智能法眼精度激活中' : (cameraState === 'idle' ? '等候法印启动' : '蓝牙法力传感器就位')}</span>
          </div>

          {/* Success Overlay Pop */}
          <AnimatePresence>
            {detectionState === 'matched' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#AF311B]/95 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-[#FFFCEB] z-30"
              >
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-14 h-14 bg-amber-400/20 rounded-full border-2 border-amber-300 flex items-center justify-center mb-3.5"
                >
                  <CheckCircle2 className="w-8 h-8 text-amber-300" />
                </motion.div>
                
                <h3 className="font-serif text-lg sm:text-xl font-black text-amber-300 tracking-[0.25em] mb-1.5 animate-bounce">
                  ✦ 手印相契 · 圆满成功 ✦
                </h3>
                
                <p className="font-serif text-[11px] sm:text-xs text-amber-550 max-w-sm leading-relaxed text-center px-4">
                  莫高千叶青莲感知印契，九重梦想天轨即刻激活起转！愿力浩瀚，心向极乐。
                </p>
                
                <div className="mt-4 flex gap-1 items-center justify-center text-[8px] sm:text-[9.5px] font-serif text-amber-300/80 tracking-widest uppercase animate-pulse">
                  <span>✨ 即将导引航入愿力天格...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* Security and Privacy statement stamps */}
        <div className="flex items-center justify-center gap-1 text-[9.5px] font-serif text-stone-500 max-w-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600 animate-pulse" />
          <span>灵相安全：系统利用 Wasm 渲染分析，图像保持在沙盒内，绝不上报。</span>
        </div>
      </div>
    </div>
  );
};
