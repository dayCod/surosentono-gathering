"use client";

import { useState, useEffect, useCallback } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { venueData } from "@/data/venue";
import {
  MapPin,
  Car,
  Shirt,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function Venue() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % venueData.images.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) =>
      prev === 0 ? venueData.images.length - 1 : prev - 1
    );
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying || venueData.images.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextImage]);

  // Pause autoplay on user interaction, resume after delay
  const handleUserInteraction = (action: () => void) => {
    setIsAutoPlaying(false);
    action();
    // Resume autoplay after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section id="lokasi" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="Lokasi Acara"
            title="Venue & Peta"
            description="Informasi lengkap lokasi acara dan cara menuju ke sana"
          />
        </ScrollReveal>

        {/* Maps + Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Google Maps Embed */}
          <ScrollReveal direction="left">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 h-[300px] md:h-[400px] border border-white/5">
              <iframe
                src={venueData.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Venue"
              />
            </div>
          </ScrollReveal>

          {/* Info Venue */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-heading font-bold text-white mb-3 tracking-tight">
                  {venueData.nama}
                </h3>
                <p className="text-foreground-secondary flex items-start gap-3 leading-relaxed">
                  <MapPin size={20} className="mt-1 shrink-0 text-accent" />
                  {venueData.alamat}
                </p>
              </div>

              {/* Tombol Google Maps */}
              <a
                href={venueData.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-dark rounded-full hover:bg-accent-hover hover:scale-105 transition-all font-bold shadow-xl shadow-accent/20"
              >
                <MapPin size={20} />
                Buka di Google Maps
                <ExternalLink size={16} />
              </a>

              {/* Fasilitas */}
              <div>
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Car size={20} className="text-accent" /> Fasilitas yang didapatkan
                </h4>
                <div className="flex flex-wrap gap-2">
                  {venueData.fasilitas.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dress Code */}
              <div className="p-4 bg-background-card/50 backdrop-blur-sm border border-white/5 rounded-xl">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Shirt size={20} className="text-accent" /> Dress Code
                </h4>
                <p className="text-foreground-secondary">{venueData.dressCode}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Galeri Venue - Carousel */}
        {venueData.images.length > 0 && (
          <ScrollReveal>
            <div className="relative">
              <h3 className="text-2xl font-heading font-bold text-white mb-6 text-center">
                Suasana Venue
              </h3>
              <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[500px] border border-white/5 shadow-2xl">
                {/* Stacked images for smooth crossfade */}
                {venueData.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      idx === currentImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
                    }`}
                  />
                ))}

                {/* Image overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Navigation Arrows */}
                {venueData.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleUserInteraction(prevImage)}
                      className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-accent hover:text-primary-dark transition-all z-20"
                      aria-label="Foto sebelumnya"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => handleUserInteraction(nextImage)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-accent hover:text-primary-dark transition-all z-20"
                      aria-label="Foto berikutnya"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  {venueData.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUserInteraction(() => setCurrentImage(idx))}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentImage ? "bg-accent w-8" : "bg-white/30 w-2 hover:bg-white/50"
                      }`}
                      aria-label={`Lihat foto ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Petunjuk Arah */}
        {venueData.petunjukArah.length > 0 && (
          <ScrollReveal delay={0.2}>
            <div className="mt-12 bg-background-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-8 shadow-xl shadow-black/20">
              <h3 className="text-2xl font-heading font-bold text-white mb-6">
                Petunjuk Arah
              </h3>
              <ol className="space-y-4">
                {venueData.petunjukArah.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 text-foreground-secondary text-lg"
                  >
                    <span className="shrink-0 w-8 h-8 bg-accent/20 text-accent rounded-xl flex items-center justify-center text-sm font-bold border border-accent/20">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
