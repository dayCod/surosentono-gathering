# Plan Website Gathering Keluarga Surosentono

## 1. Ringkasan Proyek

**Nama Proyek:** Website Gathering Keluarga Surosentono  
**Tujuan:** Wadah digital untuk mengenang, mempererat silaturahmi, dan menarik engagement keluarga besar Surosentono  
**Lokasi Acara:** Bogor, Jawa Barat  
**Target Pengunjung:** Keluarga besar Surosentono (usia 20-70 tahun)  
**Teknologi:** Next.js (Static Export) + Vercel (Free Tier)  
**Arsitektur:** Fully Static — tanpa database, tanpa backend/API

---

## 2. Rekomendasi Arsitektur: Static Site (Multi-Section Landing Page)

### Mengapa Static Site?

| Aspek | Alasan |
|-------|--------|
| **Kecepatan Maksimal** | Tidak ada server request, semua di-serve langsung dari CDN |
| **Gratis Sepenuhnya** | Tidak perlu bayar database hosting, cukup Vercel free tier |
| **Zero Maintenance** | Tidak ada database yang perlu di-maintain, backup, atau monitor |
| **Keamanan** | Tidak ada endpoint API yang bisa diserang |
| **Reliability** | Tidak akan down karena database mati |
| **Simple Deploy** | Push ke GitHub → otomatis deploy di Vercel |

### Mengapa Landing Page (Single Page dengan Scroll)?

| Aspek | Alasan |
|-------|--------|
| **Aksesibilitas Usia** | Navigasi sederhana, cukup scroll ke bawah — ramah untuk usia 50-70 tahun |
| **Engagement** | Storytelling mengalir dari atas ke bawah, pengunjung langsung "tersedot" |
| **Performance** | Satu halaman = load sekali, tidak perlu berpindah-pindah page |
| **Mobile First** | Mayoritas akan buka via HP, scroll lebih natural daripada klik menu |
| **SEO & Sharing** | Satu URL mudah dibagikan di grup WhatsApp keluarga |

### Pendekatan Data: Hardcoded + JSON/TypeScript Constants

Semua data (rundown, galeri, pesan, dll) disimpan langsung di file TypeScript sebagai constants. Update konten = update code → push → auto deploy.

---

## 3. Struktur Halaman & Section

### A. Halaman Utama (Landing Page - Single Scroll)

```
1. Hero Section
2. Tentang Acara
3. Countdown Timer
4. Jadwal & Rundown Acara
5. Venue & Lokasi (Maps + Galeri Venue)
6. Pohon Keluarga / Silsilah Singkat
7. Galeri Preview (Teaser)
8. Pesan & Harapan (Statis / Curated)
9. RSVP (Redirect ke Google Form / WhatsApp)
10. Footer (Kontak & Sosial Media)
```

### B. Halaman Terpisah (Opsional)

```
- /galeri          → Galeri Foto & Video lengkap (post-event)
```

---

## 4. Detail Setiap Section

### 4.1 Hero Section
- **Konten:** Judul besar "Gathering Keluarga Surosentono 2025", tagline emosional, tanggal acara
- **Visual:** Background video/foto keluarga dengan overlay gelap + teks putih
- **CTA:** Tombol "Lihat Detail Acara" (scroll ke bawah) & "Konfirmasi Kehadiran" (ke Google Form/WA)
- **Animasi:** Parallax ringan, fade-in text

### 4.2 Tentang Acara
- **Konten:** Cerita singkat mengapa acara ini diadakan, visi mempererat silaturahmi
- **Visual:** Foto keluarga lama + baru (side by side), ornamen Sunda
- **Tone:** Hangat, emosional, menggunakan bahasa yang inklusif

### 4.3 Countdown Timer
- **Konten:** Hitung mundur menuju hari-H (client-side JavaScript)
- **Visual:** Angka besar dengan animasi flip/slide
- **Post-event:** Berubah menjadi "Terima kasih telah hadir!" (kondisi di-hardcode setelah acara)

### 4.4 Jadwal & Rundown Acara
- **Konten:** Timeline vertikal dengan jam, kegiatan, dan deskripsi singkat
- **Data:** Disimpan di file `data/rundown.ts` sebagai array of objects
- **Visual:** Timeline card dengan ikon per kegiatan
- **Interaksi:** Hover/tap untuk detail lebih lanjut
- **Contoh Kegiatan:**
  - Registrasi & Welcome Coffee
  - Pembukaan & Sambutan
  - Sesi Foto Keluarga Besar
  - Games & Aktivitas Bersama
  - Makan Siang Bersama
  - Sesi Sharing & Cerita
  - Doorprize & Penutupan

