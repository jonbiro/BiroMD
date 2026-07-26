import Link from "next/link"
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
  title: "Services",
  description:
    "Explore cosmetic, reconstructive, and non-surgical oculoplastic services tailored to functional and aesthetic goals.",
  path: "/services",
})

const serviceIcons = {
  "cosmetic-eyelid-surgery": Sparkles,
  "reconstructive-oculoplastics": ShieldCheck,
  "non-surgical-treatments": Syringe,
} as const

export default function ServicesPage() {
  return (
    <div className="space-y-10 pb-20 pt-10 md:space-y-12 md:pb-24 md:pt-12">
      <PageIntro
        eyebrow="Services"
        title="Choose the Right Care Pathway"
        description="Start with the type of concern you want evaluated. The Procedures page explains the individual treatments available within each pathway."
      />

      <section className="container px-4 md:px-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {servicePathways.map((service) => {
            const ServiceIcon = serviceIcons[service.id]

            return (
            <article key={service.title} className="panel rounded-2xl p-6">
              <div className="mb-5 inline-flex rounded-xl border border-secondary/35 bg-secondary/10 p-2 text-secondary">
                <ServiceIcon className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-medium text-primary">{service.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{service.summary}</p>
              <ul className="mt-5 space-y-2">
                {service.highlights.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground/90"
                  >
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/procedures#${service.id}`}
                className="mt-6 inline-flex items-center text-sm font-semibold text-secondary hover:underline"
              >
                Review related procedures
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </article>
            )
          })}
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="panel rounded-[1.8rem] p-7 md:p-9">
          <h2 className="text-4xl font-semibold text-primary">
            What to Expect at Consultation
          </h2>
          <ol className="mt-5 grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
            <li className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                1. Assessment
              </p>
              <p className="mt-2">
                The visit begins with your medical history, symptoms, goals, and
                an examination of the relevant anatomy.
              </p>
            </li>
            <li className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                2. Plan
              </p>
              <p className="mt-2">
                Dr. Biro explains appropriate options, alternatives, meaningful
                risks, expected recovery, and the limits of treatment.
              </p>
            </li>
            <li className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                3. Follow-Through
              </p>
              <p className="mt-2">
                If you choose treatment, the team provides preparation,
                scheduling, and follow-up instructions specific to your plan.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="rounded-[1.8rem] border border-primary/20 bg-primary p-8 text-primary-foreground shadow-lg md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="text-3xl font-semibold">Need guidance on where to start?</h2>
            <p className="mt-3 text-primary-foreground/85">
              Consultation is the most efficient way to map your priorities to a
              safe and realistic treatment pathway.
            </p>
          </div>
          <Button className="mt-5 md:mt-0" asChild>
            <Link href="/contact">
              Book Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
