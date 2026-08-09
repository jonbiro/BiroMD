import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CalendarDays, FileText, ShieldCheck } from "lucide-react"
import { ClinicalComparisonPreview } from "@/components/clinical-comparison-preview"
import { ClinicalImageCover } from "@/components/clinical-image-cover"
import { ConsultationCta } from "@/components/consultation-cta"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import {
  getPublishedGalleryCase,
  getPublishedGalleryCases,
} from "@/lib/gallery-cases"
import { getProcedure } from "@/lib/procedures"
import { absoluteUrl, pageMetadata } from "@/lib/site"

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

  const procedures = (item.relatedProcedureSlugs ?? [])
    .map((slug) => getProcedure(slug))
    .filter((procedure) => procedure !== undefined)
  const primaryImage = item.images[0]
  const pageUrl = absoluteUrl(`/gallery/${item.id}`)
  const imageObjects = item.images.map((image) => ({
    "@type": "ImageObject",
    contentUrl: absoluteUrl(image.imagePath),
    caption: image.alt,
    width: image.width,
    height: image.height,
  }))
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#page`,
        name: `${item.title} Before and After`,
        description: item.presentation,
        url: pageUrl,
        about: procedures.length > 0
          ? procedures.map((procedure) => ({
              "@type": "MedicalProcedure",
              name: procedure.title,
            }))
          : { "@type": "MedicalCondition", name: item.focus },
        image: imageObjects,
        primaryImageOfPage: imageObjects[0],
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
          <div
            className={`relative flex items-center justify-center bg-accent/45 ${item.sensitive ? "min-h-[17rem]" : ""}`}
            data-sensitive-image={item.sensitive ? "true" : undefined}
            tabIndex={item.sensitive ? -1 : undefined}
          >
            <div
              data-sensitive-media={item.sensitive ? "true" : undefined}
              aria-hidden={item.sensitive ? "true" : undefined}
              className={`flex w-full items-center justify-center ${item.sensitive ? "min-h-[17rem]" : ""}`}
            >
              <ClinicalComparisonPreview
                image={primaryImage}
                sizes="(max-width: 1024px) 46vw, 27vw"
              />
            </div>
            {item.sensitive && item.sensitiveLabel ? (
              <ClinicalImageCover
                label={item.sensitiveLabel}
                imagePath={primaryImage.imagePath}
              />
            ) : null}
          </div>
          <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground md:px-6">
            {primaryImage.viewLabel}. Before-and-after comparison. Photographs are published
            with written authorization.
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

      {item.images.length > 1 ? (
        <section className="container px-4 md:px-6" aria-labelledby="additional-case-views">
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
              Additional Comparisons
            </p>
            <h2 id="additional-case-views" className="mt-2 text-4xl font-semibold text-primary">
              Matched Views of the Same Case
            </h2>
            <p className="mt-3 text-muted-foreground">
              Oblique views provide additional context beyond the primary frontal comparison.
            </p>
          </div>
          <div className="grid items-start gap-6 md:grid-cols-2">
            {item.images.slice(1).map((image) => (
              <article key={image.imagePath} className="panel self-start overflow-hidden rounded-[1.8rem]">
                <div
                  className="relative flex items-center justify-center bg-accent/45"
                >
                  <ClinicalComparisonPreview
                    image={image}
                    sizes="(max-width: 768px) 46vw, 23vw"
                  />
                </div>
                <div className="border-t border-border px-5 py-4">
                  <h3 className="text-2xl font-semibold text-primary">{image.viewLabel}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Before-and-after comparison</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

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
          {procedures.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
              {procedures.map((procedure) => (
                <Button
                  key={procedure.slug}
                  variant="outline"
                  asChild
                  className="h-auto min-h-11 max-w-full whitespace-normal py-2.5 text-center"
                >
                  <a href={`/procedures/${procedure.slug}`}>
                    About {procedure.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <ConsultationCta />
    </div>
  )
}
