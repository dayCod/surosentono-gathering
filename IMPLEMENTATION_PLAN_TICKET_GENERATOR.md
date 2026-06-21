# Implementation Plan: Ticket Generator Page

## Overview

Buat halaman baru `/tiket` yang berisi **Ticket Generator** — form interaktif untuk membuat tiket acara "Jejak Warisan Suro Sentono". User memilih nama keluarga (dari data xlsx), jenis tiket, jumlah pax, lalu generate tiket yang bisa dicetak/simpan PDF.

---

## Tech Stack (Existing)

- Next.js 16 (App Router, `output: "export"` — static HTML)
- React 19, TypeScript
- Tailwind CSS 4 (via `@tailwindcss/postcss`)
- Framer Motion (animasi)
- Fonts: Outfit, Inter, Playfair Display (sudah ada di layout)

## Fonts Tambahan (Khusus Ticket Generator)

- **Archivo** (weights: 400–900, italic) — body text di tiket
- **Archivo Black** — display/heading di tiket
- Load via Google Fonts di halaman ini saja

---

## Data Source

### File: `datasheets/21-06-2026.xlsx`

**Sheet:** "Form Responses 1"

**Kolom yang relevan:**
| Kolom | Keterangan |
|-------|------------|
| `Timestamp` | Waktu submit (format: `5/14/2026 14:56:02`) |
| `Nama Keluarga` | Nama keluarga, contoh: `KELUARGA SAMSUL HUDA` |
| `Jumlah Anggota Keluarga` | Contoh: `3 Orang` |
| `Nama & Umur Anggota Keluarga 1–15` | Nama tiap anggota |
| `Nama PIC` | Penanggung jawab |
| `Email PIC` | Email |
| `Nomor WhatsApp PIC` | WhatsApp |

### Strategi Data Loading

Karena project menggunakan `output: "export"` (fully static), **tidak bisa pakai API routes**. Strategi:

1. Buat **build script** (`scripts/generate-ticket-data.ts`) yang membaca xlsx dan output ke `data/ticket-families.ts`
2. Script dijalankan sebelum build (`prebuild` di package.json)
3. Halaman ticket generator import data dari `data/ticket-families.ts`

### Langkah Data Processing:

1. Baca file xlsx terbaru dari folder `datasheets/` (sort by filename/timestamp, ambil yang paling baru)
2. Parse semua row, ambil kolom `Nama Keluarga`
3. Buat unique list (deduplicate), sort alphabetically
4. Bersihkan prefix "KELUARGA " jika ada (agar tampil bersih di select)
5. Export sebagai array of strings

---

## File Structure (Yang Perlu Dibuat/Diubah)

```
surosentono-gathering/
├── app/
│   └── tiket/
│       └── page.tsx              ← [BARU] Halaman ticket generator
├── components/
│   └── ticket/
│       ├── TicketForm.tsx        ← [BARU] Form input (kiri)
│       └── TicketPreview.tsx     ← [BARU] Preview tiket (kanan)
├── data/
│   └── ticket-families.ts       ← [BARU] Data keluarga (generated)
├── scripts/
│   └── generate-ticket-data.ts  ← [BARU] Script untuk parse xlsx
├── lib/
│   └── constants.ts             ← [UBAH] Tambah nav link /tiket (opsional)
└── package.json                 ← [UBAH] Tambah xlsx dependency + prebuild script
```

---

## Step-by-Step Implementation

### Step 1: Install Dependencies

```bash
npm install xlsx --save-dev
```

`xlsx` (SheetJS) digunakan di build script saja, bukan di client bundle.

---

### Step 2: Buat Build Script — `scripts/generate-ticket-data.ts`

```typescript
// scripts/generate-ticket-data.ts
import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";

const DATASHEETS_DIR = path.join(process.cwd(), "datasheets");
const OUTPUT_FILE = path.join(process.cwd(), "data", "ticket-families.ts");

// 1. Cari file xlsx terbaru di folder datasheets/
const files = fs.readdirSync(DATASHEETS_DIR)
  .filter(f => f.endsWith(".xlsx"))
  .sort()
  .reverse(); // Sort descending by name (nama file = tanggal)

if (files.length === 0) {
  console.error("No xlsx files found in datasheets/");
  process.exit(1);
}

const latestFile = path.join(DATASHEETS_DIR, files[0]);
console.log(`Reading: ${latestFile}`);

// 2. Parse xlsx
const wb = XLSX.readFile(latestFile);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

// 3. Cari index kolom "Nama Keluarga"
const headers = rows[0].map(h => String(h).trim().toLowerCase());
const familyColIdx = headers.findIndex(h => h.includes("nama keluarga"));

if (familyColIdx === -1) {
  console.error("Column 'Nama Keluarga' not found!");
  process.exit(1);
}

// 4. Extract unique family names
const familyNames = rows
  .slice(1)
  .map(row => row[familyColIdx])
  .filter(Boolean)
  .map(name => {
    // Bersihkan prefix "KELUARGA " jika ada
    const cleaned = String(name).trim();
    return cleaned.replace(/^KELUARGA\s+/i, "");
  });

const uniqueFamilies = [...new Set(familyNames)].sort();

// 5. Write output file
const output = `// AUTO-GENERATED — DO NOT EDIT MANUALLY
// Generated from: ${files[0]}
// Run: npm run generate-ticket-data

