# Plan Update Silsilah Keluarga (Family Tree)

Dokumen ini berisi instruksi lengkap untuk memperbarui data silsilah keluarga pada file `data/family-tree.ts`. Instruksi ini dirancang agar siap dieksekusi (copy-paste) oleh AI model.

## Tujuan
Memperbarui data dummy pada `familyTreeData` menjadi data asli silsilah keluarga besar Surosentono berdasarkan gambar struktur tulisan tangan, termasuk detail nama lengkap 7 anak dari Prakoso.

## Langkah-langkah Eksekusi

### 1. Modifikasi File `data/family-tree.ts`

Buka file `data/family-tree.ts` dan timpa seluruh isi file tersebut dengan kode di bawah ini:

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
  // Generasi 1: Akar
  {
    id: "surosentono",
    nama: "Surosentono",
    generasi: 1,
    children: ["nasian", "nasiran", "rubini", "marman", "sumiyati", "sarpah", "prakoso"],
  },

  // Generasi 2: Anak-anak Surosentono
  { id: "nasian", nama: "Nasian (Alm)", generasi: 2, children: ["mardianto"] },
  { id: "nasiran", nama: "Nasiran (Alm)", generasi: 2, children: [] },
  { id: "rubini", nama: "Rubini (Alm)", generasi: 2, children: [] },
  { id: "marman", nama: "Marman (Alm)", generasi: 2, children: ["bambang-budi-handoko", "elis-sondari", "iyep-budi-heriyanto", "iis-hendarsih", "agus-budi-susilo", "enung-indah-sri-wulandari"] },
  { id: "sumiyati", nama: "Sumiyati (Alm)", generasi: 2, children: [] },
  { id: "sarpah", nama: "Sarpah", generasi: 2, children: ["sugiono", "anis-s", "agus-s-1", "ugih-s", "agus-s-2", "dudi-s", "tini-r", "tono-b", "iwan-s", "wungu", "harni-p"] },
  { id: "prakoso", nama: "Prakoso (Alm)", generasi: 2, children: ["anita-dukawanti", "joko-wage-winarto", "yuli-eviyanti", "kristi-hermila", "haris-mulya-wisena", "rida-agustini", "dine-nursanti"] },

  // Generasi 3: Cucu-cucu Surosentono
  // Anak Nasian
  { id: "mardianto", nama: "Mardianto", generasi: 3 },
  
  // Anak Marman
  { id: "bambang-budi-handoko", nama: "Bambang Budi Handoko", generasi: 3 },
  { id: "elis-sondari", nama: "Elis Sondari", generasi: 3 },
  { id: "iyep-budi-heriyanto", nama: "Iyep Budi Heriyanto", generasi: 3 },
  { id: "iis-hendarsih", nama: "Iis Hendarsih (Alm)", generasi: 3 },
  { id: "agus-budi-susilo", nama: "Agus Budi Susilo", generasi: 3 },
  { id: "enung-indah-sri-wulandari", nama: "Enung Indah Sri Wulandari", generasi: 3 },

  // Anak Sarpah
  { id: "sugiono", nama: "Sugiono (Alm)", generasi: 3 },
  { id: "anis-s", nama: "Anis. S", generasi: 3 },
  { id: "agus-s-1", nama: "Agus. S", generasi: 3 },
  { id: "ugih-s", nama: "Ugih. S", generasi: 3 },
  { id: "agus-s-2", nama: "Agus. S", generasi: 3 },
  { id: "dudi-s", nama: "Dudi. S", generasi: 3 },
  { id: "tini-r", nama: "Tini. R", generasi: 3 },
  { id: "tono-b", nama: "Tono. B (Alm)", generasi: 3 },
  { id: "iwan-s", nama: "Iwan. S", generasi: 3 },
  { id: "wungu", nama: "Wungu", generasi: 3 },
  { id: "harni-p", nama: "Harni. P", generasi: 3 },

  // Anak Prakoso
  { id: "anita-dukawanti", nama: "Anita Dukawanti", generasi: 3 },
  { id: "joko-wage-winarto", nama: "Joko Wage Winarto", generasi: 3 },
  { id: "yuli-eviyanti", nama: "Yuli Eviyanti", generasi: 3 },
  { id: "kristi-hermila", nama: "Kristi Hermila", generasi: 3 },
  { id: "haris-mulya-wisena", nama: "Haris Mulya Wisena", generasi: 3 },
  { id: "rida-agustini", nama: "Rida Agustini", generasi: 3 },
  { id: "dine-nursanti", nama: "Dine Nursanti", generasi: 3 },
];

// Jumlah generasi diset menjadi 3
export const totalGenerasi = 3;
```

### 2. Verifikasi

1. Buka kembali browser dan lihat hasil perubahannya.
2. Pastikan sekarang data silsilah menampilkan 3 generasi dengan data dari Surosentono, ke-7 anak, hingga cucu-cucunya.
3. Pastikan tidak ada error pada terminal (build errors).
