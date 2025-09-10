import { test, expect, Page, devices } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const forCtosUrl = "for-ctos";
const contactUrl = "contact";
const valuesSection = "values-grid";
const bookACallSection = "book-a-call-section";

test.describe("For CTOs page in mobile view", () => {
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
    await page.goto(`${baseUrl}/${forCtosUrl}`);
  });

  test("should have title and heading", async () => {
    await expect(page).toHaveTitle(
      "CroCoder | Building Software that Builds Your Business",
    );
    await expect(
      page.getByRole("heading", {
        name: "Your Tech Strategy: Delivered, Scaled, and Sustained",
      }),
    ).toBeVisible();
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
    await page.goto(`${baseUrl}/${forCtosUrl}`);
  });

  test("Book a call section from hero", async () => {
    const getStertedLink = page.getByRole("link", { name: "GET STARTED" });

    await getStertedLink.click();

    await expect(page).toHaveURL(
      `${baseUrl}/${forCtosUrl}#${bookACallSection}`,
    );
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });

  test("Book a call section from values section", async () => {
    const bookACallLink = page.locator(`#${valuesSection}`).getByRole("link", {
      name: "Book a call",
    });

    await bookACallLink.click();

    await expect(page).toHaveURL(
      `${baseUrl}/${forCtosUrl}#${bookACallSection}`,
    );
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });

  test("Contact us page from values section", async () => {
    const contactUsLink = page
      .locator(`#${valuesSection}`)
      .getByRole("link", { name: "Contact us" });

    await contactUsLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${contactUrl}`, { timeout: 10000 }),
    ]);

    await expect(
      page.getByRole("heading", { name: "Let’s Talk About Your Project" }),
    ).toBeVisible();
  });
});
