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
    foto: "/images/family/tetua.svg",
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
