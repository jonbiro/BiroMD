import {
  AlertTriangle,
  ArrowRight,
  Droplets,
  Eye,
  RotateCcw,
  ScanFace,
  ShieldCheck,
  Stethoscope,
} from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { patientConcerns } from "@/lib/concerns"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Eye and Eyelid Symptoms",
  description:
    `Find patient-friendly guidance for droopy eyelids, under-eye bags, tearing, eyelid malposition, lesions, cancer reconstruction, and thyroid eye concerns in ${siteConfig.serviceAreaLabel}.`,
  path: "/concerns",
})

const concernIcons = {
  "droopy-heavy-upper-eyelids": Eye,
  "under-eye-bags": ScanFace,
  "constant-watery-eyes": Droplets,
  "eyelid-turning-in-or-out": RotateCcw,
  "eyelid-lesion-mohs-reconstruction": ShieldCheck,
  "bulging-eyes-thyroid-eye-disease": Stethoscope,
  "sudden-eyelid-drooping": AlertTriangle,
} as const

export default function ConcernsPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Symptoms and Concerns"
        title="Understand Your Eye and Eyelid Concerns"
        description="Learn what may contribute to common eyelid, tear-system, and orbital symptoms, what an evaluation may involve, and when to seek urgent care."
        actions={
          <Button asChild>
            <a href="/contact">
              Request a Consultation
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        }
      />

      <section className="site-container space-y-10 px-4 md:px-6" aria-labelledby="concern-guides">
        {patientConcerns.filter((concern) => concern.urgentPage).map((concern) => (
          <a
            key={concern.slug}
            href={`/concerns/${concern.slug}`}
            className="group flex flex-col gap-5 rounded-2xl border border-amber-300/70 bg-amber-50 p-6 text-amber-950 sm:flex-row sm:items-start md:p-8 dark:border-amber-500/45 dark:bg-amber-950/45 dark:text-amber-100"
          >
            <span className="inline-flex w-fit shrink-0 rounded-full border border-current/20 p-3" aria-hidden="true">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <span className="block text-xs font-semibold uppercase tracking-[0.16em]">When to seek urgent care</span>
              <h2 className="mt-2 text-3xl font-semibold leading-tight text-inherit">{concern.shortTitle}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed">{concern.summary}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold sm:self-center">
              Read urgent guidance
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </a>
        ))}

        <div className="grid gap-6 border-t border-border pt-8 lg:grid-cols-[0.8fr_2fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Patient guides
            </p>
            <h2 id="concern-guides" className="mt-3 text-4xl font-semibold leading-tight text-primary">
              Explore Common Concerns
            </h2>
            <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground">
              These guides offer general information about common symptoms and
              treatment pathways. They are not a diagnosis; an in-person examination
              is needed to understand what may be causing your concerns.
            </p>
            <div className="mt-6 hidden h-px w-16 bg-secondary/40 lg:block" aria-hidden="true" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {patientConcerns.filter((concern) => !concern.urgentPage).map((concern) => {
              const ConcernIcon = concernIcons[concern.slug as keyof typeof concernIcons]
              return (
                <a
                  key={concern.slug}
                  href={`/concerns/${concern.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow] hover:border-secondary hover:shadow-md focus-visible:border-secondary"
                >
                  <span className="inline-flex w-fit rounded-full bg-secondary/10 p-3 text-secondary" aria-hidden="true">
                    <ConcernIcon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[1.7rem] font-semibold leading-tight text-primary">
                    {concern.shortTitle}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {concern.summary}
                  </p>
                  <span className="mt-6 flex items-center justify-between gap-3 border-t border-border/70 pt-4 text-xs font-semibold tracking-wide text-secondary">
                    Read the guide
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="site-container px-4 md:px-6" aria-label="Treatment options">
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-accent/60 p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <div>
            <h2 className="text-3xl font-semibold text-primary">Looking for a specific treatment?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Browse the procedure directory to learn about evaluation and treatment options.</p>
          </div>
          <Button asChild variant="outline" className="w-fit shrink-0">
            <a href="/procedures">
              Explore Procedures
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
