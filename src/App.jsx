import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import TrustStrip from './components/sections/TrustStrip';
import About from './components/sections/About';
import Expertise from './components/sections/Expertise';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Achievements from './components/sections/Achievements';
import Services from './components/sections/Services';
import Gallery from './components/sections/Gallery';
import Insights from './components/sections/Insights';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import BackToTop from './components/ui/BackToTop';
import FloatingContact from './components/ui/FloatingContact';
import Toast from './components/ui/Toast';
import Webinar from './pages/webinar';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/admin' || hash === '#admin') {
      return 'admin';
    }
    if (path === '/webinar' || hash === '#webinar' || hash === '#apply') {
      return 'webinar';
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState('home');
  const [toast, setToast] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Synchronize browser history and hash navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || hash === '#admin') {
        setCurrentPage('admin');
      } else if (path === '/webinar' || hash === '#webinar' || hash === '#apply') {
        setCurrentPage('webinar');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToAdmin = () => {
    setCurrentPage('admin');
    if (window.location.pathname !== '/admin') {
      window.history.pushState({ page: 'admin' }, '', '/admin');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWebinar = () => {
    setCurrentPage('webinar');
    if (window.location.pathname !== '/webinar') {
      window.history.pushState({ page: 'webinar' }, '', '/webinar');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    if (window.location.pathname !== '/') {
      window.history.pushState({ page: 'home' }, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fast, instant active section spy & scroll progress tracking on home page
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const sectionIds = [
        'home', 'about', 'expertise', 'experience', 
        'education', 'achievements', 'services', 
        'gallery', 'insights', 'testimonials', 'contact'
      ];
      
      const scrollPos = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleShowToast = (newToast) => {
    setToast(newToast);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // If viewing the Admin Panel
  if (currentPage === 'admin') {
    return (
      <>
        <AdminDashboard 
          onBackToHome={navigateToHome}
          onShowToast={handleShowToast}
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  // If viewing the Webinar page
  if (currentPage === 'webinar') {
    return (
      <>
        <Webinar 
          onBackToHome={navigateToHome} 
          onShowToast={handleShowToast} 
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  // Otherwise, render Home Single Page Application
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFF] text-slate-800 font-sans selection:bg-brand-500 selection:text-white relative">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-brand-600 via-teal-500 to-emerald-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <Navbar 
        activeSection={activeSection} 
        onNavSelect={setActiveSection} 
      />

      {/* Main Single Page Content */}
      <main className="flex-1">
        <Hero onOpenApply={navigateToWebinar} />
        <TrustStrip />
        <About onCopyEmail={() => handleShowToast({ type: 'success', message: 'Email copied to clipboard!' })} />
        <Expertise />
        <Experience />
        <Education />
        <Achievements />
        <Services />
        <Gallery />
        <Insights />
        <Testimonials />
        <Contact onShowToast={handleShowToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Utilities */}
      <FloatingContact onOpenApply={navigateToWebinar} />
      <BackToTop />
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
