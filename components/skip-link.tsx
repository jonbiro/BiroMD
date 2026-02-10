import Link from "next/link"
import { cn } from "@/lib/utils"

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className={cn(
        "absolute left-3 top-3 z-[120] -translate-y-24 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-md transition-transform focus:translate-y-0 focus:outline-none"
      )}
    >
      Skip to content
    </Link>
  )
}
