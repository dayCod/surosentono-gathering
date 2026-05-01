## Deskripsi

Membuat section Jadwal & Rundown Acara dengan tampilan timeline vertikal yang menampilkan urutan kegiatan dari pagi hingga sore.

## Konteks

Section ini penting agar peserta tahu apa saja yang akan dilakukan selama acara. Tampilan timeline vertikal dipilih karena mudah dibaca dan familiar. Setiap item memiliki waktu, judul, deskripsi, dan ikon.

## Spesifikasi Desain

- **Background:** Putih/cream (`bg-white` atau `bg-background`)
- **Layout:** Timeline vertikal di tengah
- **Setiap item:**
  - Garis vertikal penghubung
  - Dot/circle di garis timeline
  - Card di samping garis (bergantian kiri-kanan di desktop, semua di kanan di mobile)
  - Ikon kegiatan
  - Waktu (bold)
  - Judul kegiatan
  - Deskripsi singkat
- **Data:** Dari `data/rundown.ts`

## Langkah-Langkah

### 1. Buat `components/sections/Rundown.tsx`

```typescript
import SectionTitle from "@/components/ui/SectionTitle";
import { rundownData } from "@/data/rundown";
import {
  Coffee,
  Mic,
  Camera,
  Gamepad2,
  UtensilsCrossed,
  Heart,
  Gift,
} from "lucide-react";

// Map nama ikon ke komponen
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  coffee: Coffee,
  mic: Mic,
  camera: Camera,
  "gamepad-2": Gamepad2,
  utensils: UtensilsCrossed,
  heart: Heart,
  gift: Gift,
};

export default function Rundown() {
  return (
    <section id="jadwal" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionTitle
          subtitle="Rangkaian Acara"
          title="Jadwal Kegiatan"
          description="Berikut susunan acara yang telah kami siapkan untuk hari istimewa kita"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Garis vertikal tengah */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {rundownData.map((item, index) => {
              const Icon = iconMap[item.ikon] || Coffee;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex items-start gap-4 md:gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background -translate-x-1/2 z-10" />

                  {/* Spacer for desktop alternating layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div className="ml-10 md:ml-0 md:w-1/2">
                    <div className="bg-background rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Icon size={20} className="text-accent" />
                        </div>
                        <span className="text-sm font-semibold text-accent">
                          {item.waktuMulai} - {item.waktuSelesai}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-heading font-bold text-primary-dark mb-1">
                        {item.judul}
                      </h3>
                      <p className="text-primary/60 text-base">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 2. Tambahkan ke `app/page.tsx`

```tsx
import Rundown from "@/components/sections/Rundown";

// Tambahkan setelah Countdown
<Rundown />
```

## Catatan Layout Timeline

### Desktop (md ke atas):
- Garis di tengah
- Card bergantian kiri-kanan (genap di kiri, ganjil di kanan)
- Dot di garis tengah

### Mobile (< md):
- Garis di kiri
- Semua card di kanan garis
- Dot di garis kiri
- Lebih simpel dan mudah dibaca

## Definition of Done

- [ ] Timeline vertikal tampil dengan garis penghubung
- [ ] Setiap item menampilkan: waktu, ikon, judul, deskripsi
- [ ] Desktop: card bergantian kiri-kanan
- [ ] Mobile: semua card di kanan garis
- [ ] Ikon sesuai dengan jenis kegiatan
- [ ] Data diambil dari `data/rundown.ts`
- [ ] Section memiliki `id="jadwal"` untuk anchor link
- [ ] Hover effect pada card (shadow)
- [ ] Responsive dan mudah dibaca di semua ukuran layar

## Tips untuk Junior

- Timeline layout bisa tricky di CSS. Fokus mobile dulu, baru desktop
- `iconMap` digunakan untuk mapping string nama ikon ke komponen React
- Jika layout bergantian (kiri-kanan) terlalu sulit, boleh buat semua di satu sisi dulu
- Pastikan garis vertikal dan dot sejajar dengan benar
- Gunakan `relative` dan `absolute` positioning untuk dot dan garis
- Test dengan jumlah item ganjil dan genap
