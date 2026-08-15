import { CalendarDays, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { officeAppointmentLabel, siteConfig } from "@/lib/site"

export function ConsultationCta({
  title = "Discuss Your Concern with Dr. Biro",
  description =
    "Choose the most convenient office. Request online where available or call directly, and the office will confirm the appointment.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="site-container px-4 md:px-6" aria-labelledby="consultation-next-step">
      <div className="panel-strong overflow-hidden rounded-[1.8rem] p-6 md:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Your next step
          </p>
          <h2
            id="consultation-next-step"
            className="mt-2 text-4xl font-semibold text-primary"
          >
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2">
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
                    {office.appointmentMode === "online" ? (
                      <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    )}
                    {officeAppointmentLabel(office)}
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
