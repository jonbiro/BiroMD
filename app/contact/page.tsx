import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { AlertTriangle, Mail, MapPin, PhoneCall } from "lucide-react"
import { ContactIntakeForm } from "@/components/contact-intake-form"
import { PageIntro } from "@/components/page-intro"
import { Button } from "@/components/ui/button"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Request a consultation with Dr. Nicolas Biro for cosmetic or reconstructive oculoplastic care.",
  path: "/contact",
})

type ContactCard = {
  title: string
  description: string
  icon: LucideIcon
  href?: string
}

const contactCards: ContactCard[] = [
  ...siteConfig.offices.map((office) => ({
    title: `${office.name} Office`,
    description: office.address,
    icon: MapPin,
  })),
  ...siteConfig.offices.map((office) => ({
    title: `${office.name} Phone`,
    description: office.phoneDisplay,
    href: `tel:${office.phoneHref}`,
    icon: PhoneCall,
  })),
  {
    title: "Email",
    description: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
]

export default function ContactPage() {
  return (
    <div className="space-y-10 pb-20 pt-10 md:space-y-12 md:pb-24 md:pt-12">
      <PageIntro
        eyebrow="Contact"
        title="Request Consultation Scheduling"
        description="Choose an office and contact the team to arrange a consultation. Medical recommendations are provided only after an appropriate clinical evaluation."
        actions={
          <>
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
            <h2 className="text-3xl font-medium text-primary">
              Request Scheduling by Email
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create a short email containing only your contact details and
              preferred office. Please do not send medical details or photographs.
            </p>
            <div className="mt-6">
              <ContactIntakeForm />
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-5 text-sm text-amber-950 dark:border-amber-500/35 dark:bg-amber-950/35 dark:text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <h2 className="font-sans text-base font-semibold text-current">
              This contact channel is not for emergencies
            </h2>
            <p className="mt-1">
              Do not use email for urgent eye symptoms or time-sensitive medical
              concerns. Call the appropriate office. For a medical emergency,
              call 911 or go to the nearest emergency department.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
