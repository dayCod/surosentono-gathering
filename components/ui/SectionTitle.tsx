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
        <p className="font-accent text-lg md:text-xl mb-2 text-accent">
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
          light ? "text-white" : "text-primary-dark"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-lg max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-white/80" : "text-primary/70"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
