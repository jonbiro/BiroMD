export type ProcedureCategoryId =
  | "cosmetic-eyelid-surgery"
  | "reconstructive-oculoplastics"
  | "non-surgical-treatments"

export type Procedure = {
  slug: string
  title: string
  shortTitle: string
  seoTitle?: string
  seoDescription?: string
  categoryId: ProcedureCategoryId
  categoryLabel: string
  summary: string
  overview: string
  concerns: string[]
  evaluation: string[]
  nextSteps: string
  relatedProcedureSlugs?: string[]
  questions: Array<{ question: string; answer: string }>
  sources: Array<{ label: string; url: string }>
}

export const procedures: Procedure[] = [
  {
    slug: "upper-blepharoplasty",
    title: "Upper Blepharoplasty",
    shortTitle: "Upper blepharoplasty",
    seoTitle: "Upper Blepharoplasty in Los Angeles",
    seoDescription:
      "Learn how upper eyelid surgery may address heavy or hooded lids and how Dr. Nicolas Biro evaluates skin, ptosis, brow position, and eye-surface factors.",
    categoryId: "cosmetic-eyelid-surgery",
    categoryLabel: "Cosmetic Eyelid Surgery",
    summary:
      "Upper eyelid surgery for heavy or hooded lids, planned around brow position, eyelid height, dryness, and comfortable eyelid closure.",
    overview:
      "Upper blepharoplasty removes a carefully planned amount of upper-eyelid skin and, when appropriate, addresses underlying tissue. Planning must account for brow position, eyelid height, dry-eye symptoms, prior surgery, and the need to preserve comfortable eyelid closure.",
    concerns: [
      "Upper-lid skin that feels heavy or obscures the eyelid crease",
      "A persistently tired appearance around the upper eyes",
      "Asymmetry or changes that may involve both the brow and eyelid",
      "Questions about cosmetic versus function-related treatment",
    ],
    evaluation: [
      "Eye and eyelid history, including dryness and previous procedures",
      "Upper-eyelid skin, crease, eyelid height, and brow position",
      "Goals, alternatives, and whether another condition contributes",
      "Meaningful risks and instructions specific to the proposed plan",
    ],
    nextSteps:
      "Swelling, bruising, incision care, activity limits, and follow-up vary with the operation and the patient. The office provides a personalized plan before surgery. Sudden vision change, severe pain, or unexpected bleeding after any eyelid operation requires urgent contact with the surgical team.",
    relatedProcedureSlugs: ["ptosis-repair", "brow-lift"],
    questions: [
      {
        question: "Is upper blepharoplasty the same as ptosis repair?",
        answer:
          "No. Blepharoplasty generally addresses excess skin or tissue, while ptosis repair raises an eyelid whose lifting mechanism is not holding it at the expected height. Some patients need evaluation for both.",
      },
      {
        question: "Will the brow be evaluated too?",
        answer:
          "Yes. Brow position can influence upper-eyelid appearance, so it should be considered before deciding which treatment is appropriate.",
      },
      {
        question: "Can candidacy be determined from a photo?",
        answer:
          "A photo can provide limited context, but candidacy and a safe plan require an appropriate history and examination.",
      },
      {
        question: "Can insurance apply to upper blepharoplasty?",
        answer:
          "Coverage depends on the diagnosis, documented functional impact, the insurer's criteria, network participation, and the specific plan. The office can explain its process, but only the insurer can determine benefits or authorize coverage.",
      },
      {
        question: "What determines the cost of upper blepharoplasty?",
        answer:
          "Fees can depend on the surgical plan, whether another procedure is combined, the facility, anesthesia, and the office's payment policies. Ask the selected office for current, written fee information before scheduling.",
      },
    ],
    sources: [
      {
        label: "American Academy of Ophthalmology: Eyelid Surgery",
        url: "https://store.aao.org/media/resources/051185/051185-eyelid-surgery-rf1.pdf",
      },
    ],
  },
  {
    slug: "lower-blepharoplasty",
    title: "Lower Blepharoplasty",
    shortTitle: "Lower blepharoplasty",
    seoTitle: "Lower Blepharoplasty for Under-Eye Bags in Los Angeles",
    seoDescription:
      "Learn how lower eyelid surgery may address under-eye bags and how Dr. Nicolas Biro evaluates eyelid support, eye prominence, skin, fat, and the lid-cheek contour.",
    categoryId: "cosmetic-eyelid-surgery",
    categoryLabel: "Cosmetic Eyelid Surgery",
    summary:
      "Lower eyelid surgery for under-eye bags, fullness, and contour changes, planned around eyelid support and a natural lid-cheek transition.",
    overview:
      "Lower blepharoplasty may address prominent fat, skin, and the transition between the lower eyelid and cheek. The technique depends on eyelid support, eye prominence, skin quality, prior procedures, and whether fat should be preserved, repositioned, or reduced.",
    concerns: [
      "Under-eye fullness or bags",
      "A deep or irregular lid-cheek transition",
      "Lower-eyelid skin changes",
      "Asymmetry or changes after a prior procedure",
    ],
    evaluation: [
      "Lower-eyelid position, tone, and support",
      "Ocular-surface symptoms and ability to close the eyes",
      "Distribution of skin, fat, and volume around the cheek",
      "Options, tradeoffs, and the possibility of combined treatment",
    ],
    nextSteps:
      "The operative approach and recovery plan are individualized. Temporary swelling, bruising, tightness, or dryness can occur. Follow the surgeon's instructions and report vision changes, severe pain, or other unexpected symptoms promptly.",
    questions: [
      {
        question: "Does every lower blepharoplasty remove fat?",
        answer:
          "No. Depending on anatomy, tissue may be repositioned, reduced conservatively, preserved, or addressed with another technique.",
      },
      {
        question: "Can lower-eyelid support affect the plan?",
        answer:
          "Yes. Eyelid tone, position, and facial support are important because they can affect both technique and risk.",
      },
      {
        question: "Are results identical from patient to patient?",
        answer:
          "No. Anatomy, healing, prior surgery, and the selected technique all influence the result.",
      },
    ],
    sources: [
      {
        label: "American Academy of Ophthalmology: Eyelid Surgery",
        url: "https://store.aao.org/media/resources/051185/051185-eyelid-surgery-rf1.pdf",
      },
    ],
  },
  {
    slug: "brow-lift",
    title: "Brow Lift Evaluation",
    shortTitle: "Brow lift evaluation",
    categoryId: "cosmetic-eyelid-surgery",
    categoryLabel: "Cosmetic Eyelid Surgery",
    summary:
      "Assessment of brow position when it contributes to upper-eyelid heaviness, asymmetry, or facial balance concerns.",
    overview:
      "The brow and upper eyelid function as a connected unit. A brow lift may be considered when brow descent contributes meaningfully to heaviness or asymmetry, but it is not the right treatment for every upper-eyelid concern. Planning considers hairline, forehead anatomy, facial nerve function, and patient goals.",
    concerns: [
      "Low or asymmetric brow position",
      "Compensatory forehead lifting or fatigue",
      "Upper-eyelid heaviness influenced by the brow",
      "Questions about brow treatment versus eyelid surgery",
    ],
    evaluation: [
      "Brow position at rest and with facial movement",
      "Upper-eyelid skin and eyelid height",
      "Hairline, forehead, and prior facial procedures",
      "Expected scar placement, tradeoffs, and alternatives",
    ],
    nextSteps:
      "Recovery and incision care depend on the selected approach. The consultation should clarify what change is realistic, how the brow and eyelid plans interact, and which symptoms require a call after treatment.",
    questions: [
      {
        question: "Does a low brow always require surgery?",
        answer:
          "No. Treatment depends on symptoms, anatomy, goals, and whether the brow position is actually driving the concern.",
      },
      {
        question: "Can brow and eyelid surgery be considered together?",
        answer:
          "They can be evaluated together because changing one can affect the appearance and function of the other.",
      },
      {
        question: "Will the brow look surprised?",
        answer:
          "The goal and degree of change are discussed before treatment. No specific result can be guaranteed, and conservative planning is important.",
      },
    ],
    sources: [
      {
        label: "American Academy of Ophthalmology EyeWiki: Brow Ptosis and Repair",
        url: "https://eyewiki.aao.org/Brow_Ptosis_and_Repair",
      },
    ],
  },
  {
    slug: "ptosis-repair",
    title: "Ptosis Repair",
    shortTitle: "Ptosis repair",
    categoryId: "reconstructive-oculoplastics",
    categoryLabel: "Reconstructive Oculoplastics",
    summary:
      "Evaluation and repair of an upper eyelid that sits lower than expected because of its lifting mechanism.",
    overview:
      "Ptosis is drooping of the upper eyelid. It can be age-related, present from birth, follow surgery or trauma, or be associated with neurologic or muscular conditions. The cause, eyelid muscle function, eye movement, pupil findings, and visual impact guide the workup and treatment plan.",
    concerns: [
      "One or both upper eyelids sit low",
      "Reduced superior field of view or difficulty with reading",
      "Brow lifting or head posture used to see beneath the lid",
      "New, changing, or unequal eyelid position",
    ],
    evaluation: [
      "Timing and progression of the droop",
      "Eyelid measurements and lifting-muscle function",
      "Pupils, eye movements, neurologic signs, and ocular surface",
      "Whether testing or another medical evaluation is needed first",
    ],
    nextSteps:
      "The repair is selected according to the cause and muscle function. Eyelid height and contour can change during healing, and asymmetry or further adjustment may occur. Sudden ptosis, especially with double vision, pupil change, weakness, or severe headache, needs urgent medical evaluation rather than routine web scheduling.",
    questions: [
      {
        question: "Is ptosis repair cosmetic?",
        answer:
          "Ptosis can affect appearance, but it may also affect vision and eyelid function. The evaluation determines the cause and functional impact.",
      },
      {
        question: "Why are pupils and eye movements checked?",
        answer:
          "Some neurologic or muscular conditions can cause ptosis, so the examination must look beyond the eyelid itself.",
      },
      {
        question: "Can both eyelids change after one side is repaired?",
        answer:
          "The eyelids are neurologically linked, and their relative heights can change. This possibility is part of surgical planning and consent.",
      },
    ],
    sources: [
      {
        label: "American Academy of Ophthalmology: Ptosis",
        url: "https://store.aao.org/media/resources/051207/051207-ptosis-rf1.pdf",
      },
    ],
  },
  {
    slug: "entropion-ectropion-repair",
    title: "Entropion and Ectropion Repair",
    shortTitle: "Entropion and ectropion repair",
    categoryId: "reconstructive-oculoplastics",
    categoryLabel: "Reconstructive Oculoplastics",
    summary:
      "Treatment planning for an eyelid that turns inward or outward and no longer protects or lubricates the eye normally.",
    overview:
      "Entropion turns the eyelid inward, allowing lashes or skin to rub the eye. Ectropion turns it outward, which can interfere with closure, tear drainage, and surface protection. Age-related laxity is common, but scarring, facial nerve weakness, prior surgery, and masses can also contribute.",
    concerns: [
      "Lashes rubbing the eye or a persistent foreign-body sensation",
      "Tearing, redness, discharge, or surface irritation",
      "An eyelid that visibly rolls inward or pulls away from the eye",
      "Difficulty closing the eye after facial weakness, trauma, or surgery",
    ],
    evaluation: [
      "Eyelid position, laxity, and the structures causing the malposition",
      "Corneal and ocular-surface health",
      "Facial nerve function, scars, prior surgery, and contributing conditions",
      "Temporary protection and definitive repair options",
    ],
    nextSteps:
      "Lubrication or temporary measures may protect the eye while definitive care is planned, but the underlying cause determines treatment. Increasing pain, light sensitivity, or reduced vision warrants prompt eye evaluation.",
    questions: [
      {
        question: "Can drops correct eyelid position?",
        answer:
          "Lubrication can reduce surface symptoms, but it generally does not correct structural eyelid malposition.",
      },
      {
        question: "Is repair the same for every patient?",
        answer:
          "No. Repair targets the specific combination of laxity, muscle weakness, scarring, or tissue displacement found on examination.",
      },
      {
        question: "Why is the eye surface examined?",
        answer:
          "An inward- or outward-turning lid can damage or expose the cornea, so eye protection is a central part of the evaluation.",
      },
    ],
    sources: [
      {
        label: "American Academy of Ophthalmology EyeWiki: Entropion",
        url: "https://eyewiki.aao.org/Entropion",
      },
    ],
  },
  {
    slug: "eyelid-cancer-mohs-reconstruction",
    title: "Eyelid Cancer and Mohs Reconstruction",
    shortTitle: "Eyelid cancer and Mohs reconstruction",
    categoryId: "reconstructive-oculoplastics",
    categoryLabel: "Reconstructive Oculoplastics",
    summary:
      "Eyelid and periocular reconstruction after skin-cancer removal, planned to restore protection, closure, and contour.",
    overview:
      "Removing skin cancer near the eye can leave a defect involving skin, muscle, eyelid margin, tear drainage structures, or deeper tissue. Reconstruction is tailored to the defect after cancer removal and may be coordinated with a Mohs surgeon or another treating specialist.",
    concerns: [
      "A planned Mohs procedure near the eyelid, brow, or cheek",
      "A defect that affects eyelid closure or margin position",
      "Reconstruction after biopsy or cancer excision",
      "Changes in tearing, comfort, or appearance after treatment",
    ],
    evaluation: [
      "Cancer location, pathology information, and the treatment sequence",
      "Likely structures involved and priorities for eye protection",
      "Reconstructive options based on the final defect",
      "Coordination, wound care, follow-up, and warning symptoms",
    ],
    nextSteps:
      "The final defect may differ from estimates made before cancer removal, so the reconstructive plan can change. Healing and scar maturation continue over time. Ongoing skin-cancer surveillance remains with the appropriate treating clinicians.",
    questions: [
      {
        question: "Can reconstruction be planned before Mohs surgery?",
        answer:
          "Coordination can occur in advance, but the definitive reconstruction depends on the size, depth, and location of the final cleared defect.",
      },
      {
        question: "What is the first priority near the eye?",
        answer:
          "Cancer treatment comes first. Reconstruction then prioritizes eye protection, eyelid function, and an anatomically appropriate closure.",
      },
      {
        question: "Will scars disappear completely?",
        answer:
          "All surgery creates scars. Their appearance varies with anatomy, the defect, technique, and individual healing.",
      },
    ],
    sources: [
      {
        label: "American Academy of Ophthalmology EyeWiki: Eyelid Reconstruction",
        url: "https://eyewiki.aao.org/Eyelid_Reconstruction",
      },
    ],
  },
  {
    slug: "tearing-blocked-tear-ducts",
    title: "Tearing and Blocked Tear Ducts",
    shortTitle: "Tearing and blocked tear ducts",
    categoryId: "reconstructive-oculoplastics",
    categoryLabel: "Reconstructive Oculoplastics",
    summary:
      "Evaluation of persistent tearing to identify eyelid, ocular-surface, or tear-drainage causes.",
    overview:
      "Excess tearing can result from irritation and reflex tear production, eyelid-position problems, pump dysfunction, or narrowing within the drainage system. Treatment should follow a focused eye and drainage examination rather than assuming every case is a blocked duct.",
    concerns: [
      "Tears running down the cheek",
      "Recurrent discharge, swelling, or infection near the inner corner",
      "Tearing after trauma, surgery, or facial weakness",
      "Symptoms that are worse outdoors, with irritation, or on one side",
    ],
    evaluation: [
      "Ocular surface, blink, and eyelid position",
      "Tear openings and drainage pathway",
      "History of infection, trauma, sinus disease, and prior procedures",
      "Whether office testing or imaging is appropriate",
    ],
    nextSteps:
      "Treatment may focus on the ocular surface, eyelid position, or drainage pathway depending on the cause. Painful swelling, fever, or rapidly increasing redness near the tear sac requires prompt evaluation.",
    questions: [
      {
        question: "Does watery eye always mean a blocked tear duct?",
        answer:
          "No. Dryness, irritation, eyelid position, and other problems can trigger excess tears even when drainage is open.",
      },
      {
        question: "How is drainage assessed?",
        answer:
          "The examination may include inspection of the tear openings and selected office tests based on symptoms and history.",
      },
      {
        question: "Is surgery always required?",
        answer:
          "No. Treatment depends on the cause and may be medical, eyelid-directed, drainage-directed, or observational.",
      },
    ],
    sources: [
      {
        label: "American Academy of Ophthalmology EyeWiki: Acquired Tear-Duct Obstruction",
        url: "https://eyewiki.aao.org/Secondary_Acquired_Nasolacrimal_Duct_Obstruction",
      },
    ],
  },
  {
    slug: "thyroid-eye-disease",
    title: "Thyroid Eye Disease Evaluation",
    shortTitle: "Thyroid eye disease evaluation",
    categoryId: "reconstructive-oculoplastics",
    categoryLabel: "Orbital Care",
    summary:
      "Eye and orbital evaluation for inflammation and tissue changes associated with autoimmune thyroid disease.",
    overview:
      "Thyroid eye disease can affect eyelid position, eye-surface exposure, eye movement, orbital tissues, and rarely the optic nerve. Eye findings do not always track with thyroid blood-test levels, so coordinated ophthalmic and medical care is important.",
    concerns: [
      "Eye prominence, eyelid retraction, or difficulty closing the eyes",
      "Dryness, redness, pressure, swelling, or light sensitivity",
      "Double vision or restricted eye movement",
      "Color, field, or clarity changes in vision",
    ],
    evaluation: [
      "Vision, pupils, color assessment, pressure, and eye movements",
      "Eyelid closure, ocular-surface exposure, and orbital measurements",
      "Disease activity, smoking exposure, and thyroid-care history",
      "Need for imaging, medical therapy, surgery, or coordinated specialty care",
    ],
    nextSteps:
      "Management depends on disease activity, severity, and which structures are threatened. New loss of vision, reduced color perception, severe pain, or rapidly worsening double vision requires urgent eye evaluation.",
    questions: [
      {
        question: "Can thyroid eye disease occur with normal thyroid levels?",
        answer:
          "Yes. Eye disease and thyroid hormone status do not always follow the same course, which is why both need appropriate evaluation.",
      },
      {
        question: "Why does smoking matter?",
        answer:
          "Smoking is associated with development or worsening of thyroid eye disease. The treating team can discuss cessation resources.",
      },
      {
        question: "Is surgery the first treatment?",
        answer:
          "Not always. Timing depends on activity, severity, vision risk, symptoms, and response to appropriate medical care.",
      },
    ],
    sources: [
      {
        label: "American Academy of Ophthalmology EyeWiki: Thyroid Eye Disease",
        url: "https://eyewiki.aao.org/Thyroid_Eye_Disease",
      },
    ],
  },
  {
    slug: "orbital-tumors-trauma",
    title: "Orbital Tumors and Trauma",
    shortTitle: "Orbital tumors and trauma",
    categoryId: "reconstructive-oculoplastics",
    categoryLabel: "Orbital Care",
    summary:
      "Specialist evaluation of masses, injuries, and structural problems involving the eye socket.",
    overview:
      "The orbit contains the eye, muscles, nerves, vessels, lacrimal gland, and supporting tissue within a confined bony space. A mass or injury can affect eye position, movement, sensation, or vision. Evaluation often requires coordination with imaging and other specialists.",
    concerns: [
      "A new orbital or lacrimal-gland mass",
      "Change in eye position, movement, or double vision",
      "Fracture or soft-tissue injury around the eye",
      "Pain, numbness, swelling, or unexplained visual change",
    ],
    evaluation: [
      "Vision, pupils, eye movement, globe position, and sensation",
      "Timing, mechanism of injury, cancer history, and progression",
      "Existing imaging and whether additional studies are needed",
      "Observation, biopsy, reconstruction, or multidisciplinary referral",
    ],
    nextSteps:
      "Care depends entirely on the diagnosis and urgency. Sudden loss of vision, severe pain, a new pupil abnormality, major trauma, or rapidly worsening symptoms should be evaluated emergently rather than through a routine appointment request.",
    questions: [
      {
        question: "Does every orbital mass require surgery?",
        answer:
          "No. The diagnosis, growth pattern, symptoms, imaging, and risk to nearby structures determine whether observation, biopsy, or treatment is appropriate.",
      },
      {
        question: "Should prior imaging be brought to consultation?",
        answer:
          "Yes. Ask the office how to transfer both the report and the actual image files securely before the visit.",
      },
      {
        question: "When is orbital trauma an emergency?",
        answer:
          "Vision loss, severe pain, marked swelling, pupil change, open injury, or other rapidly worsening symptoms require emergency assessment.",
      },
    ],
    sources: [
      {
        label: "American Academy of Ophthalmology EyeWiki: Orbital Masses",
        url: "https://eyewiki.aao.org/Orbital_Masses",
      },
      {
        label: "American Academy of Ophthalmology EyeWiki: Orbital Wall Fractures",
        url: "https://eyewiki.org/Orbital_Medial_Wall_Fractures",
      },
    ],
  },
  {
    slug: "botox",
    title: "Botulinum Toxin Injections",
    shortTitle: "Botulinum toxin injections",
    categoryId: "non-surgical-treatments",
    categoryLabel: "Injectables",
    summary:
      "Targeted injection planning for selected facial movement lines or medically appropriate periocular indications.",
    overview:
      "Botulinum toxin temporarily changes activity in selected muscles. Product choice, dose, placement, prior response, facial symmetry, and nearby eyelid function all matter around the eyes. A consultation determines whether treatment is appropriate and which goals are realistic.",
    concerns: [
      "Movement-related lines around the eyes or brow",
      "Facial asymmetry that may be influenced by muscle activity",
      "Questions about prior treatment response",
      "Selected functional indications after clinical evaluation",
    ],
    evaluation: [
      "Facial movement, brow and eyelid position, and baseline asymmetry",
      "Medical history, medications, prior injections, and treatment response",
      "Treatment area, expected effect, limitations, and alternatives",
      "Potential adverse effects and when to call the office",
    ],
    nextSteps:
      "Effects are temporary and vary by patient, dose, product, and treatment area. Follow the product-specific and office instructions. Seek prompt medical advice for concerning symptoms such as trouble swallowing, speaking, breathing, or generalized weakness.",
    questions: [
      {
        question: "Is the effect permanent?",
        answer:
          "No. The treatment effect is temporary, and its duration varies.",
      },
      {
        question: "Can injections affect the eyelid or brow?",
        answer:
          "Yes. Placement around the upper face can influence brow or eyelid position, which is one reason anatomy and baseline function are assessed first.",
      },
      {
        question: "Can treatment be planned from a photograph?",
        answer:
          "Facial movement and muscle pattern need to be assessed directly for individualized treatment planning.",
      },
    ],
    sources: [
      {
        label: "U.S. FDA: Botox Cosmetic product information",
        url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=103000",
      },
    ],
  },
  {
    slug: "dermal-fillers",
    title: "Dermal Fillers",
    shortTitle: "Dermal fillers",
    categoryId: "non-surgical-treatments",
    categoryLabel: "Injectables",
    summary:
      "Conservative filler evaluation for selected facial or periocular volume concerns after an anatomy-focused assessment.",
    overview:
      "Dermal fillers add volume in selected tissue planes. Around the eyes, anatomy is complex and not every hollow, bag, or contour concern is suitable for filler. Skin quality, lower-eyelid support, prior filler, swelling tendency, and vascular anatomy influence candidacy and risk.",
    concerns: [
      "Selected hollows or contour transitions around the face",
      "Questions about filler versus surgery or no treatment",
      "Asymmetry or changes after previous filler",
      "A conservative plan that accounts for eyelid anatomy",
    ],
    evaluation: [
      "Facial structure, eyelid support, skin, volume, and baseline asymmetry",
      "Previous filler type, location, timing, and complications",
      "Whether filler is appropriate for the concern",
      "Product-specific risks, alternatives, and emergency instructions",
    ],
    nextSteps:
      "Swelling, bruising, contour irregularity, and other adverse effects are possible. Rare vascular complications can threaten skin or vision and require immediate treatment. The office provides product- and area-specific instructions before injection.",
    questions: [
      {
        question: "Is under-eye filler appropriate for everyone?",
        answer:
          "No. Some anatomy, swelling patterns, eyelid laxity, or prior filler can make another approach safer or more effective.",
      },
      {
        question: "Are filler results permanent?",
        answer:
          "Duration varies by product, location, metabolism, and other factors. Some effects or complications can persist longer than expected.",
      },
      {
        question: "Why is vision risk discussed?",
        answer:
          "Rare vascular complications from facial filler can affect vision. Patients should understand the risk and the office's emergency plan before treatment.",
      },
    ],
    sources: [
      {
        label: "U.S. FDA: Dermal Fillers",
        url: "https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/dermal-fillers-soft-tissue-fillers",
      },
    ],
  },
]

export function getProcedure(slug: string): Procedure | undefined {
  return procedures.find((procedure) => procedure.slug === slug)
}

export function getProceduresByCategory(categoryId: ProcedureCategoryId) {
  return procedures.filter((procedure) => procedure.categoryId === categoryId)
}
