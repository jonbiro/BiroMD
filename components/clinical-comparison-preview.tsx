import { ClinicalCaseImage } from "@/components/clinical-case-image"
import type { GalleryCaseImage } from "@/lib/gallery-cases"
import { cn } from "@/lib/utils"

function ComparisonBadge({ children }: { children: string }) {
  return (
    <span className="absolute left-3 top-3 z-10 rounded-full bg-slate-950/88 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
      {children}
    </span>
  )
}

export function ClinicalComparisonPreview({
  image,
  sizes,
  compact = false,
  className,
}: {
  image: GalleryCaseImage
  sizes: string
  compact?: boolean
  className?: string
}) {
  if (image.comparisonLayout === "vertical") {
    return (
      <div
        className={cn(
          "grid w-full grid-cols-2 overflow-hidden bg-accent/45",
          className
        )}
        style={{ aspectRatio: `${image.width * 4} / ${image.height}` }}
        role="img"
        aria-label={`${image.alt}. Before photograph on the left and after photograph on the right.`}
        data-comparison-preview
        data-comparison-layout="side-by-side"
      >
        <div className="relative min-w-0 overflow-hidden border-r-2 border-card">
          <ClinicalCaseImage
            imagePath={image.imagePath}
            alt=""
            width={image.width}
            height={image.height}
            sizes={sizes}
            className="h-full w-full object-cover object-top"
          />
          <ComparisonBadge>Before</ComparisonBadge>
        </div>
        <div className="relative min-w-0 overflow-hidden">
          <ClinicalCaseImage
            imagePath={image.imagePath}
            alt=""
            width={image.width}
            height={image.height}
            sizes={sizes}
            className="h-full w-full object-cover object-bottom"
          />
          <ComparisonBadge>After</ComparisonBadge>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden bg-accent/45",
        className
      )}
      style={{ aspectRatio: compact ? "12 / 5" : `${image.width} / ${image.height}` }}
      data-comparison-preview
      data-comparison-layout="side-by-side"
    >
      <ClinicalCaseImage
        imagePath={image.imagePath}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="h-full w-full object-contain"
      />
      <div className="pointer-events-none absolute inset-3 z-10 text-[0.68rem] font-bold uppercase tracking-[0.14em]">
        <span className="absolute left-0 top-0 rounded-full bg-slate-950/88 px-3 py-1.5 text-white shadow-sm">
          Before
        </span>
        <span className="absolute right-0 top-0 rounded-full bg-slate-950/88 px-3 py-1.5 text-white shadow-sm">
          After
        </span>
      </div>
    </div>
  )
}
