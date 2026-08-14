import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
} from "lucide-react"
import { ResponsivePortrait } from "@/components/responsive-portrait"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

const trustPoints = [
  "Board-certified ophthalmologist",
  "Wills Eye oculoplastic fellowship",
  `Visits in ${siteConfig.languages.join(", ")}`,
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-4 pt-2 md:pb-8 md:pt-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-56 top-0 h-[560px] w-[640px] rounded-full bg-secondary/8" />
        <div className="absolute -right-56 top-16 h-[600px] w-[660px] rounded-full bg-primary/6" />
      </div>

      <div className="site-container relative z-10 px-4 md:px-6">
        <div className="panel-strong grid items-center gap-4 overflow-hidden rounded-[1.7rem] p-4 min-[360px]:p-5 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:rounded-[2rem] md:p-8 lg:gap-12 lg:p-10 xl:p-12">
          <div className="contents md:relative md:block md:space-y-5 lg:space-y-6">
            <a href="/locations" className="eyebrow order-1 justify-self-start transition-colors hover:bg-secondary/15">
              <MapPin className="h-3.5 w-3.5" />
              Serving {siteConfig.serviceAreaLabel}
            </a>

            <div className="order-2 space-y-2.5 lg:space-y-4">
              <h1 className="text-[2.2rem] font-semibold leading-[0.98] text-primary min-[360px]:text-[2.4rem] min-[480px]:text-5xl md:text-[3.35rem] lg:text-6xl xl:text-7xl">
                Specialized Oculoplastic Care
                {" "}
                <span className="headline-gradient block">for the Eyes and Face</span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground min-[480px]:text-lg md:text-base lg:text-lg xl:text-xl">
                Cosmetic and reconstructive care for the eyelids, tear system,
                and orbit, planned around function and natural expression.
              </p>
            </div>

            <div className="order-3 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
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

            <ul className="order-5 grid gap-x-4 gap-y-2 text-sm text-foreground/90 min-[480px]:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

          </div>

          <div className="relative order-4 mx-auto w-full max-w-[270px] min-[420px]:max-w-[300px] min-[480px]:max-w-[340px] md:order-none md:max-w-none">
            <div className="absolute -bottom-8 -right-8 h-44 w-44 rounded-full border border-primary/20 bg-primary/8" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-border/70 bg-card shadow-[0_20px_50px_rgb(10_29_55_/0.16)] md:rounded-[2.2rem] lg:shadow-[0_24px_65px_rgb(10_29_55_/0.2)]">
              <div className="relative aspect-[4/5] bg-[#3f4143]">
                <ResponsivePortrait
                  priority
                  className="object-contain"
                  sizes="(max-width: 479px) min(320px, calc(100vw - 72px)), (max-width: 767px) 360px, (max-width: 1200px) 42vw, 500px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
