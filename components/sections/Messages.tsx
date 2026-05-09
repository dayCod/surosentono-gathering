import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { messagesData } from "@/data/messages";
import { Quote } from "lucide-react";

export default function Messages() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="Dari Hati"
            title="Pesan & Harapan"
            description="Ungkapan cinta dan harapan dari keluarga besar Suro Sentono"
          />
        </ScrollReveal>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {messagesData.map((message, index) => (
            <ScrollReveal key={message.id} delay={index * 0.1}>
              <div className="bg-background-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-8 shadow-xl shadow-black/20 hover:border-accent/20 transition-all h-full relative group">
                {/* Quote Icon */}
                <Quote
                  size={32}
                  className="text-accent/10 absolute top-6 right-6 group-hover:text-accent/20 transition-colors"
                />

                {/* Pesan */}
                <p className="text-foreground-secondary italic text-lg leading-relaxed mb-8 relative z-10">
                  &ldquo;{message.pesan}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10">
                    {message.foto ? (
                      <img
                        src={message.foto}
                        alt={message.nama}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-900/50 flex items-center justify-center text-accent font-bold">
                        {message.nama.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-white text-base">
                      {message.nama}
                    </p>
                    {message.hubungan && (
                      <p className="text-foreground-muted text-xs font-medium uppercase tracking-wider">
                        {message.hubungan}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
