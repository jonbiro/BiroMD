import { PageIntro } from "@/components/page-intro"
import { pageMetadata, siteConfig } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Accessibility",
  description:
    "Accessibility support and feedback information for the BiroMD website and practice.",
  path: "/accessibility",
})

export default function AccessibilityPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Accessibility"
        title="Accessing Our Website and Services"
        description="We want patients with disabilities to be able to access practice information and request communication in a format that works for them."
      />

      <section className="container px-4 md:px-6">
        <div className="panel mx-auto max-w-4xl space-y-7 rounded-[1.8rem] p-6 md:p-9">
          <div>
            <h2 className="text-3xl font-semibold">Website support</h2>
            <p className="mt-2 text-muted-foreground">
              The site supports keyboard navigation, visible focus indicators,
              descriptive links and controls, reduced-motion preferences, responsive text,
              and light or dark color themes.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Request assistance</h2>
            <p className="mt-2 text-muted-foreground">
              If you encounter an accessibility barrier or need information in
              another format, call the most convenient office:
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {siteConfig.offices.map((office) => (
                <li key={office.id}>
                  <a
                    className="flex min-h-12 flex-col justify-center rounded-xl border border-border bg-accent/45 px-4 py-2 font-medium text-secondary underline underline-offset-4"
                    href={`tel:${office.phoneHref}`}
                  >
                    <span className="text-sm text-foreground">{office.name}</span>
                    <span>{office.phoneDisplay}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Feedback</h2>
            <p className="mt-2 text-muted-foreground">
              When reporting a problem, include the page address, the task you
              were trying to complete, and the browser or assistive technology
              you were using. Email{" "}
              <a
                className="font-medium text-secondary underline underline-offset-4"
                href={`mailto:${siteConfig.email}?subject=Website%20accessibility%20feedback`}
              >
                {siteConfig.email}
              </a>
              , and do not include private medical information.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
