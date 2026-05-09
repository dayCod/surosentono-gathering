import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Users, Calendar, Heart } from "lucide-react";

export default function About() {
  const highlights = [
    { icon: Users, label: "Keluarga", value: "50+" },
    { icon: Calendar, label: "Tahun Tradisi", value: "5" },
    { icon: Heart, label: "Generasi", value: "3" },
  ];

  return (
    <section id="tentang" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Teks */}
          <ScrollReveal direction="left">
            <SectionTitle
              subtitle="Silaturahmi"
              title="Tentang Acara"
              align="left"
            />
            <div className="space-y-4 text-foreground-secondary text-lg leading-relaxed">
              <p>
                Halal Bi Halal Suro Sentono adalah momen istimewa untuk
                mempertemukan kembali saudara-saudara yang mungkin sudah lama
                tidak berjumpa.
              </p>
              <p>
                Dari generasi pertama hingga cicit, kita berkumpul untuk berbagi
                cerita, tawa, dan membangun kenangan baru yang akan kita
                ceritakan ke anak cucu kelak.
              </p>
              <p>
                Mari bersama-sama menjaga tali silaturahmi yang telah diwariskan
                oleh para pendahulu kita dalam bingkai &ldquo;Jejak Warisan&rdquo;.
              </p>
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="text-center p-4 bg-background-card/50 backdrop-blur-sm border border-white/5 rounded-xl shadow-lg shadow-black/20 hover:scale-105 transition-transform"
                >
                  <item.icon className="mx-auto mb-2 text-accent" size={24} />
                  <p className="text-2xl font-bold text-white">
                    {item.value}
                  </p>
                  <p className="text-sm text-foreground-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Kolom Kanan: Gambar */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20">
                <img
                  src="/images/gallery/placeholder-1.svg"
                  alt="Keluarga Surosentono"
                  className="w-full h-[400px] md:h-[500px] object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent/30 rounded-2xl -z-10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
