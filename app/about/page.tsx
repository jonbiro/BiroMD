import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="container py-20 px-4 md:px-6">
            <div className="flex flex-col gap-8 md:gap-12">
                {/* Header Section */}
                <div className="max-w-3xl">
                    <div className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-sm font-medium text-secondary mb-6">
                        Meet the Doctor
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-serif text-primary mb-6 leading-tight">
                        Combining Medical Precision with Aesthetic Artistry
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl text-balance">
                        Dr. Nicolas Biro is dedicated to restoring function and enhancing natural beauty through expert oculoplastic surgery.
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-12 items-start mt-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Portrait for Mobile - Visible only on small screens */}
                        <div className="lg:hidden relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={`${process.env.NODE_ENV === 'production' ? '/BiroMD' : ''}/images/dr-biro-portrait.png`}
                                alt="Dr. Nicolas G Biro"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                            <p>
                                <strong className="text-foreground font-semibold">Nicolas G Biro, M.D.</strong> is a board-certified Ophthalmologist with sub-specialty fellowship training in <strong className="text-foreground font-semibold">Ocular Plastic Surgery</strong> from the prestigious <strong className="text-foreground font-semibold">Wills Eye Hospital</strong>.
                            </p>
                            <p>
                                Dr. Biro’s journey in medicine began at the University of South Florida, College of Medicine, graduating in 2005. His rigorous training includes an internship at New York University Medical Center and an ophthalmology residency at the University of South Florida.
                            </p>
                            <p>
                                He was notably selected for a highly competitive two-year fellowship in Ocular Plastic and Orbital Surgery at <span className="text-primary font-medium">Wills Eye Hospital</span> in Philadelphia, consistently ranked as one of the top eye hospitals worldwide.
                            </p>
                        </div>

                        {/* Featured Quote */}
                        <div className="relative py-10 px-8 bg-secondary/5 rounded-2xl border border-secondary/10 my-8">
                            <div className="absolute top-0 left-8 -translate-y-1/2 bg-background p-2 rounded-full border border-secondary/20">
                                <span className="text-4xl text-secondary font-serif leading-none block h-8 w-8 text-center" style={{ marginTop: '0.2rem' }}>“</span>
                            </div>
                            <blockquote className="text-2xl md:text-3xl font-serif font-medium text-primary italic text-center leading-snug">
                                My philosophy is simple: restore confidence through precision and artistry.
                            </blockquote>
                            <div className="mt-6 text-center">
                                <cite className="not-italic font-semibold text-foreground">— Nicolas G Biro, M.D.</cite>
                            </div>
                        </div>

                        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                            <p>
                                Dr. Biro is fluent in English, Spanish, and French, allowing him to connect with a diverse patient base. His approach is patient-centered, ensuring everyone feels heard, understood, and confident in their care plan.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
                        {/* Portrait for Desktop - Hidden on mobile */}
                        <div className="hidden lg:block relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                            <Image
                                src={`${process.env.NODE_ENV === 'production' ? '/BiroMD' : ''}/images/dr-biro-portrait.png`}
                                alt="Dr. Nicolas G Biro"
                                fill
                                className="object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Qualifications Card */}
                        <div className="bg-card rounded-xl border border-border/50 shadow-sm p-6">
                            <h3 className="text-lg font-bold font-serif mb-4 text-primary flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                                Credentials & Affiliations
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-foreground/80">
                                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                                    <span>Board Certified Ophthalmologist</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-foreground/80">
                                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                                    <span>Fellowship Trained at Wills Eye Hospital</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-foreground/80">
                                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                                    <span>Member, American Academy of Ophthalmology</span>
                                </li>
                            </ul>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-primary text-primary-foreground p-6 rounded-xl shadow-lg relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-xl font-bold font-serif mb-2 relative z-10">Ready to transform?</h3>
                            <p className="mb-6 text-primary-foreground/80 text-sm relative z-10">
                                Schedule your consultation with Dr. Biro today.
                            </p>
                            <Button size="lg" variant="secondary" className="w-full relative z-10 font-semibold" asChild>
                                <Link href="/contact">
                                    Book Consultation
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