export const ticketFamilies: string[] = ${JSON.stringify(uniqueFamilies, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, output, "utf-8");
console.log(`Generated ${OUTPUT_FILE} with ${uniqueFamilies.length} families.`);
```

**Tambahkan di `package.json`:**

```json
{
  "scripts": {
    "generate-ticket-data": "npx tsx scripts/generate-ticket-data.ts",
    "prebuild": "npm run generate-ticket-data"
  }
}
```

---

### Step 3: Buat Data File (Initial/Fallback) — `data/ticket-families.ts`

```typescript
// AUTO-GENERATED — DO NOT EDIT MANUALLY
// Fallback data jika script belum dijalankan

export const ticketFamilies: string[] = [
  "SAMSUL HUDA",
];
```

---

### Step 4: Buat Halaman — `app/tiket/page.tsx`

```typescript
"use client";

import { useState } from "react";
import TicketForm from "@/components/ticket/TicketForm";
import TicketPreview from "@/components/ticket/TicketPreview";

export interface TicketData {
  nama: string;
  keluarga: string;
  jenis: "makan" | "kamar";
  pax: number;
  issued: boolean;
  serial: number;
}

export default function TicketPage() {
  const [ticket, setTicket] = useState<TicketData>({
    nama: "",
    keluarga: "", // akan di-set dari default family list
    jenis: "makan",
    pax: 1,
    issued: false,
    serial: 0,
  });

  return (
    <>
      {/* Google Fonts khusus halaman ini */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500;1,700;1,900&family=Archivo+Black&display=swap"
        rel="stylesheet"
      />

      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(120% 90% at 85% 0%, #2a1340 0%, #16101f 55%, #0e0a16 100%)",
        fontFamily: "'Archivo', sans-serif",
        color: "#fff",
        padding: "40px 28px 72px",
      }}>
        {/* TOP BAR */}
        {/* ... lihat detail di section "UI Components" */}

        {/* HEADING */}
        {/* ... lihat detail di section "UI Components" */}

        {/* MAIN GRID: Form + Preview */}
        <div style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "380px minmax(0,1fr)",
          gap: 30,
          alignItems: "start",
        }}>
          <TicketForm ticket={ticket} setTicket={setTicket} />
          <TicketPreview ticket={ticket} />
        </div>
      </div>
    </>
  );
}
```

**Penting:** Halaman ini TIDAK menggunakan root layout Navbar/Footer. Buat custom layout atau override. Lihat langkah opsional di bawah.

---

### Step 5: Buat Component — `components/ticket/TicketForm.tsx`

**Props:**
```typescript
interface TicketFormProps {
  ticket: TicketData;
  setTicket: React.Dispatch<React.SetStateAction<TicketData>>;
}
```

**Isi form (urutan field):**

1. **Nama Lengkap** — `<input type="text">` dengan placeholder "Tulis nama tamu"
2. **Nama Keluarga** — `<select>` dengan options dari `ticketFamilies` (import dari `data/ticket-families.ts`). Format display: `Keluarga {nama}`. Gunakan `appearance: none` dengan custom chevron `▼` warna lime.
3. **Jenis Tiket** — 2 segmented buttons: "Hanya Makan" (100K/pax) dan "Kamar & Makan" (200K/pax)
4. **Jumlah Pax** — Stepper: tombol `−`, display angka, tombol `+`. Clamp 1–99.
5. **Total** — Computed: `price × pax`, format `Rp X.XXX.XXX` (locale id-ID)
6. **Generate Tiket** button — Set `issued: true`, increment `serial`
7. **Cetak / Simpan PDF** button — Call `window.print()`

**Behavior:**
- Setiap perubahan field → set `issued: false` (reset tiket)
- Default keluarga = item pertama dari `ticketFamilies`

**Styling (wajib diikuti persis):**

| Element | Style |
|---------|-------|
| Card wrapper | `background: rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.1)`, `border-radius: 4px`, `padding: 26px 24px` |
| Labels | `font-size: 11px`, `letter-spacing: 0.18em`, `font-weight: 700`, `text-transform: uppercase`, `color: #c6f03c` |
| Inputs/selects | `background: #241733`, `border: 1px solid rgba(255,255,255,0.14)`, `border-radius: 3px`, `color: #fff`, `font-size: 15px`, `font-weight: 600`, `padding: 13px 14px`; focus: `border-color: #c6f03c` |
| Active button (jenis) | `background: #c6f03c`, `color: #16101f`, `border: 1px solid #c6f03c` |
| Inactive button (jenis) | `background: #241733`, `color: #fff`, `border: 1px solid rgba(255,255,255,0.14)` |
| Generate button | `background: #c6f03c`, `color: #16101f`, Archivo Black 14px, hover: `#d6ff52` |
| Print button | `transparent`, `border: 1px solid rgba(255,255,255,0.2)`, hover: `border-color: #c6f03c; color: #c6f03c` |

