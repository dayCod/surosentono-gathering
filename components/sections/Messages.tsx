import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { messagesData } from "@/data/messages";
import { Quote } from "lucide-react";

export default function Messages() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionTitle
            subtitle="Dari Hati"
            title="Pesan & Harapan"
            description="Ungkapan cinta dan harapan dari keluarga besar Surosentono"
          />
        </ScrollReveal>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messagesData.map((message, index) => (
            <ScrollReveal key={message.id} delay={index * 0.1}>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative h-full">
                {/* Quote Icon */}
                <Quote
                  size={24}
                  className="text-accent/30 absolute top-4 right-4"
                />

                {/* Pesan */}
                <p className="text-primary/70 italic text-base leading-relaxed mb-4">
                  &ldquo;{message.pesan}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-accent/10">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    {message.foto ? (
                      <img
                        src={message.foto}
                        alt={message.nama}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-accent/20 flex items-center justify-center text-primary font-bold">
                        {message.nama.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-primary-dark text-sm">
                      {message.nama}
                    </p>
                    {message.hubungan && (
                      <p className="text-primary/50 text-xs">
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
