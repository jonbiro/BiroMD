import { Hero } from "@/components/sections/hero"
import { ConcernFinder } from "@/components/sections/concern-finder"
import { AboutSummary } from "@/components/sections/about-summary"
import { ServicesPreview } from "@/components/sections/services-preview"

export default function Home() {
  return (
    <>
      <Hero />
      <ConcernFinder />
      <ServicesPreview />
      <AboutSummary />
    </>
  )
}
