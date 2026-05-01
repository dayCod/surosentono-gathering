## Deskripsi

Membuat section Gallery Preview yang menampilkan 6-8 foto terbaik sebagai teaser, dengan opsi lightbox (klik untuk memperbesar) dan CTA ke halaman galeri lengkap.

## Konteks

Section ini menampilkan preview foto-foto keluarga/acara. Pre-event bisa diisi foto gathering sebelumnya, post-event diisi foto acara terbaru. Lightbox memungkinkan pengunjung melihat foto lebih besar tanpa meninggalkan halaman.

## Spesifikasi Desain

- **Background:** Putih (`bg-white`)
- **Layout:** Grid 2x3 (mobile) atau 2x4 (desktop)
- **Setiap foto:** Rounded corners, hover effect (scale + overlay)
- **Lightbox:** Modal fullscreen saat foto diklik
- **CTA:** Tombol "Lihat Semua Foto" di bawah grid

## Langkah-Langkah

### 1. Buat `components/ui/Lightbox.tsx`

```typescript
"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  // Tutup dengan Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scroll
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-accent transition-colors z-10"
        aria-label="Tutup"
      >
        <X size={32} />
      </button>

      {/* Navigation */}
      <button
        onClick={onPrev}
        className="absolute left-4 p-2 text-white hover:text-accent transition-colors"
        aria-label="Foto sebelumnya"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 p-2 text-white hover:text-accent transition-colors"
        aria-label="Foto berikutnya"
      >
        <ChevronRight size={40} />
      </button>

      {/* Image */}
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="max-w-[90vw] max-h-[85vh] object-contain"
      />

      {/* Counter */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
}
```

### 2. Buat `components/sections/GalleryPreview.tsx`

```typescript
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

  const featuredPhotos = getFeaturedGallery().slice(0, 8); // Max 8 foto
  const displayPhotos = featuredPhotos.length > 0 ? featuredPhotos : galleryData.slice(0, 8);

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
      <div className="container mx-auto px-4 max-w-6xl">
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
```

### 3. Tambahkan ke `app/page.tsx`

```tsx
import GalleryPreview from "@/components/sections/GalleryPreview";

// Tambahkan setelah Venue (atau FamilyTree jika sudah ada)
<GalleryPreview />
```

## Definition of Done

- [ ] Grid foto tampil dengan layout yang rapi (2 kolom mobile, 4 kolom desktop)
- [ ] Hover effect pada foto (scale + overlay)
- [ ] Klik foto membuka lightbox fullscreen
- [ ] Lightbox: navigasi next/prev berfungsi (tombol + keyboard arrow)
- [ ] Lightbox: close dengan tombol X atau Escape key
- [ ] Lightbox: body scroll disabled saat terbuka
- [ ] Counter foto tampil di lightbox (misal "3 / 8")
- [ ] Tombol "Lihat Semua Foto" mengarah ke `/galeri`
- [ ] Section memiliki `id="galeri"` untuk anchor link
- [ ] Responsive di semua ukuran layar
- [ ] Foto aspect-ratio square (1:1) di grid

## Tips untuk Junior

- `aspect-square` di Tailwind membuat elemen 1:1 ratio
- `object-cover` memastikan foto tidak stretch
- Lightbox harus punya `z-[100]` agar di atas semua elemen termasuk navbar
- `document.body.style.overflow = "hidden"` mencegah scroll saat lightbox terbuka
- Keyboard navigation (Escape, Arrow) penting untuk aksesibilitas
- Jika belum ada foto asli, gunakan placeholder berwarna berbeda agar terlihat grid-nya
