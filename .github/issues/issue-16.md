## Deskripsi

Testing akhir, optimasi performance, dan deploy website ke Vercel. Memastikan website siap digunakan dan bisa diakses oleh keluarga.

## Konteks

Ini adalah tahap terakhir sebelum website di-share ke keluarga. Harus dipastikan:
- Website cepat (Lighthouse score 90+)
- Responsive di semua device
- Tidak ada bug/error
- Sudah live di URL yang bisa diakses

## Langkah-Langkah

### 1. Testing Responsiveness

Test di berbagai ukuran layar menggunakan Chrome DevTools:
- [ ] iPhone SE (375px) - layar kecil
- [ ] iPhone 12/13 (390px) - standar
- [ ] iPad (768px) - tablet
- [ ] iPad Pro (1024px) - tablet besar
- [ ] Laptop (1366px) - laptop standar
- [ ] Desktop (1920px) - monitor besar

**Untuk setiap ukuran, cek:**
- [ ] Teks tidak terpotong atau overflow
- [ ] Gambar tidak stretch atau pecah
- [ ] Tombol bisa di-tap/klik
- [ ] Navbar mobile menu berfungsi
- [ ] Scroll smooth berfungsi
- [ ] Lightbox berfungsi

### 2. Testing Cross-Browser

Test di browser yang umum dipakai keluarga:
- [ ] Chrome (desktop + mobile)
- [ ] Safari (iPhone)
- [ ] Samsung Internet (HP Samsung)
- [ ] Firefox (opsional)

### 3. Performance Optimization

#### a. Optimasi Gambar

```bash
# Install sharp untuk optimasi (opsional, untuk development)
# Atau gunakan online tools:
# - https://squoosh.app/
# - https://tinypng.com/
```

Checklist gambar:
- [ ] Semua gambar < 200KB (idealnya < 100KB)
- [ ] Format WebP jika memungkinkan
- [ ] Dimensi sesuai kebutuhan (jangan upload foto 4000px jika ditampilkan 800px)
- [ ] Hero image < 300KB
- [ ] Gallery thumbnails < 100KB each

#### b. Lighthouse Audit

```bash
npm run build
npx serve out
# Buka Chrome > DevTools > Lighthouse > Run audit
```

Target score:
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

#### c. Fix Common Issues

| Issue | Fix |
|-------|-----|
| Large images | Compress + resize |
| Missing alt text | Tambahkan alt di semua img |
| Low contrast | Pastikan rasio 4.5:1 |
| Missing meta | Cek issue #15 |
| Unused CSS | Tailwind purge otomatis handle |
| No HTTPS | Vercel otomatis HTTPS |

### 4. Build Final

```bash
# Clean build
rm -rf .next out node_modules/.cache

# Install fresh
npm install

# Build
npm run build

# Test locally
npx serve out
# Buka http://localhost:3000 dan test semua fitur
```

Pastikan:
- [ ] Build sukses tanpa error
- [ ] Folder `out/` ter-generate
- [ ] Website berfungsi saat di-serve dari folder `out/`

### 5. Deploy ke Vercel

#### Opsi A: Via Vercel Dashboard (Recommended untuk pertama kali)

1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik "New Project"
4. Import repository `surosentono-gathering`
5. Framework Preset: Next.js (otomatis terdeteksi)
6. Klik "Deploy"
7. Tunggu build selesai
8. Website live di `https://surosentono-gathering.vercel.app`

#### Opsi B: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### 6. Post-Deploy Verification

Setelah deploy, verifikasi di URL production:
- [ ] Website bisa diakses di URL Vercel
- [ ] Semua section tampil dengan benar
- [ ] Gambar semua ter-load
- [ ] Link external (Google Maps, Google Form, WhatsApp) berfungsi
- [ ] Smooth scroll berfungsi
- [ ] Lightbox berfungsi
- [ ] Mobile responsive
- [ ] Share di WhatsApp menampilkan OG preview

### 7. Custom Domain (Opsional)

Jika ingin pakai domain sendiri:
1. Beli domain (misal: surosentono.id)
2. Di Vercel Dashboard > Project > Settings > Domains
3. Tambahkan domain
4. Update DNS records sesuai instruksi Vercel
5. Tunggu propagasi (5-30 menit)

### 8. Setup Auto-Deploy

Vercel otomatis deploy setiap push ke branch `master`/`main`:
- Push code → Vercel detect → Build → Deploy
- Tidak perlu manual deploy lagi setelah setup awal

## Definition of Done

- [ ] Website responsive di semua ukuran layar yang ditest
- [ ] Tidak ada console error di production
- [ ] Lighthouse Performance score 90+
- [ ] Lighthouse Accessibility score 90+
- [ ] Semua gambar ter-optimasi (< 200KB)
- [ ] Build sukses tanpa error
- [ ] Website live di Vercel URL
- [ ] Semua fitur berfungsi di production
- [ ] WhatsApp share preview tampil dengan benar
- [ ] Link Google Form dan WhatsApp berfungsi

## Tips untuk Junior

- Selalu test di HP asli (bukan hanya DevTools) sebelum share ke keluarga
- Lighthouse score di mobile biasanya lebih rendah dari desktop - fokus mobile
- Jika gambar terlalu besar, itu penyebab #1 website lambat
- Vercel free tier sangat generous untuk website seperti ini
- Setelah deploy, minta 2-3 anggota keluarga test buka di HP mereka
- Simpan URL Vercel dashboard untuk monitoring dan future updates
- Jangan lupa update `SITE_CONFIG.url` di constants dengan URL production yang benar
