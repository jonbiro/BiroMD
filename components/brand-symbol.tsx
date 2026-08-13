import Image from "next/image"
import { cn } from "@/lib/utils"

type BrandSymbolProps = {
  className?: string
  priority?: boolean
}

export function BrandSymbol({ className, priority = false }: BrandSymbolProps) {
  const imageClassName = "h-full w-full object-contain"

  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-block shrink-0", className)}
    >
      <Image
        src="/images/brand/oculoplastic-symbol.webp"
        alt=""
        width={420}
        height={330}
        priority={priority}
        unoptimized
        fetchPriority={priority ? "high" : undefined}
        className={cn(imageClassName, "dark:hidden")}
      />
      <Image
        src="/images/brand/oculoplastic-symbol-dark.webp"
        alt=""
        width={420}
        height={330}
        priority={priority}
        unoptimized
        fetchPriority={priority ? "high" : undefined}
        className={cn(imageClassName, "hidden dark:block")}
      />
    </span>
  )
}
