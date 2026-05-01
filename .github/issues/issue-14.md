## Deskripsi

Menambahkan animasi scroll reveal menggunakan Framer Motion agar setiap section muncul dengan animasi halus saat di-scroll ke viewport.

## Konteks

Animasi scroll reveal membuat website terasa lebih hidup dan profesional. Setiap section akan fade-in dari bawah saat pengunjung scroll ke area tersebut. Animasi harus subtle (tidak berlebihan) dan tidak mengganggu readability.

**Penting:** Animasi harus ringan dan tidak memperlambat website, terutama di HP dengan spesifikasi rendah.

## Spesifikasi

- **Library:** Framer Motion (sudah ter-install)
- **Tipe animasi:** Fade-in + slide-up (dari bawah)
- **Trigger:** Saat element masuk viewport (intersection observer via Framer Motion)
- **Duration:** 0.5-0.8 detik
- **Delay:** Stagger untuk child elements (opsional)
- **Once:** Animasi hanya berjalan sekali (tidak repeat saat scroll balik)

## Langkah-Langkah

### 1. Buat `components/ui/ScrollReveal.tsx` (Wrapper Component)

```typescript
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
}: ScrollRevealProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### 2. Buat `components/ui/StaggerContainer.tsx` (Untuk Stagger Children)

```typescript
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child item untuk digunakan di dalam StaggerContainer
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### 3. Terapkan ke Section-Section

Contoh penerapan di About section:

```tsx
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  return (
    <section id="tentang" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            {/* Konten teks */}
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            {/* Gambar */}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

Contoh stagger di Rundown:

```tsx
import StaggerContainer, { StaggerItem } from "@/components/ui/StaggerContainer";

// Di dalam timeline
<StaggerContainer className="space-y-8">
  {rundownData.map((item) => (
    <StaggerItem key={item.id}>
      {/* Timeline card */}
    </StaggerItem>
  ))}
</StaggerContainer>
```

### 4. Section yang Perlu Animasi

| Section | Tipe Animasi |
|---------|-------------|
| About | Teks dari kiri, gambar dari kanan |
| Countdown | Fade-up angka-angka |
| Rundown | Stagger timeline items |
| Venue | Maps dari kiri, info dari kanan |
| FamilyTree | Stagger per generasi |
| GalleryPreview | Stagger grid items |
| Messages | Stagger cards |
| RSVP | Fade-up centered |

### 5. Pertimbangan Performance

```typescript
// Gunakan `viewport: { once: true }` agar animasi tidak repeat
// Gunakan `margin: "-100px"` agar animasi mulai sedikit sebelum element terlihat
// Jangan animasi terlalu banyak element sekaligus
// Hindari animasi pada gambar besar (biarkan gambar langsung tampil)
```

## Definition of Done

- [ ] `ScrollReveal` wrapper component dibuat dan berfungsi
- [ ] `StaggerContainer` + `StaggerItem` dibuat dan berfungsi
- [ ] Minimal 5 section sudah menggunakan scroll reveal
- [ ] Animasi hanya berjalan sekali (once: true)
- [ ] Animasi smooth dan tidak janky
- [ ] Tidak ada layout shift saat animasi berjalan
- [ ] Performance tetap baik (tidak lag di mobile)
- [ ] Animasi subtle dan tidak mengganggu readability

## Tips untuk Junior

- `"use client"` wajib di semua komponen yang menggunakan Framer Motion
- `viewport: { once: true }` sangat penting - tanpa ini animasi akan repeat setiap scroll
- `margin: "-100px"` membuat animasi mulai sedikit sebelum element masuk viewport (terasa lebih smooth)
- Jangan over-animate! Subtle is better. Terlalu banyak animasi justru mengganggu
- Test di HP/device lambat untuk memastikan tidak lag
- Jika ada masalah performance, kurangi jumlah animated elements
- Framer Motion otomatis handle `prefers-reduced-motion` untuk aksesibilitas
