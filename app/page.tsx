import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Countdown from "@/components/sections/Countdown";
import Rundown from "@/components/sections/Rundown";
import Venue from "@/components/sections/Venue";
import FamilyTree from "@/components/sections/FamilyTree";
import GalleryPreview from "@/components/sections/GalleryPreview";
import Messages from "@/components/sections/Messages";
import RSVP from "@/components/sections/RSVP";
import { eventData } from "@/data/event";
import { venueData } from "@/data/venue";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventData.nama,
    startDate: `${eventData.tanggal}T07:00:00+07:00`,
    location: {
      "@type": "Place",
      name: venueData.nama,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bogor",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
    },
    description: eventData.deskripsi,
    organizer: {
      "@type": "Organization",
      name: "Keluarga Surosentono",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Countdown />
      <Rundown />
      <Venue />
      <FamilyTree />
      <GalleryPreview />
      <Messages />
      <RSVP />
    </>
  );
}
