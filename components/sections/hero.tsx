import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Dot,
  ShieldCheck,
  Stethoscope,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig, withBasePath } from "@/lib/site"

const trustPoints = [
  "Board-certified ophthalmologist",
  "Fellowship training at Wills Eye Hospital",
  `Fluent in ${siteConfig.languages.join(", ")}`,
]

const quickFacts = [
  {
    label: "Focus",
    value: "Oculoplastic Surgery",
  },
  {
    label: "Approach",
    value: "Functional + Aesthetic Planning",
  },
  {
    label: "Consults",
    value: "By Appointment",
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-56 top-0 h-[560px] w-[640px] rounded-full bg-secondary/10" />
        <div className="absolute -right-56 top-16 h-[600px] w-[660px] rounded-full bg-primary/8" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="panel-strong grid items-center gap-12 overflow-hidden rounded-[2rem] p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:p-12">
          <div className="relative space-y-8">
            <p className="eyebrow">
              <ShieldCheck className="h-3.5 w-3.5" />
              Experienced Oculoplastic Surgery in Los Angeles
            </p>

            <div className="space-y-5">
              <h1 className="text-5xl font-semibold leading-[1.02] text-primary sm:text-6xl md:text-7xl">
                Ophthalmic Expertise with
                <span className="headline-gradient block">Plastic Surgical Artistry</span>
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                Dr. Nicolas Biro provides cosmetic and reconstructive
                oculoplastic care grounded in ophthalmic precision, meticulous
                planning, and elegant, naturally balanced outcomes.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="panel rounded-2xl px-4 py-3 text-sm text-foreground/90"
                >
                  <span className="inline-flex items-start gap-2">
                    <Dot className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/procedures">
                  Explore Procedures
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-5 border-t border-border/70 pt-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-secondary" />
                Consultations by appointment
              </span>
              <span>{siteConfig.location}</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -bottom-8 -right-8 h-44 w-44 rounded-full border border-primary/25 bg-primary/10" />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-border/70 bg-card shadow-[0_24px_65px_rgb(10_29_55_/0.26)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={withBasePath("/images/dr-biro-portrait.png")}
                  alt="Dr. Nicolas Biro portrait"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              </div>

              <div className="border-t border-border/70 bg-card/95 p-5">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  <Star className="h-3.5 w-3.5" />
                  Treatment Philosophy
                </p>
                <p className="mt-2 text-base text-foreground/90">
                  Restore function, preserve expression, and align every treatment
                  to the patient&apos;s natural features.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="panel rounded-2xl px-3.5 py-3">
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-secondary">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-sm text-foreground/90">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
