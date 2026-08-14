import { ArrowRight, ArrowUpRight, Dot, MessageSquareQuote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { patientFeedbackProfiles } from "@/lib/site"

export function AboutSummary() {
  return (
    <section className="relative pb-7 pt-2 md:pb-9 md:pt-3" aria-labelledby="about-summary-title">
      <div className="site-container px-4 md:px-6">
        <div className="panel-strong relative overflow-hidden rounded-[2rem] p-5 min-[480px]:p-7 md:p-8 lg:p-9">
          <div className="pointer-events-none absolute left-0 top-0 h-40 w-44 rounded-full bg-secondary/8" />

          <div className="relative grid gap-5 md:grid-cols-[0.82fr_1.18fr] md:items-start md:gap-7 lg:gap-10">
            <div className="space-y-4">
              <p className="eyebrow">
                <Dot className="h-3.5 w-3.5" />
                Meet Dr. Biro
              </p>
              <h2
                id="about-summary-title"
                className="text-[2.25rem] font-semibold leading-none text-primary sm:text-5xl"
              >
                Ophthalmic Training. Oculoplastic Focus.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground min-[480px]:text-base">
                Care is planned around eye function, facial anatomy, natural expression,
                and each patient&apos;s goals.
              </p>
              <Button variant="outline" asChild>
                <a href="/about">
                  Meet Dr. Biro
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4 min-[480px]:p-5">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                Independent Patient Feedback
              </h3>
              <div className="mt-3 grid gap-2 min-[420px]:grid-cols-3">
                {patientFeedbackProfiles.map((profile) => (
                  <a
                    key={profile.url}
                    href={profile.url}
                    rel="external"
                    className="group flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-secondary hover:bg-accent"
                  >
                    <MessageSquareQuote
                      className="h-4 w-4 shrink-0 text-secondary"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">{profile.name}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 shrink-0 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Profiles are managed by each publisher; BiroMD does not republish reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
