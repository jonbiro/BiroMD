"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar } from "lucide-react"

export function Hero() {
    return (
        <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-background pt-32 pb-24 md:py-0">
            {/* Background decoration - Abstract Mesh Gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-secondary/5 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-primary/5 rounded-full blur-[100px] transform -translate-x-1/4 translate-y-1/4" />
                <div className="absolute top-1/2 left-1/2 w-[50vw] h-[50vh] bg-sky-100/30 dark:bg-sky-900/10 rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-sm font-medium text-secondary mx-auto lg:mx-0">
                                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse" />
                                Board-Certified Ophthalmologist
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl font-serif text-primary leading-[1.1]">
                                Artistry & Precision in <span className="text-secondary italic block sm:inline">Oculoplastic Surgery</span>
                            </h1>

                            <div className="space-y-4 max-w-[600px] mx-auto lg:mx-0">
                                <h2 className="text-xl font-medium text-foreground/80 font-serif">
                                    Nicolas G Biro, M.D.
                                </h2>
                                <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                                    Restoring confidence through advanced reconstructive care and aesthetic excellence.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start pt-4 w-full sm:w-auto">
                            <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all w-full sm:w-auto" asChild>
                                <Link href="/contact">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Book Consultation
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary/10 text-primary hover:bg-secondary/5 hover:text-secondary hover:border-secondary/20 transition-all w-full sm:w-auto" asChild>
                                <Link href="/procedures">
                                    View Procedures
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>

                        <div className="pt-8 border-t border-border/50 max-w-[500px] mx-auto lg:mx-0">
                            <p className="text-sm text-muted-foreground">
                                Proudly affiliated with the prestigious <span className="text-primary font-semibold">Wills Eye Hospital</span>
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="relative mx-auto w-full max-w-[500px]"
                    >
                        {/* Organic shape backdrop */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[45%] w-[110%] h-[110%] bg-gradient-to-tr from-secondary/10 to-primary/5 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-3xl opacity-70" />

                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-border/50 bg-white dark:bg-slate-900 border border-white/20">
                            <Image
                                src={`${process.env.NODE_ENV === 'production' ? '/BiroMD' : ''}/images/dr-biro-portrait.png`}
                                alt="Dr. Nicolas G. Biro"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 500px"
                            />

                            {/* Refined Glass card overlay */}
                            <div className="absolute bottom-6 right-6 left-6 p-5 bg-white/70 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl z-20 isolate will-change-transform">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-slate-800 flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg shrink-0">
                                        B
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-0.5">Focus</p>
                                        <p className="text-base font-medium text-primary dark:text-white leading-tight">Cosmetic & Reconstructive Excellence</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
