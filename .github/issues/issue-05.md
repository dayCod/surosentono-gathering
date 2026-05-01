## Deskripsi

Membuat section "Tentang Acara" yang menjelaskan tujuan dan latar belakang gathering keluarga Surosentono.

## Konteks

Section ini bercerita tentang **mengapa** acara ini diadakan. Harus emosional, hangat, dan membuat pembaca merasa terhubung dengan keluarga. Gunakan bahasa yang sederhana dan inklusif untuk semua usia.

## Spesifikasi Desain

- **Background:** Cream/putih (`bg-background`)
- **Layout:** 2 kolom di desktop (teks kiri, gambar kanan), 1 kolom di mobile
- **Konten:**
  - Section title: "Tentang Acara"
  - Paragraf deskripsi (2-3 paragraf, emosional)
  - Highlight info dalam card/badge: Jumlah keluarga, tahun tradisi, dll
  - Foto keluarga (bisa collage atau single)
- **Ornamen:** Motif Sunda sebagai dekorasi (opsional, bisa ditambah nanti)

## Langkah-Langkah

### 1. Buat `components/ui/SectionTitle.tsx` (Reusable)

Komponen ini akan dipakai di semua section:

```typescript
interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean; // untuk section dengan background gelap
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = "center",
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      {subtitle && (
        <p className={`font-accent text-lg md:text-xl mb-2 ${light ? "text-accent" : "text-accent"}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? "text-white" : "text-primary-dark"}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg max-w-2xl mx-auto ${light ? "text-white/80" : "text-primary/70"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
```

### 2. Buat `components/sections/About.tsx`

```typescript
import SectionTitle from "@/components/ui/SectionTitle";
import { Users, Calendar, Heart } from "lucide-react";

export default function About() {
  const highlights = [
    { icon: Users, label: "Keluarga", value: "50+" },
    { icon: Calendar, label: "Tahun Tradisi", value: "10+" },
    { icon: Heart, label: "Generasi", value: "4" },
  ];

  return (
    <section id="tentang" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Teks */}
          <div>
            <SectionTitle
              subtitle="Silaturahmi"
              title="Tentang Acara"
              align="left"
            />
            <div className="space-y-4 text-primary/80 text-lg leading-relaxed">
              <p>
                Gathering Keluarga Surosentono adalah momen istimewa untuk
                mempertemukan kembali saudara-saudara yang mungkin sudah lama
                tidak berjumpa.
              </p>
              <p>
                Dari generasi pertama hingga cicit, kita berkumpul untuk
                berbagi cerita, tawa, dan membangun kenangan baru yang akan
                kita ceritakan ke anak cucu kelak.
              </p>
              <p>
                Mari bersama-sama menjaga tali silaturahmi yang telah
                diwariskan oleh para pendahulu kita.
              </p>
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="text-center p-4 bg-white rounded-xl shadow-sm"
                >
                  <item.icon className="mx-auto mb-2 text-accent" size={24} />
                  <p className="text-2xl font-bold text-primary-dark">
                    {item.value}
                  </p>
                  <p className="text-sm text-primary/60">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Gambar */}
          <div className="relative">
            <img
              src="/images/gallery/placeholder-1.jpg"
              alt="Keluarga Surosentono"
              className="rounded-2xl shadow-xl w-full h-[400px] md:h-[500px] object-cover"
            />
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 3. Tambahkan ke `app/page.tsx`

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}
```

## Checklist Responsiveness

- [ ] Mobile: 1 kolom (gambar di atas, teks di bawah atau sebaliknya)
- [ ] Tablet: 2 kolom dengan gap lebih kecil
- [ ] Desktop: 2 kolom dengan spacing lega
- [ ] Highlight cards: 3 kolom di semua ukuran (ukuran card menyesuaikan)

## Definition of Done

- [ ] `SectionTitle` component dibuat dan reusable
- [ ] About section menampilkan teks deskripsi yang emosional
- [ ] Highlight cards (jumlah keluarga, tahun, generasi) tampil
- [ ] Gambar keluarga tampil dengan styling yang baik
- [ ] Section memiliki `id="tentang"` untuk anchor link
- [ ] Responsive di semua ukuran layar
- [ ] Teks mudah dibaca (font size 18px+, line-height lega)

## Tips untuk Junior

- `SectionTitle` akan dipakai ulang di section lain, jadi buat sefleksibel mungkin
- Teks deskripsi ini placeholder, nanti akan diganti dengan teks asli dari keluarga
- Decorative border di belakang gambar memberikan kesan elegan (opsional jika sulit)
- Pastikan gambar punya `object-cover` agar tidak stretch
- Padding section: `py-20` (mobile) sampai `py-28` (desktop) agar tidak terlalu rapat
