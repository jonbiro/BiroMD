import Link from "next/link"
import { Globe2, GraduationCap, HeartHandshake } from "lucide-react"
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
        <div className="rounded-[2rem] border border-border/70 bg-card/75 p-8 shadow-xl shadow-primary/10 backdrop-blur md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                About Dr. Biro
              </p>
              <h2 className="text-4xl font-semibold text-primary sm:text-5xl">
                Surgical Insight with Artistic Judgment
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
                <article
                  key={highlight.title}
                  className="rounded-2xl border border-border/70 bg-background/80 p-5 shadow-sm"
                >
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
