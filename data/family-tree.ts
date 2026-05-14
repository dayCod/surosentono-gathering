export interface FamilyMember {
  id: string;
  nama: string;
  generasi: number; // 1 = tertua
  pasangan?: string;
  foto?: string;
  children?: string[]; // array of id
  gender?: "L" | "P"; // Laki-laki / Perempuan
}

export const familyTreeData: FamilyMember[] = [
  // Generasi 1: Akar
  {
    id: "surosentono",
    nama: "Surosentono",
    generasi: 1,
    gender: "L",
    children: ["nasian", "nasiran", "rubini", "marman", "sumiyati", "sarpah", "prakoso"],
  },

  // Generasi 2: Anak-anak Surosentono
  { id: "nasian", nama: "Nasian (Alm)", generasi: 2, gender: "L", children: ["mardianto"] },
  { id: "nasiran", nama: "Nasiran (Alm)", generasi: 2, gender: "L", children: [] },
  { id: "rubini", nama: "Rubini (Alm)", generasi: 2, gender: "P", children: ["sukilah-widawati", "nia-murniati", "sri-hartati", "tonton-katono", "agus-parseno", "sri-irianti-sukaesih", "kurnia-hadi-nugroho"] },
  { id: "marman", nama: "Marman (Alm)", generasi: 2, gender: "L", children: ["bambang-budi-handoko", "elis-sondari", "iyep-budi-heriyanto", "iis-hendarsih", "agus-budi-susilo", "enung-indah-sri-wulandari"] },
  { id: "sumiyati", nama: "Sumiyati (Alm)", generasi: 2, gender: "P", children: ["herni-maryati", "eni-nuraeni", "iin-supriani", "herni-suryani", "tuti-suprihati", "eko-suharsono"] },
  { id: "sarpah", nama: "Saripah", generasi: 2, gender: "P", children: ["sugiono", "anis-s", "agus-s-1", "ugih-s", "agus-s-2", "dudi-s", "tini-r", "tono-b", "iwan-s", "wungu", "harni-p"] },
  { id: "prakoso", nama: "Prakoso (Alm)", generasi: 2, gender: "L", children: ["anita-dukawanti", "joko-wage-winarto", "yuli-eviyanti", "kristi-hermila", "haris-mulya-wisena", "rida-agustini", "dine-nursanti"] },

  // Generasi 3: Cucu-cucu Surosentono
  // Anak Nasian
  { id: "mardianto", nama: "Mardianto", generasi: 3, gender: "L" },

  // Anak Rubini (Dummy Data)
  { id: "sukilah-widawati", nama: "Sukilah Widawati", generasi: 3, gender: "L" },
  { id: "nia-murniati", nama: "Nia Murniati", generasi: 3, gender: "P" },
  { id: "sri-hartati", nama: "Sri Hartati", generasi: 3, gender: "L" },
  { id: "tonton-katono", nama: "Tonton Katono", generasi: 3, gender: "P" },
  { id: "agus-parseno", nama: "Agus Praseno", generasi: 3, gender: "L" },
  { id: "sri-irianti-sukaesih", nama: "Sri Irianti Sukaesih", generasi: 3, gender: "P" },
  { id: "kurnia-hadi-nugroho", nama: "Kurnia Hadi Nugroho", generasi: 3, gender: "L" },

  // Anak Marman
  { id: "bambang-budi-handoko", nama: "Bambang Budi Handoko", generasi: 3, gender: "L" },
  { id: "elis-sondari", nama: "Elis Sondari", generasi: 3, gender: "P" },
  { id: "iyep-budi-heriyanto", nama: "Iyep Budi Heriyanto", generasi: 3, gender: "L" },
  { id: "iis-hendarsih", nama: "Iis Hendarsih (Alm)", generasi: 3, gender: "P" },
  { id: "agus-budi-susilo", nama: "Agus Budi Susilo", generasi: 3, gender: "L" },
  { id: "enung-indah-sri-wulandari", nama: "Enung Indah Sri Wulandari", generasi: 3, gender: "P" },

  // Anak Sumiyati (Dummy Data)
  { id: "herni-maryati", nama: "Herti Maryati", generasi: 3, gender: "P" },
  { id: "eni-nuraeni", nama: "Eni Nuraeni", generasi: 3, gender: "L" },
  { id: "iin-supriani", nama: "Iin Supriani", generasi: 3, gender: "P" },
  { id: "herni-suryani", nama: "Herni Suryani", generasi: 3, gender: "L" },
  { id: "tuti-suprihati", nama: "Tuti Suprihati", generasi: 3, gender: "L" },
  { id: "eko-suharsono", nama: "Eko Suharsono", generasi: 3, gender: "L" },

  // Anak Sarpah
  { id: "sugiono", nama: "Sugiono (Alm)", generasi: 3, gender: "L" },
  { id: "anis-s", nama: "Anis Sugiani", generasi: 3, gender: "P" },
  { id: "agus-s-1", nama: "Agus Sugianto", generasi: 3, gender: "L" },
  { id: "ugih-s", nama: "Ugih Sugiharto", generasi: 3, gender: "L" },
  { id: "agus-s-2", nama: "Agus Sugiatno", generasi: 3, gender: "L" },
  { id: "dudi-s", nama: "Dudi Subiantoro", generasi: 3, gender: "L" },
  { id: "tini-r", nama: "Tini Rahayu", generasi: 3, gender: "P" },
  { id: "tono-b", nama: "Tono Basuki (Alm)", generasi: 3, gender: "L" },
  { id: "iwan-s", nama: "Iwan Setiawan", generasi: 3, gender: "L" },
  { id: "wungu", nama: "Wungu Prihasto Santoso", generasi: 3, gender: "L" },
  { id: "harni-p", nama: "Harni Purwanti", generasi: 3, gender: "P" },

  // Anak Prakoso
  { id: "anita-dukawanti", nama: "Anita Dukawanti", generasi: 3, gender: "P" },
  { id: "joko-wage-winarto", nama: "Joko Wage Winarto", generasi: 3, gender: "L" },
  { id: "yuli-eviyanti", nama: "Yuli Eviyanti", generasi: 3, gender: "P" },
  { id: "kristi-hermila", nama: "Kristi Hermila", generasi: 3, gender: "P" },
  { id: "haris-mulya-wisena", nama: "Haris Mulya Wisena", generasi: 3, gender: "L" },
  { id: "rida-agustini", nama: "Rida Agustini", generasi: 3, gender: "P" },
  { id: "dine-nursanti", nama: "Dine Nursanti", generasi: 3, gender: "P" },
];

// Jumlah generasi diset menjadi 3
export const totalGenerasi = 3;
