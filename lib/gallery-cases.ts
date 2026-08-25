import galleryAssets from "@/lib/gallery-assets.json"

type GalleryAsset = {
  id: string
  caseId?: string
  file: string
  width: number
  height: number
  viewLabel: string
  comparisonLayout: "vertical" | "horizontal"
  comparisonLabel: string
}

export type GalleryCaseImage = {
  imagePath: string
  alt: string
  width: number
  height: number
  viewLabel: string
  comparisonLayout: "vertical" | "horizontal"
  comparisonLabel: string
}

export type GalleryCase = {
  id: string
  slug?: string
  title: string
  category: "cosmetic" | "reconstructive"
  categoryLabel: string
  focus: string
  presentation: string
  technique: string
  images: GalleryCaseImage[]
  relatedProcedureSlugs?: string[]
  sensitive?: boolean
  sensitiveLabel?: string
}

const assets = galleryAssets as GalleryAsset[]

function assetsFor(caseId: string, alt: string): GalleryCaseImage[] {
  const caseAssets = assets.filter((asset) => (asset.caseId ?? asset.id) === caseId)

  if (caseAssets.length === 0) {
    throw new Error(`Missing gallery asset manifest entry for ${caseId}`)
  }

  return caseAssets.map((asset) => ({
    imagePath: `/images/cases/${asset.file}`,
    alt: `${alt}, ${asset.viewLabel.toLowerCase()}`,
    width: asset.width,
    height: asset.height,
    viewLabel: asset.viewLabel,
    comparisonLayout: asset.comparisonLayout,
    comparisonLabel: asset.comparisonLabel,
  }))
}

const galleryCases: GalleryCase[] = [
  {
    id: "upper-lower-blepharoplasty",
    title: "Upper and Lower Blepharoplasty",
    category: "cosmetic",
    categoryLabel: "Cosmetic Surgery",
    focus: "Multi-Angle Eyelid Rejuvenation",
    presentation:
      "The patient sought improvement in upper-eyelid heaviness and lower-eyelid fullness.",
    technique:
      "Upper and lower blepharoplasty was performed. Frontal and oblique photographs document the result from three matched viewpoints.",
    relatedProcedureSlugs: ["upper-blepharoplasty", "lower-blepharoplasty"],
    images: assetsFor(
      "upper-lower-blepharoplasty",
      "Before and after upper and lower blepharoplasty"
    ),
  },
  {
    id: "upper-blepharoplasty",
    title: "Upper Blepharoplasty",
    category: "cosmetic",
    categoryLabel: "Cosmetic Surgery",
    focus: "Upper-Eyelid Contour",
    presentation:
      "The patient sought improvement in upper-eyelid heaviness and hooding.",
    technique:
      "Upper blepharoplasty was performed with the goal of reducing excess upper-eyelid tissue while preserving a natural contour. Three viewpoints are included.",
    relatedProcedureSlugs: ["upper-blepharoplasty"],
    images: assetsFor("upper-blepharoplasty", "Before and after upper blepharoplasty"),
  },
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
    relatedProcedureSlugs: ["lower-blepharoplasty"],
    images: assetsFor(
      "lower-blepharoplasty",
      "Before and after lower blepharoplasty showing under-eye rejuvenation"
    ),
  },
  {
    id: "periocular-lesion-removal",
    title: "Periocular Lesion Removal",
    category: "reconstructive",
    categoryLabel: "Periocular Surgery",
    focus: "Inner Eyelid Region",
    presentation:
      "A periocular lesion near the inner eyelid region was evaluated for removal.",
    technique:
      "The supplied photographs document the lesion before treatment and the healed appearance after removal.",
    relatedProcedureSlugs: ["eyelid-cancer-mohs-reconstruction"],
    images: assetsFor(
      "periocular-lesion-removal",
      "Before and after removal of a lesion near the inner eyelid region"
    ),
    sensitive: true,
    sensitiveLabel: "This comparison includes a visible periocular lesion before treatment.",
  },
  {
    id: "eyelid-trauma",
    slug: "mohs-eyelid-reconstruction",
    title: "Mohs Cancer Removal Reconstruction",
    category: "reconstructive",
    categoryLabel: "Reconstructive Oculoplastics",
    focus: "Eyelid Margin Reconstruction",
    presentation:
      "The patient had a full-thickness eyelid defect after Mohs surgery for periocular skin cancer.",
    technique:
      "The eyelid layers were reconstructed and carefully aligned to restore margin position, support eyelid closure, and protect the ocular surface.",
    relatedProcedureSlugs: ["eyelid-cancer-mohs-reconstruction"],
    images: assetsFor(
      "eyelid-trauma",
      "Before and after Mohs cancer removal eyelid reconstruction"
    ),
    sensitive: true,
    sensitiveLabel: "This comparison includes a visible eyelid surgical defect.",
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
    relatedProcedureSlugs: ["eyelid-cancer-mohs-reconstruction"],
    images: assetsFor(
      "scalp-reconstruction",
      "Before and after scalp reconstruction showing Mohs defect closure"
    ),
    sensitive: true,
    sensitiveLabel: "This comparison includes an open scalp surgical defect.",
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
    relatedProcedureSlugs: ["eyelid-cancer-mohs-reconstruction"],
    images: assetsFor(
      "eyebrow-reconstruction",
      "Before and after forehead and eyebrow reconstruction"
    ),
    sensitive: true,
    sensitiveLabel: "This comparison includes a visible forehead surgical defect.",
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

export function getPublishedGalleryCase(id: string): GalleryCase | undefined {
  return getPublishedGalleryCases().find((item) => item.id === id || item.slug === id)
}

export function galleryCasePath(item: Pick<GalleryCase, "id" | "slug">): string {
  return `/gallery/${item.slug ?? item.id}`
}
