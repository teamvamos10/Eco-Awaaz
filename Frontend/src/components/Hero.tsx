import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-100 blur-[100px] rounded-full pointer-events-none opacity-50" />

      <motion.div
        className="z-10 flex flex-col items-center text-center max-w-[1200px] mx-auto pb-48"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Project Logo in Hero */}
        <motion.div
          className="w-48 h-48 mb-12 rounded-full border-2 border-black shadow-2xl flex items-center justify-center overflow-hidden bg-black"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, type: "spring" }}
        >
          <img src={logo} alt="Eco-Awaz Official" className="w-full h-full object-cover scale-[1.45]" />
        </motion.div>
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-300 bg-white shadow-sm mb-12 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-slate-800 uppercase">
            VOICE-FIRST · BUILT FOR LOW-INFRASTRUCTURE COMMUNITIES
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-slate-900 mb-10 leading-[1.05]">
          A command center for the <br className="hidden md:block" />
          <span className="text-blue-600">resources</span> <span className="text-amber-500">you can't</span> <span className="text-blue-600">see.</span>
        </h1>

        {/* Subtext */}
        <p className="text-slate-800 text-xl md:text-3xl max-w-4xl leading-relaxed mx-auto font-black">
          Eco-Awaaz turns a missed call into a real-time municipal response — for water, electricity and waste. No app required. No internet required. Just a voice.
        </p>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-sm font-black tracking-[0.3em] text-slate-800 uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-slate-900"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
