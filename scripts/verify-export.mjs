import { access, readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"
import { assetStem, authorizedIds, exportDir, loadManifest, root } from "./gallery-assets.mjs"

const outDir = path.join(root, "out")
const procedureSlugs = [
  "upper-blepharoplasty",
  "lower-blepharoplasty",
  "brow-lift",
  "ptosis-repair",
  "entropion-ectropion-repair",
  "eyelid-cancer-mohs-reconstruction",
  "tearing-blocked-tear-ducts",
  "thyroid-eye-disease",
  "orbital-tumors-trauma",
  "botox",
  "dermal-fillers",
]
const concernSlugs = [
  "droopy-heavy-upper-eyelids",
  "under-eye-bags",
  "constant-watery-eyes",
  "eyelid-turning-in-or-out",
  "eyelid-lesion-mohs-reconstruction",
  "bulging-eyes-thyroid-eye-disease",
  "sudden-eyelid-drooping",
]
const manifest = await loadManifest()
const authorized = authorizedIds(manifest)
const routes = [
  "/",
  "/about",
  "/concerns",
  ...concernSlugs.map((slug) => `/concerns/${slug}`),
  "/services",
  "/procedures",
  "/patient-guide",
  ...procedureSlugs.map((slug) => `/procedures/${slug}`),
  "/gallery",
  ...[...authorized].map((id) => `/gallery/${id}`),
  "/contact",
  "/locations",
  "/locations/westlake-village",
  "/locations/rancho-cucamonga",
  "/locations/burbank",
  "/locations/downtown-los-angeles",
  "/referrals",
  "/privacy",
  "/notice-of-privacy-practices",
  "/accessibility",
  "/content-standards",
]

async function exists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

function routeCandidates(route) {
  if (route === "/") return [path.join(outDir, "index.html")]
  const clean = route.replace(/^\//, "")
  if (path.extname(clean)) return [path.join(outDir, clean)]
  return [path.join(outDir, `${clean}.html`), path.join(outDir, clean, "index.html")]
}

async function routeFile(route) {
  for (const candidate of routeCandidates(route)) {
    if (await exists(candidate)) return candidate
  }
  throw new Error(`Missing exported route: ${route}`)
}

const routeFiles = new Map()
for (const route of routes) routeFiles.set(route, await routeFile(route))

const htmlFiles = [...new Set(routeFiles.values())]
const html = (
  await Promise.all(htmlFiles.map(async (file) => readFile(file, "utf8")))
).join("\n")

for (const route of routes) {
  const staticHtml = await readFile(routeFiles.get(route), "utf8")
  if (staticHtml.includes("self.__next_f") || /<script[^>]*src="\/_next\//.test(staticHtml)) {
    throw new Error(`Static route still includes Next hydration: ${route}`)
  }
}

const remainingRuntime = (await readdir(path.join(outDir, "_next", "static", "chunks"))).filter((file) => file.endsWith(".js"))
if (remainingRuntime.length > 0) {
  throw new Error(`Unused Next runtime remains in export: ${remainingRuntime.join(", ")}`)
}

for (const phrase of ["Book Consultation", "Schedule Consultation"]) {
  if (html.includes(phrase)) throw new Error(`Misleading CTA remains: ${phrase}`)
}

if (html.includes("/images/dr-biro-portrait.png")) {
  throw new Error("The unoptimized portrait is still referenced by an exported page.")
}
if (await exists(path.join(outDir, "images", "dr-biro-portrait.png"))) {
  throw new Error("The unoptimized portrait was copied into the export.")
}

const portraitDir = path.join(outDir, "images", "portrait")
const portraitFiles = await readdir(portraitDir)
let portraitBytes = 0
for (const file of portraitFiles) {
  const bytes = (await stat(path.join(portraitDir, file))).size
  portraitBytes += bytes
  if (bytes > 100_000) throw new Error(`Responsive portrait exceeds 100 KB: ${file}`)
}
if (portraitBytes > 320_000) {
  throw new Error(`Responsive portrait set exceeds 320 KB: ${portraitBytes}`)
}

const socialCard = path.join(outDir, "images", "biromd-social-card.png")
const socialMetadata = await sharp(socialCard).metadata()
if (socialMetadata.width !== 1200 || socialMetadata.height !== 630) {
  throw new Error("Social sharing image must be exactly 1200x630.")
}

const allowedStems = new Set(
  manifest.filter(({ id }) => authorized.has(id)).map(({ file }) => assetStem(file))
)
let exportedGalleryFiles = []
try {
  exportedGalleryFiles = await readdir(exportDir)
} catch (error) {
  if (error.code !== "ENOENT") throw error
}

for (const file of exportedGalleryFiles) {
  const allowed = [...allowedStems].some(
    (stem) => file === `${stem}.jpg` || file.startsWith(`${stem}-`)
  )
  if (!allowed) throw new Error(`Unauthorized clinical asset exported: ${file}`)
}

for (const asset of manifest.filter(({ id }) => authorized.has(id))) {
  const stem = assetStem(asset.file)
  for (const file of [
    asset.file,
    `${stem}-480.avif`,
    `${stem}-480.webp`,
    `${stem}-720.avif`,
    `${stem}-720.webp`,
    `${stem}-960.avif`,
    `${stem}-960.webp`,
  ]) {
    if (!exportedGalleryFiles.includes(file)) {
      throw new Error(`Authorized gallery asset missing from export: ${file}`)
    }
  }
}

for (const asset of manifest.filter(({ id }) => !authorized.has(id))) {
  if (html.includes(`/images/cases/${asset.file}`)) {
    throw new Error(`Unauthorized gallery case appears in HTML: ${asset.id}`)
  }
}

const sitemap = await readFile(path.join(outDir, "sitemap.xml"), "utf8")
if (!sitemap.includes("<lastmod>")) {
  throw new Error("Sitemap entries must include publication or update dates.")
}
for (const route of routes) {
  const expected = new URL(route, "https://biromd.com").toString()
  if (!sitemap.includes(expected)) throw new Error(`Sitemap is missing ${route}`)
}

const internalLinks = new Set()
for (const file of htmlFiles) {
  const currentRoute = [...routeFiles.entries()].find(([, value]) => value === file)?.[0] ?? "/"
  const pageHtml = await readFile(file, "utf8")
  for (const match of pageHtml.matchAll(/href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&")
    if (/^(mailto:|tel:|https?:|#|javascript:)/.test(href)) continue
    const url = new URL(href, `https://biromd.com${currentRoute}`)
    if (url.origin === "https://biromd.com" && !url.pathname.startsWith("/_next/")) {
      internalLinks.add(url.pathname.replace(/\/$/, "") || "/")
    }
  }
}
for (const route of internalLinks) await routeFile(route)

console.log(
  `Verified ${routes.length} routes, ${internalLinks.size} internal destinations, ` +
    `${authorized.size} authorized gallery case(s), and responsive image budgets.`
)
