"use client"

import * as React from "react"
import { ArrowUpRight, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/lib/site"

export function ContactIntakeForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const firstName = String(formData.get("firstName") ?? "").trim()
    const lastName = String(formData.get("lastName") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const office = String(formData.get("office") ?? "No preference")

    const subject = `Scheduling request: ${firstName} ${lastName}`
    const body = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Preferred office: ${office}`,
      "",
      "Please contact me to discuss consultation scheduling.",
    ].join("\n")

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-describedby="email-privacy-note"
    >
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
        <label htmlFor="office" className="text-sm font-medium text-foreground/90">
          Preferred office
        </label>
        <select
          id="office"
          name="office"
          defaultValue="No preference"
          className="flex h-11 w-full rounded-xl border border-input bg-card/80 px-3 py-2 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option>No preference</option>
          {siteConfig.offices.map((office) => (
            <option key={office.name}>{office.name}</option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/70 p-4 text-sm text-foreground/90">
        <input
          type="checkbox"
          name="privacyAcknowledgment"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-secondary"
        />
        <span>
          I understand that ordinary email may not be secure. I will not include
          medical details, photographs, insurance information, or other
          sensitive information in the email.
        </span>
      </label>

      <Button type="submit" className="w-full">
        Open Email to Request Scheduling
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </Button>

      <p
        id="email-privacy-note"
        className="flex items-start gap-2 text-xs text-muted-foreground"
      >
        <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
        This does not submit information through the website. It opens your
        email app with contact and office-preference details only. You may call
        either office instead.
      </p>
    </form>
  )
}