### 4.5 Venue & Lokasi
- **Konten:** Nama venue, alamat lengkap, embedded Google Maps (iframe)
- **Galeri Venue:** Carousel foto & video venue (suasana, fasilitas)
- **Tambahan:** Tombol "Buka di Google Maps" (link langsung ke Google Maps)
- **Info Praktis:** Petunjuk arah, parkir, dress code

### 4.6 Pohon Keluarga / Silsilah Singkat (REKOMENDASI TAMBAHAN)
- **Konten:** Visualisasi sederhana silsilah keluarga Surosentono
- **Visual:** Infografis statis atau tree diagram dengan CSS/SVG
- **Data:** Disimpan di `data/family-tree.ts`
- **Tujuan:** Mengingatkan hubungan antar keluarga, terutama generasi muda

### 4.7 Galeri Preview
- **Konten:** 6-8 foto terbaik sebagai teaser
- **Pre-event:** Foto-foto gathering sebelumnya / foto keluarga
- **Post-event:** Foto-foto terbaik dari acara
- **Data:** Array gambar di `data/gallery.ts`
- **CTA:** "Lihat Semua Foto" → ke halaman /galeri
- **Lightbox:** Klik foto untuk memperbesar (client-side modal)

### 4.8 Pesan & Harapan (REKOMENDASI TAMBAHAN)
- **Konten:** Pesan-pesan terkurasi dari anggota keluarga (di-hardcode)
- **Visual:** Card-based layout, seperti testimonial wall
- **Data:** Disimpan di `data/messages.ts` — dikumpulkan manual via WA lalu dimasukkan ke code
- **Emosional:** Bisa jadi kenangan digital yang indah

### 4.9 RSVP / Konfirmasi Kehadiran
- **Pendekatan Static:** Tidak pakai form sendiri, redirect ke:
  - **Google Form** (gratis, data masuk ke Google Sheets) — REKOMENDASI
  - Atau langsung ke **WhatsApp** panitia dengan pesan pre-filled
- **Visual:** Section dengan info singkat + tombol besar "Konfirmasi Kehadiran"
- **Tambahan:** Tampilkan QR Code Google Form untuk yang buka di desktop

### 4.10 Footer
- **Konten:** Kontak panitia (WhatsApp), sosial media, credit
- **Quick Links:** Navigasi ke semua section (anchor links)
- **Copyright:** "Keluarga Besar Surosentono © 2025"

---

## 5. Rekomendasi Tambahan (Yang Belum Terpikirkan)

### 5.1 Fitur Pre-Event
| Fitur | Fungsi | Implementasi Static |
|-------|--------|---------------------|
| **RSVP** | Konfirmasi kehadiran | Google Form embed/link |
| **Countdown Timer** | Membangun antusiasme | Client-side JS |
| **Teaser Video** | Video pendek undangan digital | YouTube embed |
| **Info Transportasi** | Rute dari berbagai kota ke Bogor | Google Maps link + teks |
| **Dress Code Guide** | Visual guide pakaian | Gambar/infografis statis |

### 5.2 Fitur Post-Event (Update Konten Setelah Acara)
| Fitur | Fungsi | Implementasi Static |
|-------|--------|---------------------|
| **Galeri Foto & Video** | Dokumentasi lengkap | Optimized images di /public atau Cloudinary |
| **Video Highlight** | Recap video 2-3 menit | YouTube embed |
| **Pesan Kesan** | Kesan & pesan peserta | Hardcoded dari data yang dikumpulkan |
| **Download Foto** | Peserta bisa download foto | Link ke Google Drive / Cloudinary |

### 5.3 Fitur Engagement
| Fitur | Fungsi | Implementasi Static |
|-------|--------|---------------------|
| **Pohon Keluarga** | Visualisasi silsilah | SVG/CSS tree diagram |
| **Memory Lane** | Timeline sejarah keluarga | Section dengan foto-foto lama |
| **Ucapan Terima Kasih** | Halaman khusus post-event | Update hero section |
| **Share Button** | Bagikan ke WA/IG | Link share dengan OG meta |

---

## 6. Desain UI/UX

### 6.1 Color Palette

```
Primary:      #6B4226  (Coklat Tua - Sunda/Earthy)
Secondary:    #A67B5B  (Coklat Muda - Warm)
Accent:       #D4A574  (Gold/Emas - Elegan)
Background:   #FDF8F3  (Cream - Hangat)
Text Dark:    #2C1810  (Coklat Sangat Tua)
Text Light:   #FFFFFF  (Putih)
Success:      #4A7C59  (Hijau Daun - Natural)
```

