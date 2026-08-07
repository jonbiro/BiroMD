import galleryAssets from "@/lib/gallery-assets.json"

export type GalleryCase = {
  id: string
  title: string
  category: "cosmetic" | "reconstructive"
  categoryLabel: string
  focus: string
  presentation: string
  technique: string
  imagePath: string
  alt: string
  comparisonLayout: "vertical" | "horizontal"
  comparisonLabel: string
}

const assetsById = new Map(galleryAssets.map((asset) => [asset.id, asset]))

function assetFor(id: string) {
  const asset = assetsById.get(id)

  if (!asset) {
    throw new Error(`Missing gallery asset manifest entry for ${id}`)
  }

  return {
    imagePath: `/images/cases/${asset.file}`,
    comparisonLayout: asset.comparisonLayout as GalleryCase["comparisonLayout"],
    comparisonLabel: asset.comparisonLabel,
  }
}

const galleryCases: GalleryCase[] = [
  {
    id: "lower-blepharoplasty",
    title: "Lower Blepharoplasty",
    category: "cosmetic",
    categoryLabel: "Cosmetic Surgery",
    focus: "Under-Eye Rejuvenation",
    presentation:
      "The patient presented with prominent lower-eyelid fat pads that contributed to a persistently tired appearance.",
    technique:
      "A transconjunctival lower blepharoplasty was performed. Fat was conservatively repositioned and contoured to soften the lid-cheek junction while avoiding an over-hollowed appearance.",
    alt: "Before and after lower blepharoplasty showing under-eye rejuvenation",
    ...assetFor("lower-blepharoplasty"),
  },
  {
    id: "eyelid-trauma",
    title: "Mohs Cancer Removal Reconstruction",
    category: "reconstructive",
    categoryLabel: "Reconstructive Oculoplastics",
    focus: "Eyelid Margin Reconstruction",
    presentation:
      "The patient had a full-thickness eyelid defect after Mohs surgery for periocular skin cancer.",
    technique:
      "The eyelid layers were reconstructed and carefully aligned to restore margin position, support eyelid closure, and protect the ocular surface.",
    alt: "Before and after Mohs cancer removal eyelid reconstruction",
    ...assetFor("eyelid-trauma"),
  },
  {
    id: "scalp-reconstruction",
    title: "Scalp Defect Reconstruction",
    category: "reconstructive",
    categoryLabel: "Reconstructive Surgery",
    focus: "Mohs Defect Closure",
    presentation:
      "The patient had a large scalp defect after Mohs surgery for skin cancer removal.",
    technique:
      "A rotational flap was designed and advanced to close the defect with reduced tension while preserving the surrounding hair-bearing tissue.",
    alt: "Before and after scalp reconstruction showing Mohs defect closure",
    ...assetFor("scalp-reconstruction"),
  },
  {
    id: "eyebrow-reconstruction",
    title: "Eyebrow and Forehead Reconstruction",
    category: "reconstructive",
    categoryLabel: "Reconstructive Oculoplastics",
    focus: "Forehead Defect Repair",
    presentation:
      "The patient had a surgical defect above the eyebrow and lateral forehead after skin cancer excision.",
    technique:
      "An advancement-transposition flap was planned along natural forehead lines to close the defect while limiting distortion of the eyebrow.",
    alt: "Before and after forehead and eyebrow reconstruction",
    ...assetFor("eyebrow-reconstruction"),
  },
]

export function getAuthorizedGalleryCaseIds(): Set<string> {
  return new Set(
    (process.env.GALLERY_AUTHORIZED_CASE_IDS ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
  )
}

export function getPublishedGalleryCases(): GalleryCase[] {
  const authorizedIds = getAuthorizedGalleryCaseIds()
  return galleryCases.filter((item) => authorizedIds.has(item.id))
}
