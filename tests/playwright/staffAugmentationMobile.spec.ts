import { test, expect, devices } from "@playwright/test";
import type { Page } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const staffAugmentationUrl = "staff-augmentation";
const bookACallSection = "book-a-call-section";

test.describe("Staff Augmentation page in mobile view", () => {
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
    await page.goto(`${baseUrl}/${staffAugmentationUrl}`);
  });

  test("should have title and heading", async () => {
    await expect(page).toHaveTitle(
      "CroCoder | Building Software that Builds Your Business",
    );
    await expect(
      page.getByRole("heading", {
        name: "On-Demand Talent, Working as an Extension of Your Team",
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
    await page.goto(`${baseUrl}/${staffAugmentationUrl}`);
  });

  test("Book a call section from hero", async () => {
    const letsTalkLink = page.getByRole("link", { name: "LET'S TALK" });

    await letsTalkLink.click();

    await expect(page).toHaveURL(
      `${baseUrl}/${staffAugmentationUrl}#${bookACallSection}`,
    );
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });
});
