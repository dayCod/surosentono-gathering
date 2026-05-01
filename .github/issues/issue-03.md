## Deskripsi

Membuat komponen layout utama: Navbar (sticky navigation), Footer, dan Floating WhatsApp Button. Komponen ini akan digunakan di seluruh halaman.

## Konteks

Layout components adalah kerangka utama website. Navbar harus sticky (tetap di atas saat scroll), Footer berisi kontak dan quick links, dan Floating WhatsApp button selalu terlihat di pojok kanan bawah.

**Target pengguna usia 20-70 tahun**, jadi:
- Tombol harus besar (min 48x48px)
- Teks harus jelas dan mudah dibaca
- Navigasi sederhana (max 5 item)

## Langkah-Langkah

### 1. Buat `components/layout/Navbar.tsx`

**Spesifikasi:**
- Sticky di atas (fixed top)
- Background transparan di awal, berubah solid saat scroll
- Logo/nama acara di kiri
- Menu navigasi di kanan (desktop)
- Hamburger menu untuk mobile
- Smooth scroll ke section saat menu diklik
- Max 5 menu item (dari `NAV_LINKS` di constants)

```typescript
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ... implementasi lengkap
}
```

**Behavior:**
- Desktop: Menu horizontal
- Mobile (< 768px): Hamburger icon, menu slide dari kanan/atas
- Saat scroll > 50px: Background berubah dari transparan ke `bg-background/95 backdrop-blur`
- Klik menu item: Smooth scroll ke section + tutup mobile menu

### 2. Buat `components/layout/Footer.tsx`

**Spesifikasi:**
- Background coklat tua (`bg-primary-dark`)
- Teks putih
- 3 kolom (desktop), 1 kolom (mobile):
  - Kolom 1: Nama acara + tagline + deskripsi singkat
  - Kolom 2: Quick Links (anchor ke section)
  - Kolom 3: Kontak (WhatsApp, email jika ada)
- Copyright di bawah
- Ornamen/divider Sunda di atas footer (opsional)

```typescript
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      {/* Ornamen divider */}
      {/* Content 3 kolom */}
      {/* Copyright */}
    </footer>
  );
}
```

### 3. Buat `components/layout/FloatingWhatsApp.tsx`

**Spesifikasi:**
- Posisi fixed di pojok kanan bawah
- Icon WhatsApp besar (48x48px minimum)
- Background hijau WhatsApp (#25D366)
- Klik: Buka WhatsApp dengan pesan pre-filled
- Animasi pulse/bounce ringan untuk menarik perhatian
- Z-index tinggi agar selalu di atas

```typescript
"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Halo, saya ingin bertanya tentang Gathering Keluarga Surosentono 2025"
  );
  const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
```

### 4. Integrasikan di `app/layout.tsx`

```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${fonts} font-body`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
```

## Checklist Responsiveness

- [ ] Navbar: Desktop menu horizontal, Mobile hamburger
- [ ] Footer: Desktop 3 kolom, Tablet 2 kolom, Mobile 1 kolom
- [ ] FloatingWA: Posisi konsisten di semua ukuran layar
- [ ] Semua touch target minimal 48x48px

## Definition of Done

- [ ] `Navbar.tsx` berfungsi dengan sticky behavior dan scroll detection
- [ ] Navbar mobile menu bisa dibuka/tutup
- [ ] Klik menu item melakukan smooth scroll ke section yang benar
- [ ] `Footer.tsx` menampilkan info kontak dan quick links
- [ ] `FloatingWhatsApp.tsx` mengarah ke WhatsApp dengan pesan pre-filled
- [ ] Semua komponen responsive (mobile, tablet, desktop)
- [ ] Sudah terintegrasi di `app/layout.tsx`
- [ ] Tidak ada TypeScript error
- [ ] Aksesibilitas: aria-label pada tombol, semantic HTML

## Tips untuk Junior

- Gunakan `"use client"` di komponen yang butuh state/effect (Navbar, FloatingWA)
- Footer bisa tetap server component (tidak perlu `"use client"`)
- Test di mobile view (Chrome DevTools > Toggle Device Toolbar)
- Pastikan z-index Navbar > konten, FloatingWA > Navbar
- Gunakan `scroll-behavior: smooth` di CSS (sudah di globals.css)
