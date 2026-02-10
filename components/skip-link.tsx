import Link from "next/link"
import { cn } from "@/lib/utils"

export function SkipLink() {
    return (
        <Link
            href="#main-content"
            className={cn(
                "absolute left-4 top-4 z-[100] -translate-y-[150%] rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md"
            )}
        >
            Skip to content
        </Link>
    )
}
