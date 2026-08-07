import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ClipboardCheck,
  Info,
} from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { absoluteUrl, pageMetadata, siteConfig } from "@/lib/site"
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
    title: procedure.title,
    description: `${procedure.summary} Learn what is evaluated during consultation with ${siteConfig.shortName}.`,
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

  const related = procedures
    .filter(
      (item) => item.categoryId === procedure.categoryId && item.slug !== procedure.slug
    )
    .slice(0, 3)

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": absoluteUrl(`/procedures/${procedure.slug}#page`),
        name: procedure.title,
        description: procedure.summary,
        url: absoluteUrl(`/procedures/${procedure.slug}`),
        about: { "@type": "MedicalProcedure", name: procedure.title },
      },
      {
        "@type": "FAQPage",
        mainEntity: procedure.questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  }

  return (
    <div className="space-y-10 pb-20 pt-10 md:space-y-12 md:pb-24 md:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageIntro
        eyebrow={procedure.categoryLabel}
        title={procedure.title}
        description={procedure.summary}
        actions={
          <>
            <Button asChild>
              <a href="/contact">
                <CalendarDays className="mr-2 h-4 w-4" />
                Request Consultation
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

      <section className="container grid gap-6 px-4 lg:grid-cols-[1.05fr_0.95fr] md:px-6">
        <article className="panel rounded-[1.8rem] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Overview
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-primary">
            What This Evaluation Addresses
          </h2>
          <p className="mt-4 text-muted-foreground">{procedure.overview}</p>

          <h3 className="mt-8 text-2xl font-semibold text-primary">
            Reasons to Seek Evaluation
          </h3>
          <ul className="mt-4 space-y-3">
            {procedure.concerns.map((concern) => (
              <li key={concern} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                {concern}
              </li>
            ))}
          </ul>
        </article>

        <aside className="panel rounded-[1.8rem] p-6 md:p-8">
          <ClipboardCheck className="h-6 w-6 text-secondary" />
          <h2 className="mt-4 text-3xl font-semibold text-primary">
            What Consultation Covers
          </h2>
          <ul className="mt-5 space-y-4">
            {procedure.evaluation.map((item) => (
              <li key={item} className="rounded-xl border border-border bg-accent/45 p-4 text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="container px-4 md:px-6">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Recovery and Next Steps
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-primary">
            Plan Around the Individual Treatment
          </h2>
          <p className="mt-4 max-w-4xl text-muted-foreground">{procedure.nextSteps}</p>
        </div>
      </section>

      <section className="container px-4 md:px-6" aria-labelledby="procedure-faq">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <h2 id="procedure-faq" className="text-3xl font-semibold text-primary">
            Common Questions
          </h2>
          <div className="mt-5 divide-y divide-border">
            {procedure.questions.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer list-none pr-8 font-semibold text-foreground marker:hidden">
                  {item.question}
                </summary>
                <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
          {procedure.source ? (
            <a
              href={procedure.source.url}
              className="mt-5 inline-flex items-center text-sm font-semibold text-secondary hover:underline"
            >
              {procedure.source.label}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          ) : null}
        </div>
      </section>

      <section className="container px-4 md:px-6">
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
        <section className="container px-4 md:px-6">
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
    </div>
  )
}
