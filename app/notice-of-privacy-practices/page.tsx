import { ArrowUpRight, FileText, Phone } from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Notices of Privacy Practices",
  description:
    "Find the privacy notices and contact information for the medical practices where Dr. Nicolas Biro sees patients.",
  path: "/notice-of-privacy-practices",
})

export default function NoticeOfPrivacyPracticesPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Patient Privacy"
        title="Notices of Privacy Practices"
        description="Your medical records and clinical communications are handled by the office practice where you receive care. Use its published links below or call the practice for current privacy information."
      />

      <section className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {siteConfig.offices.map((office) => (
            <article key={office.id} className="panel min-w-0 rounded-[1.8rem] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                {office.name}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-primary">
                {office.practiceName}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{office.address}</p>
              <div className="mt-6 grid gap-3">
                {office.noticeUrl ? (
                  <Button
                    className="h-auto w-full min-w-0 whitespace-normal px-4 py-2 text-center leading-snug"
                    asChild
                  >
                    <a href={office.noticeUrl}>
                      <FileText className="mr-2 h-4 w-4 shrink-0" />
                      Patient Privacy Document
                      <ArrowUpRight className="ml-2 h-4 w-4 shrink-0" />
                    </a>
                  </Button>
                ) : (
                  <div className="rounded-xl border border-border bg-accent/45 p-4 text-sm text-muted-foreground">
                    <p className="flex items-start gap-2 font-medium text-foreground">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      Online privacy document not currently published
                    </p>
                    <p className="mt-2">Call the practice for its current notice.</p>
                  </div>
                )}
                {office.privacyUrl && (
                  <Button
                    variant="outline"
                    className="h-auto w-full min-w-0 whitespace-normal px-4 py-2 text-center leading-snug"
                    asChild
                  >
                    <a href={office.privacyUrl}>
                      Practice Privacy Policy
                      <ArrowUpRight className="ml-2 h-4 w-4 shrink-0" />
                    </a>
                  </Button>
                )}
                <a
                  className="mt-2 inline-flex min-w-0 items-start text-sm font-semibold text-secondary hover:underline"
                  href={`tel:${office.phoneHref}`}
                >
                  <Phone className="mr-2 mt-0.5 h-4 w-4 shrink-0" />
                  <span className="min-w-0">Call {office.phoneDisplay} with privacy questions</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="panel mx-auto max-w-4xl rounded-2xl p-6 text-sm text-muted-foreground">
          <h2 className="font-sans text-base font-semibold text-foreground">
            About this website
          </h2>
          <p className="mt-2">
            BiroMD.com is a public informational website and does not receive or
            store medical records. The applicable office practice&apos;s notice
            governs protected health information created or maintained in connection
            with your care. Contact that office if you need a current copy in
            another format or language.
          </p>
        </div>
      </section>
    </div>
  )
}
