import Link from "next/link"
import { Clock3, Mail, MapPin, PhoneCall } from "lucide-react"
import { ContactIntakeForm } from "@/components/contact-intake-form"
import { PageIntro } from "@/components/page-intro"
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
    <div className="space-y-10 pb-20 pt-10 md:space-y-12 md:pb-24 md:pt-12">
      <PageIntro
        eyebrow="Contact"
        title="Start with a Focused Consultation"
        description="Share your concerns and treatment goals to receive a thoughtful, medically grounded recommendation from Dr. Biro's team."
        actions={
          <>
            <Button asChild>
              <a href={`tel:${siteConfig.phoneHref}`}>Call the Office</a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">Review Services</Link>
            </Button>
          </>
        }
      />

      <section className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="grid gap-3 sm:grid-cols-2">
            {contactCards.map((card) => (
              <article key={card.title} className="panel rounded-xl p-4">
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

          <div className="panel-strong rounded-[1.8rem] p-6 md:p-8">
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
