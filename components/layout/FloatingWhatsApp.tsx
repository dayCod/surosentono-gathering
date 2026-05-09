"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Halo, saya ingin bertanya tentang Halal Bi Halal Suro Sentono 2027"
  );
  const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 bg-accent text-primary-dark rounded-full shadow-lg shadow-accent/20 hover:scale-110 transition-transform flex items-center justify-center"
      aria-label="Hubungi kami di WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
