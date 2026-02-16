import type { Metadata } from "next"

const productionBasePath = process.env.NODE_ENV === "production" ? "/BiroMD" : ""

export const siteConfig = {
  name: "Nicolas Biro, M.D.",
  legalName: "Nicolas Biro, M.D. Oculoplastic Surgery",
  shortName: "Dr. Nicolas Biro",
  url: "https://biromd.com",
  basePath: productionBasePath,
  description:
    "Board-certified ophthalmologist providing cosmetic and reconstructive oculoplastic care in Los Angeles.",
  email: "info@biromd.com",
  phoneDisplay: "(805) 987-5300",
  phoneHref: "+18059875300",
  location: "Westlake Village & Rancho Cucamonga, California",
  offices: [
    {
      name: "Westlake Village",
      address: "4353 Park Terrace Dr #150, Westlake Village, CA 91361",
      phoneDisplay: "(805) 987-5300",
      phoneHref: "+18059875300",
    },
    {
      name: "Rancho Cucamonga",
      address: "9481 Haven Ave Suite 200, Rancho Cucamonga, CA 91730",
      phoneDisplay: "(909) 937-9230",
      phoneHref: "+19099379230",
    },
  ],
  languages: ["English", "Spanish", "French"],
  areaServed: ["Los Angeles"],
  serviceAreaLabel: "the greater Los Angeles area",
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
