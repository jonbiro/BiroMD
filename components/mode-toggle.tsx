import { Moon, Sun } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  return (
    <button
      type="button"
      data-theme-toggle
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "relative rounded-full border-border bg-card"
      )}
      aria-label="Switch to dark mode"
      title="Switch to dark mode"
      suppressHydrationWarning
    >
      <Sun data-theme-sun className="h-[1.1rem] w-[1.1rem] dark:hidden" />
      <Moon data-theme-moon className="hidden h-[1.1rem] w-[1.1rem] dark:block" />
    </button>
  )
}
