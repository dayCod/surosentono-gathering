## Deskripsi

Membuat section Pohon Keluarga / Silsilah yang menampilkan visualisasi sederhana hubungan antar generasi keluarga Surosentono.

## Konteks

Section ini membantu generasi muda mengenal hubungan kekeluargaan. Tidak perlu terlalu kompleks - cukup visualisasi 2-3 generasi utama dengan nama dan foto (jika ada). Bisa berupa tree diagram sederhana atau card-based layout per generasi.

**Catatan:** Ini adalah fitur nice-to-have. Jika terlalu kompleks, bisa disederhanakan menjadi infografis statis.

## Spesifikasi Desain

- **Background:** Coklat tua (`bg-primary-dark`) dengan teks putih
- **Layout:** Generasi ditampilkan per baris/level
  - Generasi 1 (atas): Pendiri keluarga
  - Generasi 2: Anak-anak
  - Generasi 3: Cucu-cucu
  - dst.
- **Setiap anggota:** Foto bulat (circle) + nama
- **Garis penghubung:** Garis dari parent ke children (opsional, bisa skip jika sulit)
- **Alternatif simpel:** Card per generasi tanpa garis penghubung

## Langkah-Langkah

### 1. Pendekatan Simpel: Card per Generasi

Jika tree diagram dengan garis terlalu kompleks, gunakan pendekatan ini:

```typescript
import SectionTitle from "@/components/ui/SectionTitle";
import { familyTreeData, totalGenerasi } from "@/data/family-tree";

export default function FamilyTree() {
  // Group by generasi
  const generations = Array.from({ length: totalGenerasi }, (_, i) =>
    familyTreeData.filter((member) => member.generasi === i + 1)
  );

  return (
    <section className="py-20 md:py-28 bg-primary-dark">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionTitle
          subtitle="Akar Kita"
          title="Silsilah Keluarga"
          description="Mengenal lebih dekat akar keluarga besar Surosentono"
          light
        />

        <div className="space-y-12">
          {generations.map((members, genIndex) => (
            <div key={genIndex}>
              {/* Label Generasi */}
              <p className="text-accent text-center text-sm font-semibold mb-4">
                Generasi ke-{genIndex + 1}
              </p>

              {/* Members */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {members.map((member) => (
                  <div key={member.id} className="text-center">
                    {/* Foto */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto mb-2 border-2 border-accent/50">
                      {member.foto ? (
                        <img
                          src={member.foto}
                          alt={member.nama}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary-light flex items-center justify-center text-white font-bold text-lg">
                          {member.nama.charAt(0)}
                        </div>
                      )}
                    </div>
                    {/* Nama */}
                    <p className="text-white text-sm md:text-base font-medium">
                      {member.nama}
                    </p>
                    {member.pasangan && (
                      <p className="text-white/50 text-xs">
                        & {member.pasangan}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Connector line ke generasi berikutnya */}
              {genIndex < generations.length - 1 && (
                <div className="flex justify-center mt-6">
                  <div className="w-0.5 h-8 bg-accent/30" />
                </div>
              )}
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
import FamilyTree from "@/components/sections/FamilyTree";

// Tambahkan setelah Venue, sebelum GalleryPreview
<FamilyTree />
```

## Alternatif Jika Terlalu Kompleks

Jika data silsilah belum lengkap atau layout terlalu sulit, bisa disederhanakan menjadi:
- Hanya tampilkan generasi 1 dan 2
- Atau tampilkan sebagai teks/list sederhana
- Atau skip section ini dan kerjakan di iterasi berikutnya

## Definition of Done

- [ ] Section menampilkan anggota keluarga per generasi
- [ ] Foto (atau inisial jika tidak ada foto) tampil dalam circle
- [ ] Nama anggota keluarga tampil di bawah foto
- [ ] Generasi dikelompokkan dan diberi label
- [ ] Background gelap memberikan kontras visual
- [ ] Responsive: wrap ke baris baru jika anggota banyak
- [ ] Data diambil dari `data/family-tree.ts`

## Tips untuk Junior

- Ini section yang paling fleksibel - boleh disederhanakan sesuai kemampuan
- Fokus pada tampilan yang bersih dan readable, bukan diagram yang kompleks
- Jika belum ada data silsilah lengkap, buat 3-5 placeholder member saja
- Inisial nama (huruf pertama) sebagai fallback jika tidak ada foto
- `flex-wrap` penting agar tidak overflow di mobile saat anggota banyak
- Section ini bisa di-skip dulu dan dikerjakan belakangan jika blocking
