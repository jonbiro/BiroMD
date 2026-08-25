import { expect, test, type Locator, type Page } from "@playwright/test"
import { brandAssetVersion } from "../lib/brand-assets"

const procedureSlugs = [
  "upper-blepharoplasty",
  "lower-blepharoplasty",
  "brow-lift",
  "ptosis-repair",
  "entropion-ectropion-repair",
  "eyelid-cancer-mohs-reconstruction",
  "tearing-blocked-tear-ducts",
  "thyroid-eye-disease",
  "orbital-tumors-trauma",
  "botox",
  "dermal-fillers",
]

const concernSlugs = [
  "droopy-heavy-upper-eyelids",
  "under-eye-bags",
  "constant-watery-eyes",
  "eyelid-turning-in-or-out",
  "eyelid-lesion-mohs-reconstruction",
  "bulging-eyes-thyroid-eye-disease",
  "sudden-eyelid-drooping",
]

const galleryCaseIds = (process.env.GALLERY_AUTHORIZED_CASE_IDS ?? "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean)

const galleryRouteAliases: Record<string, string> = {
  "eyelid-trauma": "mohs-eyelid-reconstruction",
}
const galleryPathForId = (id: string) => `/gallery/${galleryRouteAliases[id] ?? id}`

const publicRoutes = [
  "/",
  "/about",
  "/concerns",
  ...concernSlugs.map((slug) => `/concerns/${slug}`),
  "/procedures",
  "/patient-guide",
  ...procedureSlugs.map((slug) => `/procedures/${slug}`),
  "/gallery",
  ...galleryCaseIds.map((id) => galleryPathForId(id)),
  "/contact",
  "/locations",
  "/locations/westlake-village",
  "/locations/rancho-cucamonga",
  "/locations/burbank",
  "/locations/downtown-los-angeles",
  "/referrals",
  "/privacy",
  "/notice-of-privacy-practices",
  "/accessibility",
  "/content-standards",
]

function luminance([red, green, blue]: number[]) {
  const values = [red, green, blue].map((value) => {
    const channel = value / 255
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4)
  })
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722
}

function parseRgb(color: string) {
  const hex = color.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i)?.[1]
  if (hex) {
    const expanded = hex.length === 3
      ? [...hex].map((character) => character.repeat(2)).join("")
      : hex
    return [0, 2, 4].map((offset) => Number.parseInt(expanded.slice(offset, offset + 2), 16))
  }
  const values = color.match(/[\d.]+/g)?.slice(0, 3).map(Number)
  if (!values || values.length !== 3) throw new Error(`Unsupported color: ${color}`)
  return values
}

async function textContrast(locator: Locator) {
  const colors = await locator.evaluate((element) => {
    const styles = getComputedStyle(element)
    return { foreground: styles.color, background: styles.backgroundColor }
  })
  const foreground = luminance(parseRgb(colors.foreground))
  const background = luminance(parseRgb(colors.background))
  return (Math.max(foreground, background) + 0.05) /
    (Math.min(foreground, background) + 0.05)
}

async function expectNoHorizontalOverflow(page: Page, context = "page") {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }))
  expect(dimensions.content, `Horizontal overflow on ${context}`).toBeLessThanOrEqual(
    dimensions.viewport + 1
  )
}

async function expectMinimumTargetHeight(locator: Locator, context: string) {
  const heights = await locator.evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().height)
  )
  expect(heights.length, `No targets found for ${context}`).toBeGreaterThan(0)
  for (const height of heights) {
    expect(height, `Undersized target in ${context}`).toBeGreaterThanOrEqual(44)
  }
}

type JsonLdNode = Record<string, unknown>

async function structuredDataNodes(page: Page): Promise<JsonLdNode[]> {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()

  return blocks.flatMap((block) => {
    const parsed = JSON.parse(block) as JsonLdNode
    const graph = parsed["@graph"]
    return Array.isArray(graph) ? (graph as JsonLdNode[]) : [parsed]
  })
}

test("primary consultation action is readable in light and dark mode", async ({ page }) => {
  await page.goto("/")
  const cta = page.getByRole("link", { name: "Request a Consultation" }).first()
  await expect(cta).toBeVisible()
  expect(await textContrast(cta)).toBeGreaterThanOrEqual(4.5)

  await page.getByRole("button", { name: "Switch to dark mode" }).click()
  await expect(page.locator("html")).toHaveClass(/dark/)
  await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible()
  expect(await textContrast(cta)).toBeGreaterThanOrEqual(4.5)
  await page.getByRole("button", { name: "Switch to light mode" }).click()
  await expect.poll(async () => {
    const lightButtonColors = await cta.evaluate((element) => {
      const style = getComputedStyle(element)
      return {
        background: style.backgroundColor,
        border: style.borderTopColor,
      }
    })
    const lightBackground = parseRgb(lightButtonColors.background)
    const lightBorder = parseRgb(lightButtonColors.border)
    return Math.max(
      ...lightBorder.map((channel, index) => Math.abs(channel - lightBackground[index]))
    )
  }).toBeLessThanOrEqual(2)
  await expectNoHorizontalOverflow(page)
})

test("component styles allow utility and interaction states to override them", async ({ page }) => {
  await page.goto("/")

  const locationEyebrow = page.locator('main a.eyebrow[href="/locations"]')
  const eyebrowBackground = await locationEyebrow.evaluate(
    (element) => getComputedStyle(element).backgroundColor
  )
  await locationEyebrow.hover()
  await expect
    .poll(() => locationEyebrow.evaluate((element) => getComputedStyle(element).backgroundColor))
    .not.toBe(eyebrowBackground)

  const panel = page.locator("main .panel-strong").first()
  const panelBackground = await panel.evaluate((element) => {
    const before = getComputedStyle(element).backgroundColor
    element.classList.add("bg-amber-50")
    return before
  })
  await expect
    .poll(() => panel.evaluate((element) => getComputedStyle(element).backgroundColor))
    .not.toBe(panelBackground)
})

test("theme follows system preference and preserves an explicit choice", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" })
  await page.goto("/")

  const root = page.locator("html")
  const themeColors = page.locator('meta[name="theme-color"]')
  await expect(root).toHaveClass(/dark/)
  await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible()
  await expect.poll(() => themeColors.evaluateAll((metas) => metas.map((meta) => meta.getAttribute("content")))).toEqual(
    ["#030711", "#030711"]
  )
  await expect.poll(() => root.evaluate((element) => getComputedStyle(element).colorScheme)).toBe("dark")

  await page.emulateMedia({ colorScheme: "light" })
  await expect(root).not.toHaveClass(/dark/)
  await expect.poll(() => themeColors.evaluateAll((metas) => metas.map((meta) => meta.getAttribute("content")))).toEqual(
    ["#ffffff", "#ffffff"]
  )

  await page.emulateMedia({ colorScheme: "dark" })
  await expect(root).toHaveClass(/dark/)
  await page.getByRole("button", { name: "Switch to light mode" }).click()
  await expect(root).not.toHaveClass(/dark/)
  await page.reload()
  await expect(root).not.toHaveClass(/dark/)
  await expect(page.getByRole("button", { name: "Switch to dark mode" })).toBeVisible()
})

