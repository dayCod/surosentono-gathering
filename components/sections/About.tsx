import SectionTitle from "@/components/ui/SectionTitle";
import { Users, Calendar, Heart } from "lucide-react";

export default function About() {
  const highlights = [
    { icon: Users, label: "Keluarga", value: "50+" },
    { icon: Calendar, label: "Tahun Tradisi", value: "10+" },
    { icon: Heart, label: "Generasi", value: "4" },
  ];

  return (
    <section id="tentang" className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Teks */}
          <div>
            <SectionTitle
              subtitle="Silaturahmi"
              title="Tentang Acara"
              align="left"
            />
            <div className="space-y-4 text-primary/80 text-lg leading-relaxed">
              <p>
                Gathering Keluarga Surosentono adalah momen istimewa untuk
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
                oleh para pendahulu kita.
              </p>
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="text-center p-4 bg-white rounded-xl shadow-sm"
                >
                  <item.icon className="mx-auto mb-2 text-accent" size={24} />
                  <p className="text-2xl font-bold text-primary-dark">
                    {item.value}
                  </p>
                  <p className="text-sm text-primary/60">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Gambar */}
          <div className="relative">
            <img
              src="/images/gallery/placeholder-1.svg"
              alt="Keluarga Surosentono"
              className="rounded-2xl shadow-xl w-full h-[400px] md:h-[500px] object-cover"
            />
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
