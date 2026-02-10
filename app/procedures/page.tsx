import Link from "next/link"
import { ArrowRight, Check, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Procedures",
  description:
    "Review the procedures and specialties offered, from blepharoplasty and ptosis repair to injectables and orbital care.",
  path: "/procedures",
})

const categories = [
  {
    title: "Cosmetic and Reconstructive Surgery",
    subtitle: "Advanced operative care for eyelid and orbital concerns",
    items: [
      "Upper and lower eyelid lifts (blepharoplasty)",
      "Ptosis repair (droopy eyelids)",
      "Entropion and ectropion repair",
      "Eyelid cancer excision and reconstruction",
      "Mohs reconstruction",
      "Tearing and blocked tear ducts",
      "Thyroid eye disease (Graves disease)",
      "Orbital tumors and related management",
    ],
  },
  {
    title: "Non-Surgical Treatments",
    subtitle: "Conservative interventions for refined enhancement",
    items: [
      "BOTOX injections",
      "Facial fillers",
      "Minimally invasive periocular rejuvenation",
    ],
  },
]

export default function ProceduresPage() {
  return (
    <div className="pb-20 pt-12 md:pb-24 md:pt-16">
      <section className="container px-4 md:px-6">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Procedures
          </p>
          <h1 className="text-5xl font-semibold text-primary sm:text-6xl">
            Procedure Library and Specialties
          </h1>
          <p className="text-lg text-muted-foreground">
            Treatment options range from reconstructive solutions for medical
            needs to cosmetic procedures designed for subtle, natural refinement.
          </p>
        </div>
      </section>

      <section className="container mt-10 space-y-8 px-4 md:mt-12 md:px-6">
        {categories.map((category) => (
          <article
            key={category.title}
            className="rounded-3xl border border-border/70 bg-card/85 p-7 shadow-sm"
          >
            <h2 className="text-3xl font-medium text-primary">{category.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{category.subtitle}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/75 px-4 py-3 text-sm text-foreground/90"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="container mt-10 px-4 md:mt-12 md:px-6">
        <div className="rounded-[1.8rem] border border-border/70 bg-primary p-8 text-primary-foreground shadow-lg md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">
              <Stethoscope className="h-4 w-4" />
              Procedure Match Consultation
            </p>
            <p className="mt-3 text-lg text-primary-foreground/85">
              Bring your concerns, goals, and timeline to consultation for a clear
              recommendation and recovery roadmap.
            </p>
          </div>
          <Button className="mt-5 md:mt-0" variant="secondary" asChild>
            <Link href="/contact">
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
