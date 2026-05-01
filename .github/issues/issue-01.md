## Deskripsi

Membuat fondasi project Next.js dengan konfigurasi static export, Tailwind CSS, Framer Motion, dan struktur folder yang sudah ditentukan.

## Konteks

Website ini adalah **fully static site** (tanpa database, tanpa backend). Semua data akan di-hardcode dalam file TypeScript. Website akan di-deploy ke Vercel free tier.

**Referensi:** Baca `plan.md` section 7 (Teknologi & Arsitektur) untuk detail lengkap.

## Langkah-Langkah

### 1. Buat Project Next.js

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

Pilih **Yes** untuk TypeScript, Tailwind, ESLint, App Router. Pilih **No** untuk `src/` directory.

### 2. Install Dependencies Tambahan

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

Penjelasan:
- `framer-motion` - library animasi (scroll reveal, parallax, dll)
- `lucide-react` - icon library (ringan, tree-shakeable)
- `clsx` + `tailwind-merge` - utility untuk menggabungkan class Tailwind secara conditional

### 3. Setup `next.config.js` untuk Static Export

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

**Penting:** `output: 'export'` membuat Next.js generate static HTML. `images.unoptimized: true` diperlukan karena static export tidak support Next.js Image Optimization API.

### 4. Setup Tailwind Config dengan Custom Colors

Edit `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6B4226",
          light: "#A67B5B",
          dark: "#2C1810",
        },
        secondary: "#A67B5B",
        accent: "#D4A574",
        background: "#FDF8F3",
        success: "#4A7C59",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        accent: ["var(--font-dancing)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
```

### 5. Setup Google Fonts di `app/layout.tsx`

```typescript
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});
```

Lalu apply di body:

```tsx
<body className={`${playfair.variable} ${inter.variable} ${dancing.variable} font-body`}>
  {children}
</body>
```

### 6. Setup `globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-primary-dark font-body;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

html {
  scroll-behavior: smooth;
}
```

### 7. Buat Folder Structure

Buat folder-folder berikut (isi `.gitkeep` agar ter-track git):

```
components/
  layout/
  sections/
  ui/
data/
lib/
public/
  images/
    hero/
    gallery/
    venue/
    family/
    ornaments/
  videos/
```

### 8. Buat Utility Function `lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 9. Buat `lib/constants.ts`

```typescript
export const SITE_CONFIG = {
  name: "Gathering Keluarga Surosentono 2025",
  tagline: "Mempererat Tali Silaturahmi",
  url: "https://surosentono-gathering.vercel.app",
  whatsappNumber: "62812XXXXXXXX",
  googleFormUrl: "https://forms.gle/XXXXX",
};

export const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Jadwal", href: "#jadwal" },
  { label: "Lokasi", href: "#lokasi" },
  { label: "Galeri", href: "#galeri" },
];
```

### 10. Verifikasi Setup

Jalankan `npm run dev` dan pastikan:
- [ ] Website bisa diakses di `localhost:3000`
- [ ] Tailwind CSS berfungsi (coba tambah class warna custom)
- [ ] Font Playfair Display dan Inter ter-load
- [ ] Tidak ada error di console

Jalankan `npm run build` dan pastikan:
- [ ] Build berhasil tanpa error
- [ ] Output folder `out/` ter-generate (static export)

## Definition of Done

- [ ] Project Next.js ter-setup dengan TypeScript + App Router
- [ ] Tailwind CSS terkonfigurasi dengan custom colors dan fonts
- [ ] Framer Motion, Lucide React, clsx, tailwind-merge ter-install
- [ ] `next.config.js` sudah set `output: 'export'`
- [ ] Google Fonts (Playfair Display, Inter, Dancing Script) ter-setup
- [ ] Folder structure sesuai plan
- [ ] `lib/utils.ts` dan `lib/constants.ts` sudah dibuat
- [ ] `npm run dev` berjalan tanpa error
- [ ] `npm run build` menghasilkan static export di folder `out/`

## Referensi

- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Tailwind CSS Configuration](https://tailwindcss.com/docs/configuration)
- [next/font Google Fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
