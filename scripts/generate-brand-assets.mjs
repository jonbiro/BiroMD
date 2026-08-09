import { mkdir } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const root = process.cwd()
const source = path.join(root, "brand-assets", "dr-biro-portrait.png")
const portraitDir = path.join(root, "public", "images", "portrait")

await mkdir(portraitDir, { recursive: true })

for (const width of [320, 480, 560, 640, 960]) {
  const pipeline = sharp(source).rotate().resize({
    width,
    height: Math.round(width * 1.25),
    fit: "cover",
    position: "north",
  })

  await pipeline
    .clone()
    .avif({ quality: 58, effort: 6 })
    .toFile(path.join(portraitDir, `dr-biro-portrait-${width}.avif`))
  await pipeline
    .clone()
    .webp({ quality: 80, smartSubsample: true })
    .toFile(path.join(portraitDir, `dr-biro-portrait-${width}.webp`))
}

const socialPortrait = await sharp(source)
  .rotate()
  .resize({ width: 500, height: 630, fit: "cover", position: "attention" })
  .toBuffer()

const background = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#07182d"/>
        <stop offset="1" stop-color="#0b3558"/>
      </linearGradient>
      <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(150 80) rotate(35) scale(530 340)">
        <stop stop-color="#117b78" stop-opacity=".42"/>
        <stop offset="1" stop-color="#117b78" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="760" height="630" fill="url(#glow)"/>
  </svg>
`)

const foreground = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0" x2="1">
        <stop offset="0" stop-color="#07182d"/>
        <stop offset="1" stop-color="#07182d" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect x="650" width="200" height="630" fill="url(#fade)"/>
    <rect x="72" y="84" width="58" height="5" rx="2.5" fill="#4fd0c7"/>
    <text x="72" y="170" fill="#f5fbff" font-family="Georgia, serif" font-size="66" font-weight="600">Nicolas Biro, M.D.</text>
    <text x="75" y="225" fill="#8de0da" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="4">OCULOPLASTIC SURGERY</text>
    <text x="75" y="336" fill="#d9e8f5" font-family="Arial, sans-serif" font-size="31">Specialized care for the eyes</text>
    <text x="75" y="376" fill="#d9e8f5" font-family="Arial, sans-serif" font-size="31">and surrounding face</text>
    <text x="75" y="514" fill="#b5c9dc" font-family="Arial, sans-serif" font-size="20">Serving the greater Los Angeles area</text>
    <text x="75" y="553" fill="#8de0da" font-family="Arial, sans-serif" font-size="21" font-weight="700">BIROMD.COM</text>
  </svg>
`)

await sharp(background)
  .composite([
    { input: socialPortrait, left: 700, top: 0 },
    { input: foreground, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(path.join(root, "public", "images", "biromd-social-card.png"))

console.log("Generated responsive portrait and social sharing assets.")
