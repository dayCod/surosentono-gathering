export interface VenueImage {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
}

export const venueData = {
  nama: "BBPMKP - Komplek Bumi", // Ganti dengan nama venue asli
  alamat: "Puncak Rd No.KM.11, Bendungan, Ciawi, Bogor Regency, West Java 16720",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.896478880495!2d106.85926459999999!3d-6.6597504999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c8fbb7b8f1a9%3A0x51551c1a629be9fe!2sBBPMKP%20-%20Komplek%20Bumi!5e0!3m2!1sen!2sid!4v1777727672029!5m2!1sen!2sid", // Ganti dengan embed URL asli
  mapsLink: "https://maps.app.goo.gl/xfhzPrXdLiAQK4Cg9", // Ganti dengan link Google Maps
  fasilitas: [
    "Kamar Twin Bed (Kapasitas 2 Orang)",
    "Kamar Mandi per Kamar",
    "Makan 3x",
    "Ruang Karaoke",
    "Tempat Gym",
    "Aula Serbaguna",
    "Ruang Makan",
    "Musholla",
    "Parkiran Luas (±80 Mobil)",
    "Dokumentasi"
  ],
  petunjukArah: [
    "Dari Tol Jagorawi, ambil exit Bogor",
    "Lurus ke arah Jl. Pajajaran",
    "Belok kiri di pertigaan XXX",
    "Venue berada di sebelah kanan jalan",
  ],
  images: [
    {
      src: "https://github.com/TopG-0099/surosentono-assets/blob/master/halaman-parkir.jpg?raw=true",
      alt: "Halaman Parkir",
      title: "HALAMAN PARKIR",
      subtitle: "Kapasitas +80 Mobil"
    },
    {
      src: "https://github.com/TopG-0099/surosentono-assets/blob/master/aula-utama.jpg?raw=true",
      alt: "Aula Utama",
      title: "AULA UTAMA",
      subtitle: "Kapasitas 200 Orang"
    },
    {
      src: "https://github.com/TopG-0099/surosentono-assets/blob/master/kamar-tidur.jpg?raw=true",
      alt: "Kamar Tidur",
      title: "KAMAR TIDUR",
      subtitle: "Twin Bed - Kapasitas 2 Orang"
    },
    {
      src: "https://github.com/TopG-0099/surosentono-assets/blob/master/musholla.jpg?raw=true",
      alt: "Musholla",
      title: "MUSHOLLA",
      subtitle: "Tempat Ibadah yang Luas & Bersih"
    },
    {
      src: "https://github.com/TopG-0099/surosentono-assets/blob/master/ruang-makan.jpg?raw=true",
      alt: "Ruang Makan",
      title: "RUANG MAKAN",
      subtitle: "Kapasitas 200 Orang"
    },
    {
      src: "https://github.com/TopG-0099/surosentono-assets/blob/master/tempat-gym.jpg?raw=true",
      alt: "Tempat Gym",
      title: "TEMPAT GYM",
      subtitle: "Fasilitas Kebugaran untuk Peserta"
    },
    {
      src: "https://github.com/TopG-0099/surosentono-assets/blob/master/ruang-karaoke.jpg?raw=true",
      alt: "Ruang Karaoke",
      title: "RUANG KARAOKE",
      subtitle: "Ruang Hiburan & Karaoke Keluarga"
    },
  ] as VenueImage[],
  videoUrl: "", // YouTube embed URL jika ada video venue
  dressCode: "Menyesuaikan - Nuansa Coklat",
};
