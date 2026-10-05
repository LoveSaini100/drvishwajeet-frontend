import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Mail, Sparkles, Award, GraduationCap,
  Building2, CheckCircle, MapPin, Copy, Check, ShieldCheck, LogIn, FileText
} from 'lucide-react';
import { doctorData } from '../../data/doctorData';

export default function Hero({ onOpenApply }) {
  const [currentText, setCurrentText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const words = doctorData.personal.typingWords;

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeoutSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, timeoutSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words]);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(doctorData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative pt-24 pb-14 md:pt-28 md:pb-20 mesh-bg overflow-hidden">
      {/* Background Decorative Gradient Rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-brand-200/35 via-teal-100/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* Left Column: Text & Intro */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">

            {/* Status / Role Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-brand-50 text-brand-800 border border-brand-200/80 shadow-2xs"
            >
              <Building2 className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Ramanujan Faculty • IIT Roorkee</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-1.5"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-navy-900 tracking-tight leading-[1.15]">
                Hello, I'm{' '}
                <span className="text-gradient font-black">
                  {doctorData.personal.name}
                </span>
              </h1>

              {/* Dynamic Typewriter Badge */}
              <div className="h-8 sm:h-9 flex items-center justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 text-sm sm:text-lg font-semibold text-slate-700">
                  <span className="text-brand-600 font-bold">Specializing in:</span>
                  <span className="font-bold text-navy-900 underline decoration-brand-400 decoration-2 underline-offset-4 min-h-[1.4em]">
                    {currentText}
                  </span>
                  <span className="w-0.5 h-4.5 bg-brand-600 animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Description Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="text-sm sm:text-base text-slate-600 text-justify leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              {doctorData.personal.shortBio}
            </motion.p>

            {/* Key Research Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5"
            >
              {[
                'Thermochemical Waste-to-Energy',
                'Hydrothermal & Plasma Gasification',
                'Biomass & CO₂ Conversion',
                'Green Hydrogen & Zero-Emission'
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100/90 text-slate-700 border border-slate-200/80 hover:border-brand-300 hover:bg-brand-50/40 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span>{tag}</span>
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons & Inline Contact Chip Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="pt-2 w-full lg:w-auto flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3"
            >
              {/* Row with 2 Buttons on Mobile/Small screens, inline on sm+ */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <a
                  href="#expertise"
                  onClick={(e) => handleScrollTo(e, 'expertise')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-600 via-brand-700 to-navy-900 shadow-md hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-center"
                >
                  <span>Explore Research</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={onOpenApply}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-7 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-navy-900 hover:bg-navy-950 border border-navy-800 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-center group"
                >
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-300 group-hover:scale-110 transition-transform shrink-0" />
                  <span>Register Now</span>
                </button>
              </div>

              {/* Login Button: Full width on mobile/small screen, auto on sm+ */}
              
            </motion.div>

            {/* Mini Trust Stats Pill Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-1.5 gap-x-4 text-xs text-slate-500 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Ramanujan Fellow (DST/SERB)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
                Ph.D. Wrocław Univ of Tech, Poland
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                Room 261, East Block, IIT Roorkee
              </span>
            </motion.div>

          </div>

          {/* Right Column: Authentic Portrait Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-md sm:max-w-lg"
            >
              {/* Decorative Circular Auras */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-500/20 via-teal-400/20 to-brand-700/20 blur-2xl transform -rotate-3 scale-95" />

              {/* Main Portrait Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white via-brand-50/50 to-slate-100 p-2 sm:p-3 shadow-premium border border-slate-200/90">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900/5 aspect-4/5 sm:aspect-square flex items-center justify-center">
                  <img
                    src={doctorData.personal.profileImage}
                    alt={doctorData.personal.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Shadow at Image Bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-900/60 via-navy-900/20 to-transparent" />

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-sm font-bold tracking-tight">{doctorData.personal.name}</p>
                    <p className="text-xs text-brand-200 font-medium">{doctorData.personal.department}</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: IIT Roorkee & Ramanujan Fellowship */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="absolute -bottom-10 -left-3 sm:-left-6 glass-card px-2 py-1.5 sm:px-2 sm:py-2 rounded-2xl shadow-xl border border-white/80 flex items-center gap-3 bg-white/95"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-navy-900">Ramanujan Fellow</p>
                  <p className="text-[11px] text-slate-500 font-medium">SERB / DST, Govt of India</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Doctorate from Poland */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -top-3 -right-3 sm:-right-6 glass-card px-2 py-1.5 sm:px-2 sm:py-2 rounded-2xl shadow-xl border border-white/80 flex items-center gap-2.5 bg-white/95"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-navy-900">Ph.D. Poland</p>
                  <p className="text-[10px] text-slate-500">Wrocław Univ of Tech</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
