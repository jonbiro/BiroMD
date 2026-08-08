import {
  BookOpenCheck,
  ExternalLink,
  FileCheck2,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
} from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Content Standards",
  description:
    "How BiroMD prepares, sources, reviews, corrects, and maintains patient-facing website content.",
  path: "/content-standards",
})

const preparationSteps = [
  {
    number: "01",
    title: "Start with the patient decision",
    description:
      "Pages are organized around symptoms, treatment questions, visit preparation, and the next appropriate step rather than search keywords alone.",
  },
  {
    number: "02",
    title: "Use identifiable sources",
    description:
      "Medical pages link to relevant professional organizations, government information, peer-reviewed literature, or other authoritative clinical references.",
  },
  {
    number: "03",
    title: "Keep education separate from diagnosis",
    description:
      "The site describes what evaluation may cover without deciding a visitor's diagnosis, candidacy, treatment, or likely result.",
  },
  {
    number: "04",
    title: "State review status honestly",
    description:
      "A page will identify Dr. Biro as its author or medical reviewer only after he has approved that page and its displayed review date.",
  },
]

const commitments = [
  {
    icon: FileCheck2,
    title: "No hidden medical-review claim",
    description:
      "Procedure and symptom pages currently include citations but do not claim physician review while formal approval is pending.",
  },
  {
    icon: ShieldCheck,
    title: "No guaranteed outcomes",
    description:
      "Treatment pages and gallery cases use candidacy and results-vary language. Consultation is required for individual recommendations.",
  },
  {
    icon: ExternalLink,
    title: "Independent sources stay independent",
    description:
      "Outside review sites and affiliated practices control their own ratings, policies, content, and updates. BiroMD does not republish their reviews.",
  },
  {
    icon: LockKeyhole,
    title: "Privacy before measurement",
    description:
      "The site does not ask visitors to submit medical records or symptoms. Any future measurement must avoid medical information and cross-site advertising profiles.",
  },
]

export default function ContentStandardsPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Website Transparency"
        title="How BiroMD Content Is Prepared"
        description="The standards used to separate useful patient education from diagnosis, disclose medical-review status, handle outside sources, and correct the site responsibly."
        actions={
          <Button variant="outline" asChild>
            <a href={`mailto:${siteConfig.email}?subject=Website%20content%20correction`}>
              Report a Website Correction
            </a>
          </Button>
        }
      />

      <section className="container px-4 md:px-6" aria-labelledby="content-process">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <BookOpenCheck className="h-6 w-6 text-secondary" aria-hidden="true" />
          <h2 id="content-process" className="mt-4 text-4xl font-semibold text-primary">
            A Four-Part Publishing Standard
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {preparationSteps.map((step) => (
              <article key={step.number} className="rounded-2xl border border-border bg-accent/45 p-5">
                <span className="font-serif text-3xl font-semibold text-secondary">
                  {step.number}
                </span>
                <h3 className="mt-2 text-2xl font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-4 px-4 md:grid-cols-2 md:px-6" aria-label="Content commitments">
        {commitments.map(({ icon: Icon, title, description }) => (
          <article key={title} className="panel rounded-[1.6rem] p-6">
            <Icon className="h-6 w-6 text-secondary" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold text-primary">{title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{description}</p>
          </article>
        ))}
      </section>

      <section className="container px-4 md:px-6" aria-labelledby="maintenance-standard">
        <div className="panel-strong grid gap-6 rounded-[1.8rem] p-6 md:p-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <RefreshCw className="h-6 w-6 text-secondary" aria-hidden="true" />
            <h2 id="maintenance-standard" className="mt-4 text-4xl font-semibold text-primary">
              Corrections and Maintenance
            </h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Office facts, scheduling destinations, citations, and outside links
              are checked as the site is maintained. A correction may be made
              promptly when a factual or technical error is verified.
            </p>
            <p>
              Changes involving diagnosis, treatment, candidacy, risks, recovery,
              or urgent-care guidance require clinical approval before they are
              described as physician reviewed.
            </p>
            <p>
              To report a website error, email{" "}
              <a className="font-semibold text-secondary hover:underline" href={`mailto:${siteConfig.email}?subject=Website%20content%20correction`}>
                {siteConfig.email}
              </a>
              . Do not include symptoms, photographs, records, insurance, or other
              private medical information. Contact an office for patient-specific questions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
