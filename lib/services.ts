import { getProceduresByCategory, type ProcedureCategoryId } from "@/lib/procedures"

export const servicePathways = [
  {
    id: "cosmetic-eyelid-surgery",
    title: "Cosmetic Eyelid Surgery",
    summary:
      "Surgical planning for excess eyelid skin, lower-eyelid fullness, brow position, or age-related changes around the eyes.",
    highlights: ["Upper blepharoplasty", "Lower blepharoplasty", "Brow lift evaluation"],
  },
  {
    id: "reconstructive-oculoplastics",
    title: "Reconstructive Oculoplastics",
    summary:
      "Evaluation and repair of eyelid, tear-duct, and orbital conditions affecting comfort, eye protection, vision, or appearance.",
    highlights: [
      "Ptosis and eyelid-position repair",
      "Skin-cancer and Mohs reconstruction",
      "Tear-duct and orbital care",
    ],
  },
  {
    id: "non-surgical-treatments",
    title: "Injectables",
    summary:
      "Conservative injectable options for selected patients after an assessment of anatomy, goals, and medical history.",
    highlights: ["Botulinum toxin injections", "Dermal fillers"],
  },
] as const satisfies ReadonlyArray<{
  id: ProcedureCategoryId
  title: string
  summary: string
  highlights: readonly string[]
}>

export const procedureCategories = servicePathways.map((category) => ({
  ...category,
  subtitle: category.summary,
  items: getProceduresByCategory(category.id),
}))
