import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Recycle, Leaf, Flame, Sparkles, ExternalLink, ArrowRight,
  CheckCircle2, X, Info, Zap, Sun, ShieldCheck
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { doctorData } from '../../data/doctorData';

export default function Expertise() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const getIcon = (id) => {
    switch (id) {
      case 'waste-to-energy':
        return <Recycle className="w-5 h-5 text-emerald-600" />;
      case 'hydrothermal-plasma':
        return <Flame className="w-5 h-5 text-amber-600" />;
      case 'green-hydrogen':
        return <Zap className="w-5 h-5 text-teal-600" />;
      case 'biomass-co2-conversion':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      default:
        return <Flame className="w-5 h-5 text-brand-600" />;
    }
  };

  return (
    <section id="expertise" className="py-16 md:py-16 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Core Research"
          title="Areas of Expertise & Research Focus"
          subtitle="Pioneering scientific investigations and industrial applications in sustainable clean energy and decarbonization."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {doctorData.expertise.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all flex flex-col group"
            >
              {/* Card Image Banner */}
              <div className="relative h-52 sm:h-64 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent" />
                
                <div className="absolute top-2 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-navy-900 shadow-sm backdrop-blur-xs">
                    {getIcon(item.id)}
                    <span>{item.category}</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedTopic(item)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-navy-900 transition-colors focus:outline-hidden cursor-pointer"
                  >
                    <span>View Technical Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {item.externalUrl && (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                      title="Read scientific context"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Detail Modal for Expertise */}
      <AnimatePresence>
        {selectedTopic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedTopic(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Modal Image Header */}
              {selectedTopic.image && (
                <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-100 rounded-t-3xl">
                  <img
                    src={selectedTopic.image}
                    alt={selectedTopic.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute bottom-3 left-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-navy-900 shadow-md backdrop-blur-xs">
                      {getIcon(selectedTopic.id)}
                      <span>{selectedTopic.category}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedTopic(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:text-navy-900 hover:bg-white shadow-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-navy-900 leading-snug">
                    {selectedTopic.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {selectedTopic.description}
                </p>

                <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-3">
                  Key Technical Pillars & Methodologies:
                </h4>

                <div className="space-y-2.5 mb-6">
                  {selectedTopic.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <a
                    href="#contact"
                    onClick={() => setSelectedTopic(null)}
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold transition-colors"
                  >
                    Consult on {selectedTopic.title}
                  </a>

                  {selectedTopic.externalUrl && (
                    <a
                      href={selectedTopic.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900"
                    >
                      <span>Read Scientific Reference</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
