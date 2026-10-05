import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { doctorData } from '../../data/doctorData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = doctorData.testimonials;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Academic Feedback"
          title="Peer Reflections & Academic Endorsements"
          subtitle="Perspectives from institutional outreach hosts, research collaborators, and scientific peers."
        />

        <div className="mt-8 sm:mt-10 relative">
          
          <div className="bg-gradient-to-br from-slate-50 via-brand-50/20 to-slate-100 rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm relative overflow-hidden">
            
            <Quote className="w-16 h-16 text-brand-500/15 absolute -top-2 -left-2 rotate-180 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-base sm:text-xl text-justify font-medium text-navy-900 leading-relaxed italic">
                  "{current.quote}"
                </p>

                <div className="mt-4 pt-3 sm:pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-navy-900">{current.author}</h4>
                    <p className="text-xs sm:text-sm text-brand-700 font-semibold">{current.role}</p>
                    <p className="text-xs text-slate-500">{current.organization}</p>
                  </div>

                  {/* Carousel Nav Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-navy-900 hover:bg-slate-100 transition-colors shadow-2xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-semibold text-slate-400 px-1">
                      {currentIndex + 1} / {testimonials.length}
                    </span>
                    <button
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-navy-900 hover:bg-slate-100 transition-colors shadow-2xs"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
