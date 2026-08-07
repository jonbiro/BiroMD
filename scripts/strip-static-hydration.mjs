import { readdir, readFile, stat, unlink, writeFile } from "node:fs/promises"
import path from "node:path"

const outDir = path.join(process.cwd(), "out")

async function allFiles(directory) {
  const files = []
  for (const entry of await readdir(directory)) {
    const file = path.join(directory, entry)
    const metadata = await stat(file)
    if (metadata.isDirectory()) files.push(...(await allFiles(file)))
    else files.push(file)
  }
  return files
}

const exportedFiles = await allFiles(outDir)
let stripped = 0
for (const file of exportedFiles.filter((item) => item.endsWith(".html"))) {
  const original = await readFile(file, "utf8")
  const optimized = original
    .replace(/<link rel="preload" as="script"[^>]*\/?>(?:<\/link>)?/g, "")
    .replace(/<script[^>]*src="\/_next\/[^\"]+"[^>]*><\/script>/g, "")
    .replace(/<script>(?:\(self\.__next_f|self\.__next_f)[\s\S]*?<\/script>/g, "")

  if (optimized.includes("self.__next_f") || /<script[^>]*src="\/_next\//.test(optimized)) {
    throw new Error(`Next hydration remained in static page: ${path.relative(outDir, file)}`)
  }

  await writeFile(file, optimized)
  stripped += 1
}

let removed = 0
for (const file of exportedFiles) {
  const isNextScript = file.includes(`${path.sep}_next${path.sep}static${path.sep}chunks${path.sep}`) && file.endsWith(".js")
  const isRouteState = file.endsWith(".txt") && path.basename(file) !== "robots.txt"
  if (isNextScript || isRouteState) {
    await unlink(file)
    removed += 1
  }
}

console.log(`Removed Next hydration from ${stripped} page(s) and pruned ${removed} unused runtime file(s).`)
