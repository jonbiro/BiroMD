import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutSummary() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="container px-4 md:px-6 relative z-10">
                <div className="mx-auto max-w-4xl text-center space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif text-primary">
                            Leading Expertise in <span className="text-secondary">Oculoplastics</span>
                        </h2>
                        <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs font-bold text-secondary">
                            Cosmetic & Reconstructive Surgery
                        </p>
                    </div>

                    <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                        Dr. Biro is an expert in cosmetic and reconstructive surgery and <span className="text-foreground font-medium">minimally-invasive care</span> of the eyes and face.
                        Following his ophthalmology residency, he was selected for a prestigious fellowship at
                        <strong className="font-semibold text-primary block mt-2 text-3xl font-serif">Wills Eye Hospital</strong>
                        <span className="text-base text-muted-foreground block mt-1 font-sans font-normal">One of the premier eye centers in the world.</span>
                    </p>

                    <blockquote className="mt-8 border-l-2 border-secondary/50 pl-6 italic text-muted-foreground text-lg text-left max-w-2xl mx-auto bg-secondary/5 py-6 pr-6 rounded-r-xl">
                        &quot;Dr. Biro is fluent in English, Spanish, and French, providing accessible care to a diverse patient base in Los Angeles.&quot;
                    </blockquote>

                    <div className="pt-4">
                        <Button variant="outline" size="lg" className="text-base border-primary/20 hover:border-primary/50" asChild>
                            <Link href="/about">Learn more about Dr. Biro &rarr;</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
