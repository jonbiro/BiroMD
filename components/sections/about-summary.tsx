import Link from "next/link"
import { Dot, Globe2, GraduationCap, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

const highlights = [
  {
    title: "Elite Training",
    description:
      "Two-year fellowship in ocular plastic and orbital surgery at Wills Eye Hospital.",
    icon: GraduationCap,
  },
  {
    title: "Multilingual Care",
    description: `Consultations available in ${siteConfig.languages.join(", ")} to improve clarity and comfort.`,
    icon: Globe2,
  },
  {
    title: "Patient-Centered Plans",
    description:
      "Every recommendation balances functional correction with refined cosmetic harmony.",
    icon: HeartHandshake,
  },
]

export function AboutSummary() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="panel relative overflow-hidden rounded-[2rem] p-8 md:p-12">
          <div className="pointer-events-none absolute left-0 top-0 h-40 w-44 rounded-full bg-secondary/16 blur-[70px]" />

          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="space-y-5">
              <p className="eyebrow">
                <Dot className="h-3.5 w-3.5" />
                About Dr. Biro
              </p>
              <h2 className="text-4xl font-semibold text-primary sm:text-5xl">
                Surgical Insight with
                <span className="headline-gradient block">Artistic Judgment</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                {siteConfig.shortName} combines ophthalmic precision with a nuanced
                understanding of facial balance, creating treatment plans that are
                clinically sound and aesthetically intentional.
              </p>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">View Full Biography</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <article key={highlight.title} className="panel rounded-2xl p-5">
                  <div className="mb-4 inline-flex rounded-xl border border-secondary/30 bg-secondary/10 p-2 text-secondary">
                    <highlight.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-medium text-primary">{highlight.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {highlight.description}
                  </p>
                </article>
              ))}

              <article className="rounded-2xl border border-primary/20 bg-primary p-5 text-primary-foreground shadow-sm sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                  Clinical Focus
                </p>
                <p className="mt-2 text-lg">
                  Oculoplastic surgery, eyelid reconstruction, ptosis repair,
                  orbital care, and non-surgical facial rejuvenation.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