---

### Step 6: Buat Component — `components/ticket/TicketPreview.tsx`

**Props:**
```typescript
interface TicketPreviewProps {
  ticket: TicketData;
}
```

**Structure:**
- Eyebrow text: "PRATINJAU TIKET" + "· TERBIT" saat issued
- Ticket container: `aspect-ratio: 3.35 / 1`, flex layout
- Footer: `No. Tiket: SS27-<M|K>-<5digit>` + kode 6 digit

**Ticket terdiri dari 2 bagian:**

#### A. Stub (kiri, width 23%)
- Border-right: `3px dashed <bodyBg>` (efek perforasi)
- Isi: barcode strip (CSS gradient), QR grid (13×13), vertical title
- Vertical title: `writing-mode: vertical-rl; transform: rotate(180deg)`

#### B. Body (kanan, flex:1)
- Background layers: topo contour (repeating-radial-gradient) + diagonal accent (clip-path polygon)
- Content: header "JEJAK WARISAN / SURO SENTONO", tanggal, venue, nama tamu, keluarga, pax, price
- Bottom-right: "organized by the **prakoso.**"

**Theming (driven by `jenis`):**

| Property | `makan` | `kamar` |
|----------|---------|---------|
| Stub BG | `#c6f03c` | `#9d1ae0` |
| Stub FG | `#9d1ae0` | `#c6f03c` |
| Body BG | `#9d1ae0` | `#c6f03c` |
| Body FG | `#c6f03c` | `#9d1ae0` |

**Computed values:**
- `namaLabel`: nama uppercase, atau "NAMA TAMU" jika kosong
- `keluargaLabel`: `KELUARGA <X>` uppercase
- `ticketNo` (issued): `SS27-<M|K>-<5digits>` — digits dari hash
- `priceLabel`: `100K/PAX` atau `200K/PAX`
- `deskripsi` (makan): "Berlaku 1 orang, sudah termasuk 3 kali makan."
- `deskripsi` (kamar): "Berlaku 1 orang, sudah termasuk kamar 1 kasur & 3 kali makan."
- `stubTitle` (makan): "TIKET HANYA MAKAN"
- `stubTitle` (kamar): "TIKET KAMAR & MAKAN"

**Hash function (untuk generate ticket number & QR):**
```typescript
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
```

**Pseudo-QR generation (13×13 grid):**
```typescript
function makeQR(seed: string): number[][] {
  const N = 13;
  let s = hash(seed) || 1;
  const rnd = () => { s = (Math.imul(s, 1103515245) + 12345) >>> 0; return (s >>> 8) / (1 << 24); };
  const grid = Array.from({ length: N }, () => Array(N).fill(0));
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++)
      grid[y][x] = rnd() > 0.5 ? 1 : 0;
  // Finder patterns (7x7 squares at 3 corners)
  const finder = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y++)
      for (let x = 0; x < 7; x++) {
        const edge = x === 0 || x === 6 || y === 0 || y === 6;
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        grid[oy + y][ox + x] = (edge || core) ? 1 : 0;
      }
  };
  finder(0, 0);
  finder(N - 7, 0);
  finder(0, N - 7);
  return grid;
}
```

**Seed** = `"<nama|TAMU>|<keluarga>|<jenis>"`

---

### Step 7: Print CSS

Tambahkan di `app/tiket/page.tsx` (inline style tag atau CSS module):

