import { readdir, rm } from "node:fs/promises"
import {
  assetStem,
  authorizedIds,
  exportDir,
  loadManifest,
  publicDir,
} from "./gallery-assets.mjs"

const manifest = await loadManifest()
const authorized = authorizedIds(manifest)
const allowedStems = new Set(
  manifest
    .filter(({ id }) => authorized.has(id))
    .map(({ file }) => assetStem(file))
)

try {
  for (const file of await readdir(exportDir)) {
    const allowed = [...allowedStems].some(
      (stem) => file === `${stem}.jpg` || file.startsWith(`${stem}-`)
    )

    if (!allowed) {
      await rm(new URL(file, `file://${exportDir}/`), { force: true })
    }
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error
}

await rm(publicDir, { recursive: true, force: true })
console.log(`Verified export for ${authorized.size} authorized gallery case(s).`)
