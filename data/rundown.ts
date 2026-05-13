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
    judul: "Registrasi & Foto",
    deskripsi: "Pendaftaran peserta dan sesi foto per keluarga",
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
    judul: "Senam & Games",
    deskripsi: "Olahraga Senam dan berbagai permainan seru untuk mempererat kebersamaan",
    ikon: "gamepad-2",
  },
  {
    id: 5,
    waktuMulai: "11:30",
    waktuSelesai: "13:00",
    judul: "Halal Bihalal (Acara Inti)",
    deskripsi: "Acara Halal Bihalal untuk mempererat tali persaudaraan",
    ikon: "heart",
  },
  {
    id: 6,
    waktuMulai: "13:00",
    waktuSelesai: "14:30",
    judul: "Makan Siang Bersama",
    deskripsi: "Menikmati hidangan bersama seluruh keluarga",
    ikon: "utensils",
  },
  {
    id: 7,
    waktuMulai: "14:30",
    waktuSelesai: "15:30",
    judul: "Perlombaan & Penutupan",
    deskripsi: "Pengundian doorprize dan penutupan acara seremonial",
    ikon: "gift",
  },
];
