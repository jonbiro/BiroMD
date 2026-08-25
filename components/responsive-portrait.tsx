import { cn } from "@/lib/utils"
import { versionedBrandAsset } from "@/lib/brand-assets"

const portraitWidths = [320, 480, 560, 640, 960]

const portraitPaths = {
  primary: "/images/portrait/dr-biro-portrait",
  about: "/images/portrait/dr-biro-about-portrait",
} as const

export function ResponsivePortrait({
  className,
  portrait = "primary",
  priority = false,
  sizes,
}: {
  className?: string
  portrait?: keyof typeof portraitPaths
  priority?: boolean
  sizes: string
}) {
  const portraitPath = portraitPaths[portrait]

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
        alt="Dr. Nicolas Biro, board-certified ophthalmologist and oculoplastic surgeon"
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