### 6.2 Typography

```
Heading:    "Playfair Display" (Serif - Elegan, mudah dibaca semua usia)
Body:       "Inter" atau "Plus Jakarta Sans" (Sans-serif - Modern, readable)
Accent:     "Dancing Script" (Untuk quote/tagline emosional)
```

**Ukuran Font (Responsive):**
- Heading: 32-48px (desktop), 24-36px (mobile)
- Body: 18-20px (desktop), 16-18px (mobile) → LEBIH BESAR dari standar untuk usia 50+
- Caption: 14-16px

### 6.3 Prinsip UX untuk Usia 20-70 Tahun

| Prinsip | Implementasi |
|---------|-------------|
| **Font Besar** | Minimum 16px body text, heading 24px+ |
| **Kontras Tinggi** | Teks gelap di background terang, rasio minimal 4.5:1 |
| **Tombol Besar** | Minimum 48x48px touch target |
| **Navigasi Sederhana** | Sticky navbar dengan max 5 menu item |
| **Loading Cepat** | Static site = instan dari CDN |
| **Bahasa Sederhana** | Hindari jargon, gunakan bahasa sehari-hari |
| **Visual Dominan** | Lebih banyak gambar daripada teks panjang |
| **Feedback Jelas** | Animasi subtle saat klik tombol |
| **WhatsApp Integration** | Tombol WA floating untuk bertanya langsung |
| **Scroll Indicator** | Dot navigation di sisi kanan untuk orientasi |

### 6.4 Elemen Visual Sunda

- Motif batik mega mendung sebagai border/divider
- Ornamen ukiran Sunda sebagai dekorasi section
- Warna earth tone yang merepresentasikan tanah Sunda
- Ilustrasi wayang atau motif tradisional sebagai aksen

### 6.5 Animasi & Interaksi

- **Scroll Reveal:** Section muncul dengan fade-up saat di-scroll
- **Parallax Ringan:** Hanya di hero section
- **Hover Effects:** Subtle scale & shadow pada card
- **Page Transition:** Smooth scroll antar section
- **Countdown Flip:** Animasi angka berubah pada countdown timer

---

## 7. Teknologi & Arsitektur

### 7.1 Tech Stack

```
Framework:      Next.js 14+ (App Router, Static Export)
Styling:        Tailwind CSS
Animasi:        Framer Motion
Hosting:        Vercel (Free Tier) — static deployment
Image Hosting:  /public folder (optimized) + Next.js Image component
Video:          YouTube embed
Maps:           Google Maps Embed (iframe, gratis)
Icons:          Lucide React
Font:           Google Fonts (next/font)
```

### 7.2 Data Management (Tanpa Database)

Semua data disimpan sebagai TypeScript constants di folder `data/`:

```typescript
// data/rundown.ts
export const rundownData = [
  {
    id: 1,
    waktuMulai: "07:00",
    waktuSelesai: "08:00",
    judul: "Registrasi & Welcome Coffee",
    deskripsi: "Pendaftaran peserta dan menikmati kopi pagi",
    ikon: "coffee",
  },
  // ...
];

// data/gallery.ts
export const galleryData = [
  {
    id: 1,
    src: "/images/gallery/foto-1.jpg",
    alt: "Foto keluarga besar",
    category: "keluarga",
  },
  // ...
];

// data/venue.ts
export const venueData = {
  nama: "Nama Venue",
  alamat: "Alamat lengkap, Bogor, Jawa Barat",
  mapsEmbed: "https://maps.google.com/...",
  mapsLink: "https://goo.gl/maps/...",
  fasilitas: ["Parkir Luas", "Mushola", "Playground Anak"],
  images: ["/images/venue/venue-1.jpg", ...],
};

// data/family-tree.ts
export const familyTreeData = { ... };

// data/messages.ts
export const messagesData = [
  { nama: "Pak Ade", pesan: "Semoga silaturahmi kita...", foto: "/images/..." },
  // ...
];

// data/event.ts
export const eventData = {
  nama: "Gathering Keluarga Surosentono 2025",
  tanggal: "2025-XX-XX",
  tagline: "Mempererat Tali Silaturahmi",
  deskripsi: "...",
};
```

### 7.3 Folder Structure (Next.js App Router - Static)

