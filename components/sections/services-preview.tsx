import {
  ArrowRight,
  Droplets,
  ScanFace,
  ShieldCheck,
  Sparkles,
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
}

const carePathways: readonly CarePathway[] = [
  {
    eyebrow: "01 / Cosmetic",
    title: "Cosmetic Eyelid Care",
    summary: "Refine upper lids, lower lids, and brows.",
    href: "/procedures#cosmetic-eyelid-surgery",
    icon: Sparkles,
    treatment: "care-pathway--cosmetic",
  },
  {
    eyebrow: "02 / Functional",
    title: "Eyelid Function & Reconstruction",
    summary: "Restore eyelid position, protection, and function.",
    href: "/procedures#reconstructive-oculoplastics",
    icon: ShieldCheck,
    treatment: "care-pathway--reconstructive",
  },
  {
    eyebrow: "03 / Tear System",
    title: "Tearing & Tear Ducts",
    summary: "Evaluate persistent tearing and drainage problems.",
    href: "/procedures/tearing-blocked-tear-ducts",
    icon: Droplets,
    treatment: "care-pathway--tearing",
  },
  {
    eyebrow: "04 / Orbit",
    title: "Orbit & Thyroid Eye",
    summary: "Assess thyroid-related changes, masses, and trauma.",
    href: "/procedures/thyroid-eye-disease",
    icon: ScanFace,
    treatment: "care-pathway--orbital",
  },
]

export function ServicesPreview() {
  return (
    <section
      className="relative py-8 md:py-14"
      aria-labelledby="care-pathways-title"
      data-care-pathways
    >
      <div className="site-container px-4 md:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Find your pathway
            </p>
            <h2
              id="care-pathways-title"
              className="mt-2 text-4xl font-semibold text-primary sm:text-5xl"
            >
              Explore Care by Concern
            </h2>
          </div>
          <Button variant="outline" className="self-start sm:self-auto" asChild>
            <a href="/procedures">
              All Procedures
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div className="care-pathway-rail" aria-label="Oculoplastic care pathways">
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
                  <span className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/70">
                    {pathway.eyebrow}
                  </span>
                  <span className="mt-2 block max-w-[15rem] font-serif text-[1.65rem] font-semibold leading-[1.02] tracking-[-0.02em] text-white min-[480px]:text-3xl">
                    {pathway.title}
                  </span>
                  <span className="care-pathway-details">
                    <span className="mt-3 block max-w-[17rem] text-sm leading-relaxed text-white/80">
                      {pathway.summary}
                    </span>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-white">
                      View care
                      <ArrowRight
                        className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </span>
              </a>
            )
          })}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground lg:hidden">
          Swipe to compare care pathways.
        </p>
      </div>
    </section>
  )
}
