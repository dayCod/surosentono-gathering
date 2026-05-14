export type EventStatus = "pre-event" | "post-event";

export const eventData: {
  nama: string;
  tanggal: string;
  waktu: string;
  tagline: string;
  deskripsi: string;
  status: EventStatus;
} = {
  nama: "Halal Bi Halal — Jejak Warisan Suro Sentono",
  tanggal: "2027-03-27", // Format: YYYY-MM-DD (sesuaikan tanggal asli)
  waktu: "07:00 WIB - Selesai",
  tagline: "Jejak Warisan Keluarga Besar",
  deskripsi:
    "Halal Bi Halal Keluarga Besar Suro Sentono, 27-28 Maret 2027 di Bina Karakter Hall. Mari berkumpul, berbagi cerita, dan membangun kenangan indah bersama.",
  status: "pre-event", // Ubah ke "post-event" setelah acara selesai
};
