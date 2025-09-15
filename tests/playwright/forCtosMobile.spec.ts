import { test, expect, devices } from "@playwright/test";
import type { Page } from "@playwright/test";

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

  test("should have title and corresponding text", async () => {
    await expect(page).toHaveTitle(
      "CroCoder | Building Software that Builds Your Business",
    );
    await expect(page.getByText("Integrated solutions for CTOs")).toBeVisible();
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
      expect(page.getByText("get in touch")).toBeVisible(),
    ]);
  });
});
