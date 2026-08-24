import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  LockKeyhole,
  Mail,
  MapPin,
  Navigation,
  PhoneCall,
} from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { appointmentQuestions } from "@/lib/appointment"
import { officeAppointmentLabel, pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Request a Consultation",
  description:
    "Choose the downtown Los Angeles, Burbank, Westlake Village, or Rancho Cucamonga office to request an oculoplastic consultation with Dr. Nicolas Biro.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Appointments"
        title="Request a Consultation"
        description="For routine, non-urgent appointments, choose the most convenient office. Request online where available, or call directly. The office will contact you to confirm."
        actions={
          <>
            {siteConfig.offices.map((office) => (
              <Button key={office.id} variant="outline" asChild>
                <a href={`#schedule-${office.id}`}>
                  <MapPin className="mr-2 h-4 w-4" />
                  {office.name}
                </a>
              </Button>
            ))}
          </>
        }
      />

      <section className="site-container px-4 md:px-6">
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

      <section className="site-container px-4 md:px-6" aria-labelledby="confirm-before-request">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Before you request
            </p>
            <h2 id="confirm-before-request" className="mt-2 text-3xl font-semibold text-primary">
              What to confirm with the office
            </h2>
            <p className="mt-3 text-muted-foreground">
              Scheduling details vary by office. The team can explain fees, insurance,
              referrals, visit length, preparation, and payment options before your appointment.
            </p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {appointmentQuestions.slice(0, 3).map((question) => (
              <div key={question.title} className="rounded-xl bg-accent/55 p-4">
                <h3 className="font-sans text-sm font-semibold text-foreground">
                  {question.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{question.detail}</p>
              </div>
            ))}
          </div>
          {appointmentQuestions.length > 3 ? (
            <details className="group mt-4 rounded-xl border border-border bg-card px-4 py-3">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground marker:content-none">
                More questions to confirm
                <span className="text-secondary transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <div className="grid gap-3 border-t border-border pb-1 pt-4 sm:grid-cols-2">
                {appointmentQuestions.slice(3).map((question) => (
                  <div key={question.title} className="rounded-xl bg-accent/55 p-4">
                    <h3 className="font-sans text-sm font-semibold text-foreground">
                      {question.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{question.detail}</p>
                  </div>
                ))}
              </div>
            </details>
          ) : null}
        </div>
      </section>

      <section className="site-container px-4 md:px-6" aria-labelledby="office-options">
        <h2 id="office-options" className="sr-only">Office scheduling options</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {siteConfig.offices.map((office) => (
            <article
              id={`schedule-${office.id}`}
              key={office.id}
              className="panel overflow-hidden rounded-[1.8rem]"
            >
              <div className="border-b border-border bg-accent/55 p-6 md:p-7 lg:min-h-44">
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
                    {office.appointmentMode === "online" ? (
                      <CalendarDays className="mr-2 h-4 w-4" />
                    ) : (
                      <PhoneCall className="mr-2 h-4 w-4" />
                    )}
                    {officeAppointmentLabel(office)}
                    {office.appointmentMode === "online" && (
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    )}
                  </a>
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {office.appointmentMode === "online"
                    ? `Opens ${office.practiceName}'s appointment-request service. Request Dr. Biro by name.`
                    : "Call the office's scheduling team to request a consultation."}
                </p>
                <div className="grid gap-3">
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
                  className="flex min-h-11 items-center justify-center text-center text-sm font-semibold text-secondary underline-offset-4 hover:underline"
                >
                  View office details
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container px-4 md:px-6">
        <div className="panel-strong mx-auto flex max-w-3xl flex-col gap-5 rounded-[1.8rem] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Email alternative
            </p>
            <h2 className="mt-2 text-3xl font-medium text-primary">
              Ask a Scheduling Question
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use ordinary email only for non-urgent scheduling questions. Do not
              include medical details, photographs, insurance, or payment information.
            </p>
            <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
              <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
              This opens your email app; it does not submit information through this website.
            </p>
          </div>
          <Button variant="outline" className="shrink-0" asChild>
            <a href={`mailto:${siteConfig.email}?subject=Consultation%20scheduling%20question`}>
              <Mail className="mr-2 h-4 w-4" />
              Email Scheduling
            </a>
          </Button>
        </div>
      </section>

    </div>
  )
}
