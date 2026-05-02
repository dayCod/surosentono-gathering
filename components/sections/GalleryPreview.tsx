"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
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
    <section id="galeri" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Momen Berharga"
          title="Galeri"
          description="Kumpulan momen indah keluarga besar Surosentono"
        />

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {displayPhotos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="relative group aspect-square rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                  Lihat Foto
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors font-semibold text-lg"
          >
            Lihat Semua Foto
            <ArrowRight size={18} />
          </Link>
        </div>
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
