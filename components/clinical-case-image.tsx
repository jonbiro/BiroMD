import { cn } from "@/lib/utils"

export function ClinicalCaseImage({
  imagePath,
  alt,
  width,
  height,
  className,
  sizes,
  loading = "lazy",
  deferred = false,
}: {
  imagePath: string
  alt: string
  width: number
  height: number
  className?: string
  sizes: string
  loading?: "eager" | "lazy"
  deferred?: boolean
}) {
  const stem = imagePath.replace(/\.jpg$/, "")
  const avifSrcSet = `${stem}-480.avif 480w, ${stem}-720.avif 720w, ${stem}-960.avif 960w, ${stem}-1200.avif 1200w`
  const webpSrcSet = `${stem}-480.webp 480w, ${stem}-720.webp 720w, ${stem}-960.webp 960w, ${stem}-1200.webp 1200w`
  const deferredPreview = `${stem}-warning.webp`

  return (
    <picture
      className="flex h-full w-full items-center justify-center"
      data-clinical-deferred={deferred ? "true" : undefined}
    >
      <source
        type="image/avif"
        srcSet={deferred ? undefined : avifSrcSet}
        data-clinical-srcset={deferred ? avifSrcSet : undefined}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={deferred ? undefined : webpSrcSet}
        data-clinical-srcset={deferred ? webpSrcSet : undefined}
        sizes={sizes}
      />
      <img
        src={deferred ? deferredPreview : imagePath}
        data-clinical-src={deferred ? imagePath : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={cn("h-full w-full object-contain", className)}
      />
    </picture>
  )
}
