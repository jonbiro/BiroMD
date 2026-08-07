import { cn } from "@/lib/utils"

export function ClinicalCaseImage({
  imagePath,
  alt,
  className,
  sizes,
  loading = "lazy",
}: {
  imagePath: string
  alt: string
  className?: string
  sizes: string
  loading?: "eager" | "lazy"
}) {
  const stem = imagePath.replace(/\.jpg$/, "")

  return (
    <picture className="flex h-full w-full items-center justify-center">
      <source
        type="image/avif"
        srcSet={`${stem}-480.avif 480w, ${stem}-720.avif 720w, ${stem}-960.avif 960w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${stem}-480.webp 480w, ${stem}-720.webp 720w, ${stem}-960.webp 960w`}
        sizes={sizes}
      />
      <img
        src={imagePath}
        alt={alt}
        width="960"
        height="960"
        loading={loading}
        decoding="async"
        className={cn("h-full w-full object-contain", className)}
      />
    </picture>
  )
}
