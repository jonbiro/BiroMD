import { ArrowRight, Dot, ShieldCheck, Sparkles, Syringe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { servicePathways } from "@/lib/services"

const serviceIcons = {
  "cosmetic-eyelid-surgery": Sparkles,
  "reconstructive-oculoplastics": ShieldCheck,
  "non-surgical-treatments": Syringe,
} as const

export function ServicesPreview() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="panel relative overflow-hidden rounded-[2rem] p-8 md:p-12">
          <div className="pointer-events-none absolute -right-24 top-0 h-52 w-56 rounded-full bg-primary/8" />

          <div className="relative">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="eyebrow">
                  <Dot className="h-3.5 w-3.5" />
                  Care Pathways
                </p>
                <h2 className="text-4xl font-semibold text-primary sm:text-5xl">
                  Start with the Concern You Want Evaluated
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore cosmetic, reconstructive, and non-surgical options,
                  then review the individual procedure pages before consultation.
                </p>
              </div>

              <Button variant="outline" asChild>
                <a href="/services">
                  Compare Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {servicePathways.map((service) => {
                const ServiceIcon = serviceIcons[service.id]
                return (
                  <article key={service.title} className="rounded-2xl border border-border bg-background p-6">
                    <div className="mb-5 inline-flex rounded-xl border border-secondary/30 bg-secondary/8 p-2 text-secondary">
                      <ServiceIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-medium text-primary">{service.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{service.summary}</p>
                    <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                      {service.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`/procedures#${service.id}`}
                      className="mt-5 inline-flex items-center text-sm font-semibold text-secondary hover:underline"
                    >
                      Review procedures
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </article>
                )
              })}
            </div>

            <div className="panel-strong mt-10 rounded-2xl p-6 md:flex md:items-center md:justify-between md:gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Next Step
                </p>
                <p className="mt-2 text-lg text-foreground/90">
                  Consultation is the appropriate place to confirm the diagnosis,
                  candidacy, alternatives, and expected recovery.
                </p>
              </div>
              <Button className="mt-4 shrink-0 md:mt-0" asChild>
                <a href="/contact">Request Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
