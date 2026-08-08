import type { MetadataRoute } from "next"
import { procedures } from "@/lib/procedures"
import { absoluteUrl, offices } from "@/lib/site"

export const dynamic = "force-static"

type SitemapEntry = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
}

const staticEntries: SitemapEntry[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/procedures", priority: 0.9, changeFrequency: "monthly" },
  { path: "/patient-guide", priority: 0.85, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  {
    path: "/notice-of-privacy-practices",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  { path: "/accessibility", priority: 0.4, changeFrequency: "yearly" },
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
]

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
