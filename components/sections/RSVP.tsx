import ScrollReveal from "@/components/ui/ScrollReveal";
import { SITE_CONFIG } from "@/lib/constants";
import { ClipboardCheck, MessageCircle, Clock } from "lucide-react";

export default function RSVP() {
  const waMessage = encodeURIComponent(
    "Assalamualaikum, saya ingin konfirmasi kehadiran untuk Gathering Keluarga Surosentono 2025.\n\nNama: \nJumlah yang hadir: \nNo. HP: "
  );
  const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${waMessage}`;

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-[#1E1538] via-[#0F0A1A] to-[#080510] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollReveal>
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 border border-accent/20 rounded-full mb-8 shadow-lg shadow-accent/5">
            <ClipboardCheck size={40} className="text-accent" />
          </div>

          <h2 className="font-heading text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-foreground-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Agar kami dapat mempersiapkan acara dengan baik, mohon konfirmasi
            kehadiran Anda dan keluarga melalui tautan di bawah ini.
          </p>

          {/* Deadline Info */}
          <div className="inline-flex items-center gap-3 bg-accent/10 backdrop-blur-md border border-accent/30 px-6 py-2.5 rounded-full mb-12 shadow-xl shadow-accent/5">
            <Clock size={20} className="text-accent" />
            <span className="text-accent font-bold text-sm uppercase tracking-widest">
              Batas konfirmasi: 10 Maret 2027
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            {/* Primary: Google Form */}
            <a
              href={SITE_CONFIG.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-accent text-primary-dark font-black rounded-full hover:bg-accent-hover hover:scale-105 transition-all text-lg flex items-center justify-center gap-3 shadow-2xl shadow-accent/20"
            >
              <ClipboardCheck size={24} />
              Isi Form RSVP
            </a>

            {/* Secondary: WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 border-2 border-accent/50 text-accent font-bold rounded-full hover:bg-accent/10 hover:scale-105 transition-all text-lg flex items-center justify-center gap-3"
            >
              <MessageCircle size={24} />
              Via WhatsApp
            </a>
          </div>

          {/* Info tambahan */}
          <p className="text-foreground-muted text-sm mt-12 font-medium">
            Informasi yang Anda berikan hanya digunakan untuk keperluan koordinasi acara keluarga.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
