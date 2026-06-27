import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  aspectClassName?: string;
  className?: string;
  rounded?: "2xl" | "xl" | "none";
};

export function ImagePlaceholder({
  label,
  aspectClassName = "aspect-[4/3]",
  className,
  rounded = "none",
}: Props) {
  const roundedClass =
    rounded === "2xl" ? "rounded-2xl" : rounded === "xl" ? "rounded-xl" : "";

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-dashed border-forest/15 bg-gradient-to-br from-cream to-cream-dark",
        aspectClassName,
        roundedClass,
        className,
      )}
      aria-hidden={!label}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center text-forest/30">
        <ImageIcon className="h-7 w-7" strokeWidth={1.25} />
        {label && (
          <span className="text-[11px] uppercase tracking-[0.18em]">{label}</span>
        )}
      </div>
    </div>
  );
}
