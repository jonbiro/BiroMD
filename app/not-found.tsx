import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { absoluteUrl } from "@/lib/site"

const recoveryLinks = [
  { href: "/concerns", label: "Symptoms and concerns" },
  { href: "/procedures", label: "Eyelid and oculoplastic procedures" },
  { href: "/gallery", label: "Before and after cases" },
  { href: "/locations", label: "Offices" },
  { href: "/about", label: "About Dr. Biro" },
  { href: "/contact", label: "Request a consultation" },
]

export default function NotFound() {
  return (
    <div className="site-container flex min-h-[62vh] items-center justify-center px-4 md:px-6">
      <div className="max-w-xl rounded-[1.8rem] border border-border/70 bg-card/85 p-8 text-center shadow-xl shadow-primary/10 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          404
        </p>
        <h1 className="mt-3 text-5xl font-semibold text-primary">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page may have moved or the address may be incorrect. Choose a
          section below, or return to the homepage.
        </p>
        <Button className="mt-6" asChild>
          <a href={absoluteUrl("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Button>

        <div className="mt-8 border-t border-border pt-6 text-left">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Continue browsing
          </h2>
          <ul className="mt-3 grid gap-1 sm:grid-cols-2">
            {recoveryLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex min-h-11 items-center text-sm font-medium text-foreground transition-colors hover:text-secondary"
                >
                  {link.label}
                  <ArrowRight
                    className="ml-1.5 h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
