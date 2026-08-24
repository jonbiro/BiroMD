import {
  CalendarDays,
} from "lucide-react"
import { BrandSymbol } from "@/components/brand-symbol"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { absoluteUrl, primaryNavItems } from "@/lib/site"

const navClass =
  "relative flex min-h-11 min-w-0 items-center justify-center border border-transparent bg-card px-2 text-[0.9375rem] font-medium leading-none text-foreground transition-[color,background-color,border-color,box-shadow] hover:bg-accent hover:text-primary aria-[current=page]:border-primary aria-[current=page]:bg-primary aria-[current=page]:font-semibold aria-[current=page]:text-primary-foreground lg:min-h-10 lg:rounded-full lg:bg-transparent lg:px-3 lg:text-[0.9375rem] xl:px-3.5"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 shadow-[0_6px_20px_rgb(5_16_32_/0.05)] backdrop-blur-md dark:shadow-[0_6px_20px_rgb(0_0_0_/0.18)]">
      <div className="site-container">
        <div
          data-header-shell
          className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 px-4 pt-2 md:px-6 lg:min-h-[5.25rem] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-4 lg:py-0 xl:gap-6"
        >
          <a
            href={absoluteUrl("/")}
            data-header-brand
            className="group relative z-10 inline-flex min-h-12 min-w-0 items-center gap-1.5 leading-tight min-[360px]:gap-2.5 lg:min-h-0 lg:gap-3"
          >
            <BrandSymbol
              priority
              className="h-7 w-9 min-[360px]:h-8 min-[360px]:w-14 lg:h-10 lg:w-[4.25rem] xl:h-11 xl:w-20"
            />
            <span className="flex min-w-0 flex-col justify-center">
              <span className="whitespace-nowrap text-[0.875rem] font-normal leading-none tracking-[-0.025em] text-primary transition-colors group-hover:text-secondary min-[360px]:text-[1.0625rem] lg:text-2xl xl:text-[2rem]">
                Nicolas Biro, M.D.
              </span>
              <span
                data-header-specialty
                className="mt-1 whitespace-nowrap text-[0.6875rem] font-medium leading-none tracking-[0.01em] text-[#805812] min-[360px]:text-xs lg:mt-1.5 lg:text-[0.8125rem] lg:tracking-[0.025em] dark:text-[#e0bd75]"
              >
                Oculoplastic Surgeon
              </span>
            </span>
          </a>

          <nav
            aria-label="Primary"
            data-floating-navigation
            className="relative z-10 col-span-2 row-start-2 -mx-4 mt-1.5 grid w-[calc(100%+2rem)] grid-cols-3 items-center gap-px border-y border-border/80 bg-border/80 p-px sm:grid-cols-6 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mx-0 lg:mt-0 lg:flex lg:w-fit lg:justify-center lg:gap-0.5 lg:rounded-full lg:border lg:bg-muted/80 lg:p-1"
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
              className="px-2.5 min-[360px]:px-3.5 xl:px-5"
              asChild
            >
              <a href="/contact" aria-label="Request a consultation">
                <CalendarDays
                  className="mr-1.5 hidden h-4 w-4 min-[360px]:block sm:mr-2"
                  aria-hidden="true"
                />
                <span className="xl:hidden">Request</span>
                <span className="hidden xl:inline">Request a Consultation</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
