export const brandAssetVersion = "20260808-burbank-office"

export function versionedBrandAsset(path: string) {
  const separator = path.includes("?") ? "&" : "?"
  return `${path}${separator}v=${brandAssetVersion}`
}
