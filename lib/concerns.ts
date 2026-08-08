export type PatientConcern = {
  slug: string
  title: string
  shortTitle: string
  summary: string
  overview: string
  possibleContributors: string[]
  evaluation: string[]
  urgency: string
  urgentPage?: boolean
  relatedProcedureSlugs: string[]
  sources: Array<{ label: string; url: string }>
}

export const patientConcerns: PatientConcern[] = [
  {
    slug: "droopy-heavy-upper-eyelids",
    title: "Droopy or Heavy Upper Eyelids",
    shortTitle: "Droopy or heavy upper eyelids",
    summary:
      "Understand why a low or heavy upper eyelid may involve the eyelid skin, lifting mechanism, brow position, or more than one factor.",
    overview:
      "Upper-eyelid heaviness is not one diagnosis. Excess skin or fullness can weigh on the lid, the eyelid itself may sit low because of ptosis, and brow position can change how much tissue rests over the eye. An examination helps separate these contributors before cosmetic or function-related treatment is considered.",
    possibleContributors: [
      "Excess upper-eyelid skin or fullness",
      "Ptosis involving the eyelid lifting mechanism",
      "Low or asymmetric brow position",
      "Prior surgery, trauma, nerve or muscle conditions, or natural asymmetry",
    ],
    evaluation: [
      "When the change began and whether it varies during the day",
      "Eyelid height, crease, lifting-muscle function, and brow position",
      "Pupils, eye movements, ocular surface, and eyelid closure",
      "Whether blepharoplasty, ptosis repair, brow treatment, observation, or another evaluation may be appropriate",
    ],
    urgency:
      "A suddenly drooping eyelid, especially with double vision, a pupil change, weakness, severe headache, eye pain, or another neurologic symptom, needs urgent medical evaluation rather than a routine appointment request.",
    relatedProcedureSlugs: ["upper-blepharoplasty", "ptosis-repair", "brow-lift"],
    sources: [
      {
        label: "American Academy of Ophthalmology: Eyelid Surgery",
        url: "https://store.aao.org/media/resources/051185/051185-eyelid-surgery-rf1.pdf",
      },
      {
        label: "American Academy of Ophthalmology: Ptosis",
        url: "https://store.aao.org/media/resources/051207/051207-ptosis-rf1.pdf",
      },
      {
        label: "American Academy of Ophthalmology EyeWiki: Brow Ptosis and Repair",
        url: "https://eyewiki.aao.org/Brow_Ptosis_and_Repair",
      },
    ],
  },
  {
    slug: "under-eye-bags",
    title: "Under-Eye Bags or Fullness",
    shortTitle: "Under-eye bags or fullness",
    summary:
      "Learn what an anatomy-focused evaluation considers when lower-eyelid fullness, skin change, or the lid-cheek contour creates a tired appearance.",
    overview:
      "The area beneath the eyes includes thin skin, eyelid support structures, fat, muscle, and the transition into the cheek. A visible bag or hollow can reflect more than one of these features. Treatment planning should also account for eye prominence, dry-eye symptoms, prior filler or surgery, and the risk of changing lower-eyelid position.",
    possibleContributors: [
      "Prominent or displaced lower-eyelid fat",
      "Skin and soft-tissue changes",
      "A deep or irregular transition between the lower eyelid and cheek",
      "Eyelid support, swelling tendency, prior filler, or prior surgery",
    ],
    evaluation: [
      "Lower-eyelid position, tone, closure, and support",
      "Distribution of skin, fat, volume, and shadow around the lid-cheek junction",
      "Ocular-surface symptoms, prior procedures, and baseline asymmetry",
      "Whether observation, surgery, a nonsurgical option, or no treatment is the most appropriate path",
    ],
    urgency:
      "New painful swelling, major trauma, increasing redness, severe eye pain, or any visual change should be assessed promptly rather than treated as a routine cosmetic concern.",
    relatedProcedureSlugs: ["lower-blepharoplasty", "dermal-fillers"],
    sources: [
      {
        label: "American Academy of Ophthalmology: Eyelid Surgery",
        url: "https://store.aao.org/media/resources/051185/051185-eyelid-surgery-rf1.pdf",
      },
      {
        label: "U.S. FDA: Dermal Fillers",
        url: "https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/dermal-fillers-soft-tissue-fillers",
      },
    ],
  },
  {
    slug: "constant-watery-eyes",
    title: "Constant Watery Eyes",
    shortTitle: "Constant watery eyes",
    summary:
      "Persistent tearing may come from eye-surface irritation, eyelid position, blink function, or narrowing within the tear-drainage pathway.",
    overview:
      "Tears can run down the cheek because the eyes are producing extra tears, because the eyelids are not directing tears normally, or because drainage is narrowed. Dryness and irritation can paradoxically trigger reflex tearing, so treatment should follow an examination instead of assuming every watery eye is a blocked tear duct.",
    possibleContributors: [
      "Dryness, allergy, inflammation, or another source of ocular-surface irritation",
      "An eyelid-position or blink problem",
      "Narrowing at the tear opening or farther along the drainage pathway",
      "Prior infection, trauma, surgery, facial weakness, or sinus-related history",
    ],
    evaluation: [
      "Pattern, duration, triggers, discharge, and whether one or both eyes are affected",
      "Ocular surface, blink, eyelid position, and tear openings",
      "Selected drainage testing when appropriate",
      "Whether care should focus on the eye surface, eyelid, drainage pathway, or another specialty",
    ],
    urgency:
      "Painful swelling near the inner corner of the eye, fever, rapidly increasing redness, significant eye pain, or reduced vision requires prompt medical evaluation.",
    relatedProcedureSlugs: ["tearing-blocked-tear-ducts", "entropion-ectropion-repair"],
    sources: [
      {
        label: "American Academy of Ophthalmology EyeWiki: Acquired Tear-Duct Obstruction",
        url: "https://eyewiki.aao.org/Secondary_Acquired_Nasolacrimal_Duct_Obstruction",
      },
      {
        label: "American Academy of Ophthalmology EyeWiki: Canalicular Obstruction",
        url: "https://eyewiki.aao.org/Canalicular_obstruction",
      },
    ],
  },
  {
    slug: "eyelid-turning-in-or-out",
    title: "Eyelid Turning Inward or Outward",
    shortTitle: "Eyelid turning inward or outward",
    summary:
      "An eyelid that rolls inward or pulls away from the eye can interfere with lubrication, closure, tear drainage, and corneal protection.",
    overview:
      "Entropion turns the eyelid inward and can bring lashes or skin against the eye. Ectropion turns the eyelid outward and may expose the surface or move the tear opening away from the tear lake. The specific combination of laxity, scarring, weakness, and tissue position determines the appropriate treatment.",
    possibleContributors: [
      "Age-related eyelid laxity",
      "Scarring after surgery, trauma, inflammation, or skin change",
      "Facial nerve weakness or reduced eyelid muscle tone",
      "A mass, tissue weight, or less common congenital factor",
    ],
    evaluation: [
      "Eyelid position, tension, support, and the direction of tissue pull",
      "Cornea, lubrication, closure, and signs of ocular-surface injury",
      "Facial nerve function, scars, prior procedures, and contributing conditions",
      "Temporary eye protection and options for definitive correction",
    ],
    urgency:
      "Increasing pain, marked light sensitivity, inability to close the eye, or reduced vision may indicate surface injury and warrants prompt eye evaluation.",
    relatedProcedureSlugs: ["entropion-ectropion-repair", "tearing-blocked-tear-ducts"],
    sources: [
      {
        label: "American Academy of Ophthalmology EyeWiki: Entropion",
        url: "https://eyewiki.aao.org/Entropion",
      },
      {
        label: "American Academy of Ophthalmology EyeWiki: Ectropion",
        url: "https://eyewiki.aao.org/Ectropion",
      },
    ],
  },
  {
    slug: "eyelid-lesion-mohs-reconstruction",
    title: "Eyelid Lesions and Reconstruction After Mohs",
    shortTitle: "Eyelid lesion or Mohs reconstruction",
    summary:
      "Evaluation and reconstructive planning for eyelid or periocular lesions, biopsy sites, and defects after skin-cancer removal.",
    overview:
      "A bump, sore, or changing area near the eye cannot be identified reliably from appearance alone. When skin cancer is diagnosed and removed, the remaining defect may involve skin, muscle, the eyelid margin, tear drainage structures, or deeper tissue. Reconstruction is planned around the final cleared defect and the need to protect the eye.",
    possibleContributors: [
      "Benign growths, cysts, or inflammatory lesions",
      "Sun-related skin change or a lesion requiring biopsy",
      "A planned Mohs procedure near the eyelid, brow, or cheek",
      "A defect after biopsy, cancer excision, trauma, or prior reconstruction",
    ],
    evaluation: [
      "Location, duration, growth, symptoms, and prior biopsy or pathology information",
      "Eyelid margin, closure, tear drainage, and nearby ocular structures",
      "Coordination with dermatology, Mohs surgery, pathology, or another treating clinician",
      "Reconstructive priorities, alternatives, wound care, and follow-up",
    ],
    urgency:
      "A rapidly changing or bleeding lesion deserves timely medical assessment. Inability to close the eye, severe pain, significant trauma, or visual change requires more urgent evaluation.",
    relatedProcedureSlugs: ["eyelid-cancer-mohs-reconstruction"],
    sources: [
      {
        label: "American Academy of Ophthalmology EyeWiki: Eyelid Reconstruction",
        url: "https://eyewiki.aao.org/Eyelid_Reconstruction",
      },
      {
        label: "American Academy of Ophthalmology EyeWiki: Mohs Micrographic Surgery",
        url: "https://eyewiki.aao.org/Mohs_Micrographic_Surgery",
      },
    ],
  },
  {
    slug: "bulging-eyes-thyroid-eye-disease",
    title: "Bulging Eyes or Thyroid Eye Disease",
    shortTitle: "Bulging eyes or thyroid eye disease",
    summary:
      "Eye prominence, eyelid retraction, swelling, or double vision may require coordinated evaluation of the eyelids, eye surface, movement, orbit, and vision.",
    overview:
      "Thyroid eye disease can affect the tissues around and behind the eyes, but not every prominent or displaced eye has the same cause. Eye findings can also differ from thyroid blood-test activity. A focused examination helps assess severity, activity, exposure, alignment, and whether imaging or multidisciplinary care is appropriate.",
    possibleContributors: [
      "Thyroid eye disease or another inflammatory orbital condition",
      "Eyelid retraction or globe-position differences",
      "A structural, vascular, traumatic, or mass-related orbital process",
      "Natural asymmetry or prior orbital treatment",
    ],
    evaluation: [
      "Vision, pupils, color perception, eye pressure, and visual fields when indicated",
      "Eye movement, double vision, globe position, and eyelid closure",
      "Ocular-surface exposure and orbital or thyroid history",
      "Whether imaging, medical care, observation, surgery, or coordinated specialty treatment is needed",
    ],
    urgency:
      "New loss of vision, reduced color perception, severe pain, a pupil change, rapidly increasing prominence, or rapidly worsening double vision requires urgent eye evaluation.",
    relatedProcedureSlugs: ["thyroid-eye-disease", "orbital-tumors-trauma"],
    sources: [
      {
        label: "American Academy of Ophthalmology EyeWiki: Thyroid Eye Disease",
        url: "https://eyewiki.aao.org/Thyroid_Eye_Disease",
      },
      {
        label: "American Academy of Ophthalmology EyeWiki: Orbital Masses",
        url: "https://eyewiki.aao.org/Orbital_Masses",
      },
    ],
  },
  {
    slug: "sudden-eyelid-drooping",
    title: "Sudden Eyelid Drooping",
    shortTitle: "Sudden eyelid drooping",
    summary:
      "A newly drooping eyelid can require urgent assessment, particularly when it appears with double vision, pupil change, weakness, severe headache, or pain.",
    overview:
      "A sudden change in eyelid height should not be treated as a routine cosmetic concern. Ptosis can arise from the eyelid lifting mechanism, a nerve or muscle problem, trauma, or another condition. The timing and associated eye or neurologic findings determine how urgently it should be evaluated.",
    possibleContributors: [
      "A change affecting the eyelid lifting mechanism",
      "A nerve or muscle disorder",
      "Trauma, surgery, swelling, or another local process",
      "A condition that requires neurologic, emergency, or multidisciplinary assessment",
    ],
    evaluation: [
      "Exact time of onset, progression, variability, and associated symptoms",
      "Pupils, eye movements, vision, eyelid measurements, and neurologic signs",
      "Recent trauma, surgery, medication changes, illness, or prior episodes",
      "Whether emergency testing, imaging, another specialist, or later eyelid treatment is appropriate",
    ],
    urgency:
      "Seek urgent medical care for sudden eyelid drooping with double vision, an unequal or changing pupil, weakness, facial asymmetry, severe headache, eye pain, vision loss, major trauma, or another rapidly worsening symptom. Do not wait for a website appointment request.",
    urgentPage: true,
    relatedProcedureSlugs: ["ptosis-repair", "orbital-tumors-trauma"],
    sources: [
      {
        label: "American Academy of Ophthalmology: Ptosis",
        url: "https://store.aao.org/media/resources/051207/051207-ptosis-rf1.pdf",
      },
    ],
  },
]

export function getPatientConcern(slug: string): PatientConcern | undefined {
  return patientConcerns.find((concern) => concern.slug === slug)
}
