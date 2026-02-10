import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="container py-16 px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif text-primary mb-6">
                            Contact Us
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            We look forward to hearing from you. Please contact our office to schedule a consultation with Dr. Biro.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Office Location</h3>
                                <p className="text-muted-foreground">
                                    Los Angeles, CA<br />
                                    [Address Placeholder]
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Phone</h3>
                                <p className="text-muted-foreground">
                                    <a href="tel:+13105550123" className="hover:text-primary transition-colors">(310) 555-0123</a>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Email</h3>
                                <p className="text-muted-foreground">
                                    <a href="mailto:info@biromd.com" className="hover:text-primary transition-colors">info@biromd.com</a>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Office Hours</h3>
                                <p className="text-muted-foreground">
                                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                                    Saturday - Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border shadow-sm">
                    <h2 className="text-2xl font-bold font-serif mb-6">Send us a message</h2>
                    <form className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="first-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">First name</label>
                                <Input id="first-name" placeholder="John" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="last-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Last name</label>
                                <Input id="last-name" placeholder="Doe" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                            <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                            <Textarea id="message" placeholder="How can we help you?" required />
                        </div>
                        <Button type="submit" className="w-full h-12 text-base">Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
