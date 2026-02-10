import Link from "next/link"
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react"
import { navItems, siteConfig } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="relative mt-24 pb-10">
      <div className="container px-4 md:px-6">
        <div className="panel-strong relative overflow-hidden rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
          <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-secondary/10" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-52 w-56 rounded-full bg-primary/10" />

          <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <p className="font-serif text-2xl font-semibold text-primary md:text-3xl">
                {siteConfig.name}
              </p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Refined surgical and non-surgical care for the eyes and face,
                built around functional outcomes and natural aesthetics.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                Contact
              </h3>
              <ul className="space-y-3 text-sm text-foreground/90">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-secondary" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-secondary">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-secondary" />
                  <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-secondary">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-secondary" />
                  <span>{siteConfig.location}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-4 w-4 text-secondary" />
                  <span>{siteConfig.hours}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                Explore
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center transition-colors hover:text-primary"
                    >
                      {item.label}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-border/70 bg-card/75 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                Practice Highlights
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Board-certified ophthalmologist</li>
                <li>Fellowship-trained at Wills Eye Hospital</li>
                <li>Fluent in {siteConfig.languages.join(", ")}</li>
                <li>Serving patients in {siteConfig.statesServed.join(", ")}</li>
              </ul>
            </div>
          </div>

          <div className="relative mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/70 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
            <p>
              © {new Date().getFullYear()} {siteConfig.legalName}. All rights
              reserved.
            </p>
            <p>Built for patient confidence, clarity, and comfort.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
