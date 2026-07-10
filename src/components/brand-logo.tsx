import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "color" | "light";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ variant = "color", className, priority = false }: BrandLogoProps) {
  return (
    <span className={cn("relative block aspect-[1112/484]", className)}>
      <Image
        src={variant === "light" ? "/brand/agroautosur-logo-white.png" : "/brand/agroautosur-logo-transparent.png"}
        alt="AgroAutoSur"
        fill
        priority={priority}
        className="object-contain"
        sizes="(max-width: 640px) 160px, 260px"
      />
    </span>
  );
}
