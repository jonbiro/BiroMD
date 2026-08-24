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
          className="grid gap-2 sm:hidden"
          aria-label="Oculoplastic care pathways"
          data-mobile-care-pathways
        >
          {carePathways.map((pathway) => {
            const PathwayIcon = pathway.icon
            return (
              <a
                key={pathway.title}
                href={pathway.href}
                className="group grid min-h-[5.25rem] grid-cols-[2.75rem_minmax(0,1fr)_1rem] items-center gap-3 rounded-[1.1rem] border border-border bg-card px-3 py-2.5 shadow-[0_5px_16px_rgb(5_16_32_/0.07)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
                data-mobile-care-pathway
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[0.85rem] border border-secondary/30 bg-secondary/8 text-secondary">
                  <PathwayIcon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.625rem] font-bold uppercase leading-4 tracking-[0.13em] text-secondary">
                    {pathway.eyebrow}
                  </span>
                  <span className="mt-0.5 block font-serif text-[1.35rem] font-semibold leading-[1.05] tracking-[-0.02em] text-primary">
                    {pathway.title}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-secondary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            )
          })}
        </div>

        <div
          className="care-pathway-rail hidden sm:flex"
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

                <span className="care-pathway-copy relative z-10 block">
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
