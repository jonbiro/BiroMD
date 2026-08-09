import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Outfit } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SiteControlsScript } from "@/components/site-controls-script"
import { SkipLink } from "@/components/skip-link"
import { versionedBrandAsset } from "@/lib/brand-assets"
import { absoluteUrl, physicianProfileUrls, siteConfig } from "@/lib/site"
import { procedures } from "@/lib/procedures"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030711" },
  ],
}

const socialImage = absoluteUrl(versionedBrandAsset("/images/biromd-social-card.png"))
const portraitImage = absoluteUrl(
  versionedBrandAsset("/images/portrait/dr-biro-portrait-960.webp")
)
const physicianId = absoluteUrl("/#physician")
const websiteId = absoluteUrl("/#website")
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim()
const bingSiteVerification = process.env.BING_SITE_VERIFICATION?.trim()

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Oculoplastic Surgery`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
  keywords: [
    "Oculoplastic surgery",
    "Eyelid surgery",
    "Blepharoplasty",
    "Ptosis repair",
    "Orbital surgery",
    "Ophthalmologist Los Angeles",
    "Oculoplastic surgeon downtown Los Angeles",
    "Oculoplastic surgeon Burbank",
    "Oculoplastic surgeon Westlake Village",
    "Oculoplastic surgeon Rancho Cucamonga",
    "Dr Nicolas Biro",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  category: "healthcare",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    title: `${siteConfig.name} | Oculoplastic Surgery`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}, Oculoplastic Surgery`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Oculoplastic Surgery`,
    description: siteConfig.description,
    images: [socialImage],
  },
  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    ...(bingSiteVerification
      ? { other: { "msvalidate.01": bingSiteVerification } }
      : {}),
  },
  robots: { index: true, follow: true },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.name,
      alternateName: "Biro MD",
      url: absoluteUrl("/"),
      inLanguage: "en-US",
      publisher: { "@id": physicianId },
    },
    {
      "@type": "Physician",
      "@id": physicianId,
      name: siteConfig.name,
      description: siteConfig.description,
      medicalSpecialty: "Ophthalmology",
      knowsAbout: procedures.map((procedure) => procedure.title),
      areaServed: siteConfig.areaServed,
      availableLanguage: siteConfig.languages,
      email: siteConfig.email,
      image: portraitImage,
      url: absoluteUrl("/"),
      sameAs: physicianProfileUrls,
      workLocation: siteConfig.offices.map((office) => ({
        "@id": absoluteUrl(`/locations/${office.id}#office`),
      })),
    },
    ...siteConfig.offices.map((office) => ({
      "@type": "MedicalClinic",
      "@id": absoluteUrl(`/locations/${office.id}#office`),
      name: `${siteConfig.shortName} - ${office.name}`,
      url: absoluteUrl(`/locations/${office.id}`),
      telephone: office.phoneHref,
      address: {
        "@type": "PostalAddress",
        streetAddress: office.streetAddress,
        addressLocality: office.addressLocality,
        addressRegion: office.addressRegion,
        postalCode: office.postalCode,
        addressCountry: "US",
      },
      employee: { "@id": physicianId },
      availableLanguage: siteConfig.languages,
      medicalSpecialty: "Ophthalmology",
    })),
  ],
}

const themeInitScript =
  'try{document.documentElement.classList.toggle("dark",localStorage.getItem("biromd-theme")==="dark")}catch{}'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          outfit.variable,
          cormorant.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <div className="relative flex min-h-screen flex-col">
          <SkipLink />
          <Header />
          <main
            id="main-content"
            className="relative flex-1 focus:outline-none"
            tabIndex={-1}
          >
            {children}
          </main>
          <Footer />
        </div>
        <SiteControlsScript />
      </body>
    </html>
  )
}
