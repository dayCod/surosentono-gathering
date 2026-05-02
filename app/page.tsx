import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Countdown from "@/components/sections/Countdown";
import Rundown from "@/components/sections/Rundown";
import Venue from "@/components/sections/Venue";
import GalleryPreview from "@/components/sections/GalleryPreview";
import RSVP from "@/components/sections/RSVP";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Countdown />
      <Rundown />
      <Venue />
      <GalleryPreview />
      <RSVP />
    </>
  );
}
