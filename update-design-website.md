# 🎨 Plan: Restructure Design Website Surosentono

> **Referensi Visual:** Poster "Halal Bi Halal — Jejak Warisan Suro Sentono" (27-28 Maret 2027, Bina Karakter Hall)  
> **Status:** Draft — menunggu upload asset manual dari user

---

## 1. Ringkasan Perubahan

Website saat ini menggunakan **earth-tone/coklat** (Sunda style). Berdasarkan poster acara, desain perlu di-restructure ke nuansa **purple/violet + kuning-emas (gold)** dengan kesan modern, bold, dan elegan — sesuai identitas visual acara.

### Perbandingan Sebelum vs Sesudah

| Aspek | Sekarang (Lama) | Target (Baru) |
|-------|----------------|----------------|
| **Primary Color** | `#c38a5f` (Coklat) | `#6B21A8` (Deep Purple) |
| **Background** | `#FDF8F3` (Cream) | `#0F0A1A` (Deep Dark Purple) |
| **Accent** | `#D4A574` (Gold Coklat) | `#FACC15` (Vivid Yellow/Gold) |
| **Font Heading** | Playfair Display (Serif) | **Outfit** / **Poppins** (Sans-serif Bold) |
| **Font Body** | Inter | Inter (tetap) |
| **Font Accent** | Dancing Script | **Playfair Display** (untuk quote/tagline) |
| **Mood** | Hangat, tradisional Sunda | Modern, bold, elegan, Islami |
| **Dark/Light Mode** | Light mode (cream bg) | **Dark mode** (deep purple bg) |

---

## 2. Color Palette Baru

Diambil dari analisis poster acara:

```
├── PRIMARY COLORS
│   ├── purple-900:    #4C1D95    ← Navbar bg saat scroll, card bg
│   ├── purple-800:    #5B21B6    ← Section dark bg
│   ├── purple-700:    #6D28D9    ← Primary button, active states
│   ├── purple-600:    #7C3AED    ← Hover states
│   └── purple-500:    #8B5CF6    ← Subtle accents, borders
│
├── ACCENT COLORS  
│   ├── gold-400:      #FACC15    ← Primary accent (CTA, highlights, icons)
│   ├── gold-300:      #FDE047    ← Hover state accent
│   └── gold-500:      #EAB308    ← Pressed/dark accent
│
├── BACKGROUND
│   ├── bg-dark:       #0F0A1A    ← Body background (ultra-dark purple)
│   ├── bg-section-1:  #1A1130    ← Alternating section bg
│   └── bg-section-2:  #130D24    ← Alternating section bg (darker)
│
├── TEXT
│   ├── text-primary:  #FFFFFF    ← Heading, penting
│   ├── text-secondary:#E2D9F3    ← Body text (soft lavender)
│   └── text-muted:    #9F8CC2    ← Caption, placeholder
│
└── UTILITY
    ├── white:         #FFFFFF
    ├── success:       #34D399    ← Hijau mint (status)
    └── overlay:       rgba(15, 10, 26, 0.8) ← Dark overlay
```

### CSS Variables Update (`globals.css`)

```css
@theme inline {
  /* Colors - Purple & Gold (dari poster) */
  --color-primary: #6D28D9;
  --color-primary-light: #8B5CF6;
  --color-primary-dark: #4C1D95;
  --color-secondary: #5B21B6;
  --color-accent: #FACC15;
  --color-accent-hover: #FDE047;
  --color-background: #0F0A1A;
  --color-background-alt: #1A1130;
  --color-background-card: #1E1538;
  --color-foreground: #FFFFFF;
  --color-foreground-secondary: #E2D9F3;
  --color-foreground-muted: #9F8CC2;
  --color-success: #34D399;
  --color-white: #FFFFFF;
  
  /* Fonts */
  --font-heading: var(--font-outfit), sans-serif;
  --font-body: var(--font-inter), sans-serif;
  --font-accent: var(--font-playfair), serif;
}
```

---

## 3. Typography Baru

### Pergantian Font

| Peran | Lama | Baru | Alasan |
|-------|------|------|--------|
| **Heading** | Playfair Display (Serif) | **Outfit** (Sans-serif) | Lebih bold, modern, sesuai poster |
| **Body** | Inter | **Inter** (tetap) | Sudah sangat readable |
| **Accent/Quote** | Dancing Script | **Playfair Display** (Serif) | Lebih elegan untuk tagline Islami |

### Update di `layout.tsx`

```tsx
// HAPUS
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";

// GANTI DENGAN
import { Outfit, Inter, Playfair_Display } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});
```

