"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dot, Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { navItems, siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const isItemActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 px-3 pb-2 pt-3 md:px-6">
      <div className="container relative px-0">
        <div className="panel relative flex h-20 items-center justify-between overflow-hidden rounded-2xl px-4 md:h-24 md:px-6">
          <div className="pointer-events-none absolute -left-20 top-0 h-32 w-40 rounded-full bg-secondary/10" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-32 w-44 rounded-full bg-primary/10" />

          <Link
            href="/"
            className="group relative z-30 inline-flex flex-col leading-tight"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-serif text-[1.45rem] font-semibold text-primary transition-colors group-hover:text-secondary md:text-3xl">
              Nicolas Biro, M.D.
            </span>
            <span className="inline-flex items-center text-[0.62rem] font-medium uppercase tracking-[0.26em] text-muted-foreground md:text-xs">
              <Dot className="h-3.5 w-3.5 text-secondary" />
              Oculoplastic Surgery
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/85 p-1 md:flex"
          >
            {navItems.map((item) => {
              const active = isItemActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    active
                      ? "bg-primary text-primary-foreground shadow-[0_8px_20px_rgb(9_36_59_/0.32)]"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="relative z-30 flex items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <ModeToggle />
            </div>
            <Button className="hidden md:inline-flex" asChild>
              <Link href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                Book Consultation
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen((value) => !value)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen ? (
        <>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-20 bg-slate-950/45 md:hidden"
            aria-label="Close menu overlay"
          />

          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="panel-strong absolute inset-x-5 top-[5.5rem] z-30 rounded-2xl p-6 md:hidden"
          >
            <nav aria-label="Mobile primary" className="grid gap-2">
              {navItems.map((item) => {
                const active = isItemActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base font-medium transition",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-4 py-3">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ModeToggle />
            </div>

            <Button asChild className="mt-4 w-full">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>

            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 block text-center text-sm text-muted-foreground underline-offset-4 hover:text-secondary hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
        </>
      ) : null}
    </header>
  )
}
