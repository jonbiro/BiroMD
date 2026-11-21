import {
  AlertTriangle,
  ArrowRight,
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

      <section className="site-container px-4 md:px-6" aria-labelledby="office-options">
        <div className="mb-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Choose an office
          </p>
          <h2 id="office-options" className="mt-2 text-3xl font-semibold text-primary">
            Request Through the Office Nearest You
          </h2>
        </div>
        <nav aria-label="Jump to an office" className="mb-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {siteConfig.offices.map((office) => (
            <a
              key={office.id}
              href={`#schedule-${office.id}`}
              className="inline-flex min-h-11 items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium leading-snug text-primary transition-colors hover:border-secondary hover:bg-accent sm:gap-4 sm:px-4"
            >
              {office.name}
              <ArrowRight className="h-3.5 w-3.5 shrink-0 rotate-90 text-secondary" aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="grid gap-5 md:grid-cols-2">
          {siteConfig.offices.map((office) => (
            <article
              id={`schedule-${office.id}`}
              key={office.id}
              className="panel flex min-w-0 flex-col overflow-hidden rounded-2xl"
            >
              <div className="flex-1 p-5 sm:p-7">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <p>{office.practiceName}</p>
                </div>
                <h3 className="mt-4 text-[2.15rem] font-semibold leading-[1.08] text-primary sm:text-4xl">
                  {office.name}
                </h3>
                <address className="mt-4 text-sm leading-relaxed text-muted-foreground not-italic sm:text-base">
                  <span className="block">{office.streetAddress}</span>
                  <span className="block">{office.addressLocality}, {office.addressRegion} {office.postalCode}</span>
                </address>
              </div>

              <div className="border-t border-border bg-accent/35 p-5 sm:px-7">
                <Button className="w-full" asChild>
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
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {office.appointmentMode === "online"
                    ? `Opens ${office.practiceName}'s appointment-request service. Request Dr. Biro by name.`
                    : "Call the office's scheduling team to request a consultation."}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 border-t border-border pt-2">
                  <a href={`tel:${office.phoneHref}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline">
                    <PhoneCall className="mr-2 h-4 w-4" aria-hidden="true" />
                    {office.phoneDisplay}
                  </a>
                  <a href={office.mapUrl} className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline">
                    <Navigation className="mr-2 h-4 w-4" aria-hidden="true" />
                    Directions
                  </a>
                </div>
                <a
                  href={`/locations/${office.id}`}
                  className="mt-1 flex min-h-11 items-center justify-between border-t border-border text-sm font-semibold text-secondary underline-offset-4 hover:underline"
                >
                  View office details
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container px-4 md:px-6" aria-labelledby="confirm-before-request">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Prepare for scheduling
            </p>
            <h2 id="confirm-before-request" className="mt-2 text-3xl font-semibold text-primary">
              Questions to Confirm with the Office
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

      <section className="site-container px-4 md:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-accent/45 p-5">
          <h2 className="font-sans text-sm font-semibold text-foreground">
            Referring a patient?
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Clinicians can review referral planning details, including what to send
            and how urgent findings are handled.
          </p>
          <a
            href="/referrals"
            className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline"
          >
            Information for referring clinicians
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

    </div>
  )
}