```css
@media print {
  @page { size: landscape; margin: 0; }
  body * { visibility: hidden !important; }
  #ticketPrintArea, #ticketPrintArea * { visibility: visible !important; }
  #ticketPrintArea { position: fixed; inset: 0; margin: auto; }
}
```

---

### Step 8: Responsive Design

- Breakpoint ~760px: switch grid ke single column (`grid-template-columns: 1fr`)
- Ticket scales via `aspect-ratio` + `clamp()` font sizes
- Tidak ada fixed height pada ticket

---

### Step 9 (Opsional): Layout Override

Halaman `/tiket` memiliki design sendiri (full dark plum background, tanpa Navbar/Footer standard). Opsi:

**Opsi A:** Buat `app/tiket/layout.tsx` yang override root layout:
```typescript
export default function TicketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

**Opsi B:** Tetap di root layout tapi sembunyikan Navbar/Footer dengan conditional. (Kurang disarankan)

**Rekomendasi:** Opsi A — buat layout sendiri tanpa Navbar/Footer.

---

### Step 10 (Opsional): Tambah Link di Navbar

Di `lib/constants.ts`, tambah navigation link:
```typescript
{ label: "Tiket", href: "/tiket" }
```

---

## Design Tokens (Quick Reference)

| Token | Value |
|-------|-------|
| Lime accent | `#c6f03c` |
| Lime hover | `#d6ff52` |
| Purple | `#9d1ae0` |
| Page BG gradient | `radial-gradient(120% 90% at 85% 0%, #2a1340 0%, #16101f 55%, #0e0a16 100%)` |
| Input fill | `#241733` |
| Border subtle | `rgba(255,255,255,0.10)` |
| Border input | `rgba(255,255,255,0.14)` |
| Border medium | `rgba(255,255,255,0.20)` |
| Muted text | `rgba(255,255,255,0.6)` |
| Card radius | `4px` |
| Input/button radius | `3px` |
| Ticket radius | `5px` |
| Ticket shadow | `0 30px 70px -20px rgba(0,0,0,0.7)` |
| Font display | `'Archivo Black', sans-serif` |
| Font body | `'Archivo', sans-serif` |

---

## Top Bar & Heading (Exact Implementation)

### Top Bar:
```
[Lime block 13×40px] [JEJAK WARISAN (11px, lime, .42em spacing)]     [27–28 MARET 2027]
                      [SURO SENTONO (Archivo Black, 21px)]             [BINA KARAKTER HALL (lime)]
```

### Heading:
```
BUAT TIKET               ← Archivo Black, clamp(38px,6vw,72px), white
KAMU SENDIRI.            ← same font, color: #c6f03c

Pilih nama keluarga dan jenis tiket, lalu tiket reuni akbar
akan langsung jadi. Cetak atau simpan untuk dibawa ke acara.
                         ← 15px, rgba(255,255,255,0.6), max-width 480px
```

---

## Checklist Final

- [ ] Install `xlsx` sebagai dev dependency
- [ ] Buat `scripts/generate-ticket-data.ts`
- [ ] Tambah scripts di `package.json` (`generate-ticket-data`, `prebuild`)
- [ ] Buat `data/ticket-families.ts` (initial + auto-generated)
- [ ] Buat `app/tiket/page.tsx`
- [ ] Buat `app/tiket/layout.tsx` (tanpa Navbar/Footer)
- [ ] Buat `components/ticket/TicketForm.tsx`
- [ ] Buat `components/ticket/TicketPreview.tsx`
- [ ] Pastikan print CSS berfungsi
- [ ] Test responsive (< 760px → single column)
- [ ] Jalankan `npm run generate-ticket-data` lalu `npm run build` — pastikan sukses
- [ ] Verifikasi visual match dengan `reference_ticket.jpg`

---

## Catatan untuk Implementor

1. **Jangan pakai Tailwind** untuk styling di halaman ini — gunakan inline styles (sesuai reference `.dc.html` yang full inline). Ini menjaga fidelity dan memudahkan copy values dari design reference.
2. **Perhatikan `output: "export"`** — tidak ada server components yang fetch data. Semua data harus static.
3. **Font Archivo** hanya di-load di halaman `/tiket`, bukan global (agar tidak menambah bundle size halaman lain).
4. **Select options** tampilkan sebagai `Keluarga {nama}` — value-nya cukup nama saja (tanpa prefix).
5. **QR dan barcode bersifat dekoratif** — tidak encode data real. Jika nanti mau real QR, bisa pakai library `qrcode` tapi scope ini cukup pseudo-QR.
