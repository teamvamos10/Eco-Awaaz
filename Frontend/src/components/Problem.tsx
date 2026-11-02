import React from 'react';
import { motion } from 'framer-motion';

const problemCards = [
  {
    domain: 'Water Distribution',
    title: '40% Daily Leakage',
    desc: 'Aging municipal pipes and unmeasured pressure drops result in massive, invisible resource leakage daily before reaching homes.',
    image: '/images/problem_water.png',
  },
  {
    domain: 'Electrical Grid',
    title: '68% Unreported Outages',
    desc: 'Local transformer failures and micro-grid fluctuations remain completely invisible to central planners until citizens complain manually.',
    image: '/images/problem_electric.png',
  },
  {
    domain: 'Sanitation & Waste',
    title: 'Static & Blind Routing',
    desc: 'Garbage trucks travel blindly, leading to wasted fuel on clean streets while critical overflowing dumpsters are completely ignored.',
    image: '/images/problem_waste.png',
  }
];

const Problem: React.FC = () => {
  return (
    <section id="problem" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
      <motion.div
        className="mb-16 flex flex-col items-start text-left"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-slate-800 font-bold mb-4 block uppercase font-mono tracking-[0.2em] text-base md:text-lg">02 · The Problem</span>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
            Vital resources are bleeding out. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-600">The impact is invisible.</span>
          </h2>
          <p className="text-slate-900 text-xl leading-relaxed max-w-2xl font-black">
            In low-resource communities, shared utilities like water and electricity are often wasted without simple tracking. Existing solutions depend on smartphones or internet, making them unsuitable for these environments.
          </p>
        </motion.div>
      </motion.div>

      {/* 3 Column Image-driven Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {problemCards.map((card, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1 block"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
          >
            <div className="h-64 sm:h-72 w-full overflow-hidden relative bg-slate-900 group">
              <img
                src={card.image}
                alt={card.domain}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute top-4 left-4 inline-block px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase rounded">
                {card.domain}
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-3xl font-black mb-3 tracking-tight text-slate-900 leading-none">{card.title}</h3>
              <p className="text-slate-800 text-sm font-black leading-relaxed mt-2">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Problem;
