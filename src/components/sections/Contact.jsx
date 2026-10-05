import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, Send, Phone, Check, Copy, 
  Linkedin, GraduationCap, BookOpen, Clock, Building, Sparkles 
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import SectionHeading from '../ui/SectionHeading';
import { doctorData } from '../../data/doctorData';
import { api } from '../../services/api';

export default function Contact({ onShowToast }) {
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Research Collaboration',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // EmailJS Configuration from environment or defaults
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_vishwajeet';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_vishwajeet';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Hag8mPTUZ_m_btW25';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(doctorData.personal.email);
    setCopied(true);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        message: 'Official email copied to clipboard!'
      });
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Please provide a message or inquiry details';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // 1. Save directly to MongoDB Database via Backend API
      await api.submitContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      // 2. Dispatch EmailJS notification if configured
      try {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: doctorData.personal.name,
          to_email: doctorData.personal.email,
        };
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
      } catch (eJsErr) {
        console.warn('EmailJS delivery fallback:', eJsErr);
      }

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (_) {}

      if (onShowToast) {
        onShowToast({
          type: 'success',
          message: 'Inquiry received and recorded for Dr. Vishwajeet!'
        });
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: 'Research Collaboration',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Contact submission error:', error);
      
      if (onShowToast) {
        onShowToast({
          type: 'error',
          message: error.message || 'Unable to submit inquiry at this moment.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-slate-50/80 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Get in Touch"
          title="Connect for Research, Mentorship & Collaboration"
          subtitle="Interested in research collaboration, technical consulting, academic lectures, or student supervision?"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-12 items-stretch">
          
          {/* Left Column: Direct Office Details & Channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 h-full flex flex-col"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs h-full flex-1 flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-navy-900">
                    Official Communication
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    You can reach out directly via institutional email or visit my office at IIT Roorkee.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {/* Email Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Official IIT Roorkee Email
                      </span>
                      <button
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-navy-900 transition-colors cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <a
                      href={`mailto:${doctorData.personal.email}`}
                      className="block text-sm sm:text-base font-bold text-brand-700 hover:text-brand-800 break-all select-all transition-colors"
                    >
                      {doctorData.personal.email}
                    </a>
                  </div>

                  {/* Direct Phone & WhatsApp Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Direct Phone & WhatsApp
                    </span>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={`tel:${doctorData.personal.phoneRaw || '+919045065328'}`}
                        className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-navy-900 hover:text-brand-600 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-brand-600" />
                        <span>{doctorData.personal.phone || '+91 90450 65328'}</span>
                      </a>
                      <a
                        href={`https://wa.me/919045065328?text=${encodeURIComponent('Hello Dr. Vishwajeet, I would like to connect regarding research/advisory.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 transition-colors"
                      >
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Office Location Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Office & Department Location
                    </span>
                    <p className="text-sm font-semibold text-navy-900">
                      Room No. 261, East Block
                    </p>
                    <p className="text-xs text-slate-600">
                      Department of Mechanical & Industrial Engineering
                    </p>
                    <p className="text-xs text-slate-500">
                      Indian Institute of Technology (IIT) Roorkee, Uttarakhand 247667, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic & Professional Profiles */}
             

            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 h-full flex flex-col"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs h-full flex-1 flex flex-col justify-between space-y-6">
              
              <div className="mb-2">
                <h3 className="text-xl font-bold text-navy-900">
                  Send a Direct Message
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Fill out the form below to initiate collaboration, technical discussions, or student inquiry.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Prof. Arvind Sharma"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                          errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-400 bg-slate-50/60 focus:bg-white'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. arvind@university.edu"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 ${
                          errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-400 bg-slate-50/60 focus:bg-white'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Subject / Area of Interest
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-400 bg-slate-50/60 focus:bg-white text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 text-slate-800"
                    >
                      <option value="Research Collaboration">Research Collaboration (Universities / Labs)</option>
                      <option value="Waste-to-Energy Consulting">Waste-to-Energy & Industrial Consulting</option>
                      <option value="Green Hydrogen Advisory">Green Hydrogen & Decarbonization Advisory</option>
                      <option value="Academic Mentorship / Ph.D. Inquiry">Academic Mentorship / Ph.D. Inquiry</option>
                      <option value="Keynote / Guest Lecture Invitation">Keynote / Guest Lecture Invitation</option>
                      <option value="General Academic Inquiry">General Academic Inquiry</option>
                    </select>
                  </div>

                  {/* Message Body */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message / Proposal <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your proposal, collaboration ideas, or research inquiries..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500 resize-none ${
                        errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-400 bg-slate-50/60 focus:bg-white'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 via-brand-700 to-navy-900 hover:from-brand-700 hover:to-navy-950 shadow-md hover:shadow-glow transition-all inline-flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
