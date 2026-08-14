import { spawnSync } from "node:child_process"
import { assetCaseId, loadManifest } from "./gallery-assets.mjs"

const manifest = await loadManifest()
const authorizedCaseIds = [...new Set(manifest.map(assetCaseId))].join(",")
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm"
const environment = {
  ...process.env,
  GALLERY_AUTHORIZED_CASE_IDS: authorizedCaseIds,
}

for (const args of [
  ["run", "build"],
  ["run", "verify:export"],
  ["run", "test:e2e"],
]) {
  const result = spawnSync(npmCommand, args, {
    env: environment,
    stdio: "inherit",
  })

  if (result.status !== 0) process.exit(result.status ?? 1)
}
