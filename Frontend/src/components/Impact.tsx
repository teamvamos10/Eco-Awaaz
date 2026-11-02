import React from 'react';
import { motion } from 'framer-motion';

const Impact: React.FC = () => {
  return (
    <section id="impact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
      <motion.div
        className="mb-16 flex flex-col items-start text-left"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-slate-900 font-bold mb-4 block uppercase font-mono tracking-[0.3em] text-base md:text-lg">04 · Impact</span>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">Real-world results.</h2>
      </motion.div>

      {/* Top Row Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-[24px] shadow-lg p-8 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
          <h4 className="text-sm text-slate-600 font-bold mb-4 font-mono tracking-widest uppercase">Total Resolved</h4>
          <span className="text-5xl lg:text-6xl font-black text-blue-600 tracking-tighter">14.2M</span>
        </div>
        <div className="bg-white rounded-[24px] shadow-lg p-8 border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300">
          <h4 className="text-sm text-slate-600 font-bold mb-4 font-mono tracking-widest uppercase">Avg Response</h4>
          <span className="text-5xl lg:text-6xl font-black text-amber-600 tracking-tighter">12m</span>
        </div>
        <div className="bg-white rounded-[24px] shadow-lg p-8 border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
          <h4 className="text-sm text-slate-900 font-black mb-4 font-mono tracking-widest uppercase">Most Affected Pin</h4>
          <span className="text-5xl lg:text-6xl font-black text-emerald-600 tracking-tighter">400034</span>
        </div>
      </div>

      {/* Separate distinct sections for Map and Dashboard */}
      <div className="space-y-16">

        {/* Section 1: Map Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full h-[400px] rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
            <motion.img
              src="/images/impact_map.png"
              alt="Map Data Visualization"
              className="w-full h-full object-cover"
              initial={{ scale: 1.15, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like ease
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-mono font-bold text-blue-700 mb-4 uppercase tracking-[0.2em]">Geospatial Hotspots</h3>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">Focusing on high-volume zones.</h2>
            <p className="text-slate-900 text-lg font-black leading-relaxed mb-8 opacity-90">
              By mapping anomalies geographically, the system precisely identifies cascading failures and highly affected areas before a crisis occurs.
            </p>

            <div className="space-y-6">
              {[
                { pin: '400034', val: '84%', color: 'bg-blue-600' },
                { pin: '110012', val: '62%', color: 'bg-amber-500' },
                { pin: '560001', val: '45%', color: 'bg-emerald-600' }
              ].map((row, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  <span className="text-slate-900 font-black font-mono w-20 text-xl">{row.pin}</span>
                  <div className="flex-1 h-5 bg-slate-200 rounded-full overflow-hidden shadow-inner border border-slate-300/50">
                    <motion.div
                      className={`h-full ${row.color} rounded-full shadow-sm`}
                      initial={{ width: 0 }}
                      whileInView={{ width: row.val }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 * idx, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-base text-slate-700 font-bold w-12 text-right">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Dashboard Resolution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="p-4 lg:order-1 order-2">
            <h3 className="text-lg font-mono font-bold text-amber-700 mb-4 uppercase tracking-[0.2em]">Efficiency Protocol</h3>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">Guaranteed issue resolution.</h2>
            <p className="text-slate-900 text-lg font-black leading-relaxed mb-8 opacity-90">
              The automated command surfaces dramatically improve reaction time. Tasks are successfully routed and verified before manual operators need to step in.
            </p>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
              <div className="text-6xl lg:text-7xl font-black text-slate-900 mb-2 tracking-tighter">94%</div>
              <p className="text-base text-slate-600 mb-8 font-bold">Within standard SLA resolution targets</p>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-base border-b border-slate-200 pb-4">
                  <span className="text-blue-700 font-bold tracking-wide">Hydro Issues</span>
                  <span className="text-slate-900 font-black font-mono">96% resolved</span>
                </div>
                <div className="flex justify-between items-center text-base border-b border-slate-200 pb-4">
                  <span className="text-amber-700 font-bold tracking-wide">Electric Failures</span>
                  <span className="text-slate-900 font-black font-mono">91% resolved</span>
                </div>
                <div className="flex justify-between items-center text-base pb-2">
                  <span className="text-emerald-700 font-bold tracking-wide">Waste Overflow</span>
                  <span className="text-slate-900 font-black font-mono">95% resolved</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[400px] lg:h-[500px] rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 lg:order-2 order-1 bg-slate-100">
            <motion.img
              src="/images/impact_dashboard.png"
              alt="Resolution Dashboard"
              className="w-full h-full object-cover"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Impact;
