import { Hero } from "@/components/sections/hero"
import { ConcernFinder } from "@/components/sections/concern-finder"
import { ServicesPreview } from "@/components/sections/services-preview"

export default function Home() {
  return (
    <>
      <Hero />
      <ConcernFinder />
      <ServicesPreview />
    </>
  )
}
