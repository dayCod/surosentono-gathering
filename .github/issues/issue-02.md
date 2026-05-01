## Deskripsi

Membuat semua file data TypeScript yang akan menjadi "database" statis untuk website. Semua konten website (rundown, galeri, venue, dll) akan disimpan di file-file ini.

## Konteks

Karena website ini fully static (tanpa database), semua data disimpan sebagai TypeScript constants. Ketika ingin update konten, cukup edit file-file ini lalu push ke GitHub.

**Referensi:** Baca `plan.md` section 7.2 (Data Management) untuk contoh lengkap.

## Langkah-Langkah

### 1. Buat `data/event.ts` - Informasi Acara

```typescript
export const eventData = {
  nama: "Gathering Keluarga Surosentono 2025",
  tanggal: "2025-08-17", // Format: YYYY-MM-DD (sesuaikan tanggal asli)
  waktu: "07:00 WIB - Selesai",
  tagline: "Mempererat Tali Silaturahmi",
  deskripsi:
    "Acara gathering tahunan keluarga besar Surosentono untuk mempererat tali silaturahmi antar generasi. Mari berkumpul, berbagi cerita, dan membangun kenangan indah bersama.",
  status: "pre-event" as const, // "pre-event" | "post-event"
};

export type EventStatus = "pre-event" | "post-event";
```

### 2. Buat `data/rundown.ts` - Jadwal Acara

```typescript
export interface RundownItem {
  id: number;
  waktuMulai: string;
  waktuSelesai: string;
  judul: string;
  deskripsi: string;
  ikon: string; // nama icon dari lucide-react
}

export const rundownData: RundownItem[] = [
  {
    id: 1,
    waktuMulai: "07:00",
    waktuSelesai: "08:00",
    judul: "Registrasi & Welcome Coffee",
    deskripsi: "Pendaftaran peserta dan menikmati kopi pagi bersama",
    ikon: "coffee",
  },
  {
    id: 2,
    waktuMulai: "08:00",
    waktuSelesai: "08:30",
    judul: "Pembukaan & Sambutan",
    deskripsi: "Sambutan dari tetua keluarga dan panitia acara",
    ikon: "mic",
  },
  {
    id: 3,
    waktuMulai: "08:30",
    waktuSelesai: "09:30",
    judul: "Sesi Foto Keluarga Besar",
    deskripsi: "Foto bersama seluruh keluarga besar Surosentono",
    ikon: "camera",
  },
  {
    id: 4,
    waktuMulai: "09:30",
    waktuSelesai: "11:30",
    judul: "Games & Aktivitas Bersama",
    deskripsi: "Berbagai permainan seru untuk semua usia",
    ikon: "gamepad-2",
  },
  {
    id: 5,
    waktuMulai: "11:30",
    waktuSelesai: "13:00",
    judul: "Makan Siang Bersama",
    deskripsi: "Menikmati hidangan khas Sunda bersama keluarga",
    ikon: "utensils",
  },
  {
    id: 6,
    waktuMulai: "13:00",
    waktuSelesai: "14:30",
    judul: "Sesi Sharing & Cerita",
    deskripsi: "Berbagi cerita dan pengalaman antar generasi",
    ikon: "heart",
  },
  {
    id: 7,
    waktuMulai: "14:30",
    waktuSelesai: "15:30",
    judul: "Doorprize & Penutupan",
    deskripsi: "Pengundian doorprize dan penutupan acara",
    ikon: "gift",
  },
];
```

### 3. Buat `data/gallery.ts` - Data Galeri

```typescript
export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: "keluarga" | "venue" | "acara" | "candid";
  featured?: boolean;
}

export const galleryData: GalleryItem[] = [
  // Pre-event: isi dengan foto-foto keluarga lama / gathering sebelumnya
  // Post-event: tambahkan foto-foto dari acara
  {
    id: 1,
    src: "/images/gallery/placeholder-1.jpg",
    alt: "Foto keluarga besar Surosentono",
    category: "keluarga",
    featured: true,
  },
  {
    id: 2,
    src: "/images/gallery/placeholder-2.jpg",
    alt: "Gathering tahun lalu",
    category: "acara",
    featured: true,
  },
  // Tambahkan lebih banyak foto...
];

// Filter helper
export const getGalleryByCategory = (category: GalleryItem["category"]) =>
  galleryData.filter((item) => item.category === category);

export const getFeaturedGallery = () =>
  galleryData.filter((item) => item.featured);
```

### 4. Buat `data/venue.ts` - Data Venue

