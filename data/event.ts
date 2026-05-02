export const eventData = {
  nama: "Gathering Keluarga Surosentono 2025",
  tanggal: "2025-08-17", // Format: YYYY-MM-DD (sesuaikan tanggal asli)
  waktu: "07:00 WIB - Selesai",
  tagline: "Mempererat Tali Silaturahmi",
  deskripsi:
    "Acara gathering tahunan keluarga besar Surosentono untuk mempererat tali silaturahmi antar generasi. Mari berkumpul, berbagi cerita, dan membangun kenangan indah bersama.",
  status: "pre-event" as const, // "pre-event" | "post-event"
};

export type EventStatus = "pre-event" | "post-event";
