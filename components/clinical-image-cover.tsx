import { Eye, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ClinicalImageCover({ label }: { label: string }) {
  return (
    <div
      data-sensitive-cover
      className="absolute inset-0 z-30 flex items-center justify-center bg-card p-5 text-center"
    >
      <div className="max-w-sm">
        <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 text-secondary">
          <ShieldAlert className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary">
          Clinical Image
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{label}</p>
        <Button type="button" size="sm" className="mt-4" data-sensitive-reveal>
          <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
          Show Clinical Image
        </Button>
      </div>
    </div>
  )
}
