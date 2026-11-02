import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is Eco-Awaaz and how does it work?",
    answer: "Eco-Awaaz is a unified command center for municipal operations. It allows seamless tracking and management of water supply, electricity, and sanitation complaints in real-time, providing actionable insights for city administrators."
  },
  {
    question: "Who can access the live operational dashboards?",
    answer: "Access to the live operational dashboards is strictly restricted to authorized municipal personnel. Each admin can only access the dashboard for their assigned domain (Hydro, Grid, or Sanitation)."
  },
  {
    question: "How is the data synced across the different operations?",
    answer: "The platform uses a centralized backend API that automatically syncs complaint tickets, status updates, and operational metrics in real-time. Fast response times are guaranteed through optimized data pipelines."
  },
  {
    question: "Can citizens track their complaints directly?",
    answer: "Currently, Eco-Awaaz serves as an internal tool for municipal operators and admins. Future updates will introduce a citizen-facing portal for direct tracking and updates."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1000px] mx-auto overflow-hidden">
      <div className="mb-16 flex flex-col items-center text-center">
        <span className="text-slate-900 font-bold mb-4 block uppercase font-mono tracking-[0.3em] text-base md:text-lg">04 · Support</span>
        <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-slate-900 whitespace-nowrap">Frequently Asked Questions.</h2>
        <p className="text-slate-600 text-lg md:text-xl max-w-2xl font-medium">
          Everything you need to know about the platform operations and access.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-lg font-bold text-slate-900">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 ml-4 border border-slate-200"
              >
                <ChevronDown className="w-5 h-5 text-slate-500" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
