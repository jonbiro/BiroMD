import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Syringe,
} from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/site"
import { servicePathways } from "@/lib/services"

export const metadata = pageMetadata({
  title: "Care Pathways",
  description:
    "Compare cosmetic, reconstructive, and injectable oculoplastic care pathways and review individual procedures.",
  path: "/services",
})

const serviceIcons = {
  "cosmetic-eyelid-surgery": Sparkles,
  "reconstructive-oculoplastics": ShieldCheck,
  "non-surgical-treatments": Syringe,
} as const

export default function ServicesPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Care Pathways"
        title="Choose a Care Pathway"
        description="Start with the area of care you want to explore. Each pathway connects to the procedure directory and explains what a consultation may cover."
      />

      <section className="site-container px-4 md:px-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {servicePathways.map((service) => {
            const ServiceIcon = serviceIcons[service.id]
            return (
              <article key={service.title} className="panel rounded-2xl p-6">
                <div className="mb-5 inline-flex rounded-xl border border-secondary/30 bg-secondary/8 p-2 text-secondary">
                  <ServiceIcon className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-medium text-primary">{service.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{service.summary}</p>
                <ul className="mt-5 space-y-2">
                  {service.highlights.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/procedures#${service.id}`}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-secondary hover:underline"
                >
                  View related procedures
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </article>
            )
          })}
        </div>
      </section>

      <section className="site-container px-4 md:px-6">
        <div className="panel rounded-[1.8rem] p-7 md:p-9">
          <h2 className="text-4xl font-semibold text-primary">What to Expect at a Consultation</h2>
          <ol className="mt-5 grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
            {[
              ["1. Assessment", "Medical and eye history, symptoms, goals, and examination of the relevant anatomy."],
              ["2. Options", "Appropriate treatment choices, alternatives, meaningful risks, and limitations."],
              ["3. Next Steps", "Preparation, scheduling, and follow-up instructions specific to the selected plan."],
            ].map(([title, copy]) => (
              <li key={title} className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{title}</p>
                <p className="mt-2">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-container px-4 md:px-6">
        <div className="panel-strong rounded-[1.8rem] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="text-3xl font-semibold text-primary">Not sure where to start?</h2>
            <p className="mt-3 text-muted-foreground">
              Request an office consultation for an appropriate examination and individualized recommendation.
            </p>
          </div>
          <Button className="mt-5 shrink-0 md:mt-0" asChild>
            <a href="/contact">
              Request a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
