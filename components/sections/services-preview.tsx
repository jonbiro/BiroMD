import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, Sparkles, Activity, ShieldAlert } from "lucide-react"

const services = [
    {
        title: "Cosmetic Surgery",
        description: "Upper and lower eyelid lifts (blepharoplasty) to rejuvenate the eyes.",
        icon: Sparkles,
    },
    {
        title: "Reconstructive Surgery",
        description: "Treatment for ptosis, ectropion, entropion, and eyelid cancer reconstruction.",
        icon: ShieldAlert,
    },
    {
        title: "Non-Surgical",
        description: "Injectables including BOTOX® and facial fillers for minimally invasive enhancement.",
        icon: Eye,
    },
]

export function ServicesPreview() {
    return (
        <section className="py-24 bg-muted/40 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
                            Our Expertise
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif text-primary">
                            Comprehensive Eye & Face Care
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-[600px]">
                            Specialized treatments tailored to your unique needs, from cosmetic enhancements to complex reconstruction.
                        </p>
                    </div>
                    <Button variant="outline" asChild className="hidden md:inline-flex border-secondary/20 text-secondary hover:bg-secondary hover:text-white transition-all">
                        <Link href="/procedures">View All Procedures <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/60 hover:border-secondary/30">
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                                <service.icon className="h-7 w-7" />
                            </div>

                            <h3 className="relative z-10 mb-3 text-xl font-bold font-serif text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">
                                {service.description}
                            </p>

                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-secondary">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/procedures">View All Procedures <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
