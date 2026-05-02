import { SITE_CONFIG } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero placeholder */}
      <section
        id="beranda"
        className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-heading text-primary-dark mb-4">
          {SITE_CONFIG.name}
        </h1>
        <p className="text-xl md:text-2xl font-accent text-accent mb-8">
          {SITE_CONFIG.tagline}
        </p>
        <p className="text-lg text-primary-light max-w-2xl">
          Website sedang dalam pengembangan. Nantikan informasi selengkapnya!
        </p>
      </section>
    </main>
  );
}
