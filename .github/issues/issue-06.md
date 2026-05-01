## Deskripsi

Membuat Countdown Timer section yang menampilkan hitung mundur menuju hari-H acara. Timer harus real-time (update setiap detik) dan menampilkan hari, jam, menit, detik.

## Konteks

Countdown timer membangun antusiasme dan urgency. Setelah acara selesai, section ini bisa berubah menjadi pesan "Terima kasih telah hadir!" atau disembunyikan.

**Penting:** Ini adalah client component karena menggunakan `setInterval` untuk update real-time.

## Spesifikasi Desain

- **Background:** Coklat tua (`bg-primary-dark`) dengan teks putih — kontras dengan section sebelumnya
- **Layout:** Centered, 4 kotak angka (Hari, Jam, Menit, Detik)
- **Visual:** Angka besar, label kecil di bawah
- **Animasi:** Angka berubah dengan transisi halus
- **Post-event state:** Tampilkan pesan terima kasih

## Langkah-Langkah

### 1. Buat `components/sections/Countdown.tsx`

```typescript
"use client";

import { useState, useEffect } from "react";
import { eventData } from "@/data/event";

interface TimeLeft {
  hari: number;
  jam: number;
  menit: number;
  detik: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });
  const [isEventPassed, setIsEventPassed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const targetDate = new Date(eventData.tanggal + "T07:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsEventPassed(true);
        return;
      }

      setTimeLeft({
        hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        jam: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        menit: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        detik: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Hindari hydration mismatch
  if (!isMounted) {
    return (
      <section className="py-16 md:py-20 bg-primary-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white text-lg">Memuat countdown...</p>
        </div>
      </section>
    );
  }

  // State setelah acara selesai
  if (isEventPassed || eventData.status === "post-event") {
    return (
      <section className="py-16 md:py-20 bg-primary-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="font-accent text-accent text-xl mb-2">Alhamdulillah</p>
          <h2 className="font-heading text-3xl md:text-4xl text-white font-bold mb-4">
            Terima Kasih Telah Hadir!
          </h2>
          <p className="text-white/70 text-lg">
            Semoga silaturahmi kita tetap terjaga hingga pertemuan berikutnya.
          </p>
        </div>
      </section>
    );
  }

  const timeUnits = [
    { label: "Hari", value: timeLeft.hari },
    { label: "Jam", value: timeLeft.jam },
    { label: "Menit", value: timeLeft.menit },
    { label: "Detik", value: timeLeft.detik },
  ];

  return (
    <section className="py-16 md:py-20 bg-primary-dark">
      <div className="container mx-auto px-4 text-center">
        <p className="font-accent text-accent text-xl mb-2">Hitung Mundur</p>
        <h2 className="font-heading text-3xl md:text-4xl text-white font-bold mb-10">
          Menuju Hari Berkumpul
        </h2>

        <div className="flex justify-center gap-4 md:gap-8">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 md:p-6 min-w-[70px] md:min-w-[100px]">
                <span className="text-3xl md:text-5xl font-bold text-white font-heading">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <p className="text-white/60 text-sm md:text-base mt-2">
                {unit.label}
              </p>
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
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Countdown from "@/components/sections/Countdown";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Countdown />
    </>
  );
}
```

## Hal yang Perlu Diperhatikan

### Hydration Mismatch
- Server dan client akan punya waktu berbeda
- Gunakan `isMounted` state untuk menghindari hydration error
- Tampilkan loading/placeholder sebelum mounted

### Timezone
- Gunakan waktu WIB (UTC+7) atau sesuaikan
- `new Date(eventData.tanggal + "T07:00:00")` akan menggunakan timezone lokal user

### Post-Event
- Cek `eventData.status` untuk menentukan tampilan
- Jika tanggal sudah lewat, otomatis tampilkan pesan terima kasih

## Definition of Done

- [ ] Countdown menampilkan hari, jam, menit, detik
- [ ] Timer update real-time setiap detik
- [ ] Tidak ada hydration mismatch error di console
- [ ] Setelah tanggal lewat, tampilkan pesan "Terima Kasih"
- [ ] Angka selalu 2 digit (padStart dengan "0")
- [ ] Responsive: angka dan spacing menyesuaikan layar
- [ ] Background coklat tua memberikan kontras visual yang baik

## Tips untuk Junior

- `"use client"` WAJIB karena menggunakan useState dan useEffect
- `isMounted` pattern penting untuk menghindari error SSR vs client mismatch
- `padStart(2, "0")` membuat angka selalu 2 digit (01, 02, ... bukan 1, 2, ...)
- Jangan lupa `clearInterval` di cleanup function useEffect (mencegah memory leak)
- Test dengan mengubah tanggal di `data/event.ts` ke tanggal yang sudah lewat untuk test post-event state