```
surosentono-gathering/
├── app/
│   ├── layout.tsx              # Root layout + fonts + metadata
│   ├── page.tsx                # Landing page (semua section)
│   └── galeri/
│       └── page.tsx            # Halaman galeri lengkap (opsional)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky navigation
│   │   ├── Footer.tsx          # Footer dengan kontak
│   │   └── FloatingWhatsApp.tsx # Tombol WA floating
│   ├── sections/
│   │   ├── Hero.tsx            # Hero dengan CTA
│   │   ├── About.tsx           # Tentang acara
│   │   ├── Countdown.tsx       # Timer countdown (client component)
│   │   ├── Rundown.tsx         # Jadwal acara
│   │   ├── Venue.tsx           # Venue + Maps + Galeri venue
│   │   ├── FamilyTree.tsx      # Pohon keluarga
│   │   ├── GalleryPreview.tsx  # Preview galeri
│   │   ├── Messages.tsx        # Pesan & harapan
│   │   └── RSVP.tsx            # CTA ke Google Form
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── SectionTitle.tsx
│       ├── Lightbox.tsx        # Modal foto (client component)
│       └── ScrollReveal.tsx    # Wrapper animasi scroll
├── data/
│   ├── event.ts                # Info acara (tanggal, nama, tagline)
│   ├── rundown.ts              # Data jadwal acara
│   ├── gallery.ts              # Data galeri foto
│   ├── venue.ts                # Data venue
│   ├── family-tree.ts          # Data silsilah keluarga
│   └── messages.ts             # Data pesan & harapan
├── lib/
│   ├── utils.ts                # Helper functions (cn, formatDate, dll)
│   └── constants.ts            # Warna, link, konfigurasi
├── public/
│   ├── images/
│   │   ├── hero/               # Foto hero section
│   │   ├── gallery/            # Foto galeri
│   │   ├── venue/              # Foto venue
│   │   ├── family/             # Foto anggota keluarga
│   │   └── ornaments/          # Ornamen Sunda (SVG/PNG)
│   ├── videos/                 # Video lokal (jika ada, atau pakai YouTube)
│   └── favicon.ico
├── styles/
│   └── globals.css             # Tailwind base + custom styles
├── next.config.js              # Config dengan output: 'export' (static)
├── tailwind.config.ts          # Tailwind config dengan custom colors
├── package.json
├── tsconfig.json
└── README.md
```

### 7.4 Next.js Config untuk Static Export

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // Static HTML export
  images: {
    unoptimized: true,     // Karena static export tidak support Image Optimization
  },
};

