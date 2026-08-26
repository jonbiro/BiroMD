export const brandAssetVersion = "20260825-dark-symbol-contrast"

export function versionedBrandAsset(path: string) {
  const separator = path.includes("?") ? "&" : "?"
  return `${path}${separator}v=${brandAssetVersion}`
}
