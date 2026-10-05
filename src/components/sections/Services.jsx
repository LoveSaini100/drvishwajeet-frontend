import React from 'react';
import { motion } from 'framer-motion';
import { 
  FlaskConical, Recycle, Leaf, Handshake, GraduationCap, 
  Compass, ArrowRight, CheckCircle2, Sparkles 
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { doctorData } from '../../data/doctorData';

const iconMap = {
  FlaskConical: FlaskConical,
  Recycle: Recycle,
  Leaf: Leaf,
  Handshake: Handshake,
  GraduationCap: GraduationCap,
  Compass: Compass,
};

export default function Services() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-16 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Advisory & Collaboration"
          title="Professional Services & Academic Offerings"
          subtitle="Offering advanced technical expertise, research collaboration, and student mentorship."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {doctorData.services.map((srv, idx) => {
            const IconComp = iconMap[srv.icon] || FlaskConical;

            return (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-premium hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-xs">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
                    {srv.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {srv.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-1 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-4 border-t border-slate-100">
                  <a
                    href="#contact"
                    onClick={handleScrollToContact}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-navy-900 transition-colors"
                  >
                    <span>Request Collaboration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
