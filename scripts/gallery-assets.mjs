import { readFile } from "node:fs/promises"
import path from "node:path"

export const root = process.cwd()
export const sourceDir = path.join(root, "clinical-assets", "gallery")
export const publicDir = path.join(root, "public", "images", "cases")
export const exportDir = path.join(root, "out", "images", "cases")

export async function loadManifest() {
  return JSON.parse(
    await readFile(path.join(root, "lib", "gallery-assets.json"), "utf8")
  )
}

export function authorizedIds(manifest) {
  const requested = new Set(
    (process.env.GALLERY_AUTHORIZED_CASE_IDS ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
  )
  const known = new Set(manifest.map((asset) => asset.id))
  const unknown = [...requested].filter((id) => !known.has(id))

  if (unknown.length > 0) {
    throw new Error(`Unknown gallery case ID(s): ${unknown.join(", ")}`)
  }

  return requested
}

export function assetStem(file) {
  return path.basename(file, path.extname(file))
}
