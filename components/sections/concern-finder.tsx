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
    title: "Eyelid Lesions & Cancer Reconstruction",
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
      className="relative py-7 md:py-10"
      aria-labelledby="concern-finder-title"
      data-concern-finder
    >
      <div className="site-container px-4 md:px-6">
        <div className="grid gap-7 px-1 sm:px-3 md:gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14 lg:px-6">
          <div className="relative flex flex-col items-start lg:pt-5">
            <p className="text-sm font-medium text-secondary">
              Symptoms and concerns
            </p>
            <h2
              id="concern-finder-title"
              className="mt-2 max-w-sm text-[2.15rem] font-semibold leading-[1.05] text-primary sm:text-[2.65rem] lg:text-5xl"
            >
              Explore Common Concerns
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Find information about symptoms, possible causes, and what an evaluation may involve.
            </p>
            <Button variant="outline" className="mt-5" asChild>
              <a href="/concerns">
                View All Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div>
            <div className="grid gap-x-7 border-t border-border sm:grid-cols-2">
              {concerns.map((concern) => {
                const ConcernIcon = concern.icon
                return (
                  <a
                    key={concern.href}
                    href={concern.href}
                    className="group flex min-h-[5rem] items-center gap-3 border-b border-border py-4 transition-colors duration-150 hover:bg-accent/70 sm:min-h-[6.25rem]"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/8 text-secondary transition-colors group-hover:bg-secondary/15">
                      <ConcernIcon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-medium leading-snug text-foreground">
                        {concern.title}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-secondary transition-transform group-hover:translate-x-1" aria-hidden="true" />
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
