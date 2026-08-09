export const brandAssetVersion = "20260808-headshot"

export function versionedBrandAsset(path: string) {
  const separator = path.includes("?") ? "&" : "?"
  return `${path}${separator}v=${brandAssetVersion}`
}
