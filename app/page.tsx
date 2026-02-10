import { Hero } from "@/components/sections/hero"
import { AboutSummary } from "@/components/sections/about-summary"
import { ServicesPreview } from "@/components/sections/services-preview"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <ServicesPreview />
    </>
  )
}
