export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: "keluarga" | "venue" | "acara" | "candid";
  featured?: boolean;
}

export const galleryData: GalleryItem[] = [
  // Pre-event: isi dengan foto-foto keluarga lama / gathering sebelumnya
  // Post-event: tambahkan foto-foto dari acara
  {
    id: 1,
    src: "/images/gallery/placeholder-1.svg",
    alt: "Foto keluarga besar Surosentono",
    category: "keluarga",
    featured: true,
  },
  {
    id: 2,
    src: "/images/gallery/placeholder-2.svg",
    alt: "Gathering tahun lalu",
    category: "acara",
    featured: true,
  },
  {
    id: 3,
    src: "/images/gallery/placeholder-3.svg",
    alt: "Momen kebersamaan keluarga",
    category: "candid",
    featured: true,
  },
  {
    id: 4,
    src: "/images/gallery/placeholder-4.svg",
    alt: "Suasana venue acara",
    category: "venue",
    featured: false,
  },
  {
    id: 5,
    src: "/images/gallery/placeholder-5.svg",
    alt: "Foto bersama generasi muda",
    category: "keluarga",
    featured: true,
  },
  {
    id: 6,
    src: "/images/gallery/placeholder-6.svg",
    alt: "Aktivitas games bersama",
    category: "acara",
    featured: false,
  },
  // Tambahkan lebih banyak foto...
];

// Filter helper
export const getGalleryByCategory = (category: GalleryItem["category"]) =>
  galleryData.filter((item) => item.category === category);

export const getFeaturedGallery = () =>
  galleryData.filter((item) => item.featured);
