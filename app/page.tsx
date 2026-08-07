import { Hero } from "@/components/sections/hero"
import { ConcernFinder } from "@/components/sections/concern-finder"
import { AboutSummary } from "@/components/sections/about-summary"
import { ServicesPreview } from "@/components/sections/services-preview"
import { BeforeAfterPreview } from "@/components/sections/before-after-preview"

export default function Home() {
  return (
    <>
      <Hero />
      <ConcernFinder />
      <AboutSummary />
      <ServicesPreview />
      <BeforeAfterPreview />
    </>
  )
}
