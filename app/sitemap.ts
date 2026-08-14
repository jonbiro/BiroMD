import type { MetadataRoute } from "next"
import { patientConcerns } from "@/lib/concerns"
import { getPublishedGalleryCases } from "@/lib/gallery-cases"
import { procedures } from "@/lib/procedures"
import { absoluteUrl, offices } from "@/lib/site"

export const dynamic = "force-static"

type SitemapEntry = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
}

// Static exports are deployments, so the build date is the most reliable shared
// revision signal until individual pages have approved medical-review dates.
const lastUpdated = new Date().toISOString().slice(0, 10)

const staticEntries: SitemapEntry[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/concerns", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/procedures", priority: 0.9, changeFrequency: "monthly" },
  { path: "/patient-guide", priority: 0.85, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/referrals", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  {
    path: "/notice-of-privacy-practices",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  { path: "/accessibility", priority: 0.4, changeFrequency: "yearly" },
  { path: "/content-standards", priority: 0.5, changeFrequency: "yearly" },
]

const entries: SitemapEntry[] = [
  ...staticEntries,
  ...offices.map((office) => ({
    path: `/locations/${office.id}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  ...procedures.map((procedure) => ({
    path: `/procedures/${procedure.slug}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  })),
  ...patientConcerns.map((concern) => ({
    path: `/concerns/${concern.slug}`,
    priority: concern.urgentPage ? 0.8 : 0.75,
    changeFrequency: "monthly" as const,
  })),
  ...getPublishedGalleryCases().map((item) => ({
    path: `/gallery/${item.id}`,
    priority: 0.65,
    changeFrequency: "yearly" as const,
  })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: lastUpdated,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
