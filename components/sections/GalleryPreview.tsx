"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Lightbox from "@/components/ui/Lightbox";
import { getFeaturedGallery, galleryData } from "@/data/gallery";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GalleryPreview() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredPhotos = getFeaturedGallery().slice(0, 8);
  const displayPhotos =
    featuredPhotos.length > 0 ? featuredPhotos : galleryData.slice(0, 8);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % displayPhotos.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayPhotos.length - 1 : prev - 1
    );
  };

  return (
    <section id="galeri" className="py-20 md:py-28 bg-background-alt/70 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[70px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 blur-[70px] rounded-full translate-x-1/2 translate-y-1/2" />

      {/* Background Texture Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img
          src="/images/branding/texture-background.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="Momen Berharga"
            title="Galeri"
            description="Kumpulan momen indah keluarga besar Surosentono"
          />
        </ScrollReveal>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {displayPhotos.map((photo, index) => (
            <ScrollReveal key={photo.id} delay={index * 0.05}>
              <button
                onClick={() => openLightbox(index)}
                className="relative group aspect-square rounded-2xl overflow-hidden cursor-pointer w-full border border-white/5 shadow-lg"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/60 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100">
                  <div className="p-3 bg-accent text-primary-dark rounded-full scale-50 group-hover:scale-100 transition-transform duration-300">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10 md:mt-12">
            <Link
              href="/galeri"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-10 md:py-4 bg-accent text-primary-dark rounded-full hover:bg-accent-hover hover:scale-105 transition-all font-bold text-base md:text-lg shadow-xl shadow-accent/20"
            >
              Lihat Semua Foto
              <ArrowRight size={20} className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={displayPhotos}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
}
