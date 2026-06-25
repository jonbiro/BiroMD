"use client"

import * as React from "react"
import { Maximize2, X, Sparkles, ShieldCheck, FileText, ChevronRight } from "lucide-react"

type CaseItem = {
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

const cases: CaseItem[] = [
  {
    id: "lower-blepharoplasty",
    title: "Lower Blepharoplasty",
    category: "cosmetic",
    categoryLabel: "Cosmetic Surgery",
    focus: "Under-Eye Rejuvenation",
    presentation: "Patient presented with prominent fat herniation in the lower eyelids (under-eye bags) causing a chronically tired, aged facial expression.",
    technique: "A transconjunctival lower blepharoplasty was performed. The herniated fat pads were conservatively repositioned and contoured to smooth the transition between the lower eyelid and cheek (lid-cheek junction), restoring a rested contour without hollow-out.",
    imagePath: "/images/cases/scalp-reconstruction.jpg",
    alt: "Before and after lower blepharoplasty showing under-eye rejuvenation"
  },
  {
    id: "eyelid-trauma",
    title: "Mohs Cancer Removal Reconstruction",
    category: "reconstructive",
    categoryLabel: "Reconstructive Oculoplastics",
    focus: "Eyelid Margin Reconstruction",
    presentation: "Patient sustained a complex, full-thickness eyelid defect following Mohs micrographic surgery for periocular skin cancer, presenting with tissue loss, wound separation, and structural disruption of the eyelid margin.",
    technique: "Micro-surgical debridement and multi-layered closure were executed. The tarsoconjunctival layer and orbicularis muscle were realigned to ensure proper margin apposition, preventing lid malposition (ectropion) and protecting the ocular surface.",
    imagePath: "/images/cases/eyelid-trauma-repair.jpg",
    alt: "Before and after Mohs cancer removal eyelid reconstruction"
  },
  {
    id: "scalp-reconstruction",
    title: "Scalp Defect Reconstruction",
    category: "reconstructive",
    categoryLabel: "Reconstructive Oculoplastics",
    focus: "Mohs Defect Closure",
    presentation: "Patient presented with a large, deep circular defect of the scalp extending down to the pericranium after Mohs surgery for skin cancer removal.",
    technique: "A large rotational flap was designed with wide undermining of the subgaleal plane. The flap was advanced and rotated to close the defect under minimal tension. Care was taken to realign hair-bearing edges and preserve follicles, resulting in a flat, healthy incision line.",
    imagePath: "/images/cases/lower-blepharoplasty.jpg",
    alt: "Before and after scalp reconstruction showing Mohs defect closure"
  },
  {
    id: "eyebrow-reconstruction",
    title: "Eyebrow & Forehead Reconstruction",
    category: "reconstructive",
    categoryLabel: "Reconstructive Oculoplastics",
    focus: "Forehead Defect Repair",
    presentation: "Patient presented with a wide surgical defect located directly above the left eyebrow and lateral forehead after skin cancer excision.",
    technique: "Reconstruction was completed using a customized advancement-transposition flap matching the natural skin crease lines (Langer's lines) of the forehead. This prevented any upward pull on the eyebrow (brow ptosis) and preserved natural forehead symmetry, leaving a minimal scar.",
    imagePath: "/images/cases/eyebrow-defect-reconstruction.jpg",
    alt: "Before and after forehead and eyebrow reconstruction"
  }
]

export function GalleryClient() {
  const [filter, setFilter] = React.useState<"cosmetic" | "reconstructive">("cosmetic")
  const [lightboxImage, setLightboxImage] = React.useState<CaseItem | null>(null)

  React.useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [lightboxImage])

  // Handle Escape key to close lightbox
  React.useEffect(() => {
    if (!lightboxImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxImage])

  const filteredCases = cases.filter(
    (item) => item.category === filter
  )

  return (
    <div className="space-y-10">
      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border/40 pb-6">
        <button
          onClick={() => setFilter("cosmetic")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition flex items-center gap-1.5 ${
            filter === "cosmetic"
              ? "bg-primary text-primary-foreground shadow-[0_8px_16px_rgb(9_36_59_/0.2)]"
              : "bg-accent/40 text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Cosmetic
        </button>
        <button
          onClick={() => setFilter("reconstructive")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition flex items-center gap-1.5 ${
            filter === "reconstructive"
              ? "bg-primary text-primary-foreground shadow-[0_8px_16px_rgb(9_36_59_/0.2)]"
              : "bg-accent/40 text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Reconstructive
        </button>
      </div>

      {/* Grid of Cases */}
      {filteredCases.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredCases.map((item) => (
            <article
              key={item.id}
              className="panel group overflow-hidden rounded-[2rem] flex flex-col transition duration-300 hover:shadow-xl"
            >
              {/* Image Container with Lightbox Trigger */}
              <div className="relative aspect-[4/3] w-full bg-accent/20 overflow-hidden border-b border-border/40">
                <img
                  src={item.imagePath}
                  alt={item.alt}
                  className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.01]"
                />
                
                {/* Before and After Labels Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 flex justify-between text-xs font-semibold text-white pointer-events-none">
                  <span>BEFORE & AFTER COMPOSITE</span>
                  <span>CLICK TO EXPAND</span>
                </div>

                {/* Hover Maximize Overlay */}
                <button
                  onClick={() => setLightboxImage(item)}
                  className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 text-white font-medium shadow-inner"
                  aria-label={`Enlarge image for ${item.title}`}
                >
                  <div className="rounded-full bg-primary p-3 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                </button>
                
                <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground shadow-sm">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Case Text Details */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Focus: {item.focus}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-serif font-semibold text-primary">
                    {item.title}
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2 pt-2">
                    <div className="space-y-1.5 bg-accent/30 p-4 rounded-xl">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-secondary" />
                        Clinical Presentation
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.presentation}
                      </p>
                    </div>

                    <div className="space-y-1.5 bg-accent/30 p-4 rounded-xl">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                        Surgical Approach
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.technique}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Nicolas Biro, M.D.</span>
                  <button
                    onClick={() => setLightboxImage(item)}
                    className="inline-flex items-center text-secondary font-semibold hover:underline"
                  >
                    View details
                    <ChevronRight className="ml-0.5 h-3 w-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No cases found in this category.
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Top Bar inside Lightbox */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white z-55">
            <div className="max-w-[70%]">
              <span className="text-xs font-semibold text-secondary uppercase tracking-widest block">
                {lightboxImage.categoryLabel}
              </span>
              <h2 className="text-lg md:text-xl font-serif font-bold truncate">
                {lightboxImage.title}
              </h2>
            </div>
            <button
              onClick={() => setLightboxImage(null)}
              className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white transition focus:outline-none"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Enlarged Image */}
          <div 
            className="relative max-h-[80vh] max-w-full md:max-w-4xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.imagePath}
              alt={lightboxImage.alt}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>

          {/* Bottom Bar Details */}
          <div 
            className="mt-4 max-w-2xl text-center text-white/95 px-4 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-semibold text-secondary-foreground bg-secondary/25 py-1 px-3 rounded-full inline-block">
              {lightboxImage.focus}
            </p>
            <p className="text-xs text-white/70 max-w-xl mx-auto pt-2 leading-relaxed">
              {lightboxImage.technique}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
