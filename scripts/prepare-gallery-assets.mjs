import { mkdir, rm } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"
import {
  assetCaseId,
  assetStem,
  authorizedIds,
  loadManifest,
  publicDir,
  sourceDir,
} from "./gallery-assets.mjs"

const manifest = await loadManifest()
const authorized = authorizedIds(manifest)

await rm(publicDir, { recursive: true, force: true })
await mkdir(publicDir, { recursive: true })

for (const asset of manifest.filter((asset) => authorized.has(assetCaseId(asset)))) {
  const source = path.join(sourceDir, asset.file)
  const stem = assetStem(asset.file)

  await sharp(source)
    .rotate()
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(publicDir, asset.file))

  await sharp(source)
    .rotate()
    .resize({ width: 48, withoutEnlargement: false })
    .blur(2)
    .webp({ quality: 42, effort: 4 })
    .toFile(path.join(publicDir, `${stem}-warning.webp`))

  for (const width of [480, 720, 960]) {
    const image = sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: false })

    await image
      .clone()
      .avif({ quality: 60, effort: 4 })
      .toFile(path.join(publicDir, `${stem}-${width}.avif`))
    await image
      .clone()
      .webp({ quality: 80, effort: 5, smartSubsample: true })
      .toFile(path.join(publicDir, `${stem}-${width}.webp`))
  }
}

console.log(`Prepared ${authorized.size} authorized gallery case(s).`)
