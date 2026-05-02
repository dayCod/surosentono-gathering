"use client";

import { motion } from "framer-motion";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
import { eventData } from "@/data/event";
import { SITE_CONFIG } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image + Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero-bg.svg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-accent font-accent text-xl md:text-2xl mb-4">
            Undangan Gathering
          </p>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          Jejak Keluarga Warisan Kebersamaan
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/80 mb-8"
        >
          {eventData.tagline}
        </motion.p>

        {/* Info tanggal & lokasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-white/90"
        >
          <span className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{formatDate(eventData.tanggal)}</span>
          </span>
          <span className="hidden sm:block">|</span>
          <span className="flex items-center gap-2">
            <MapPin size={18} />
            <span>Bogor, Jawa Barat</span>
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={SITE_CONFIG.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-accent text-primary-dark font-semibold rounded-full hover:bg-accent/90 transition-colors text-lg"
          >
            Konfirmasi Kehadiran
          </a>
          <a
            href="#tentang"
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-lg"
          >
            Lihat Detail
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#tentang" aria-label="Scroll ke bawah">
          <ChevronDown size={32} className="text-white animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
