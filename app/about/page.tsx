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
                            src="/images/dr-biro-portrait.png"
                            alt="Dr. Nicolas G Biro"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p>
                        <strong className="text-foreground">Nicolas G Biro, M.D.</strong> is a board-certified Ophthalmologist with additional specialty training in
                        <strong className="text-foreground"> Ocular Plastic Surgery</strong> at the prestigious
                        <strong className="text-foreground"> Wills Eye Hospital</strong>.
                    </p>

                    <p>
                        Dr. Biro graduated from the <span className="font-semibold">University of South Florida, College of Medicine</span> in 2005.
                        He completed his internship at <span className="font-semibold">New York University Medical Center</span>, followed by an ophthalmology residency at the University of South Florida.
                    </p>

                    <p>
                        Subsequently, he was selected for a two-year fellowship in Ocular Plastic and Orbital Surgery at
                        <span className="font-semibold text-primary"> Wills Eye Hospital</span> in Philadelphia, the nation’s first eye hospital and one of the premier eye centers in the world.
                    </p>

                    <div className="bg-muted p-6 rounded-lg border-l-4 border-secondary mt-8">
                        <h3 className="text-xl font-bold text-foreground mb-2">Patient Care Philosophy</h3>
                        <p className="italic">
                            &quot;Providing expert cosmetic and reconstructive surgery and minimally-invasive care of the eyes and face.&quot;
                        </p>
                    </div>

                    <p className="font-medium text-foreground">
                        Dr. Biro is fluent in English, Spanish, and French.
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
