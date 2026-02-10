import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Outfit } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { SkipLink } from "@/components/skip-link"
import { absoluteUrl, siteConfig } from "@/lib/site"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#030711" },
  ],
}

const socialImage = absoluteUrl("/images/dr-biro-portrait.png")

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Oculoplastic Surgery`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  keywords: [
    "Oculoplastic surgery",
    "Eyelid surgery",
    "Blepharoplasty",
    "Ptosis repair",
    "Orbital surgery",
    "Ophthalmologist Los Angeles",
    "Dr Nicolas Biro",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  category: "healthcare",
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
        alt: `${siteConfig.shortName} portrait`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Oculoplastic Surgery`,
    description: siteConfig.description,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: siteConfig.name,
  description: siteConfig.description,
  medicalSpecialty: "Ophthalmology",
  areaServed: siteConfig.statesServed,
  availableLanguage: siteConfig.languages,
  email: siteConfig.email,
  telephone: siteConfig.phoneHref,
  image: socialImage,
  url: absoluteUrl("/"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          outfit.variable,
          cormorant.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
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
        </ThemeProvider>
      </body>
    </html>
  )
}
