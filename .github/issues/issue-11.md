## Deskripsi

Membuat section Pesan & Harapan yang menampilkan pesan-pesan terkurasi dari anggota keluarga dalam format card/testimonial wall.

## Konteks

Section ini menampilkan pesan-pesan emosional dari anggota keluarga. Data dikumpulkan secara manual (via WhatsApp group) lalu di-hardcode di `data/messages.ts`. Tampilan seperti testimonial wall dengan card-card yang berisi nama, foto, dan pesan.

## Spesifikasi Desain

- **Background:** Cream (`bg-background`)
- **Layout:** Grid 1-2-3 kolom (responsive)
- **Setiap card:**
  - Foto kecil (avatar circle)
  - Nama pengirim
  - Hubungan/generasi (opsional)
  - Isi pesan (italic, dengan tanda kutip)
- **Visual:** Card dengan shadow ringan, quote icon sebagai dekorasi

## Langkah-Langkah

### 1. Buat `components/sections/Messages.tsx`

```typescript
import SectionTitle from "@/components/ui/SectionTitle";
import { messagesData } from "@/data/messages";
import { Quote } from "lucide-react";

export default function Messages() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionTitle
          subtitle="Dari Hati"
          title="Pesan & Harapan"
          description="Ungkapan cinta dan harapan dari keluarga besar Surosentono"
        />

        {/* Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messagesData.map((message) => (
            <div
              key={message.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Quote Icon */}
              <Quote
                size={24}
                className="text-accent/30 absolute top-4 right-4"
              />

              {/* Pesan */}
              <p className="text-primary/70 italic text-base leading-relaxed mb-4">
                &ldquo;{message.pesan}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-accent/10">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  {message.foto ? (
                    <img
                      src={message.foto}
                      alt={message.nama}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-accent/20 flex items-center justify-center text-primary font-bold">
                      {message.nama.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-primary-dark text-sm">
                    {message.nama}
                  </p>
                  {message.hubungan && (
                    <p className="text-primary/50 text-xs">{message.hubungan}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 2. Tambahkan ke `app/page.tsx`

```tsx
import Messages from "@/components/sections/Messages";

// Tambahkan setelah GalleryPreview
<Messages />
```

## Definition of Done

- [ ] Card pesan tampil dalam grid responsive (1/2/3 kolom)
- [ ] Setiap card menampilkan: pesan (italic + kutip), nama, foto/inisial
- [ ] Quote icon sebagai dekorasi
- [ ] Hover effect pada card (shadow)
- [ ] Data diambil dari `data/messages.ts`
- [ ] Responsive di semua ukuran layar
- [ ] Teks pesan mudah dibaca (font size cukup, line-height lega)

## Tips untuk Junior

- Section ini tidak perlu `"use client"` karena tidak ada interaksi/state
- `&ldquo;` dan `&rdquo;` adalah HTML entity untuk tanda kutip buka/tutup yang cantik
- Jika data pesan masih sedikit (1-2), grid tetap terlihat baik
- Fallback avatar (inisial nama) penting karena mungkin tidak semua punya foto
- Card height akan berbeda-beda tergantung panjang pesan - ini normal dan terlihat natural
