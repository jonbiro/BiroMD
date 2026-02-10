import type { ReactNode } from "react"
import { Dot } from "lucide-react"

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}

export function PageIntro({ eyebrow, title, description, actions }: PageIntroProps) {
  return (
    <section className="container px-4 md:px-6">
      <div className="panel-strong relative overflow-hidden rounded-[2rem] px-6 py-8 md:px-10 md:py-12">
        <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-secondary/10" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-primary/10" />

        <div className="relative max-w-3xl space-y-5">
          <p className="eyebrow">
            <Dot className="h-3.5 w-3.5" />
            {eyebrow}
          </p>
          <h1 className="text-5xl font-semibold leading-[1.04] text-primary sm:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>
          {actions ? <div className="flex flex-wrap gap-3 pt-1">{actions}</div> : null}
        </div>
      </div>
    </section>
  )
}
