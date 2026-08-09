import Image from "next/image"
import { Eye, EyeOff, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ClinicalImageCover({
  label,
  imagePath,
}: {
  label: string
  imagePath: string
}) {
  const warningPreviewPath = imagePath.replace(/\.jpg$/, "-warning.webp")

  return (
    <>
      <div
        data-sensitive-cover
        className="clinical-image-warning absolute inset-0 z-30 flex items-center justify-center border-2 border-amber-600/55 p-3 text-center dark:border-amber-400/60 md:p-5"
      >
        <Image
          src={warningPreviewPath}
          alt=""
          width={48}
          height={48}
          unoptimized
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          data-sensitive-preview
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 dark:opacity-15"
        />
        <div className="clinical-image-warning-scrim absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 max-w-sm rounded-2xl border border-amber-700/20 bg-card/94 px-4 py-3 shadow-xl shadow-slate-950/10 dark:border-amber-300/25 md:px-6 md:py-5">
          <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-600/35 bg-amber-500/12 text-amber-800 dark:border-amber-300/40 dark:text-amber-300 md:h-11 md:w-11">
            <TriangleAlert className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300 md:mt-3">
            Sensitive Clinical Content
          </p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">{label}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            The photograph is hidden until you choose to view it.
          </p>
          <Button
            type="button"
            size="sm"
            className="mt-3 md:mt-4"
            data-sensitive-reveal
            aria-label={`View sensitive clinical image. ${label}`}
          >
            <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
            View Sensitive Image
          </Button>
        </div>
      </div>
      <div
        data-sensitive-toolbar
        hidden
        className="absolute left-1/2 top-3 z-[25] flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-amber-500/60 bg-slate-950/90 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white shadow-lg backdrop-blur-md"
      >
        <TriangleAlert className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden="true" />
        <span className="truncate">Sensitive image</span>
        <button
          type="button"
          data-sensitive-hide
          className="ml-1 inline-flex items-center gap-1 rounded-full border border-white/30 px-2 py-1 normal-case tracking-normal hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Hide sensitive clinical image"
        >
          <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
          Hide
        </button>
      </div>
    </>
  )
}
