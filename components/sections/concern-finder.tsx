import {
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
    href: "/concerns/droopy-heavy-upper-eyelids",
    icon: Eye,
  },
  {
    title: "Under-eye bags or fullness",
    href: "/concerns/under-eye-bags",
    icon: ScanFace,
  },
  {
    title: "An eyelid turning in or out",
    href: "/concerns/eyelid-turning-in-or-out",
    icon: RotateCcw,
  },
  {
    title: "Constant watery eyes",
    href: "/concerns/constant-watery-eyes",
    icon: Droplets,
  },
  {
    title: "Eyelid lesions & Mohs",
    href: "/concerns/eyelid-lesion-mohs-reconstruction",
    icon: ShieldCheck,
  },
  {
    title: "Bulging eyes or thyroid eye disease",
    href: "/concerns/bulging-eyes-thyroid-eye-disease",
    icon: Stethoscope,
  },
]

export function ConcernFinder() {
  return (
    <section
      className="relative py-5 md:py-7"
      aria-labelledby="concern-finder-title"
      data-concern-finder
    >
      <div className="site-container px-4 md:px-6">
        <div className="panel-strong grid gap-5 overflow-hidden rounded-[2rem] p-5 min-[360px]:p-6 md:grid-cols-[0.7fr_1.3fr] md:gap-7 md:p-8 lg:gap-10 lg:p-10">
          <div className="relative flex flex-col items-start justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Symptoms and concerns
            </p>
            <h2
              id="concern-finder-title"
              className="mt-2 text-[2.25rem] font-semibold leading-none text-primary sm:text-5xl"
            >
              Explore Common Concerns
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground min-[480px]:text-base">
              Find information about symptoms, possible causes, and what an evaluation may involve.
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <a href="/concerns">
                View All Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div>
            <div className="grid gap-2.5 min-[380px]:grid-cols-2">
              {concerns.map((concern) => {
                const ConcernIcon = concern.icon
                return (
                  <a
                    key={concern.href}
                    href={concern.href}
                    className="group flex min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-border bg-background p-3 transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-secondary hover:shadow-md min-[480px]:gap-3 min-[480px]:p-3.5"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/8 text-secondary min-[480px]:h-10 min-[480px]:w-10">
                      <ConcernIcon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.82rem] font-semibold leading-snug text-foreground min-[480px]:text-sm">
                        {concern.title}
                      </span>
                    </span>
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-secondary transition-transform group-hover:translate-x-1 min-[520px]:block" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
