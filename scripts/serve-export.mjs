import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import { createServer } from "node:http"
import path from "node:path"

const root = path.join(process.cwd(), "out")
const port = Number(process.env.PORT ?? 4173)
const types = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
}

async function exists(file) {
  try {
    return (await stat(file)).isFile()
  } catch {
    return false
  }
}

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname)
  const clean = pathname.replace(/^\/+/, "")
  const candidates = pathname === "/"
    ? [path.join(root, "index.html")]
    : [
        path.join(root, clean),
        path.join(root, `${clean.replace(/\/$/, "")}.html`),
        path.join(root, clean, "index.html"),
      ]
  const file = await Promise.all(candidates.map(async (candidate) => [candidate, await exists(candidate)]))
    .then((results) => results.find(([, present]) => present)?.[0])

  if (!file || !path.resolve(file).startsWith(path.resolve(root))) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" })
    response.end("Not found")
    return
  }

  response.writeHead(200, {
    "content-type": types[path.extname(file)] ?? "application/octet-stream",
    "cache-control": "no-store",
  })
  createReadStream(file).pipe(response)
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving static export at http://127.0.0.1:${port}`)
})
