import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, Trophy, Globe2, Landmark, CheckCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { doctorData } from '../../data/doctorData';

export default function Achievements() {
  return (
    <section id="achievements" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Honors & Recognition"
          title="Prestigious Fellowships & Key Achievements"
          subtitle="Recognitions for academic rigor, international research impact, and academic leadership."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {doctorData.achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-premium hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-50 text-amber-700 border border-amber-200">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-brand-700 mt-1">
                  {item.organization}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mt-3">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{item.year}</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ramanujan Fellowship Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 p-6 sm:p-8 rounded-3xl bg-brand-50/80 border border-brand-200/80 flex flex-col sm:flex-row items-center gap-6 justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-navy-900">
                SERB Ramanujan Fellowship
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Administered by the Department of Science and Technology (DST), Govt. of India, supporting top-tier international scientists conducting translational research in India.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            Explore Research Synergies
          </a>
        </motion.div>

      </div>
    </section>
  );
}
