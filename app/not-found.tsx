import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex min-h-[62vh] items-center justify-center px-4 md:px-6">
      <div className="max-w-xl rounded-[1.8rem] border border-border/70 bg-card/85 p-8 text-center shadow-xl shadow-primary/10 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          404
        </p>
        <h1 className="mt-3 text-5xl font-semibold text-primary">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page may have moved or the address may be incorrect. Return to the
          homepage to continue browsing.
        </p>
        <Button className="mt-6" asChild>
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Button>
      </div>
    </div>
  )
}
