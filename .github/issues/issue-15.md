## Deskripsi

Menambahkan SEO metadata, Open Graph tags (untuk preview di WhatsApp/sosmed), favicon, dan final polish pada website.

## Konteks

Ketika link website di-share di WhatsApp group keluarga, harus muncul preview yang cantik (gambar, judul, deskripsi). Ini sangat penting karena mayoritas pengunjung akan datang dari share di WhatsApp.

## Langkah-Langkah

### 1. Setup Metadata di `app/layout.tsx`

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gathering Keluarga Surosentono 2025 - Mempererat Silaturahmi",
  description:
    "Undangan Gathering Keluarga Besar Surosentono 2025 di Bogor. Mari berkumpul mempererat tali silaturahmi antar generasi.",
  keywords: ["gathering", "keluarga", "surosentono", "silaturahmi", "bogor"],
  authors: [{ name: "Keluarga Surosentono" }],

  // Open Graph (untuk WhatsApp, Facebook, dll)
  openGraph: {
    title: "Gathering Keluarga Surosentono 2025",
    description: "Mempererat Tali Silaturahmi Keluarga Besar",
    url: "https://surosentono-gathering.vercel.app",
    siteName: "Gathering Keluarga Surosentono",
    images: [
      {
        url: "/images/og-cover.jpg", // Gambar 1200x630px
        width: 1200,
        height: 630,
        alt: "Gathering Keluarga Surosentono 2025",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Gathering Keluarga Surosentono 2025",
    description: "Mempererat Tali Silaturahmi Keluarga Besar",
    images: ["/images/og-cover.jpg"],
  },

  // Favicon
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
```

### 2. Buat OG Image

Buat gambar untuk Open Graph preview:
- **Ukuran:** 1200 x 630 px
- **Konten:** Judul acara, tanggal, visual menarik
- **Format:** JPG (lebih kecil dari PNG)
- **Lokasi:** `public/images/og-cover.jpg`

Tips desain OG image:
- Teks harus besar dan terbaca di thumbnail kecil
- Gunakan warna brand (coklat + gold)
- Sertakan tanggal dan lokasi
- Jangan terlalu ramai

### 3. Buat Favicon

Siapkan favicon dalam beberapa ukuran:
- `public/favicon.ico` (32x32)
- `public/apple-touch-icon.png` (180x180)
- `public/favicon-16x16.png` (16x16)
- `public/favicon-32x32.png` (32x32)

Bisa generate dari logo/inisial "S" menggunakan:
- https://favicon.io/favicon-generator/
- https://realfavicongenerator.net/

### 4. Tambahkan `robots.txt` dan `sitemap.xml` (Opsional)

`public/robots.txt`:
```
User-agent: *
Allow: /
```

### 5. Tambahkan Structured Data (Opsional)

Di `app/layout.tsx` atau `app/page.tsx`, tambahkan JSON-LD untuk Event:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Gathering Keluarga Surosentono 2025",
      startDate: "2025-08-17T07:00:00+07:00",
      location: {
        "@type": "Place",
        name: "Nama Venue",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bogor",
          addressRegion: "Jawa Barat",
          addressCountry: "ID",
        },
      },
      description: "Gathering tahunan keluarga besar Surosentono",
      organizer: {
        "@type": "Organization",
        name: "Keluarga Surosentono",
      },
    }),
  }}
/>
```

### 6. Final Polish Checklist

- [ ] Semua link berfungsi (internal + external)
- [ ] Semua gambar punya alt text
- [ ] Tidak ada console error/warning
- [ ] Smooth scroll berfungsi dari navbar
- [ ] Mobile menu buka/tutup dengan benar
- [ ] Floating WhatsApp button tidak menutupi konten penting
- [ ] Font loading tidak menyebabkan layout shift (FOUT)
- [ ] Warna konsisten di seluruh website
- [ ] Spacing konsisten antar section

### 7. Test WhatsApp Share Preview

1. Deploy ke Vercel (atau gunakan ngrok untuk test lokal)
2. Share link di WhatsApp
3. Pastikan preview muncul: gambar, judul, deskripsi
4. Jika tidak muncul, gunakan [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) untuk debug

## Definition of Done

- [ ] Metadata (title, description) ter-set di layout
- [ ] Open Graph tags lengkap (title, description, image, url)
- [ ] OG image (1200x630) sudah dibuat dan di-upload
- [ ] Favicon ter-set (ico + apple-touch-icon)
- [ ] Share di WhatsApp menampilkan preview yang cantik
- [ ] Tidak ada console error di production build
- [ ] Semua link internal dan external berfungsi
- [ ] Alt text pada semua gambar
- [ ] robots.txt ada di public folder

## Tips untuk Junior

- OG image SANGAT penting untuk WhatsApp sharing - ini yang pertama dilihat orang
- Metadata di Next.js App Router di-export sebagai `const metadata` (bukan di Head)
- Favicon bisa di-generate gratis dari favicon.io
- Setelah deploy, test share di WA group sendiri dulu
- WhatsApp cache OG preview cukup lama - jika update, mungkin perlu waktu
- `locale: "id_ID"` penting agar platform tahu ini konten bahasa Indonesia
