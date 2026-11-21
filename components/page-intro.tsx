import type { ReactNode } from "react"
import { ChevronRight, Home } from "lucide-react"
import { absoluteUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

type BreadcrumbItem = {
  label: string
  href?: string
}

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  media?: ReactNode
  compact?: boolean
  mediaAlignment?: "start" | "center"
}

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs,
  media,
  compact = false,
  mediaAlignment = "start",
}: PageIntroProps) {
  return (
    <section className="site-container px-4 md:px-6">
      <div data-page-intro={compact ? "compact" : "default"} className="border-b border-border pb-6 sm:pb-8">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb">
            <ol className="mb-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
              <li>
                <a
                  href={absoluteUrl("/")}
                  className="inline-flex min-h-8 items-center gap-1 hover:text-secondary"
                >
                  <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  Home
                </a>
              </li>
              {breadcrumbs.map((item) => (
                <li key={`${item.href ?? "current"}-${item.label}`} className="inline-flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5 text-border" aria-hidden="true" />
                  {item.href ? (
                    <a href={item.href} className="inline-flex min-h-8 items-center hover:text-secondary">
                      {item.label}
                    </a>
                  ) : (
                    <span aria-current="page" className="text-foreground/80">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className={cn(
          "grid min-w-0 gap-4 lg:gap-x-12",
          media ? "lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)]" : "lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]",
          media && mediaAlignment === "center" ? "lg:items-center" : "lg:items-start"
        )}>
          <div className={media ? "space-y-4" : "lg:contents"}>
            <div>
              <p className="flex items-center gap-3 text-sm font-semibold text-secondary">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-secondary" />
                {eyebrow}
              </p>
              <h1 className={cn(
                "mt-3 max-w-[24ch] text-[clamp(2.35rem,5vw,4.1rem)] font-semibold leading-[1.02] text-primary",
                compact && "lg:text-[3.5rem]"
              )}>
                {title}
              </h1>
            </div>
            <div className={cn("mt-4 space-y-4 lg:mt-0", !media && "lg:border-l lg:border-border lg:pl-8")}>
              <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
              {actions ? (
                <div className="grid grid-cols-1 gap-2.5 pt-1 [&>*]:w-full [&>*]:justify-center min-[480px]:grid-cols-2 min-[480px]:[&>*:only-child]:col-span-2 sm:flex sm:flex-wrap sm:gap-3 sm:[&>*]:w-auto">
                  {actions}
                </div>
              ) : null}
            </div>
          </div>
          {media ? <div className="relative">{media}</div> : null}
        </div>
      </div>
    </section>
  )
}
