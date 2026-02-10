import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles, Syringe } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Cosmetic Eyelid Surgery",
    description:
      "Structured rejuvenation for the upper and lower eyelids, calibrated to your anatomy.",
    icon: Sparkles,
    items: ["Upper blepharoplasty", "Lower blepharoplasty", "Brow support planning"],
  },
  {
    title: "Reconstructive Oculoplastics",
    description:
      "Functional repair for eyelid malposition, tumors, trauma, and orbital concerns.",
    icon: ShieldCheck,
    items: ["Ptosis correction", "Ectropion/entropion repair", "Post-cancer reconstruction"],
  },
  {
    title: "Injectables and Non-Surgical Care",
    description:
      "Conservative treatment pathways for soft tissue balance and long-term maintenance.",
    icon: Syringe,
    items: ["BOTOX cosmetic", "Dermal fillers", "Targeted skin support"],
  },
]

export function ServicesPreview() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Care Spectrum
            </p>
            <h2 className="text-4xl font-semibold text-primary sm:text-5xl">
              Comprehensive Treatment, Singular Standards
            </h2>
            <p className="text-lg text-muted-foreground">
              Every service pathway is structured around diagnostic precision,
              conservative planning, and outcomes that feel naturally aligned.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/services">
              See All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl border border-border/70 bg-card/85 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="mb-5 inline-flex rounded-xl border border-secondary/35 bg-secondary/10 p-2 text-secondary">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-medium text-primary">{service.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border/70 bg-primary p-6 text-primary-foreground shadow-lg md:mt-12 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Next Step
            </p>
            <p className="mt-2 text-lg">
              Unsure which pathway fits your goals? A consultation is the fastest
              way to define a safe, tailored plan.
            </p>
          </div>
          <Button variant="secondary" className="mt-4 md:mt-0" asChild>
            <Link href="/contact">Book Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
