import {
  CalendarDays,
  CircleUserRound,
  ClipboardList,
  Dot,
  HeartPulse,
  Images,
  Mail,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { navItems } from "@/lib/site"

const navClass =
  "flex min-h-11 min-w-0 items-center justify-center gap-0.5 rounded-xl border border-transparent px-1 py-2 text-[0.6875rem] font-semibold text-muted-foreground transition-colors hover:border-border hover:bg-card hover:text-primary aria-[current=page]:border-secondary/60 aria-[current=page]:bg-card aria-[current=page]:text-primary min-[360px]:gap-1 min-[360px]:px-1.5 min-[360px]:text-xs sm:rounded-full sm:px-2.5 sm:text-sm lg:min-h-10 lg:text-[0.8rem] xl:px-3.5"

const navIcons = {
  "/about": CircleUserRound,
  "/services": HeartPulse,
  "/procedures": ClipboardList,
  "/gallery": Images,
  "/locations": MapPin,
  "/contact": Mail,
} as const

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-3 pb-2 pt-3 md:px-6">
      <div className="container px-0">
        <div
          data-header-shell
          className="panel relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 overflow-hidden rounded-[1.35rem] p-1 shadow-[0_12px_30px_rgb(5_16_32_/0.11)] lg:min-h-20 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-4 lg:rounded-full lg:px-2.5 lg:py-2"
        >
          <a
            href="/"
            data-header-brand
            className="group relative z-10 inline-flex min-h-12 min-w-0 flex-col justify-center px-2 leading-tight lg:min-h-0 lg:px-3 lg:pr-2"
          >
            <span className="whitespace-nowrap font-serif text-lg font-semibold text-primary transition-colors group-hover:text-secondary min-[360px]:text-[1.35rem] lg:text-2xl xl:text-[1.65rem]">
              Nicolas Biro, M.D.
            </span>
            <span className="inline-flex items-center whitespace-nowrap text-[0.5rem] font-medium uppercase tracking-[0.16em] text-muted-foreground min-[360px]:text-[0.58rem] min-[360px]:tracking-[0.22em] lg:text-[0.62rem]">
              <Dot className="hidden h-3.5 w-3.5 text-secondary min-[360px]:block" />
              Oculoplastic Surgery
            </span>
          </a>

          <nav
            aria-label="Primary"
            data-floating-navigation
            className="relative z-10 col-span-2 row-start-2 grid grid-cols-3 gap-1 rounded-2xl border border-border/80 bg-accent/55 p-1 sm:grid-cols-6 sm:rounded-full lg:col-span-1 lg:col-start-2 lg:row-start-1"
          >
            {navItems.map((item) => {
              const NavIcon = navIcons[item.href]
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-nav-item
                  className={navClass}
                >
                  <NavIcon
                    className="h-3 w-3 shrink-0 text-secondary min-[360px]:h-3.5 min-[360px]:w-3.5 sm:hidden"
                    aria-hidden="true"
                  />
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div
            data-header-actions
            className="relative z-10 col-start-2 row-start-1 flex items-center gap-2 pr-1 lg:col-start-3 lg:pr-0"
          >
            <ModeToggle />
            <Button
              className="w-11 px-0 sm:w-auto sm:px-5 lg:px-3 xl:px-5"
              asChild
            >
              <a href="/contact" aria-label="Request Consultation">
                <CalendarDays className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline lg:hidden xl:inline">
                  Request Consultation
                </span>
                <span className="hidden lg:inline xl:hidden">Consult</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
