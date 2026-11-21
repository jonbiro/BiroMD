import { ArrowDown, List } from "lucide-react"

type PageJumpLink = {
  href: `#${string}`
  label: string
}

export function PageJumpLinks({ items }: { items: PageJumpLink[] }) {
  return (
    <div className="site-container px-4 md:px-6">
      <nav
        aria-label="On this page"
        className="grid gap-3 rounded-2xl bg-accent/75 px-4 py-3.5 sm:px-5 lg:grid-cols-[auto_1fr] lg:items-baseline lg:gap-6"
      >
        <div className="flex shrink-0 items-center gap-2 px-1 text-sm font-semibold text-secondary">
          <List className="h-4 w-4" aria-hidden="true" />
          On this page
        </div>
        <div className="grid grid-cols-2 gap-x-4 sm:flex sm:flex-wrap sm:gap-x-5">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center gap-2 border-b border-border text-sm font-medium leading-tight text-foreground underline-offset-4 hover:text-secondary hover:underline sm:border-0"
            >
              <ArrowDown className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
