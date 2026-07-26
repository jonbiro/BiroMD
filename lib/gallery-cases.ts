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
    imagePath: "/images/cases/scalp-reconstruction.jpg",
    alt: "Before and after lower blepharoplasty showing under-eye rejuvenation",
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
    imagePath: "/images/cases/eyelid-trauma-repair.jpg",
    alt: "Before and after Mohs cancer removal eyelid reconstruction",
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
    imagePath: "/images/cases/lower-blepharoplasty.jpg",
    alt: "Before and after scalp reconstruction showing Mohs defect closure",
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
    imagePath: "/images/cases/eyebrow-defect-reconstruction.jpg",
    alt: "Before and after forehead and eyebrow reconstruction",
  },
]

export function getPublishedGalleryCases(): GalleryCase[] {
  const authorizedIds = new Set(
    (process.env.GALLERY_AUTHORIZED_CASE_IDS ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
  )

  return galleryCases.filter((item) => authorizedIds.has(item.id))
}
