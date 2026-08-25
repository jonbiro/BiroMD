import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Outfit } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SkipLink } from "@/components/skip-link"
import { versionedBrandAsset } from "@/lib/brand-assets"
import {
  absoluteUrl,
  officeClinicSchema,
  physicianId,
  physicianPersonId,
  physicianProfileUrls,
  siteConfig,
} from "@/lib/site"
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
const websiteId = absoluteUrl("/#website")
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim()
const bingSiteVerification = process.env.BING_SITE_VERIFICATION?.trim()
const homepageTitle = "Eyelid Surgery & Blepharoplasty in Los Angeles | Biro MD"
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "connect-src 'self'",
  "frame-src 'none'",
].join("; ")

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homepageTitle,
    template: `%s | ${siteConfig.alternateName}`,
  },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  category: "healthcare",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    title: homepageTitle,
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
    title: homepageTitle,
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
      alternateName: siteConfig.alternateName,
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
      employee: { "@id": physicianPersonId },
      workLocation: siteConfig.offices.map((office) => ({
        "@id": absoluteUrl(`/locations/${office.id}#office`),
      })),
    },
    // schema.org Physician is an organization type, so the human surgeon needs a
    // Person node for credentials and training to attach to. Only assert what the
    // site already publishes on /about; never add unverified credentials here.
    {
      "@type": "Person",
      "@id": physicianPersonId,
      name: "Nicolas Biro",
      honorificSuffix: "M.D.",
      jobTitle: "Oculoplastic and Orbital Surgeon",
      description: siteConfig.description,
      image: portraitImage,
      url: absoluteUrl("/about"),
      knowsLanguage: ["en", "es", "fr"],
      knowsAbout: procedures.map((procedure) => procedure.title),
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "University of South Florida",
        },
        {
          "@type": "MedicalOrganization",
          name: "Wills Eye Hospital",
          url: "https://www.willseye.org/",
        },
      ],
      worksFor: { "@id": physicianId },
      sameAs: physicianProfileUrls,
    },
    ...siteConfig.offices.map((office) => officeClinicSchema(office)),
  ],
}

const themeInitScript = String.raw`
(() => {
  let savedTheme = null;
  try { savedTheme = localStorage.getItem("biromd-theme"); } catch {}
  const systemPrefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  const useDarkTheme = savedTheme === "dark" || (savedTheme !== "light" && systemPrefersDark);
  document.documentElement.classList.toggle("dark", useDarkTheme);
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {process.env.NODE_ENV === "production" ? (
          <script src="/site-controls.js" defer />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${outfit.variable} ${cormorant.variable}`}>
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
      </body>
    </html>
  )
}
