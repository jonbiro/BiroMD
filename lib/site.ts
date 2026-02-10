import type { Metadata } from "next"

const productionBasePath = process.env.NODE_ENV === "production" ? "/BiroMD" : ""

export const siteConfig = {
  name: "Nicolas G Biro, M.D.",
  legalName: "Nicolas G Biro, M.D. Oculoplastic Surgery",
  shortName: "Dr. Nicolas Biro",
  url: "https://biromd.com",
  basePath: productionBasePath,
  description:
    "Board-certified ophthalmologist providing cosmetic and reconstructive oculoplastic care in Los Angeles.",
  email: "info@biromd.com",
  phoneDisplay: "(310) 555-0123",
  phoneHref: "+13105550123",
  location: "Los Angeles, California",
  hours: "Monday to Friday, 9:00 AM to 5:00 PM",
  languages: ["English", "Spanish", "French"],
  statesServed: ["California", "Pennsylvania", "New Jersey", "New York"],
} as const

export const navItems = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/procedures", label: "Procedures" },
  { href: "/contact", label: "Contact" },
] as const

export function withBasePath(path = "/"): string {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  const normalized = path.startsWith("/") ? path : `/${path}`

  if (!siteConfig.basePath) {
    return normalized
  }

  if (normalized === "/") {
    return siteConfig.basePath
  }

  return `${siteConfig.basePath}${normalized}`
}

export function absoluteUrl(path = "/"): string {
  return new URL(withBasePath(path), siteConfig.url).toString()
}

type PageMetadataOptions = {
  title: string
  description: string
  path: string
}

export function pageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path)
  const socialImage = absoluteUrl("/images/dr-biro-portrait.png")

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
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
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [socialImage],
    },
  }
}
