import { copyFile, mkdir } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const wellKnownDir = path.join(root, "out", ".well-known")

await mkdir(wellKnownDir, { recursive: true })
await copyFile(
  path.join(root, "public", "security.txt"),
  path.join(wellKnownDir, "security.txt")
)

console.log("Published the website security disclosure.")
