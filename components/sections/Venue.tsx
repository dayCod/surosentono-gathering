"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
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

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % venueData.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? venueData.images.length - 1 : prev - 1
    );
  };

  return (
    <section id="lokasi" className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Lokasi Acara"
          title="Venue & Peta"
          description="Informasi lengkap lokasi acara dan cara menuju ke sana"
        />

        {/* Maps + Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Google Maps Embed */}
          <div className="rounded-xl overflow-hidden shadow-md h-[300px] md:h-[400px]">
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

          {/* Info Venue */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-heading font-bold text-primary-dark mb-2">
                {venueData.nama}
              </h3>
              <p className="text-primary/70 flex items-start gap-2">
                <MapPin size={18} className="mt-1 shrink-0" />
                {venueData.alamat}
              </p>
            </div>

            {/* Tombol Google Maps */}
            <a
              href={venueData.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors font-semibold"
            >
              <MapPin size={18} />
              Buka di Google Maps
              <ExternalLink size={14} />
            </a>

            {/* Fasilitas */}
            <div>
              <h4 className="font-semibold text-primary-dark mb-2 flex items-center gap-2">
                <Car size={18} /> Fasilitas
              </h4>
              <div className="flex flex-wrap gap-2">
                {venueData.fasilitas.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-accent/10 text-primary rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Dress Code */}
            <div>
              <h4 className="font-semibold text-primary-dark mb-2 flex items-center gap-2">
                <Shirt size={18} /> Dress Code
              </h4>
              <p className="text-primary/70">{venueData.dressCode}</p>
            </div>
          </div>
        </div>

        {/* Galeri Venue - Carousel */}
        {venueData.images.length > 0 && (
          <div className="relative">
            <h3 className="text-xl font-heading font-bold text-primary-dark mb-4 text-center">
              Suasana Venue
            </h3>
            <div className="relative rounded-xl overflow-hidden h-[250px] md:h-[400px]">
              <img
                src={venueData.images[currentImage].src}
                alt={venueData.images[currentImage].alt}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Navigation Arrows */}
              {venueData.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Foto sebelumnya"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Foto berikutnya"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {venueData.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      idx === currentImage ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Lihat foto ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Petunjuk Arah */}
        {venueData.petunjukArah.length > 0 && (
          <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-heading font-bold text-primary-dark mb-4">
              Petunjuk Arah
            </h3>
            <ol className="space-y-2">
              {venueData.petunjukArah.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-primary/70"
                >
                  <span className="shrink-0 w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
