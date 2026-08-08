import { ArrowUpRight, MessageSquareQuote, ShieldCheck } from "lucide-react"
import { patientFeedbackProfiles } from "@/lib/site"

export function ReputationLinks() {
  return (
    <section className="relative border-t border-border py-11 md:py-14" aria-labelledby="patient-feedback-title">
      <div className="container px-4 md:px-6">
        <div className="panel-strong grid gap-8 rounded-[2rem] p-6 md:p-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-10 lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Independent sources
            </p>
            <h2 id="patient-feedback-title" className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">
              Patient Feedback Beyond This Website
            </h2>
            <p className="mt-4 text-muted-foreground">
              Review independent physician profiles and feedback published by an
              affiliated practice. Each destination controls its own content,
              review policies, ratings, and updates.
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              BiroMD does not collect, select, edit, or republish these reviews.
            </p>
          </div>

          <div className="grid gap-3">
            {patientFeedbackProfiles.map((profile) => (
              <a
                key={profile.url}
                href={profile.url}
                rel="external"
                className="group flex min-h-24 items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/8 text-secondary">
                  <MessageSquareQuote className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-foreground">{profile.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {profile.description}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