test("floating navigation exposes every primary link without a menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const navigation = page.getByRole("navigation", { name: "Primary" })
  await expect(navigation).toBeVisible()
  for (const name of ["Symptoms", "Procedures", "Dr. Biro", "Your Visit", "Results", "Offices"]) {
    await expect(navigation.getByRole("link", { name, exact: true })).toBeVisible()
  }
  const segmentedNavigationIsVisible = await navigation.evaluate((nav) => {
    const styles = getComputedStyle(nav)
    return (
      Number.parseFloat(styles.borderTopWidth) >= 1 &&
      styles.borderTopStyle === "solid" &&
      styles.borderTopColor !== "rgba(0, 0, 0, 0)" &&
      styles.backgroundColor !== "rgba(0, 0, 0, 0)" &&
      [...nav.querySelectorAll("a")].every(
        (link) => getComputedStyle(link).backgroundColor !== "rgba(0, 0, 0, 0)"
      )
    )
  })
  expect(segmentedNavigationIsVisible).toBe(true)
  const allLinksInsideNavigation = await navigation.evaluate((nav) => {
    const navBox = nav.getBoundingClientRect()
    return [...nav.querySelectorAll("a")].every((link) => {
      const linkBox = link.getBoundingClientRect()
      return linkBox.left >= navBox.left - 1 && linkBox.right <= navBox.right + 1
    })
  })
  expect(allLinksInsideNavigation).toBe(true)
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveCount(0)
  await expectNoHorizontalOverflow(page)

  const mobileHeaderLayout = await page.evaluate(() => {
    const shell = document.querySelector("[data-header-shell]")
    const brand = document.querySelector("[data-header-brand]")
    const navigation = document.querySelector("[data-floating-navigation]")
    const actions = document.querySelector("[data-header-actions]")
    if (!shell || !brand || !navigation || !actions) return null

    const shellBox = shell.getBoundingClientRect()
    const brandBox = brand.getBoundingClientRect()
    const navigationBox = navigation.getBoundingClientRect()
    const actionsBox = actions.getBoundingClientRect()
    return {
      shellTouchesViewport: Math.abs(shellBox.top) <= 1,
      compactHeight: shellBox.height <= 168,
      navigationInsideShell: shell.contains(navigation),
      navigationBelowTopRow:
        navigationBox.top >= Math.max(brandBox.bottom, actionsBox.bottom) - 1,
      shellContainsNavigation: navigationBox.bottom <= shellBox.bottom + 1,
    }
  })
  expect(mobileHeaderLayout).toEqual({
    shellTouchesViewport: true,
    compactHeight: true,
    navigationInsideShell: true,
    navigationBelowTopRow: true,
    shellContainsNavigation: true,
  })

  await page.setViewportSize({ width: 320, height: 700 })
  await page.goto("/")
  const narrowNavigation = page.getByRole("navigation", { name: "Primary" })
  const mobileBookingLink = page
    .locator("[data-header-actions]")
    .getByRole("link", { name: /^Request a Consultation$/i })
  await expect(mobileBookingLink).toBeVisible()
  await expect(mobileBookingLink).toContainText("Request")
  await expect(mobileBookingLink).toHaveAccessibleName("Request a Consultation")
  await expect(mobileBookingLink).toHaveText("Request a Consultation")
  const labelsFit = await narrowNavigation.getByRole("link").evaluateAll((links) =>
    links.every((link) => {
      const visibleLabel = [...link.querySelectorAll("span")].find(
        (label) => getComputedStyle(label).display !== "none"
      )
      if (!visibleLabel) return false
      const linkBox = link.getBoundingClientRect()
      const labelBox = visibleLabel.getBoundingClientRect()
      return labelBox.left >= linkBox.left - 1 && labelBox.right <= linkBox.right + 1
    })
  )
  expect(labelsFit).toBe(true)
  const narrowLabels = await narrowNavigation.getByRole("link").evaluateAll((links) =>
    links.map((link) => (link as HTMLElement).innerText.trim())
  )
  expect(narrowLabels).toEqual(["Symptoms", "Procedures", "Dr. Biro", "Your Visit", "Results", "Offices"])
  const labelsAreReadable = await narrowNavigation.getByRole("link").evaluateAll((links) =>
    links.every((link) => Number.parseFloat(getComputedStyle(link).fontSize) >= 15)
  )
  expect(labelsAreReadable).toBe(true)
  const targetsAreLargeEnough = await narrowNavigation.getByRole("link").evaluateAll((links) =>
    links.every((link) => link.getBoundingClientRect().height >= 44)
  )
  expect(targetsAreLargeEnough).toBe(true)

  const headerSpacing = await page.evaluate(() => {
    const brand = document.querySelector("[data-header-brand]")?.getBoundingClientRect()
    const actions = document.querySelector("[data-header-actions]")?.getBoundingClientRect()
    return brand && actions ? actions.left - brand.right : -1
  })
  expect(headerSpacing).toBeGreaterThanOrEqual(0)
  const headingFits = await page.getByRole("heading", { level: 1 }).evaluate(
    (heading) => heading.scrollWidth <= heading.clientWidth
  )
  expect(headingFits).toBe(true)
  const physicianNameFits = await page
    .locator("[data-header-brand] > span > span")
    .first()
    .evaluate((name) => name.scrollWidth <= name.clientWidth)
  expect(physicianNameFits).toBe(true)
  const specialtyLine = page.locator("[data-header-specialty]")
  const specialtyIsReadable = await specialtyLine.evaluate(
    (line) => Number.parseFloat(getComputedStyle(line).fontSize) >= 10
  )
  expect(specialtyIsReadable).toBe(true)
  const specialtyColors = await specialtyLine.evaluate((line) => ({
    foreground: getComputedStyle(line).color,
    background: getComputedStyle(document.documentElement)
      .getPropertyValue("--background")
      .trim(),
  }))
  const specialtyForeground = luminance(parseRgb(specialtyColors.foreground))
  const specialtyBackground = luminance(parseRgb(specialtyColors.background))
  const specialtyContrast =
    (Math.max(specialtyForeground, specialtyBackground) + 0.05) /
    (Math.min(specialtyForeground, specialtyBackground) + 0.05)
  expect(specialtyContrast).toBeGreaterThanOrEqual(4.5)
  const brandSymbol = page.locator("[data-header-brand] img:visible")
  await expect(brandSymbol).toBeVisible()
  await expect(brandSymbol).toHaveAttribute("alt", "")
  await expectNoHorizontalOverflow(page)

  await page.setViewportSize({ width: 1024, height: 800 })
  await page.goto("/about")
  const desktopHeaderLayout = await page.evaluate(() => {
    const shell = document.querySelector("[data-header-shell]")?.getBoundingClientRect()
    const brand = document.querySelector("[data-header-brand]")?.getBoundingClientRect()
    const navigation = document
      .querySelector("[data-floating-navigation]")
      ?.getBoundingClientRect()
    const actions = document.querySelector("[data-header-actions]")?.getBoundingClientRect()
    if (!shell || !brand || !navigation || !actions) return null

    const center = (box: DOMRect) => box.top + box.height / 2
    return {
      shellTouchesViewport: Math.abs(shell.top) <= 1,
      brandBeforeNavigation: brand.right <= navigation.left,
      navigationBeforeActions: navigation.right <= actions.left,
      centersAligned:
        Math.max(center(brand), center(navigation), center(actions)) -
          Math.min(center(brand), center(navigation), center(actions)) <=
        1,
    }
  })
  expect(desktopHeaderLayout).toEqual({
    shellTouchesViewport: true,
    brandBeforeNavigation: true,
    navigationBeforeActions: true,
    centersAligned: true,
  })
  const desktopBrandTypography = await page
    .locator("[data-header-brand] > span > span")
    .first()
    .evaluate((name) => ({
      fontSize: Number.parseFloat(getComputedStyle(name).fontSize),
      fontWeight: Number.parseInt(getComputedStyle(name).fontWeight, 10),
    }))
  expect(desktopBrandTypography.fontSize).toBeGreaterThanOrEqual(24)
  expect(desktopBrandTypography.fontWeight).toBeLessThanOrEqual(500)
  await expect(page.locator("[data-header-specialty]")).toHaveText("Oculoplastic Surgeon")
  await expect(
    page.locator("[data-header-actions]").getByRole("link", {
      name: /^Request a Consultation$/i,
    })
  ).toBeVisible()
  await expectNoHorizontalOverflow(page)

  await page.setViewportSize({ width: 1280, height: 800 })
  const wideBrandFontSize = await page
    .locator("[data-header-brand] > span > span")
    .first()
    .evaluate((name) => Number.parseFloat(getComputedStyle(name).fontSize))
  expect(wideBrandFontSize).toBeGreaterThanOrEqual(32)

  await page.goto("/procedures/ptosis-repair")
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Procedures" })
  ).toHaveAttribute("aria-current", "page")
  const activeLink = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Procedures" })
  await expect.poll(() => textContrast(activeLink)).toBeGreaterThanOrEqual(4.5)
  await page.getByRole("button", { name: "Switch to dark mode" }).click()
  await expect(page.locator("html")).toHaveClass(/dark/)
  await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible()
  await page.waitForTimeout(400)
  await expect.poll(() => textContrast(activeLink)).toBeGreaterThanOrEqual(4.5)
  await expectNoHorizontalOverflow(page)

  await page.goto("/locations/westlake-village")
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Offices" })
  ).toHaveAttribute("aria-current", "page")

  await page.goto("/patient-guide")
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Your Visit" })
  ).toHaveAttribute("aria-current", "page")
})

test("brand home link uses the canonical domain", async ({ page }) => {
  await page.goto("/about")
  await expect(page.locator("[data-header-brand]")).toHaveAttribute(
    "href",
    "https://biromd.com/"
  )
})

test("site containers stay fluid and centered between breakpoints", async ({ page }) => {
  await page.setViewportSize({ width: 1257, height: 900 })
  await page.goto("/")

  const container = page.locator("header > .site-container")
  const box = await container.boundingBox()

  expect(box).not.toBeNull()
  expect(box!.width).toBeGreaterThan(1150)
  expect(Math.abs(box!.x - (1257 - box!.width) / 2)).toBeLessThan(2)
})

