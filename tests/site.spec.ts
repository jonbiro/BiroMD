import { expect, test, type Locator, type Page } from "@playwright/test"

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
  for (const name of ["About", "Services", "Procedures", "Photos", "Contact"]) {
    await expect(navigation.getByRole("link", { name, exact: true })).toBeVisible()
  }
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveCount(0)
  await expectNoHorizontalOverflow(page)

  await page.setViewportSize({ width: 320, height: 700 })
  await page.goto("/")
  const narrowNavigation = page.getByRole("navigation", { name: "Primary" })
  const labelsFit = await narrowNavigation.getByRole("link").evaluateAll((links) =>
    links.every((link) => link.scrollWidth <= link.clientWidth)
  )
  expect(labelsFit).toBe(true)

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
  await expect(page.getByRole("link", { name: "Request at Westlake Village" })).toHaveAttribute(
    "href",
    /solutionreach\.com/
  )
  await expect(page.getByRole("link", { name: "Request at Rancho Cucamonga" })).toHaveAttribute(
    "href",
    "https://www.pacificeyemd.com/request-an-appointment/"
  )
  await expect(page.getByText("A request is not confirmed until the office contacts you.")).toBeVisible()
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

test("key routes render unique headings", async ({ page }) => {
  const routes = [
    ["/about", "Ophthalmic Training. Oculoplastic Focus."],
    ["/services", "Three Care Pathways, One Individual Assessment"],
    ["/procedures", "Understand the Evaluation Before Choosing Treatment"],
    ["/procedures/ptosis-repair", "Ptosis Repair"],
    ["/locations", "Two Offices for In-Person Consultation"],
    ["/notice-of-privacy-practices", "Notices of Privacy Practices"],
  ]

  for (const [route, heading] of routes) {
    await page.goto(route)
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible()
  }
})
