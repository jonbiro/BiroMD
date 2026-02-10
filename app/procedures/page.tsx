import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"

const categories = [
    {
        title: "Cosmetic & Reconstructive Surgery",
        items: [
            "Upper and lower eyelid lifts (Blepharoplasty)",
            "Ptosis (Droopy eyelids)",
            "Entropion and Ectropion repair",
            "Eyelid cancer excision and reconstruction",
            "Moh’s reconstruction",
            "Tearing and blocked tear ducts",
            "Thyroid eye disease (Graves’ disease)",
            "Orbital tumors",
        ],
    },
    {
        title: "Non-Surgical Treatments",
        items: [
            "BOTOX® injections",
            "Facial fillers",
            "Minimally-invasive eye and face care",
        ],
    },
]

export default function ProceduresPage() {
    return (
        <div className="container py-16 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif text-primary mb-6">
                    Procedures & Specialties
                </h1>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                    Dr. Biro offers a comprehensive range of surgical and non-surgical treatments for the eyes and face, combining medical expertise with aesthetic precision.
                </p>

                <div className="space-y-16">
                    {categories.map((category, index) => (
                        <div key={index} id={category.title.toLowerCase().replace(/\s+/g, '-')}>
                            <h2 className="text-2xl font-bold text-foreground mb-6 border-b pb-2">
                                {category.title}
                            </h2>
                            <ul className="grid gap-4 sm:grid-cols-2">
                                {category.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-transparent hover:border-border transition-colors">
                                        <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                                        <span className="text-foreground/90 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-primary text-primary-foreground p-8 rounded-xl text-center shadow-lg">
                    <h3 className="text-2xl font-bold font-serif mb-4">Ready to discuss your options?</h3>
                    <p className="mb-8 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                        Whether you need reconstructive surgery or are interested in cosmetic enhancements, Dr. Biro is here to help.
                    </p>
                    <Button size="lg" variant="secondary" className="px-8" asChild>
                        <Link href="/contact">Schedule a Consultation</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
