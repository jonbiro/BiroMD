import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
    return (
        <div className="container py-16 px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif text-primary mb-8 border-b pb-4">
                About Dr. Biro
            </h1>

            <div className="grid gap-12 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <div className="float-right ml-6 mb-6 relative w-48 h-64 rounded-xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-800">
                        <Image
                            src={`${process.env.NODE_ENV === 'production' ? '/BiroMD' : ''}/images/dr-biro-portrait.png`}
                            alt="Dr. Nicolas G Biro"
                            fill
                            className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                    <p>
                        <strong className="text-foreground">Nicolas G Biro, M.D.</strong> is a board-certified Ophthalmologist with sub-specialty fellowship training in
                        <strong className="text-foreground"> Ocular Plastic Surgery</strong> from the prestigious
                        <strong className="text-foreground"> Wills Eye Hospital</strong>.
                    </p>

                    <p>
                        Dr. Biro’s journey in medicine began at the <span className="font-semibold">University of South Florida, College of Medicine</span>, graduating in 2005.
                        His rigorous training includes an internship at <span className="font-semibold">New York University Medical Center</span> and an ophthalmology residency at the University of South Florida.
                    </p>

                    <p>
                        He was notably selected for a highly competitive two-year fellowship in Ocular Plastic and Orbital Surgery at
                        <span className="font-semibold text-primary"> Wills Eye Hospital</span> in Philadelphia, consistently ranked as one of the top eye hospitals worldwide.
                    </p>

                    <div className="relative my-10 pl-8 border-l-4 border-secondary/60">
                        <div className="text-4xl text-secondary/20 absolute -top-4 -left-3 font-serif">“</div>
                        <h3 className="text-2xl font-serif font-medium text-foreground italic mb-2 relative z-10">
                            My philosophy is simple: restore confidence through precision and artistry.
                        </h3>
                        <p className="text-muted-foreground">
                            — Nicolas G Biro, M.D.
                        </p>
                    </div>

                    <p className="font-medium text-foreground">
                        Dr. Biro is fluent in English, Spanish, and French, allowing him to connect with a diverse patient base.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="border p-6 rounded-xl bg-slate-50 dark:bg-slate-900">
                        <h3 className="text-xl font-bold font-serif mb-4 text-primary">Affiliations</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-secondary" />
                                <span>Wills Eye Hospital</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-secondary" />
                                <span>Board Certified Ophthalmologist</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-primary text-primary-foreground p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold font-serif mb-4">Book a Consultation</h3>
                        <p className="mb-6 text-primary-foreground/90">
                            Discuss your needs with Dr. Biro today.
                        </p>
                        <Button size="lg" variant="secondary" className="w-full" asChild>
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
