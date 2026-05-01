## Deskripsi

Membuat halaman galeri lengkap (`/galeri`) yang menampilkan semua foto dan video dengan filter kategori dan lightbox.

## Konteks

Halaman ini terpisah dari landing page karena kontennya bisa sangat banyak (terutama post-event). Pengunjung bisa filter foto berdasarkan kategori dan melihat foto dalam lightbox.

## Spesifikasi Desain

- **URL:** `/galeri`
- **Layout:** Full page dengan header, filter tabs, grid foto, dan lightbox
- **Filter:** Tabs kategori (Semua, Keluarga, Venue, Acara, Candid)
- **Grid:** Masonry-like atau uniform grid
- **Lightbox:** Sama seperti di GalleryPreview (reuse komponen)
- **Video:** Embed YouTube jika ada

## Langkah-Langkah

### 1. Buat `app/galeri/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { galleryData, GalleryItem } from "@/data/gallery";
import Lightbox from "@/components/ui/Lightbox";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const categories = [
  { key: "semua", label: "Semua" },
  { key: "keluarga", label: "Keluarga" },
  { key: "venue", label: "Venue" },
  { key: "acara", label: "Acara" },
  { key: "candid", label: "Candid" },
];

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPhotos =
    activeCategory === "semua"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="container mx-auto px-4 max-w-6xl py-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-dark mb-2">
          Galeri Foto
        </h1>
        <p className="text-primary/60 text-lg">
          Kumpulan momen indah keluarga besar Surosentono
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-4 max-w-6xl mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.key
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-accent/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="container mx-auto px-4 max-w-6xl pb-20">
        {filteredPhotos.length === 0 ? (
          <p className="text-center text-primary/50 py-12">
            Belum ada foto untuk kategori ini.
          </p>
        ) : (
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
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filteredPhotos}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() =>
          setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length)
        }
        onPrev={() =>
          setCurrentIndex((prev) =>
            prev === 0 ? filteredPhotos.length - 1 : prev - 1
          )
        }
      />
    </div>
  );
}
```

### 2. Pastikan Static Export Support

Karena menggunakan `output: 'export'`, halaman `/galeri` akan otomatis di-generate sebagai static HTML. Tidak perlu konfigurasi tambahan.

### 3. Update Link di GalleryPreview

Pastikan tombol "Lihat Semua Foto" di section GalleryPreview mengarah ke `/galeri`:

```tsx
<Link href="/galeri">Lihat Semua Foto</Link>
```

## Definition of Done

- [ ] Halaman `/galeri` bisa diakses
- [ ] Filter kategori berfungsi (klik tab = filter foto)
- [ ] Grid foto tampil dengan layout rapi
- [ ] Lightbox berfungsi (klik foto = fullscreen)
- [ ] Navigasi lightbox (next/prev/close) berfungsi
- [ ] Tombol "Kembali ke Beranda" berfungsi
- [ ] Empty state tampil jika kategori kosong
- [ ] Lazy loading pada gambar (`loading="lazy"`)
- [ ] Responsive di semua ukuran layar
- [ ] Page title/metadata sesuai

## Tips untuk Junior

- Halaman ini reuse komponen `Lightbox` yang sudah dibuat di issue #9
- `loading="lazy"` penting karena halaman ini bisa punya banyak gambar
- Filter menggunakan state sederhana, tidak perlu URL params
- `pt-20` di container atas untuk memberi ruang di bawah navbar (yang fixed/sticky)
- Test dengan banyak foto (10+) untuk memastikan performance tetap baik
- Jika foto sangat banyak, pertimbangkan pagination atau "Load More" button
