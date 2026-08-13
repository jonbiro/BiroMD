export const brandAssetVersion = "20260812-practice-symbol"

export function versionedBrandAsset(path: string) {
  const separator = path.includes("?") ? "&" : "?"
  return `${path}${separator}v=${brandAssetVersion}`
}
