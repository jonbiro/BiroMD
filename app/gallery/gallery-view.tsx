import {
  ChevronRight,
  FileText,
  Images,
  Maximize2,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"
import { ClinicalCaseImage } from "@/components/clinical-case-image"
import type { GalleryCase } from "@/lib/gallery-cases"
import { cn } from "@/lib/utils"

type GalleryViewProps = { cases: GalleryCase[] }
type GalleryFilter = "all" | GalleryCase["category"]

const filters: Array<{ id: GalleryFilter; label: string; icon: typeof Images }> = [
  { id: "all", label: "All cases", icon: Images },
  { id: "cosmetic", label: "Cosmetic", icon: Sparkles },
  { id: "reconstructive", label: "Reconstructive", icon: ShieldCheck },
]

function ComparisonLabels({ item }: { item: GalleryCase }) {
  const vertical = item.comparisonLayout === "vertical"
  return (
    <div className="pointer-events-none absolute inset-3 z-10 text-[0.68rem] font-bold uppercase tracking-[0.14em]">
      <span className="absolute left-0 top-0 rounded-full bg-slate-950/85 px-3 py-1.5 text-white shadow-sm">
        Before
      </span>
      <span
        className={cn(
          "absolute rounded-full bg-slate-950/85 px-3 py-1.5 text-white shadow-sm",
          vertical ? "bottom-0 left-0" : "right-0 top-0"
        )}
      >
        After
      </span>
    </div>
  )
}

export function GalleryView({ cases }: GalleryViewProps) {
  return (
    <div className="space-y-9" data-gallery>
      <div className="rounded-2xl border border-secondary/30 bg-secondary/8 p-5 text-sm">
        <p className="font-semibold text-foreground">Clinical image disclosure</p>
        <p className="mt-1 text-muted-foreground">
          Individual anatomy, treatment plans, healing, and results vary. Cases
          appear here only after written publication authorization is confirmed.
        </p>
      </div>

      {cases.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-6" aria-label="Filter clinical cases">
          {filters.map((item, index) => {
            const FilterIcon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                data-gallery-filter={item.id}
                aria-pressed={index === 0}
                className="flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-secondary hover:bg-accent aria-[pressed=true]:border-primary aria-[pressed=true]:bg-primary aria-[pressed=true]:text-primary-foreground aria-[pressed=true]:shadow-[0_8px_16px_rgb(9_36_59_/0.18)]"
              >
                <FilterIcon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            )
          })}
        </div>
      ) : null}

      {cases.length === 0 ? (
        <div className="panel rounded-[2rem] p-8 text-center md:p-10">
          <h2 className="text-3xl font-semibold text-primary">Clinical gallery under review</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Cases are published only after the practice confirms written image
            authorization and reviews the final presentation. Contact an office
            to discuss outcomes relevant to your concerns.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {cases.map((item) => {
            const dialogId = `gallery-dialog-${item.id}`
            return (
              <article
                id={item.id}
                key={item.id}
                data-gallery-case
                data-gallery-category={item.category}
                className="panel overflow-hidden rounded-[2rem]"
              >
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border-b border-border bg-accent/45 p-4">
                  <ClinicalCaseImage
                    imagePath={item.imagePath}
                    alt={item.alt}
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="transition-transform duration-300 hover:scale-[1.01]"
                  />
                  <ComparisonLabels item={item} />
                  <button
                    type="button"
                    data-gallery-open={dialogId}
                    className="absolute inset-0 z-20 flex items-end justify-end p-4 focus-visible:outline-offset-[-5px]"
                    aria-label={`View larger image for ${item.title}`}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-lg">
                      <Maximize2 className="h-4 w-4" />
                      View larger
                    </span>
                  </button>
                </div>

                <div className="space-y-6 p-6 md:p-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
                      {item.categoryLabel} / {item.focus}
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-primary">{item.title}</h2>
                    <p className="mt-2 text-xs font-medium text-muted-foreground">{item.comparisonLabel}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-accent/45 p-4">
                      <h3 className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                        <FileText className="h-3.5 w-3.5 text-secondary" />
                        Presentation
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.presentation}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-accent/45 p-4">
                      <h3 className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                        <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                        Approach
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.technique}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                    <span>Nicolas Biro, M.D.</span>
                    <button
                      type="button"
                      data-gallery-open={dialogId}
                      className="inline-flex min-h-11 items-center font-semibold text-secondary hover:underline"
                    >
                      View image
                      <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                    </button>
                  </div>
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
                      <h2 id={`${dialogId}-title`} className="mt-1 text-2xl font-semibold text-white">{item.title}</h2>
                      <p className="mt-1 text-xs text-slate-300">{item.comparisonLabel}</p>
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
                    <ClinicalCaseImage imagePath={item.imagePath} alt={item.alt} sizes="95vw" className="max-h-full max-w-full" />
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
