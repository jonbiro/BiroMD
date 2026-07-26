import Link from "next/link"
import { ArrowRight, Check, Stethoscope } from "lucide-react"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/site"
import { procedureCategories } from "@/lib/services"

export const metadata = pageMetadata({
  title: "Procedures",
  description:
    "Review the procedures and specialties offered, from blepharoplasty and ptosis repair to injectables and orbital care.",
  path: "/procedures",
})

export default function ProceduresPage() {
  return (
    <div className="space-y-10 pb-20 pt-10 md:space-y-12 md:pb-24 md:pt-12">
      <PageIntro
        eyebrow="Procedures"
        title="Procedures and Conditions Treated"
        description="Use this page to review specific treatments. A consultation is required to determine candidacy, alternatives, risks, and the expected recovery for your situation."
      />

      <section className="container space-y-8 px-4 md:px-6">
        {procedureCategories.map((category) => (
          <article
            id={category.id}
            key={category.title}
            className="panel scroll-mt-32 rounded-3xl p-7"
          >
            <h2 className="text-3xl font-medium text-primary">{category.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{category.subtitle}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/75 px-4 py-3 text-sm text-foreground/90"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="container px-4 md:px-6">
        <div className="rounded-[1.8rem] border border-border/70 bg-primary p-8 text-primary-foreground shadow-lg md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">
              <Stethoscope className="h-4 w-4" />
              Procedure Match Consultation
            </p>
            <p className="mt-3 text-lg text-primary-foreground/85">
              Bring your concerns, goals, and timeline to consultation for a clear
              recommendation and recovery roadmap.
            </p>
          </div>
          <Button className="mt-5 md:mt-0" asChild>
            <Link href="/contact">
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