### Ukuran Font

```
Heading H1:   48-72px (desktop), 32-48px (mobile) — Extra Bold/Black
Heading H2:   36-48px (desktop), 28-36px (mobile) — Bold
Heading H3:   24-32px (desktop), 20-24px (mobile) — Semibold
Body:         18-20px (desktop), 16-18px (mobile) — Regular
Caption:      14-16px — Light/Regular
Accent Text:  20-24px — Italic (Playfair)
```

---

## 4. Update Per-Section / Component

### 4.1 Navbar (`components/layout/Navbar.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background (scroll) | `bg-background/95` (cream transparan) | `bg-[#0F0A1A]/90 backdrop-blur-xl` |
| Background (top) | `bg-transparent` | `bg-transparent` (tetap) |
| Logo text color | `text-primary` (coklat) | `text-white` |
| Nav links | `text-primary` | `text-foreground-secondary hover:text-accent` |
| Mobile menu bg | `bg-background/95` | `bg-[#1A1130]/95 backdrop-blur-xl` |
| Hamburger icon | `text-primary-dark` | `text-white` |

**Perubahan detail:**
- [ ] Ganti warna teks logo → putih
- [ ] Ganti warna nav links → lavender (`text-foreground-secondary`)
- [ ] Hover state nav → kuning emas (`text-accent`)
- [ ] Background scroll state → dark purple transparan
- [ ] Mobile menu → dark purple background

---

### 4.2 Hero Section (`components/sections/Hero.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background | Foto keluarga + gradient overlay | **Poster-style** dengan foto + purple overlay |
| Overlay | `from-black/60 via-black/40 to-black/70` | `from-purple-900/80 via-purple-800/60 to-[#0F0A1A]` |
| Subtitle font | `font-accent` (Dancing Script) | `font-accent` (Playfair Italic) |
| Subtitle color | `text-accent` (gold coklat) | `text-accent` (kuning emas baru) |
| Title | Serif (Playfair) | **Sans-serif bold** (Outfit) — uppercase tracking |
| CTA primary | `bg-accent text-primary-dark` | `bg-accent text-purple-900 font-bold` |
| CTA secondary | `border-white text-white` | `border-accent/50 text-accent` |

**Perubahan detail:**
- [ ] Update background overlay ke purple gradient
- [ ] Tambahkan elemen dekoratif: **wavy lines / abstract curves** (SVG) seperti di poster
- [ ] Title gunakan uppercase + letter-spacing
- [ ] Tambahkan tanggal acara "27-28 MARET 2027" dengan style besar/bold
- [ ] Tambahkan badge "HALAL BI HALAL" dengan styling khusus
- [ ] Subtitle "Jejak Warisan" dengan Playfair italic
- [ ] Update CTA buttons ke gold accent

**Elemen dekoratif baru:**
```
- SVG wave/abstract line pattern (dari poster)
- Grid/mesh pattern sebagai texture overlay
- Subtle particle effect (opsional, Framer Motion)
```

---

### 4.3 About Section (`components/sections/About.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background | `bg-background` (cream) | `bg-background` (dark purple) |
| Card bg | `bg-white` | `bg-background-card` (purple tua) |
| Card shadow | `shadow-sm` | `shadow-lg shadow-purple-900/20` |
| Text color | `text-primary/80` (coklat) | `text-foreground-secondary` (lavender) |
| Highlight values | `text-primary-dark` | `text-white font-bold` |
| Highlight labels | `text-primary/60` | `text-foreground-muted` |
| Icon color | `text-accent` (gold coklat) | `text-accent` (gold kuning baru) |
| Decorative border | `border-accent` (gold coklat) | `border-accent` (gold kuning baru) |

**Perubahan detail:**
- [ ] Background section → dark
- [ ] Card highlight → glassmorphism (semi-transparan + blur)
- [ ] Gambar border → gold accent baru
- [ ] Tambahkan subtle glow effect pada highlight cards

---

### 4.4 Countdown Section (`components/sections/Countdown.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background | `bg-primary-dark` (coklat tua) | `bg-background-alt` (dark section) |
| Counter card bg | `bg-white/10` | `bg-purple-800/40 border border-purple-500/20` |
| Counter number | `text-white` | `text-accent` (gold kuning) |
| Label | `text-white/60` | `text-foreground-muted` |
| Accent text | `text-accent` (gold coklat) | `text-accent` (gold kuning baru) |

**Perubahan detail:**
- [ ] Counter numbers → kuning emas (eye-catching)
- [ ] Card → glassmorphism dengan border subtle
- [ ] Tambahkan subtle glow behind countdown numbers
- [ ] Background → gradient purple gelap

