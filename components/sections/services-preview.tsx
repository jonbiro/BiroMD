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
    eyebrow: "Cosmetic",
    title: "Cosmetic Eyelid Care",
    summary: "Refine upper lids, lower lids, and brows.",
    href: "/procedures#cosmetic-eyelid-surgery",
    icon: Eye,
    treatment: "care-pathway--cosmetic",
    action: "Explore cosmetic eyelid care",
  },
  {
    eyebrow: "Functional",
    title: "Eyelid Function & Reconstruction",
    summary: "Restore eyelid position, protection, and function.",
    href: "/procedures#reconstructive-oculoplastics",
    icon: ShieldCheck,
    treatment: "care-pathway--reconstructive",
    action: "Explore functional eyelid care",
  },
  {
    eyebrow: "Tear System",
    title: "Tearing & Tear Ducts",
    summary: "Evaluate persistent tearing and drainage problems.",
    href: "/procedures/tearing-blocked-tear-ducts",
    icon: Droplets,
    treatment: "care-pathway--tearing",
    action: "Explore tear-duct care",
  },
  {
    eyebrow: "Orbit",
    title: "Orbital & Thyroid Eye Care",
    summary: "Explore thyroid-related changes, orbital masses, and trauma.",
    href: "/procedures/thyroid-eye-disease",
    icon: ScanFace,
    treatment: "care-pathway--orbital",
    action: "Explore orbital care",
  },
]

export function ServicesPreview() {
  return (
    <section
      className="relative py-7 pb-2 md:py-9 md:pb-3"
      aria-labelledby="care-pathways-title"
      data-care-pathways
    >
      <div className="site-container px-4 md:px-6">
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5 md:mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Four areas of care
            </p>
            <h2
              id="care-pathways-title"
              className="mt-1.5 text-[2rem] font-semibold leading-none text-primary sm:mt-2 sm:text-5xl"
            >
              Specialized Care
            </h2>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 px-3 sm:px-4" asChild>
            <a href="/procedures">
              All Procedures
              <ArrowRight className="ml-1.5 h-4 w-4 sm:ml-2" aria-hidden="true" />
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
                <span className="care-pathway-grid hidden sm:block" aria-hidden="true" />
                <PathwayIcon
                  className="care-pathway-watermark"
                  strokeWidth={1.15}
                  aria-hidden="true"
                />
                <span className="care-pathway-scrim hidden sm:block" aria-hidden="true" />

                <span className="care-pathway-copy relative z-10 block">
                  <span className="block text-[0.625rem] font-bold uppercase tracking-[0.14em] text-secondary sm:text-xs sm:tracking-[0.18em] sm:text-white/75">
                    {pathway.eyebrow}
                  </span>
                  <span className="mt-0.5 block max-w-[15rem] font-serif text-[1.35rem] font-semibold leading-[1.05] tracking-[-0.02em] text-primary sm:mt-2 sm:text-[1.65rem] sm:leading-[1.02] sm:text-white min-[768px]:text-3xl">
                    {pathway.title}
                  </span>
                  <span className="care-pathway-summary mt-3 hidden max-w-[17rem] text-sm leading-relaxed text-white/85 sm:block">
                    {pathway.summary}
                  </span>
                  <span className="care-pathway-action mt-4 hidden items-center text-sm font-semibold text-white sm:inline-flex">
                    {pathway.action}
                    <ArrowRight
                      className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </span>
                <ArrowRight
                  className="care-pathway-mobile-arrow h-4 w-4 text-secondary transition-transform group-hover:translate-x-0.5 sm:hidden"
                  aria-hidden="true"
                />
              </a>
            )
          })}
        </div>
        <div
          className="care-pathway-controls mt-3 hidden items-center justify-between gap-3 sm:flex"
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
          <div className="text-center" suppressHydrationWarning>
            <p
              className="sr-only"
              aria-live="polite"
              aria-atomic="true"
              data-care-pathway-status
              suppressHydrationWarning
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
