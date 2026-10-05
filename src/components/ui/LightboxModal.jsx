import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function LightboxModal({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  setCurrentIndex
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images]);

  if (!isOpen || images.length === 0) return null;

  const currentItem = images[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 focus:outline-hidden focus:ring-2 focus:ring-white/50"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-all z-50 hover:scale-110 focus:outline-hidden"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-all z-50 hover:scale-110 focus:outline-hidden"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Content Container */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black/40 border border-white/10">
            <img
              src={currentItem.src}
              alt={currentItem.caption || `Dr. Vishwajeet Activity Photo ${currentIndex + 1}`}
              className="max-h-[72vh] w-auto max-w-full object-contain mx-auto"
            />
          </div>

          {/* Caption & Counter */}
          <div className="mt-4 text-center px-4">
            <p className="text-white text-base sm:text-lg font-medium">
              {currentItem.caption}
            </p>
            {currentItem.category && (
              <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold text-brand-300 bg-brand-950/60 rounded-full border border-brand-800/60">
                {currentItem.category}
              </span>
            )}
            <p className="text-xs text-slate-400 mt-1.5">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
