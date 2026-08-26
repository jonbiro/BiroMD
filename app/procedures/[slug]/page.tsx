import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ClipboardCheck,
  Images,
  Info,
} from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { PageJumpLinks } from "@/components/page-jump-links"
import { ConsultationCta } from "@/components/consultation-cta"
import { Button } from "@/components/ui/button"
import { patientConcerns } from "@/lib/concerns"
import {
  galleryCasePath,
  getPublishedGalleryCases,
} from "@/lib/gallery-cases"
import {
  absoluteUrl,
  pageMetadata,
  siteConfig,
} from "@/lib/site"
import { getProcedure, procedures } from "@/lib/procedures"

export const dynamicParams = false

export function generateStaticParams() {
  return procedures.map((procedure) => ({ slug: procedure.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const procedure = getProcedure(slug)
  if (!procedure) return {}

  return pageMetadata({
    title: procedure.seoTitle ?? `${procedure.title} in Los Angeles`,
    description:
      procedure.seoDescription ??
      `${procedure.summary} ${siteConfig.shortName} serves patients across the Greater Los Angeles area.`,
    path: `/procedures/${procedure.slug}`,
  })
}

export default async function ProcedurePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const procedure = getProcedure(slug)
  if (!procedure) notFound()

  const preferredRelated = new Set(procedure.relatedProcedureSlugs ?? [])
  const related = procedures
    .filter((item) => item.slug !== procedure.slug)
    .sort((a, b) => {
      const aPriority = preferredRelated.has(a.slug) ? 0 : a.categoryId === procedure.categoryId ? 1 : 2
      const bPriority = preferredRelated.has(b.slug) ? 0 : b.categoryId === procedure.categoryId ? 1 : 2
      return aPriority - bPriority
    })
    .filter(
      (item) => preferredRelated.has(item.slug) || item.categoryId === procedure.categoryId
    )
    .slice(0, 3)
  const relatedConcerns = patientConcerns.filter((concern) =>
    concern.relatedProcedureSlugs.includes(procedure.slug)
  )
  const resourcesDescription =
    relatedConcerns.length > 0
      ? "Review authorized clinical cases, understand related symptoms, and prepare practical questions before contacting an office."
      : "Review authorized clinical cases and prepare practical questions before contacting an office."
  const matchingCases = getPublishedGalleryCases()
    .filter((item) => item.relatedProcedureSlugs?.includes(procedure.slug))
    .sort(
      (a, b) =>
        (a.relatedProcedureSlugs?.length ?? 0) -
        (b.relatedProcedureSlugs?.length ?? 0)
    )
  const procedureUrl = absoluteUrl(`/procedures/${procedure.slug}`)
  const breadcrumbId = `${procedureUrl}#breadcrumb`
  const procedureId = `${procedureUrl}#procedure`
  const websiteId = absoluteUrl("/#website")

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${procedureUrl}#page`,
        name: procedure.title,
        description: procedure.summary,
        url: procedureUrl,
        mainEntity: { "@id": procedureId },
        about: { "@id": procedureId },
        audience: { "@type": "Patient" },
        specialty: "https://schema.org/Ophthalmologic",
        isPartOf: { "@id": websiteId },
        citation: procedure.sources.map((source) => source.url),
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "MedicalProcedure",
        "@id": procedureId,
        name: procedure.title,
        description: procedure.overview,
        procedureType:
          procedure.categoryId === "non-surgical-treatments"
            ? "https://schema.org/NoninvasiveProcedure"
            : "https://schema.org/SurgicalProcedure",
        relevantSpecialty: "https://schema.org/Ophthalmologic",
      },
      {
        "@type": "FAQPage",
        "@id": `${procedureUrl}#faq`,
        url: procedureUrl,
        mainEntity: procedure.questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Procedures",
            item: absoluteUrl("/procedures"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: procedure.title,
            item: procedureUrl,
          },
        ],
      },
    ],
  }

  return (
    <div className="page-stack">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageIntro
        eyebrow={procedure.categoryLabel}
        title={procedure.pageTitle ?? procedure.title}
        description={procedure.summary}
        breadcrumbs={[
          { label: "Procedures", href: "/procedures" },
          { label: procedure.title },
        ]}
        actions={
          <>
            <Button asChild>
              <a href="/contact">
                <CalendarDays className="mr-2 h-4 w-4" />
                Request a Consultation
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/procedures">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Procedures
              </a>
            </Button>
          </>
        }
      />

      <PageJumpLinks
        items={[
          { href: "#overview", label: "Overview" },
          { href: "#consultation", label: "Consultation" },
          { href: "#recovery", label: "Recovery" },
          { href: "#patient-resources", label: "Results & Guides" },
          { href: "#questions", label: "Questions" },
          { href: "#related-procedures", label: "Related Care" },
        ]}
      />

      <section className="site-container grid gap-6 px-4 lg:grid-cols-[1.05fr_0.95fr] md:px-6">
        <article id="overview" className="panel rounded-[1.8rem] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Overview
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-primary">
            What This Procedure May Address
          </h2>
          <p className="mt-4 text-muted-foreground">{procedure.overview}</p>

          <h3 className="mt-8 text-2xl font-semibold text-primary">
            When Patients Ask About This Procedure
          </h3>
          <ul className="mt-4 space-y-3">
            {procedure.concerns.map((concern) => (
              <li key={concern} className="flex items-start gap-3 text-[0.9375rem] text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                {concern}
              </li>
            ))}
          </ul>
        </article>

        <aside id="consultation" className="panel rounded-[1.8rem] p-6 md:p-8">
          <ClipboardCheck className="h-6 w-6 text-secondary" />
          <h2 className="mt-4 text-3xl font-semibold text-primary">
            What Dr. Biro Evaluates
          </h2>
          <ul className="mt-5 space-y-4">
            {procedure.evaluation.map((item) => (
              <li key={item} className="rounded-xl border border-border bg-accent/45 p-4 text-[0.9375rem] text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section id="recovery" className="site-container px-4 md:px-6">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Recovery and Next Steps
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-primary">
            Recovery and Your Treatment Plan
          </h2>
          <p className="mt-4 max-w-4xl text-muted-foreground">{procedure.nextSteps}</p>
        </div>
      </section>

      <section
        id="patient-resources"
        className="site-container px-4 md:px-6"
        aria-labelledby="patient-resources-title"
      >
        <div
          className={`panel grid gap-6 rounded-[1.8rem] p-6 md:p-8 ${
            relatedConcerns.length > 0 ? "lg:grid-cols-[0.9fr_1.1fr]" : ""
          }`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Results and preparation
            </p>
            <h2 id="patient-resources-title" className="mt-2 text-3xl font-semibold text-primary">
              Helpful Next Steps
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {resourcesDescription}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <a href={matchingCases[0] ? galleryCasePath(matchingCases[0]) : "/gallery"}>
                  <Images className="mr-2 h-4 w-4" aria-hidden="true" />
                  {matchingCases.length > 0 ? "See Related Before & After" : "Browse Before & After"}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/patient-guide">
                  Plan Your Visit
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
            {matchingCases.length > 1 ? (
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                {matchingCases.slice(1).map((item) => (
                  <li key={item.id}>
                    <a
                      href={galleryCasePath(item)}
                      className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline"
                    >
                      {item.title} before and after
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {relatedConcerns.length > 0 ? (
            <div className="rounded-2xl border border-border bg-accent/45 p-5">
              <h3 className="font-sans text-sm font-semibold text-foreground">
                Related symptom guides
              </h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {relatedConcerns.map((concern) => (
                  <li key={concern.slug}>
                    <a
                      href={`/concerns/${concern.slug}`}
                      className="group flex min-h-11 items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-secondary hover:text-secondary"
                    >
                      {concern.shortTitle}
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section
        id="questions"
        className="site-container px-4 md:px-6"
        aria-labelledby="procedure-faq"
      >
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <h2 id="procedure-faq" className="text-3xl font-semibold text-primary">
            Common Questions
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {procedure.questions.map((item) => (
              <article key={item.question} className="rounded-2xl border border-border bg-accent/45 p-5">
                <h3 className="font-sans text-base font-semibold leading-snug text-foreground">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container px-4 md:px-6" aria-labelledby="procedure-references">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
            <h2 id="procedure-references" className="text-3xl font-semibold text-primary">
              Clinical References
            </h2>
            <ul className="mt-2 space-y-1">
              {procedure.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary underline-offset-4 hover:underline"
                  >
                    {source.label}
                    <ArrowUpRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              See how sources, physician-review labels, and corrections are handled in
              the{" "}
              <a href="/content-standards" className="font-semibold text-secondary underline-offset-4 hover:underline">
                BiroMD content standards
              </a>
              .
            </p>
        </div>
      </section>

      <section className="site-container px-4 md:px-6">
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-accent/45 p-5 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
          <p>
            This page provides general education, not a diagnosis or treatment
            recommendation. Candidacy, risks, alternatives, and recovery must be
            discussed during an appropriate clinical evaluation. Seek urgent care
            for sudden or severe eye symptoms.
          </p>
        </div>
      </section>

      {related.length > 0 ? (
        <section id="related-procedures" className="site-container px-4 md:px-6">
          <h2 className="text-3xl font-semibold text-primary">Related Procedures</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <a
                key={item.slug}
                href={`/procedures/${item.slug}`}
                className="panel group rounded-2xl p-5"
              >
                <h3 className="text-2xl font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <ConsultationCta />
    </div>
  )
}
