import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Phone, Calendar, Mail, Briefcase, MapPin, 
  MessageSquare, Send, CheckCircle2, Sparkles, ShieldCheck 
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

export default function ApplyModal({ isOpen, onClose, onShowToast }) {
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
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ;
      const applyTemplateId = import.meta.env.VITE_EMAILJS_APPLY_TEMPLATE_ID;

      const structuredMessage = `
--- CANDIDATE APPLICATION DETAILS ---
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
        // Universal name identifiers
        from_name: formData.name,
        name: formData.name,
        candidate_name: formData.name,
        full_name: formData.name,

        // Contact identifiers
        from_email: formData.email,
        email: formData.email,
        candidate_email: formData.email,
        reply_to: formData.email,
        phone: formData.whatsapp,
        whatsapp: formData.whatsapp,
        whatsapp_no: formData.whatsapp,

        // Application specifics
        dob: formData.dob,
        date_of_birth: formData.dob,
        occupation: formData.occupation,
        role: formData.occupation,
        address: formData.address,
        location: formData.address,

        // Subject and message body
        subject: `New Application from ${formData.name} (${formData.occupation})`,
        message: structuredMessage,
        details: structuredMessage,
        statement: formData.message,
        to_name: 'Dr. Vishwajeet',
        submission_date: new Date().toLocaleDateString('en-US', { dateStyle: 'full' })
      };

      try {
        await emailjs.send(serviceId, applyTemplateId, templateParams, publicKey);
      } catch (err) {
        console.warn('EmailJS application dispatch:', err);
      }

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (_) {}

      setIsSuccess(true);

      if (onShowToast) {
        onShowToast({
          type: 'success',
          message: 'Your application has been successfully submitted!'
        });
      }

      setTimeout(() => {
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
        onClose();
      }, 2500);

    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-gradient-to-r from-navy-950 via-brand-900 to-navy-900 text-white rounded-t-3xl">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-brand-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Application & Collaboration Form
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close application modal"
                className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6 sm:p-8">
              {isSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-navy-900">Application Received!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for applying. Dr. Vishwajeet's office will review your submission and connect with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Row 1: Full Name & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-brand-600" />
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Arvind Sharma"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                          errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-400 bg-slate-50/60 focus:bg-white'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                          errors.whatsapp ? 'border-red-400 bg-red-50/30' : 'border-slate-400 bg-slate-50/60 focus:bg-white'
                        }`}
                      />
                      {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
                    </div>
                  </div>

                  {/* Row 2: DOB & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                          errors.dob ? 'border-red-400 bg-red-50/30' : 'border-slate-400 bg-slate-50/60 focus:bg-white text-slate-800'
                        }`}
                      />
                      {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-brand-600" />
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. arvind@university.edu"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                          errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-400 bg-slate-50/60 focus:bg-white'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 3: Occupation & Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                        Occupation / Current Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        placeholder="e.g. Research Scholar / Engineer"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                          errors.occupation ? 'border-red-400 bg-red-50/30' : 'border-slate-400 bg-slate-50/60 focus:bg-white'
                        }`}
                      />
                      {errors.occupation && <p className="text-xs text-red-500 mt-1">{errors.occupation}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-600" />
                        Address / City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. New Delhi, India"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                          errors.address ? 'border-red-400 bg-red-50/30' : 'border-slate-400 bg-slate-50/60 focus:bg-white'
                        }`}
                      />
                      {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                    </div>
                  </div>

                  {/* Row 4: Message / Statement */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
                      Message / Purpose of Application
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly state your research interest, proposed topic, or reason for connection..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-400 bg-slate-50/60 focus:bg-white text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-600 via-brand-700 to-navy-900 hover:from-brand-700 hover:to-navy-950 shadow-md hover:shadow-glow transition-all inline-flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
