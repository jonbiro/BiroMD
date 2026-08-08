import {
  AlertTriangle,
  ArrowRight,
  Droplets,
  Eye,
  RotateCcw,
  ScanFace,
  ShieldCheck,
  Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const concerns = [
  {
    title: "Droopy or heavy upper eyelids",
    detail: "Skin, ptosis, and brow evaluation",
    href: "/concerns/droopy-heavy-upper-eyelids",
    icon: Eye,
  },
  {
    title: "Under-eye bags or fullness",
    detail: "Lower-eyelid and lid-cheek evaluation",
    href: "/concerns/under-eye-bags",
    icon: ScanFace,
  },
  {
    title: "An eyelid turning in or out",
    detail: "Eye protection and eyelid position",
    href: "/concerns/eyelid-turning-in-or-out",
    icon: RotateCcw,
  },
  {
    title: "Constant watery eyes",
    detail: "Eye-surface, eyelid, and tear drainage",
    href: "/concerns/constant-watery-eyes",
    icon: Droplets,
  },
  {
    title: "Eyelid lesion or Mohs reconstruction",
    detail: "Lesion and reconstruction planning",
    href: "/concerns/eyelid-lesion-mohs-reconstruction",
    icon: ShieldCheck,
  },
  {
    title: "Bulging eyes or thyroid eye disease",
    detail: "Eyelid, eye movement, and orbital evaluation",
    href: "/concerns/bulging-eyes-thyroid-eye-disease",
    icon: Stethoscope,
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
              <a href="/concerns">
                View all symptom guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div>
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
            <a
              href="/concerns/sudden-eyelid-drooping"
              className="mt-3 flex min-h-14 items-center gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950 transition-colors hover:border-amber-500 dark:border-amber-500/45 dark:bg-amber-950/45 dark:text-amber-100"
            >
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="flex-1">Sudden eyelid drooping? Read when to seek urgent care.</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
