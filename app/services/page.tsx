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

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Explore cosmetic, reconstructive, and non-surgical oculoplastic services tailored to functional and aesthetic goals.",
  path: "/services",
})

const services = [
  {
    title: "Cosmetic Eyelid Surgery",
    description:
      "Refined periocular rejuvenation based on detailed facial analysis and conservative surgical planning.",
    icon: Sparkles,
    features: [
      "Upper blepharoplasty",
      "Lower blepharoplasty",
      "Brow and midface integration",
      "Natural-result planning",
    ],
  },
  {
    title: "Reconstructive Surgery",
    description:
      "Comprehensive correction of eyelid and orbital conditions with strong attention to structure and symmetry.",
    icon: ShieldCheck,
    features: [
      "Ptosis repair",
      "Ectropion and entropion repair",
      "Skin cancer reconstruction",
      "Orbital trauma support",
    ],
  },
  {
    title: "Non-Surgical Treatments",
    description:
      "Targeted injectables and maintenance treatments for patients prioritizing subtle and staged improvement.",
    icon: Syringe,
    features: [
      "BOTOX cosmetic",
      "Dermal fillers",
      "Medical-grade skin support",
      "Ongoing treatment calibration",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="space-y-10 pb-20 pt-10 md:space-y-12 md:pb-24 md:pt-12">
      <PageIntro
        eyebrow="Services"
        title="Full-Spectrum Oculoplastic Care"
        description="Surgical and non-surgical treatment options built around precise diagnosis, transparent planning, and individualized outcomes."
      />

      <section className="container px-4 md:px-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="panel rounded-2xl p-6">
              <div className="mb-5 inline-flex rounded-xl border border-secondary/35 bg-secondary/10 p-2 text-secondary">
                <service.icon className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-medium text-primary">{service.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground/90"
                  >
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="panel rounded-[1.8rem] p-7 md:p-9">
          <h2 className="text-4xl font-semibold text-primary">Consultation Process</h2>
          <ol className="mt-5 grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
            <li className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                1. Assessment
              </p>
              <p className="mt-2">
                Medical history, anatomy review, and functional concerns are
                evaluated in depth.
              </p>
            </li>
            <li className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                2. Plan
              </p>
              <p className="mt-2">
                A tailored treatment strategy is discussed with expected outcomes
                and recovery guidance.
              </p>
            </li>
            <li className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                3. Follow-Through
              </p>
              <p className="mt-2">
                Detailed follow-up ensures healing progression and long-term
                stability.
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
          <Button variant="cta" className="mt-5 md:mt-0" asChild>
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
