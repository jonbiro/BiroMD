import { cn } from "@/lib/utils"
import { versionedBrandAsset } from "@/lib/brand-assets"

const portraitPath = "/images/portrait/dr-biro-portrait"
const portraitWidths = [320, 480, 560, 640, 960]

export function ResponsivePortrait({
  className,
  priority = false,
  sizes,
}: {
  className?: string
  priority?: boolean
  sizes: string
}) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={portraitWidths
          .map((width) => `${versionedBrandAsset(`${portraitPath}-${width}.avif`)} ${width}w`)
          .join(", ")}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={portraitWidths
          .map((width) => `${versionedBrandAsset(`${portraitPath}-${width}.webp`)} ${width}w`)
          .join(", ")}
        sizes={sizes}
      />
      <img
        src={versionedBrandAsset(`${portraitPath}-960.webp`)}
        alt="Dr. Nicolas Biro"
        width="960"
        height="1200"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    </picture>
  )
}
