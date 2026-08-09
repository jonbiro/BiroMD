import type { Metadata } from "next"
import { versionedBrandAsset } from "@/lib/brand-assets"

export const offices = [
  {
    id: "westlake-village",
    name: "Westlake Village",
    practiceName: "DLV Vision",
    practiceUrl:
      "https://www.doughertylaservision.com/our-doctors/nicolas-biro-md/",
    address: "4353 Park Terrace Dr, Suite 150, Westlake Village, CA 91361",
    streetAddress: "4353 Park Terrace Dr, Suite 150",
    addressLocality: "Westlake Village",
    addressRegion: "CA",
    postalCode: "91361",
    phoneDisplay: "(805) 987-5300",
    phoneHref: "+18059875300",
    appointmentMode: "online",
    bookingUrl:
      "https://schedule.solutionreach.com/scheduling/subscriber/54167/scheduler-basic",
    contactCardUrl: "/contact-cards/dr-biro-westlake-village.vcf",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=4353%20Park%20Terrace%20Dr%20Suite%20150%2C%20Westlake%20Village%2C%20CA%2091361",
    privacyUrl: "https://www.doughertylaservision.com/privacy-policy/",
    noticeUrl:
      "https://www.doughertylaservision.com/wp-content/uploads/2025/02/DLV-Cataract-Packet-editable.pdf",
  },
  {
    id: "rancho-cucamonga",
    name: "Rancho Cucamonga",
    practiceName: "Pacific Eye Institute",
    practiceUrl: "https://www.pacificeyemd.com/doctors/nicolas-biro-m-d/",
    address: "9481 Haven Ave, Suite 200, Rancho Cucamonga, CA 91730",
    streetAddress: "9481 Haven Ave, Suite 200",
    addressLocality: "Rancho Cucamonga",
    addressRegion: "CA",
    postalCode: "91730",
    phoneDisplay: "(909) 937-9230",
    phoneHref: "+19099379230",
    appointmentMode: "online",
    bookingUrl: "https://www.pacificeyemd.com/request-an-appointment/",
    contactCardUrl: "/contact-cards/dr-biro-rancho-cucamonga.vcf",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=9481%20Haven%20Ave%20Suite%20200%2C%20Rancho%20Cucamonga%2C%20CA%2091730",
    privacyUrl: "https://inlandeye.com/privacy-policy/",
    noticeUrl:
      "https://www.pacificeyemd.com/wp-content/uploads/New-Patient-Paperwork-Jan-2026.pdf",
  },
  {
    id: "burbank",
    name: "Burbank",
    practiceName: "A Center for Vision Care",
    practiceUrl: "https://www.acvci.com/",
    address: "2031 W Alameda Ave, Suite 300, Burbank, CA 91506",
    streetAddress: "2031 W Alameda Ave, Suite 300",
    addressLocality: "Burbank",
    addressRegion: "CA",
    postalCode: "91506",
    phoneDisplay: "(818) 762-0647",
    phoneHref: "+18187620647",
    appointmentMode: "phone",
    bookingUrl: "tel:+18187620647",
    contactCardUrl: "/contact-cards/dr-biro-burbank.vcf",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=2031%20W%20Alameda%20Ave%20Suite%20300%2C%20Burbank%2C%20CA%2091506",
    privacyUrl: null,
    noticeUrl: null,
  },
] as const

export type Office = (typeof offices)[number]

export const physicianProfileUrls = [
  offices[0].practiceUrl,
  offices[1].practiceUrl,
  "https://www.healthgrades.com/physician/dr-nicolas-biro-xv4fv",
  "https://doctor.webmd.com/doctor/nicolas-biro-28e322ee-dec5-11e7-9f4c-005056a225bf-overview",
  "https://www.linkedin.com/in/nicolas-biro-045a92105",
] as const

export const patientFeedbackProfiles = [
  {
    name: "Healthgrades",
    description: "Independent physician profile and patient feedback",
    url: "https://www.healthgrades.com/physician/dr-nicolas-biro-xv4fv",
  },
  {
    name: "WebMD Care",
    description: "Independent physician profile and patient feedback",
    url: "https://doctor.webmd.com/doctor/nicolas-biro-28e322ee-dec5-11e7-9f4c-005056a225bf-overview",
  },
  {
    name: "Pacific Eye Institute",
    description: "Patient feedback published by the affiliated practice",
    url: "https://inlandeye.com/about/reviews/",
  },
] as const

export const siteConfig = {
  name: "Nicolas Biro, M.D.",
  legalName: "Nicolas Biro, M.D. Oculoplastic Surgery",
  shortName: "Dr. Nicolas Biro",
  url: "https://biromd.com",
  basePath: "",
  description:
    "Board-certified ophthalmologist providing cosmetic and reconstructive oculoplastic care in Burbank, Westlake Village, and Rancho Cucamonga, California.",
  email: "info@biromd.com",
  phoneDisplay: offices[0].phoneDisplay,
  phoneHref: offices[0].phoneHref,
  location: "Burbank, Westlake Village, and Rancho Cucamonga, California",
  offices,
  languages: ["English", "Spanish", "French"],
  areaServed: ["Los Angeles"],
  serviceAreaLabel: "Los Angeles",
} as const

export const primaryNavItems = [
  { href: "/concerns", label: "Symptoms" },
  { href: "/procedures", label: "Procedures" },
  { href: "/about", label: "Dr. Biro" },
  { href: "/patient-guide", label: "Your Visit" },
  { href: "/gallery", label: "Results" },
  { href: "/locations", label: "Offices" },
] as const

export const navItems = [
  { href: "/about", label: "About" },
  { href: "/concerns", label: "Symptoms" },
  { href: "/services", label: "Services" },
  { href: "/procedures", label: "Procedures" },
  { href: "/patient-guide", label: "Your Visit" },
  { href: "/gallery", label: "Photos" },
  { href: "/locations", label: "Offices" },
  { href: "/referrals", label: "Referrals" },
  { href: "/contact", label: "Contact" },
] as const

export function withBasePath(path = "/"): string {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return path.startsWith("/") ? path : `/${path}`
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
  const socialImage = absoluteUrl(versionedBrandAsset("/images/biromd-social-card.png"))

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
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
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [socialImage],
    },
  }
}
