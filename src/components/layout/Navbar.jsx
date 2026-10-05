import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, GraduationCap, LogIn } from 'lucide-react';
import { doctorData } from '../../data/doctorData';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ activeSection, onNavSelect }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    if (onNavSelect) {
      onNavSelect(targetId);
    }
    
    setMobileMenuOpen(false);

    // Allow menu closing transition to trigger smoothly before scrolling
    setTimeout(() => {
      if (targetId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 75;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: Math.max(0, elementPosition - offset),
          behavior: 'smooth'
        });
      }
    }, 60);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'glass-nav py-2 shadow-subtle border-b border-slate-200/60'
            : 'bg-transparent py-2 sm:py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand / Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-2.5 text-left focus:outline-hidden cursor-pointer"
          >
            <img
              src="/logo-image.png"
              alt="Dr. Vishwajeet Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="block text-base sm:text-lg font-bold text-navy-900 tracking-tight leading-none group-hover:text-brand-600 transition-colors">
                {doctorData.personal.name}
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                IIT Roorkee
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-400/70 shadow-2xs backdrop-blur-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'text-white shadow-xs'
                      : 'text-slate-900 hover:text-navy-900 hover:bg-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-navy-800 to-navy-900 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.6 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-navy-900 hover:bg-slate-100 focus:outline-hidden transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-y-auto max-h-[calc(100dvh-4.5rem)]"
            >
              <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 space-y-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 xl:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
