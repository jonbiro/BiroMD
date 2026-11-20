import Image from "next/image"
import { Hero } from "@/components/sections/hero"
import { ConcernFinder } from "@/components/sections/concern-finder"
import { ServicesPreview } from "@/components/sections/services-preview"

export default function Home() {
  return (
    <>
      <Hero />
      <ConcernFinder />
      <ServicesPreview />
      <div className="site-container flex justify-center px-4 py-8 md:px-6 md:py-10">
        <Image
          src="/images/brand/abo-board-certified-ophthalmologist.png"
          alt="Board Certified Ophthalmologist, American Board of Ophthalmology"
          width={400}
          height={400}
          unoptimized
          className="h-auto w-36 sm:w-40"
        />
      </div>
    </>
  )
}
