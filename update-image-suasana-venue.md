# Plan: Update Image Suasana Venue — Text ke HTML

## Konteks Masalah

Di section **Suasana Venue** pada file `Venue.tsx`, terdapat carousel gambar venue. Saat ini, **text seperti judul dan deskripsi (contoh: "HALAMAN PARKIR", "Kapasitas +80 Mobil") tertanam/nempel langsung di file gambar**. Ini menyulitkan jika ingin mengubah text.

**Goal:** Pisahkan text dari gambar → render sebagai **HTML overlay** di atas gambar, sehingga text bisa diedit langsung dari kode.

---

## File yang Perlu Diubah

| No | File | Aksi |
|----|------|------|
| 1 | `data/venue.ts` | Tambah field `title` & `subtitle` di interface & data |
| 2 | `components/sections/Venue.tsx` | Render HTML text overlay di carousel |

---

## Step 1 — Update Data (`data/venue.ts`)

### 1a. Tambah field di interface `VenueImage`

```diff
 export interface VenueImage {
   src: string;
   alt: string;
+  title: string;
+  subtitle?: string;
 }
```

### 1b. Isi data `title` dan `subtitle` untuk setiap gambar

Mapping data yang harus diisi (sesuaikan text dengan yang ada di gambar saat ini):

| # | alt (existing) | title | subtitle |
|---|----------------|-------|----------|
| 1 | Halaman Parkir | HALAMAN PARKIR | Kapasitas +80 Mobil |
| 2 | Aula Utama | AULA UTAMA | Kapasitas 200 Orang |
| 3 | Kamar Tidur | KAMAR TIDUR | Twin Bed - Kapasitas 2 Orang |
| 4 | Musholla | MUSHOLLA | — |
| 5 | Ruang Makan | RUANG MAKAN | Kapasitas 200 Orang |
| 6 | Tempat Gym | TEMPAT GYM | — |
| 7 | Ruang Karaoke | RUANG KARAOKE | — |

> **CATATAN:** Untuk gambar yang tidak ada subtitle, isi dengan string kosong `""` atau jangan sertakan field subtitle (karena optional).

> **CATATAN:** Title dan subtitle di atas adalah perkiraan berdasarkan screenshot. User mungkin ingin mengubah isinya setelah implementasi selesai — yang penting strukturnya sudah benar.

---

## Step 2 — Render HTML Text Overlay (`components/sections/Venue.tsx`)

### Lokasi kode yang perlu diubah

Di dalam carousel (sekitar **line 140–149**), setelah `<img>` tag dan setelah gradient overlay (line 152), tambahkan elemen HTML untuk menampilkan `title` dan `subtitle`.

### Yang perlu ditambahkan

Tambahkan **text overlay** di dalam div carousel (setelah gradient overlay di line 152), yang menampilkan `title` dan `subtitle` dari gambar yang sedang aktif (`currentImage`).

```tsx
{/* Text Overlay — Judul & Subtitle gambar */}
<div className="absolute bottom-12 left-6 md:left-10 z-10">
  <h4 className="text-2xl md:text-4xl font-heading font-bold text-white tracking-wide drop-shadow-lg">
    {venueData.images[currentImage].title}
  </h4>
  {venueData.images[currentImage].subtitle && (
    <p className="text-sm md:text-lg text-white/80 mt-1 drop-shadow-md">
      {venueData.images[currentImage].subtitle}
    </p>
  )}
</div>
```

> **TIP:** Posisi `bottom-12` dan `left-6` agar text tidak menabrak dots indicator yang ada di `bottom-6`. Sesuaikan jarak jika diperlukan.

---

## Step 3 — Ganti Gambar (Opsional / Nanti)

Saat ini gambar-gambar masih memiliki text bawaan yang tertanam. Idealnya, gambar perlu diganti dengan versi **tanpa text**. Tapi ini bisa dilakukan belakangan — yang penting HTML overlay sudah jalan dulu.

> **WARNING:** Setelah HTML overlay ditambahkan, text akan muncul **double** (dari gambar + dari HTML) sampai gambar diganti dengan versi bersih. Ini expected behavior sementara.

---

## Checklist Verifikasi

- [ ] Interface `VenueImage` sudah punya `title` dan `subtitle?`
- [ ] Semua 7 data image di `venueData.images` sudah punya field `title`
- [ ] Text overlay muncul di carousel saat di-preview (`npm run dev`)
- [ ] Text berubah sesuai gambar yang aktif saat carousel berpindah
- [ ] Text tidak menabrak navigation arrows atau dots indicator
- [ ] Responsive — tampilan ok di mobile dan desktop
