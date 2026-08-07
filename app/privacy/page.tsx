import { ArrowRight } from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Website Privacy",
  description:
    "Learn how the BiroMD public website handles contact information, email, and clinical images.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <div className="space-y-10 pb-20 pt-10 md:pb-24 md:pt-12">
      <PageIntro
        eyebrow="Website Privacy"
        title="Privacy and Communication"
        description="Important information about using this public website and contacting an office electronically."
      />

      <section className="container px-4 md:px-6">
        <div className="panel mx-auto max-w-4xl space-y-8 rounded-[1.8rem] p-6 md:p-9">
          <div>
            <h2 className="text-3xl font-semibold">What this site collects</h2>
            <p className="mt-2 text-muted-foreground">
              BiroMD.com does not use analytics, advertising trackers, user
              accounts, or an on-site database. The email fallback form does not
              submit data to this website; it prepares a message in your own email app.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">External scheduling pages</h2>
            <p className="mt-2 text-muted-foreground">
              Appointment-request buttons open the selected office&apos;s website or
              scheduling service. Information entered there is handled under that
              service&apos;s and office practice&apos;s privacy terms, not by BiroMD.com.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Do not email sensitive information</h2>
            <p className="mt-2 text-muted-foreground">
              Ordinary email may not be secure. Do not email medical records,
              photographs, diagnoses, insurance information, payment details, or
              other sensitive information unless an office gives you an approved secure method.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Clinical images</h2>
            <p className="mt-2 text-muted-foreground">
              Clinical cases are included in a public build only after the practice
              confirms written publication authorization. Results vary by patient.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Medical care and emergencies</h2>
            <p className="mt-2 text-muted-foreground">
              Website content and email do not create a physician-patient relationship
              and are not a substitute for medical evaluation. Do not use website
              email for urgent symptoms or emergencies.
            </p>
          </div>

          <div className="rounded-2xl border border-secondary/30 bg-secondary/8 p-5">
            <h2 className="text-2xl font-semibold">Medical privacy notices</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Medical records are handled by the office practice where care is provided.
            </p>
            <a
              href="/notice-of-privacy-practices"
              className="mt-4 inline-flex items-center text-sm font-semibold text-secondary hover:underline"
            >
              View office privacy notices
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Website questions</h2>
            <p className="mt-2 text-muted-foreground">
              For a website privacy question that does not contain medical information,
              email {siteConfig.email}. Call the appropriate office for questions about patient records.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
