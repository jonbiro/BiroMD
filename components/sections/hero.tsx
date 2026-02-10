"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays, ShieldCheck, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig, withBasePath } from "@/lib/site"

const trustPoints = [
  "Board-certified ophthalmologist",
  "Fellowship training at Wills Eye Hospital",
  `Fluent in ${siteConfig.languages.join(", ")}`,
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-44 top-0 h-[520px] w-[620px] rounded-full bg-secondary/25 blur-[120px]" />
        <div className="absolute -right-56 top-20 h-[520px] w-[620px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-card/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Precision Oculoplastics in Los Angeles
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-semibold leading-[1.03] text-primary sm:text-6xl md:text-7xl">
                Elevated Eye and
                <span className="block text-secondary">Facial Rejuvenation</span>
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                {siteConfig.shortName} delivers cosmetic and reconstructive care
                with surgical rigor, measured planning, and naturally balanced
                outcomes.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="rounded-2xl border border-border/80 bg-card/80 px-4 py-3 text-sm text-foreground/90 shadow-sm"
                >
                  {point}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.72, delay: 0.1, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-3xl border border-secondary/35 bg-card/70 shadow-xl backdrop-blur" />
            <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full border border-primary/20 bg-primary/8" />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-border/70 bg-card shadow-[0_24px_65px_rgb(10_29_55_/0.26)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={withBasePath("/images/dr-biro-portrait.png")}
                  alt="Dr. Nicolas G. Biro portrait"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
              <div className="border-t border-border/70 bg-card/95 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  Philosophy
                </p>
                <p className="mt-2 text-base text-foreground/90">
                  Restore function, preserve expression, and align every treatment
                  to the patient&apos;s natural features.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
