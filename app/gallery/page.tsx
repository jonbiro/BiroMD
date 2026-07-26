import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import { getPublishedGalleryCases } from "@/lib/gallery-cases"
import { PageIntro } from "@/components/page-intro"
import { GalleryClient } from "./gallery-client"

export const metadata: Metadata = pageMetadata({
  title: "Before & After Photos",
  description: "View clinical before and after case results of cosmetic blepharoplasty and reconstructive oculoplastic procedures performed by Dr. Nicolas Biro.",
  path: "/gallery",
})

export default function GalleryPage() {
  const publishedCases = getPublishedGalleryCases()

  return (
    <div className="space-y-12 py-8">
      <PageIntro
        eyebrow="Clinical Cases"
        title="Before & After Photos"
        description="Review selected clinical cases with the procedure and surgical approach described alongside each image."
      />
      
      <div className="container px-4 md:px-6">
        <GalleryClient cases={publishedCases} />
      </div>
    </div>
  )
}
