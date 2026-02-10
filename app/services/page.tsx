import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert, Activity, Sparkles, Eye, CheckCircle2 } from "lucide-react"

export const metadata = {
    title: "Services",
    description: "Comprehensive oculoplastic services including eyelid surgery, orbital surgery, and cosmetic treatments.",
}

const services = [
    {
        title: "Cosmetic Eyelid Surgery",
        description: "Rejuvenate your appearance with minimally invasive procedures tailored to your natural anatomy.",
        icon: Sparkles,
        features: ["Upper Blepharoplasty", "Lower Blepharoplasty", "Brow Lift", "Midface Lift"],
    },
    {
        title: "Reconstructive Surgery",
        description: "Restore function and aesthetics following trauma, tumor removal, or congenital conditions.",
        icon: ShieldAlert,
        features: ["Eyelid Skin Cancer Reconstruction", "Ptosis Repair (Droopy Eyelids)", "Ectropion/Entropion Repair", "Orbital Fracture Repair"],
    },
    {
        title: "Non-Surgical Treatments",
        description: "Enhance your natural beauty with non-invasive injectable treatments and medical-grade aesthetics.",
        icon: Eye,
        features: ["BOTOX® Cosmetic", "Dermal Fillers", "Chemical Peels", "Latisse®"],
    },
]

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100/50 via-transparent to-transparent dark:from-sky-900/20" />
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-serif text-primary">
                            Our Services
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-[700px]">
                            We offer a comprehensive range of surgical and non-surgical treatments for the eyes and face, combining medical precision with aesthetic artistry.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-background">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
                        {services.map((service, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-secondary/30">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                        <service.icon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold font-serif text-primary mb-2">{service.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                                    </div>
                                </div>

                                <ul className="grid gap-3 sm:grid-cols-2 mt-6 pt-6 border-t border-border/50">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                                            <CheckCircle2 className="h-4 w-4 text-secondary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
                <div className="container px-4 md:px-6 relative z-10 text-center space-y-8">
                    <h2 className="text-3xl font-bold font-serif sm:text-4xl">Ready to Discuss Your Needs?</h2>
                    <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
                        Schedule a consultation with Dr. Biro to explore the best treatment options for your specific goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" variant="secondary" className="text-primary font-semibold text-lg px-8" asChild>
                            <Link href="/contact">Book Consultation</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 text-lg px-8" asChild>
                            <Link href="/contact">Contact Office</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
