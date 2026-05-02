export interface VenueImage {
  src: string;
  alt: string;
}

export const venueData = {
  nama: "Nama Venue", // Ganti dengan nama venue asli
  alamat: "Jl. Contoh No. 123, Bogor, Jawa Barat 16000",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=XXXXX", // Ganti dengan embed URL asli
  mapsLink: "https://goo.gl/maps/XXXXX", // Ganti dengan link Google Maps
  fasilitas: [
    "Parkir Luas",
    "Mushola",
    "Playground Anak",
    "Toilet Bersih",
    "Area Outdoor",
  ],
  petunjukArah: [
    "Dari Tol Jagorawi, ambil exit Bogor",
    "Lurus ke arah Jl. Pajajaran",
    "Belok kiri di pertigaan XXX",
    "Venue berada di sebelah kanan jalan",
  ],
  images: [
    { src: "/images/venue/venue-1.svg", alt: "Tampak depan venue" },
    { src: "/images/venue/venue-2.svg", alt: "Area outdoor" },
    { src: "/images/venue/venue-3.svg", alt: "Ruang utama" },
  ] as VenueImage[],
  videoUrl: "", // YouTube embed URL jika ada video venue
  dressCode: "Smart Casual - Nuansa Coklat/Earth Tone",
};
