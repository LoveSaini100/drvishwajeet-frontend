import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, User, Phone, Calendar, Mail, Briefcase, MapPin, 
  MessageSquare, Send, CheckCircle2, Sparkles, ArrowRight, LogIn
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { doctorData } from '../data/doctorData';
import { api } from '../services/api';

export default function Webinar({ onBackToHome, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    dob: '',
    email: '',
    occupation: '',
    address: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = "Webinar & Research Mentorship Application | Dr. Vishwajeet (IIT Roorkee)";
    return () => {
      document.title = "Dr. Vishwajeet | Ramanujan Fellow & Faculty @ IIT Roorkee";
    };
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.whatsapp.trim()) {
      errs.whatsapp = 'WhatsApp number is required';
    } else if (!/^[0-9+-\s()]{7,20}$/.test(formData.whatsapp.trim())) {
      errs.whatsapp = 'Please enter a valid phone/WhatsApp number';
    }
    if (!formData.dob) errs.dob = 'Date of birth is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.occupation.trim()) errs.occupation = 'Occupation / Role is required';
    if (!formData.address.trim()) errs.address = 'Address / Location is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      if (onShowToast) {
        onShowToast({
          type: 'error',
          message: 'Please complete all required fields correctly.'
        });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Store Application in MongoDB Database via Backend API
      await api.submitRegistration({
        name: formData.name,
        whatsapp: formData.whatsapp,
        dob: formData.dob,
        email: formData.email,
        occupation: formData.occupation,
        address: formData.address,
        message: formData.message,
      });

      // 2. EmailJS Notification (Secondary Backup)
      try {
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const applyTemplateId = import.meta.env.VITE_EMAILJS_APPLY_TEMPLATE_ID;

        const structuredMessage = `
--- WEBINAR & APPLICATION DETAILS ---
• Full Name: ${formData.name}
• WhatsApp / Phone: ${formData.whatsapp}
• Date of Birth: ${formData.dob}
• Email: ${formData.email}
• Occupation / Role: ${formData.occupation}
• Address: ${formData.address}
• Message / Statement: 
${formData.message || 'None provided'}
--------------------------------------
        `.trim();

        const templateParams = {
          from_name: formData.name,
          name: formData.name,
          candidate_name: formData.name,
          full_name: formData.name,
          from_email: formData.email,
          email: formData.email,
          candidate_email: formData.email,
          reply_to: formData.email,
          phone: formData.whatsapp,
          whatsapp: formData.whatsapp,
          whatsapp_no: formData.whatsapp,
          dob: formData.dob,
          date_of_birth: formData.dob,
          occupation: formData.occupation,
          role: formData.occupation,
          address: formData.address,
          location: formData.address,
          subject: `New Webinar Application from ${formData.name} (${formData.occupation})`,
          message: structuredMessage,
          details: structuredMessage,
          statement: formData.message,
          to_name: 'Dr. Vishwajeet',
          submission_date: new Date().toLocaleDateString('en-US', { dateStyle: 'full' })
        };

        if (publicKey && serviceId && applyTemplateId) {
          await emailjs.send(serviceId, applyTemplateId, templateParams, publicKey);
        }
      } catch (err) {
        console.warn('EmailJS application dispatch:', err);
      }

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (_) {}

      setIsSuccess(true);

      if (onShowToast) {
        onShowToast({
          type: 'success',
          message: 'Your webinar application has been successfully submitted and saved!'
        });
      }

      // Smoothly scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Registration submission error:', error);
      if (onShowToast) {
        onShowToast({
          type: 'error',
          message: error.message || 'Failed to submit registration. Please check your network connection.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      whatsapp: '',
      dob: '',
      email: '',
      occupation: '',
      address: '',
      message: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFF] text-slate-800 font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Top Navbar Header */}
      <header className="sticky top-0 left-0 right-0 z-40 glass-nav py-3 border-b border-slate-200/80 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Back to Home CTA */}
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100/90 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-bold text-xs sm:text-sm transition-all border border-slate-200 hover:border-brand-200 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </button>

          {/* Center Brand */}
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-image.png"
              alt="Dr. Vishwajeet Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-xl shadow-xs"
            />
            <div className="hidden sm:block text-left">
              <span className="block text-sm sm:text-base font-bold text-navy-900 tracking-tight leading-none">
                {doctorData.personal.name}
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wide uppercase">
                IIT Roorkee
              </span>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-navy-900 transition-colors cursor-pointer"
            >
              Main Site
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* Top: Application Form Card */}
          <div id="registration-card" className="w-full">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
              
              {/* Card Header */}
              <div className="px-6 sm:px-8 py-4.5 bg-gradient-to-r from-navy-950 via-brand-900 to-navy-900 text-white">
                <div className="flex items-center justify-between">
                  <div className="py-2 sm:py-3">
                    <span className="text-[10px] font-bold text-brand-300 uppercase tracking-wider block mb-0.5">
                      Free Application & Registration
                    </span>
                    <h2 className="text-base sm:text-xl font-extrabold text-white">
                      Apply for Webinar & Mentorship
                    </h2>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-5 sm:p-7 md:p-8">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-extrabold text-navy-950">
                        Application Submitted!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Thank you for registering, <span className="font-bold text-navy-900">{formData.name}</span>. Dr. Vishwajeet's office will review your application and send the webinar details and joining credentials to your WhatsApp and Email.
                      </p>
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Submit Another Response
                      </button>
                      <button
                        type="button"
                        onClick={onBackToHome}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-navy-900 font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        Back to Portfolio
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    
                    {/* Row 1: Full Name & WhatsApp */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-brand-600" />
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Arvind Sharma"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                            errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/60 focus:bg-white'
                          }`}
                        />
                        {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                            errors.whatsapp ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/60 focus:bg-white'
                          }`}
                        />
                        {errors.whatsapp && <p className="text-[11px] text-red-500 mt-1">{errors.whatsapp}</p>}
                      </div>
                    </div>
                    {/* Row 2: DOB & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-teal-600" />
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                            errors.dob ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/60 focus:bg-white text-slate-800'
                          }`}
                        />
                        {errors.dob && <p className="text-[11px] text-red-500 mt-1">{errors.dob}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-brand-600" />
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. arvind@university.edu"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                            errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/60 focus:bg-white'
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Row 3: Occupation & Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                          Occupation / Role <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.occupation}
                          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                          placeholder="e.g. Research Scholar / Engineer"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                            errors.occupation ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/60 focus:bg-white'
                          }`}
                        />
                        {errors.occupation && <p className="text-[11px] text-red-500 mt-1">{errors.occupation}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-600" />
                          Address / City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="e.g. New Delhi, India"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                            errors.address ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/60 focus:bg-white'
                          }`}
                        />
                        {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
                      </div>
                    </div>

                    {/* Row 4: Message / Statement */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
                        Research Interest / Statement (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly state your research interest, proposed topic, or reason for connection..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white text-xs sm:text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 resize-none"
                      />
                    </div>

                    {/* Submit Action */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-600 via-brand-700 to-navy-900 hover:from-brand-700 hover:to-navy-950 shadow-md hover:shadow-glow transition-all inline-flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer active:scale-98"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Application & Register</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-slate-500 pt-1">
                      🔒 Confidential • Official IIT Roorkee Academic & Mentorship Correspondence
                    </p>

                  </form>
                )}
              </div>

            </div>

          </div>

          {/* Under Form: Host Details Card (Matching provided screenshot) */}
          <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <img
                  src="/images/img1.png"
                  alt="Dr. Vishwajeet"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover object-top rounded-2xl border-2 border-brand-500/20 shadow-sm"
                />
              </div>
              <div className="space-y-1 pt-0.5">
                <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-0.5 border border-sky-100/60">
                  Webinar Host & Mentor
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 tracking-tight">
                  Dr. Vishwajeet
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Ramanujan Fellow & Faculty Member, IIT Roorkee
                </p>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              Doctorate from Wrocław University of Science & Technology, Poland with international research experience at King's College London (UK) and Aarhus University (Denmark). Author of 30+ Q1 international publications.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 text-slate-300 py-8 sm:py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-image.png"
              alt="Dr. Vishwajeet Logo"
              className="w-8 h-8 object-contain rounded-lg bg-white/10 p-0.5"
            />
            <span className="font-semibold text-slate-200">
              © {new Date().getFullYear()} Dr. Vishwajeet. Indian Institute of Technology Roorkee.
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-brand-400 hover:text-white font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Return to Main Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

    </div>
  );
}

