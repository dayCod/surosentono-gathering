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
          src="https://github.com/TopG-0099/surosentono-assets/blob/1bb58a961bca1845bbdff382cbe09d6c0f4192ff/banner-landing-page.jpg?raw=true"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* Subtitle / Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-2"
        >
          <span className="inline-block px-3 py-1 md:px-4 md:py-1 bg-accent text-primary-dark font-bold text-xs md:text-sm tracking-widest uppercase rounded">
            Halal Bi Halal
          </span>
        </motion.div>

        {/* Accent Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-accent font-accent text-xl md:text-2xl lg:text-3xl italic mb-2">
            Jejak Warisan
          </p>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 md:mb-6 tracking-tighter leading-none"
        >
          MBAH SURO <span className="text-accent">SENTONO</span>
        </motion.h1>

        {/* Tagline / Deskripsi */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-xl lg:text-2xl text-foreground-secondary mb-8 md:mb-10 max-w-2xl mx-auto px-4"
        >
          {eventData.tagline}
        </motion.p>

        {/* Info tanggal & lokasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-10 md:mb-12 text-white/90 font-medium text-sm md:text-base"
        >
          <span className="flex items-center gap-2">
            <Calendar size={18} className="text-accent md:w-5 md:h-5" />
            <span>27-28 MARET 2027</span>
          </span>
          <span className="hidden sm:block text-white/30">|</span>
          <span className="flex items-center gap-2">
            <MapPin size={18} className="text-accent md:w-5 md:h-5" />
            <span>Bina Karakter Hall</span>
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 sm:px-0"
        >
          <a
            href={SITE_CONFIG.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 md:px-10 md:py-5 bg-accent text-primary-dark font-black rounded-full hover:bg-accent-hover hover:scale-105 transition-all text-base md:text-lg shadow-xl shadow-accent/20"
          >
            Konfirmasi Kehadiran
          </a>
          <a
            href="#tentang"
            className="w-full sm:w-auto px-8 py-3 md:px-10 md:py-5 border-2 border-accent/50 text-accent font-bold rounded-full hover:bg-accent/10 transition-all text-base md:text-lg"
          >
            Lihat Detail Acara
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
