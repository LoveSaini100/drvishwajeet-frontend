import React from 'react';
import { Mail, Phone, MapPin, Linkedin, GraduationCap, BookOpen, Globe, ArrowUp } from 'lucide-react';
import { doctorData } from '../../data/doctorData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-slate-300 pt-10 pb-10 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-4 border-b border-slate-800/80">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-image.png"
                alt="Dr. Vishwajeet Logo"
                className="w-14 h-14 object-contain rounded-xl shadow-lg bg-white/5 p-0.5"
              />
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {doctorData.personal.name}
                </h3>
                <p className="text-xs text-brand-400 font-medium">
                  {doctorData.personal.designation} • IIT Roorkee
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Advancing clean technologies, waste-to-energy conversion, and green hydrogen systems for sustainable industrial decarbonization.
            </p>

            {/* <div className="flex items-center gap-3 pt-2">
              <a
                href={doctorData.personal.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-500 hover:bg-brand-600/20 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={doctorData.personal.socialLinks.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ResearchGate Profile"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-teal-500 hover:bg-teal-600/20 transition-all"
              >
                <BookOpen className="w-4 h-4" />
              </a>
              <a
                href={doctorData.personal.socialLinks.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Scholar Profile"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-500 hover:bg-brand-600/20 transition-all"
              >
                <GraduationCap className="w-4 h-4" />
              </a>
            </div> */}
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2.5">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="text-slate-400 hover:text-white transition-colors">
                  About Dr. Vishwajeet
                </a>
              </li>
              <li>
                <a href="#expertise" className="text-slate-400 hover:text-white transition-colors">
                  Research Areas & Expertise
                </a>
              </li>
              <li>
                <a href="#experience" className="text-slate-400 hover:text-white transition-colors">
                  Professional Journey
                </a>
              </li>
              <li>
                <a href="#education" className="text-slate-400 hover:text-white transition-colors">
                  Education & Qualifications
                </a>
              </li>
              <li>
                <a href="#achievements" className="text-slate-400 hover:text-white transition-colors">
                  Fellowships & Honors
                </a>
              </li>
            </ul>
          </div>

          {/* Focus & Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2.5">
              Focus & Advisory
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#expertise" className="text-slate-400 hover:text-white transition-colors">
                  Waste-to-Energy Engineering
                </a>
              </li>
              <li>
                <a href="#expertise" className="text-slate-400 hover:text-white transition-colors">
                  Green Hydrogen Systems
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-white transition-colors">
                  R&D Consulting & Feasibility
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-white transition-colors">
                  Ph.D. & Academic Mentorship
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-slate-400 hover:text-white transition-colors">
                  Outreach & Recent Talks
                </a>
              </li>
            </ul>
          </div>

          {/* Office & Direct Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2.5">
              Official Office
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                <span>{doctorData.personal.office}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${doctorData.personal.phoneRaw || '+919045065328'}`}
                  className="hover:text-white transition-colors font-medium text-slate-200"
                >
                  {doctorData.personal.phone || '+91 90450 65328'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`mailto:${doctorData.personal.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {doctorData.personal.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500">
          <p className='text-slate-300 font-bold'>© {new Date().getFullYear()} {doctorData.personal.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="text-slate-300">Indian Institute of Technology Roorkee</span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <p className="text-slate-300">
              Designed by{' '}
              <a
                href="https://erptechpro.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 font-bold hover:text-white hover:font-bold decoration-brand-500/60 hover:decoration-white transition-colors"
              >
                ERP TECH PRO
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
