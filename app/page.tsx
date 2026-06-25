import { Hero } from "@/components/sections/hero"
import { AboutSummary } from "@/components/sections/about-summary"
import { ServicesPreview } from "@/components/sections/services-preview"
import { BeforeAfterPreview } from "@/components/sections/before-after-preview"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <ServicesPreview />
      <BeforeAfterPreview />
    </>
  )
}
