import { ArrowRight, CalendarDays, MapPin, Phone } from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Office Locations",
  description:
    "Find office and appointment information for Dr. Nicolas Biro in downtown Los Angeles, Burbank, Westlake Village, and Rancho Cucamonga.",
  path: "/locations",
})

export default function LocationsPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Locations"
        title="Choose Your Convenient Office"
        description="Dr. Biro sees patients at four Los Angeles-area offices. Request online where available, or call the office directly."
      />
      <section className="site-container grid gap-6 px-4 lg:grid-cols-2 md:px-6">
        {siteConfig.offices.map((office) => (
          <article key={office.id} className="panel min-w-0 rounded-[1.8rem] p-6 md:p-8">
            <MapPin className="h-6 w-6 text-secondary" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              {office.practiceName}
            </p>
            <h2 className="mt-2 text-4xl font-semibold text-primary">{office.name}</h2>
            <p className="mt-3 text-muted-foreground">{office.address}</p>
            <a
              className="mt-2 inline-flex min-h-11 items-center font-semibold text-secondary underline-offset-4 hover:underline"
              href={`tel:${office.phoneHref}`}
            >
              <Phone className="mr-2 h-4 w-4" />
              {office.phoneDisplay}
            </a>
            <div className="mt-7 flex flex-col gap-3">
              <Button className="w-full" asChild>
                <a href={office.bookingUrl}>
                  {office.appointmentMode === "online" ? (
                    <CalendarDays className="mr-2 h-4 w-4" />
                  ) : (
                    <Phone className="mr-2 h-4 w-4" />
                  )}
                  {office.appointmentMode === "online"
                    ? "Request Appointment"
                    : "Call for Appointment"}
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href={`/locations/${office.id}`}>
                  Office Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
