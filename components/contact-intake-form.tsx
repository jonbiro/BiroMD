"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/lib/site"

export function ContactIntakeForm() {
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)

    const firstName = String(formData.get("firstName") ?? "").trim()
    const lastName = String(formData.get("lastName") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()

    if (!firstName || !lastName || !email || !message) {
      setError("Please complete all required fields before submitting.")
      return
    }

    const subject = `Consultation request: ${firstName} ${lastName}`
    const body = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n")

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="first-name" className="text-sm font-medium text-foreground/90">
            First name
          </label>
          <Input
            id="first-name"
            name="firstName"
            autoComplete="given-name"
            placeholder="John"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="last-name" className="text-sm font-medium text-foreground/90">
            Last name
          </label>
          <Input
            id="last-name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground/90">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground/90">
            Phone (optional)
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(310) 555-0123"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground/90">
          How can we help?
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Share your goals, concerns, and preferred timeline."
          required
        />
      </div>

      {error ? (
        <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="w-full">
        Create Consultation Email
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </Button>

      <p className="text-xs text-muted-foreground">
        Submission opens your email app with a pre-filled message to
        {" "}
        {siteConfig.email}.
      </p>
    </form>
  )
}
