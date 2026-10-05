import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, BookOpen, Sparkles, Building, Landmark } from 'lucide-react';
import { doctorData } from '../../data/doctorData';

export default function TrustStrip() {
  return (
    <section className="py-10 bg-white border-y border-slate-200/80 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {doctorData.trustMetrics.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-brand-300 hover:bg-brand-50/30 transition-all text-center group"
            >
              <p className="text-xl sm:text-2xl font-extrabold text-navy-900 group-hover:text-brand-600 transition-colors">
                {item.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                {item.label}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Global Institutions Row */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 w-full lg:w-auto text-center lg:text-left">
            Research & Institutional Appointments:
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-6 w-full lg:w-auto">
            {doctorData.affiliations.map((affil) => (
              <div
                key={affil.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-navy-900 hover:border-slate-300 transition-colors"
              >
                <Landmark className="w-3.5 h-3.5 text-brand-600" />
                <span>{affil.name}</span>
                <span className="text-[10px] text-brand-700 bg-brand-100/70 px-1.5 py-0.2 rounded font-medium">
                  {affil.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
