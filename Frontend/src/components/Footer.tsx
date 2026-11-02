import React from 'react';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 mt-24 bg-white/50 backdrop-blur-sm shadow-[0_-8px_30px_rgba(0,0,0,0.02)] relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Logo */}
        <div className="flex items-center flex-1">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border border-black bg-black">
            <img src={logo} alt="Logo" className="w-full h-full object-cover scale-[1.45]" />
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="flex-1 text-center">
          <span className="text-sm text-slate-800 font-black tracking-widest uppercase opacity-80">&copy; 2026 ECO-AWAAZ LTD. ALL RIGHTS RESERVED.</span>
        </div>

        {/* Right: Security Badges */}
        <div className="flex items-center justify-end gap-3 opacity-60 grayscale flex-1">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase">End-to-End Encrypted</span>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
