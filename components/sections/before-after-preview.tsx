import { ArrowRight, Dot, Eye } from "lucide-react"
import { ClinicalCaseImage } from "@/components/clinical-case-image"
import { Button } from "@/components/ui/button"
import { getPublishedGalleryCases } from "@/lib/gallery-cases"
import { cn } from "@/lib/utils"

export function BeforeAfterPreview() {
  const previewCases = getPublishedGalleryCases().slice(0, 2)

  return (
    <section className="relative border-t border-border py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">
              <Dot className="h-3.5 w-3.5" />
              Clinical Cases
            </p>
            <h2 className="text-4xl font-semibold text-primary sm:text-5xl">
              Selected Before-and-After Results
            </h2>
            <p className="text-lg text-muted-foreground">
              Review the concern, surgical approach, and documented result for
              selected authorized cases. Individual outcomes vary.
            </p>
          </div>

          <Button variant="outline" asChild className="self-start md:self-auto">
            <a href="/gallery">
              View Clinical Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {previewCases.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {previewCases.map((item) => {
              const vertical = item.comparisonLayout === "vertical"
              return (
                <a
                  href={`/gallery#${item.id}`}
                  key={item.id}
                  className="panel group overflow-hidden rounded-[1.8rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-border bg-accent/45 p-4">
                    <ClinicalCaseImage
                      imagePath={item.imagePath}
                      alt={item.alt}
                      sizes="(max-width: 1024px) 92vw, 46vw"
                      className="transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    <div className="pointer-events-none absolute inset-3 text-[0.68rem] font-bold uppercase tracking-[0.14em]">
                      <span className="absolute left-0 top-0 rounded-full bg-slate-950/85 px-3 py-1.5 text-white">
                        Before
                      </span>
                      <span className={cn(
                        "absolute rounded-full bg-slate-950/85 px-3 py-1.5 text-white",
                        vertical ? "bottom-0 left-0" : "right-0 top-0"
                      )}>
                        After
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                        {item.categoryLabel}
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold text-primary">{item.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{item.comparisonLabel}</p>
                    </div>
                    <Eye className="h-5 w-5 shrink-0 text-secondary" />
                  </div>
                </a>
              )
            })}
          </div>
        ) : (
          <div className="panel rounded-[1.8rem] p-7 text-center md:p-9">
            <h3 className="text-2xl font-semibold text-primary">Gallery cases under review</h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              Clinical cases will appear only after written publication authorization
              and final presentation review are confirmed.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
