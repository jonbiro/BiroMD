import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Languages,
  MapPin,
  Ribbon,
  ShieldPlus,
} from "lucide-react"
import { ResponsivePortrait } from "@/components/responsive-portrait"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { formatList, pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Wills Eye-Trained Oculoplastic Surgeon",
  description:
    "Meet Dr. Nicolas Biro, a board-certified ophthalmologist with Wills Eye fellowship training in oculoplastic and orbital surgery serving greater Los Angeles.",
  path: "/about",
})

const milestones = [
  { year: "2005", title: "M.D., University of South Florida" },
  { year: "2006", title: "Internship, NYU Medical Center" },
  { year: "2012", title: "Ophthalmology residency, University of South Florida" },
  { year: "2014", title: "Oculoplastic fellowship, Wills Eye Hospital" },
]

export default function AboutPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Meet the Surgeon"
        title="Ophthalmology Training. Oculoplastic Care."
        description={`${siteConfig.shortName} is a board-certified ophthalmologist with advanced fellowship training in oculoplastic and orbital surgery. His approach considers both eye function and the surrounding facial anatomy.`}
        media={
          <figure className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_22px_54px_rgb(5_16_32_/0.18)]">
            <div className="relative aspect-[4/5]">
              <ResponsivePortrait
                portrait="about"
                sizes="(max-width: 1024px) 92vw, 560px"
              />
            </div>
            <figcaption className="border-t border-border bg-card px-5 py-4 text-sm text-muted-foreground md:px-6">
              <span className="block font-semibold text-foreground">Dr. Nicolas Biro</span>
              <span className="mt-1 block">Board-certified ophthalmologist with fellowship training in oculoplastic and orbital surgery.</span>
            </figcaption>
          </figure>
        }
        actions={
          <Button asChild>
            <a href="/contact">
              Request a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        }
      />

      <section className="site-container px-4 md:px-6" aria-labelledby="clinical-background">
        <div className="panel grid gap-5 rounded-[1.8rem] p-6 md:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Clinical background
            </p>
            <h2 id="clinical-background" className="mt-2 text-4xl font-semibold text-primary">
              Ophthalmology First. Oculoplastic Specialization.
            </h2>
          </div>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Dr. Biro earned his medical degree and completed ophthalmology residency
              at the University of South Florida, after an internship at NYU Medical
              Center. He then completed oculoplastic fellowship training at Wills Eye
              Hospital.
            </p>
            <p>
              His practice includes cosmetic and reconstructive eyelid care, tear-drainage
              concerns, and orbital conditions. He sees patients through four ophthalmology
              practices across the greater Los Angeles area and discusses care in{" "}
              {formatList(siteConfig.languages)}.
            </p>
          </div>
        </div>
      </section>

      <section
        className="site-container px-4 md:px-6"
        aria-label="Dr. Biro's clinical priorities and training"
      >
        <div className="grid items-start gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-6">
          <div className="panel rounded-[1.7rem] p-5 md:p-7">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Clinical priorities
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-3 rounded-xl bg-accent/45 p-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-secondary/25 bg-card text-secondary">
                  <ShieldPlus className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-1">Restore eyelid function and protect the eye&apos;s surface.</span>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-accent/45 p-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-secondary/25 bg-card text-secondary">
                  <Ribbon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-1">Plan cosmetic care around natural anatomy and realistic goals.</span>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-accent/45 p-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-secondary/25 bg-card text-secondary">
                  <Languages className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-1">Discuss care in {formatList(siteConfig.languages)}.</span>
              </li>
            </ul>
          </div>

          <div className="panel rounded-[1.7rem] p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              Completion dates
            </p>
            <h2 className="mt-2 text-3xl font-medium text-primary">Training Timeline</h2>
            <ol className="relative mt-5 space-y-5 border-l border-secondary/30 pl-5">
              {milestones.map((milestone) => (
                <li
                  key={milestone.year}
                  className="relative grid grid-cols-[3.5rem_1fr] gap-3 text-sm"
                >
                  <span
                    className="absolute -left-[1.82rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-secondary ring-1 ring-secondary/30"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-secondary">
                    {milestone.year}
                  </span>
                  <span className="leading-relaxed text-muted-foreground">{milestone.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="site-container px-4 md:px-6" aria-labelledby="practice-affiliations">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Practice information
            </p>
            <h2
              id="practice-affiliations"
              className="mt-2 text-4xl font-semibold text-primary"
            >
              Where Dr. Biro Sees Patients
            </h2>
            <p className="mt-3 text-muted-foreground">
              Dr. Biro sees patients through four ophthalmology practices. Use the
              official practice pages to verify current location and appointment information.
            </p>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {siteConfig.offices.map((office) => (
              <a
                key={office.id}
                href={office.practiceUrl}
                className="group flex min-h-28 items-center gap-4 rounded-2xl border border-border bg-accent/45 p-4 transition-colors hover:border-secondary hover:bg-card"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-secondary/30 bg-card text-secondary">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-foreground">{office.practiceName}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{office.name}</span>
                  <span className="mt-2 inline-flex items-center text-xs font-semibold text-secondary">
                    Official practice page
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container px-4 md:px-6">
        <div className="rounded-[1.8rem] border border-primary/20 bg-primary p-8 text-primary-foreground shadow-lg md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/75">
            What This Training Means for Patients
          </p>
          <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2 md:text-base">
            <li className="flex items-start gap-2 rounded-xl bg-primary-foreground/8 p-3">
              <CheckCircle2 className="h-4 w-4" />
              Fellowship training in oculoplastic, orbital, and neuro-ophthalmic surgery
            </li>
            <li className="flex items-start gap-2 rounded-xl bg-primary-foreground/8 p-3">
              <CheckCircle2 className="h-4 w-4" />
              Board-certified ophthalmologist
            </li>
            <li className="flex items-start gap-2 rounded-xl bg-primary-foreground/8 p-3 sm:col-span-2">
              <CheckCircle2 className="h-4 w-4" />
              Care planned around function, natural expression, and realistic goals
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="/procedures">
                Explore Procedures
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/locations">
                <MapPin className="mr-2 h-4 w-4" />
                Choose an Office
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
