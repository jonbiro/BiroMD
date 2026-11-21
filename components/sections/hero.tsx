import Image from "next/image"
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  MapPin,
  MessageSquareQuote,
} from "lucide-react"
import { ResponsivePortrait } from "@/components/responsive-portrait"
import { Button } from "@/components/ui/button"
import { formatList, patientFeedbackProfiles, siteConfig } from "@/lib/site"

const trustPoints = [
  "Board-certified ophthalmologist",
  "Wills Eye oculoplastic fellowship",
  `Consultations in ${formatList(siteConfig.languages)}`,
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-5 pt-2 md:pb-8 md:pt-6">
      <div className="site-container relative z-10 px-4 md:px-6">
        <div className="grid items-center gap-5 overflow-hidden rounded-[1.5rem] border border-border/80 bg-accent/65 p-5 min-[400px]:p-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-x-8 md:gap-y-7 md:rounded-[2rem] md:p-8 lg:gap-x-12 lg:p-11 xl:p-12">
          <div className="contents md:relative md:block md:space-y-6 lg:space-y-7">
            <a
              href="/locations"
              className="order-1 inline-flex min-h-9 items-center gap-2 justify-self-start text-xs font-medium text-secondary transition-colors hover:text-primary min-[400px]:text-sm"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Serving Greater Los Angeles</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <div className="order-2 space-y-4 lg:space-y-5">
              <h1 className="text-[2.5rem] font-semibold leading-[1.02] text-primary min-[400px]:text-[2.85rem] min-[480px]:text-[3.35rem] md:text-[3rem] lg:text-[3.65rem] xl:text-[4.1rem]">
                Eyelid Surgery and{" "}
                <span className="block">Specialized Eye Care</span>
              </h1>
              <p className="max-w-[35rem] text-base leading-relaxed text-muted-foreground lg:text-lg">
                Dr. Nicolas Biro provides cosmetic and reconstructive care for heavy
                or drooping eyelids, under-eye bags, tearing, and orbital conditions,
                with planning that protects eye function and natural expression.
              </p>
            </div>

            <div className="order-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-[max-content_max-content] sm:gap-x-5">
              <Button size="lg" className="col-span-2 w-full sm:w-auto sm:justify-self-start" asChild>
                <a href="/contact">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Request a Consultation
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-transparent bg-transparent px-0 text-xs shadow-none hover:border-transparent hover:bg-transparent hover:text-secondary min-[400px]:text-sm sm:w-auto"
                asChild
              >
                <a href="/procedures">
                  Explore Procedures
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-transparent bg-transparent px-0 text-xs shadow-none hover:border-transparent hover:bg-transparent hover:text-secondary min-[400px]:text-sm sm:w-auto"
                asChild
              >
                <a href="/about">
                  Meet Dr. Biro
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <div role="group" aria-label="Dr. Biro’s credentials" className="order-5 flex items-center gap-4 border-t border-border/80 pt-5 md:pt-6">
              <Image
                src="/images/brand/abo-board-certified-ophthalmologist.png"
                alt="Board Certified Ophthalmologist, American Board of Ophthalmology"
                width={400}
                height={400}
                unoptimized
                className="h-auto w-20 shrink-0 self-center lg:w-[5.5rem]"
              />
              <ul className="grid gap-x-4 gap-y-2 text-sm text-foreground/90">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-secondary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="relative order-4 mx-auto w-full max-w-[250px] py-1 min-[480px]:max-w-[300px] md:order-none md:max-w-[400px] md:py-0">
            <div className="relative overflow-hidden rounded-[1.25rem] border border-primary/10 bg-card shadow-[0_14px_36px_rgb(10_29_55_/0.12)] md:rounded-[1.5rem]">
              <div className="relative aspect-[4/5] bg-[#3f4143]">
                <ResponsivePortrait
                  priority
                  className="object-contain"
                  sizes="(max-width: 479px) 250px, (max-width: 767px) 300px, (max-width: 1200px) 36vw, 400px"
                />
              </div>
            </div>
            <div className="mt-4 text-center md:mt-5">
              <p className="text-lg font-semibold leading-snug text-primary">Dr. Nicolas Biro</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Oculoplastic surgeon</p>
            </div>
          </div>

          <div className="order-6 border-t border-border/80 pt-5 md:col-span-2 md:flex md:items-center md:justify-between md:gap-7 md:pt-6">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <h2 className="font-sans text-sm font-semibold text-secondary">
                  Independent Patient Feedback
                </h2>
              </div>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Explore independent profiles. Ratings and reviews are hosted and managed by each publisher; BiroMD does not edit or republish them.
              </p>
            </div>
            <div className="mt-3 flex shrink-0 flex-wrap gap-2 md:mt-0 md:max-w-[42%] md:justify-end">
              {patientFeedbackProfiles.map((profile) => (
                <a
                  key={profile.url}
                  href={profile.url}
                  target="_blank"
                  rel="external noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 text-xs font-semibold text-foreground transition-[border-color,background-color,color] hover:border-secondary hover:bg-card hover:text-secondary"
                >
                  {profile.name}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
