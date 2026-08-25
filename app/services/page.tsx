import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { absoluteUrl } from "@/lib/site"

const destination = "/procedures"
const canonicalDestination = absoluteUrl(destination)

export const metadata: Metadata = {
  title: "Care Pathways",
  description:
    "Explore cosmetic, reconstructive, tear-duct, orbital, and injectable oculoplastic procedures.",
  alternates: { canonical: absoluteUrl(destination) },
}

export default function ServicesPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${canonicalDestination}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(canonicalDestination)})`,
        }}
      />
      <div className="page-stack">
        <PageIntro
          eyebrow="Procedures"
          title="Care Pathways Have Moved"
          description="The complete care pathway and procedure directory is now available on one page."
          actions={
            <Button asChild>
              <a href={canonicalDestination}>
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
