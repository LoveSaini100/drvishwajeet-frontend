import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { doctorData } from '../../data/doctorData';

export default function Education() {
  return (
    <section id="education" className="py-16 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Academic Background"
          title="Education & Academic Qualifications"
          subtitle="Advanced doctoral and postdoctoral foundations across premier European institutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {doctorData.education.map((edu, idx) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-premium transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top accent border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 to-teal-500" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200/70">
                    {edu.year}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                  {edu.degree}
                </h3>

                <p className="text-base font-semibold text-brand-700 mt-1">
                  {edu.institution}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{edu.location}</span>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-navy-900 uppercase tracking-wide mb-1">
                    Specialization:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    {edu.specialization}
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mt-4">
                  {edu.description}
                </p>
              </div>

              {/* Honors Badge */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">
                  {edu.honors}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
