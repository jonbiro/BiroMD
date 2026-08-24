import {
  CalendarDays,
} from "lucide-react"
import { BrandSymbol } from "@/components/brand-symbol"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { absoluteUrl, primaryNavItems } from "@/lib/site"

const navClass =
  "relative flex min-h-11 min-w-0 items-center justify-center rounded-xl border border-border bg-card px-2 text-[0.9375rem] font-bold leading-none text-foreground shadow-[0_1px_2px_rgb(5_16_32_/0.08)] transition-[color,background-color,border-color,box-shadow] hover:border-secondary hover:bg-accent hover:text-primary aria-[current=page]:border-primary aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground aria-[current=page]:shadow-[0_4px_12px_rgb(5_16_32_/0.18)] lg:min-h-11 lg:rounded-full lg:px-3 lg:text-sm lg:font-semibold xl:px-3.5"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 shadow-[0_8px_24px_rgb(5_16_32_/0.06)] backdrop-blur-md dark:shadow-[0_8px_24px_rgb(0_0_0_/0.2)]">
      <div className="site-container">
        <div
          data-header-shell
          className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 px-4 pt-1.5 md:px-6 lg:min-h-[4.5rem] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-5 lg:py-0"
        >
          <a
            href={absoluteUrl("/")}
            data-header-brand
            className="group relative z-10 inline-flex min-h-12 min-w-0 items-center gap-1 leading-tight min-[360px]:gap-2 lg:min-h-0 lg:gap-2.5"
          >
            <BrandSymbol
              priority
              className="h-7 w-7 min-[360px]:h-9 min-[360px]:w-11 lg:h-10 lg:w-12"
            />
            <span className="flex min-w-0 flex-col justify-center">
              <span className="whitespace-nowrap font-serif text-[0.82rem] font-semibold text-primary transition-colors group-hover:text-secondary min-[360px]:text-[1.15rem] lg:text-[1.35rem] xl:text-[1.5rem]">
                Nicolas Biro, M.D.
              </span>
              <span
                data-header-specialty
                className="whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.04em] text-primary min-[360px]:text-[0.6875rem] min-[360px]:tracking-[0.08em] lg:text-[0.6875rem] lg:tracking-[0.12em]"
              >
                Oculoplastic Surgery
              </span>
            </span>
          </a>

          <nav
            aria-label="Primary"
            data-floating-navigation
            className="relative z-10 col-span-2 row-start-2 -mx-4 mt-1 grid w-[calc(100%+2rem)] grid-cols-3 items-center gap-1.5 border-t border-border/70 px-2 pb-2 pt-1.5 sm:grid-cols-6 sm:gap-1 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mx-0 lg:mt-0 lg:flex lg:w-auto lg:justify-center lg:gap-1.5 lg:border-0 lg:p-0"
          >
            {primaryNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-label={item.label}
                data-nav-item
                className={navClass}
                suppressHydrationWarning
              >
                <span
                  aria-hidden="true"
                  className="block w-full min-w-0 text-center leading-tight [overflow-wrap:anywhere] lg:w-auto lg:whitespace-nowrap"
                >
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
              className="px-2 min-[360px]:px-3.5 sm:px-5 lg:px-4 xl:px-5"
              asChild
            >
              <a href="/contact" aria-label="Request a consultation">
                <CalendarDays
                  className="mr-1.5 hidden h-4 w-4 min-[360px]:block sm:mr-2"
                  aria-hidden="true"
                />
                <span className="sm:hidden">Request</span>
                <span className="hidden sm:inline">Request a Consultation</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
