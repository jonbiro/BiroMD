import { CalendarDays, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export function ConsultationCta() {
  return (
    <section className="container px-4 md:px-6" aria-labelledby="consultation-next-step">
      <div className="panel-strong overflow-hidden rounded-[1.8rem] p-6 md:p-8 lg:grid lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-10 lg:p-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Your next step
          </p>
          <h2
            id="consultation-next-step"
            className="mt-2 text-4xl font-semibold text-primary"
          >
            Discuss Your Concern with Dr. Biro
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Choose the more convenient office. Your request goes directly to that
            practice&apos;s scheduling service, and the office confirms the appointment.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0">
          {siteConfig.offices.map((office) => (
            <article
              key={office.id}
              className="rounded-2xl border border-border bg-background p-4 md:p-5"
            >
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {office.practiceName}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-primary">{office.name}</h3>
              <div className="mt-4 space-y-2">
                <Button className="w-full px-3" asChild>
                  <a href={office.bookingUrl}>
                    <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
                    Request appointment
                  </a>
                </Button>
                <a
                  href={`tel:${office.phoneHref}`}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold text-secondary underline-offset-4 hover:underline"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {office.phoneDisplay}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
