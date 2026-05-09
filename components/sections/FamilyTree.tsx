import SectionTitle from "@/components/ui/SectionTitle";
import { familyTreeData, totalGenerasi } from "@/data/family-tree";

export default function FamilyTree() {
  // Group by generasi
  const generations = Array.from({ length: totalGenerasi }, (_, i) =>
    familyTreeData.filter((member) => member.generasi === i + 1)
  ).filter((members) => members.length > 0);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          subtitle="Akar Kita"
          title="Silsilah Keluarga"
          description="Mengenal lebih dekat akar keluarga besar Suro Sentono"
        />

        <div className="space-y-16">
          {generations.map((members, genIndex) => (
            <div key={genIndex}>
              {/* Label Generasi */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-accent/20" />
                <p className="text-accent text-center text-sm font-bold uppercase tracking-widest">
                  Generasi ke-{genIndex + 1}
                </p>
                <div className="h-px w-12 bg-accent/20" />
              </div>

              {/* Members */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {members.map((member) => (
                  <div key={member.id} className="text-center group">
                    {/* Foto */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-accent shadow-lg shadow-accent/10 group-hover:scale-110 transition-transform">
                      {member.foto ? (
                        <img
                          src={member.foto}
                          alt={member.nama}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-purple-900/50 flex items-center justify-center text-accent font-bold text-xl backdrop-blur-sm">
                          {member.nama.charAt(0)}
                        </div>
                      )}
                    </div>
                    {/* Nama */}
                    <p className="text-white text-base md:text-lg font-bold tracking-tight">
                      {member.nama}
                    </p>
                    {member.pasangan && (
                      <p className="text-foreground-muted text-xs md:text-sm font-medium italic mt-0.5">
                        & {member.pasangan}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Connector line ke generasi berikutnya */}
              {genIndex < generations.length - 1 && (
                <div className="flex justify-center mt-12">
                  <div className="w-px h-12 bg-gradient-to-b from-accent to-accent/0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
