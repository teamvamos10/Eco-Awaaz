import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Zap, Recycle, Lock, X, Loader2 } from 'lucide-react';
import Card from './Card';
import Dashboard from './Dashboard';
import API from '../services/api';

type OpsCard = {
  role: 'water' | 'electric' | 'waste';
  domain: string;
  name: string;
  statLabel: string;
  statValue: string;
  valColor: string;
  glowColor: string;
  glowColorHex: string;
  hoverBorder: string;
  btnBg: string;
  btnText: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  chart: React.ReactNode;
  endpoint: string;
  // Fallback tickets shown when not logged in
  defaultTickets: { text: string; count: string }[];
};

const opsCards: OpsCard[] = [
  {
    role: 'water',
    domain: 'HYDRO OPERATIONS',
    name: 'Water Command',
    statLabel: 'LOSS REDUCED',
    statValue: '-18.4%',
    endpoint: '/home/water',
    valColor: 'text-blue-600',
    glowColor: 'from-blue-600/10',
    glowColorHex: 'rgba(37,99,235,0.08)',
    hoverBorder: 'hover:border-blue-500',
    btnBg: 'bg-blue-600',
    btnText: 'text-white',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    icon: <Droplet className="w-4 h-4" fill="currentColor" />,
    chart: (
      <svg viewBox="0 0 100 40" className="w-[120px] h-[40px] opacity-90" preserveAspectRatio="none">
        <path d="M0,30 L20,25 L40,35 L60,15 L80,20 L100,5" fill="none" stroke="#2563eb" strokeWidth="2.5" />
        <path d="M0,30 L20,25 L40,35 L60,15 L80,20 L100,5 L100,40 L0,40 Z" fill="url(#blue-grad)" opacity="0.2" />
        <defs>
          <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    ),
    defaultTickets: [
      { text: 'NO WATER SUPPLY', count: '—' },
      { text: 'CONTAMINATED WATER', count: '—' },
      { text: 'LOW WATER PRESSURE', count: '—' },
      { text: 'LEAKING PIPE', count: '—' }
    ]
  },
  {
    role: 'electric',
    domain: 'GRID OPERATIONS',
    name: 'Electricity Command',
    statLabel: 'AVG RESTORE',
    statValue: '37 min',
    endpoint: '/home/electricity',
    valColor: 'text-amber-500',
    glowColor: 'from-amber-500/10',
    glowColorHex: 'rgba(245,158,11,0.08)',
    hoverBorder: 'hover:border-amber-500',
    btnBg: 'bg-amber-500',
    btnText: 'text-white',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    icon: <Zap className="w-4 h-4" fill="currentColor" />,
    chart: (
      <div className="flex items-end gap-1 h-[40px] w-[120px]">
        {[4, 5, 4, 6, 8, 5, 9, 7, 10, 11, 12, 14, 16].map((h, i) => (
          <div key={i} className="flex-1 bg-amber-400 rounded-sm opacity-90" style={{ height: `${h * 2.5}px` }} />
        ))}
      </div>
    ),
    defaultTickets: [
      { text: 'NO POWER SUPPLY', count: '—' },
      { text: 'TRANSFORMER OR DC BLAST', count: '—' },
      { text: 'STREET LIGHT NOT WORKING', count: '—' },
      { text: 'LOOSE/HANGING WIRE', count: '—' }
    ]
  },
  {
    role: 'waste',
    domain: 'SANITATION OPS',
    name: 'Waste Command',
    statLabel: 'PICKUPS TODAY',
    statValue: '1,284',
    endpoint: '/home/waste',
    valColor: 'text-emerald-500',
    glowColor: 'from-emerald-500/10',
    glowColorHex: 'rgba(16,185,129,0.08)',
    hoverBorder: 'hover:border-emerald-500',
    btnBg: 'bg-emerald-500',
    btnText: 'text-white',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    icon: <Recycle className="w-4 h-4" />,
    chart: (
      <svg viewBox="0 0 100 40" className="w-[120px] h-[40px] opacity-90" preserveAspectRatio="none">
        <path d="M0,10 L20,15 L40,25 L60,20 L80,30 L100,35" fill="none" stroke="#10b981" strokeWidth="2.5" />
        <path d="M0,10 L20,15 L40,25 L60,20 L80,30 L100,35 L100,40 L0,40 Z" fill="url(#green-grad)" opacity="0.2" />
        <defs>
          <linearGradient id="green-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    ),
    defaultTickets: [
      { text: 'GARBAGE NOT COLLECTED', count: '—' },
      { text: 'BLOCKED OR BROKEN DRAINAGE', count: '—' },
      { text: 'GARBAGE DUMPED ON ROADS', count: '—' },
      { text: 'BAD SMELL OR DISEASE RISK', count: '—' }
    ]
  }
];

interface OperationsProps {
  user: { adminName: string; role: string } | null;
  onOpenAuth: (mode: 'login' | 'signup', role?: 'water' | 'electric' | 'waste') => void;
}

const Operations: React.FC<OperationsProps> = ({ user, onOpenAuth }) => {
  const [activeDashboard, setActiveDashboard] = useState<OpsCard | null>(null);
  // Live ticket data keyed by role
  const [liveData, setLiveData] = useState<Record<string, { text: string; count: string }[]>>({});
  const [loadingRoles, setLoadingRoles] = useState<Record<string, boolean>>({});

  // Fetch all 3 endpoints on mount so data is always visible
  useEffect(() => {
    opsCards.forEach(card => {
      setLoadingRoles(prev => ({ ...prev, [card.role]: true }));
      API.get(card.endpoint)
        .then((res: { data: Record<string, number> }) => {
          const data: Record<string, number> = res.data;
          const formatted = Object.entries(data).map(([text, count]) => ({
            text: text.toUpperCase(),
            count: count.toString()
          }));
          setLiveData(prev => ({ ...prev, [card.role]: formatted }));
        })
        .catch((err: unknown) => {
          console.error(`Failed to fetch ${card.role} data:`, err);
        })
        .finally(() => {
          setLoadingRoles(prev => ({ ...prev, [card.role]: false }));
        });
    });
  }, []);

  const handleCardClick = (card: OpsCard) => {
    if (!user) {
      onOpenAuth('login', card.role);
      return;
    }
    if (user.role === card.role) {
      setActiveDashboard(card);
    }
  };

  const getTickets = (card: OpsCard): { text: string; count: string }[] => {
    const live = liveData[card.role];
    if (live && live.length > 0) return live;
    return card.defaultTickets;
  };

  return (
    <>
      <section id="operations" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto overflow-hidden">
        <div className="mb-16 flex flex-col items-start text-left">
          <span className="text-slate-900 font-bold mb-4 block uppercase font-mono tracking-[0.3em] text-base md:text-lg">01 · Operations</span>
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-slate-900 whitespace-nowrap">Three operations. One control surface.</h2>
          <p className="text-slate-900 text-lg md:text-xl max-w-3xl font-black">
            Pick a domain to enter its live dashboard.<br className="hidden md:block" />
            Each surface is themed for the signal it monitors — and lights up when things go critical.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 justify-center items-center perspective-[2000px]">
          {opsCards.map((card, idx) => {
            const isLoggedIn = !!user;
            const isOwner = isLoggedIn && user.role === card.role;
            const isLocked = isLoggedIn && !isOwner;
            const tickets = getTickets(card);

            return (
              <motion.div
                key={idx}
                className="w-full flex justify-center h-full group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              >
                {/* Blur/Lock overlay for non-authorized roles */}
                {isLocked && (
                  <div className="absolute inset-0 z-20 rounded-[24px] flex flex-col items-center justify-center backdrop-blur-md bg-slate-900/60 pointer-events-auto cursor-not-allowed">
                    <Lock className="w-10 h-10 text-white/70 mb-3" />
                    <p className="text-white font-black text-sm tracking-widest uppercase">No Access</p>
                    <p className="text-white/50 text-xs font-medium mt-1 text-center px-6">
                      Logged in as <span className="text-white font-bold">{user?.adminName}</span>.<br />
                      This domain requires a different admin.
                    </p>
                  </div>
                )}

                <div className={`w-full transition-all duration-300 ${isLocked ? 'blur-[1px] pointer-events-none' : ''}`}>
                  <Card
                    containerHeight="100%"
                    containerWidth="100%"
                    rotateAmplitude={isLocked ? 0 : 8}
                    scaleOnHover={isLocked ? 1 : 1.03}
                  >
                    <div className={`w-full h-full bg-white border-2 shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-[24px] overflow-hidden relative flex flex-col transition-all duration-300 ${isOwner ? `border-current ${card.valColor} ring-1 ring-current ring-offset-2` : 'border-slate-200'} ${card.hoverBorder}`}>
                      {/* Owner badge */}
                      {isOwner && (
                        <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${card.btnBg} ${card.btnText} shadow-lg`}>
                          ✓ YOUR DOMAIN
                        </div>
                      )}

                      {/* Top Glow Gradient */}
                      <div className={`absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b ${card.glowColor} to-transparent pointer-events-none ${isOwner ? 'opacity-70' : 'opacity-40'}`} />

                      <div className="p-8 relative z-10 flex flex-col flex-1">

                        {/* Header */}
                        <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor}`}>
                              {card.icon}
                            </div>
                            <div>
                              <h4 className="text-[11px] text-slate-600 font-bold tracking-[0.2em] uppercase mb-1">{card.domain}</h4>
                              <h3 className="text-xl font-black text-slate-900">{card.name}</h3>
                            </div>
                          </div>
                          <span className="text-[11px] font-black text-rose-500 tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span> LIVE
                          </span>
                        </div>

                        {/* Complaints / Live Tickets */}
                        <div className="space-y-3 mb-6 flex-1">
                          {loadingRoles[card.role] ? (
                            <div className="flex items-center justify-center py-8">
                              <Loader2 className={`w-6 h-6 animate-spin ${card.valColor}`} />
                              <span className="ml-2 text-sm text-slate-500 font-bold">Fetching live data...</span>
                            </div>
                          ) : (
                            tickets.map((t, i) => (
                              <div key={i} className="flex items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-sm hover:bg-slate-100 transition-colors">
                                <span className="text-slate-900 text-[11px] lg:text-xs font-bold uppercase truncate">{t.text}</span>
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-widest whitespace-nowrap bg-white border border-slate-200 shadow-sm ${card.valColor} ${t.count !== '—' ? 'ring-1 ring-current' : ''}`}>
                                  {t.count !== '—' ? `${t.count} ACTIVE` : '—'}
                                </span>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-center text-xs text-slate-800 mt-auto pt-5 border-t border-slate-200 font-black uppercase tracking-wide">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full bg-current ${card.valColor} animate-pulse shadow-sm`} />
                            <span>{liveData[card.role] ? 'Live API Data' : 'Live Sync System'}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => handleCardClick(card)}
                          disabled={isLocked}
                          className={`mt-6 w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md ${card.btnBg} ${card.btnText} hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                          {!isLoggedIn
                            ? 'LOGIN TO VIEW DASHBOARD →'
                            : isOwner
                              ? 'VIEW MY DASHBOARD →'
                              : 'ACCESS DENIED'}
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12 mb-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-8 py-4 bg-slate-900 border border-slate-800 rounded-full shadow-2xl text-sm md:text-base font-mono text-white uppercase tracking-[0.3em] font-black">
            {user ? (
              <>
                <span className="text-green-400">✓ AUTHENTICATED</span>
                <span className="text-slate-500">•</span>
                <span>{user.adminName}</span>
                <span className="text-slate-500">•</span>
                <span className="text-blue-400 uppercase">{user.role} DOMAIN ACTIVE</span>
              </>
            ) : (
              <>
                <span>CLICK VIEW DASHBOARD</span>
                <span className="text-slate-500">•</span>
                <span>SECURE LOGIN</span>
                <span className="text-slate-500">•</span>
                <span className="text-blue-400">LIVE DASHBOARD</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Inline Dashboard Modal */}
      <AnimatePresence>
        {activeDashboard && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-[80rem] h-[88vh] bg-white rounded-[24px] overflow-hidden relative shadow-2xl border border-slate-100 flex flex-col"
              style={{ boxShadow: `0 20px 60px -10px ${activeDashboard.glowColorHex}` }}
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveDashboard(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors shadow-md cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>

              <Dashboard
                domainName={activeDashboard.domain}
                iconBg={activeDashboard.iconBg}
                iconColor={activeDashboard.iconColor}
                themeColor={activeDashboard.valColor}
                onLogout={() => setActiveDashboard(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Operations;
