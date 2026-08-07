import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import { createServer } from "node:http"
import path from "node:path"

const root = path.join(process.cwd(), "out")
const resolvedRoot = path.resolve(root)
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
  if (!request.method || !["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { allow: "GET, HEAD" })
    response.end()
    return
  }

  let pathname
  try {
    pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname)
  } catch {
    response.writeHead(400, { "content-type": "text/plain; charset=utf-8" })
    response.end("Bad request")
    return
  }

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
  const resolvedFile = file ? path.resolve(file) : ""
  const isWithinRoot = resolvedFile.startsWith(`${resolvedRoot}${path.sep}`)

  if (!file || !isWithinRoot) {
    const fallback = path.join(root, "404.html")
    if (!(await exists(fallback))) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" })
      response.end("Not found")
      return
    }

    response.writeHead(404, {
      "content-type": types[".html"],
      "cache-control": "no-store",
    })
    if (request.method === "HEAD") response.end()
    else createReadStream(fallback).pipe(response)
    return
  }

  response.writeHead(200, {
    "content-type": types[path.extname(file)] ?? "application/octet-stream",
    "cache-control": "no-store",
  })
  if (request.method === "HEAD") response.end()
  else createReadStream(file).pipe(response)
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving static export at http://127.0.0.1:${port}`)
})