test("office and privacy actions fit at narrow and tablet breakpoints", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 })
  await page.goto("/notice-of-privacy-practices")
  await expectNoHorizontalOverflow(page, "privacy notices at 320px")
  await expect(page.getByRole("link", { name: "Patient Privacy Document" }).first()).toBeVisible()
  await expect(page.getByText("Online privacy document not currently published")).toHaveCount(2)

  await page.setViewportSize({ width: 820, height: 850 })
  await page.goto("/locations")
  await expectNoHorizontalOverflow(page, "locations at 820px")
  for (const link of await page.getByRole("link", { name: "Office Details" }).all()) {
    const box = await link.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.x + box!.width).toBeLessThanOrEqual(820)
  }
})

test("contact page uses official office request links", async ({ page }) => {
  await page.goto("/contact")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Request a Consultation")
  for (const office of [
    "Westlake Village",
    "Rancho Cucamonga",
    "Burbank",
    "Downtown Los Angeles",
  ]) {
    await expect(
      page.locator("main").getByRole("link", { name: office, exact: true }).first()
    ).toHaveAttribute("href", /^#schedule-/)
  }
  await expect(page.locator('main a[href*="solutionreach"]').first()).toHaveAttribute(
    "href",
    /solutionreach\.com/
  )
  await expect(page.locator('main a[href="https://www.pacificeyemd.com/request-an-appointment/"]').first()).toHaveAttribute(
    "href",
    "https://www.pacificeyemd.com/request-an-appointment/"
  )
  await expect(page.locator('#schedule-burbank a[href="tel:+18187620647"]').first()).toHaveAttribute(
    "href",
    "tel:+18187620647"
  )
  await expect(
    page.locator('main a[href="https://www.lasereyecenter.com/locations/#site-contact-form"]').first()
  ).toHaveAttribute(
    "href",
    "https://www.lasereyecenter.com/locations/#site-contact-form"
  )
  await expect(page.getByText(/For routine, non-urgent appointments/)).toBeVisible()
  await expect(page.getByText(/The office will contact you to confirm/)).toBeVisible()
  const questions = page.getByRole("heading", { name: "Questions to Confirm with the Office" })
  await expect(questions).toBeVisible()
  await page.getByText("More questions to confirm").click()
  await expect(page.getByRole("heading", { name: "Timing and preparation" })).toBeVisible()
  await expect(page.getByText(/whether testing or dilation may be needed/i)).toBeVisible()
  const emergencyNotice = page.locator("[data-emergency-notice]")
  const firstOffice = page.locator("#schedule-westlake-village")
  const [emergencyBox, firstOfficeBox] = await Promise.all([
    emergencyNotice.boundingBox(),
    firstOffice.boundingBox(),
  ])
  expect(emergencyBox).not.toBeNull()
  expect(firstOfficeBox).not.toBeNull()
  expect(emergencyBox!.y).toBeLessThan(firstOfficeBox!.y)
  const questionsBox = await questions.boundingBox()
  expect(questionsBox).not.toBeNull()
  expect(firstOfficeBox!.y).toBeLessThan(questionsBox!.y)
  await expect(page.getByRole("link", { name: "Email Scheduling" })).toHaveAttribute(
    "href",
    /^mailto:info@biromd\.com/
  )
  await expect(page.locator("form")).toHaveCount(0)
})

test("new patient guide resolves common scheduling friction", async ({ page }) => {
  await page.goto("/patient-guide")

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Plan Your Consultation")
  await expect(page.getByText(/online request is not a confirmed appointment/i)).toBeVisible()
  await expect(page.getByRole("heading", { name: "Insurance and cost" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Records and images" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Timing and preparation" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "After-visit questions" })).toBeVisible()
  await expect(page.getByText(/Do not send medical details/)).toBeVisible()
  await expect(
    page.getByRole("heading", { name: "Choose an Office to Request a Consultation" })
  ).toBeVisible()
  await expect(page.locator("main").getByRole("link", { name: "Request Online" })).toHaveCount(3)
  await expect(page.locator("main").getByRole("link", { name: "Call Burbank Office" })).toHaveCount(1)
  await expect(page.locator('main a[href="tel:+18187620647"]').first()).toHaveAttribute(
    "href",
    "tel:+18187620647"
  )
  await expect(page.getByRole("button", { name: "Print This Guide" })).toHaveAttribute(
    "data-print-page",
    "true"
  )
  await expectNoHorizontalOverflow(page)
})

test("office pages provide portable contact cards", async ({ page }) => {
  await page.goto("/locations/westlake-village")
  await expect(page.getByRole("link", { name: "Save Office Contact" })).toHaveAttribute(
    "href",
    "/contact-cards/dr-biro-westlake-village.vcf"
  )
  await expect(page.getByRole("link", { name: "Save Office Contact" })).toHaveAttribute(
    "download",
    ""
  )

  await page.goto("/locations/rancho-cucamonga")
  await expect(page.getByRole("link", { name: "Save Office Contact" })).toHaveAttribute(
    "href",
    "/contact-cards/dr-biro-rancho-cucamonga.vcf"
  )

  await page.goto("/locations/burbank")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Eyelid and Oculoplastic Care in Burbank"
  )
  await expect(page.getByText(/2031 W Alameda Ave, Suite 300/).first()).toBeVisible()
  await expect(page.locator('main a[href="tel:+18187620647"]').first()).toHaveAttribute(
    "href",
    "tel:+18187620647"
  )
  await expect(page.getByRole("link", { name: "Visit A Center for Vision Care" })).toHaveAttribute(
    "href",
    "https://www.acvci.com/"
  )
  await expect(page.getByRole("link", { name: "Save Office Contact" })).toHaveAttribute(
    "href",
    "/contact-cards/dr-biro-burbank.vcf"
  )

  await page.goto("/locations/downtown-los-angeles")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Eyelid and Oculoplastic Care in Downtown Los Angeles"
  )
  await expect(page.getByText(/1127 Wilshire Blvd, Suite 1209/).first()).toBeVisible()
  await expect(page.locator('main a[href="https://www.lasereyecenter.com/locations/#site-contact-form"]').first()).toHaveAttribute(
    "href",
    "https://www.lasereyecenter.com/locations/#site-contact-form"
  )
  await expect(page.getByRole("link", { name: "Visit Laser Eye Center" })).toHaveAttribute(
    "href",
    "https://www.lasereyecenter.com/dr-nicolas-biro/"
  )
  await expect(page.getByRole("link", { name: "Save Office Contact" })).toHaveAttribute(
    "href",
    "/contact-cards/dr-biro-downtown-los-angeles.vcf"
  )
})

test("content standards disclose review status without overstating approval", async ({ page }) => {
  await page.goto("/content-standards")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "How BiroMD Content Is Prepared"
  )
  await expect(page.getByRole("heading", { name: "No hidden medical-review claim" })).toBeVisible()
  await expect(page.getByText(/do not claim physician review while formal approval is pending/i)).toBeVisible()
  await expect(page.getByRole("link", { name: "Report a Website Correction" })).toHaveAttribute(
    "href",
    /^mailto:info@biromd\.com/
  )
  await expectNoHorizontalOverflow(page)
})

test("security reports have a stable disclosure contact", async ({ request }) => {
  const response = await request.get("/.well-known/security.txt")
  expect(response.ok()).toBe(true)
  const securityPolicy = await response.text()
  expect(securityPolicy).toContain("Contact: mailto:info@biromd.com")
  expect(securityPolicy).toContain("Expires: 2027-08-08T23:59:59Z")
  expect(securityPolicy).toContain(
    "Canonical: https://biromd.com/.well-known/security.txt"
  )
})

test("dark contact emergency notice uses its dark surface", async ({ page }) => {
  await page.goto("/contact")
  await page.getByRole("button", { name: "Switch to dark mode" }).click()
  const notice = page.locator("[data-emergency-notice]")
  const styles = await notice.evaluate((element) => {
    const heading = element.querySelector("h2")!
    const noticeStyle = getComputedStyle(element)
    const headingStyle = getComputedStyle(heading)
    return {
      background: noticeStyle.backgroundColor,
      border: noticeStyle.borderTopColor,
      color: noticeStyle.color,
      headingColor: headingStyle.color,
      headingFont: headingStyle.fontFamily,
    }
  })
  expect(luminance(parseRgb(styles.background))).toBeLessThan(0.12)
  expect(styles.border).not.toBe("rgb(38, 59, 85)")
  expect(styles.headingColor).toBe(styles.color)
  expect(styles.headingFont).toContain("Outfit")
})

