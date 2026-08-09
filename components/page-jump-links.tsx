import { List } from "lucide-react"

type PageJumpLink = {
  href: `#${string}`
  label: string
}

export function PageJumpLinks({ items }: { items: PageJumpLink[] }) {
  return (
    <div className="container px-4 md:px-6">
      <nav
        aria-label="On this page"
        className="panel flex flex-col gap-3 rounded-[1.4rem] p-3.5 sm:flex-row sm:items-center sm:p-4"
      >
        <div className="flex shrink-0 items-center gap-2 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
          <List className="h-4 w-4" aria-hidden="true" />
          On this page
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2 min-[360px]:grid-cols-3 sm:flex sm:flex-wrap">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-2.5 text-center text-xs font-semibold leading-tight text-foreground transition-[background-color,border-color,color] hover:border-secondary hover:bg-secondary/10 hover:text-secondary sm:px-4 sm:text-sm"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
