import type { ReactNode } from "react"
import { ChevronRight, Dot, Home } from "lucide-react"
import { absoluteUrl } from "@/lib/site"

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
}

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs,
  media,
}: PageIntroProps) {
  return (
    <section className="site-container px-4 md:px-6">
      <div
        className={`panel-strong relative overflow-hidden rounded-[2rem] px-5 py-7 min-[360px]:px-6 md:px-10 md:py-10 ${
          media ? "" : "lg:mx-auto lg:max-w-[74rem]"
        }`}
      >
        <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-secondary/10" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-primary/10" />

        <div
          className={
            media
              ? "relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)] lg:items-start lg:gap-12"
              : "relative"
          }
        >
          <div className="max-w-3xl space-y-4 min-[480px]:space-y-5">
            {breadcrumbs?.length ? (
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-medium text-muted-foreground">
                  <li>
                    <a
                      href={absoluteUrl("/")}
                      className="inline-flex min-h-8 items-center gap-1 hover:text-secondary"
                    >
                      <Home className="h-3.5 w-3.5" />
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
            <p className="eyebrow">
              <Dot className="h-3.5 w-3.5" />
              {eyebrow}
            </p>
            <h1 className="text-[2.35rem] font-semibold leading-[1.02] text-primary min-[360px]:text-[2.65rem] min-[480px]:text-5xl sm:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground min-[480px]:text-lg">
              {description}
            </p>
            {actions ? (
              <div className="grid grid-cols-2 gap-2.5 pt-1 [&>*]:w-full [&>*]:justify-center [&>*:only-child]:col-span-2 sm:flex sm:flex-wrap sm:gap-3 sm:[&>*]:w-auto">
                {actions}
              </div>
            ) : null}
          </div>
          {media ? <div className="relative">{media}</div> : null}
        </div>
      </div>
    </section>
  )
}
