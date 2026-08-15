import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileLock2,
  Phone,
  Stethoscope,
} from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { PrintButton } from "@/components/print-button"
import { Button } from "@/components/ui/button"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "For Referring Clinicians",
  description:
    "Referral planning information for clinicians seeking oculoplastic evaluation with Dr. Nicolas Biro in the Greater Los Angeles area.",
  path: "/referrals",
})

const referralConcerns = [
  "Ptosis, eyelid malposition, exposure, or impaired eyelid closure",
  "Periocular lesion evaluation or reconstruction after Mohs surgery",
  "Persistent tearing or suspected lacrimal drainage disease",
  "Thyroid eye disease, orbital mass, trauma, or globe-position change",
  "Functional or cosmetic upper- and lower-eyelid consultation",
  "Complications or anatomic concerns after prior periocular treatment",
]

const usefulContext = [
  "The clinical question, symptom onset, progression, and relevant examination findings",
  "Prior eyelid, orbital, tear-system, skin-cancer, or facial procedures",
  "Relevant pathology reports, imaging reports, and access to actual image files",
  "Current medications, allergies, and medical conditions relevant to evaluation",
]

export default function ReferralsPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="For Clinicians"
        title="Plan an Oculoplastic Referral"
        description="Choose the office that will receive the referral, confirm that location's current process, and obtain its approved secure method before transmitting records or images."
        actions={
          <>
            <Button asChild>
              <a href="#referral-offices">
                Contact an Office
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <PrintButton label="Print Referral Guide" />
          </>
        }
      />

      <section className="site-container grid gap-6 px-4 lg:grid-cols-2 md:px-6">
        <article className="panel rounded-[1.8rem] p-6 md:p-8">
          <Stethoscope className="h-6 w-6 text-secondary" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-semibold text-primary">
            Common Referral Concerns
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            This list is not exhaustive. Call the intended office if the most
            appropriate destination or urgency is uncertain.
          </p>
          <ul className="mt-5 space-y-3">
            {referralConcerns.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel rounded-[1.8rem] p-6 md:p-8">
          <FileLock2 className="h-6 w-6 text-secondary" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-semibold text-primary">
            Information to Include with a Referral
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Ask the receiving office what it needs and how it wants the
            information transferred before sending protected health information.
          </p>
          <ul className="mt-5 space-y-3">
            {usefulContext.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="site-container px-4 md:px-6">
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-5 text-amber-950 dark:border-amber-500/45 dark:bg-amber-950/45 dark:text-amber-100 md:p-6">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <h2 className="font-sans text-base font-semibold text-current">
              Urgent and emergency conditions need direct clinical escalation
            </h2>
            <p className="mt-1 text-sm">
              Do not rely on website email or a routine appointment request for
              acute vision loss, severe eye pain, major trauma, pupil change,
              suspected orbital compartment syndrome, or another emergency.
              Follow the appropriate emergency or clinician-to-clinician pathway.
            </p>
          </div>
        </div>
      </section>

      <section id="referral-offices" className="site-container px-4 md:px-6" aria-labelledby="referral-office-title">
        <div className="panel-strong rounded-[1.8rem] p-6 md:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Confirm before sending
            </p>
            <h2 id="referral-office-title" className="mt-2 text-4xl font-semibold text-primary">
              Contact the Receiving Office
            </h2>
            <p className="mt-3 text-muted-foreground">
              Current referral requirements and secure transmission methods are
              controlled by each practice and may change. BiroMD email is not a
              referral portal and should not receive patient records.
            </p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {siteConfig.offices.map((office) => (
              <article key={office.id} className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                  {office.practiceName}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-primary">{office.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{office.address}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button size="sm" asChild>
                    <a href={`tel:${office.phoneHref}`}>
                      <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                      {office.phoneDisplay}
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={office.practiceUrl} rel="external">
                      Practice page
                      <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
