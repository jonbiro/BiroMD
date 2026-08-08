import { Hero } from "@/components/sections/hero"
import { ConcernFinder } from "@/components/sections/concern-finder"
import { AboutSummary } from "@/components/sections/about-summary"
import { ServicesPreview } from "@/components/sections/services-preview"
import { BeforeAfterPreview } from "@/components/sections/before-after-preview"
import { ReputationLinks } from "@/components/sections/reputation-links"

export default function Home() {
  return (
    <>
      <Hero />
      <ConcernFinder />
      <AboutSummary />
      <ReputationLinks />
      <ServicesPreview />
      <BeforeAfterPreview />
    </>
  )
}
