import React, { useState, useEffect } from 'react';
import Menu from './Menu';

import logo from '../assets/logo.png';

interface NavbarProps {
  user: { adminName: string; role: string } | null;
  onLogout: () => void;
  onOpenAuth: (mode: 'login' | 'signup', role?: 'water' | 'electric' | 'waste') => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onOpenAuth }) => {
  const [activeHash, setActiveHash] = useState('#');

  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash || '#');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const logoEl = (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border border-black bg-black opacity-90 shadow-inner">
        <img src={logo} alt="Logo" className="w-full h-full object-cover scale-[1.45]" />
      </div>
      <div className="flex flex-col">
        <span className="text-slate-900 font-black tracking-tighter text-lg leading-none uppercase">Eco-Awaaz</span>
        <span className="text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">V1.0 · PILOT</span>
      </div>
    </div>
  );

  const navItems = [
    { label: 'Problem', href: '#problem' },
    { label: 'Process', href: '#process' },
    { label: 'Operations', href: '#operations' },
    { label: 'Impact', href: '#impact' },
    { label: 'FAQs', href: '#faqs' }
  ];

  return (
    <>
      <div className="absolute top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none flex justify-center">
        <nav className="pointer-events-auto backdrop-blur-3xl bg-white/40 border border-black shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.8)] rounded-full w-full max-w-[1600px] transition-all duration-300">
          <div className="flex items-center justify-between h-[72px] px-6">

            <div className="w-[300px]">
              {logoEl}
            </div>

            <div className="flex-1 flex justify-center">
              <Menu
                items={navItems}
                activeHref={activeHash}
                baseColor="#ffffff"
                pillColor="#000000"
                hoveredPillTextColor="#000000"
                pillTextColor="#ffffff"
                className="gap-4"
              />
            </div>

            {/* Action */}
            <div className="w-[300px] flex justify-end gap-4 items-center">
              {user ? (
                <>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Authenticated</p>
                    <p className="text-sm text-slate-900 font-black tracking-tight leading-none truncate max-w-[120px]">
                      {user.adminName}
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="px-5 py-2 text-xs font-black text-white bg-red-500 border border-red-500 rounded-full hover:bg-red-600 transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onOpenAuth('login')}
                  className="hidden md:block px-6 py-2.5 text-sm font-bold text-white bg-slate-900 border border-slate-900 rounded-full hover:bg-slate-800 transition-all cursor-pointer shadow-lg pointer-events-auto"
                >
                  Access Command Center &rarr;
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
