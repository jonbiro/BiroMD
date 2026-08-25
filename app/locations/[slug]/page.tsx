import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Download,
  Images,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import {
  absoluteUrl,
  officeAppointmentLabel,
  offices,
  pageMetadata,
  siteConfig,
} from "@/lib/site"
import { procedures } from "@/lib/procedures"

const featuredProcedureSlugs = new Set([
  "upper-blepharoplasty",
  "ptosis-repair",
  "eyelid-cancer-mohs-reconstruction",
  "tearing-blocked-tear-ducts",
])

const featuredProcedures = procedures.filter((procedure) =>
  featuredProcedureSlugs.has(procedure.slug)
)

export const dynamicParams = false

export function generateStaticParams() {
  return offices.map((office) => ({ slug: office.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const office = offices.find((item) => item.id === slug)
  if (!office) return {}

  return pageMetadata({
    title: `Eyelid Surgery & Oculoplastics in ${office.name}, CA`,
    description: `Visit Dr. Nicolas Biro for eyelid and oculoplastic care at ${office.practiceName}, ${office.address}. Call ${office.phoneDisplay} to request a consultation.`,
    path: `/locations/${office.id}`,
  })
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const office = offices.find((item) => item.id === slug)
  if (!office) notFound()
  const officeUrl = absoluteUrl(`/locations/${office.id}`)
  const physicianId = absoluteUrl("/#physician")
  const breadcrumbId = `${officeUrl}#breadcrumb`

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": `${officeUrl}#office`,
        name: `${siteConfig.shortName} - ${office.name}`,
        url: officeUrl,
        sameAs: office.practiceUrl,
        hasMap: office.mapUrl,
        telephone: office.phoneHref,
        medicalSpecialty: "Ophthalmology",
        availableLanguage: siteConfig.languages,
        employee: { "@id": physicianId },
        address: {
          "@type": "PostalAddress",
          streetAddress: office.streetAddress,
          addressLocality: office.addressLocality,
          addressRegion: office.addressRegion,
          postalCode: office.postalCode,
          addressCountry: "US",
        },
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
            name: "Offices",
            item: absoluteUrl("/locations"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: office.name,
            item: officeUrl,
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
        eyebrow="Office Location"
        title={`Eyelid and Oculoplastic Care in ${office.name}`}
        description={`Consultations with ${siteConfig.shortName} are available through ${office.practiceName}. ${office.appointmentMode === "online" ? "Request a consultation online or call the office directly." : "Call the office directly to request a consultation."}`}
        breadcrumbs={[
          { label: "Offices", href: "/locations" },
          { label: office.name },
        ]}
        actions={
          <>
            <Button asChild>
              <a href={office.bookingUrl}>
                {office.appointmentMode === "online" ? (
                  <CalendarDays className="mr-2 h-4 w-4" />
                ) : (
                  <Phone className="mr-2 h-4 w-4" />
                )}
                {officeAppointmentLabel(office)}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`tel:${office.phoneHref}`}>
                <Phone className="mr-2 h-4 w-4" />
                {office.phoneDisplay}
              </a>
            </Button>
          </>
        }
      />

      <section className="site-container grid gap-6 px-4 lg:grid-cols-[1.05fr_0.95fr] md:px-6">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            {office.practiceName}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-primary">Office Details</h2>
          <div className="mt-6 space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <div>
                <p className="font-semibold text-foreground">Address</p>
                <p className="text-muted-foreground">{office.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <div>
                <p className="font-semibold text-foreground">Phone</p>
                <a
                  className="inline-flex min-h-11 items-center font-semibold text-secondary underline-offset-4 hover:underline"
                  href={`tel:${office.phoneHref}`}
                >
                  {office.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <a href={office.mapUrl}>
                <Navigation className="mr-2 h-4 w-4" />
                Open Directions
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={office.practiceUrl}>
                Visit {office.practiceName}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={office.contactCardUrl} download>
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Save Office Contact
              </a>
            </Button>
          </div>
        </div>

        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <h2 className="text-3xl font-semibold text-primary">Before You Go</h2>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li>Confirm the appointment time and office location with the scheduling team.</li>
            <li>Ask the office what identification, medication list, records, or insurance information to bring.</li>
            <li>Call the office for accessibility needs or an approved way to send medical records securely.</li>
          </ul>
          <p className="mt-6 rounded-xl border border-border bg-accent/50 p-4 text-sm text-muted-foreground">
            Office hours, insurance participation, and physician availability can
            change. Confirm these details directly with the office.
          </p>
        </div>
      </section>

      <section className="site-container px-4 md:px-6" aria-labelledby="office-care-pathways">
        <div className="panel rounded-[1.8rem] p-6 md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Areas of care
            </p>
            <h2 id="office-care-pathways" className="mt-2 text-4xl font-semibold text-primary">
              Common Reasons to Seek Oculoplastic Evaluation
            </h2>
            <p className="mt-3 text-muted-foreground">
              Review a few common starting points before contacting the {office.name}{" "}
              office. Consultation determines the diagnosis and whether treatment is appropriate.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProcedures.map((procedure) => (
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
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container px-4 md:px-6">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a
            href="/locations"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All office locations
          </a>
          <a
            href="/patient-guide"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary hover:underline"
          >
            Plan your consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a
            href="/gallery"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary hover:underline"
          >
            <Images className="mr-2 h-4 w-4" aria-hidden="true" />
            View Before &amp; After Results
          </a>
        </div>
      </section>
    </div>
  )
}
