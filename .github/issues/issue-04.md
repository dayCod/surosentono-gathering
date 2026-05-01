## Deskripsi

Membuat Hero Section - bagian pertama yang dilihat pengunjung saat membuka website. Harus langsung menarik perhatian dan memberikan informasi utama acara.

## Konteks

Hero section adalah "first impression" website. Harus:
- Langsung menjelaskan ini acara apa
- Menampilkan tanggal dan lokasi
- Memiliki CTA (Call to Action) yang jelas
- Visual yang memukau (foto/video background)

**Target:** Pengunjung langsung paham ini undangan gathering dan tertarik scroll ke bawah.

## Spesifikasi Desain

- **Layout:** Full viewport height (100vh)
- **Background:** Foto keluarga dengan overlay gelap (gradient)
- **Konten (centered):**
  - Teks kecil: "Undangan Gathering"
  - Judul besar: "Keluarga Surosentono 2025"
  - Tagline: "Mempererat Tali Silaturahmi"
  - Info: Tanggal + Lokasi
  - 2 Tombol CTA:
    - Primary: "Konfirmasi Kehadiran" (link ke Google Form/WA)
    - Secondary: "Lihat Detail" (scroll ke section berikutnya)
- **Animasi:** Fade-in dari bawah saat page load
- **Scroll indicator:** Panah/chevron animasi di bawah

## Langkah-Langkah

### 1. Buat `components/sections/Hero.tsx`

```typescript
"use client";

import { motion } from "framer-motion";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
import { eventData } from "@/data/event";
import { SITE_CONFIG } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image + Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Animasi fade-in dari bawah */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-accent font-accent text-xl md:text-2xl mb-4">
            Undangan Gathering
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          Keluarga Surosentono
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/80 mb-8"
        >
          {eventData.tagline}
        </motion.p>

        {/* Info tanggal & lokasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-white/90"
        >
          <span className="flex items-center gap-2">
            <Calendar size={18} />
            {/* Format tanggal yang readable */}
            <span>17 Agustus 2025</span>
          </span>
          <span className="hidden sm:block">|</span>
          <span className="flex items-center gap-2">
            <MapPin size={18} />
            <span>Bogor, Jawa Barat</span>
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={SITE_CONFIG.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-accent text-primary-dark font-semibold rounded-full hover:bg-accent/90 transition-colors text-lg"
          >
            Konfirmasi Kehadiran
          </a>
          <a
            href="#tentang"
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-lg"
          >
            Lihat Detail
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#tentang" aria-label="Scroll ke bawah">
          <ChevronDown size={32} className="text-white animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
```

### 2. Siapkan Background Image

- Taruh foto di `public/images/hero/hero-bg.jpg`
- Ukuran ideal: 1920x1080px
- Compress ke < 300KB (gunakan Squoosh atau TinyPNG)
- Jika belum ada foto asli, gunakan placeholder landscape

### 3. Integrasikan di `app/page.tsx`

```tsx
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Section lain akan ditambahkan di issue berikutnya */}
    </>
  );
}
```

## Checklist Responsiveness

- [ ] Mobile (< 640px): Judul 4xl, tombol stack vertikal, padding cukup
- [ ] Tablet (640-1024px): Judul 6xl, tombol horizontal
- [ ] Desktop (> 1024px): Judul 7xl, spacing lebih lega

## Definition of Done

- [ ] Hero section tampil full viewport height
- [ ] Background image dengan overlay gradient terlihat baik
- [ ] Teks judul, tagline, tanggal, lokasi tampil dengan benar
- [ ] Tombol "Konfirmasi Kehadiran" mengarah ke Google Form (new tab)
- [ ] Tombol "Lihat Detail" smooth scroll ke section berikutnya
- [ ] Animasi fade-in berjalan saat page load
- [ ] Scroll indicator (chevron) tampil dan bounce
- [ ] Responsive di mobile, tablet, dan desktop
- [ ] Tidak ada teks yang terpotong di layar kecil

## Tips untuk Junior

- `"use client"` wajib karena menggunakan Framer Motion
- Pastikan `id="beranda"` ada agar navbar link berfungsi
- Overlay gradient penting agar teks tetap terbaca di atas foto
- Test dengan foto yang berbeda-beda (terang/gelap) untuk memastikan teks selalu readable
- `min-h-screen` lebih baik dari `h-screen` untuk menghindari overflow di mobile
