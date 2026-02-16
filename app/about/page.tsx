import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Languages, Ribbon, ShieldPlus } from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { pageMetadata, siteConfig, withBasePath } from "@/lib/site"

export const metadata = pageMetadata({
  title: "About Dr. Biro",
  description:
    "Learn about Dr. Nicolas Biro's training, philosophy, and subspecialty focus in oculoplastic surgery.",
  path: "/about",
})

const milestones = [
  {
    year: "2005",
    title: "M.D., University of South Florida College of Medicine",
  },
  {
    year: "2006",
    title: "Internship, New York University Medical Center",
  },
  {
    year: "2009",
    title: "Ophthalmology Residency, University of South Florida",
  },
  {
    year: "2011",
    title: "Oculoplastic Fellowship, Wills Eye Hospital",
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-10 pb-20 pt-10 md:space-y-12 md:pb-24 md:pt-12">
      <PageIntro
        eyebrow="Meet the Surgeon"
        title="Experience Built on Discipline and Detail"
        description={`${siteConfig.shortName} is a board-certified ophthalmologist with advanced fellowship training in ocular plastic and orbital surgery, committed to outcomes that preserve both function and identity.`}
        actions={
          <Button asChild>
            <Link href="/contact">
              Request Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <section className="container px-4 md:px-6">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.12fr] lg:gap-12">
          <div className="panel rounded-[1.7rem] p-6 md:p-8">
            <p className="text-sm font-medium text-foreground">Clinical priorities</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ShieldPlus className="mt-0.5 h-4 w-4 text-secondary" />
                Functional restoration with durable outcomes.
              </li>
              <li className="flex items-start gap-2">
                <Ribbon className="mt-0.5 h-4 w-4 text-secondary" />
                Cosmetic planning that respects natural anatomy.
              </li>
              <li className="flex items-start gap-2">
                <Languages className="mt-0.5 h-4 w-4 text-secondary" />
                Care conversations in {siteConfig.languages.join(", ")}.
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl">
              <div className="relative aspect-[4/5]">
                <Image
                  src={withBasePath("/images/dr-biro-portrait.png")}
                  alt="Dr. Nicolas Biro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            </div>

            <div className="panel rounded-2xl p-5 md:p-6">
              <h2 className="text-3xl font-medium text-primary">Training Timeline</h2>
              <ol className="mt-4 space-y-3">
                {milestones.map((milestone) => (
                  <li key={milestone.year} className="flex gap-4 text-sm">
                    <span className="w-14 shrink-0 font-semibold text-secondary">
                      {milestone.year}
                    </span>
                    <span className="text-muted-foreground">{milestone.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="rounded-[1.8rem] border border-border/70 bg-primary p-8 text-primary-foreground shadow-lg md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/75">
            Professional Affiliations
          </p>
          <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2 md:text-base">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Wills Eye Hospital
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              American Academy of Ophthalmology
            </li>
            <li className="flex items-center gap-2 sm:col-span-2">
              <CheckCircle2 className="h-4 w-4" />
              Patient-centered consultation and follow-up strategy
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
