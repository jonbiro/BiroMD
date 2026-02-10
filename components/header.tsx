import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6 transition-all">
                <Link href="/" className="flex items-center space-x-2 group">
                    <span className="text-xl md:text-2xl font-bold tracking-tight font-serif text-primary group-hover:opacity-80 transition-opacity">
                        Nicolas G Biro, <span className="text-secondary italic">M.D.</span>
                    </span>
                </Link>
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
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5" size="default" asChild>
                        <Link href="/contact">Book Consultation</Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
