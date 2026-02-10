import Link from "next/link"
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full bg-slate-900 text-slate-200 py-16 md:py-20 border-t border-slate-800 relative overflow-hidden pb-[env(safe-area-inset-bottom)]">
            {/* Subtle top gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">Nicolas G Biro, <span className="text-secondary italic">M.D.</span></h3>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            Board-certified Ophthalmologist specializing in Ocular Plastic Surgery.
                            <br /><br />
                            Providing expert cosmetic and reconstructive care in Los Angeles.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Practice</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/about" className="hover:text-secondary transition-colors inline-flex items-center group">About Dr. Biro <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            <li><Link href="/services" className="hover:text-secondary transition-colors inline-flex items-center group">Services <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            <li><Link href="/procedures" className="hover:text-secondary transition-colors inline-flex items-center group">Procedures <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            <li><Link href="/contact" className="hover:text-secondary transition-colors inline-flex items-center group">Contact Us <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Contact</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3 group">
                                <div className="mt-0.5 p-2 rounded-full bg-slate-800 group-hover:bg-secondary/20 group-hover:text-secondary transition-colors">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <span>Los Angeles, CA<br />(Address Placeholder)</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 rounded-full bg-slate-800 group-hover:bg-secondary/20 group-hover:text-secondary transition-colors">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <a href="tel:+13105550123" className="hover:text-white transition-colors">(310) 555-0123</a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 rounded-full bg-slate-800 group-hover:bg-secondary/20 group-hover:text-secondary transition-colors">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <a href="mailto:info@biromd.com" className="hover:text-white transition-colors">info@biromd.com</a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Affiliations</h4>
                        <div className="flex items-center gap-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            {/* Placeholder for Wills Eye logo or text if no logo available yet */}
                            <div className="text-sm font-bold text-white">Wills Eye Hospital</div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Nicolas G Biro, M.D. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-500">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
