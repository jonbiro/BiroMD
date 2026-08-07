import {
  ArrowRight,
  Droplets,
  Eye,
  RotateCcw,
  ScanFace,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const concerns = [
  {
    title: "A drooping upper eyelid",
    detail: "Ptosis evaluation and repair",
    href: "/procedures/ptosis-repair",
    icon: Eye,
  },
  {
    title: "Excess upper-eyelid skin",
    detail: "Upper blepharoplasty",
    href: "/procedures/upper-blepharoplasty",
    icon: Sparkles,
  },
  {
    title: "Under-eye bags or fullness",
    detail: "Lower blepharoplasty",
    href: "/procedures/lower-blepharoplasty",
    icon: ScanFace,
  },
  {
    title: "An eyelid turning in or out",
    detail: "Entropion and ectropion repair",
    href: "/procedures/entropion-ectropion-repair",
    icon: RotateCcw,
  },
  {
    title: "Persistent tearing",
    detail: "Tear-duct evaluation",
    href: "/procedures/tearing-blocked-tear-ducts",
    icon: Droplets,
  },
  {
    title: "Reconstruction after skin cancer",
    detail: "Eyelid and Mohs reconstruction",
    href: "/procedures/eyelid-cancer-mohs-reconstruction",
    icon: ShieldCheck,
  },
]

export function ConcernFinder() {
  return (
    <section
      className="relative py-5 md:py-8"
      aria-labelledby="concern-finder-title"
      data-concern-finder
    >
      <div className="container px-4 md:px-6">
        <div className="panel-strong grid gap-8 overflow-hidden rounded-[2rem] p-6 md:p-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10 lg:p-10">
          <div className="relative flex flex-col items-start justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Find a starting point
            </p>
            <h2
              id="concern-finder-title"
              className="mt-3 text-4xl font-semibold text-primary sm:text-5xl"
            >
              What would you like help with?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose the concern closest to yours to see what an evaluation may
              cover. Symptoms can have more than one cause.
            </p>
            <Button variant="outline" className="mt-6" asChild>
              <a href="/procedures">
                View all procedures
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {concerns.map((concern) => {
              const ConcernIcon = concern.icon
              return (
                <a
                  key={concern.href}
                  href={concern.href}
                  className="group flex min-h-28 items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/8 text-secondary">
                    <ConcernIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-snug text-foreground">
                      {concern.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {concern.detail}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-secondary transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
