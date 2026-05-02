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
    foto: "/images/family/surosentono.svg",
    children: ["anak-1", "anak-2", "anak-3"],
  },
  // Tambahkan anggota keluarga lainnya...
  // Data ini perlu diisi berdasarkan informasi dari keluarga
];

// Jumlah generasi
export const totalGenerasi = 4; // Sesuaikan
