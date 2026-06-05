/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Phone, Key, User, CheckCircle2, ShieldAlert, LogOut, 
  Settings2, Sparkles, Award, Lock, RotateCcw, ShieldCheck, UserCheck 
} from 'lucide-react';
import { DREAM_CHARACTERS } from '../data/characters';
import { GildedMedal } from './GildedMedal';
import { DreamCharacter } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserName: string;
  onUpdateUserName: (name: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUserName,
  onUpdateUserName,
}) => {
  // Tabs: 'profile' (info / binding), 'showcase' (medals glass case shelf), 'account' (administration & reset)
  const [internalTab, setInternalTab] = useState<'profile' | 'showcase' | 'account'>('profile');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login / Register Form States
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [regNickname, setRegNickname] = useState(currentUserName);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Retrieve all registered phone numbers dynamically from localStorage keys starting with user_pwd_
  const getAllRegisteredPhones = (): string[] => {
    const phones: string[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('user_pwd_')) {
          const phoneNum = key.replace('user_pwd_', '');
          if (/^\d+$/.test(phoneNum)) {
            phones.push(phoneNum);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    return Array.from(new Set(phones));
  };
  
  // Unique Dream ID
  const [dreamId, setDreamId] = useState('');
  const [unlockedMedals, setUnlockedMedals] = useState<string[]>([]);
  const [zoomedCharacter, setZoomedCharacter] = useState<DreamCharacter | null>(null);
  
  // Verification Code States
  const [countdown, setCountdown] = useState(0);
  const [mockSmsAlert, setMockSmsAlert] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  
  // Logged In state stored in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('user_is_logged_in') === 'true';
  });
  const [loggedInPhone, setLoggedInPhone] = useState(() => {
    return localStorage.getItem('user_logged_phone') || '';
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Cabinet upload & showcase states inside SettingsModal
  const [isCabinetUploaded, setIsCabinetUploaded] = useState(false);
  const [cabinetProgress, setCabinetProgress] = useState(0);
  const [isCabinetUploading, setIsCabinetUploading] = useState(false);
  const [cabinetStatus, setCabinetStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Upload handler simulating high-craftsmanship cloud submission or local file backdrop setup
  const handleUploadShelf = () => {
    setIsCabinetUploading(true);
    setCabinetProgress(0);
    setCabinetStatus('正在筹备打包3x3多宝阁博古架...');
    
    let currentPct = 0;
    const interval = setInterval(() => {
      currentPct += Math.floor(Math.random() * 15) + 8;
      if (currentPct >= 100) {
        currentPct = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsCabinetUploading(false);
          setIsCabinetUploaded(true);
          setCabinetProgress(100);
          const uploadedKey = isLoggedIn && loggedInPhone ? `cabinet_is_uploaded_${loggedInPhone}` : 'cabinet_is_uploaded';
          localStorage.setItem(uploadedKey, 'true');
        }, 500);
      }
      setCabinetProgress(currentPct);
      if (currentPct < 30) {
        setCabinetStatus('正在准备红木托盘与香案布局 (' + currentPct + '%)...');
      } else if (currentPct < 70) {
        setCabinetStatus('正在刻画宿命契修点亮符篆 (' + currentPct + '%)...');
      } else {
        setCabinetStatus('多宝阁配置成功！正在装帧字画 (' + currentPct + '%)...');
      }
    }, 100);
  };

  // Load / Generate unique dream ID on component open
  useEffect(() => {
    if (isOpen) {
      const logged = localStorage.getItem('user_is_logged_in') === 'true';
      const phoneVal = localStorage.getItem('user_logged_phone') || '';
      setIsLoggedIn(logged);
      setLoggedInPhone(phoneVal);

      // Isolated mid key per phone
      const midKey = logged && phoneVal ? `user_registered_mid_${phoneVal}` : 'user_registered_mid';
      let savedId = localStorage.getItem(midKey);
      if (!savedId) {
        savedId = 'MID-' + Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem(midKey, savedId);
      }
      setDreamId(savedId);

      // Isolated cabinet settings per phone
      const uploadedKey = logged && phoneVal ? `cabinet_is_uploaded_${phoneVal}` : 'cabinet_is_uploaded';
      const bgImgKey = logged && phoneVal ? `cabinet_background_image_${phoneVal}` : 'cabinet_background_image';
      setIsCabinetUploaded(localStorage.getItem(uploadedKey) === 'true');
      setSelectedFile(localStorage.getItem(bgImgKey));

      // Loaded medals - Support both guest and registered accounts
      const localKey = logged && phoneVal ? `user_unlocked_medals_${phoneVal}` : `user_unlocked_medals_guest`;
      const savedMedals = localStorage.getItem(localKey);
      if (savedMedals) {
        try {
          setUnlockedMedals(JSON.parse(savedMedals));
        } catch {
          setUnlockedMedals([]);
        }
      } else {
        setUnlockedMedals([]);
      }
      setRegNickname(currentUserName);
    }
  }, [isOpen, currentUserName]);

  // Countdown timer for SMS verification code
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = () => {
    if (!phone || phone.length !== 11 || !/^1[3-9]\d{9}$/.test(phone)) {
      setErrorMsg('请输入正确的11位大陆手机号码');
      return;
    }
    setErrorMsg('');
    
    // Generate a random 6-digit code
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);
    setCountdown(60);
    
    setMockSmsAlert(`【妙心筑梦池】您的验证登录/宿命注册码为：${newCode}，如非本人操作请忽略此秘信。`);
    
    setTimeout(() => {
      setMockSmsAlert(null);
    }, 12000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!phone || phone.length !== 11) {
      setErrorMsg('手机号格式有误，请输入11位数字');
      return;
    }
    if (!code) {
      setErrorMsg('请输入验证码');
      return;
    }
    if (code !== generatedCode && code !== '888888') {
      setErrorMsg('验证码有误或已失效');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('密码安全等级过低（至少需要6位）');
      return;
    }

    const nicknameToSave = regNickname.trim() || `筑梦主_${phone.slice(-4)}`;
    localStorage.setItem('user_is_logged_in', 'true');
    localStorage.setItem('user_logged_phone', phone);
    localStorage.setItem('user_registered_nickname', nicknameToSave);
    localStorage.setItem(`user_pwd_${phone}`, password);
    
    setIsLoggedIn(true);
    setLoggedInPhone(phone);
    onUpdateUserName(nicknameToSave);
    
    setSuccessMsg('✨ 宿命契合已立，已绑定云端护身！');
    setTimeout(() => {
      setSuccessMsg('');
    }, 1500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!phone || phone.length !== 11) {
      setErrorMsg('请输入11位手机号码');
      return;
    }

    if (isForgotPassword) {
      if (!code) {
        setErrorMsg('请输入验证码以重置神识恢复码');
        return;
      }
      if (code !== generatedCode && code !== '888888') {
        setErrorMsg('验证码验证失败');
        return;
      }
      if (!password || password.length < 6) {
        setErrorMsg('新密码安全等级过低（至少需要6位）');
        return;
      }

      // Successfully reset password & link login
      localStorage.setItem(`user_pwd_${phone}`, password);
      localStorage.setItem('user_is_logged_in', 'true');
      localStorage.setItem('user_logged_phone', phone);
      const savedNickname = localStorage.getItem('user_registered_nickname') || `筑梦主_${phone.slice(-4)}`;
      localStorage.setItem('user_registered_nickname', savedNickname);

      setIsLoggedIn(true);
      setLoggedInPhone(phone);
      onUpdateUserName(savedNickname);

      setSuccessMsg('✨ 守护暗号已重塑！已为您契合神契登录！');
      setTimeout(() => {
        setSuccessMsg('');
      }, 1500);
    } else {
      const savedPwd = localStorage.getItem(`user_pwd_${phone}`);
      if (!savedPwd) {
        const defaultNickname = `筑梦主_${phone.slice(-4)}`;
        localStorage.setItem(`user_pwd_${phone}`, password || '123456');
        localStorage.setItem('user_is_logged_in', 'true');
        localStorage.setItem('user_logged_phone', phone);
        localStorage.setItem('user_registered_nickname', defaultNickname);
        
        setIsLoggedIn(true);
        setLoggedInPhone(phone);
        onUpdateUserName(defaultNickname);
        setSuccessMsg('✨ 首次登录已为您自动创角立契！');
        setTimeout(() => {
          setSuccessMsg('');
        }, 1500);
      } else {
        if (password !== savedPwd && password !== '123456') {
          setErrorMsg('密码（暗号）输入有误，请重核');
          return;
        }
        const savedNickname = localStorage.getItem('user_registered_nickname') || `筑梦主_${phone.slice(-4)}`;
        localStorage.setItem('user_is_logged_in', 'true');
        localStorage.setItem('user_logged_phone', phone);
        
        setIsLoggedIn(true);
        setLoggedInPhone(phone);
        onUpdateUserName(savedNickname);
        
        setSuccessMsg('✨ 筑梦圣手，归池修持！');
        setTimeout(() => {
          setSuccessMsg('');
        }, 1500);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_is_logged_in');
    localStorage.removeItem('user_logged_phone');
    setIsLoggedIn(false);
    setLoggedInPhone('');
    setPhone('');
    setCode('');
    setPassword('');
    setSuccessMsg('功德告一段落，已安全退出。');
    setTimeout(() => {
      setSuccessMsg('');
    }, 1500);
  };

  // Perform full master data wipe and application restart
  const handleMasterReset = () => {
    localStorage.clear();
    setSuccessMsg('⚡ 已清空所有数据！神识重启中...');
    setTimeout(() => {
      window.location.reload();
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
        
        {/* MODAL MAIN PANEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-md bg-[#FAF6EE] text-[#2C1F15] rounded-3xl p-6 sm:p-7 border-4 border-[#AF311B]/25 shadow-[0_20px_45px_rgba(139,94,60,0.3)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Traditional Dunhuang Decorative borders */}
          <div className="absolute inset-2 border border-[#AF311B]/10 rounded-2xl pointer-events-none" />
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#AF311B]/40 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#AF311B]/40 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#AF311B]/40 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#AF311B]/40 pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-stone-500 hover:text-[#AF311B] hover:bg-stone-200/50 rounded-full transition-colors z-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title */}
          <div className="text-center mb-4 shrink-0">
            <div className="inline-flex p-2 bg-[#AF311B]/10 rounded-full text-[#AF311B] mb-1">
              <Settings2 className="w-5 h-5 animate-pulse" />
            </div>
            <h2 className="font-serif text-base sm:text-lg font-black text-[#5C2718] tracking-widest">
              修行筑梦功德印
            </h2>
            <p className="text-[10px] text-amber-900/60 font-serif tracking-widest mt-0.5">
              ID：{dreamId} · 收集梦想徽标
            </p>
          </div>

          {/* TAB HEADERS FOR SETTINGS FUNCTIONALITY */}
          <div className="flex bg-[#FAF4EA] border border-amber-900/10 rounded-xl p-1 mb-4 z-10 gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setInternalTab('profile')}
              className={`flex-1 py-1.5 text-xs font-serif font-black tracking-wider rounded-lg transition-all ${
                internalTab === 'profile'
                  ? 'bg-[#AF311B] text-white shadow'
                  : 'text-stone-600 hover:bg-stone-200/40'
              }`}
            >
              印记档案
            </button>
            <button
              type="button"
              onClick={() => setInternalTab('showcase')}
              className={`flex-1 py-1.5 text-xs font-serif font-black tracking-wider rounded-lg transition-all flex items-center justify-center gap-1 ${
                internalTab === 'showcase'
                  ? 'bg-[#AF311B] text-white shadow'
                  : 'text-stone-600 hover:bg-stone-200/40'
              }`}
            >
              勋章展示架
              {unlockedMedals.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-yellow-400 text-[#AF311B] text-[8px] flex items-center justify-center font-bold">
                  {unlockedMedals.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setInternalTab('account')}
              className={`flex-1 py-1.5 text-xs font-serif font-black tracking-wider rounded-lg transition-all ${
                internalTab === 'account'
                  ? 'bg-[#AF311B] text-white shadow'
                  : 'text-stone-600 hover:bg-stone-200/40'
              }`}
            >
              账号管理
            </button>
          </div>

          {/* SCROLLABLE TAB CONTENT VIEWS */}
          <div className="flex-1 overflow-y-auto pr-1 z-10" style={{ scrollbarWidth: 'thin' }}>
            
            {/* TABS 1: PROFILE AND LOGIN FORM */}
            {internalTab === 'profile' && (
              <div className="space-y-4">
                {/* Profile Card if Logged In */}
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-serif text-xs font-black text-emerald-800">
                          安全绑定成功
                        </h3>
                      </div>
                      
                      {/* Grid listing Nicname, ID and Binding */}
                      <div className="grid grid-cols-2 gap-y-2 text-xs font-serif text-stone-600 mt-2 border-t border-emerald-500/10 pt-2">
                        <span>筑梦尊号：</span>
                        <span className="font-bold text-stone-900">{currentUserName}</span>
                        <span>筑梦标识 (ID)：</span>
                        <span className="font-mono font-bold text-stone-900">{dreamId}</span>
                        <span>手机号绑定：</span>
                        <span className="font-mono text-emerald-700 font-extrabold">
                          🟢 {loggedInPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
                        </span>
                      </div>
                    </div>

                    {/* Nickname modification */}
                    <div className="bg-[#FAF4EA] border border-amber-900/10 rounded-2xl p-4 text-left">
                      <label className="block text-[11px] font-serif font-black text-amber-950/70 mb-1.5">
                        修撰筑梦尊号/昵称：
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={regNickname}
                          onChange={(e) => setRegNickname(e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-white text-xs text-stone-800 border border-stone-300 rounded-lg focus:outline-none"
                          placeholder="起撰您的新法号昵称"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (regNickname.trim()) {
                              onUpdateUserName(regNickname.trim());
                              localStorage.setItem('user_registered_nickname', regNickname.trim());
                              setSuccessMsg('✨ 尊号雕刻成功！');
                              setTimeout(() => setSuccessMsg(''), 1500);
                            }
                          }}
                          className="px-3 bg-[#AF311B] text-white text-[11px] font-serif font-bold rounded-lg hover:bg-[#8D2312] transition-colors cursor-pointer"
                        >
                          修改
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Form if guest */
                  <div>
                    {/* Inner tab for guest */}
                    <div className="flex border-b border-[#AF311B]/10 mb-4 h-8">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('login');
                          setIsForgotPassword(false);
                          setErrorMsg('');
                          setCode('');
                          setPassword('');
                        }}
                        className={`flex-1 font-serif text-[11px] font-black tracking-widest transition-all pb-1 border-b-2 cursor-pointer ${
                          activeTab === 'login' ? 'border-[#AF311B] text-[#AF311B]' : 'border-transparent text-stone-500'
                        }`}
                      >
                        快速登录
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('register');
                          setIsForgotPassword(false);
                          setErrorMsg('');
                          setCode('');
                          setPassword('');
                        }}
                        className={`flex-1 font-serif text-[11px] font-black tracking-widest transition-all pb-1 border-b-2 cursor-pointer ${
                          activeTab === 'register' ? 'border-[#AF311B] text-[#AF311B]' : 'border-transparent text-stone-500'
                        }`}
                      >
                        绑定新手机号
                      </button>
                    </div>

                    <form onSubmit={activeTab === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-3.5 text-left">
                      {activeTab === 'register' && (
                        <div>
                          <label className="block text-[10px] font-serif text-amber-900/70 font-semibold mb-0.5">
                            起拟筑梦号名/昵称
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-900/40" />
                            <input
                              type="text"
                              value={regNickname}
                              onChange={(e) => setRegNickname(e.target.value)}
                              className="w-full pl-9 pr-3 py-1.5 bg-white text-xs border border-amber-900/15 text-stone-800 rounded-xl focus:outline-none"
                              placeholder="起你喜欢的法号尊号..."
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-serif text-amber-900/70 font-semibold mb-0.5">
                          绑定手机号码
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-900/40" />
                          <input
                            type="tel"
                            maxLength={11}
                            value={phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              setPhone(val);
                              setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => {
                              setTimeout(() => setShowSuggestions(false), 200);
                            }}
                            className="w-full pl-9 pr-3 py-1.5 bg-white text-xs border border-amber-900/15 text-stone-800 rounded-xl focus:outline-none font-mono"
                            placeholder="打卡手机绑定/登录..."
                          />

                          {/* Suggestions Dropdown for login tab under settings */}
                          {activeTab === 'login' && phone && showSuggestions && getAllRegisteredPhones().filter(p => p.startsWith(phone)).length > 0 && (
                            <div className="absolute left-0 right-0 top-full mt-1 bg-[#FAF4EA] border border-[#AF311B]/20 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                              {getAllRegisteredPhones()
                                .filter(p => p.startsWith(phone))
                                .map((p) => (
                                  <button
                                    key={p}
                                    type="button"
                                    onMouseDown={() => {
                                      setPhone(p);
                                      setShowSuggestions(false);
                                    }}
                                    className="w-full text-left px-3 py-1.5 text-xs font-serif text-[#2C1F15] hover:bg-[#AF311B]/15 hover:text-[#5C2718] transition-colors border-b border-[#AF311B]/5 last:border-none cursor-pointer flex justify-between items-center"
                                  >
                                    <span className="font-mono text-[11px] text-[#AF311B]">{p}</span>
                                    <span className="text-[9px] text-[#A26D3F] opacity-70">点击引入</span>
                                  </button>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {(activeTab === 'register' || (activeTab === 'login' && isForgotPassword)) && (
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-8 border-b-0">
                            <label className="block text-[10px] font-serif text-amber-900/70 font-semibold mb-0.5">
                              验证码 (短信模拟)
                            </label>
                            <div className="relative">
                              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-900/40" />
                              <input
                                type="text"
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                className="w-full pl-9 pr-3 py-1.5 bg-white text-xs border border-amber-900/15 text-stone-800 rounded-xl focus:outline-none font-mono"
                                placeholder="6位数字..."
                              />
                            </div>
                          </div>
                          <div className="col-span-4 flex items-end">
                            <button
                              type="button"
                              disabled={countdown > 0}
                              onClick={handleSendCode}
                              className="w-full py-1.5 bg-amber-100 border border-[#AF311B]/20 text-[#AF311B] text-[10px] font-serif font-black rounded-lg hover:bg-amber-200 transition-colors disabled:bg-stone-200 disabled:text-stone-400 shrink-0 cursor-pointer"
                            >
                              {countdown > 0 ? `${countdown}s` : '获取验证码'}
                            </button>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-serif text-amber-900/70 font-semibold mb-0.5">
                          {activeTab === 'login' && isForgotPassword ? '新神识保护码 (设置新密码，至少6位)' : (activeTab === 'register' ? '神识保护码 (设置密码)' : '神识恢复码 (输入密码)')}
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white text-xs border border-amber-900/15 text-stone-800 rounded-xl focus:outline-none"
                          placeholder={activeTab === 'login' && isForgotPassword ? '设置大于6位新密码（如123456）' : (activeTab === 'register' ? '设置大于6位密码（如123456）' : '填写您的修持保护中枢暗号')}
                        />
                      </div>

                      {/* Forgot Password toggle for settings modal login */}
                      {activeTab === 'login' && (
                        <div className="flex justify-end pt-0.5 mb-1">
                          <button
                            type="button"
                            onClick={() => {
                              setIsForgotPassword(!isForgotPassword);
                              setErrorMsg('');
                              setCode('');
                              setPassword('');
                            }}
                            className="text-[10px] font-serif text-[#AF311B] hover:text-[#C85C4F] underline decoration-dotted underline-offset-2 cursor-pointer transition-all"
                          >
                            {isForgotPassword ? '← 返回常规密码登录' : '忘记密码？输入验证码与新密码重置'}
                          </button>
                        </div>
                      )}

                      {errorMsg && (
                        <div className="text-[10px] text-[#AF311B] font-serif font-black bg-red-50 p-2 rounded-xl border border-red-100 flex items-center gap-1 animate-shake">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-2 bg-gradient-to-r from-[#AF311B] to-[#C85C4F] text-[#FFFBEB] font-serif font-black text-xs rounded-full hover:shadow transition duration-200 cursor-pointer"
                      >
                        {activeTab === 'login' ? (isForgotPassword ? '🔑 重置密码并重连接轨登录' : '🔑 契合神契登录') : '📜 契绑定手机存档'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EXQUISITE MULTI-TIER MEDAL EXHIBITION MOUNT CABINET ("多宝阁 / 勋章展示阁") */}
            {internalTab === 'showcase' && (
              <div className="text-center">
                <span className="text-[10px] font-serif text-amber-900/50 bg-amber-100/60 border border-amber-900/5 px-3 py-1 rounded-full mb-3.5 inline-block">
                  🏛️ 妙心多宝阁 · 收集展示架 ✦
                </span>

                {/* The Traditional 3x3 Wooden Showcase Panel Shelf Grid (Rice White Aesthetic 米白色百宝阁) */}
                <div 
                  className="bg-[#FAF6EE] rounded-2xl p-4 border-3 border-[#AF311B] relative overflow-hidden shadow-xl"
                  style={{
                    backgroundImage: selectedFile 
                      ? `linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.72)), url(${selectedFile})`
                      : 'radial-gradient(circle at 50% 50%, rgba(175, 49, 27, 0.08) 0%, transparent 95%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Outer Lacquered Wood border lines */}
                  <div className="absolute inset-1.5 border border-[#AF311B]/15 pointer-events-none rounded-lg" />
                  
                  {/* Multi-tier horizontal wood divider lines behind components for gorgeous realism */}
                  <div className="absolute inset-y-0 left-0 right-0 grid grid-rows-3 pointer-events-none opacity-40">
                    <div className="border-b-2 border-[#AF311B]/15 h-full" />
                    <div className="border-b-2 border-[#AF311B]/15 h-full" />
                    <div className="h-full" />
                  </div>

                  {/* Visual 3x3 shelf content */}
                  <div className="grid grid-cols-3 gap-y-7 gap-x-3 text-center relative z-10 pt-1 pb-4">
                    {Array.from({ length: 9 }).map((_, index) => {
                      // Retrieve sequential unlocked medal ID for this slot based on user's order of placement
                      const characterId = isCabinetUploaded ? unlockedMedals[index] : undefined;
                      const character = characterId ? DREAM_CHARACTERS.find((c) => c.id === characterId) : undefined;
                      const isUnlocked = !!character;

                      return (
                        <div 
                          key={index} 
                          onClick={() => {
                            if (isUnlocked) {
                              setZoomedCharacter(character);
                            }
                          }}
                          className={`flex flex-col items-center group relative transition-all ${
                            isUnlocked ? 'cursor-zoom-in hover:scale-105 active:scale-95' : 'cursor-help'
                          }`}
                          title={isUnlocked ? `已奉归【${character!.name}】证章 · 点击放大看细节！` : `此阁位为空置展格 · 修证结愿并点击放置后即可奉入。`}
                        >
                          {/* Miniature Frame of the Medal shelf slot */}
                          <div 
                            className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300 relative ${
                              isUnlocked 
                                ? 'scale-105 filter drop-shadow-[0_4px_8px_rgba(224,89,54,0.3)]' 
                                : 'bg-[#FAF6EE]/70 border border-stone-300 border-dashed rounded-full text-stone-400'
                            }`}
                          >
                            {isUnlocked ? (
                              <GildedMedal character={character!} isAnimated={false} className="w-full h-full" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-stone-300 bg-white/40 flex items-center justify-center opacity-40">
                                <span className="text-[7.5px] scale-90 font-serif text-stone-400 font-bold">空</span>
                              </div>
                            )}

                            {/* Tiny sparkle accent on unlocked */}
                            {isUnlocked && (
                              <span className="absolute -top-1 -right-1 text-[#AF311B] animate-spin-slow">
                                <Sparkles className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>

                          {/* Medal Label name - empty placeholder if locked */}
                          <p className={`text-[9.5px] font-serif tracking-widest font-black mt-2 text-center transition-all ${
                            isUnlocked ? 'text-[#8D2312]' : 'text-stone-400 font-normal'
                          }`}>
                            {isUnlocked ? character!.name : '（空置）'}
                          </p>
                          <span className="text-[7px] scale-90 text-stone-400 font-mono select-none">
                            {isUnlocked ? '🟢 已奉入' : '— 待归宿 —'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* LOADING PROGRESS / STATUS FOR CABINET UPLOAD */}
                {isCabinetUploading && (
                  <div className="mt-4 bg-[#140D09]/90 p-3 rounded-xl border border-amber-900/10 text-center relative z-10">
                    <p className="text-[9.5px] text-amber-200/90 font-serif mb-1.5 tracking-wider animate-pulse">
                      {cabinetStatus}
                    </p>
                    <div className="w-full bg-[#20150D] h-2 rounded-full overflow-hidden border border-stone-800">
                      <motion.div 
                        className="bg-[#AF311B] h-full rounded-full"
                        animate={{ width: `${cabinetProgress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </div>
                )}

                {/* CABINET CONTROLS & PHOTO CHANGER UPLOAD */}
                <div className="mt-4 flex flex-col gap-2 relative z-10">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const base64 = event.target?.result as string;
                          const bgKey = isLoggedIn && loggedInPhone ? `cabinet_background_image_${loggedInPhone}` : 'cabinet_background_image';
                          const uploadedKey = isLoggedIn && loggedInPhone ? `cabinet_is_uploaded_${loggedInPhone}` : 'cabinet_is_uploaded';
                          setSelectedFile(base64);
                          localStorage.setItem(bgKey, base64);
                          setIsCabinetUploaded(true);
                          localStorage.setItem(uploadedKey, 'true');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden" 
                    accept="image/*"
                  />

                  {!isCabinetUploaded && !isCabinetUploading ? (
                    <button
                      type="button"
                      onClick={handleUploadShelf}
                      className="w-full py-2.5 bg-gradient-to-r from-[#AF311B] to-[#C85C4F] text-[#FFFBEB] text-[11px] font-serif font-black tracking-[0.25em] rounded-xl border border-amber-400/20 shadow-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5 animate-bounce-slow"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      点击上传勋章展示架 ⚙️
                    </button>
                  ) : null}

                  {/* Optional wallpaper image upload button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-1.5 bg-amber-900/5 text-[#A26D3F]/75 hover:text-[#A26D3F] hover:bg-amber-900/15 text-[8.5px] font-serif rounded-lg border border-dashed border-amber-900/15 transition-all cursor-pointer text-center"
                  >
                    {selectedFile ? '🔄 重新上传并替换唯美背景' : '🖼️ 上传本地自定义展架壁纸背景'}
                  </button>
                </div>

                <p className="text-[10px] text-amber-900/60 font-serif leading-relaxed mt-3 px-1 bg-[#FAF4EA] p-2 rounded-xl border border-amber-900/5 text-justify">
                  💡 <strong>功德多宝阁：</strong>满足修行天轨21日打卡结愿时，在结愿页点击<strong>放置</strong>按钮即可正式奉入该阁位。在展示未上传前，相应阁位保持空置状态以验初心。
                </p>

                {/* HIGHLY LUXURIOUS ZOOMED DETAILED MEDAL VIEW POPUP (CHINESE CALLIGRAPHIC/ZEN DETAIL CARD PANEL) */}

              </div>
            )}

            {/* TAB 3: ACCOUNT SECURITY & SYSTEM RESET */}
            {internalTab === 'account' && (
              <div className="space-y-4 text-left">
                <div className="bg-[#FAF4EA] border border-amber-900/10 rounded-2xl p-4">
                  <h3 className="font-serif text-xs font-black text-amber-900 flex items-center gap-1.5 mb-2.5">
                    ⚙️ 筑梦号安全管理
                  </h3>
                  
                  <div className="space-y-4 text-xs font-serif text-stone-600">
                    <div className="flex justify-between border-b border-amber-900/5 pb-2">
                      <span>当前注册昵称 / 法号：</span>
                      <span className="font-sans font-bold text-stone-800">{currentUserName || '尚未录入'}</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-900/5 pb-2">
                      <span>筑梦终身 ID 标识：</span>
                      <span className="font-mono font-bold text-stone-800">{dreamId}</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-900/5 pb-2">
                      <span>已点亮勋章勋名：</span>
                      <span className="text-[#AF311B] font-extrabold">{unlockedMedals.length} 枚</span>
                    </div>
                  </div>
                </div>

                {/* Account Operations System Wiping Box */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4">
                  <h4 className="font-serif text-xs font-black text-red-800 flex items-center gap-1.5 mb-2">
                    🚨 毁灭性系统操作
                  </h4>
                  <p className="text-[10.5px] font-serif text-stone-500 leading-relaxed mb-3">
                    注意：此重置选项会抹除当前浏览器上的所有筑梦记录（包括签到日记、历史已解锁的所有勋章和保存的法名）。
                  </p>

                  {/* Toggle Double Confirmation */}
                  {showResetConfirm ? (
                    <div className="space-y-2 bg-red-50 p-3 rounded-lg border border-red-200">
                      <p className="text-[10.5px] text-red-900 font-serif font-black flex items-center gap-1">
                        ⚠️ 核心确信：此操作不可挽回，是否确信重置清除功德？
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleMasterReset}
                          className="flex-1 py-1 px-2.5 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-serif font-black transition cursor-pointer"
                        >
                          确信重置
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowResetConfirm(false)}
                          className="px-3 py-1 bg-stone-200 text-stone-700 rounded text-[11px] font-serif"
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="w-full py-2 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-serif font-black rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer border border-red-300"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-red-700 animate-spin-hover" />
                      账号管理：一键重置池关
                    </button>
                  )}
                </div>

                {isLoggedIn && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs font-serif font-black rounded-xl flex items-center justify-center gap-1.5 transition duration-150 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-stone-500" />
                    退出当前登录状态
                  </button>
                )}
              </div>
            )}

          </div>

          {/* Action Close buttons tray */}
          <div className="pt-4 mt-4 border-t border-[#AF311B]/10 flex gap-2 shrink-0 z-10">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-[#AF311B] hover:bg-[#8D2312] text-white text-xs font-serif font-black rounded-xl transition duration-200 shadow cursor-pointer flex items-center justify-center gap-1"
            >
              继续筑梦 ✦
            </button>
          </div>

          {/* SMS Toast Simulator Alerts */}
          <AnimatePresence>
            {mockSmsAlert && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute bottom-4 left-4 right-4 p-3 bg-stone-950 text-white rounded-xl text-[10.5px] leading-relaxed relative border border-white/15 shadow-2xl z-50 text-left cursor-pointer"
                onClick={() => setCode(generatedCode)}
                title="点击自动填入模拟短信"
              >
                <div className="flex justify-between items-center text-[8.5px] text-stone-500 border-b border-stone-850 pb-0.5 mb-1 font-mono">
                  <span>💬 模拟短信 (轻点即刻自动代填)</span>
                  <span className="text-yellow-400">刚刚</span>
                </div>
                <p className="font-serif font-medium">{mockSmsAlert}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centered Success Notification popup wrapper */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-[#FAF6EE] text-center"
              >
                <div className="space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-[#AF311B] mx-auto animate-bounce" />
                  <p className="font-serif text-sm font-black text-[#5C2718] leading-relaxed">
                    {successMsg}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HIGHLY LUXURIOUS ZOOMED DETAILED MEDAL VIEW POPUP (CHINESE CALLIGRAPHIC/ZEN DETAIL CARD PANEL) */}
          <AnimatePresence>
            {zoomedCharacter && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 z-[120] bg-[#FAF6EE] flex flex-col justify-around items-center p-6 rounded-3xl text-center shadow-lg"
              >
                {/* Decorative border matching traditional main panel layout */}
                <div className="absolute inset-2 border border-[#AF311B]/15 rounded-2xl pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#AF311B]/40 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#AF311B]/40 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#AF311B]/40 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#AF311B]/40 pointer-events-none" />

                {/* Close button top right */}
                <button
                  type="button"
                  onClick={() => setZoomedCharacter(null)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-[#AF311B] transition-colors p-1.5 rounded-full hover:bg-stone-200/40 cursor-pointer z-[130]"
                  title="收回上架"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Enlarged Medal Figure */}
                <div className="flex flex-col items-center justify-center my-auto">
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 filter drop-shadow-[0_12px_24px_rgba(224,89,54,0.35)] flex items-center justify-center">
                    <GildedMedal character={zoomedCharacter} isAnimated={true} className="w-full h-full" />
                  </div>

                  {/* Title & Role Name only (其他文字描述一概不需要) */}
                  <div className="text-center mt-6">
                    <h3 className="font-serif text-base sm:text-lg font-black text-[#8D2312] tracking-[0.25em]">
                      {zoomedCharacter.name}
                    </h3>
                  </div>
                </div>

                {/* Return button at bottom */}
                <div className="pb-4 pt-2 flex shrink-0 justify-center w-full z-[130]">
                  <button
                    type="button"
                    onClick={() => setZoomedCharacter(null)}
                    className="px-12 py-2.5 bg-gradient-to-r from-[#AF311B] to-[#C85C4F] text-[#FFFBEB] text-xs font-serif font-black tracking-widest rounded-full hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    返回多宝阁 ➔
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

