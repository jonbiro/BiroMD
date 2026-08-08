import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CalendarDays, FileText, ShieldCheck } from "lucide-react"
import { ClinicalCaseImage } from "@/components/clinical-case-image"
import { ConsultationCta } from "@/components/consultation-cta"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import {
  getPublishedGalleryCase,
  getPublishedGalleryCases,
  type GalleryCase,
} from "@/lib/gallery-cases"
import { getProcedure } from "@/lib/procedures"
import { absoluteUrl, pageMetadata } from "@/lib/site"
import { cn } from "@/lib/utils"

export const dynamicParams = false
const emptyGalleryRoute = "gallery-under-review"

export function generateStaticParams() {
  const cases = getPublishedGalleryCases()
  return cases.length > 0
    ? cases.map((item) => ({ id: item.id }))
    : [{ id: emptyGalleryRoute }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const item = getPublishedGalleryCase(id)
  if (!item) {
    if (id !== emptyGalleryRoute) return {}
    return {
      ...pageMetadata({
        title: "Clinical Gallery Under Review",
        description:
          "Clinical cases are published only after written image authorization and final presentation review are confirmed.",
        path: "/gallery",
      }),
      robots: { index: false, follow: false },
    }
  }

  return pageMetadata({
    title: `${item.title} Before and After`,
    description: `${item.presentation} Review the documented surgical approach and authorized before-and-after image. Individual results vary.`,
    path: `/gallery/${item.id}`,
  })
}

function ComparisonLabels({ item }: { item: GalleryCase }) {
  const vertical = item.comparisonLayout === "vertical"

  return (
    <div className="pointer-events-none absolute inset-3 z-10 text-[0.68rem] font-bold uppercase tracking-[0.14em]">
      <span className="absolute left-0 top-0 rounded-full bg-slate-950/85 px-3 py-1.5 text-white shadow-sm">
        Before
      </span>
      <span
        className={cn(
          "absolute rounded-full bg-slate-950/85 px-3 py-1.5 text-white shadow-sm",
          vertical ? "bottom-0 left-0" : "right-0 top-0"
        )}
      >
        After
      </span>
    </div>
  )
}

export default async function GalleryCasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = getPublishedGalleryCase(id)
  if (!item) {
    if (id !== emptyGalleryRoute) notFound()

    return (
      <div className="page-stack">
        <PageIntro
          eyebrow="Clinical Cases"
          title="Clinical Gallery Under Review"
          description="Cases are published only after the practice confirms written image authorization and reviews the final presentation."
          breadcrumbs={[
            { label: "Gallery", href: "/gallery" },
            { label: "Under review" },
          ]}
          actions={
            <Button variant="outline" asChild>
              <a href="/gallery">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Gallery
              </a>
            </Button>
          }
        />
      </div>
    )
  }

  const procedure = item.relatedProcedureSlug
    ? getProcedure(item.relatedProcedureSlug)
    : undefined
  const pageUrl = absoluteUrl(`/gallery/${item.id}`)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#page`,
        name: `${item.title} Before and After`,
        description: item.presentation,
        url: pageUrl,
        about: procedure
          ? { "@type": "MedicalProcedure", name: procedure.title }
          : { "@type": "MedicalCondition", name: item.focus },
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: absoluteUrl(item.imagePath),
          caption: item.alt,
        },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Gallery", item: absoluteUrl("/gallery") },
          { "@type": "ListItem", position: 3, name: item.title, item: pageUrl },
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
        eyebrow={`${item.categoryLabel} / ${item.focus}`}
        title={`${item.title} Before and After`}
        description="An authorized clinical case showing the presenting concern and surgical approach. Every patient heals differently, and individual results vary."
        breadcrumbs={[
          { label: "Gallery", href: "/gallery" },
          { label: item.title },
        ]}
        actions={
          <>
            <Button asChild>
              <a href="/contact">
                <CalendarDays className="mr-2 h-4 w-4" />
                Request Consultation
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/gallery">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Cases
              </a>
            </Button>
          </>
        }
      />

      <section className="container grid gap-6 px-4 lg:grid-cols-[1.08fr_0.92fr] md:px-6">
        <div className="panel overflow-hidden rounded-[1.8rem]">
          <div className="relative flex aspect-[4/3] items-center justify-center bg-accent/45 p-4 md:p-6">
            <ClinicalCaseImage
              imagePath={item.imagePath}
              alt={item.alt}
              sizes="(max-width: 1024px) 92vw, 54vw"
              className="max-h-full max-w-full"
            />
            <ComparisonLabels item={item} />
          </div>
          <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground md:px-6">
            {item.comparisonLabel}. Photographs are published with written authorization.
          </p>
        </div>

        <div className="space-y-4">
          <article className="panel rounded-[1.8rem] p-6 md:p-7">
            <FileText className="h-6 w-6 text-secondary" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-secondary">
              Presenting concern
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-primary">What Was Evaluated</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{item.presentation}</p>
          </article>

          <article className="panel rounded-[1.8rem] p-6 md:p-7">
            <ShieldCheck className="h-6 w-6 text-secondary" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-secondary">
              Surgical approach
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-primary">How It Was Addressed</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{item.technique}</p>
          </article>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="rounded-[1.8rem] border border-secondary/35 bg-secondary/8 p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
              Important context
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-primary">Results Are Individual</h2>
            <p className="mt-3 text-muted-foreground">
              This case is educational and does not predict another patient&apos;s outcome.
              Anatomy, treatment goals, healing, and follow-up differ. A consultation is
              needed to discuss what may be appropriate for you.
            </p>
          </div>
          {procedure ? (
            <Button
              variant="outline"
              asChild
              className="mt-5 h-auto min-h-11 max-w-full whitespace-normal py-2.5 text-center md:mt-0 md:shrink-0"
            >
              <a href={`/procedures/${procedure.slug}`}>
                About {procedure.title}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ) : null}
        </div>
      </section>

      <ConsultationCta />
    </div>
  )
}