```typescript
export interface VenueImage {
  src: string;
  alt: string;
}

export const venueData = {
  nama: "Nama Venue", // Ganti dengan nama venue asli
  alamat: "Jl. Contoh No. 123, Bogor, Jawa Barat 16000",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=XXXXX", // Ganti dengan embed URL asli
  mapsLink: "https://goo.gl/maps/XXXXX", // Ganti dengan link Google Maps
  fasilitas: [
    "Parkir Luas",
    "Mushola",
    "Playground Anak",
    "Toilet Bersih",
    "Area Outdoor",
  ],
  petunjukArah: [
    "Dari Tol Jagorawi, ambil exit Bogor",
    "Lurus ke arah Jl. Pajajaran",
    "Belok kiri di pertigaan XXX",
    "Venue berada di sebelah kanan jalan",
  ],
  images: [
    { src: "/images/venue/venue-1.jpg", alt: "Tampak depan venue" },
    { src: "/images/venue/venue-2.jpg", alt: "Area outdoor" },
    { src: "/images/venue/venue-3.jpg", alt: "Ruang utama" },
  ] as VenueImage[],
  videoUrl: "", // YouTube embed URL jika ada video venue
  dressCode: "Smart Casual - Nuansa Coklat/Earth Tone",
};
```

### 5. Buat `data/family-tree.ts` - Data Silsilah

```typescript
export interface FamilyMember {
  id: string;
  nama: string;
  generasi: number; // 1 = tertua
  pasangan?: string;
  foto?: string;
  children?: string[]; // array of id
}

export const familyTreeData: FamilyMember[] = [
  {
    id: "surosentono",
    nama: "Surosentono",
    generasi: 1,
    pasangan: "Nama Istri",
    foto: "/images/family/surosentono.jpg",
    children: ["anak-1", "anak-2", "anak-3"],
  },
  // Tambahkan anggota keluarga lainnya...
  // Data ini perlu diisi berdasarkan informasi dari keluarga
];

// Jumlah generasi
export const totalGenerasi = 4; // Sesuaikan
```

### 6. Buat `data/messages.ts` - Pesan & Harapan

```typescript
export interface MessageItem {
  id: number;
  nama: string;
  pesan: string;
  foto?: string; // opsional
  hubungan?: string; // misal: "Generasi ke-2", "Cucu"
}

export const messagesData: MessageItem[] = [
  {
    id: 1,
    nama: "Nama Tetua",
    pesan: "Semoga silaturahmi keluarga kita tetap terjaga dari generasi ke generasi. Jangan pernah lupa akar kita.",
    foto: "/images/family/tetua.jpg",
    hubungan: "Generasi ke-2",
  },
  {
    id: 2,
    nama: "Nama Anggota",
    pesan: "Senang sekali bisa berkumpul bersama keluarga besar. Semoga acara ini menjadi tradisi tahunan kita.",
    hubungan: "Generasi ke-3",
  },
  // Tambahkan pesan lainnya...
  // Kumpulkan via WhatsApp group lalu masukkan ke sini
];
```

### 7. Buat Placeholder Images

Untuk development, buat placeholder images agar tidak error:
- Buat file gambar placeholder (bisa pakai https://placehold.co)
- Atau buat komponen placeholder yang menampilkan kotak abu-abu

Taruh di:
- `public/images/gallery/placeholder-1.jpg`
- `public/images/venue/venue-1.jpg`
- `public/images/hero/hero-bg.jpg`

Tips: Gunakan gambar berukuran kecil dulu (< 100KB) untuk development.

## Definition of Done

- [ ] `data/event.ts` sudah dibuat dengan type yang benar
- [ ] `data/rundown.ts` sudah dibuat dengan minimal 5 item rundown
- [ ] `data/gallery.ts` sudah dibuat dengan interface dan helper functions
- [ ] `data/venue.ts` sudah dibuat dengan semua field yang diperlukan
- [ ] `data/family-tree.ts` sudah dibuat dengan interface (data bisa placeholder)
- [ ] `data/messages.ts` sudah dibuat dengan minimal 2 contoh pesan
- [ ] Semua file tidak ada TypeScript error (`npm run build` sukses)
- [ ] Placeholder images sudah ada di folder `public/images/`

## Tips untuk Junior

- Semua data ini adalah **placeholder** yang nanti akan diganti dengan data asli
- Pastikan TypeScript types/interfaces sudah benar agar tidak error saat dipakai di komponen
- Gunakan `as const` untuk literal types jika diperlukan
- Export semua yang diperlukan (data + types + helper functions)
