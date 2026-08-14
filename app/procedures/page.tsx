import {
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/site"
import { procedureCategories } from "@/lib/services"

const categoryIcons = {
  "cosmetic-eyelid-surgery": Sparkles,
  "reconstructive-oculoplastics": ShieldCheck,
  "non-surgical-treatments": Syringe,
} as const

export const metadata = pageMetadata({
  title: "Procedures",
  description:
    "Explore detailed information about blepharoplasty, ptosis repair, eyelid reconstruction, tear-duct and orbital care, and injectables.",
  path: "/procedures",
})

export default function ProceduresPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Procedures"
        title="Procedures and Treatment Options"
        description="Learn what each procedure is for, what the evaluation may cover, and which questions to bring to your consultation."
      />

      <section className="site-container px-4 md:px-6">
        <nav
          aria-label="Jump to a procedure category"
          className="panel grid gap-2 rounded-2xl p-2 sm:grid-cols-3"
        >
          {procedureCategories.map((category) => {
            const CategoryIcon = categoryIcons[category.id]
            return (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="group flex min-h-14 items-center gap-3 rounded-xl border border-transparent bg-accent/55 px-4 py-2.5 transition-colors hover:border-secondary/60 hover:bg-card"
              >
                <span className="inline-flex rounded-lg border border-secondary/30 bg-card p-2 text-secondary">
                  <CategoryIcon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-tight text-foreground">
                    {category.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {category.items.length} {category.items.length === 1 ? "topic" : "topics"}
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-secondary transition-transform group-hover:translate-y-0.5" />
              </a>
            )
          })}
        </nav>
      </section>

      <section className="site-container space-y-8 px-4 md:px-6">
        {procedureCategories.map((category) => (
          <article
            id={category.id}
            key={category.title}
            className="panel rounded-3xl p-7 md:p-8"
          >
            <h2 className="text-3xl font-medium text-primary">{category.title}</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              {category.subtitle}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <a
                  key={item.slug}
                  href={`/procedures/${item.slug}`}
                  className="group rounded-2xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
                >
                  <h3 className="text-2xl font-semibold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">
                    View procedure guide
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="site-container px-4 md:px-6">
        <div className="rounded-[1.8rem] border border-primary/20 bg-primary p-8 text-primary-foreground shadow-lg md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">
              <Stethoscope className="h-4 w-4" />
              Individual Assessment
            </p>
            <p className="mt-3 max-w-3xl text-lg text-primary-foreground/85">
              A consultation is required to determine the diagnosis, candidacy,
              alternatives, meaningful risks, and expected recovery for your situation.
            </p>
          </div>
          <Button className="mt-5 shrink-0 md:mt-0" asChild>
            <a href="/contact">
              Request Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
