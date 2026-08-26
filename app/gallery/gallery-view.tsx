import {
  Images,
  Maximize2,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"
import { ClinicalComparisonPreview } from "@/components/clinical-comparison-preview"
import { ClinicalImageCover } from "@/components/clinical-image-cover"
import { ClinicalCaseImage } from "@/components/clinical-case-image"
import { Button } from "@/components/ui/button"
import { galleryCasePath, type GalleryCase } from "@/lib/gallery-cases"
import { cn } from "@/lib/utils"

type GalleryViewProps = { cases: GalleryCase[] }
type GalleryFilter = "all" | GalleryCase["category"]

const filters: Array<{ id: GalleryFilter; label: string; icon: typeof Images }> = [
  { id: "all", label: "All cases", icon: Images },
  { id: "cosmetic", label: "Cosmetic", icon: Sparkles },
  { id: "reconstructive", label: "Reconstructive", icon: ShieldCheck },
]

export function GalleryView({ cases }: GalleryViewProps) {
  return (
    <div className="space-y-6 md:space-y-8" data-gallery>
      {cases.length > 0 ? (
        <div
          className="grid grid-cols-3 gap-2 border-b border-border pb-6"
          role="group"
          aria-label="Filter clinical cases"
        >
          {filters.map((item, index) => {
            const FilterIcon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                data-gallery-filter={item.id}
                aria-pressed={index === 0}
                className="flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-full border border-border bg-card px-1.5 py-2.5 text-[0.7rem] font-semibold text-foreground transition-colors hover:border-secondary hover:bg-accent aria-[pressed=true]:border-primary aria-[pressed=true]:bg-primary aria-[pressed=true]:text-primary-foreground aria-[pressed=true]:shadow-[0_8px_16px_rgb(9_36_59_/0.18)] min-[360px]:text-xs sm:px-5 sm:text-sm"
              >
                <FilterIcon className="hidden h-3.5 w-3.5 sm:block" />
                {item.label}
              </button>
            )
          })}
        </div>
      ) : null}

      {cases.length === 0 ? (
        <div className="panel rounded-[2rem] p-8 text-center md:p-10">
          <h2 className="text-3xl font-semibold text-primary">Before &amp; After cases under review</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Cases are published only after the practice confirms written image
            authorization and reviews the final presentation. Contact an office
            to discuss outcomes relevant to your concerns.
          </p>
        </div>
      ) : (
        <div className="gallery-case-grid" data-gallery-grid>
          {cases.map((item) => {
            const dialogId = `gallery-dialog-${item.id}`
            const primaryImage = item.images[0]
            return (
              <article
                id={item.id}
                key={item.id}
                data-gallery-case
                data-gallery-category={item.category}
                className="panel w-full overflow-hidden rounded-[2rem]"
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden border-b border-border bg-accent/45",
                    item.sensitive && "min-h-[17rem]"
                  )}
                  data-sensitive-image={item.sensitive ? "true" : undefined}
                  tabIndex={item.sensitive ? -1 : undefined}
                >
                  <div
                    data-sensitive-media={item.sensitive ? "true" : undefined}
                    aria-hidden={item.sensitive ? "true" : undefined}
                    className={cn(
                      "flex w-full items-center justify-center",
                      item.sensitive && "min-h-[17rem]"
                    )}
                  >
                    <ClinicalComparisonPreview
                      image={primaryImage}
                      sizes="(max-width: 768px) 46vw, (max-width: 1280px) 23vw, 16vw"
                      fullSizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 32vw"
                      deferred={item.sensitive}
                    />
                  </div>
                  <button
                    type="button"
                    data-gallery-open={dialogId}
                    disabled={item.sensitive}
                    className="absolute inset-0 z-20 flex items-end justify-end p-4 focus-visible:outline-offset-[-5px] disabled:pointer-events-none"
                    aria-label={`View larger image for ${item.title}`}
                  >
                    <span className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#0b3558] px-3.5 py-2 text-xs font-semibold text-white shadow-lg dark:bg-[#164e77]">
                      <Maximize2 className="h-4 w-4" />
                      <span>Enlarge</span>
                    </span>
                  </button>
                  {item.sensitive && item.sensitiveLabel ? (
                    <ClinicalImageCover
                      label={item.sensitiveLabel}
                      imagePath={primaryImage.imagePath}
                    />
                  ) : null}
                </div>

                <div className="space-y-4 p-5 md:p-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
                      {item.categoryLabel} / {item.focus}
                    </p>
                    <h2 className="mt-2 text-[1.75rem] font-semibold leading-tight text-primary">{item.title}</h2>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-muted-foreground">
                      <span>Before and after</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.images.length} {item.images.length === 1 ? "view" : "matched views"}</span>
                    </div>
                  </div>
                  <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{item.presentation}</p>
                  <Button variant="outline" asChild className="w-full sm:w-auto">
                    <a href={galleryCasePath(item)}>
                      {item.images.length > 1 ? `View all ${item.images.length} comparisons` : "Read case details"}
                    </a>
                  </Button>
                </div>

                <dialog
                  id={dialogId}
                  data-gallery-dialog
                  className="gallery-dialog"
                  aria-labelledby={`${dialogId}-title`}
                >
                  <div className="absolute inset-x-4 top-4 z-10 flex items-start justify-between gap-4 text-white md:inset-x-8 md:top-8">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">{item.categoryLabel}</p>
                      <p
                        id={`${dialogId}-title`}
                        data-gallery-dialog-title
                        className="mt-1 text-2xl font-semibold text-white"
                      >
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-300">{primaryImage.viewLabel} · {primaryImage.comparisonLabel}</p>
                    </div>
                    <button
                      type="button"
                      data-gallery-close
                      className="rounded-full border border-white/40 bg-white/12 p-3 text-white hover:bg-white/20"
                      aria-label="Close enlarged image"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mt-20 flex h-[calc(100dvh-9rem)] w-full max-w-6xl items-center justify-center">
                    <ClinicalCaseImage
                      imagePath={primaryImage.imagePath}
                      alt={primaryImage.alt}
                      width={primaryImage.width}
                      height={primaryImage.height}
                      sizes="95vw"
                      deferred={item.sensitive}
                      className="max-h-full max-w-full"
                    />
                  </div>
                </dialog>
              </article>
            )
          })}
        </div>
      )}

      <p data-gallery-empty hidden className="py-12 text-center text-muted-foreground" aria-live="polite">
        No published cases are available in this category.
      </p>
    </div>
  )
}
