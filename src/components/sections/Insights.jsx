import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Calendar, ArrowRight, X, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { doctorData } from '../../data/doctorData';

export default function Insights() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="insights" className="py-16 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          badge="Thoughts & Perspectives"
          title="Research Insights & Knowledge Sharing"
          subtitle="Perspectives on clean technology transition, decarbonization policies, and academic growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {doctorData.insights.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-premium hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-brand-50 text-brand-700 border border-brand-200/70">
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {item.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand-600 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>

                <button
                  onClick={() => setSelectedArticle(item)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-navy-900 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-500">• {selectedArticle.readTime}</span>
                <span className="text-xs text-slate-500">• {selectedArticle.date}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4">
                {selectedArticle.title}
              </h3>

              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
                <p className="font-semibold text-slate-800">
                  {selectedArticle.excerpt}
                </p>
                <p>
                  {selectedArticle.content}
                </p>
                <p className="text-xs text-slate-500 italic pt-4 border-t border-slate-100">
                  Authored by Dr. Vishwajeet, Ramanujan Faculty, Department of Mechanical & Industrial Engineering, IIT Roorkee.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
