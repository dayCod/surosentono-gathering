"use client";

import { useState } from "react";
import { galleryData, getGalleryByCategory } from "@/data/gallery";
import type { GalleryItem } from "@/data/gallery";
import Lightbox from "@/components/ui/Lightbox";
import SectionTitle from "@/components/ui/SectionTitle";

const categories = [
  { key: "semua", label: "Semua" },
  { key: "keluarga", label: "Keluarga" },
  { key: "acara", label: "Acara" },
  { key: "venue", label: "Venue" },
  { key: "candid", label: "Candid" },
] as const;

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPhotos =
    activeCategory === "semua"
      ? galleryData
      : getGalleryByCategory(activeCategory as GalleryItem["category"]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredPhotos.length - 1 : prev - 1
    );
  };

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Momen Berharga"
          title="Galeri Lengkap"
          description="Kumpulan foto-foto keluarga besar Surosentono"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.key
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-accent/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredPhotos.map((photo, index) => (
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
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                  Lihat Foto
                </span>
              </div>
            </button>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <p className="text-center text-primary/60 text-lg mt-10">
            Belum ada foto untuk kategori ini.
          </p>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filteredPhotos}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
}
