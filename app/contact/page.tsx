import Link from "next/link"
import { Clock3, Mail, MapPin, PhoneCall } from "lucide-react"
import { ContactIntakeForm } from "@/components/contact-intake-form"
import { Button } from "@/components/ui/button"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Request a consultation with Dr. Nicolas G Biro for cosmetic or reconstructive oculoplastic care.",
  path: "/contact",
})

const contactCards = [
  {
    title: "Office",
    description: siteConfig.location,
    icon: MapPin,
  },
  {
    title: "Phone",
    description: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phoneHref}`,
    icon: PhoneCall,
  },
  {
    title: "Email",
    description: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    title: "Hours",
    description: siteConfig.hours,
    icon: Clock3,
  },
]

export default function ContactPage() {
  return (
    <div className="pb-20 pt-12 md:pb-24 md:pt-16">
      <section className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Contact
            </p>
            <h1 className="text-5xl font-semibold text-primary sm:text-6xl">
              Start with a Focused Consultation
            </h1>
            <p className="text-lg text-muted-foreground">
              Share your concerns and treatment goals to receive a thoughtful,
              medically grounded recommendation from Dr. Biro&apos;s team.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {contactCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-xl border border-border/70 bg-card/85 p-4 shadow-sm"
                >
                  <div className="mb-3 inline-flex rounded-lg border border-secondary/35 bg-secondary/10 p-2 text-secondary">
                    <card.icon className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-medium text-primary">{card.title}</h2>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-secondary"
                    >
                      {card.description}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>
                  )}
                </article>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={`tel:${siteConfig.phoneHref}`}>Call the Office</a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services">Review Services</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-border/70 bg-card/85 p-6 shadow-xl shadow-primary/10 md:p-8">
            <h2 className="text-3xl font-medium text-primary">Send a Message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We will respond with next-step guidance and scheduling details.
            </p>
            <div className="mt-6">
              <ContactIntakeForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
