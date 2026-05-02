import { SITE_CONFIG } from "@/lib/constants";
import { ClipboardCheck, MessageCircle, Clock } from "lucide-react";

export default function RSVP() {
  const waMessage = encodeURIComponent(
    "Assalamualaikum, saya ingin konfirmasi kehadiran untuk Gathering Keluarga Surosentono 2025.\n\nNama: \nJumlah yang hadir: \nNo. HP: "
  );
  const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${waMessage}`;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-6">
          <ClipboardCheck size={32} className="text-accent" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Konfirmasi Kehadiran
        </h2>
        <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl mx-auto">
          Agar kami dapat mempersiapkan acara dengan baik, mohon konfirmasi
          kehadiran Anda dan keluarga.
        </p>

        {/* Deadline Info */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-8">
          <Clock size={16} className="text-accent" />
          <span className="text-white/90 text-sm">
            Batas konfirmasi: 10 Agustus 2025
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary: Google Form */}
          <a
            href={SITE_CONFIG.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-accent text-primary-dark font-bold rounded-full hover:bg-accent/90 transition-colors text-lg flex items-center justify-center gap-2"
          >
            <ClipboardCheck size={20} />
            Isi Form RSVP
          </a>

          {/* Secondary: WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors text-lg flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Via WhatsApp
          </a>
        </div>

        {/* Info tambahan */}
        <p className="text-white/50 text-sm mt-8">
          Informasi yang Anda berikan hanya digunakan untuk keperluan acara.
        </p>
      </div>
    </section>
  );
}