---

### 4.5 Rundown Section (`components/sections/Rundown.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background | `bg-white` | `bg-background` (dark) |
| Timeline line | `bg-accent/30` | `bg-gradient-to-b from-accent/50 to-purple-500/30` |
| Timeline dot | `bg-accent border-background` | `bg-accent border-background glow` |
| Card bg | `bg-background` (cream) | `bg-background-card` (purple tua) |
| Card title | `text-primary-dark` | `text-white` |
| Card description | `text-primary/60` | `text-foreground-muted` |
| Time badge | `text-accent` | `text-accent font-mono` |
| Icon bg | `bg-accent/10` | `bg-accent/15 border border-accent/20` |

**Perubahan detail:**
- [ ] Seluruh section → dark mode
- [ ] Timeline line → gradient dari gold ke purple
- [ ] Cards → glassmorphism style
- [ ] Hover card → subtle border glow accent
- [ ] Icon background → semi-transparan

---

### 4.6 Venue Section (`components/sections/Venue.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background | `bg-background` (cream) | `bg-background-alt` (dark section alt) |
| Title | `text-primary-dark` | `text-white` |
| Text | `text-primary/70` | `text-foreground-secondary` |
| Button | `bg-primary text-white` | `bg-accent text-purple-900 font-bold` |
| Tag/badge | `bg-accent/10 text-primary` | `bg-accent/15 text-accent border border-accent/20` |
| Direction card | `bg-white` | `bg-background-card` |

**Perubahan detail:**
- [ ] Seluruh section → dark mode
- [ ] Maps iframe → rounded dengan border purple
- [ ] CTA button "Buka di Google Maps" → gold accent
- [ ] Fasilitas badges → semi-transparan dengan border

---

### 4.7 Family Tree Section (`components/sections/FamilyTree.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background | `bg-primary-dark` (coklat tua) | `bg-background` (dark, tetap gelap) |
| Avatar border | `border-accent/50` | `border-accent` (gold kuning) |
| Avatar fallback bg | `bg-primary-light` | `bg-purple-700` |
| Connector line | `bg-accent/30` | `bg-gradient-to-b from-accent to-accent/20` |
| Generation label | `text-accent` | `text-accent` (gold kuning baru) |

**Perubahan detail:**
- [ ] Background → deep dark purple
- [ ] Avatar borders → kuning emas, lebih tebal
- [ ] Connector lines → gradient gold
- [ ] Tambahkan subtle glow pada avatar saat hover

---

### 4.8 Gallery Preview (`components/sections/GalleryPreview.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background | `bg-white` | `bg-background-alt` (dark section alt) |
| Photo hover overlay | `bg-black/30` | `bg-purple-900/50` |
| CTA button | `bg-primary text-white` | `bg-accent text-purple-900 font-bold` |

**Perubahan detail:**
- [ ] Background → dark
- [ ] Photo cards → rounded dengan border subtle
- [ ] Hover overlay → purple tint
- [ ] CTA → gold accent

---

### 4.9 Messages Section (`components/sections/Messages.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background | `bg-background` (cream) | `bg-background` (dark) |
| Card bg | `bg-white` | `bg-background-card` |
| Quote icon | `text-accent/30` | `text-accent/20` |
| Message text | `text-primary/70` | `text-foreground-secondary` |
| Author name | `text-primary-dark` | `text-white` |
| Author relation | `text-primary/50` | `text-foreground-muted` |
| Border | `border-accent/10` | `border-purple-500/20` |
| Avatar fallback | `bg-accent/20 text-primary` | `bg-purple-700 text-white` |

---

### 4.10 RSVP Section (`components/sections/RSVP.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background gradient | `from-primary to-primary-dark` (coklat) | `from-purple-700 via-purple-800 to-purple-900` |
| Decorative circles | `border-white` | `border-accent/10` |
| Icon bg | `bg-accent/20` | `bg-accent/20` (tetap, warna accent berubah) |
| CTA primary | `bg-accent text-primary-dark` | `bg-accent text-purple-900 font-bold` |
| CTA secondary | `border-white text-white` | `border-accent/50 text-accent` |
| Deadline badge | `bg-white/10` | `bg-accent/10 border border-accent/20` |

---

