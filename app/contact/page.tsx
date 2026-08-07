import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Navigation,
  PhoneCall,
} from "lucide-react"
import { ContactIntakeForm } from "@/components/contact-intake-form"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Request a Consultation",
  description:
    "Choose the Westlake Village or Rancho Cucamonga office to request an oculoplastic consultation with Dr. Nicolas Biro.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <div className="space-y-10 pb-20 pt-10 md:space-y-12 md:pb-24 md:pt-12">
      <PageIntro
        eyebrow="Appointments"
        title="Choose an Office to Request a Consultation"
        description="Use the official scheduling page for your preferred office, or call the office directly. A request is not confirmed until the office contacts you."
        actions={
          <Button variant="outline" asChild>
            <a href="/procedures">Review Procedures</a>
          </Button>
        }
      />

      <section className="container px-4 md:px-6" aria-labelledby="office-options">
        <h2 id="office-options" className="sr-only">Office scheduling options</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {siteConfig.offices.map((office) => (
            <article key={office.id} className="panel overflow-hidden rounded-[1.8rem]">
              <div className="border-b border-border bg-accent/55 p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                      {office.practiceName}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold text-primary">
                      {office.name}
                    </h3>
                  </div>
                  <span className="inline-flex rounded-full bg-secondary/12 p-3 text-secondary">
                    <MapPin className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-4 max-w-md text-sm text-muted-foreground">
                  {office.address}
                </p>
              </div>

              <div className="space-y-4 p-6 md:p-7">
                <Button size="lg" className="w-full" asChild>
                  <a href={office.bookingUrl}>
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Request at {office.name}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Opens the office&apos;s appointment-request service.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button variant="outline" asChild>
                    <a href={`tel:${office.phoneHref}`}>
                      <PhoneCall className="mr-2 h-4 w-4" />
                      {office.phoneDisplay}
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={office.mapUrl}>
                      <Navigation className="mr-2 h-4 w-4" />
                      Directions
                    </a>
                  </Button>
                </div>
                <a
                  href={`/locations/${office.id}`}
                  className="block text-center text-sm font-semibold text-secondary underline-offset-4 hover:underline"
                >
                  View office details
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="panel-strong mx-auto max-w-3xl rounded-[1.8rem] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Email fallback
          </p>
          <h2 className="mt-2 text-3xl font-medium text-primary">
            Prepare a Scheduling Email
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            If the office request pages are not convenient, create a short email
            with contact details only. Do not include medical information or photographs.
          </p>
          <div className="mt-6"><ContactIntakeForm /></div>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div data-emergency-notice className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-5 text-sm text-amber-950 dark:border-amber-500/45 dark:bg-amber-950/45 dark:text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <h2 className="font-sans text-base font-semibold text-current">
              Not for urgent or emergency care
            </h2>
            <p className="mt-1">
              Do not use web forms or email for urgent eye symptoms. Call the
              appropriate office. For a medical emergency, call 911 or go to the
              nearest emergency department.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
