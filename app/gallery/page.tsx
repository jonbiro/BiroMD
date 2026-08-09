import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import { getPublishedGalleryCases } from "@/lib/gallery-cases"
import { PageIntro } from "@/components/page-intro"
import { GalleryView } from "./gallery-view"

export const metadata: Metadata = pageMetadata({
  title: "Before & After Photos",
  description:
    "View authorized clinical before-and-after cases for cosmetic and reconstructive procedures performed by Dr. Nicolas Biro.",
  path: "/gallery",
})

export default function GalleryPage() {
  const publishedCases = getPublishedGalleryCases()

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Clinical Cases"
        title="Before & After Photos"
        description="Browse authorized before-and-after cases, including additional matched views where available. Individual results vary."
      />
      <div className="site-container px-4 md:px-6">
        <GalleryView cases={publishedCases} />
      </div>
    </div>
  )
}
