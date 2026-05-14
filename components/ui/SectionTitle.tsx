import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean; // untuk section dengan background gelap
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = "center",
  light = false,
}: SectionTitleProps) {
  return (
    <div
      className={cn("mb-12", align === "center" ? "text-center" : "text-left")}
    >
      {subtitle && (
        <span className="text-accent font-bold text-xs md:text-sm uppercase tracking-widest mb-2 block font-bernardston">
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "font-heading text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base md:text-lg max-w-2xl",
            align === "center" && "mx-auto",
            "text-foreground-secondary"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
