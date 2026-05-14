# Update Branding — Ganti Teks dengan Gambar Logo

## Tujuan
Mengganti teks judul di **Header (Navbar)** dan **Hero** section dengan gambar branding resmi agar tampilan lebih konsisten dengan identitas visual acara.

---

## Perubahan 1: Header (Navbar)

### File: `components/layout/Navbar.tsx`

**Yang dihapus** — Baris 40–49, yaitu elemen `<a>` yang menampilkan teks `{SITE_CONFIG.name}`:

```tsx
<a
  href="#beranda"
  onClick={(e) => {
    e.preventDefault();
    handleNavClick("#beranda");
  }}
  className="font-heading text-lg md:text-xl font-bold text-white truncate max-w-[200px] md:max-w-none"
>
  {SITE_CONFIG.name}
</a>
```

**Yang menggantikan** — Elemen `<a>` yang sama tetapi isinya adalah `<img>` bukan teks:

```tsx
<a
  href="#beranda"
  onClick={(e) => {
    e.preventDefault();
    handleNavClick("#beranda");
  }}
  className="flex items-center"
>
  <img
    src="/images/branding/logo-organizer.png"
    alt="Halal Bi Halal — Jejak Warisan Suro Sentono"
    className="h-10 md:h-14 w-auto"
  />
</a>
```

> **PENTING:**
> - Gunakan `h-10` (40px) untuk mobile dan `md:h-14` (56px) untuk desktop.
> - Pastikan `alt` text tetap ada untuk aksesibilitas.
> - `w-auto` agar rasio aspek gambar terjaga.

---

## Perubahan 2: Hero Section

### File: `components/sections/Hero.tsx`

**Yang dihapus** — Tiga blok `<motion.div>` / `<motion.h1>` di baris 28–58, yaitu:

1. **Subtitle label** (baris 28–37) — `"Halal Bi Halal"` badge
2. **Accent tagline** (baris 40–48) — `"Jejak Warisan"` text
3. **Main title** (baris 51–58) — `"MBAH SURO SENTONO"` heading

**Yang menggantikan** — Satu blok `<motion.div>` berisi `<img>` gambar `moto.png`:

```tsx
{/* Branding Image — menggantikan subtitle, tagline, dan main title */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="mb-4 md:mb-6 flex justify-center"
>
  <img
    src="/images/branding/moto.png"
    alt="Jejak Warisan Mbah Suro Sentono"
    className="w-[280px] sm:w-[360px] md:w-[480px] lg:w-[600px] xl:w-[700px] h-auto"
  />
</motion.div>
```

> **PENTING:**
> - Blok baru ini menggantikan **tiga blok sekaligus** (baris 28–58).
> - Elemen setelahnya (tagline deskripsi `{eventData.tagline}` di baris 61–68) **tetap dipertahankan**.
> - Ukuran responsif: `w-[280px]` mobile → `xl:w-[700px]` desktop terbesar.
> - `h-auto` menjaga rasio aspek.

---

## Ringkasan File yang Diubah

| File | Aksi |
|------|------|
| `components/layout/Navbar.tsx` | Ganti teks `{SITE_CONFIG.name}` dengan `<img>` logo-organizer.png |
| `components/sections/Hero.tsx` | Hapus 3 blok teks (subtitle + tagline + title), ganti dengan 1 `<img>` moto.png |

---

## Verifikasi

1. Buka browser di `http://localhost:3000`
2. Pastikan **header** menampilkan gambar logo (bukan teks), ukuran proporsional di mobile & desktop
3. Pastikan **hero** menampilkan gambar moto (bukan teks), ukuran fit di semua breakpoint
4. Pastikan tidak ada teks duplikat yang masih muncul
5. Scroll ke bawah — pastikan section lain tidak terpengaruh
