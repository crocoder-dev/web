import { test, expect } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const bookACallSection = "book-a-call-section";
const discoverOurServices = "discover-our-services";
const blogUrl = "blog";
const contactUrl = "contact";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("should have title and corresponding text", async ({ page }) => {
    await expect(page).toHaveTitle(
      "CroCoder | Building Software that Builds Your Business",
    );
    await expect(page.getByText("More than just developers")).toBeVisible();
  });
});

test.describe("Navigation via links to", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Book a call section", async ({ page }) => {
    const bookACallLink = page.getByRole("link", {
      name: "BOOK A CALL",
      exact: true,
    });

    await bookACallLink.click();

    await expect(page).toHaveURL(`${baseUrl}/#${bookACallSection}`);
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });

  test("Discover our services section", async ({ page }) => {
    const discoverOurServicesLink = page.getByRole("link", {
      name: "DISCOVER OUR SERVICES",
      exact: true,
    });

    await discoverOurServicesLink.click();

    await expect(page).toHaveURL(`${baseUrl}/#${discoverOurServices}`);
    await expect(page.locator(`#${discoverOurServices}`)).toBeInViewport();
  });

  test("how we rebuilt a legacy ui with zero downtime blog post", async ({
    page,
  }) => {
    const caseStudy = page
      .locator("#animation-wrapper section")
      .filter({ hasText: "Expert Led Digital" });

    await caseStudy.scrollIntoViewIfNeeded();
    await expect(caseStudy.getByRole("link")).toBeInViewport();
    await caseStudy.getByRole("link").click();

    await Promise.all([
      page.waitForURL(
        `${baseUrl}/${blogUrl}/how-we-rebuilt-a-legacy-ui-with-zero-downtime`,
      ),
      page.getByText(
        "How We Rebuilt a Legacy UI With Zero Downtime: A Case Study in Component Libraries and Frontend Guidance",
      ),
    ]);
  });

  test("using lago to create a flexible billing system blog post", async ({
    page,
  }) => {
    const caseStudy = page
      .locator("#animation-wrapper section")
      .filter({ hasText: "Product & Platform" });

    await caseStudy.scrollIntoViewIfNeeded();
    await expect(caseStudy.getByRole("link")).toBeInViewport();
    await caseStudy.getByRole("link").click();

    await Promise.all([
      page.waitForURL(
        `${baseUrl}/${blogUrl}/using-lago-to-create-a-flexible-billing-system`,
      ),
      page.getByText("Using Lago to Create a Flexible Billing System"),
    ]);
  });

  test("Contact us page", async ({ page }) => {
    const contactUsLink = page.getByRole("link", {
      name: "Schedule a free DevEx audit",
    });

    await page
      .locator("#animation-wrapper section")
      .filter({ hasText: "Workflow & Release" })
      .scrollIntoViewIfNeeded();
    await expect(contactUsLink).toBeInViewport();
    await contactUsLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${contactUrl}`, { timeout: 10000 }),
      expect(page.getByText("get in touch")).toBeVisible(),
    ]);
  });

  test("migrating an enterprise app from angularjs to react blog post", async ({
    page,
  }) => {
    const caseStudy = page
      .locator("#animation-wrapper section")
      .filter({ hasText: "Team Enablement & Upskilling" });

    await caseStudy.scrollIntoViewIfNeeded();
    await expect(caseStudy.getByRole("link")).toBeInViewport();
    await caseStudy.getByRole("link").click();

    await Promise.all([
      page.waitForURL(
        `${baseUrl}/${blogUrl}/migrating-an-enterprise-app-from-angularjs-to-react`,
      ),
      page.getByText("Migrating an Enterprise App from AngularJS to React"),
    ]);
  });
});
