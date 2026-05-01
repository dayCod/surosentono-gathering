## Deskripsi

Membuat section RSVP yang berisi CTA (Call to Action) untuk konfirmasi kehadiran. Karena website static, RSVP akan diarahkan ke Google Form atau WhatsApp.

## Konteks

Website ini tidak punya backend/database, jadi form RSVP tidak bisa diproses di website sendiri. Solusinya:
1. **Google Form** (rekomendasi) - data masuk ke Google Sheets otomatis
2. **WhatsApp** - pesan pre-filled ke nomor panitia

Section ini harus menarik dan memberikan urgency agar pengunjung segera konfirmasi.

## Spesifikasi Desain

- **Background:** Gradient coklat atau pattern dengan overlay
- **Layout:** Centered, simple
- **Konten:**
  - Judul: "Konfirmasi Kehadiran"
  - Deskripsi singkat: mengapa perlu konfirmasi
  - Tombol besar: "Isi Form RSVP" (ke Google Form)
  - Tombol alternatif: "Konfirmasi via WhatsApp"
  - Info deadline konfirmasi
- **Tambahan:** QR Code Google Form (untuk yang buka di desktop)

## Langkah-Langkah

### 1. Buat `components/sections/RSVP.tsx`

```typescript
import { SITE_CONFIG } from "@/lib/constants";
import { ClipboardCheck, MessageCircle, Clock } from "lucide-react";

export default function RSVP() {
  const waMessage = encodeURIComponent(
    "Assalamualaikum, saya ingin konfirmasi kehadiran untuk Gathering Keluarga Surosentono 2025.\n\nNama: \nJumlah yang hadir: \nNo. HP: "
  );
  const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${waMessage}`;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      {/* Decorative background pattern (opsional) */}
      <div className="absolute inset-0 opacity-5">
        {/* Bisa tambahkan SVG pattern atau ornamen di sini */}
      </div>

      <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-6">
          <ClipboardCheck size={32} className="text-accent" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Konfirmasi Kehadiran
        </h2>
        <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl mx-auto">
          Agar kami dapat mempersiapkan acara dengan baik, mohon konfirmasi
          kehadiran Anda dan keluarga.
        </p>

        {/* Deadline Info */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-8">
          <Clock size={16} className="text-accent" />
          <span className="text-white/90 text-sm">
            Batas konfirmasi: 10 Agustus 2025
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary: Google Form */}
          <a
            href={SITE_CONFIG.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-accent text-primary-dark font-bold rounded-full hover:bg-accent/90 transition-colors text-lg flex items-center justify-center gap-2"
          >
            <ClipboardCheck size={20} />
            Isi Form RSVP
          </a>

          {/* Secondary: WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors text-lg flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Via WhatsApp
          </a>
        </div>

        {/* Info tambahan */}
        <p className="text-white/50 text-sm mt-8">
          Informasi yang Anda berikan hanya digunakan untuk keperluan acara.
        </p>
      </div>
    </section>
  );
}
```

### 2. Tambahkan ke `app/page.tsx`

```tsx
import RSVP from "@/components/sections/RSVP";

// Tambahkan sebagai section terakhir sebelum Footer
<RSVP />
```

### 3. Buat Google Form (Panduan)

Buat Google Form dengan field:
1. Nama Lengkap (required)
2. Nomor WhatsApp (required)
3. Jumlah yang Hadir (number, required)
4. Alergi Makanan (optional, text)
5. Pesan untuk Panitia (optional, text)

Setelah form dibuat:
- Copy link form
- Update `SITE_CONFIG.googleFormUrl` di `lib/constants.ts`

## Definition of Done

- [ ] Section RSVP tampil dengan background gradient coklat
- [ ] Judul dan deskripsi jelas dan mengundang
- [ ] Tombol "Isi Form RSVP" mengarah ke Google Form (new tab)
- [ ] Tombol "Via WhatsApp" membuka WhatsApp dengan pesan pre-filled
- [ ] Info deadline konfirmasi tampil
- [ ] Tombol cukup besar dan mudah di-tap (min 48px height)
- [ ] Responsive: tombol stack vertikal di mobile
- [ ] Pesan WhatsApp sudah include template (nama, jumlah, no HP)

## Tips untuk Junior

- `encodeURIComponent` penting untuk pesan WA agar karakter spesial tidak rusak
- `\n` dalam pesan WA akan menjadi baris baru
- Google Form URL bisa didapat dari tombol "Send" > "Link" di Google Forms
- Section ini tidak perlu `"use client"` karena tidak ada state/effect
- Background gradient memberikan visual break yang bagus dari section lain
- Pastikan link `target="_blank"` punya `rel="noopener noreferrer"` untuk keamanan