test("gallery labels remain visible without hover", async ({ page }) => {
  await page.goto("/gallery")
  const cases = page.locator("article[id]")
  if ((await cases.count()) === 0) {
    await expect(
      page.getByRole("heading", { name: "Before & After cases under review" })
    ).toBeVisible()
    return
  }

  await expect(cases.first().getByText("Before", { exact: true })).toBeVisible()
  await expect(cases.first().getByText("After", { exact: true })).toBeVisible()
  await expect(cases.first().locator("[data-gallery-open]")).toHaveCount(1)
  const preview = cases.first().locator("[data-comparison-preview]")
  const previewImages = preview.locator("img")
  if ((await previewImages.count()) === 2) {
    await expect(previewImages.nth(0)).toHaveAttribute("alt", /^Before /)
    await expect(previewImages.nth(1)).toHaveAttribute("alt", /^After /)
  } else {
    await expect(previewImages.first()).toHaveAttribute("alt", /\S+/)
  }
  const previewBox = await preview.boundingBox()
  expect(previewBox).not.toBeNull()
  expect(previewBox!.width / previewBox!.height).toBeGreaterThan(2)

  const title = await cases.first().getByRole("heading", { level: 2 }).first().innerText()
  await expect(cases.first().getByRole("heading", { level: 2 })).toHaveCount(1)
  await cases.first().getByRole("button", { name: /View larger image/ }).click()
  const dialog = page.getByRole("dialog", { name: title })
  await expect(dialog).toBeVisible()
  const modalColors = await dialog.locator("[data-gallery-dialog-title]").evaluate((titleElement) => ({
    foreground: getComputedStyle(titleElement).color,
    background: getComputedStyle(titleElement.closest("dialog")!).backgroundColor,
  }))
  const modalForeground = luminance(parseRgb(modalColors.foreground))
  const modalBackground = luminance(parseRgb(modalColors.background))
  expect((Math.max(modalForeground, modalBackground) + 0.05) / (Math.min(modalForeground, modalBackground) + 0.05)).toBeGreaterThanOrEqual(4.5)
  await dialog.getByRole("button", { name: "Close enlarged image" }).click()
  await expect(dialog).toBeHidden()

  const cosmetic = page.locator('[data-gallery-category="cosmetic"]')
  const reconstructive = page.locator('[data-gallery-category="reconstructive"]')
  if ((await cosmetic.count()) > 0 && (await reconstructive.count()) > 0) {
    await page.getByRole("button", { name: "Reconstructive" }).click()
    await expect(cosmetic.first()).toBeHidden()
    await expect(reconstructive.first()).toBeVisible()
    await page.getByRole("button", { name: "All cases" }).click()
    await expect(cosmetic.first()).toBeVisible()
  }

  await expect(page.locator('script[src^="/_next/"]')).toHaveCount(0)
})

test("gallery cases keep compact vertical spacing on desktop", async ({ page }) => {
  await page.goto("/gallery")
  const cases = page.locator("article[id]")
  const caseCount = await cases.count()
  test.skip(caseCount < 3, "Fewer than three gallery cases are authorized for this build")

  await page.setViewportSize({ width: 1237, height: 790 })
  await page.reload()
  const boxes = await cases.evaluateAll((elements) =>
    elements
      .map((element) => {
        const box = element.getBoundingClientRect()
        return { x: Math.round(box.x), y: box.y, bottom: box.bottom }
      })
      .filter((box) => box.bottom > box.y)
  )
  const columns = new Map<number, Array<{ y: number; bottom: number }>>()
  for (const box of boxes) {
    const column = columns.get(box.x) ?? []
    column.push({ y: box.y, bottom: box.bottom })
    columns.set(box.x, column)
  }

  expect(columns.size).toBe(2)
  for (const column of columns.values()) {
    column.sort((a, b) => a.y - b.y)
    for (let index = 1; index < column.length; index += 1) {
      const gap = column[index].y - column[index - 1].bottom
      expect(gap).toBeGreaterThanOrEqual(20)
      expect(gap).toBeLessThanOrEqual(28)
    }
  }
})

test("gallery cases remain readable when JavaScript is unavailable", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:4173",
    javaScriptEnabled: false,
    viewport: { width: 1237, height: 790 },
  })
  const page = await context.newPage()
  await page.goto("/gallery")
  const cases = page.locator("article[id]")
  if ((await cases.count()) === 0) {
    await expect(
      page.getByRole("heading", { name: "Before & After cases under review" })
    ).toBeVisible()
    await context.close()
    return
  }

  const boxes = await cases.evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect()
      return { left: box.left, right: box.right, top: box.top, bottom: box.bottom }
    })
  )
  const overlaps = boxes.some((box, index) =>
    boxes.slice(index + 1).some((other) =>
      box.left < other.right &&
      box.right > other.left &&
      box.top < other.bottom &&
      box.bottom > other.top
    )
  )
  expect(overlaps).toBe(false)
  await expectNoHorizontalOverflow(page, "gallery without JavaScript")
  await context.close()
})

