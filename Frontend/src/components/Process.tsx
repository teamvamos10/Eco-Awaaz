import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Fingerprint, Network, TerminalSquare } from 'lucide-react';

const steps = [
  { id: '01', title: 'Action', desc: 'Secure Mobile Interface', icon: <PhoneCall className="w-10 h-10 text-white" />, color: 'bg-rose-500', glow: 'shadow-[0_15px_30px_rgba(244,63,94,0.3)]' },
  { id: '02', title: 'Verify', desc: 'Encrypted Validation', icon: <Fingerprint className="w-10 h-10 text-white" />, color: 'bg-amber-500', glow: 'shadow-[0_15px_30px_rgba(245,158,11,0.3)]' },
  { id: '03', title: 'Analyze', desc: 'Automated Triaging', icon: <Network className="w-10 h-10 text-white" />, color: 'bg-purple-600', glow: 'shadow-[0_15px_30px_rgba(147,51,234,0.3)]' },
  { id: '04', title: 'Routing', desc: 'Command Surface Output', icon: <TerminalSquare className="w-10 h-10 text-white" />, color: 'bg-blue-600', glow: 'shadow-[0_15px_30px_rgba(37,99,235,0.3)]' }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto bg-slate-50 mt-16 rounded-[48px]">
      <motion.div
        className="mb-20 flex flex-col items-start text-left"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-slate-900 font-bold mb-4 block uppercase font-mono tracking-[0.3em] text-base md:text-lg">03 · The Process</span>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
          How it connects the unconnected.
        </h2>
        <p className="text-slate-900 text-lg font-black max-w-2xl opacity-90">
          Every signal from the city is securely captured, instantly verified, automatically analyzed, and cleanly routed into the command center.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            className="flex flex-col bg-white p-10 rounded-[32px] border border-slate-200 shadow-xl relative overflow-hidden group"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            {/* Background floating element to make it look premium */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 transition-transform duration-700 group-hover:scale-150 ${step.color}`} />

            <span className="text-xl font-mono text-slate-900 font-black tracking-widest mb-10 opacity-40">{step.id}</span>

            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 ${step.color} ${step.glow}`}>
              {step.icon}
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{step.title}</h3>
            <p className="text-base text-slate-800 font-black leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Process;