### 4.11 Footer (`components/layout/Footer.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Background | `bg-primary-dark` (coklat tua) | `bg-[#080510]` (hampir hitam) |
| Divider | `from-accent/0 via-accent to-accent/0` | Gradient gold (tetap, warna accent baru) |
| Title | `text-accent` (gold coklat) | `text-accent` (gold kuning baru) |
| Link hover | `hover:text-accent` | `hover:text-accent` (tetap) |
| Border | `border-white/10` | `border-purple-500/10` |
| Heart icon | `text-accent` | `text-accent` (gold kuning baru) |

---

### 4.12 SectionTitle (`components/ui/SectionTitle.tsx`)

| Aspek | Sekarang | Target |
|-------|----------|--------|
| Subtitle | `text-accent` (gold coklat) | `text-accent` (gold kuning baru) |
| Title (dark bg) | `text-white` | `text-white` (tetap) |
| Title (light bg) | `text-primary-dark` | `text-white` (semua dark mode sekarang) |
| Description | `text-primary/70` atau `text-white/80` | `text-foreground-secondary` atau `text-white/80` |

> **Catatan:** Karena semua section sekarang dark mode, prop `light` mungkin perlu dihilangkan atau dijadikan default `true`.

---

### 4.13 FloatingWhatsApp (`components/layout/FloatingWhatsApp.tsx`)

- [ ] Ganti warna tombol → `bg-accent hover:bg-accent-hover` (gold)
- [ ] Icon color → `text-purple-900`
- [ ] Tambahkan shadow glow kuning

---

## 5. Elemen Dekoratif Baru

Dari poster, ada beberapa elemen visual yang perlu ditambahkan:

### 5.1 Wavy / Abstract Line Pattern
```
- SVG wave pattern yang muncul di beberapa section
- Bisa sebagai background overlay dengan opacity rendah
- Animasi subtle menggunakan Framer Motion (floating/pulse)
```

### 5.2 Grid / Mesh Texture
```
- Subtle dot grid atau mesh sebagai background texture
- Opacity: 3-5% (sangat halus)
- Warna: putih atau gold
```

### 5.3 Gradient Glow / Blur Blobs
```
- Blob gradient (purple + pink + gold) di beberapa section
- filter: blur(100px) dengan opacity rendah
- Memberi kesan premium dan dinamis
```

### 5.4 Decorative Typography
```
- "HALAL BI HALAL" → uppercase, bold, extra-large di Hero
- "SURO SENTONO" → sangat bold, mungkin gradient text
- "Jejak Warisan" → Playfair italic, accent color
```

---

## 6. Asset yang Perlu Disiapkan (Upload Manual)

> **PENTING:** Asset berikut perlu di-upload secara manual oleh user ke folder `public/images/`:

### Wajib (High Priority)
| No | Asset | Folder Target | Format | Keterangan |
|----|-------|--------------|--------|------------|
| 1 | **Banner/Hero Image** | `/public/images/hero/` | JPG/WebP | Foto keluarga atau visual utama untuk hero section |
| 2 | **Logo Acara** | `/public/images/` | SVG/PNG | Logo "Suro Sentono" atau keluarga (jika ada) |
| 3 | **OG Cover Image** | `/public/images/` | JPG (1200x630) | Preview saat dishare di WhatsApp/sosmed |

### Opsional (Nice to Have)
| No | Asset | Folder Target | Format | Keterangan |
|----|-------|--------------|--------|------------|
| 4 | **Wavy Line SVG** | `/public/images/ornaments/` | SVG | Pola garis melengkung dari poster |
| 5 | **Foto-foto Keluarga** | `/public/images/gallery/` | JPG/WebP | Untuk galeri dan section about |
| 6 | **Foto Venue** | `/public/images/venue/` | JPG/WebP | Foto Bina Karakter Hall |
| 7 | **Foto Anggota Keluarga** | `/public/images/family/` | JPG/WebP | Untuk silsilah keluarga |
| 8 | **Favicon Baru** | `/public/` | ICO/PNG | Sesuai branding baru (purple/gold) |

---

## 7. Update Data Files

### 7.1 `data/event.ts`
```diff
- nama: "Gathering Keluarga Surosentono 2025",
- tanggal: "2027-03-25",
- tagline: "Halal Bihalal Keluarga Besar Surosentono",
+ nama: "Halal Bi Halal — Jejak Warisan Suro Sentono",
+ tanggal: "2027-03-27",
+ tanggalSelesai: "2027-03-28",
+ tagline: "Jejak Warisan Keluarga Besar",
```

### 7.2 `lib/constants.ts`
```diff
- name: "Gathering Keluarga Surosentono 2025",
- tagline: "Mempererat Tali Silaturahmi",
+ name: "Halal Bi Halal Suro Sentono",
+ tagline: "Jejak Warisan Keluarga Besar",
```

