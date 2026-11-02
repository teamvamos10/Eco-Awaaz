import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Zap, Recycle, ShieldCheck, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import API from '../services/api';

type OperatorType = 'water' | 'electric' | 'waste';
type FlowState = 'hidden' | 'choice' | 'animating' | 'form';

const opsConfig = {
  water: {
    domain: 'HYDRO OPERATIONS',
    name: 'Water Operator',
    glowColor: 'from-blue-600/20',
    glowColorHex: 'rgba(37,99,235,0.15)',
    btnBg: 'bg-blue-600',
    btnText: 'text-white',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    icon: <Droplet className="w-10 h-10" fill="currentColor" />
  },
  electric: {
    domain: 'GRID OPERATIONS',
    name: 'Electric Operator',
    glowColor: 'from-amber-500/20',
    glowColorHex: 'rgba(245,158,11,0.15)',
    btnBg: 'bg-amber-500',
    btnText: 'text-white',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    icon: <Zap className="w-10 h-10" fill="currentColor" />
  },
  waste: {
    domain: 'SANITATION OPS',
    name: 'Waste Operator',
    glowColor: 'from-emerald-500/20',
    glowColorHex: 'rgba(16,185,129,0.15)',
    btnBg: 'bg-emerald-500',
    btnText: 'text-white',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    icon: <Recycle className="w-10 h-10" />
  }
};

