import { Dot, Globe2, GraduationCap, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

const highlights = [
  {
    title: "Fellowship Training",
    description:
      "Two-year fellowship in ocular plastic and orbital surgery at Wills Eye Hospital.",
    icon: GraduationCap,
  },
  {
    title: "Multilingual Visits",
    description: `Consultations available in ${siteConfig.languages.join(", ")}.`,
    icon: Globe2,
  },
  {
    title: "Individual Planning",
    description:
      "Recommendations account for symptoms, eye function, anatomy, and realistic treatment goals.",
    icon: HeartHandshake,
  },
]

export function AboutSummary() {
  return (
    <section className="relative py-11 md:py-14">
      <div className="container px-4 md:px-6">
        <div className="panel relative overflow-hidden rounded-[2rem] p-8 md:p-12">
          <div className="pointer-events-none absolute left-0 top-0 h-40 w-44 rounded-full bg-secondary/8" />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div className="space-y-5">
              <p className="eyebrow">
                <Dot className="h-3.5 w-3.5" />
                About Dr. Biro
              </p>
              <h2 className="text-4xl font-semibold text-primary sm:text-5xl">
                Training, Judgment, and Clear Planning
              </h2>
              <p className="text-lg text-muted-foreground">
                {siteConfig.shortName} combines ophthalmic training with a focused
                understanding of the eyelids, orbit, tear system, and surrounding face.
              </p>
              <Button variant="outline" size="lg" asChild>
                <a href="/about">View Biography and Training</a>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <article key={highlight.title} className="rounded-2xl border border-border bg-background p-5">
                  <div className="mb-4 inline-flex rounded-xl border border-secondary/30 bg-secondary/8 p-2 text-secondary">
                    <highlight.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-medium text-primary">{highlight.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{highlight.description}</p>
                </article>
              ))}

              <article className="rounded-2xl border border-border bg-accent/55 p-5 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Clinical Focus
                </p>
                <p className="mt-2 text-base text-foreground/90">
                  Eyelid surgery and reconstruction, ptosis repair, orbital and
                  tear-duct care, and selected non-surgical treatments.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