test("authorized gallery cases have shareable detail pages", async ({ page }) => {
  test.skip(galleryCaseIds.length === 0, "No gallery cases are authorized for this build")

  const caseId = galleryCaseIds[0]
  await page.goto("/gallery")
  await expect(page.locator(`a[href="${galleryPathForId(caseId)}"]`).first()).toBeVisible()

  await page.goto(`/gallery/${caseId}`)
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Before and After")
  await expect(page.getByText("Before", { exact: true }).first()).toBeVisible()
  await expect(page.getByText("After", { exact: true }).first()).toBeVisible()
  await expect(page.getByRole("heading", { name: "What Was Evaluated" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Results Are Individual" })).toBeVisible()
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText("Results")
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(schemas.some((schema) => schema.includes('"ImageObject"'))).toBe(true)
  await expectNoHorizontalOverflow(page)
})

test("legacy gallery aliases move visitors to the canonical case page", async ({ page }) => {
  test.skip(
    !galleryCaseIds.includes("eyelid-trauma"),
    "The legacy gallery case is not authorized for this build"
  )

  await page.goto("/gallery/eyelid-trauma")
  await expect(page).toHaveURL(/\/gallery\/mohs-eyelid-reconstruction\/?$/)
  await expect(page).toHaveTitle("Mohs Eyelid Reconstruction Before and After | Biro MD")
  await expect(
    page.getByRole("heading", { name: "Mohs Cancer Removal Reconstruction Before and After" })
  ).toBeVisible()
})

test("multi-view gallery cases preserve matched comparisons", async ({ page }) => {
  test.skip(
    !galleryCaseIds.includes("upper-lower-blepharoplasty"),
    "The multi-view case is not authorized for this build"
  )

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/gallery/upper-lower-blepharoplasty")
  await expect(
    page.getByRole("heading", { name: "Matched Views of the Same Case" })
  ).toBeVisible()
  await expect(page.getByRole("heading", { name: "First oblique view" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Second oblique view" })).toBeVisible()
  await expect(
    page.locator('main [data-comparison-preview][role="img"]')
  ).toHaveCount(3)
  await expectNoHorizontalOverflow(page, "multi-view gallery case at 390px")
})

test("graphic gallery cases require an explicit reveal", async ({ page }) => {
  test.skip(
    !galleryCaseIds.includes("periocular-lesion-removal"),
    "The sensitive case is not authorized for this build"
  )

  await page.goto("/gallery")
  const clinicalCase = page.locator("#periocular-lesion-removal")
  const warning = clinicalCase.getByText("Sensitive Clinical Content", { exact: true })
  const reveal = clinicalCase.getByRole("button", { name: /View sensitive clinical image/i })
  const enlarge = clinicalCase.getByRole("button", {
    name: "View larger image for Periocular Lesion Removal",
  })
  const mediaImage = clinicalCase.locator("[data-sensitive-media] img").first()
  const mediaSource = clinicalCase
    .locator('[data-sensitive-media] source[type="image/avif"]')
    .first()
  const dialog = page.locator("#gallery-dialog-periocular-lesion-removal")
  const dialogSource = dialog.locator('source[type="image/avif"]').first()

  await expect(warning).toBeVisible()
  await expect(clinicalCase.getByText(/sensitive clinical image/i)).toBeVisible()
  await expect(page.getByText(/do not load unless you choose to view them/i)).toBeVisible()
  await expect(clinicalCase.locator("[data-sensitive-preview]")).toHaveAttribute(
    "src",
    /-warning\.webp$/
  )
  await expect(mediaImage).toHaveAttribute("src", /-warning\.webp$/)
  await expect(mediaSource).not.toHaveAttribute("srcset", /.+/)
  await expect(mediaSource).toHaveAttribute(
    "data-clinical-srcset",
    /periocular-lesion-removal-1200\.avif 1200w/
  )
  await expect(dialogSource).not.toHaveAttribute("srcset", /.+/)
  await expect(reveal).toBeVisible()
  await expect(enlarge).toBeDisabled()
  await reveal.click()
  await expect(reveal).toBeHidden()
  await expect(enlarge).toBeEnabled()
  await expect(mediaImage).toHaveAttribute("src", /periocular-lesion-removal\.jpg$/)
  await expect(mediaSource).toHaveAttribute(
    "srcset",
    /periocular-lesion-removal-1200\.avif 1200w/
  )
  await expect(dialogSource).not.toHaveAttribute("srcset", /.+/)
  await enlarge.click()
  await expect(dialog).toBeVisible()
  await expect(dialogSource).toHaveAttribute(
    "srcset",
    /periocular-lesion-removal-1200\.avif 1200w/
  )
  await dialog.getByRole("button", { name: "Close enlarged image" }).click()
  const hide = clinicalCase.getByRole("button", { name: "Hide sensitive clinical image" })
  await expect(hide).toBeVisible()
  await hide.click()
  await expect(warning).toBeVisible()
  await expect(enlarge).toBeDisabled()

  await page.goto("/gallery/periocular-lesion-removal")
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noimageindex/
  )
  const sensitiveSchemas = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents()
  const sensitivePageSchema = sensitiveSchemas.find((schema) =>
    schema.includes('"@type":"MedicalWebPage"')
  ) ?? ""
  expect(sensitivePageSchema).not.toContain("periocular-lesion-removal.jpg")
  const detailReveal = page.getByRole("button", { name: /View sensitive clinical image/i })
  await detailReveal.click()
  await expect(page.getByRole("button", { name: "Hide sensitive clinical image" })).toBeFocused()
})

test("horizontal gallery comparisons remain large enough to evaluate", async ({ page }) => {
  test.skip(
    !galleryCaseIds.includes("scalp-reconstruction"),
    "The horizontal comparison case is not authorized for this build"
  )

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/gallery")
  const clinicalCase = page.locator("#scalp-reconstruction")
  await clinicalCase
    .getByRole("button", { name: /View sensitive clinical image/i })
    .click()

  const preview = clinicalCase.locator("[data-comparison-preview]")
  const previewBox = await preview.boundingBox()
  expect(previewBox).not.toBeNull()
  expect(previewBox!.height).toBeGreaterThan(250)
  expect(previewBox!.width / previewBox!.height).toBeGreaterThan(1)
  expect(previewBox!.width / previewBox!.height).toBeLessThan(1.2)
  await expect(
    clinicalCase.locator('[data-sensitive-media] source[type="image/avif"]').first()
  ).toHaveAttribute("sizes", /\(max-width: 768px\) 92vw/)
  await expect(clinicalCase.getByText("Enlarge", { exact: true })).toBeVisible()
  const toolbarBox = await clinicalCase.locator("[data-sensitive-toolbar]").boundingBox()
  const badgeBoxes = await Promise.all(
    (await clinicalCase.locator("[data-comparison-badge]").all()).map((badge) =>
      badge.boundingBox()
    )
  )
  expect(toolbarBox).not.toBeNull()
  for (const badgeBox of badgeBoxes) {
    expect(badgeBox).not.toBeNull()
    expect(badgeBox!.y).toBeGreaterThanOrEqual(toolbarBox!.y + toolbarBox!.height)
  }
  await expectNoHorizontalOverflow(page, "horizontal gallery comparison at 390px")
})

test("homepage heading is readable and graphic cases stay on the results page", async ({ page }) => {
  await page.setViewportSize({ width: 736, height: 758 })
  await page.goto("/")
  await expect(page).toHaveTitle(
    "Eyelid Surgery & Blepharoplasty in Los Angeles | Biro MD"
  )
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Eyelid Surgery and Specialized Eye Care"
  )
  await page.evaluate(() => document.fonts.ready)
  const typography = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector("h1")!).fontFamily,
    outfitLoaded: document.fonts.check('16px "Outfit"'),
    cormorantLoaded: document.fonts.check('600 16px "Cormorant Garamond"'),
  }))
  expect(typography.body).toContain("Outfit")
  expect(typography.heading).toContain("Cormorant Garamond")
  expect(typography.outfitLoaded).toBe(true)
  expect(typography.cormorantLoaded).toBe(true)

  await expect(
    page.getByRole("heading", { name: "Selected Before-and-After Results" })
  ).toHaveCount(0)
  await expect(page.locator('main a[href^="/gallery/"]')).toHaveCount(0)
  const portrait = page.getByRole("img", { name: "Dr. Nicolas Biro" }).first()
  await expect(portrait).toBeVisible()
  await expect(portrait).toHaveAttribute(
    "src",
    new RegExp(`\\?v=${brandAssetVersion}$`)
  )
  await expect(portrait.locator("xpath=preceding-sibling::source")).toHaveCount(2)
  for (const source of await portrait.locator("xpath=preceding-sibling::source").all()) {
    await expect(source).toHaveAttribute(
      "srcset",
      new RegExp(`\\?v=${brandAssetVersion}`)
    )
  }
  await expect
    .poll(() => portrait.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0)
  const portraitFraming = await portrait.evaluate((image) => {
    const portraitImage = image as HTMLImageElement
    const frameElement = portraitImage.parentElement!.parentElement!
    const frame = frameElement.getBoundingClientRect()
    return {
      fit: getComputedStyle(portraitImage).objectFit,
      frameBackground: getComputedStyle(frameElement).backgroundColor,
      frameRatio: frame.width / frame.height,
      naturalRatio: portraitImage.naturalWidth / portraitImage.naturalHeight,
      frameWidth: frame.width,
    }
  })
  expect(portraitFraming.fit).toBe("contain")
  expect(portraitFraming.frameBackground).toBe("rgb(63, 65, 67)")
  expect(Math.abs(portraitFraming.frameRatio - portraitFraming.naturalRatio)).toBeLessThan(0.01)
  expect(portraitFraming.frameWidth).toBeLessThanOrEqual(440)

  await page.goto("/about")
  const aboutPortrait = page.getByRole("img", { name: "Dr. Nicolas Biro" })
  await expect(aboutPortrait).toHaveAttribute(
    "src",
    new RegExp(`/images/portrait/dr-biro-about-portrait-960\\.webp\\?v=${brandAssetVersion}$`)
  )
  await expect(aboutPortrait.locator("xpath=preceding-sibling::source").first()).toHaveAttribute(
    "srcset",
    new RegExp(`/images/portrait/dr-biro-about-portrait-320\\.avif\\?v=${brandAssetVersion}`)
  )
})

test("patient concerns lead directly to relevant procedure guidance", async ({ page }) => {
  await page.goto("/")
  const finder = page.locator("[data-concern-finder]")

  await expect(
    finder.getByRole("heading", { name: "Explore Common Concerns" })
  ).toBeVisible()
  await expect(finder.locator('a[href^="/concerns/"]')).toHaveCount(6)
  await expect(finder.getByRole("link", { name: /Droopy or heavy upper eyelids/ })).toHaveAttribute(
    "href",
    "/concerns/droopy-heavy-upper-eyelids"
  )
  await expect(finder.getByRole("link", { name: /Constant watery eyes/ })).toHaveAttribute(
    "href",
    "/concerns/constant-watery-eyes"
  )
  await expect(finder).not.toContainText("Sudden eyelid drooping")
})

