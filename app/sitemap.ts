import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

export const dynamic = "force-static"

const entries: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/procedures", priority: 0.9, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.4, changeFrequency: "yearly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
