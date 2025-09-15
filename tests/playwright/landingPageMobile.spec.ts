import { test, expect, devices } from "@playwright/test";
import type { Page } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const bookACallSection = "book-a-call-section";
const discoverOurServices = "discover-our-services";

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
});
