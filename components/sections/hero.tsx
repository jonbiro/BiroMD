import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Stethoscope,
} from "lucide-react"
import { ResponsivePortrait } from "@/components/responsive-portrait"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

const trustPoints = [
  "Board-certified ophthalmologist",
  "Fellowship-trained in ocular plastic and orbital surgery",
  `Consultations in ${siteConfig.languages.join(", ")}`,
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-10 pt-4 md:pb-14 md:pt-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-56 top-0 h-[560px] w-[640px] rounded-full bg-secondary/8" />
        <div className="absolute -right-56 top-16 h-[600px] w-[660px] rounded-full bg-primary/6" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="panel-strong grid items-center gap-6 overflow-hidden rounded-[1.7rem] p-5 min-[360px]:p-6 md:rounded-[2rem] md:p-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14 lg:p-12">
          <div className="contents lg:relative lg:block lg:space-y-7">
            <a href="/locations" className="eyebrow order-1 justify-self-start transition-colors hover:bg-secondary/15">
              <MapPin className="h-3.5 w-3.5" />
              Westlake Village + Rancho Cucamonga
            </a>

            <div className="order-2 space-y-4 lg:space-y-5">
              <h1 className="text-[2.35rem] font-semibold leading-[0.98] text-primary min-[360px]:text-[2.55rem] min-[480px]:text-5xl sm:text-6xl md:text-7xl">
                Specialized Oculoplastic Care
                {" "}
                <span className="headline-gradient block">for the Eyes and Face</span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground min-[480px]:text-lg md:text-xl">
                Dr. Nicolas Biro provides cosmetic and reconstructive care built
                on ophthalmic training, careful surgical planning, and respect
                for each patient&apos;s natural anatomy.
              </p>
            </div>

            <div className="order-3 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="/contact">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Request Consultation
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/procedures">
                  Explore Procedures
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <ul className="order-5 grid gap-2 text-sm text-foreground/90 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="order-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/70 pt-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-secondary" />
                Consultations by appointment
              </span>
              <span>Serving patients in {siteConfig.serviceAreaLabel}</span>
            </div>
          </div>

          <div className="relative order-4 mx-auto w-full max-w-[440px] lg:order-none lg:max-w-[540px]">
            <div className="absolute -bottom-8 -right-8 h-44 w-44 rounded-full border border-primary/20 bg-primary/8" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-border/70 bg-card shadow-[0_20px_50px_rgb(10_29_55_/0.16)] md:rounded-[2.2rem] lg:shadow-[0_24px_65px_rgb(10_29_55_/0.2)]">
              <div className="relative aspect-[4/5]">
                <ResponsivePortrait
                  priority
                  className="object-contain"
                  sizes="(max-width: 480px) calc(100vw - 72px), (max-width: 1023px) 440px, (max-width: 1200px) 44vw, 540px"
                />
              </div>
              <div className="border-t border-border/70 bg-card p-4 lg:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Clinical Approach
                </p>
                <p className="mt-1.5 text-sm text-foreground/90 lg:mt-2 lg:text-base">
                  Restore function, preserve expression, and plan treatment
                  around the patient&apos;s individual features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
