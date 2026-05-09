import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080510] text-white">
      {/* Ornamen divider */}
      <div className="w-full h-px bg-gradient-to-r from-accent/0 via-accent to-accent/0" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 text-left">
          {/* Kolom 1: Info Acara */}
          <div>
            <h3 className="font-heading text-lg md:text-2xl font-bold text-accent mb-3">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-xs md:text-base text-foreground-secondary leading-relaxed">
              {SITE_CONFIG.tagline}. Halal Bi Halal Keluarga Besar
              Suro Sentono untuk mempererat tali silaturahmi antar generasi.
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-accent mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm md:text-base text-foreground-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-accent mb-4">
              Kontak Panitia
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm md:text-base text-foreground-secondary hover:text-accent transition-colors"
                >
                  <Phone size={18} className="shrink-0" />
                  <span>WhatsApp Panitia</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-sm md:text-base text-foreground-secondary">
                  <MapPin size={18} className="shrink-0" />
                  <span>Bogor, Jawa Barat</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-foreground-muted flex items-center justify-center gap-1 flex-wrap">
            <span>&copy; {currentYear} Keluarga Besar Suro Sentono.</span>
            <span className="flex items-center gap-1">
              Dibuat dengan <Heart size={14} className="text-accent" /> untuk
              keluarga.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
