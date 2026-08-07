import { CalendarDays, Dot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { navItems } from "@/lib/site"

const navClass =
  "flex min-w-0 items-center justify-center rounded-xl px-1 py-2.5 text-[0.68rem] font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground aria-[current=page]:shadow-[0_8px_20px_rgb(9_36_59_/0.24)] sm:rounded-full sm:px-4 sm:text-sm"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-3 pb-2 pt-3 md:px-6">
      <div className="container relative px-0">
        <div className="panel relative flex h-20 items-center justify-between overflow-hidden rounded-2xl px-4 md:px-6">
          <div className="pointer-events-none absolute -left-20 top-0 h-32 w-40 rounded-full bg-secondary/8" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-32 w-44 rounded-full bg-primary/8" />

          <a
            href="/"
            data-header-brand
            className="group relative z-30 inline-flex min-w-0 flex-col leading-tight"
          >
            <span className="whitespace-nowrap font-serif text-lg font-semibold text-primary transition-colors group-hover:text-secondary min-[360px]:text-[1.45rem] md:text-3xl">
              Nicolas Biro, M.D.
            </span>
            <span className="inline-flex items-center whitespace-nowrap text-[0.5rem] font-medium uppercase tracking-[0.16em] text-muted-foreground min-[360px]:text-[0.62rem] min-[360px]:tracking-[0.26em] md:text-xs">
              <Dot className="hidden h-3.5 w-3.5 text-secondary min-[360px]:block" />
              Oculoplastic Surgery
            </span>
          </a>

          <div data-header-actions className="relative z-30 flex items-center gap-2 md:gap-3">
            <ModeToggle />
            <Button className="w-11 px-0 sm:w-auto sm:px-5" asChild>
              <a href="/contact" aria-label="Request Consultation">
                <CalendarDays className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Request Consultation</span>
              </a>
            </Button>
          </div>
        </div>

        <nav
          aria-label="Primary"
          data-floating-navigation
          className="panel relative z-40 mx-auto -mt-3 grid max-w-3xl grid-cols-6 gap-0.5 rounded-2xl p-1.5 shadow-[0_14px_30px_rgb(5_16_32_/0.14)] min-[360px]:grid-cols-5 sm:gap-1 sm:rounded-full"
        >
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              data-nav-item
              className={`${navClass} col-span-2 min-[360px]:col-span-1 ${index === 3 ? "max-[359px]:col-start-2" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
