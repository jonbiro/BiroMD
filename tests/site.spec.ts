import { expect, test, type Locator, type Page } from "@playwright/test"

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

const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/procedures",
  ...procedureSlugs.map((slug) => `/procedures/${slug}`),
  "/gallery",
  "/contact",
  "/locations",
  "/locations/westlake-village",
  "/locations/rancho-cucamonga",
  "/privacy",
  "/notice-of-privacy-practices",
  "/accessibility",
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

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }))
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1)
}

test("primary consultation action is readable in light and dark mode", async ({ page }) => {
  await page.goto("/")
  const cta = page.getByRole("link", { name: "Request Consultation" }).first()
  await expect(cta).toBeVisible()
  expect(await textContrast(cta)).toBeGreaterThanOrEqual(4.5)

  await page.getByRole("button", { name: "Switch to dark mode" }).click()
  await expect(page.locator("html")).toHaveClass(/dark/)
  await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible()
  expect(await textContrast(cta)).toBeGreaterThanOrEqual(4.5)
  await expectNoHorizontalOverflow(page)
})

test("floating navigation exposes every primary link without a menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const navigation = page.getByRole("navigation", { name: "Primary" })
  await expect(navigation).toBeVisible()
  for (const name of ["About", "Services", "Procedures", "Photos", "Offices", "Contact"]) {
    await expect(navigation.getByRole("link", { name, exact: true })).toBeVisible()
  }
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
      navigationInsideShell: shell.contains(navigation),
      navigationBelowTopRow:
        navigationBox.top >= Math.max(brandBox.bottom, actionsBox.bottom) - 1,
      shellContainsNavigation: navigationBox.bottom <= shellBox.bottom + 1,
    }
  })
  expect(mobileHeaderLayout).toEqual({
    shellTouchesViewport: true,
    navigationInsideShell: true,
    navigationBelowTopRow: true,
    shellContainsNavigation: true,
  })

  await page.setViewportSize({ width: 320, height: 700 })
  await page.goto("/")
  const narrowNavigation = page.getByRole("navigation", { name: "Primary" })
  await expect(
    page.locator("[data-header-actions]").getByText("Book", { exact: true })
  ).toBeVisible()
  const labelsFit = await narrowNavigation.getByRole("link").evaluateAll((links) =>
    links.every((link) => link.scrollWidth <= link.clientWidth)
  )
  expect(labelsFit).toBe(true)
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
  await expect(page.getByText("Consult", { exact: true })).toBeVisible()
  await expectNoHorizontalOverflow(page)

  await page.goto("/procedures/ptosis-repair")
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Procedures" })
  ).toHaveAttribute("aria-current", "page")
  const activeLink = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Procedures" })
  expect(await textContrast(activeLink)).toBeGreaterThanOrEqual(4.5)
  await page.getByRole("button", { name: "Switch to dark mode" }).click()
  expect(await textContrast(activeLink)).toBeGreaterThanOrEqual(4.5)
  await expectNoHorizontalOverflow(page)

  await page.goto("/locations/westlake-village")
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Offices" })
  ).toHaveAttribute("aria-current", "page")
})

test("site containers stay fluid and centered between breakpoints", async ({ page }) => {
  await page.setViewportSize({ width: 1257, height: 900 })
  await page.goto("/")

  const container = page.locator("header > .container")
  const box = await container.boundingBox()

  expect(box).not.toBeNull()
  expect(box!.width).toBeGreaterThan(1150)
  expect(Math.abs(box!.x - (1257 - box!.width) / 2)).toBeLessThan(2)
})

