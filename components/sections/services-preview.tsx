import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Eye,
  ScanFace,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type CarePathway = {
  eyebrow: string
  title: string
  summary: string
  href: string
  icon: LucideIcon
  treatment: string
  action: string
}

const carePathways: readonly CarePathway[] = [
  {
    eyebrow: "01 / Cosmetic",
    title: "Cosmetic Eyelid Care",
    summary: "Refine upper lids, lower lids, and brows.",
    href: "/procedures#cosmetic-eyelid-surgery",
    icon: Eye,
    treatment: "care-pathway--cosmetic",
    action: "Explore cosmetic eyelid care",
  },
  {
    eyebrow: "02 / Functional",
    title: "Eyelid Function & Reconstruction",
    summary: "Restore eyelid position, protection, and function.",
    href: "/procedures#reconstructive-oculoplastics",
    icon: ShieldCheck,
    treatment: "care-pathway--reconstructive",
    action: "Explore functional eyelid care",
  },
  {
    eyebrow: "03 / Tear System",
    title: "Tearing & Tear Ducts",
    summary: "Evaluate persistent tearing and drainage problems.",
    href: "/procedures/tearing-blocked-tear-ducts",
    icon: Droplets,
    treatment: "care-pathway--tearing",
    action: "Explore tear-duct care",
  },
  {
    eyebrow: "04 / Orbit",
    title: "Orbital & Thyroid Eye Care",
    summary: "Explore thyroid-related changes, orbital masses, and trauma.",
    href: "/procedures#reconstructive-oculoplastics",
    icon: ScanFace,
    treatment: "care-pathway--orbital",
    action: "Explore orbital care",
  },
]

export function ServicesPreview() {
  return (
    <section
      className="relative py-7 md:py-9"
      aria-labelledby="care-pathways-title"
      data-care-pathways
    >
      <div className="site-container px-4 md:px-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Four areas of care
            </p>
            <h2
              id="care-pathways-title"
              className="mt-2 text-[2.25rem] font-semibold leading-none text-primary sm:text-5xl"
            >
              Explore Specialized Care
            </h2>
          </div>
          <Button variant="outline" className="self-start sm:self-auto" asChild>
            <a href="/procedures">
              All Procedures
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div
          className="care-pathway-rail"
          aria-label="Oculoplastic care pathways"
          data-care-pathway-rail
        >
          {carePathways.map((pathway) => {
            const PathwayIcon = pathway.icon
            return (
              <a
                key={pathway.title}
                href={pathway.href}
                className={`care-pathway group ${pathway.treatment}`}
                data-care-pathway
              >
                <span className="care-pathway-grid" aria-hidden="true" />
                <PathwayIcon
                  className="care-pathway-watermark"
                  strokeWidth={1.15}
                  aria-hidden="true"
                />
                <span className="care-pathway-scrim" aria-hidden="true" />

                <span className="relative z-10 block">
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                    {pathway.eyebrow}
                  </span>
                  <span className="mt-2 block max-w-[15rem] font-serif text-[1.65rem] font-semibold leading-[1.02] tracking-[-0.02em] text-white min-[480px]:text-3xl">
                    {pathway.title}
                  </span>
                  <span className="care-pathway-summary mt-3 block max-w-[17rem] text-sm leading-relaxed text-white/85">
                    {pathway.summary}
                  </span>
                  <span className="care-pathway-action mt-4 inline-flex items-center text-sm font-semibold text-white">
                    {pathway.action}
                    <ArrowRight
                      className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </a>
            )
          })}
        </div>
        <div
          className="care-pathway-controls mt-3 flex items-center justify-between gap-3"
          data-care-pathway-controls
        >
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm transition-colors hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous care pathway"
            data-care-pathway-previous
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="text-center">
            <p
              className="text-sm font-semibold text-foreground"
              aria-live="polite"
              aria-atomic="true"
              data-care-pathway-status
            >
              1 of {carePathways.length}
            </p>
            <p className="text-xs text-muted-foreground">Swipe or use arrows</p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm transition-colors hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Next care pathway"
            data-care-pathway-next
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
