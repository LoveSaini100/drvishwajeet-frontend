import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, MapPin, Sparkles, CheckCircle2, 
  Copy, Check, BookOpen, Compass, ShieldCheck, HeartHandshake,
  Flame, Leaf, Award, Zap, Recycle
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { doctorData } from '../../data/doctorData';

export default function About({ onCopyEmail }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(doctorData.personal.email);
    setCopied(true);
    if (onCopyEmail) onCopyEmail();
    setTimeout(() => setCopied(false), 2000);
  };

  const values = [
    {
      icon: Leaf,
      title: "Sustainable Innovation",
      desc: "Engineering closed-loop waste valorization and renewable hydrogen systems to mitigate environmental degradation."
    },
    {
      icon: Award,
      title: "Global Academic Rigor",
      desc: "Translating international post-doctoral research methodologies from Europe into high-impact Indian solutions."
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Mentorship",
      desc: "Empowering next-generation engineers and Ph.D. scholars with practical laboratory rigor and scientific curiosity."
    }
  ];

  const getInterestIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Recycle className="w-5 h-5 text-emerald-600" />;
      case 1:
        return <Flame className="w-5 h-5 text-amber-600" />;
      case 2:
        return <Leaf className="w-5 h-5 text-teal-600" />;
      case 3:
        return <Zap className="w-5 h-5 text-brand-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-brand-600" />;
    }
  };

  return (
    <section id="about" className="py-16 md:py-16 bg-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="About Me"
          title="Bridging Advanced Research with Sustainable Solutions"
          subtitle="A dedicated researcher, educator, and innovator at IIT Roorkee working on clean energy technologies."
        />

        {/* 1. Main Bio & Profile Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-10">
          
          {/* Left Column: Authentic Portrait & Directory Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Image Card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-brand-50 via-slate-100 to-white p-3 border border-slate-200/90 shadow-premium">
              <div className="rounded-2xl overflow-hidden bg-slate-900/5 aspect-4/3 sm:aspect-16/11">
                <img
                  src={doctorData.personal.profileImage}
                  alt={doctorData.personal.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-2 sm:p-2">
                <h3 className="text-xl font-bold text-navy-900">{doctorData.personal.name}</h3>
                <p className="text-sm font-semibold text-brand-600">
                  {doctorData.personal.designation} • IIT Roorkee
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {doctorData.personal.department}
                </p>
              </div>
            </div>

            {/* Information Card */}
            <div className="bg-slate-50/90 rounded-2xl p-3 border border-slate-200/80 shadow-2xs space-y-3.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Official Directory Information
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Designation:</span>{' '}
                    <span className="text-slate-600">Ramanujan Fellow / Faculty (IIT Roorkee)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <div className="flex-1 flex items-center justify-between gap-2">
                    <span className="text-slate-700 font-medium break-all select-all">
                      {doctorData.personal.email}
                    </span>
                    <button
                      onClick={handleCopy}
                      title="Copy Email Address"
                      className="p-1 rounded bg-white hover:bg-brand-50 text-slate-500 hover:text-brand-600 border border-slate-200 transition-colors shrink-0 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Office:</span>{' '}
                    <span className="text-slate-600">{doctorData.personal.office}</span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Bio Narrative & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Bio Prose */}
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p className="font-medium text-navy-900 text-lg sm:text-xl text-justify">
                {doctorData.personal.longBio}
              </p>
              <p className="text-slate-600 text-sm sm:text-base text-justify">
                Dr. Vishwajeet earned his Ph.D. from <strong>Wrocław University of Science and Technology, Poland</strong>, supported by the European Union Erasmus and NAWA doctoral scholarships. He subsequently broadened his research frontiers as a Research Scientist at <strong>Aarhus University in Denmark</strong> and <strong>King's College London in the United Kingdom</strong>.
              </p>
              <p className="text-slate-600 text-sm sm:text-base text-justify">
                Returning to India under the prestigious <strong>Ramanujan Fellowship</strong>, he currently spearheads experimental and translational research in thermochemical conversion, green hydrogen generation, and waste-to-energy pathways in the Department of Mechanical & Industrial Engineering at IIT Roorkee.
              </p>
            </div>

            {/* Core Values / Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {values.map((v) => {
                const IconComponent = v.icon;
                return (
                  <div
                    key={v.title}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-brand-300 hover:bg-brand-50/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-600/10 text-brand-600 flex items-center justify-center mb-3">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h5 className="text-sm font-bold text-navy-900 mb-1">{v.title}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>

        {/* 2. Full-Width 100%: Primary Research Interests (IIT Roorkee) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 pt-10 border-t border-slate-200/80 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Primary Research Interests (IIT Roorkee)</span>
            </h4>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200 w-fit">
              Core Strategic Focus
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {doctorData.researchInterests.map((interest, idx) => (
              <div
                key={interest.title}
                className="p-3 rounded-2xl bg-slate-50/90 hover:bg-white border border-slate-200/80 hover:border-brand-300 hover:shadow-premium transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    {getInterestIcon(idx)}
                  </div>
                  <h5 className="text-sm font-bold text-navy-900 group-hover:text-brand-600 transition-colors leading-snug">
                    {interest.title}
                  </h5>
                  <p className="text-xs text-justify text-slate-600 mt-2 leading-relaxed">
                    {interest.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-brand-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>IIT Roorkee Active Domain</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. Full-Width 100%: Key Competency & Research Proficiency */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 pt-10 border-t border-slate-200/80 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5">
              <Flame className="w-5 h-5 text-brand-600" />
              <span>Key Competency & Research Proficiency</span>
            </h4>
            <span className="text-xs font-semibold text-slate-400">
              Domain Mastery & Engineering Expertise
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {doctorData.skills.map((skill) => (
              <div key={skill.name} className="p-3 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-brand-200 transition-all shadow-2xs">
                <div className="flex justify-between items-center mb-2 text-xs font-semibold">
                  <span className="text-slate-800 font-bold">{skill.name}</span>
                  <span className="text-brand-700 bg-brand-100/70 px-2 py-0.5 rounded-md font-bold">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-brand-600 via-teal-500 to-emerald-500 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-slate-700 mt-2 font-medium">
                  {skill.category}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