test("medical metadata uses the service area and a durable FDA reference", async ({ page }) => {
  await page.goto("/concerns/droopy-heavy-upper-eyelids")
  await expect(page).toHaveTitle(/Droopy or Hooded Upper Eyelids: Causes & Care/)

  const procedureDescriptions = [
    {
      path: "/procedures/brow-lift",
      description:
        "The brow and upper eyelid work as one unit. See when brow position, rather than eyelid skin, is driving heaviness or asymmetry, and what the evaluation covers.",
    },
    {
      path: "/procedures/ptosis-repair",
      description:
        "Ptosis is drooping of the upper eyelid. See what an oculoplastic evaluation covers: eyelid measurements, lifting-muscle function, pupils, and eye movements.",
    },
    {
      path: "/procedures/entropion-ectropion-repair",
      description:
        "Entropion turns the eyelid inward so lashes rub the eye. Ectropion turns it outward, affecting closure and tear drainage. What an evaluation looks for.",
    },
    {
      path: "/procedures/eyelid-cancer-mohs-reconstruction",
      description:
        "Reconstruction after skin-cancer removal near the eye, tailored to the final cleared defect and coordinated with your Mohs surgeon. Eye protection comes first.",
    },
    {
      path: "/procedures/tearing-blocked-tear-ducts",
      description:
        "A watery eye does not always mean a blocked duct. Irritation, eyelid position, and drainage narrowing can all cause tearing, so the exam comes first.",
    },
    {
      path: "/procedures/thyroid-eye-disease",
      description:
        "Thyroid eye disease can occur even when thyroid blood tests are normal. What an orbital evaluation checks: eyelid position, exposure, eye movement, and vision.",
    },
    {
      path: "/procedures/orbital-tumors-trauma",
      description:
        "A mass or injury in the eye socket can affect eye position, movement, sensation, or vision. What an evaluation covers and which symptoms need emergency care.",
    },
    {
      path: "/procedures/botox",
      description:
        "Botulinum toxin temporarily reduces activity in selected muscles, and the effect is not permanent. Why brow and eyelid position are assessed before injection.",
    },
    {
      path: "/procedures/dermal-fillers",
      description:
        "Not every under-eye hollow or bag is suitable for filler. How eyelid support, prior filler, and vascular risk shape a conservative plan around the eyes.",
    },
  ]

  for (const procedure of procedureDescriptions) {
    await page.goto(procedure.path)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      procedure.description
    )
  }

  await page.goto("/procedures/ptosis-repair")
  await expect(page).toHaveTitle(
    "Ptosis (Droopy Eyelid) Surgery in Los Angeles | Biro MD"
  )
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Ptosis Repair (Droopy Eyelid Surgery)"
  )

  await page.goto("/procedures/entropion-ectropion-repair")
  await expect(page).toHaveTitle(
    "Eyelid Turning In or Out (Entropion & Ectropion) | Biro MD"
  )

  await page.goto("/procedures/botox")
  await expect(page).toHaveTitle(
    "Botulinum Toxin Injections in Los Angeles | Biro MD"
  )
  await expect(page.getByRole("heading", { name: "Related symptom guides" })).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Helpful Next Steps" })).toBeVisible()
  await expect(
    page.getByRole("link", { name: "U.S. FDA: Botox Cosmetic product information" })
  ).toHaveAttribute(
    "href",
    "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=103000"
  )

  const nodes = await structuredDataNodes(page)
  const physician = nodes.find((node) => node["@type"] === "Physician")
  const person = nodes.find((node) => node["@type"] === "Person")
  const procedure = nodes.find((node) => node["@type"] === "MedicalProcedure")
  const clinics = nodes.filter((node) => node["@type"] === "MedicalClinic")

  expect(physician).toMatchObject({
    medicalSpecialty: "https://schema.org/Ophthalmologic",
  })
  expect(physician).not.toHaveProperty("workLocation")
  expect(physician?.availableService).toHaveLength(procedureSlugs.length)
  expect(person).toMatchObject({
    jobTitle: "Oculoplastic Surgeon",
  })
  expect(person?.workLocation).toHaveLength(4)
  expect(person?.sameAs).not.toContain("https://www.acvci.com/")
  expect(procedure).toMatchObject({
    procedureType: "https://schema.org/NoninvasiveProcedure",
    relevantSpecialty: "https://schema.org/Ophthalmologic",
  })
  for (const unsupportedProperty of [
    "bodyLocation",
    "status",
    "howPerformed",
    "preparation",
    "followup",
    "performer",
  ]) {
    expect(procedure).not.toHaveProperty(unsupportedProperty)
  }
  expect(clinics.map((clinic) => clinic.name)).toEqual([
    "DLV Vision - Westlake Village",
    "Pacific Eye Institute - Rancho Cucamonga",
    "A Center for Vision Care - Burbank",
    "Laser Eye Center - Downtown Los Angeles",
  ])
  for (const clinic of clinics) {
    expect(clinic).not.toHaveProperty("sameAs")
    expect(clinic).not.toHaveProperty("employee")
  }
})

test("symptom guides explain evaluation and urgent next steps", async ({ page }) => {
  await page.goto("/concerns")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Understand Your Eye and Eyelid Concerns"
  )
  await expect(page.locator('main a[href^="/concerns/"]')).toHaveCount(7)

  await page.goto("/concerns/droopy-heavy-upper-eyelids")
  await expect(page.getByRole("heading", { name: "What May Contribute" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "What Dr. Biro Checks" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Clinical references" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Ptosis Repair" })).toHaveAttribute(
    "href",
    "/procedures/ptosis-repair"
  )
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(schemas.some((schema) => schema.includes('"MedicalWebPage"'))).toBe(true)
  expect(schemas.some((schema) => schema.includes('"citation"'))).toBe(true)
  await expect(page.locator("body")).not.toContainText(/medically reviewed by/i)

  await page.goto("/concerns/sudden-eyelid-drooping")
  const urgentIntro = page
    .getByRole("heading", { level: 1, name: "Sudden Eyelid Drooping" })
    .locator("xpath=ancestor::section")
  await expect(urgentIntro.getByRole("link", { name: "Read Urgent Warning" })).toHaveAttribute(
    "href",
    "#urgent-guidance"
  )
  await expect(urgentIntro.getByRole("link", { name: "Request a Consultation" })).toHaveCount(0)
  const urgentGuidance = page.locator("#urgent-guidance")
  await expect(
    urgentGuidance.getByRole("heading", { name: "Do not wait for routine web scheduling" })
  ).toBeVisible()
  await expect(urgentGuidance.getByText(/Seek urgent medical care/)).toBeVisible()
  const urgentNavigation = page.getByRole("navigation", { name: "On this page" })
  await expect(urgentNavigation.getByRole("link").first()).toHaveText("Urgent Signs")
  const [urgentBox, navigationBox] = await Promise.all([
    urgentGuidance.boundingBox(),
    urgentNavigation.boundingBox(),
  ])
  expect(urgentBox).not.toBeNull()
  expect(navigationBox).not.toBeNull()
  expect(urgentBox!.y).toBeLessThan(navigationBox!.y)
  await expect(
    page.locator("main").getByRole("link", { name: /Request( a)? Consultation/i })
  ).toHaveCount(0)
})

test("referring clinicians receive a safe direct pathway", async ({ page }) => {
  await page.goto("/referrals")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Plan an Oculoplastic Referral"
  )
  await expect(page.getByRole("heading", { name: "Contact the Receiving Office" })).toBeVisible()
  await expect(page.getByText(/should not receive patient records/)).toBeVisible()
  await expect(page.locator("main form")).toHaveCount(0)
  await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(0)
  await expect(page.locator('main a[href^="tel:"]')).toHaveCount(4)
  await expect(page.getByRole("button", { name: "Print Referral Guide" })).toHaveAttribute(
    "data-print-page",
    "true"
  )
})

