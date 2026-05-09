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
    <section id="jadwal" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-primary/30 to-accent/50 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-16">
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
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_rgba(190,242,100,0.6)] -translate-x-1/2 z-10 mt-7" />

                    {/* Spacer for desktop alternating layout */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Card */}
                    <div className="ml-10 md:ml-0 md:w-1/2">
                      <div className="bg-background-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-4 md:p-6 shadow-xl shadow-black/20 hover:border-accent/20 transition-all group">
                        <div className="flex items-center gap-3 md:gap-4 mb-4">
                          <div className="p-2 md:p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                            <Icon size={20} className="text-accent md:w-6 md:h-6" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-widest">
                              {item.waktuMulai} - {item.waktuSelesai}
                            </span>
                            <h3 className="text-lg md:text-2xl font-heading font-bold text-white">
                              {item.judul}
                            </h3>
                          </div>
                        </div>
                        <p className="text-foreground-secondary text-sm md:text-base leading-relaxed">
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
