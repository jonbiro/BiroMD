import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ClipboardCheck,
  Info,
} from "lucide-react"
import { ConsultationCta } from "@/components/consultation-cta"
import { PageIntro } from "@/components/page-intro"
import { PageJumpLinks } from "@/components/page-jump-links"
import { Button } from "@/components/ui/button"
import { getPatientConcern, patientConcerns } from "@/lib/concerns"
import { getProcedure } from "@/lib/procedures"
import { absoluteUrl, pageMetadata } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return patientConcerns.map((concern) => ({ slug: concern.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const concern = getPatientConcern(slug)
  if (!concern) return {}

  return pageMetadata({
    title: `${concern.title} in Los Angeles`,
    description: concern.summary,
    path: `/concerns/${concern.slug}`,
  })
}

export default async function ConcernPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const concern = getPatientConcern(slug)
  if (!concern) notFound()

  const relatedProcedures = concern.relatedProcedureSlugs
    .map((procedureSlug) => getProcedure(procedureSlug))
    .filter((procedure) => procedure !== undefined)
  const concernUrl = absoluteUrl(`/concerns/${concern.slug}`)
  const breadcrumbId = `${concernUrl}#breadcrumb`
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${concernUrl}#page`,
        name: concern.title,
        headline: concern.title,
        description: concern.summary,
        url: concernUrl,
        audience: { "@type": "Patient" },
        citation: concern.sources.map((source) => source.url),
        breadcrumb: { "@id": breadcrumbId },
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
            name: "Symptoms and Concerns",
            item: absoluteUrl("/concerns"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: concern.title,
            item: concernUrl,
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
        eyebrow="Symptoms and Concerns"
        title={concern.title}
        description={concern.summary}
        breadcrumbs={[
          { label: "Symptoms and Concerns", href: "/concerns" },
          { label: concern.title },
        ]}
        actions={
          <>
            {concern.urgentPage ? (
              <Button variant="destructive" asChild>
                <a href="#urgent-guidance">
                  <AlertTriangle className="mr-2 h-4 w-4" aria-hidden="true" />
                  Read Urgent Warning
                </a>
              </Button>
            ) : (
              <Button asChild>
                <a href="/contact">
                  <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />
                  Request Consultation
                </a>
              </Button>
            )}
            <Button variant="outline" asChild>
              <a href="/concerns">
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                All Symptoms
              </a>
            </Button>
          </>
        }
      />

      {concern.urgentPage ? (
        <section
          id="urgent-guidance"
          className="site-container px-4 md:px-6"
          aria-labelledby="urgent-action"
        >
          <div className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-5 text-amber-950 dark:border-amber-500/45 dark:bg-amber-950/45 dark:text-amber-100 md:p-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <h2 id="urgent-action" className="font-sans text-lg font-semibold text-current">
                Do not wait for routine web scheduling
              </h2>
              <p className="mt-1 text-sm">{concern.urgency}</p>
            </div>
          </div>
        </section>
      ) : null}

      <PageJumpLinks
        items={
          concern.urgentPage
            ? [
                { href: "#urgent-guidance", label: "Urgent Signs" },
                { href: "#possible-contributors", label: "Possible Factors" },
                { href: "#evaluation", label: "Evaluation" },
                { href: "#care-options", label: "Care Options" },
              ]
            : [
                { href: "#possible-contributors", label: "Possible Factors" },
                { href: "#evaluation", label: "Evaluation" },
                { href: "#urgent-guidance", label: "Urgent Signs" },
                { href: "#care-options", label: "Care Options" },
              ]
        }
      />

      <section className="site-container grid gap-6 px-4 lg:grid-cols-[1.05fr_0.95fr] md:px-6">
        <article
          id="possible-contributors"
          className="panel rounded-[1.8rem] p-6 md:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Why evaluation matters
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-primary">
            One Symptom Can Have Different Contributors
          </h2>
          <p className="mt-4 text-muted-foreground">{concern.overview}</p>

          <h3 className="mt-8 text-2xl font-semibold text-primary">
            Possible contributors
          </h3>
          <ul className="mt-4 space-y-3">
            {concern.possibleContributors.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>

        <aside id="evaluation" className="panel rounded-[1.8rem] p-6 md:p-8">
          <ClipboardCheck className="h-6 w-6 text-secondary" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-semibold text-primary">
            What Evaluation May Cover
          </h2>
          <ul className="mt-5 space-y-4">
            {concern.evaluation.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border bg-accent/45 p-4 text-sm text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {!concern.urgentPage ? (
        <section
          id="urgent-guidance"
          className="site-container px-4 md:px-6"
          aria-labelledby="when-to-seek-care"
        >
          <div className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-5 text-amber-950 dark:border-amber-500/45 dark:bg-amber-950/45 dark:text-amber-100 md:p-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <h2 id="when-to-seek-care" className="font-sans text-base font-semibold text-current">
                When routine scheduling is not appropriate
              </h2>
              <p className="mt-1 text-sm">{concern.urgency}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section
        id="care-options"
        className="site-container px-4 md:px-6"
        aria-labelledby="related-care"
      >
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <h2 id="related-care" className="text-3xl font-semibold text-primary">
            Related Care Pathways
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            These procedure pages explain possible care pathways. The appropriate
            next step depends on the diagnosis, examination, goals, and urgency.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedProcedures.map((procedure) => (
              <a
                key={procedure.slug}
                href={`/procedures/${procedure.slug}`}
                className="group flex min-h-40 flex-col rounded-2xl border border-border bg-background p-4 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
              >
                <h3 className="text-2xl font-semibold leading-tight text-primary">
                  {procedure.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {procedure.summary}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">
                  View procedure guide
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              Clinical references
            </h3>
            <ul className="mt-2 space-y-1">
              {concern.sources.map((source) => (
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
        </div>
      </section>

      <section className="site-container px-4 md:px-6">
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-accent/45 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <p>
            This page provides general education, not a diagnosis or treatment
            recommendation. Seek urgent care for sudden or severe eye, vision, or
            neurologic symptoms.
          </p>
        </div>
      </section>

      {!concern.urgentPage ? (
        <ConsultationCta
          title="Choose an Office for Oculoplastic Evaluation"
          description="Select the more convenient office, request an appointment through its official scheduling service, or call directly. The office confirms availability and visit details."
        />
      ) : null}
    </div>
  )
}
