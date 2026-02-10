"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, Phone, X } from "lucide-react"
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
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <div className="container flex h-20 items-center justify-between px-4 md:h-24 md:px-6">
        <Link
          href="/"
          className="group relative z-30 inline-flex flex-col leading-tight"
          onClick={() => setIsOpen(false)}
        >
          <span className="font-serif text-2xl font-semibold text-primary transition-colors group-hover:text-secondary md:text-3xl">
            Nicolas G Biro, M.D.
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Oculoplastic Surgery
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-card/80 p-1 md:flex">
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
                    ? "bg-primary text-primary-foreground shadow"
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

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-20 bg-slate-950/45 backdrop-blur-sm md:hidden"
              aria-label="Close menu overlay"
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="absolute inset-x-4 top-[5.15rem] z-30 rounded-2xl border border-border/70 bg-card/95 p-6 shadow-2xl md:hidden"
            >
              <nav className="grid gap-2">
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
              <div className="mt-6 flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-4 py-3">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ModeToggle />
              </div>
              <Button asChild className="mt-4 w-full">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 block text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