### 7.3 `layout.tsx` Metadata
```diff
- title: "Gathering Keluarga Surosentono 2025 - Mempererat Silaturahmi",
+ title: "Halal Bi Halal — Jejak Warisan Suro Sentono 2027",
- description: "Undangan Gathering Keluarga Besar Surosentono 2025 di Bogor...",
+ description: "Halal Bi Halal Keluarga Besar Suro Sentono, 27-28 Maret 2027 di Bina Karakter Hall. Organized by the Prakoso.",
```

---

## 8. Urutan Implementasi

### Fase 1: Foundation (Design System) ⏱️ ~1 jam
1. [ ] Update `globals.css` — color variables, font variables, base styles
2. [ ] Update `layout.tsx` — import font baru (Outfit, Inter, Playfair)
3. [ ] Update `lib/constants.ts` — nama & tagline baru
4. [ ] Update `data/event.ts` — info acara baru

### Fase 2: Layout Components ⏱️ ~1 jam
5. [ ] Update `Navbar.tsx` — dark mode styling
6. [ ] Update `Footer.tsx` — dark mode styling
7. [ ] Update `FloatingWhatsApp.tsx` — gold accent
8. [ ] Update `SectionTitle.tsx` — default ke dark mode

### Fase 3: Section Components ⏱️ ~2-3 jam
9. [ ] Update `Hero.tsx` — poster-style design + dekoratif
10. [ ] Update `About.tsx` — dark mode + glassmorphism cards
11. [ ] Update `Countdown.tsx` — gold numbers + glass cards
12. [ ] Update `Rundown.tsx` — dark timeline + gradient
13. [ ] Update `Venue.tsx` — dark mode + gold CTA
14. [ ] Update `FamilyTree.tsx` — deep purple bg
15. [ ] Update `GalleryPreview.tsx` — dark mode grid
16. [ ] Update `Messages.tsx` — dark mode cards
17. [ ] Update `RSVP.tsx` — purple gradient + gold CTA

### Fase 4: Polish & Assets ⏱️ ~1-2 jam
18. [ ] Tambahkan elemen dekoratif SVG (wavy lines, blur blobs)
19. [ ] Fine-tune animasi Framer Motion
20. [ ] Pasang asset gambar yang sudah di-upload
21. [ ] Update favicon
22. [ ] Testing responsive (mobile, tablet, desktop)
23. [ ] Lighthouse check (performance, accessibility)

---

## 9. Preview Design Tokens (Quick Reference)

```
┌─────────────────────────────────────────────────────────────────┐
│                      DESIGN SYSTEM BARU                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PURPLE FAMILY          GOLD FAMILY          NEUTRAL            │
│  ██ #4C1D95 (900)       ██ #EAB308 (500)    ██ #0F0A1A (bg)   │
│  ██ #5B21B6 (800)       ██ #FACC15 (400)    ██ #1A1130 (alt)  │
│  ██ #6D28D9 (700)       ██ #FDE047 (300)    ██ #1E1538 (card) │
│  ██ #7C3AED (600)                            ██ #FFFFFF (text) │
│  ██ #8B5CF6 (500)                            ██ #E2D9F3 (sec)  │
│  ██ #9F8CC2 (muted)                          ██ #9F8CC2 (muted)│
│                                                                 │
│  FONT HEADING:  Outfit (700-900)                                │
│  FONT BODY:     Inter (400-500)                                 │
│  FONT ACCENT:   Playfair Display Italic                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. Catatan Tambahan

> **NOTE:** Semua section sekarang **dark mode by default**. Tidak ada lagi alternasi light/dark.

> **NOTE:** **Glassmorphism** digunakan pada cards dan badges: `bg-white/5 backdrop-blur-sm border border-white/10`

> **NOTE:** **Gold accent** (`#FACC15`) digunakan secara konsisten untuk: CTA buttons, icons, highlights, badges, dan decorative elements.

> **NOTE:** **Wavy line pattern** dari poster sebaiknya di-extract sebagai SVG dan digunakan sebagai background overlay.

> **WARNING:** Pastikan contrast ratio teks putih di atas purple gelap memenuhi WCAG AA (minimal 4.5:1) — sudah aman karena `#FFFFFF` di `#0F0A1A` = ratio ~18:1

> **WARNING:** Font size tetap minimal 16px untuk body agar nyaman untuk semua usia (20-70 tahun)

> **WARNING:** Test di HP low-end karena glassmorphism (`backdrop-blur`) bisa berat di device lama

---

**Siap untuk dieksekusi setelah asset di-upload!** 🚀
