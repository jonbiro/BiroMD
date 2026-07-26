import { PageIntro } from "@/components/page-intro"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Website Privacy",
  description:
    "Learn how the BiroMD website handles contact information, email, and clinical images.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <div className="space-y-10 pb-20 pt-10 md:pb-24 md:pt-12">
      <PageIntro
        eyebrow="Website Privacy"
        title="Privacy and Communication"
        description="Important information about using this public website and contacting the practice electronically."
      />

      <section className="container px-4 md:px-6">
        <div className="panel mx-auto max-w-4xl space-y-8 rounded-[1.8rem] p-6 md:p-9">
          <div>
            <h2 className="text-3xl font-semibold">Website contact</h2>
            <p className="mt-2 text-muted-foreground">
              This website does not receive or store the information entered in
              the scheduling-email form. The form opens your device&apos;s email
              application and prepares a message to {siteConfig.email}.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Do not send sensitive information</h2>
            <p className="mt-2 text-muted-foreground">
              Ordinary email may not be secure. Do not email medical records,
              photographs, diagnoses, insurance information, payment details, or
              other sensitive information unless the practice has given you an
              approved secure method.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Clinical images</h2>
            <p className="mt-2 text-muted-foreground">
              Clinical case images are published only after the practice confirms
              written authorization for public use. Individual treatment results
              vary.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Medical care and emergencies</h2>
            <p className="mt-2 text-muted-foreground">
              Website content and email do not create a physician-patient
              relationship and are not a substitute for medical evaluation. Do
              not use website email for emergencies or urgent symptoms.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Questions</h2>
            <p className="mt-2 text-muted-foreground">
              Contact the practice by phone for its formal Notice of Privacy
              Practices or for an approved way to send sensitive information.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
