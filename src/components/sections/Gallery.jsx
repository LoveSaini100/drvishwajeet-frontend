import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Calendar, MapPin, ZoomIn, ArrowRight, BookOpen } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import LightboxModal from '../ui/LightboxModal';
import { doctorData } from '../../data/doctorData';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filterCategories = ['All', 'Speaking', 'Outreach', 'Mentorship', 'Honors'];

  const filteredImages = activeFilter === 'All'
    ? doctorData.gallery
    : doctorData.gallery.filter((img) => img.category === activeFilter);

  const openLightbox = (index) => {
    // Find index in full gallery array
    const originalIndex = doctorData.gallery.findIndex((img) => img.src === filteredImages[index].src);
    setCurrentImageIndex(originalIndex !== -1 ? originalIndex : 0);
    setIsLightboxOpen(true);
  };

  const activity = doctorData.recentActivities[0];

  return (
    <section id="gallery" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Outreach & Media"
          title="Recent Activities, Talks & Outreach"
          subtitle="Engaging with academic institutions, youth mentorship, and scientific conferences."
        />

        {/* Featured Outreach Spotlight: DPS Bopal Talk */}
        {activity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 rounded-3xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Text Side */}
              <div className="lg:col-span-7 p-3 sm:p-5 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                      {activity.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {activity.date}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {activity.venue}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900 leading-snug">
                    {activity.title}
                  </h3>

                  <p className="mt-3 text-justify text-sm sm:text-base text-slate-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-500">
                    Department of Mechanical & Industrial Engineering, IIT Roorkee
                  </span>
                  <button
                    onClick={() => openLightbox(0)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-navy-900 transition-colors"
                  >
                    <span>View Event Photos ({doctorData.gallery.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Visual Spotlight Side */}
              <div className="lg:col-span-5 bg-slate-900 relative min-h-[260px] lg:min-h-full cursor-pointer group" onClick={() => openLightbox(0)}>
                <img
                  src="/images/a6.png"
                  alt="Dr. Vishwajeet speaking at DPS Bopal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-bold text-brand-300">Featured Photograph</p>
                    <p className="text-sm font-semibold">Keynote address to Grade XII Science students</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white group-hover:bg-brand-600 transition-colors">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Section Sub-heading above filters */}
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
            Our Outreach Programs & Activities
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse through talks, workshops, mentorship sessions, and honors
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs hover:shadow-premium cursor-pointer aspect-4/3"
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-md">
                    {img.category}
                  </span>
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-snug">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={doctorData.gallery}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />
    </section>
  );
}