test("contact page uses official office request links", async ({ page }) => {
  await page.goto("/contact")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Request a Consultation")
  for (const office of ["Westlake Village", "Rancho Cucamonga"]) {
    await expect(
      page.locator("main").getByRole("link", { name: office, exact: true }).first()
    ).toHaveAttribute("href", /^#schedule-/)
  }
  await expect(page.getByRole("link", { name: "Request at Westlake Village" })).toHaveAttribute(
    "href",
    /solutionreach\.com/
  )
  await expect(page.getByRole("link", { name: "Request at Rancho Cucamonga" })).toHaveAttribute(
    "href",
    "https://www.pacificeyemd.com/request-an-appointment/"
  )
  await expect(page.getByText(/The office will contact you to confirm/)).toBeVisible()
  await expect(page.getByRole("link", { name: "Email Scheduling" })).toHaveAttribute(
    "href",
    /^mailto:info@biromd\.com/
  )
  await expect(page.locator("form")).toHaveCount(0)
})

test("dark contact emergency notice uses its dark surface", async ({ page }) => {
  await page.goto("/contact")
  await page.getByRole("button", { name: "Switch to dark mode" }).click()
  const notice = page.locator("[data-emergency-notice]")
  const background = await notice.evaluate((element) => getComputedStyle(element).backgroundColor)
  expect(luminance(parseRgb(background))).toBeLessThan(0.12)
})

test("gallery labels remain visible without hover", async ({ page }) => {
  await page.goto("/gallery")
  const cases = page.locator("article[id]")
  if ((await cases.count()) === 0) {
    await expect(page.getByRole("heading", { name: "Clinical gallery under review" })).toBeVisible()
    return
  }

  await expect(cases.first().getByText("Before", { exact: true })).toBeVisible()
  await expect(cases.first().getByText("After", { exact: true })).toBeVisible()
  await expect(cases.first().locator("[data-gallery-open]")).toHaveCount(1)

  const title = await cases.first().getByRole("heading", { level: 2 }).first().innerText()
  await cases.first().getByRole("button", { name: /View larger image/ }).click()
  const dialog = page.getByRole("dialog", { name: title })
  await expect(dialog).toBeVisible()
  const modalColors = await dialog.getByRole("heading", { level: 2 }).evaluate((heading) => ({
    foreground: getComputedStyle(heading).color,
    background: getComputedStyle(heading.closest("dialog")!).backgroundColor,
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

test("homepage heading has correct readable text and lazy clinical images load", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Specialized Oculoplastic Care for the Eyes and Face"
  )
  await page.evaluate(() => document.fonts.ready)
  const typography = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector("h1")!).fontFamily,
    outfitLoaded: document.fonts.check('16px "Outfit"'),
    cormorantLoaded: document.fonts.check('16px "Cormorant Garamond"'),
  }))
  expect(typography.body).toContain("Outfit")
  expect(typography.heading).toContain("Cormorant Garamond")
  expect(typography.outfitLoaded).toBe(true)
  expect(typography.cormorantLoaded).toBe(true)

  const clinicalHeading = page.getByRole("heading", {
    name: "Selected Before-and-After Results",
  })
  await clinicalHeading.scrollIntoViewIfNeeded()
  const clinicalImage = clinicalHeading.locator("xpath=ancestor::section").locator("img").first()
  if ((await clinicalImage.count()) > 0) {
    await expect(clinicalImage).toBeVisible()
    await expect
      .poll(() => clinicalImage.evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0)
  }
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

  const firstQuestion = page.locator("details").first()
  await firstQuestion.locator("summary").click()
  await expect(firstQuestion).toHaveAttribute("open", "")

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(schemas.some((schema) => schema.includes('"BreadcrumbList"'))).toBe(true)
  expect(schemas.some((schema) => schema.includes('"FAQPage"'))).toBe(true)

  await page.goto("/locations/rancho-cucamonga")
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText(
    "HomeOfficesRancho Cucamonga"
  )
})

test("every public route has a sound document structure", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const titles = new Set<string>()

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
        unnamedControls,
      }
    })

    expect(audit.title, route).not.toBe("")
    expect(titles.has(audit.title), `Duplicate title on ${route}: ${audit.title}`).toBe(false)
    titles.add(audit.title)
    expect(audit.h1Count, route).toBe(1)
    expect(audit.hasMain, route).toBe(true)
    expect(audit.hasFooter, route).toBe(true)
    expect(audit.skippedHeading, route).toBe(false)
    expect(audit.duplicateIds, route).toEqual([])
    expect(audit.unnamedControls, route).toEqual([])
    await expectNoHorizontalOverflow(page)
  }
})

test("unknown routes show a useful custom error page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist")
  expect(response?.status()).toBe(404)
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/")
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible()
})
