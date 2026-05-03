export type EventStatus = "pre-event" | "post-event";

export const eventData: {
  nama: string;
  tanggal: string;
  waktu: string;
  tagline: string;
  deskripsi: string;
  status: EventStatus;
} = {
  nama: "Gathering Keluarga Surosentono 2025",
  tanggal: "2027-03-25", // Format: YYYY-MM-DD (sesuaikan tanggal asli)
  waktu: "07:00 WIB - Selesai",
  tagline: "Halal Bihalal Keluarga Besar Surosentono",
  deskripsi:
    "Acara gathering tahunan keluarga besar Surosentono untuk mempererat tali silaturahmi antar generasi. Mari berkumpul, berbagi cerita, dan membangun kenangan indah bersama.",
  status: "pre-event", // Ubah ke "post-event" setelah acara selesai
};
