import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SkipLink } from "@/components/skip-link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://biromd.com"),
  title: {
    default: "Nicolas G Biro, M.D. | Oculoplastic Surgery",
    template: "%s | Nicolas G Biro, M.D.",
  },
  description: "Board-certified Ophthalmologist specializing in Ocular Plastic Surgery in Los Angeles. Affiliated with Wills Eye Hospital.",
  keywords: [
    "Oculoplastic Surgery",
    "Eyelid Surgery",
    "Blepharoplasty",
    "Los Angeles Ophthalmologist",
    "Dr. Nicolas Biro",
    "Reconstructive Eye Surgery",
    "Cosmetic Eyelid Surgery"
  ],
  authors: [{ name: "Nicolas G Biro, M.D." }],
  creator: "Nicolas G Biro, M.D.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://biromd.com",
    title: "Nicolas G Biro, M.D. | Oculoplastic Surgery",
    description: "Expert cosmetic and reconstructive care for the eyes and face in Los Angeles.",
    siteName: "Nicolas G Biro, M.D.",
    images: [
      {
        url: "/images/dr-biro-portrait.png",
        width: 1200,
        height: 630,
        alt: "Dr. Nicolas G Biro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicolas G Biro, M.D.",
    description: "Expert cosmetic and reconstructive care for the eyes and face in Los Angeles.",
    images: ["/images/dr-biro-portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          playfair.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SkipLink />
            <Header />
            <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
