"use client"

import * as React from "react"
import Image from "next/image"
import { Maximize2, X, Sparkles, ShieldCheck, FileText, ChevronRight } from "lucide-react"
import type { GalleryCase } from "@/lib/gallery-cases"

type GalleryClientProps = {
  cases: GalleryCase[]
}

export function GalleryClient({ cases }: GalleryClientProps) {
  const [filter, setFilter] = React.useState<"cosmetic" | "reconstructive">("cosmetic")
  const [lightboxImage, setLightboxImage] = React.useState<GalleryCase | null>(null)
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const lastTriggerRef = React.useRef<HTMLButtonElement | null>(null)

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

  React.useEffect(() => {
    if (!lightboxImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null)
      }

      if (e.key === "Tab") {
        e.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    closeButtonRef.current?.focus()
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      lastTriggerRef.current?.focus()
    }
  }, [lightboxImage])

  const openLightbox = (
    item: GalleryCase,
    trigger: HTMLButtonElement
  ) => {
    lastTriggerRef.current = trigger
    setLightboxImage(item)
  }

  const filteredCases = cases.filter(
    (item) => item.category === filter
  )

  return (
    <div className="space-y-10">
      {/* Category Filter Controls */}
      <div className="rounded-2xl border border-secondary/35 bg-secondary/10 p-5 text-sm text-foreground/90">
        <p className="font-semibold text-primary">Clinical image disclosure</p>
        <p className="mt-1 text-muted-foreground">
          The same before-and-after results may not occur for all patients.
          Individual anatomy, treatment plans, and healing vary. Cases appear
          here only after written publication authorization has been confirmed.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border/40 pb-6">
        <button
          type="button"
          onClick={() => setFilter("cosmetic")}
          aria-pressed={filter === "cosmetic"}
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
          type="button"
          onClick={() => setFilter("reconstructive")}
          aria-pressed={filter === "reconstructive"}
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
      {cases.length === 0 ? (
        <div className="panel rounded-[2rem] p-8 text-center md:p-10">
          <h2 className="text-3xl font-semibold text-primary">
            Clinical gallery under review
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Patient cases will be published after the practice confirms written
            image authorization and completes its clinical presentation review.
            Please contact the office to discuss the outcomes relevant to your
            concerns.
          </p>
        </div>
      ) : filteredCases.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredCases.map((item) => (
            <article
              key={item.id}
              className="panel group overflow-hidden rounded-[2rem] flex flex-col transition duration-300 hover:shadow-xl"
            >
              {/* Image Container with Lightbox Trigger */}
              <div className="relative aspect-[4/3] w-full bg-accent/20 overflow-hidden border-b border-border/40">
                <Image
                  src={item.imagePath}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.01]"
                />
                
                {/* Before and After Labels Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 flex justify-between text-xs font-semibold text-white pointer-events-none">
                  <span>BEFORE & AFTER COMPOSITE</span>
                  <span>CLICK TO EXPAND</span>
                </div>

                {/* Hover Maximize Overlay */}
                <button
                  type="button"
                  onClick={(event) => openLightbox(item, event.currentTarget)}
                  className="absolute inset-0 flex items-center justify-center gap-2 bg-primary/20 font-medium text-white opacity-0 shadow-inner backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 focus-visible:opacity-100"
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
                    type="button"
                    onClick={(event) => openLightbox(item, event.currentTarget)}
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
          aria-labelledby="lightbox-title"
        >
          {/* Top Bar inside Lightbox */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white z-55">
            <div className="max-w-[70%]">
              <span className="text-xs font-semibold text-secondary uppercase tracking-widest block">
                {lightboxImage.categoryLabel}
              </span>
              <h2
                id="lightbox-title"
                className="text-lg md:text-xl font-serif font-bold truncate"
              >
                {lightboxImage.title}
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setLightboxImage(null)}
              className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
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
            <Image
              src={lightboxImage.imagePath}
              alt={lightboxImage.alt}
              width={1200}
              height={900}
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
