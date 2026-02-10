import Link from "next/link"
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full py-16 px-4 md:px-6 border-t border-border/50 bg-background relative overflow-hidden">
            {/* Gradient Top Border & Background */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent opacity-50" />
            <div className="absolute inset-0 bg-secondary/5 pointer-events-none" />

            <div className="container grid gap-12 sm:grid-cols-2 md:grid-cols-4 relative z-10">
                <div className="space-y-6">
                    <h3 className="text-xl font-bold font-serif text-primary tracking-wide">Nicolas G Biro, M.D.</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-[250px]">
                        Board-certified ophthalmologist specializing in cosmetic and reconstructive oculoplastic surgery.
                    </p>
                </div>
                <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-secondary/90">Contact</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-3 group">
                            <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0 group-hover:text-secondary transition-colors" />
                            <a href="mailto:info@biromd.com" className="hover:text-foreground transition-colors border-b border-transparent hover:border-foreground/20 padding-b-0.5">info@biromd.com</a>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <span>Available in PA, NJ, and NY</span>
                        </li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-secondary/90">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="/about" className="hover:text-primary transition-colors inline-flex items-center group">About Dr. Biro <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0 text-secondary" /></Link></li>
                        <li><Link href="/services" className="hover:text-primary transition-colors inline-flex items-center group">Services <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0 text-secondary" /></Link></li>
                        <li><Link href="/procedures" className="hover:text-primary transition-colors inline-flex items-center group">Procedures <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0 text-secondary" /></Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors inline-flex items-center group">Contact Us <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0 text-secondary" /></Link></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-secondary/90">Affiliations</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-secondary shrink-0" />
                            <span className="font-medium text-foreground/80">Wills Eye Hospital</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-secondary shrink-0" />
                            <span className="font-medium text-foreground/80">American Academy of Ophthalmology</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mt-16 pt-8 border-t border-border/40 text-center text-xs text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Nicolas G Biro, M.D. All rights reserved.</p>
                <p className="opacity-70">Designed with care for patient confidence.</p>
            </div>
        </footer>
    )
}
