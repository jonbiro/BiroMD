import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import { PageIntro } from "@/components/page-intro"
import { GalleryClient } from "./gallery-client"

export const metadata: Metadata = pageMetadata({
  title: "Before & After Photos",
  description: "View clinical before and after case results of cosmetic blepharoplasty and reconstructive oculoplastic procedures performed by Dr. Nicolas Biro.",
  path: "/gallery",
})

export default function GalleryPage() {
  return (
    <main className="space-y-12 py-8">
      <PageIntro
        eyebrow="Clinical Cases"
        title="Before & After Photos"
        description="Explore documented surgical outcomes showing the precise intersection of functional reconstruction and refined aesthetic harmony."
      />
      
      <div className="container px-4 md:px-6">
        <GalleryClient />
      </div>
    </main>
  )
}
