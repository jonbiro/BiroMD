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
import { pageMetadata } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata = pageMetadata({
  title: "Eye and Eyelid Symptoms",
  description:
    "Find patient-friendly guidance for droopy eyelids, under-eye bags, tearing, eyelid malposition, lesions, Mohs reconstruction, and thyroid eye concerns in Los Angeles.",
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
        title="Start With What You Notice"
        description="A symptom can have more than one cause. Use these guides to understand what an oculoplastic evaluation may consider, which procedure pathways may be relevant, and when routine scheduling is not appropriate."
        actions={
          <Button asChild>
            <a href="/contact">
              Request Consultation
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        }
      />

      <section className="site-container px-4 md:px-6" aria-labelledby="concern-guides">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Patient guides
            </p>
            <h2 id="concern-guides" className="mt-2 text-4xl font-semibold text-primary">
              Choose the Closest Starting Point
            </h2>
            <p className="mt-3 text-muted-foreground">
              These pages provide general education, not a diagnosis. An
              examination determines whether an eyelid, eye-surface, tear-system,
              orbital, or other medical issue is contributing.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {patientConcerns.map((concern) => {
              const ConcernIcon = concernIcons[concern.slug as keyof typeof concernIcons]
              return (
                <a
                  key={concern.slug}
                  href={`/concerns/${concern.slug}`}
                  className={cn(
                    "group flex min-h-52 flex-col rounded-2xl border p-5 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md",
                    concern.urgentPage
                      ? "border-amber-300/70 bg-amber-50 text-amber-950 dark:border-amber-500/45 dark:bg-amber-950/45 dark:text-amber-100"
                      : "border-border bg-background"
                  )}
                >
                  <ConcernIcon
                    className={cn(
                      "h-5 w-5",
                      concern.urgentPage ? "text-current" : "text-secondary"
                    )}
                    aria-hidden="true"
                  />
                  <h3
                    className={cn(
                      "mt-4 text-2xl font-semibold leading-tight",
                      concern.urgentPage ? "text-current" : "text-primary"
                    )}
                  >
                    {concern.shortTitle}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 flex-1 text-sm",
                      concern.urgentPage ? "text-current/85" : "text-muted-foreground"
                    )}
                  >
                    {concern.summary}
                  </p>
                  <span
                    className={cn(
                      "mt-5 inline-flex items-center text-sm font-semibold",
                      concern.urgentPage ? "text-current" : "text-secondary"
                    )}
                  >
                    {concern.urgentPage ? "Read urgent guidance" : "What to know"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
