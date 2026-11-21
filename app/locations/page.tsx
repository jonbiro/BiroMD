import { ArrowRight, CalendarDays, MapPin, Navigation, Phone } from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { officeAppointmentLabel, pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Find an Office",
  description:
    "Find office and appointment information for Dr. Nicolas Biro in downtown Los Angeles, Burbank, Westlake Village, and Rancho Cucamonga.",
  path: "/locations",
})

export default function LocationsPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Locations"
        title="Find an Office"
        description="Dr. Biro sees patients at four offices across the Greater Los Angeles area. Request a consultation online where available, or call the office directly."
      />
      <section className="site-container grid gap-5 px-4 md:grid-cols-2 md:px-6" aria-label="Office directory">
        {siteConfig.offices.map((office) => (
          <article key={office.id} className="panel flex min-w-0 flex-col overflow-hidden rounded-2xl">
            <div className="flex-1 p-5 sm:p-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <p>{office.practiceName}</p>
              </div>
              <h2 className="mt-4 text-[2.15rem] font-semibold leading-[1.08] text-primary sm:text-4xl">
                {office.name}
              </h2>
              <address className="mt-4 text-sm leading-relaxed text-muted-foreground not-italic sm:text-base">
                <span className="block">{office.streetAddress}</span>
                <span className="block">{office.addressLocality}, {office.addressRegion} {office.postalCode}</span>
              </address>
              <a
                className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline sm:text-base"
                href={`tel:${office.phoneHref}`}
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                {office.phoneDisplay}
              </a>
            </div>
            <div className="border-t border-border bg-accent/35 p-5 sm:px-7">
              <Button className="w-full" asChild>
                <a href={office.bookingUrl}>
                  {office.appointmentMode === "online" ? (
                    <CalendarDays className="mr-2 h-4 w-4" />
                  ) : (
                    <Phone className="mr-2 h-4 w-4" />
                  )}
                  {officeAppointmentLabel(office)}
                </a>
              </Button>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4">
                <a href={office.mapUrl} className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline">
                  <Navigation className="mr-2 h-4 w-4" aria-hidden="true" />
                  Get Directions
                </a>
                <a
                  href={`/locations/${office.id}`}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline"
                >
                  View office details
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