module.exports = nextConfig;
```

> **Catatan:** Dengan `output: 'export'`, Next.js akan generate static HTML/CSS/JS. Tidak ada server-side rendering, tidak ada API routes. Semua berjalan di client.

---

## 8. Pertimbangan Hosting (Vercel Free Tier - Static)

### Keuntungan Static di Vercel Free:
- **Bandwidth:** 100GB/bulan (sangat cukup untuk website keluarga)
- **No Serverless Functions needed:** Hemat quota
- **Global CDN:** Website di-serve dari edge terdekat pengunjung
- **Auto HTTPS:** SSL gratis
- **Custom Domain:** Bisa pakai domain sendiri (opsional)
- **Zero Cold Start:** Tidak ada delay karena tidak ada server

### Strategi Optimasi Gambar (Tanpa Image Optimization API):
- Compress gambar sebelum upload (gunakan tools seperti Squoosh/TinyPNG)
- Gunakan format WebP untuk gambar
- Sediakan multiple sizes (responsive images via srcSet)
- Lazy load gambar yang di bawah fold
- Pertimbangkan Cloudinary free tier untuk transformasi gambar on-the-fly

### Alternatif untuk RSVP (Tanpa Database):
| Opsi | Kelebihan | Kekurangan |
|------|-----------|------------|
| **Google Form** | Gratis, data di Sheets, mudah | Tampilan kurang custom |
| **WhatsApp Link** | Familiar untuk semua usia | Tidak terstruktur |
| **Tally.so** | Form cantik, gratis, embed | Bergantung pihak ketiga |
| **Airtable Form** | Gratis, data terstruktur | Limit 1000 records |

**Rekomendasi:** Google Form (paling reliable & familiar untuk semua usia)

---

## 9. Timeline Pengembangan (Estimasi)

| Fase | Durasi | Deliverable |
|------|--------|-------------|
| **Setup & Struktur** | 1 hari | Project setup, Tailwind, folder structure, data files |
| **Landing Page Sections** | 3-4 hari | Hero, About, Countdown, Rundown, Venue |
| **Section Tambahan** | 2-3 hari | Family Tree, Gallery, Messages, RSVP |
| **Halaman Galeri** | 1-2 hari | Halaman galeri lengkap dengan lightbox |
| **Polish & Animasi** | 2-3 hari | Framer Motion, responsive, scroll reveal |
| **Konten & Gambar** | 1-2 hari | Masukkan foto asli, teks final, optimasi gambar |
| **Testing & Deploy** | 1 hari | Cross-browser, mobile test, deploy ke Vercel |
| **Total** | **~1.5-2 minggu** | Website siap pakai |

---

## 10. Prioritas Fitur (MVP vs Nice-to-Have)

### MVP (Harus Ada)
- [x] Hero Section dengan info acara
- [x] Tentang Acara
- [x] Countdown Timer
- [x] Jadwal Rundown
- [x] Venue + Maps + Galeri Venue
- [x] Galeri Foto (preview + halaman lengkap)
- [x] Kontak (WhatsApp floating button)
- [x] RSVP (link ke Google Form)
- [x] Responsive Design (Mobile First)
- [x] Footer

### Nice-to-Have (Jika Waktu Cukup)
- [ ] Pohon Keluarga (SVG/CSS diagram)
- [ ] Pesan & Harapan (curated messages)
- [ ] Memory Lane (timeline sejarah keluarga)
- [ ] Animasi Scroll Reveal (Framer Motion)
- [ ] Lightbox Galeri
- [ ] Dress Code Guide
- [ ] Info Transportasi
- [ ] Video Teaser/Highlight (YouTube embed)

---

## 11. SEO & Sharing

- **Open Graph Meta:** Preview cantik saat di-share di WhatsApp/Instagram
  ```html
  <meta property="og:title" content="Gathering Keluarga Surosentono 2025" />
  <meta property="og:description" content="Mempererat Tali Silaturahmi Keluarga Besar" />
  <meta property="og:image" content="/images/og-cover.jpg" />
  ```
- **Favicon:** Logo keluarga atau inisial "S"
- **Title:** "Gathering Keluarga Surosentono 2025 - Mempererat Silaturahmi"
- **WhatsApp Sharing:** Tombol share dengan pesan pre-filled
- **Structured Data:** Event schema markup (opsional)

---

## 12. Workflow Update Konten

Karena static site, berikut cara update konten:

### Pre-Event → Post-Event Transition:
1. Update `data/event.ts` — ubah status acara
2. Update `data/gallery.ts` — tambahkan foto-foto acara
3. Update `data/messages.ts` — tambahkan kesan peserta
4. Update Hero section — ubah CTA dari "Konfirmasi" ke "Lihat Kenangan"
5. Push ke GitHub → Vercel auto-deploy dalam ~1 menit

### Siapa yang Update:
- Developer (Anda) yang push code
- Atau siapapun yang punya akses ke repository GitHub

---

## 13. Catatan Penting

1. **Mobile First:** 80%+ pengunjung akan buka via HP (share di grup WA)
2. **Aksesibilitas:** Pastikan bisa diakses oleh yang kurang melek teknologi
3. **Kecepatan:** Static site = Lighthouse score 95+ (sangat cepat)
4. **Konten Emosional:** Gunakan foto keluarga asli, bukan stock photo
5. **Bilingual:** Pertimbangkan bahasa Sunda untuk sentuhan personal (opsional)
6. **Backup Plan:** Siapkan versi PDF undangan jika ada yang tidak bisa akses website
7. **Gambar Optimized:** Compress semua gambar sebelum commit (target < 200KB per foto)
8. **Video via YouTube:** Jangan host video di repository, embed dari YouTube saja

---

## 14. Kesimpulan

Website ini dirancang sebagai **fully static single-page landing** dengan pendekatan:
- **Tanpa database** — semua data di-hardcode dalam TypeScript files
- **Tanpa backend** — tidak ada API routes, tidak ada server
- **Kecepatan maksimal** — static files served dari CDN global
- **Zero cost** — hosting gratis selamanya di Vercel
- **Mudah di-maintain** — update konten = edit file → push → deploy otomatis

Dengan pendekatan static ini, website tetap bisa menjadi **time capsule** keluarga Surosentono yang:
- Load dalam < 2 detik
- Bisa diakses kapan saja tanpa khawatir server down
- Gratis selamanya (selama Vercel free tier ada)
- Mudah di-update setelah acara (tambah foto, video, kesan pesan)
