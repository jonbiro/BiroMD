import Link from "next/link"
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react"
import { navItems, siteConfig } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="relative mt-24 w-full overflow-hidden border-t border-border/70 bg-background/80 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgb(15_143_138_/_0.16),transparent_48%),radial-gradient(circle_at_90%_30%,rgb(11_53_88_/_0.12),transparent_52%)]" />

      <div className="container relative grid gap-10 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-serif text-2xl font-semibold text-primary">{siteConfig.name}</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Refined surgical and non-surgical care for the eyes and face, built
            around functional outcomes and natural aesthetics.
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

        <div className="space-y-4">
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

      <div className="container relative mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/70 px-4 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:px-6">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
        <p>Built for patient confidence, clarity, and comfort.</p>
      </div>
    </footer>
  )
}
