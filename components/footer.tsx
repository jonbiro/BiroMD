import { ArrowUpRight, CalendarDays, Mail, MapPin, Phone } from "lucide-react"
import { BrandSymbol } from "@/components/brand-symbol"
import { Button } from "@/components/ui/button"
import { formatList, navItems, siteConfig } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-muted md:mt-16">
      <div className="site-container px-4 py-6 md:px-6 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5 md:pb-7">
          <div className="flex min-w-0 items-center gap-3">
            <BrandSymbol className="h-10 w-14 shrink-0 sm:h-14 sm:w-20" />
            <div>
              <p className="font-serif text-3xl font-semibold leading-none text-primary sm:text-4xl">
                {siteConfig.name}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Serving patients across {siteConfig.serviceAreaLabel}
              </p>
            </div>
          </div>
          <Button size="sm" asChild>
            <a href="/contact">
              <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
              Request a Consultation
            </a>
          </Button>
        </div>
        <div className="mt-4 grid gap-3 md:mt-7 md:grid-cols-2 md:gap-7 lg:grid-cols-[2fr_1fr_1fr]">
          <details
            open
            suppressHydrationWarning
            className="footer-disclosure border-b border-border pb-1 md:border-0 md:pb-0"
          >
            <summary className="footer-disclosure-summary">
              <span>Offices</span>
            </summary>
            <div className="footer-disclosure-content pt-4 md:pt-0">
              <ul className="grid gap-x-5 gap-y-4 text-[0.9375rem] text-foreground/90 lg:grid-cols-2">
              {siteConfig.offices.map((office) => (
                <li key={office.id} className="space-y-1.5">
                  <a
                    href={`/locations/${office.id}`}
                    className="inline-flex min-h-11 items-center font-semibold text-foreground hover:text-secondary"
                  >
                    {office.name}
                  </a>
                  <p className="hidden items-start gap-2 text-muted-foreground md:flex">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>{office.address}</span>
                  </p>
                  <a
                    href={`tel:${office.phoneHref}`}
                    className="-mx-2 flex min-h-11 items-center gap-2 rounded-lg px-2 hover:bg-accent hover:text-secondary"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                    {office.phoneDisplay}
                  </a>
                  <a
                    href={`/locations/${office.id}`}
                    className="inline-flex min-h-11 items-center text-xs font-semibold text-secondary hover:underline md:hidden"
                  >
                    View office details
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
              </ul>
            </div>
          </details>

          <details
            open
            suppressHydrationWarning
            className="footer-disclosure border-b border-border pb-1 md:border-0 md:pb-0"
          >
            <summary className="footer-disclosure-summary">Explore</summary>
            <div className="footer-disclosure-content pt-4 md:pt-0">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[0.9375rem] text-muted-foreground">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex min-h-11 items-center transition-colors hover:text-primary"
                  >
                    {item.label}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              </ul>
            </div>
          </details>

          <details
            open
            suppressHydrationWarning
            className="footer-disclosure border-b border-border pb-1 md:border-0 md:pb-0"
          >
            <summary className="footer-disclosure-summary">Practice Information</summary>
            <div className="footer-disclosure-content pb-4 pt-3 md:pb-0 md:pt-0">
              <ul className="space-y-3 text-[0.9375rem] text-muted-foreground">
              <li>Board-certified ophthalmologist</li>
              <li>Fellowship-trained at Wills Eye Hospital</li>
              <li>Consultations in {formatList(siteConfig.languages)}</li>
              </ul>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-flex min-h-11 items-center text-sm text-secondary hover:underline"
              >
                <Mail className="mr-2 h-4 w-4" />
                {siteConfig.email}
              </a>
            </div>
          </details>
        </div>

        <div className="relative mt-8 flex flex-col items-start justify-between gap-3 border-t border-border pt-5 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4">
            <a
              href="/privacy"
              className="inline-flex min-h-11 items-center hover:text-primary hover:underline"
            >
              Website Privacy
            </a>
            <a
              href="/notice-of-privacy-practices"
              className="inline-flex min-h-11 items-center hover:text-primary hover:underline"
            >
              Privacy Practices
            </a>
            <a
              href="/accessibility"
              className="inline-flex min-h-11 items-center hover:text-primary hover:underline"
            >
              Accessibility
            </a>
            <a
              href="/content-standards"
              className="inline-flex min-h-11 items-center hover:text-primary hover:underline"
            >
              Content Standards
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
