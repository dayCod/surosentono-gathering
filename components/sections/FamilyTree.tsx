import SectionTitle from "@/components/ui/SectionTitle";
import { familyTreeData, totalGenerasi } from "@/data/family-tree";

export default function FamilyTree() {
  // Group by generasi
  const generations = Array.from({ length: totalGenerasi }, (_, i) =>
    familyTreeData.filter((member) => member.generasi === i + 1)
  ).filter((members) => members.length > 0);

  return (
    <section className="py-20 md:py-28 bg-primary-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Akar Kita"
          title="Silsilah Keluarga"
          description="Mengenal lebih dekat akar keluarga besar Surosentono"
          light
        />

        <div className="space-y-12">
          {generations.map((members, genIndex) => (
            <div key={genIndex}>
              {/* Label Generasi */}
              <p className="text-accent text-center text-sm font-semibold mb-4">
                Generasi ke-{genIndex + 1}
              </p>

              {/* Members */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {members.map((member) => (
                  <div key={member.id} className="text-center">
                    {/* Foto */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto mb-2 border-2 border-accent/50">
                      {member.foto ? (
                        <img
                          src={member.foto}
                          alt={member.nama}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary-light flex items-center justify-center text-white font-bold text-lg">
                          {member.nama.charAt(0)}
                        </div>
                      )}
                    </div>
                    {/* Nama */}
                    <p className="text-white text-sm md:text-base font-medium">
                      {member.nama}
                    </p>
                    {member.pasangan && (
                      <p className="text-white/50 text-xs">
                        & {member.pasangan}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Connector line ke generasi berikutnya */}
              {genIndex < generations.length - 1 && (
                <div className="flex justify-center mt-6">
                  <div className="w-0.5 h-8 bg-accent/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
