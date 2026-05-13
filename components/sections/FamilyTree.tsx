import SectionTitle from "@/components/ui/SectionTitle";
import { familyTreeData, FamilyMember } from "@/data/family-tree";

const GenerationLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background/90 backdrop-blur-sm border border-accent/40 px-3 md:px-5 py-1 md:py-1.5 rounded-md text-accent text-[10px] md:text-sm font-bold uppercase tracking-widest shadow-md shadow-accent/10 whitespace-nowrap">
    {children}
  </div>
);

function MemberCard({ member, horizontal = false }: { member: FamilyMember; horizontal?: boolean }) {
  // Opsi rambut/kepala berdasarkan gender untuk DiceBear Avataaars
  const femaleTop = "bigHair,bob,bun,curly,curvy,frida,hijab,longButNotTooLong,miaWallace,straight01,straight02,straightAndStrand";
  const maleTop = "dreads,frizzle,shaggy,shaggyMullet,shortCurly,shortFlat,shortRound,shortWaved,theCaesar";
  // Opsi pakaian formal untuk acara ini
  const formalClothing = "blazerAndShirt,blazerAndSweater,collarAndSweater,shirtCrewNeck";
  
  const seed = encodeURIComponent(member.id);
  const topParam = member.gender === "P" ? femaleTop : maleTop;
  const facialHair = member.gender === "P" ? "0" : "20";
  
  // Menggunakan DiceBear Avataaars yang sangat menarik, diatur khusus agar formal & sesuai gender!
  const avatarUrl = member.foto || `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=transparent&clothing=${formalClothing}&top=${topParam}&facialHairProbability=${facialHair}`;

  if (horizontal) {
    return (
      <div className="group flex items-center gap-3 w-full bg-background/60 border border-accent/20 rounded-full p-1.5 shadow-sm max-w-[280px]">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-accent/50 flex-shrink-0 bg-gradient-to-br from-purple-900/50 to-indigo-950/50 relative">
          <img src={avatarUrl} alt={member.nama} className="w-full h-full object-cover scale-110" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-white text-[11px] font-bold tracking-tight leading-tight">{member.nama}</p>
          {member.pasangan && (
            <p className="text-foreground-muted text-[9px] font-medium italic mt-0.5 leading-tight">
              & {member.pasangan}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center group flex flex-col items-center w-full">
      {/* Foto */}
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden mb-2 border-2 border-accent shadow-lg shadow-accent/10 group-hover:scale-110 transition-transform flex-shrink-0 bg-gradient-to-br from-purple-900/50 to-indigo-950/50">
        <img src={avatarUrl} alt={member.nama} className="w-full h-full object-cover scale-110" />
      </div>
      {/* Nama & Pasangan Container - Fixed height to ensure perfect horizontal lines alignments */}
      <div className="flex flex-col items-center justify-start h-12 md:h-14 w-full px-0.5 mt-1">
        <p className="text-white text-[11px] md:text-sm font-bold tracking-tight leading-tight">
          {member.nama}
        </p>
        {member.pasangan && (
          <p className="text-foreground-muted text-[9px] md:text-xs font-medium italic mt-0.5 leading-tight">
            & {member.pasangan}
          </p>
        )}
      </div>
    </div>
  );
}

export default function FamilyTree() {
  const rootMember = familyTreeData.find((m) => m.id === "surosentono");
  if (!rootMember) return null;

  const getMember = (id: string) => familyTreeData.find((m) => m.id === id);

  return (
    <section id="silsilah" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          subtitle="Akar Kita"
          title="Silsilah Keluarga"
          description="Mengenal lebih dekat akar keluarga besar Surosentono"
        />

        {/* 1. MOBILE LAYOUT (Vertical Tree) */}
        <div className="flex flex-col lg:hidden mt-8 max-w-sm mx-auto">
          <div className="flex flex-col items-center gap-4 relative z-20">
            <GenerationLabel>Generasi 1</GenerationLabel>
            <MemberCard member={rootMember} />
          </div>

          <div className="w-px h-8 bg-accent/50 mx-auto" />

          <div className="flex justify-center relative z-20">
            <GenerationLabel>Generasi 2</GenerationLabel>
          </div>

          <div className="flex flex-col gap-3 relative pl-2 mt-4">
            {/* Main vertical line for Children */}
            <div className="absolute top-6 bottom-8 left-[24px] w-0.5 animate-tree-line-v" />
            
            {rootMember.children?.map((childId) => {
              const child = getMember(childId);
              if (!child) return null;
              
              return (
                <div key={child.id} className="relative z-10 flex flex-col gap-2">
                  <div className="flex items-center">
                    {/* Horizontal connector */}
                    <div className="relative w-4 h-0.5 animate-tree-line-h shrink-0 ml-6" />
                    <div className="flex-1 ml-2">
                      <MemberCard member={child} horizontal />
                    </div>
                  </div>

                  {child.children && child.children.length > 0 && (
                    <div className="flex flex-col gap-2 relative mt-1 mb-2">
                      {/* Generasi 3 Label */}
                      <div className="pl-[72px] mb-1">
                        <span className="text-[9px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                          Generasi 3
                        </span>
                      </div>
                      
                      {/* Vertical line for Grandchildren */}
                      <div className="absolute top-8 bottom-6 left-[56px] w-0.5 animate-tree-line-v" />
                      
                      {child.children.map((gId) => {
                        const g = getMember(gId);
                        if (!g) return null;
                        return (
                          <div key={g.id} className="flex items-center relative z-10 pl-[56px]">
                            <div className="relative w-4 h-0.5 animate-tree-line-h shrink-0" />
                            <div className="flex-1 ml-2">
                              <MemberCard member={g} horizontal />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. DESKTOP LAYOUT (Horizontal Tree) */}
        <div className="hidden lg:flex flex-col items-center mt-12 pb-8 overflow-x-auto">
          <div className="min-w-[1000px] flex flex-col items-center">
            {/* Root Level */}
            <div className="flex flex-col items-center relative z-20">
              <div className="mb-6">
                <GenerationLabel>Generasi 1</GenerationLabel>
              </div>
              <MemberCard member={rootMember} />
              {/* Vertical connector from root */}
              <div className="relative w-0.5 h-12 animate-tree-line-v" />
            </div>

            {/* Children Level */}
            {rootMember.children && (
              <div className="w-full relative flex flex-col items-center">
                {/* Horizontal line connecting all children */}
                <div className="absolute top-0 left-[calc(100%/14)] right-[calc(100%/14)] h-0.5 animate-tree-line-h" />
                
                {/* Label Generasi 2 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <GenerationLabel>Generasi 2</GenerationLabel>
                </div>
                
                {/* Horizontal line for Generasi 3 - Spans across the entire generation uniformly */}
                {/* top-[220px] is calculated based on: pt-8(32px) + avatar(80px) + mb-2(8px) + mt-1(4px) + text(56px) + my-2(8px) + half of connector(32px) = 220px */}
                <div className="absolute left-[calc(100%/14)] right-[calc(100%/14)] h-0.5 animate-tree-line-h z-0" style={{ top: '220px' }} />
                
                <div className="flex justify-between w-full">
                  {rootMember.children.map((childId) => {
                    const child = getMember(childId);
                    if (!child) return null;
                    
                    return (
                      <div key={child.id} className="flex flex-col items-center flex-1 relative px-1 pt-6 md:pt-8">
                        {/* Small vertical line from horizontal line down to child. No longer overlaps avatar because of pt-8 */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 md:h-8 animate-tree-line-v" />
                        
                        <MemberCard member={child} />
                        
                        {/* Empty connector block to maintain grid spacing even if no grandchildren, so horizontal line has a path */}
                        {!child.children || child.children.length === 0 ? (
                          <div className="flex flex-col items-center justify-center w-full h-12 md:h-16 my-2 relative">
                             {/* Line drops from child down to the horizontal Generasi 3 line */}
                             <div className="absolute top-0 bottom-1/2 left-1/2 -translate-x-1/2 w-0.5 animate-tree-line-v" />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center w-full relative">
                            {/* Vertical line block with Generasi 3 Label embedded for proper breaking */}
                            <div className="flex flex-col items-center justify-center w-full h-12 md:h-16 my-2 relative">
                              {child.id === "marman" ? (
                                <>
                                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 md:h-4 animate-tree-line-v" />
                                  <div className="z-20"><GenerationLabel>Generasi 3</GenerationLabel></div>
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-3 md:h-4 animate-tree-line-v" />
                                </>
                              ) : (
                                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 animate-tree-line-v" />
                              )}
                            </div>

                            <div className="flex flex-col items-center gap-4 md:gap-6 w-full relative">
                              {child.children.map((grandChildId, index) => {
                                const grandChild = getMember(grandChildId);
                                if (!grandChild) return null;
                                return (
                                  <div key={grandChild.id} className="relative flex flex-col items-center w-full">
                                    {/* Vertical connector from horizontal line or previous sibling */}
                                    <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 h-4 md:h-6 w-0.5 animate-tree-line-v" />
                                    <MemberCard member={grandChild} />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
