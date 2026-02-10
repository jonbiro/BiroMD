"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { AnimatePresence, motion } from "framer-motion"

export default function Header() {
    const [isOpen, setIsOpen] = React.useState(false)

    // Lock body scroll when menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6 transition-all">
                <Link href="/" className="flex items-center space-x-2 group z-50 relative" onClick={() => setIsOpen(false)}>
                    <span className="text-xl md:text-2xl font-bold tracking-tight font-serif text-primary group-hover:opacity-80 transition-opacity">
                        Nicolas G Biro, <span className="text-secondary italic">M.D.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    {["About", "Services", "Procedures", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="relative py-1 transition-colors hover:text-primary group/link"
                        >
                            {item}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover/link:w-full" />
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4 z-50 relative">
                    <div className="hidden md:block">
                        <ModeToggle />
                    </div>
                    <Button className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5" size="default" asChild>
                        <Link href="/contact">Book Consultation</Link>
                    </Button>

                    {/* Mobile Toggle */}
                    <Button variant="ghost" size="icon" className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-0 left-0 right-0 min-h-screen bg-background border-b border-border shadow-2xl md:hidden flex flex-col pt-24 px-6 pb-6 gap-8 overflow-y-auto"
                        >
                            <nav className="flex flex-col gap-6 text-lg font-medium">
                                {["About", "Services", "Procedures", "Contact"].map((item) => (
                                    <Link
                                        key={item}
                                        href={`/${item.toLowerCase()}`}
                                        className="py-2 border-b border-border/40 hover:text-secondary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </nav>

                            <div className="flex flex-col gap-6 mt-auto">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Switch Theme</span>
                                    <ModeToggle />
                                </div>
                                <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20" asChild onClick={() => setIsOpen(false)}>
                                    <Link href="/contact">Book Consultation</Link>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}
