import { ArrowUpRight, CalendarDays, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navItems, siteConfig } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="relative mt-10 pb-6 md:mt-16 md:pb-8">
      <div className="container px-4 md:px-6">
        <div className="panel-strong relative overflow-hidden rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
          <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-secondary/8" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-52 w-56 rounded-full bg-primary/8" />

          <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div className="space-y-4">
              <p className="font-serif text-2xl font-semibold text-primary md:text-3xl">
                {siteConfig.name}
              </p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Cosmetic and reconstructive oculoplastic care planned around eye
                function, facial anatomy, and each patient&apos;s goals.
              </p>
              <Button size="sm" asChild>
                <a href="/contact">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Request Consultation
                </a>
              </Button>
            </div>

            <div className="space-y-4">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                Offices
              </h2>
              <ul className="space-y-4 text-sm text-foreground/90">
                {siteConfig.offices.map((office) => (
                  <li key={office.id} className="space-y-1.5">
                    <a
                      href={`/locations/${office.id}`}
                      className="font-semibold text-foreground hover:text-secondary"
                    >
                      {office.name}
                    </a>
                    <p className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      <span>{office.address}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4 text-secondary" />
                      <a href={`tel:${office.phoneHref}`} className="hover:text-secondary">
                        {office.phoneDisplay}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                Explore
              </h2>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-muted-foreground">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center transition-colors hover:text-primary"
                    >
                      {item.label}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                Practice Information
              </h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Board-certified ophthalmologist</li>
                <li>Fellowship-trained at Wills Eye Hospital</li>
                <li>Consultations in {siteConfig.languages.join(", ")}</li>
                <li>Serving patients in {siteConfig.serviceAreaLabel}</li>
              </ul>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center text-sm text-secondary hover:underline"
              >
                <Mail className="mr-2 h-4 w-4" />
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col items-start justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground md:flex-row md:items-center">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a href="/privacy" className="hover:text-primary hover:underline">
                Website Privacy
              </a>
              <a
                href="/notice-of-privacy-practices"
                className="hover:text-primary hover:underline"
              >
                Privacy Practices
              </a>
              <a href="/accessibility" className="hover:text-primary hover:underline">
                Accessibility
              </a>
              <a href="/content-standards" className="hover:text-primary hover:underline">
                Content Standards
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
