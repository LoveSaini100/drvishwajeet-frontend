import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, MapPin, Calendar, CheckCircle2, Award, Landmark } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { doctorData } from '../../data/doctorData';

export default function Experience() {
  return (
    <section id="experience" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Career Timeline"
          title="Professional Journey & Academic Appointments"
          subtitle="International research footprint across India, Poland, Denmark, and the United Kingdom."
        />

        <div className="mt-16 relative">
          
          {/* Central Vertical Timeline Line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-brand-300 to-slate-200" />
          
          {/* Mobile Vertical Timeline Line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200" />

          <div className="space-y-12 md:space-y-16">
            {doctorData.experience.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.role + item.organization}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Central Node Icon */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-brand-600 shadow-md flex items-center justify-center z-10 text-brand-700">
                    <Landmark className="w-4 h-4" />
                  </div>

                  {/* Spacer for 2-column layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Container */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`pl-12 md:pl-0 w-full md:w-1/2 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="bg-slate-50/90 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-premium transition-all group">
                      
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200/70">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </span>
                        
                        <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                          {item.type}
                        </span>
                      </div>

                      {/* Role & Org */}
                      <h3 className="text-xl font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                        {item.role}
                      </h3>

                      <p className="text-sm font-semibold text-brand-700 mt-0.5">
                        {item.organization}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed mt-3.5">
                        {item.description}
                      </p>

                      {/* Key Highlights */}
                      {item.achievements && item.achievements.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-2">
                          <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                            Key Focus & Milestones:
                          </p>
                          {item.achievements.map((ach) => (
                            <div key={ach} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
