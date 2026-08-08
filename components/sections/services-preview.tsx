import { ArrowRight, Dot, ShieldCheck, Sparkles, Syringe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { servicePathways } from "@/lib/services"

const serviceIcons = {
  "cosmetic-eyelid-surgery": Sparkles,
  "reconstructive-oculoplastics": ShieldCheck,
  "non-surgical-treatments": Syringe,
} as const

const serviceSummaries = {
  "cosmetic-eyelid-surgery": "Upper eyelid, lower eyelid, and brow surgery.",
  "reconstructive-oculoplastics": "Functional eyelid, tear-duct, orbital, and Mohs reconstruction.",
  "non-surgical-treatments": "Botulinum toxin and fillers for selected patients.",
} as const

export function ServicesPreview() {
  return (
    <section className="relative py-8 md:py-14">
      <div className="container px-4 md:px-6">
        <div className="panel relative overflow-hidden rounded-[2rem] p-6 min-[480px]:p-8 md:p-12">
          <div className="pointer-events-none absolute -right-24 top-0 h-52 w-56 rounded-full bg-primary/8" />

          <div className="relative">
            <div className="mb-7 flex flex-col gap-5 md:mb-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="eyebrow">
                  <Dot className="h-3.5 w-3.5" />
                  Procedures
                </p>
                <h2 className="text-4xl font-semibold text-primary sm:text-5xl">
                  Explore Care Options
                </h2>
              </div>

              <Button variant="outline" asChild>
                <a href="/procedures">
                  All Procedures
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {servicePathways.map((service) => {
                const ServiceIcon = serviceIcons[service.id]
                return (
                  <a
                    key={service.title}
                    href={`/procedures#${service.id}`}
                    className="group flex min-h-40 flex-col rounded-2xl border border-border bg-background p-5 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
                  >
                    <div className="flex items-start gap-3 lg:block">
                      <div className="inline-flex shrink-0 rounded-xl border border-secondary/30 bg-secondary/8 p-2 text-secondary lg:mb-5">
                        <ServiceIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="pt-1 text-2xl font-medium text-primary lg:pt-0">{service.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {serviceSummaries[service.id]}
                    </p>
                    <span className="mt-auto inline-flex items-center pt-4 text-sm font-semibold text-secondary">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
