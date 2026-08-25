import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { absoluteUrl } from "@/lib/site"

const destination = "/procedures"

export const metadata: Metadata = {
  title: "Care Pathways",
  description:
    "Explore cosmetic, reconstructive, tear-duct, orbital, and injectable oculoplastic procedures.",
  alternates: { canonical: absoluteUrl(destination) },
  // Redirect stub: keep it crawlable so the redirect is followed, but never
  // let it compete with /procedures in the index.
  robots: { index: false, follow: true },
}

export default function ServicesPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(destination)})`,
        }}
      />
      <div className="page-stack">
        <PageIntro
          eyebrow="Procedures"
          title="Care Pathways Have Moved"
          description="The complete care pathway and procedure directory is now available on one page."
          actions={
            <Button asChild>
              <a href={destination}>
                Explore Procedures
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          }
        />
      </div>
    </>
  )
}