interface AuthFlowProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  initialRole?: 'water' | 'electric' | 'waste' | null;
  onLoginSuccess: (userData: { adminName: string; role: string }) => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ isOpen, onClose, initialMode = 'login', initialRole = null, onLoginSuccess }) => {
  const [flowState, setFlowState] = useState<FlowState>('hidden');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedOp, setSelectedOp] = useState<OperatorType | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [adminName, setAdminName] = useState('');
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
      setSelectedOp(initialRole);
      
      if (initialRole) {
        setFlowState('form');
      } else {
        setFlowState('choice');
      }
      
      document.body.style.overflow = 'hidden';
    } else {
      setFlowState('hidden');
      setAdminId('');
      setAdminName('');
      setPassword('');
      setError(null);
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialMode, initialRole]);

  const handleSelect = (op: OperatorType) => {
    setSelectedOp(op);
    setFlowState('animating');

    // Play animation for 2.5 seconds then show form
    setTimeout(() => {
      setFlowState('form');
    }, 2800);
  };

  const handleLogin = async () => {
    if (!adminId || !password) {
      setError('Please enter your Admin ID and password.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // API returns { adminId, adminName, role } directly
      const payload: Record<string, any> = { adminId, password };
      if (selectedOp) {
        payload.role = selectedOp;
      }

      const response = await API.post('/admin/login', payload);
      const { adminName: name, role } = response.data;
      onLoginSuccess({ adminName: name, role });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const commonApiCall = async (role: OperatorType) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.post('/admin/register', {
        adminId,
        adminName,
        password,
        role
      });
      console.log(`${role} registration successful:`, response.data);
      alert(`${opsConfig[role].name} registered successfully! Please log in.`);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWaterRegistration = async () => {
    if (!adminName || !adminId || !password) {
      setError('Please fill in all fields for Water Command.');
      return;
    }
    await commonApiCall('water');
  };

  const handleElectricRegistration = async () => {
    if (!adminName || !adminId || !password) {
      setError('Please fill in all fields for Electric Command.');
      return;
    }
    await commonApiCall('electric');
  };

  const handleWasteRegistration = async () => {
    if (!adminName || !adminId || !password) {
      setError('Please fill in all fields for Waste Command.');
      return;
    }
    await commonApiCall('waste');
  };

  if (!isOpen && flowState === 'hidden') return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-auto">
        {/* Dim overlay */}
        <motion.div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => flowState !== 'animating' ? onClose() : null}
        />

        {/* 1. Choice View */}
        {flowState === 'choice' && (
          <motion.div
            className="relative z-10 w-full max-w-4xl p-6"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex p-1 bg-white/10 backdrop-blur-xl rounded-2xl mb-8 border border-white/10 shadow-2xl">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${authMode === 'login' ? 'bg-white text-slate-900 shadow-xl' : 'text-white/60 hover:text-white'}`}
                >
                  LOGIN
                </button>
                <button
                  onClick={() => setAuthMode('signup')}
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${authMode === 'signup' ? 'bg-white text-slate-900 shadow-xl' : 'text-white/60 hover:text-white'}`}
                >
                  REGISTRATION
                </button>
              </div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">
                {authMode === 'login' ? 'Authorized Personnel Entry' : 'Authorized Personnel Registration'}
              </h2>
              <p className="text-slate-300 font-medium">
                {authMode === 'login' 
                  ? 'Access your municipal dashboard via secure domain tunnel.' 
                  : 'Select your municipal domain to initiate the secure signup protocol.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.keys(opsConfig) as OperatorType[]).map((key) => {
                const config = opsConfig[key];
                return (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(key)}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[32px] cursor-pointer shadow-2xl flex flex-col items-center text-center group transition-colors hover:bg-white/20"
                  >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-white shadow-xl ${config.iconColor}`}>
                      {config.icon}
                    </div>
                    <h3 className="text-white text-xl font-black tracking-tight mb-2">{config.name}</h3>
                    <span className="text-white/60 text-xs font-mono font-bold tracking-widest uppercase">{config.domain}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 2. Animation View */}
        {flowState === 'animating' && selectedOp === 'water' && (
          <div className="relative z-20 flex flex-col items-center justify-center w-full h-full perspective-[1000px]">
            {/* Anime magical summing circle */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-80 h-80 border-[8px] border-blue-400 border-dashed rounded-full mix-blend-screen opacity-50"
              style={{ x: '-50%', y: '-50%', filter: 'drop-shadow(0 0 20px #3b82f6)' }}
              animate={{ rotate: 180, scale: [0.8, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* High Budget Crate Burst */}
            <motion.div
              className="relative z-30"
              initial={{ scale: 0, rotateX: 60 }}
              animate={{ scale: [0, 1.2, 1], rotateX: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            >
              <div className="w-48 h-48 bg-blue-900 border-4 border-blue-300 rounded-[32px] flex items-center justify-center relative overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.8)]">
                <motion.div
                  className="absolute inset-0 bg-blue-400 mix-blend-overlay"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse' }}
                />

                {/* Droplet popping out */}
                <motion.div
                  className="absolute z-10 text-white drop-shadow-[0_0_20px_#fff]"
                  initial={{ y: 0, scale: 0.5 }}
                  animate={{ y: -200, scale: 2 }}
                  transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
                >
                  <Droplet className="w-24 h-24" fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>

            {/* Explosive Anime Splash Rings */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[12px] border-blue-200 blur-sm pointer-events-none"
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: window.innerWidth * 1.5, height: window.innerWidth * 1.5, opacity: 0, borderWidth: 0 }}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-cyan-200 pointer-events-none mix-blend-screen"
              style={{ filter: 'drop-shadow(0 0 30px #22d3ee)' }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: window.innerWidth * 1.2, height: window.innerWidth * 1.2, opacity: 0, borderWidth: 0 }}
              transition={{ delay: 1.1, duration: 1.2, ease: "easeOut" }}
            />
          </div>
        )}

        {flowState === 'animating' && selectedOp === 'electric' && (
          <div className="relative z-20 flex flex-col items-center justify-center w-full h-full overflow-hidden">
            {/* Screen Flash (Anime Impact) */}
            <motion.div
              className="absolute inset-0 bg-white z-0 mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 0.8, 0, 1, 0] }}
              transition={{ duration: 0.5, delay: 0.5, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1] }}
            />

            {/* Multiple Lightning Strikes */}
            <svg className="w-full h-full absolute inset-0 z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {[
                { d: "M50,-10 L40,30 L60,30 L50,110", delay: 0.4, color: "#fef08a" },
                { d: "M10,0 L30,40 L10,60 L40,110", delay: 0.5, color: "#facc15" },
                { d: "M90,0 L70,40 L90,60 L60,110", delay: 0.55, color: "#eab308" },
                { d: "M50,110 L45,60 L65,40 L50,-10", delay: 0.6, color: "#ffffff" },
              ].map((arc, i) => (
                <motion.path
                  key={i}
                  d={arc.d}
                  stroke={arc.color}
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: 0 }}
                  transition={{ duration: 0.3, delay: arc.delay, ease: "easeIn" }}
                  style={{ filter: `drop-shadow(0 0 15px ${arc.color})` }}
                />
              ))}
            </svg>

            {/* Glowing Zap Symbol Impact */}
            <motion.div
              className="z-20 relative bg-yellow-400 rounded-full p-12 shadow-[0_0_150px_#facc15] border-4 border-white"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: [0, 1.5, 1], rotate: 0 }}
              transition={{ type: "spring", delay: 0.7, bounce: 0.6 }}
            >
              <Zap className="w-24 h-24 text-white drop-shadow-md" fill="currentColor" />
            </motion.div>
          </div>
        )}

        {/* Global Waste Background Animation (Vacuum) */}
        {(flowState === 'animating' || flowState === 'form') && selectedOp === 'waste' && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Vacuum Nozzle on the Left */}
            <motion.div
              className="absolute left-0 top-[40%] -translate-y-1/2 w-48 h-64 z-20"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {/* Sucking Portal / Nozzle Silhouette */}
              <div className="w-full h-full bg-slate-800 rounded-r-[100px] border-r-[12px] border-emerald-500/30 relative flex items-center justify-end pr-8">
                {/* Branding */}
                <div className="absolute left-6 top-8 -rotate-90 origin-left">
                  <span className="text-[10px] font-black text-emerald-500/60 tracking-[0.3em] whitespace-nowrap">CROOMA 130KW</span>
                </div>

                <div className="w-24 h-24 rounded-full bg-black shadow-[inset_0_0_40px_rgba(16,185,129,0.5)] flex items-center justify-center">
                  <motion.div
                    className="w-12 h-12 rounded-full border-4 border-emerald-500/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
                {/* Air pressure distortion */}
                <motion.div
                  className="absolute right-[-100px] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[60px]"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Sucking Debris Particles (Dry Leaves & Heavy Dust) */}
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute opacity-100"
                initial={{
                  x: window.innerWidth + 100,
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 2.0 + 1.2, // ~50% larger
                  rotate: Math.random() * 360
                }}
                animate={{
                  x: -50,
                  y: window.innerHeight * 0.4,
                  scale: 0,
                  opacity: 0,
                  rotate: Math.random() * 1440
                }}
                transition={{
                  duration: Math.random() * 1.5 + 0.5,
                  delay: Math.random() * 4,
                  repeat: Infinity,
                  ease: "circIn"
                }}
              >
                {/* Alternating between Large Leaves and Heavy Dust Clumps */}
                {i % 4 === 0 ? (
                  /* Large Dry Leaf */
                  <svg
                    viewBox="0 0 24 24"
                    className="w-12 h-12 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]"
                    fill={['#b45309', '#f59e0b', '#78350f', '#d97706', '#ca8a04'][i % 5]}
                    style={{ filter: 'brightness(1.4) contrast(1.2)' }}
                  >
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C8,6.47 7,6.67 6,7C6.7,7.7 7.5,8.5 8.46,9.45C11.33,12.31 14.3,15.28 16.15,16.15C17.3,16.65 18,15.82 18,15C18,14.28 17.51,13.13 17,12C16.22,10.14 15,8 15,8C15,8 16.39,8 17,8Z" />
                  </svg>
                ) : (
                  /* Heavy Dust Clump / Debris Chunk */
                  <div
                    className="w-3 h-3 md:w-5 md:h-5 bg-slate-600 rounded-sm shadow-lg border border-slate-500/50"
                    style={{
                      borderRadius: i % 2 === 0 ? '40% 60% 70% 30% / 40% 50% 60% 50%' : '50%',
                      transform: `rotate(${Math.random() * 360}deg)`,
                      filter: 'blur(0.5px)'
                    }}
                  />
                )}
              </motion.div>
            ))}

            {/* Central Vortex Core in Form State (Subtle) */}
            {flowState === 'form' && (
              <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-[2px]" />
            )}
          </div>
        )}

        {/* 3. Form View */}
        {flowState === 'form' && selectedOp && (
          <motion.div

            className="w-full max-w-md bg-white rounded-[32px] overflow-hidden relative shadow-2xl border border-slate-100 z-30"
            style={{ boxShadow: `0 20px 80px -10px ${opsConfig[selectedOp].glowColorHex}` }}
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Glow */}
            <div className={`absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b ${opsConfig[selectedOp].glowColor} to-transparent pointer-events-none opacity-50`} />

            <div className="p-10 relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${opsConfig[selectedOp].iconBg} ${opsConfig[selectedOp].iconColor} shadow-lg`}>
                    {opsConfig[selectedOp].icon}
                  </div>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">{opsConfig[selectedOp].name} {authMode === 'login' ? 'Entry' : 'Registration'}</h2>
                <p className="text-xs text-slate-600 font-bold tracking-widest uppercase mb-1">{opsConfig[selectedOp].domain}</p>
              </div>

              <div className="flex items-center gap-2 mb-8 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-slate-400" />
                <p className="text-xs text-slate-600 font-bold">
                  {authMode === 'login' 
                    ? 'Secure authentication tunnel active. Verified municipal IP.' 
                    : 'Secure endpoint. Provide municipal ID for whitelist validation.'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-bold uppercase">
                  {error}
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-6 mb-10">
                {authMode === 'signup' && (
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block mb-2">ADMIN NAME</label>
                    <input
                      type="text"
                      placeholder="Chief Administrator"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors font-bold shadow-sm"
                    />
                  </div>
                )}
                <div>
                  <label className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block mb-2">
                    {authMode === 'login' ? 'ADMIN ID / PIN' : 'ADMIN ID'}
                  </label>
                  <input
                    type="text"
                    placeholder={authMode === 'login' ? 'e.g. MUN-110022' : 'SYS-ADM-1004'}
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors font-bold shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block mb-2">PASSWORD</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3.5 pr-12 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors font-bold shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Signup Button */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setFlowState('choice')}
                  className="px-6 py-4 rounded-xl font-bold text-sm tracking-wide bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  BACK
                </button>
                <button
                  disabled={isLoading}
                  onClick={() => {
                    if (authMode === 'login') {
                      handleLogin();
                    } else {
                      if (selectedOp === 'water') handleWaterRegistration();
                      else if (selectedOp === 'electric') handleElectricRegistration();
                      else if (selectedOp === 'waste') handleWasteRegistration();
                    }
                  }}
                  className={`flex-1 py-4 rounded-xl font-bold text-sm tracking-wide transition-transform hover:-translate-y-1 active:translate-y-0 ${opsConfig[selectedOp].btnBg} ${opsConfig[selectedOp].btnText} shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {authMode === 'login' ? 'AUTHENTICATING...' : 'PROCESSING...'}
                    </>
                  ) : (
                    <>{authMode === 'login' ? 'Access Command Center →' : 'Complete Registration →'}</>
                  )}
                </button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-center">
                <button onClick={() => setFlowState('choice')} className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-widest hover:text-slate-700 transition-colors cursor-pointer">
                  &larr; Switch Operator Role
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default AuthFlow;