test("high-intent pages provide verifiable and direct next steps", async ({ page }) => {
  await page.goto("/procedures/ptosis-repair")
  const nextStep = page.getByRole("heading", { name: "Discuss Your Concern with Dr. Biro" })
    .locator("xpath=ancestor::section")

  await expect(nextStep.getByRole("link", { name: "Request Online" })).toHaveCount(3)
  await expect(nextStep.getByRole("link", { name: "Call Burbank Office" })).toHaveCount(1)
  await expect(
    nextStep.getByRole("link", { name: "Meet Dr. Biro and review his training" })
  ).toHaveAttribute("href", "/about")
  await expect(nextStep.locator('a[href="tel:+18187620647"]').first()).toHaveAttribute(
    "href",
    "tel:+18187620647"
  )
  await expect(nextStep.getByRole("link", { name: "(805) 987-5300" })).toHaveAttribute(
    "href",
    "tel:+18059875300"
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Ptosis is drooping of the upper eyelid. See what an oculoplastic evaluation covers: eyelid measurements, lifting-muscle function, pupils, and eye movements."
  )

  await page.goto("/procedures/upper-blepharoplasty")
  const patientResources = page.getByRole("heading", { name: "Helpful Next Steps" })
    .locator("xpath=ancestor::section")
  await expect(patientResources.getByRole("link", { name: /Before & After/ })).toHaveAttribute(
    "href",
    "/gallery/upper-blepharoplasty"
  )
  await expect(
    patientResources.getByRole("link", {
      name: "Upper and Lower Blepharoplasty before and after",
    })
  ).toHaveAttribute("href", "/gallery/upper-lower-blepharoplasty")
  await expect(patientResources.getByRole("link", { name: "Plan Your Visit" })).toHaveAttribute(
    "href",
    "/patient-guide"
  )
  await expect(
    patientResources.getByRole("link", { name: "Droopy or heavy upper eyelids" })
  ).toHaveAttribute("href", "/concerns/droopy-heavy-upper-eyelids")
  await expect(page.getByRole("link", { name: "Ptosis Repair" })).toHaveAttribute(
    "href",
    "/procedures/ptosis-repair"
  )

  await page.goto("/procedures/eyelid-cancer-mohs-reconstruction")
  const reconstructiveResources = page.getByRole("heading", { name: "Helpful Next Steps" })
    .locator("xpath=ancestor::section")
  await expect(
    reconstructiveResources.getByRole("link", { name: "See Related Before & After" })
  ).toHaveAttribute("href", "/gallery/mohs-eyelid-reconstruction")
  await expect(reconstructiveResources).toContainText(
    "Eyebrow and Forehead Reconstruction before and after"
  )
  await expect(reconstructiveResources).not.toContainText("Periocular Lesion Removal")
  await expect(reconstructiveResources).not.toContainText("Scalp Defect Reconstruction")

  await page.goto("/about")
  await expect(
    page.getByRole("heading", { name: "Ophthalmology First. Oculoplastic Specialization." })
  ).toBeVisible()
  const timeline = page.getByRole("heading", { name: "Training Timeline" })
    .locator("xpath=..")
  await expect(timeline.getByRole("listitem").filter({ hasText: "Ophthalmology Residency" }))
    .toContainText("2012")
  await expect(timeline.getByRole("listitem").filter({ hasText: "Oculoplastic Fellowship" }))
    .toContainText("2014")
  await expect(timeline).not.toContainText("2009")
  await expect(timeline).not.toContainText("2011")

  const priorities = page.getByRole("heading", { name: "Clinical priorities" })
    .locator("xpath=..")
  const trainingSection = page.locator(
    'section[aria-label="Dr. Biro\'s clinical priorities and training"]'
  )

  await page.setViewportSize({ width: 884, height: 790 })
  await page.goto("/about")
  const smallerPriorities = await priorities.boundingBox()
  const smallerTimeline = await timeline.boundingBox()
  expect(smallerPriorities).not.toBeNull()
  expect(smallerTimeline).not.toBeNull()
  expect(smallerTimeline!.y).toBeGreaterThan(smallerPriorities!.y + smallerPriorities!.height)

  await page.setViewportSize({ width: 1237, height: 790 })
  await page.goto("/about")
  const widePriorities = await trainingSection.getByRole("heading", { name: "Clinical priorities" })
    .locator("xpath=..")
    .boundingBox()
  const wideTimeline = await trainingSection.getByRole("heading", { name: "Training Timeline" })
    .locator("xpath=..")
    .boundingBox()
  expect(widePriorities).not.toBeNull()
  expect(wideTimeline).not.toBeNull()
  expect(Math.abs(widePriorities!.y - wideTimeline!.y)).toBeLessThanOrEqual(2)
  expect(wideTimeline!.x).toBeGreaterThan(widePriorities!.x)

  const affiliations = page.getByRole("heading", { name: "Where Dr. Biro Sees Patients" })
    .locator("xpath=ancestor::section")
  await expect(affiliations.getByRole("link", { name: /DLV Vision/ })).toHaveAttribute(
    "href",
    /doughertylaservision\.com/
  )
  await expect(affiliations.getByRole("link", { name: /Pacific Eye Institute/ })).toHaveAttribute(
    "href",
    "https://www.pacificeyemd.com/doctors/nicolas-biro-m-d/"
  )
  await expect(affiliations.getByRole("link", { name: /A Center for Vision Care/ })).toHaveAttribute(
    "href",
    "https://www.acvci.com/"
  )
  await expect(affiliations.getByRole("link", { name: /Laser Eye Center/ })).toHaveAttribute(
    "href",
    "https://www.lasereyecenter.com/dr-nicolas-biro/"
  )

  await page.goto("/")
  const feedback = page.getByRole("heading", {
    name: "Independent Patient Feedback",
  }).locator("xpath=ancestor::section")
  await expect(feedback.locator('a[rel~="external"]')).toHaveCount(3)
  await expect(feedback.locator('a[target="_blank"]')).toHaveCount(3)
  await expect(feedback.getByRole("link", { name: /Healthgrades/ })).toHaveAttribute(
    "href",
    /healthgrades\.com/
  )
  await expect(feedback).not.toContainText(/4\.7|5\.0|star rating/i)
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(schemas.some((schema) => schema.includes('"@type":"WebSite"'))).toBe(true)
  const physicianSchema = schemas.find((schema) => schema.includes('"@type":"Physician"')) ?? ""
  expect(physicianSchema).toContain("healthgrades.com")
  expect(physicianSchema).toContain("doctor.webmd.com")
  expect(physicianSchema).toContain("linkedin.com")
  expect(physicianSchema).toContain("lasereyecenter.com/dr-nicolas-biro")
})

test("homepage stays concise while preserving key patient pathways", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const wordCount = await page.locator("main").evaluate((main) =>
    (main.textContent ?? "").trim().split(/\s+/).filter(Boolean).length
  )
  expect(wordCount).toBeLessThanOrEqual(225)
  await expect(page.getByRole("link", { name: "Request a Consultation" }).first()).toBeVisible()
  await expect(page.locator("[data-concern-finder]").locator('a[href^="/concerns/"]')).toHaveCount(6)
  const mobileCarePathways = page.locator("[data-care-pathway]")
  await expect(mobileCarePathways).toHaveCount(4)
  const carePathwayNames = [
    "Cosmetic Eyelid Care",
    "Eyelid Function & Reconstruction",
    "Tearing & Tear Ducts",
    "Orbital & Thyroid Eye Care",
  ]
  for (const [index, name] of carePathwayNames.entries()) {
    await expect(mobileCarePathways.nth(index)).toHaveAccessibleName(name)
  }
  await expect(mobileCarePathways.getByText("Cosmetic Eyelid Care", { exact: true })).toBeVisible()
  await expect(mobileCarePathways.getByText("Tearing & Tear Ducts", { exact: true })).toBeVisible()
  await expect(page.locator("[data-care-pathway-controls]")).toBeHidden()
  const mobilePathwayLayout = await mobileCarePathways.evaluateAll((cards) =>
    cards.map((card) => {
      const box = card.getBoundingClientRect()
      return { left: box.left, right: box.right, width: box.width, height: box.height }
    })
  )
  expect(mobilePathwayLayout.every((card) => card.width >= 300 && card.height >= 80)).toBe(true)
  expect(
    mobilePathwayLayout.every(
      (card) => card.left >= 0 && card.right <= 390
    )
  ).toBe(true)
  await expect(
    mobileCarePathways.filter({ hasText: "Orbital & Thyroid Eye Care" })
  ).toHaveAttribute("href", "/procedures/thyroid-eye-disease")
  await expect(page.getByRole("heading", { name: "Independent Patient Feedback" })).toBeVisible()
  await expect(
    page.getByText("Serving patients across the greater Los Angeles area").first()
  ).toBeVisible()
  await expect(page.getByText("Clinical Approach", { exact: true })).toHaveCount(0)
})

test("legacy care pathways route moves visitors to the procedure directory", async ({ page }) => {
  await page.goto("/services")
  await expect(page).toHaveURL(/\/procedures\/?$/)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Procedures and Treatment Options"
  )
})

test("mobile footer keeps the next step visible and details compact", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const footer = page.locator("footer")
  await expect(footer.getByRole("link", { name: "Request a Consultation" })).toBeVisible()
  await expect(footer.getByText(/Serving patients across the greater Los Angeles area/)).toBeVisible()
  for (const details of await footer.locator("details.footer-disclosure").all()) {
    expect(await details.getAttribute("open")).toBeNull()
  }

  const footerHeight = await footer.evaluate((element) => element.getBoundingClientRect().height)
  expect(footerHeight).toBeLessThan(750)
  await footer.locator("summary").filter({ hasText: "Offices" }).click()
  await expect(footer.getByRole("link", { name: "Westlake Village" })).toBeVisible()
  await expectNoHorizontalOverflow(page)
})

test("detail pages expose breadcrumbs, structured wayfinding, and usable FAQs", async ({ page }) => {
  await page.goto("/procedures")
  const categoryNavigation = page.getByRole("navigation", {
    name: "Jump to a procedure category",
  })
  await expect(categoryNavigation.getByRole("link")).toHaveCount(3)
  await expect(
    categoryNavigation.getByRole("link", { name: /Reconstructive Oculoplastics/ })
  ).toHaveAttribute("href", "#reconstructive-oculoplastics")

  await page.goto("/procedures/ptosis-repair")
  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" })
  await expect(breadcrumb.getByRole("link", { name: "Home" })).toBeVisible()
  await expect(breadcrumb.getByRole("link", { name: "Procedures" })).toBeVisible()
  await expect(breadcrumb.getByText("Ptosis Repair", { exact: true })).toHaveAttribute(
    "aria-current",
    "page"
  )

  const faq = page.getByRole("heading", { name: "Common Questions" })
    .locator("xpath=ancestor::section")
  const firstQuestion = faq.getByRole("heading", { level: 3 }).first()
  await expect(firstQuestion).toBeVisible()
  await expect(firstQuestion.locator("xpath=following-sibling::p")).toBeVisible()

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(schemas.some((schema) => schema.includes('"BreadcrumbList"'))).toBe(true)
  expect(schemas.some((schema) => schema.includes('"FAQPage"'))).toBe(true)
  expect(schemas.some((schema) => schema.includes('"MedicalProcedure"'))).toBe(true)
  expect(schemas.some((schema) => schema.includes('"citation"'))).toBe(true)
  await expect(page.getByRole("heading", { name: "Clinical references" })).toBeVisible()
  await expect(page.getByRole("link", { name: /American Academy of Ophthalmology/ })).toBeVisible()

  await page.goto("/locations/rancho-cucamonga")
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText(
    "HomeOfficesRancho Cucamonga"
  )
  await expect(
    page.getByRole("heading", { name: "Common Reasons to Seek Oculoplastic Evaluation" })
  ).toBeVisible()
  await expect(page.getByText(/contacting the Rancho Cucamonga office\./)).toBeVisible()
  await expect(page.getByRole("link", { name: /Upper Blepharoplasty/ })).toBeVisible()
  await expect(page.getByRole("link", { name: "Plan your consultation" })).toHaveAttribute(
    "href",
    "/patient-guide"
  )
  await expect(page.getByRole("link", { name: "View Before & After Results" })).toHaveAttribute(
    "href",
    "/gallery"
  )
})

