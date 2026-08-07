import { Dot, Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { navItems, siteConfig } from "@/lib/site"

const navClass =
  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground aria-[current=page]:shadow-[0_8px_20px_rgb(9_36_59_/0.24)]"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-3 pb-2 pt-3 md:px-6">
      <div className="container relative px-0">
        <div className="panel relative flex h-20 items-center justify-between overflow-hidden rounded-2xl px-4 md:h-24 md:px-6">
          <div className="pointer-events-none absolute -left-20 top-0 h-32 w-40 rounded-full bg-secondary/8" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-32 w-44 rounded-full bg-primary/8" />

          <a href="/" className="group relative z-30 inline-flex flex-col leading-tight">
            <span className="font-serif text-[1.45rem] font-semibold text-primary transition-colors group-hover:text-secondary md:text-3xl">
              Nicolas Biro, M.D.
            </span>
            <span className="inline-flex items-center text-[0.62rem] font-medium uppercase tracking-[0.26em] text-muted-foreground md:text-xs">
              <Dot className="h-3.5 w-3.5 text-secondary" />
              Oculoplastic Surgery
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-border/70 bg-card p-1 xl:flex"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} data-nav-item className={navClass}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="relative z-30 flex items-center gap-2 md:gap-3">
            <div className="hidden xl:block"><ModeToggle /></div>
            <Button className="hidden xl:inline-flex" asChild>
              <a href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                Request Consultation
              </a>
            </Button>

            <details data-mobile-menu className="group xl:hidden">
              <summary
                className="inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-transparent text-foreground hover:bg-accent [&::-webkit-details-marker]:hidden"
                role="button"
                aria-label="Open menu"
                aria-expanded="false"
                aria-controls="mobile-menu"
              >
                <Menu className="h-6 w-6 group-open:hidden" />
                <X className="hidden h-6 w-6 group-open:block" />
              </summary>

              <button
                type="button"
                data-menu-close
                className="fixed inset-0 z-20 bg-slate-950/55"
                aria-label="Close menu overlay"
                tabIndex={-1}
              />
              <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
                className="panel-strong fixed inset-x-5 top-[5.5rem] z-30 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl p-6"
              >
                <h2 id="mobile-menu-title" className="sr-only">Site navigation</h2>
                <nav aria-label="Mobile primary" className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      data-nav-item
                      className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                  <span className="text-sm text-muted-foreground">Color theme</span>
                  <ModeToggle />
                </div>

                <Button asChild className="mt-4 w-full">
                  <a href="/contact">Request Consultation</a>
                </Button>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {siteConfig.offices.map((office) => (
                    <a
                      key={office.id}
                      href={`tel:${office.phoneHref}`}
                      className="rounded-xl border border-border bg-card px-3 py-2 text-center text-sm font-medium text-foreground hover:border-secondary"
                    >
                      Call {office.name}
                    </a>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  )
}
