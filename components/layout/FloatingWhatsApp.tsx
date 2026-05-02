"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Halo, saya ingin bertanya tentang Gathering Keluarga Surosentono 2025"
  );
  const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-bounce"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
