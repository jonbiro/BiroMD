import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import { getPublishedGalleryCases } from "@/lib/gallery-cases"
import { PageIntro } from "@/components/page-intro"
import { GalleryView } from "./gallery-view"

export const metadata: Metadata = pageMetadata({
  title: "Blepharoplasty Before & After | Los Angeles",
  description:
    "View authorized before-and-after cases for upper and lower blepharoplasty and reconstructive oculoplastic procedures performed by Dr. Nicolas Biro. Individual results vary.",
  path: "/gallery",
})

export default function GalleryPage() {
  const publishedCases = getPublishedGalleryCases()

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Clinical Cases"
        title="Authorized Before-and-After Cases"
        description="Browse selected, authorized clinical cases with matched views where available. Photos are for education only; lighting, angle, framing, and healing stage may differ, and individual results vary."
      />
      <div className="site-container px-4 md:px-6">
        <GalleryView cases={publishedCases} />
      </div>
    </div>
  )
}
