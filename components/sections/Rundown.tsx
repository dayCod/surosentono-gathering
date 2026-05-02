import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { rundownData } from "@/data/rundown";
import {
  Coffee,
  Mic,
  Camera,
  Gamepad2,
  UtensilsCrossed,
  Heart,
  Gift,
} from "lucide-react";

// Map nama ikon ke komponen
const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  coffee: Coffee,
  mic: Mic,
  camera: Camera,
  "gamepad-2": Gamepad2,
  utensils: UtensilsCrossed,
  heart: Heart,
  gift: Gift,
};

export default function Rundown() {
  return (
    <section id="jadwal" className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionTitle
            subtitle="Rangkaian Acara"
            title="Jadwal Kegiatan"
            description="Berikut susunan acara yang telah kami siapkan untuk hari istimewa kita"
          />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Garis vertikal */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {rundownData.map((item, index) => {
              const Icon = iconMap[item.ikon] || Coffee;
              const isEven = index % 2 === 0;

              return (
                <ScrollReveal
                  key={item.id}
                  delay={index * 0.1}
                  direction={isEven ? "left" : "right"}
                >
                  <div
                    className={`relative flex items-start gap-4 md:gap-8 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot on timeline */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background -translate-x-1/2 z-10 mt-6" />

                    {/* Spacer for desktop alternating layout */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Card */}
                    <div className="ml-10 md:ml-0 md:w-1/2">
                      <div className="bg-background rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <Icon size={20} className="text-accent" />
                          </div>
                          <span className="text-sm font-semibold text-accent">
                            {item.waktuMulai} - {item.waktuSelesai}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-heading font-bold text-primary-dark mb-1">
                          {item.judul}
                        </h3>
                        <p className="text-primary/60 text-base">
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
