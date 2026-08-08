import {
  CalendarDays,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { primaryNavItems } from "@/lib/site"

const navClass =
  "relative flex min-h-11 min-w-0 items-center justify-center rounded-lg border-b-2 border-transparent text-[0.6875rem] font-semibold text-muted-foreground transition-colors hover:bg-accent/60 hover:text-primary aria-[current=page]:border-secondary aria-[current=page]:bg-accent aria-[current=page]:text-primary sm:text-sm lg:min-h-12 lg:px-2.5 xl:px-3.5"

const narrowNavLabels: Record<(typeof primaryNavItems)[number]["href"], string> = {
  "/concerns": "Signs",
  "/procedures": "Care",
  "/about": "Dr. Biro",
  "/patient-guide": "Visit",
  "/gallery": "Results",
  "/locations": "Offices",
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 shadow-[0_8px_24px_rgb(5_16_32_/0.06)] backdrop-blur-md dark:shadow-[0_8px_24px_rgb(0_0_0_/0.2)]">
      <div className="container">
        <div
          data-header-shell
          className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 px-4 pt-1.5 md:px-6 lg:min-h-[4.5rem] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-5 lg:py-0"
        >
          <a
            href="/"
            data-header-brand
            className="group relative z-10 inline-flex min-h-12 min-w-0 flex-col justify-center leading-tight lg:min-h-0"
          >
            <span className="whitespace-nowrap font-serif text-[1.1rem] font-semibold text-primary transition-colors group-hover:text-secondary min-[360px]:text-[1.25rem] lg:text-[1.45rem] xl:text-[1.6rem]">
              Nicolas Biro, M.D.
            </span>
            <span className="whitespace-nowrap text-[0.48rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground min-[360px]:text-[0.54rem] lg:text-[0.6rem]">
              Oculoplastic Surgery
            </span>
          </a>

          <nav
            aria-label="Primary"
            data-floating-navigation
            className="relative z-10 col-span-2 row-start-2 -mx-4 grid w-[calc(100%+2rem)] grid-cols-6 items-center lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mx-0 lg:flex lg:w-auto lg:justify-center"
          >
            {primaryNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-label={item.label}
                data-nav-item
                className={navClass}
              >
                <span className="min-[360px]:hidden" aria-hidden="true">
                  {narrowNavLabels[item.href]}
                </span>
                <span className="hidden min-[360px]:inline" aria-hidden="true">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div
            data-header-actions
            className="relative z-10 col-start-2 row-start-1 flex items-center gap-1.5 lg:col-start-3 lg:gap-2"
          >
            <ModeToggle />
            <Button
              size="sm"
              className="px-3 min-[360px]:px-3.5 sm:px-5 lg:px-4 xl:px-5"
              asChild
            >
              <a href="/contact">
                <CalendarDays className="mr-1.5 h-4 w-4 sm:mr-2" aria-hidden="true" />
                <span className="sm:hidden">Request</span>
                <span className="hidden sm:inline">Request Visit</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
