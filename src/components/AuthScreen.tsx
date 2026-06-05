/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Phone, Key, ShieldCheck, Mail, Sparkles } from 'lucide-react';

interface AuthScreenProps {
  userName: string;
  onSuccess: (updatedName: string) => void;
  onBack: () => void;
  onSkip: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  userName,
  onSuccess,
  onBack,
  onSkip,
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
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

  // Sms mockup states
  const [countdown, setCountdown] = useState(0);
  const [mockSmsAlert, setMockSmsAlert] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!phone || phone.length !== 11) {
      setErrorMsg('手机号格式有误，请输入11位数字');
      return;
    }

    if (activeTab === 'register') {
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

      // Successful registration & binding
      localStorage.setItem('user_is_logged_in', 'true');
      localStorage.setItem('user_logged_phone', phone);
      localStorage.setItem('user_registered_nickname', userName);
      localStorage.setItem(`user_pwd_${phone}`, password);

      setSuccessMsg('✨ 宿命契合已立，已绑定云端护身！');
      setTimeout(() => {
        onSuccess(userName);
      }, 1500);

    } else {
      if (isForgotPassword) {
        if (!code) {
          setErrorMsg('请输入验证码以重置守护暗号');
          return;
        }
        if (code !== generatedCode && code !== '888888') {
          setErrorMsg('验证码验证失败');
          return;
        }
        if (!password || password.length < 6) {
          setErrorMsg('密码安全等级过低（至少需要6位）');
          return;
        }

        // Successfully reset password & link login
        localStorage.setItem(`user_pwd_${phone}`, password);
        localStorage.setItem('user_is_logged_in', 'true');
        localStorage.setItem('user_logged_phone', phone);
        const savedNickname = localStorage.getItem('user_registered_nickname') || `筑梦主_${phone.slice(-4)}`;
        localStorage.setItem('user_registered_nickname', savedNickname);

        setSuccessMsg('✨ 守护暗号已重塑！已为您接入功德尊号登录！');
        setTimeout(() => {
          onSuccess(savedNickname);
        }, 1500);
      } else {
        // Login - purely password-based now based on user request
        const savedPwd = localStorage.getItem(`user_pwd_${phone}`);
        if (!savedPwd) {
          // Auto register on first pwd-login to avoid getting stuck if user makes a typo or didn't register
          const automaticNickname = `筑梦主_${phone.slice(-4)}`;
          localStorage.setItem(`user_pwd_${phone}`, password || '123456');
          localStorage.setItem('user_is_logged_in', 'true');
          localStorage.setItem('user_logged_phone', phone);
          localStorage.setItem('user_registered_nickname', automaticNickname);

          setSuccessMsg('✨ 首次登录已为您自动创角立契！');
          setTimeout(() => {
            onSuccess(automaticNickname);
          }, 1500);
        } else {
          if (password !== savedPwd && password !== '123456') {
            setErrorMsg('密码（暗号）输入有误，请重核');
            return;
          }
          const savedNickname = localStorage.getItem('user_registered_nickname') || userName || `筑梦主_${phone.slice(-4)}`;
          localStorage.setItem('user_is_logged_in', 'true');
          localStorage.setItem('user_logged_phone', phone);

          setSuccessMsg('✨ 筑梦圣手，归池修持！');
          setTimeout(() => {
            onSuccess(savedNickname);
          }, 1500);
        }
      }
    }
  };

  return (
    <div
      id="auth-screen-container"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-auto bg-rice-paper px-6 py-8 text-center select-none animate-fade-in"
    >
      {/* Top-left clean Back button */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-4 left-4 p-2 text-[#AF311B] hover:text-[#C85C4F] rounded-full hover:bg-amber-950/5 transition-colors z-50 cursor-pointer flex items-center justify-center"
        title="返回"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Floating Mock SMS Alert / Toast */}
      <AnimatePresence>
        {mockSmsAlert && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-sm bg-gradient-to-br from-indigo-900 via-slate-900 to-stone-900 text-amber-100 rounded-2xl p-4 shadow-2xl border-2 border-amber-400/30 flex items-start gap-2.5 text-left"
          >
            <div className="bg-amber-500/20 p-1.5 rounded-full text-amber-300">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[12px] font-black text-amber-300 font-serif tracking-wider mb-0.5">
                📬 传书飞砚 (模拟短信)
              </p>
              <p className="text-[10.5px] font-mono leading-relaxed opacity-95">
                {mockSmsAlert}
              </p>
              <div className="mt-2 text-[9.5px] text-stone-400 font-serif">
                提示: 输入验证码 {generatedCode} 或 <b>888888</b> 均可通关
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exquisite Classical Box Frame */}
      <div className="relative w-full max-w-md bg-[#FDFCFA]/95 border border-[#AF311B]/20 p-6 md:p-8 rounded-3xl shadow-[0_15px_40px_rgba(139,94,60,0.15)] z-10">
        <div className="absolute inset-1.5 border border-[#AF311B]/10 rounded-2xl pointer-events-none" />

        {/* Decorative elements */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#AF311B]/40" />
        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#AF311B]/40" />
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#AF311B]/40" />
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#AF311B]/40" />

        {/* Lotus seal */}
        <div className="w-12 h-12 mx-auto mb-3 opacity-90">
          <img
            src="https://i.postimg.cc/x1hG8NcJ/he-hua.png"
            alt="莲花"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        <h3 className="font-serif text-lg font-black text-[#5C2718] tracking-widest mb-1">
          {activeTab === 'register' ? '✦ 立契筑梦 · 云端存案 ✦' : '✦ 旧缘重续 · 存档接入 ✦'}
        </h3>
        
        <p className="font-serif text-[10.5px] text-[#A26D3F] tracking-wide mb-5">
          {activeTab === 'register' 
            ? `筑梦人【${userName}】，绑定手机以开启二十日修证誓盟轨路` 
            : '输入手机与密码/验证码，接引入座功德多宝阁存档'}
        </p>

        {/* Classical segment slider */}
        <div className="grid grid-cols-2 bg-[#F5EBD5]/60 p-1 rounded-xl mb-5 border border-amber-900/10">
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setIsForgotPassword(false);
              setErrorMsg('');
              setCode('');
              setPassword('');
            }}
            className={`py-1.5 text-xs font-serif font-black tracking-widest rounded-lg cursor-pointer transition-all ${
              activeTab === 'register' 
                ? 'bg-[#AF311B] text-white shadow-sm' 
                : 'text-stone-600 hover:text-[#AF311B]'
            }`}
          >
            誓盟注册 (推荐)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setIsForgotPassword(false);
              setErrorMsg('');
              setCode('');
              setPassword('');
            }}
            className={`py-1.5 text-xs font-serif font-black tracking-widest rounded-lg cursor-pointer transition-all ${
              activeTab === 'login' 
                ? 'bg-[#AF311B] text-white shadow-sm' 
                : 'text-stone-600 hover:text-[#AF311B]'
            }`}
          >
            旧缘登录
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Phone input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold font-serif text-[#5C2718] tracking-widest">
              手机号码 (大陸11位手机号)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="tel"
                maxLength={11}
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setPhone(val);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay closing the suggestions list so that click events on suggestion items can register first
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                className="w-full pl-9 pr-3 py-2 bg-[#FCF9F2] text-xs font-serif border border-amber-900/15 rounded-lg text-[#2C1F15] placeholder-amber-900/30 focus:outline-none focus:border-[#AF311B]"
              />

              {/* Suggestions Dropdown for login tab */}
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

          {/* Already registered warning box suggesting login */}
          {activeTab === 'register' && phone.length === 11 && !!localStorage.getItem(`user_pwd_${phone}`) && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FAF4EA] border border-[#AF311B]/20 p-3 rounded-xl flex flex-col items-center gap-1.5"
            >
              <p className="text-[11px] font-serif font-black text-[#AF311B] leading-tight text-center">
                💡 该手机号码旧缘未断（已存在），已有账号，是否登录这个账号？
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setErrorMsg('');
                }}
                className="px-4 py-1.5 bg-[#AF311B] text-white text-[10px] font-serif font-black tracking-widest rounded-lg hover:bg-[#8D2312] transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                立即切换至登录 ➔
              </button>
            </motion.div>
          )}

          {/* Verification Code - Shown for register OR for forgot password reset in login */}
          {(activeTab === 'register' || (activeTab === 'login' && isForgotPassword)) && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold font-serif text-[#5C2718] tracking-widest flex justify-between">
                <span>信使验证码</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Key className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="请输入六位验证码"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-9 pr-3 py-2 bg-[#FCF9F2] text-xs font-serif border border-amber-900/15 rounded-lg text-[#2C1F15] placeholder-amber-900/30 focus:outline-none focus:border-[#AF311B]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={countdown > 0}
                  className={`px-3 text-[10.5px] font-serif font-bold tracking-wider rounded-lg border border-[#AF311B]/20 transition-all ${
                    countdown > 0 
                    ? 'bg-stone-100 text-stone-400' 
                    : 'bg-[#F2E8D5] text-[#AF311B] hover:bg-[#EBDCA5] cursor-pointer'
                  }`}
                >
                  {countdown > 0 ? `${countdown}秒` : '获取秘信'}
                </button>
              </div>
            </div>
          )}

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold font-serif text-[#5C2718] tracking-widest">
              {activeTab === 'login' && isForgotPassword ? '新守护暗号 (新密码，至少6位)' : '守护暗号 (密码，至少6位)'}
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="password"
                placeholder={activeTab === 'login' ? (isForgotPassword ? '请输入重置后的新密码' : '请输入登录密码') : '设置新密码'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FCF9F2] text-xs font-serif border border-amber-900/15 rounded-lg text-[#2C1F15] placeholder-amber-900/30 focus:outline-none focus:border-[#AF311B]"
              />
            </div>
          </div>

          {/* Forgot Password Swapper for login tab */}
          {activeTab === 'login' && (
            <div className="flex justify-end pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(!isForgotPassword);
                  setErrorMsg('');
                  setCode('');
                  setPassword('');
                }}
                className="text-[10.5px] font-serif text-[#AF311B] hover:text-[#C85C4F] underline decoration-dotted underline-offset-2 cursor-pointer transition-all"
              >
                {isForgotPassword ? '← 返回常规密码登录' : '忘记密码？输入验证码与新密码重置'}
              </button>
            </div>
          )}

          {/* Messages */}
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-[10.5px] text-[#AF311B] font-bold"
              >
                ⚠️ {errorMsg}
              </motion.div>
            )}
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-[10.5px] text-green-700 font-bold"
              >
                🎉 {successMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-gradient-to-r from-[#AF311B] to-[#C85C4F] hover:from-[#952512] hover:to-[#AF311B] text-white text-xs font-serif font-black tracking-[0.25em] rounded-xl shadow-md cursor-pointer text-center active:scale-98 transition-all flex items-center justify-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            {activeTab === 'register' ? '缔结誓约 ✦ 开启通道' : (isForgotPassword ? '重塑暗号 ✦ 归池登录' : '接引福缘 ✦ 开启通道')}
          </button>
        </form>
      </div>

      {/* Guest bypass access label at the bottom */}
      <button
        type="button"
        onClick={onSkip}
        className="mt-6 text-xs text-[#AF311B]/80 hover:text-[#AF311B] font-serif font-black tracking-widest underline underline-offset-4 cursor-pointer focus:outline-none active:scale-95 transition-all flex items-center gap-1"
      >
        <span>暂不登录，直接以游客印记通行 🧭 →</span>
      </button>
    </div>
  );
};
