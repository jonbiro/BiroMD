import Link from "next/link"
import { ArrowRight, Dot, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

const previewCases = [
  {
    title: "Lower Blepharoplasty",
    category: "Cosmetic Surgery",
    description: "Rejuvenation of the lower eyelid area, addressing pronounced under-eye bags while maintaining a completely natural appearance.",
    imagePath: "/images/cases/scalp-reconstruction.jpg",
    alt: "Before and after lower blepharoplasty showing under-eye rejuvenation",
    tag: "Aesthetic"
  },
  {
    title: "Lower Eyelid Trauma Reconstruction",
    category: "Reconstructive Oculoplastics",
    description: "Restoration of lower eyelid integrity, contour, and function following complex trauma and tissue disruption.",
    imagePath: "/images/cases/eyelid-trauma-repair.jpg",
    alt: "Before and after lower eyelid trauma repair reconstruction",
    tag: "Reconstructive"
  }
]

export function BeforeAfterPreview() {
  return (
    <section className="relative py-20 md:py-24 border-t border-border/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">
              <Dot className="h-3.5 w-3.5" />
              Patient Outcomes
            </p>
            <h2 className="text-4xl font-semibold text-primary sm:text-5xl">
              Clinical Precision,
              <span className="headline-gradient block">Restored Confidence</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Review documented patient outcomes representing the intersection of meticulous surgical function and natural aesthetics.
            </p>
          </div>

          <Button variant="outline" asChild className="self-start md:self-auto">
            <Link href="/gallery">
              View Before & After Photos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {previewCases.map((item) => (
            <article
              key={item.title}
              className="panel group overflow-hidden rounded-[2rem] transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full bg-accent/30 overflow-hidden border-b border-border/50">
                <img
                  src={item.imagePath}
                  alt={item.alt}
                  className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2">
                    {item.category}
                  </p>
                  <h3 className="text-2xl font-serif font-semibold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-border/40">
                  <Link
                    href="/gallery"
                    className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary/80 group/link"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Compare full case details
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
