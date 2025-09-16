import { test, expect, devices } from "@playwright/test";
import type { Page } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const bookACallSection = "book-a-call-section";
const discoverOurServices = "discover-our-services";
const blogUrl = "blog";
const contactUrl = "contact";

test.describe("Landing page in mobile view", () => {
  let page: Page;
  let context;
  test.beforeEach(async ({ browser }) => {
    const testDevice = devices["Galaxy S24"];
    context =
      browser.browserType().name() === "firefox"
        ? await browser.newContext({
            viewport: testDevice.viewport,
            userAgent: testDevice.userAgent,
            deviceScaleFactor: testDevice.deviceScaleFactor,
            hasTouch: testDevice.hasTouch,
          })
        : await browser.newContext(testDevice);
    page = await context.newPage();
    await page.goto(baseUrl);
  });

  test("should have title and corresponding text", async () => {
    await expect(page).toHaveTitle(
      "CroCoder | Building Software that Builds Your Business",
    );
    await expect(page.getByText("More than just developers")).toBeVisible();
  });
});

test.describe("Navigation via links in mobile view to", () => {
  let page: Page;
  let context;
  test.beforeEach(async ({ browser }) => {
    const testDevice = devices["Galaxy S24"];
    context =
      browser.browserType().name() === "firefox"
        ? await browser.newContext({
            viewport: testDevice.viewport,
            userAgent: testDevice.userAgent,
            deviceScaleFactor: testDevice.deviceScaleFactor,
            hasTouch: testDevice.hasTouch,
          })
        : await browser.newContext(testDevice);
    page = await context.newPage();
    await page.goto(baseUrl);
  });

  test("Book a call section", async () => {
    const bookACallLink = page.getByRole("link", {
      name: "BOOK A CALL",
      exact: true,
    });

    await bookACallLink.click();

    await expect(page).toHaveURL(`${baseUrl}/#${bookACallSection}`);
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });

  test("Discover our services section", async () => {
    const discoverOurServicesLink = page.getByRole("link", {
      name: "DISCOVER OUR SERVICES",
      exact: true,
    });

    await discoverOurServicesLink.click();

    await expect(page).toHaveURL(`${baseUrl}/#${discoverOurServices}`);
    await expect(page.locator(`#${discoverOurServices}`)).toBeInViewport();
  });

  test("how we rebuilt a legacy ui with zero downtime blog post", async () => {
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

  test("using lago to create a flexible billing system blog post", async () => {
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

  test("Contact us page", async () => {
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

  test("migrating an enterprise app from angularjs to react blog post", async () => {
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
