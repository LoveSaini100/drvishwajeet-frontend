import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function FloatingContact({ onOpenApply }) {
  const whatsappUrl = `https://wa.me/919045065328?text=${encodeURIComponent('Hello Dr. Vishwajeet, I would like to connect regarding research and academic inquiry.')}`;

  return (
    <div className="fixed bottom-6 right-3 z-40 flex flex-col gap-3 items-end pointer-events-auto">
      {/* WhatsApp Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Dr. Vishwajeet on WhatsApp"
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center p-2 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:bg-[#20bd5a] transition-all duration-300 focus:outline-hidden focus:ring-3 focus:ring-[#25D366]/40"
      >
        {/* Subtle Pulse Animation Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-75 pointer-events-none group-hover:opacity-0 transition-opacity" />
        
        {/* WhatsApp Icon */}
        <svg
          className="w-6 h-6 fill-current relative z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Tooltip on Hover (positioned to the left) */}
        <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 bg-navy-950 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 border border-slate-700">
          WhatsApp Chat
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-navy-950" />
        </span>
      </motion.a>

      {/* Floating Apply Now Button */}
      <motion.button
        onClick={onOpenApply}
        aria-label="Apply Now"
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-brand-600 to-navy-900 text-white shadow-xl hover:shadow-2xl hover:from-brand-700 hover:to-navy-950 transition-all duration-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/40 cursor-pointer"
      >
        {/* Subtle Pulse Animation Ring */}
        <span className="absolute -inset-1 rounded-full bg-brand-500/30 animate-pulse pointer-events-none group-hover:opacity-0 transition-opacity" />
        
        {/* Apply Icon */}
        <FileText className="w-6 h-6 stroke-[2.2] relative z-10" />

        {/* Tooltip on Hover (positioned to the left) */}
        <span className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 bg-navy-950 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 border border-slate-700">
          Register Now
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-navy-950" />
        </span>
      </motion.button>
    </div>
  );
}