test("long patient education pages provide mobile in-page navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })

  for (const route of [
    "/procedures/ptosis-repair",
    "/concerns/droopy-heavy-upper-eyelids",
    "/patient-guide",
  ]) {
    await page.goto(route)
    const navigation = page.getByRole("navigation", { name: "On this page" })
    await expect(navigation).toBeVisible()
    const links = navigation.getByRole("link")
    await expectMinimumTargetHeight(links, `${route} in-page navigation`)

    const hrefs = await links.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("href") ?? "")
    )
    for (const href of hrefs) {
      expect(href, `Invalid in-page link on ${route}`).toMatch(/^#[a-z0-9-]+$/)
      await expect(page.locator(href), `Missing in-page target ${href} on ${route}`).toHaveCount(1)
    }
    await expectNoHorizontalOverflow(page, `${route} in-page navigation`)
  }

  await page.goto("/procedures/ptosis-repair")
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto"
  })
  await page
    .getByRole("navigation", { name: "On this page" })
    .getByRole("link", { name: "Recovery" })
    .click()
  const anchorPosition = await page.evaluate(() => ({
    headerBottom: document.querySelector("header")!.getBoundingClientRect().bottom,
    targetTop: document.querySelector("#recovery")!.getBoundingClientRect().top,
  }))
  expect(anchorPosition.targetTop).toBeGreaterThanOrEqual(anchorPosition.headerBottom)
  expect(anchorPosition.targetTop - anchorPosition.headerBottom).toBeLessThan(32)
})

test("office secondary actions meet mobile touch-target guidance", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })

  await page.goto("/")
  const footer = page.locator("footer")
  await footer.locator("summary").filter({ hasText: /^Offices$/ }).click()
  await expectMinimumTargetHeight(
    footer.locator('a[href^="tel:"]'),
    "footer phone links"
  )

  await page.goto("/locations")
  await expectMinimumTargetHeight(
    page.locator('main a[href^="tel:"]'),
    "office index phone links"
  )

  await page.goto("/contact")
  await expectMinimumTargetHeight(
    page.getByRole("link", { name: "View office details" }),
    "contact office detail links"
  )

  await page.goto("/locations/downtown-los-angeles")
  await expectMinimumTargetHeight(
    page.locator('main a[href^="tel:"]'),
    "office detail phone links"
  )

  await page.goto("/notice-of-privacy-practices")
  await expectMinimumTargetHeight(
    page.locator('main a[href^="tel:"]'),
    "privacy notice phone links"
  )
})

test("footer navigation and legal links meet mobile touch-target guidance", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const footer = page.locator("footer")

  await footer.locator("summary").filter({ hasText: /^Offices$/ }).click()
  await expectMinimumTargetHeight(
    footer.locator('a[href^="/locations/"]'),
    "footer office links"
  )

  await footer.locator("summary").filter({ hasText: /^Explore$/ }).click()
  await expectMinimumTargetHeight(
    footer.locator('a[href="/procedures"], a[href="/concerns"], a[href="/gallery"]'),
    "footer explore links"
  )

  await expectMinimumTargetHeight(
    footer.locator(
      'a[href="/privacy"], a[href="/accessibility"], a[href="/content-standards"], a[href="/notice-of-privacy-practices"]'
    ),
    "footer legal links"
  )
})

test("404 page offers recovery links into the main sections", async ({ page }) => {
  await page.goto("/this-route-does-not-exist", { waitUntil: "domcontentloaded" })

  const recovery = page.getByRole("heading", { name: "Continue browsing" })
  await expect(recovery).toBeVisible()

  const links = recovery.locator("xpath=..").getByRole("link")
  expect(await links.count()).toBeGreaterThanOrEqual(6)
  await expect(
    recovery.locator("xpath=..").getByRole("link", { name: "Eyelid and oculoplastic procedures" })
  ).toHaveAttribute("href", "/procedures")
})

test("every public route has a sound document structure", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const titles = new Set<string>()
  const runtimeErrors: string[] = []
  page.on("pageerror", (error) => runtimeErrors.push(`Page error: ${error.message}`))
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(`Console error: ${message.text()}`)
  })
  page.on("requestfailed", (request) => {
    runtimeErrors.push(
      `Request failed: ${request.url()} (${request.failure()?.errorText ?? "unknown error"})`
    )
  })

  for (const route of publicRoutes) {
    await page.goto(route)
    const audit = await page.evaluate(() => {
      const headingLevels = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map(
        (heading) => Number(heading.tagName.slice(1))
      )
      const skippedHeading = headingLevels.some(
        (level, index) => index > 0 && level > headingLevels[index - 1] + 1
      )
      const ids = [...document.querySelectorAll("[id]")].map((element) => element.id)
      const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
      const missingHashTargets = [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
        .map((anchor) => anchor.hash.slice(1))
        .filter((id) => id && !document.getElementById(id))
      const brokenLoadedImages = [...document.images]
        .filter((image) => image.complete && image.currentSrc && image.naturalWidth === 0)
        .map((image) => image.currentSrc)
      const nestedInteractiveControls = [
        ...document.querySelectorAll("a a, a button, button a, button button"),
      ].map((element) => element.outerHTML)
      const invalidStructuredData = [
        ...document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
      ]
        .map((script) => {
          try {
            JSON.parse(script.textContent ?? "")
            return null
          } catch (error) {
            return String(error)
          }
        })
        .filter(Boolean)
      const structuredDataIds = [
        ...document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
      ].flatMap((script) => {
        try {
          const data = JSON.parse(script.textContent ?? "") as Record<string, unknown>
          const graph = data["@graph"]
          const nodes = Array.isArray(graph)
            ? (graph as Array<Record<string, unknown>>)
            : [data]
          return nodes
            .map((node) => node["@id"])
            .filter((id): id is string => typeof id === "string")
        } catch {
          return []
        }
      })
      const duplicateStructuredDataIds = structuredDataIds.filter(
        (id, index) => structuredDataIds.indexOf(id) !== index
      )
      const unnamedControls = [...document.querySelectorAll("a, button")]
        .filter((element) => {
          const label = [
            element.textContent,
            element.getAttribute("aria-label"),
            element.getAttribute("title"),
          ]
            .filter(Boolean)
            .join("")
            .trim()
          return !label
        })
        .map((element) => element.outerHTML)

      return {
        title: document.title,
        h1Count: document.querySelectorAll("h1").length,
        hasMain: Boolean(document.querySelector("main")),
        hasFooter: Boolean(document.querySelector("footer")),
        skippedHeading,
        duplicateIds,
        missingHashTargets,
        brokenLoadedImages,
        nestedInteractiveControls,
        invalidStructuredData,
        duplicateStructuredDataIds,
        unnamedControls,
      }
    })

    expect(audit.title, route).not.toBe("")
    expect(audit.title.length, `Title exceeds 60 characters on ${route}`).toBeLessThanOrEqual(60)
    expect(titles.has(audit.title), `Duplicate title on ${route}: ${audit.title}`).toBe(false)
    titles.add(audit.title)
    expect(audit.h1Count, route).toBe(1)
    expect(audit.hasMain, route).toBe(true)
    expect(audit.hasFooter, route).toBe(true)
    expect(audit.skippedHeading, route).toBe(false)
    expect(audit.duplicateIds, route).toEqual([])
    expect(audit.missingHashTargets, route).toEqual([])
    expect(audit.brokenLoadedImages, route).toEqual([])
    expect(audit.nestedInteractiveControls, route).toEqual([])
    expect(audit.invalidStructuredData, route).toEqual([])
    expect(audit.duplicateStructuredDataIds, route).toEqual([])
    expect(audit.unnamedControls, route).toEqual([])
    if (route.startsWith("/procedures/") || route.startsWith("/concerns/")) {
      await expect(page.getByRole("heading", { name: "Clinical references" })).toBeVisible()
      const medicalSchemas = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents()
      expect(
        medicalSchemas.some((schema) => schema.includes('"citation"')),
        `Missing clinical citations on ${route}`
      ).toBe(true)
    }
    await expectNoHorizontalOverflow(page, route)
  }

  expect(runtimeErrors).toEqual([])
})

test("unknown routes show a useful custom error page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist")
  expect(response?.status()).toBe(404)
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Back to Home" })).toHaveAttribute(
    "href",
    "https://biromd.com/"
  )
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible()
})
