"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { eventData } from "@/data/event";

interface TimeLeft {
  hari: number;
  jam: number;
  menit: number;
  detik: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });
  const [isEventPassed, setIsEventPassed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const targetDate = new Date(eventData.tanggal + "T07:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsEventPassed(true);
        return;
      }

      setTimeLeft({
        hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        jam: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        menit: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        detik: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Hindari hydration mismatch
  if (!isMounted) {
    return (
      <section className="py-16 md:py-20 bg-primary-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-lg">Memuat countdown...</p>
        </div>
      </section>
    );
  }

  // State setelah acara selesai
  if (isEventPassed || eventData.status === "post-event") {
    return (
      <section className="py-16 md:py-20 bg-primary-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-accent text-accent text-xl mb-2">Alhamdulillah</p>
          <h2 className="font-heading text-3xl md:text-4xl text-white font-bold mb-4">
            Terima Kasih Telah Hadir!
          </h2>
          <p className="text-white/70 text-lg">
            Semoga silaturahmi kita tetap terjaga hingga pertemuan berikutnya.
          </p>
        </div>
      </section>
    );
  }

  const timeUnits = [
    { label: "Hari", value: timeLeft.hari },
    { label: "Jam", value: timeLeft.jam },
    { label: "Menit", value: timeLeft.menit },
    { label: "Detik", value: timeLeft.detik },
  ];

  return (
    <section className="py-16 md:py-20 bg-background-alt/70 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[70px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 blur-[70px] rounded-full translate-x-1/2 translate-y-1/2" />

      {/* Background Texture Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img
          src="/images/branding/texture-background.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-accent text-accent text-xl mb-2 italic">Hitung Mundur</p>
          <h2 className="font-heading text-3xl md:text-5xl text-white font-bold mb-10 tracking-tight">
            Menuju Hari Berkumpul
          </h2>
        </motion.div>

        <div className="flex justify-center gap-3 md:gap-8">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-purple-800/20 backdrop-blur-md border border-white/5 rounded-2xl p-3 md:p-6 min-w-[65px] md:min-w-[120px] shadow-xl shadow-black/20">
                <span className="text-3xl md:text-6xl font-black text-accent font-heading leading-none">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <p className="text-foreground-muted text-[10px] md:text-base mt-3 font-medium uppercase tracking-wider">
                {unit.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
