import {
  AlertTriangle,
  ArrowRight,
  Check,
  ClipboardCheck,
  FileHeart,
  Languages,
  LockKeyhole,
  MessageCircleQuestion,
} from "lucide-react"
import { ConsultationCta } from "@/components/consultation-cta"
import { PageIntro } from "@/components/page-intro"
import { PageJumpLinks } from "@/components/page-jump-links"
import { PrintButton } from "@/components/print-button"
import { Button } from "@/components/ui/button"
import { appointmentQuestions } from "@/lib/appointment"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "New Patient Guide",
  description:
    "Prepare for an oculoplastic consultation with Dr. Nicolas Biro, including scheduling, records, insurance questions, accessibility, and what to expect.",
  path: "/patient-guide",
})

const requestSteps = [
  {
    number: "01",
    title: "Choose an office",
    description:
      "Start with the office that is most convenient for you.",
  },
  {
    number: "02",
    title: "Send a request",
    description:
      "Use the office's official request service or call directly.",
  },
  {
    number: "03",
    title: "Wait for confirmation",
    description:
      "An online request is not a confirmed appointment. The office will contact you with availability and next steps.",
  },
]

const preparationItems = [
  "A short timeline of symptoms or changes",
  "A current medication and allergy list",
  "Relevant eye records or prior procedure details, if requested",
  "Questions about goals, recovery, risks, cost, or coverage",
]

const consultationItems = [
  "Relevant medical, eye, and procedure history",
  "A focused examination of the relevant anatomy",
  "Discussion of options, alternatives, limitations, and risks",
  "Next steps for testing, records, treatment, or follow-up, if needed",
]

export default function PatientGuidePage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Your Visit"
        title="Plan Your Consultation"
        description="Know how appointment requests work, what may be useful to prepare, and which details to confirm directly with your chosen office."
        actions={
          <>
            <Button asChild>
              <a href="#choose-office">
                Choose an Office
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <PrintButton />
          </>
        }
      />

      <PageJumpLinks
        items={[
          { href: "#appointment-process", label: "Request Process" },
          { href: "#prepare", label: "Prepare" },
          { href: "#consultation", label: "Consultation" },
          { href: "#before-visit", label: "Before Your Visit" },
          { href: "#choose-office", label: "Choose an Office" },
        ]}
      />

      <section
        id="appointment-process"
        className="site-container px-4 md:px-6"
        aria-labelledby="request-process"
      >
        <div className="panel overflow-hidden rounded-[1.8rem] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Appointment process
          </p>
          <h2 id="request-process" className="mt-2 text-4xl font-semibold text-primary">
            From Request to Confirmation
          </h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {requestSteps.map((step) => (
              <li key={step.number} className="rounded-2xl border border-border bg-accent/45 p-5">
                <span className="font-serif text-3xl font-semibold text-secondary">
                  {step.number}
                </span>
                <h3 className="mt-3 text-2xl font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-container grid gap-6 px-4 lg:grid-cols-2 md:px-6">
        <article id="prepare" className="panel rounded-[1.8rem] p-6 md:p-8">
          <FileHeart className="h-6 w-6 text-secondary" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-semibold text-primary">
            What to Bring to Your Consultation
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Requirements vary by office and concern. Ask the scheduling team what
            they want you to bring or send securely.
          </p>
          <ul className="mt-5 space-y-3">
            {preparationItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article id="consultation" className="panel rounded-[1.8rem] p-6 md:p-8">
          <ClipboardCheck className="h-6 w-6 text-secondary" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-semibold text-primary">
            What Consultation May Include
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The visit is tailored to the concern rather than following one fixed
            treatment path.
          </p>
          <ul className="mt-5 space-y-3">
            {consultationItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section
        id="before-visit"
        className="site-container px-4 md:px-6"
        aria-labelledby="questions-before-visit"
      >
        <div className="panel-strong rounded-[1.8rem] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <MessageCircleQuestion className="h-6 w-6 text-secondary" aria-hidden="true" />
              <h2 id="questions-before-visit" className="mt-4 text-3xl font-semibold text-primary">
                Confirm Before You Go
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Current office policies can change. The scheduling team is the
                source of truth for visit-specific details.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {appointmentQuestions.map((question) => (
                <div
                  key={question.title}
                  className="rounded-2xl border border-border bg-background p-4"
                >
                  <h3 className="font-sans text-sm font-semibold text-foreground">
                    {question.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {question.detail}
                  </p>
                </div>
              ))}
              <div className="rounded-2xl border border-border bg-background p-4">
                <h3 className="flex items-center gap-2 font-sans text-sm font-semibold text-foreground">
                  <Languages className="h-4 w-4 text-secondary" aria-hidden="true" />
                  Language and accessibility
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Consultations are available in {siteConfig.languages.join(", ")}.
                  Call ahead for accessibility or communication support.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-4">
                <h3 className="flex items-center gap-2 font-sans text-sm font-semibold text-foreground">
                  <LockKeyhole className="h-4 w-4 text-secondary" aria-hidden="true" />
                  Private information
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Do not send medical details, records, images, insurance, or
                  payment information through ordinary website email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container px-4 md:px-6">
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-5 text-sm text-amber-950 dark:border-amber-500/45 dark:bg-amber-950/45 dark:text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <h2 className="font-sans text-base font-semibold text-current">
              Routine appointment requests are not emergency care
            </h2>
            <p className="mt-1">
              For sudden vision loss, severe eye pain, major eye trauma, or another
              medical emergency, seek urgent medical care rather than waiting for a web request.
            </p>
          </div>
        </div>
      </section>

      <div id="choose-office">
        <ConsultationCta
          title="Choose an Office to Request a Consultation"
          description="Select the more convenient location, then use its official request service or call directly. The office confirms availability."
        />
      </div>
    </div>
  )
}
