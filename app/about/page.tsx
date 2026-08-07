import { ArrowRight, CheckCircle2, Languages, MapPin, Ribbon, ShieldPlus } from "lucide-react"
import { ResponsivePortrait } from "@/components/responsive-portrait"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "About Dr. Biro",
  description:
    "Learn about Dr. Nicolas Biro's training, philosophy, and subspecialty focus in oculoplastic surgery.",
  path: "/about",
})

const milestones = [
  { year: "2005", title: "M.D., University of South Florida College of Medicine" },
  { year: "2006", title: "Internship, New York University Medical Center" },
  { year: "2009", title: "Ophthalmology Residency, University of South Florida" },
  { year: "2011", title: "Oculoplastic Fellowship, Wills Eye Hospital" },
]

export default function AboutPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Meet the Surgeon"
        title="Ophthalmic Training. Oculoplastic Focus."
        description={`${siteConfig.shortName} is a board-certified ophthalmologist with advanced fellowship training in ocular plastic and orbital surgery. His approach considers both eye function and the surrounding facial anatomy.`}
        actions={
          <Button asChild>
            <a href="/contact">
              Request Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        }
      />

      <section className="container px-4 md:px-6">
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="space-y-6">
            <div className="panel rounded-[1.7rem] p-6 md:p-8">
              <h2 className="font-sans text-sm font-semibold text-foreground">
                Clinical priorities
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ShieldPlus className="mt-0.5 h-4 w-4 text-secondary" />
                  Restore eyelid function and protect the ocular surface.
                </li>
                <li className="flex items-start gap-2">
                  <Ribbon className="mt-0.5 h-4 w-4 text-secondary" />
                  Plan cosmetic care around natural anatomy and realistic goals.
                </li>
                <li className="flex items-start gap-2">
                  <Languages className="mt-0.5 h-4 w-4 text-secondary" />
                  Discuss care in {siteConfig.languages.join(", ")}.
                </li>
              </ul>
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

          <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_22px_54px_rgb(5_16_32_/0.18)]">
            <div className="relative aspect-[4/5]">
              <ResponsivePortrait sizes="(max-width: 1024px) 92vw, 560px" />
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="rounded-[1.8rem] border border-primary/20 bg-primary p-8 text-primary-foreground shadow-lg md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/75">
            Training and Clinical Focus
          </p>
          <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2 md:text-base">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Two-year oculoplastic, orbital, and neuro-ophthalmology fellowship, Wills Eye Hospital
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Board-certified ophthalmologist
            </li>
            <li className="flex items-center gap-2 sm:col-span-2">
              <CheckCircle2 className="h-4 w-4" />
              Ophthalmology residency, University of South Florida
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
