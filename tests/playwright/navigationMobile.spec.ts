import { test, expect, devices } from "@playwright/test";
import type { Page } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const forCtosUrl = "for-ctos";
const blogUrl = "blog";
const contactUrl = "contact";
const staffAugmentationUrl = "staff-augmentation";
const bookACallSection = "book-a-call-section";
const youtubeChannelUrl =
  "https://www.youtube.com/channel/UCWU6cnq4hp4LnunPhP-sAqA";
const linkedInPageUrl = "https://www.linkedin.com/company/crocoderdev";
const mobileYoutubeChannelUrl =
  "https://m.youtube.com/channel/UCWU6cnq4hp4LnunPhP-sAqA";

test.describe("Mobile view navigation via navigation bar to", () => {
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

  test("Home page with logo", async () => {
    await expect(page.getByRole("navigation")).toBeVisible();

    const croCoderLogo = page
      .getByRole("navigation")
      .getByRole("img", { name: "Crocoder Crocodile Logo" });

    await expect(croCoderLogo).toBeVisible();
    await croCoderLogo.click();

    await expect(page).toHaveURL(`${baseUrl}/`);
    await expect(page.getByText("More than just developers")).toBeVisible();
  });

  test("For CTOs page", async () => {
    await expect(page.getByRole("navigation")).toBeVisible();
    await page.locator("#top-line").click();

    const forCtosLink = page
      .locator("#mobile-list")
      .getByRole("link", { name: "For CTOs" });

    await expect(forCtosLink).toBeVisible();
    await forCtosLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${forCtosUrl}`, { timeout: 10000 }),
      expect(page.getByText("Integrated solutions for CTOs")).toBeVisible(),
    ]);
  });

  test("Blog page", async () => {
    await expect(page.getByRole("navigation")).toBeVisible();
    await page.locator("#top-line").click();

    const blogLink = page
      .locator("#mobile-list")
      .getByRole("link", { name: "Blog" });

    await expect(blogLink).toBeVisible();
    await blogLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${blogUrl}`, { timeout: 10000 }),
      expect(page).toHaveTitle("Blog | CroCoder"),
    ]);
  });

  test("Book a call section", async () => {
    await expect(page.getByRole("navigation")).toBeVisible();
    await page.locator("#top-line").click();

    const bookACallLink = page
      .locator("#mobile-list")
      .getByRole("link", { name: "Book a call" });

    await expect(bookACallLink).toBeVisible();
    await bookACallLink.click();

    await expect(page).toHaveURL(`${baseUrl}/#${bookACallSection}`);
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });

  test("Contact us page", async () => {
    await expect(page.getByRole("navigation")).toBeVisible();
    await page.locator("#top-line").click();

    const contactUsLink = page
      .locator("#mobile-list")
      .getByRole("link", { name: "Contact us" });

    await expect(contactUsLink).toBeVisible();

    await Promise.all([
      page.waitForURL(`${baseUrl}/${contactUrl}`),
      contactUsLink.click(),
      expect(page.getByText("get in touch")).toBeVisible(),
    ]);
  });

  test("Contact us page from nav bar", async () => {
    await expect(page.getByRole("navigation")).toBeVisible();

    const contactUsLink = page.getByRole("link", {
      name: "Contact us",
      exact: true,
    });

    await expect(contactUsLink).toBeVisible();
    await contactUsLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${contactUrl}`, { timeout: 10000 }),
      expect(page.getByText("get in touch")).toBeVisible(),
    ]);
  });
});

test.describe("Navigation via footer links in mobile view to", () => {
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

  test("Home page with logo", async () => {
    const croCoderLogo = page.locator(
      'footer >> a >> img[alt="Crocoder Crocodile Logo"]',
    );

    await croCoderLogo.click();

    await expect(page).toHaveURL(`${baseUrl}/`);
    await expect(page.getByText("More than just developers")).toBeVisible();
  });

  test("Home page link", async () => {
    const homeLink = page.locator('footer >> text="Home"');

    await homeLink.click();

    await expect(page).toHaveURL(`${baseUrl}/`);
    await expect(page.getByText("More than just developers")).toBeVisible();
  });

  test("For CTOs page", async () => {
    const forCtosLink = page.locator('footer >> text="For CTOs"');

    await forCtosLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${forCtosUrl}`, { timeout: 10000 }),
      expect(page.getByText("Integrated solutions for CTOs")).toBeVisible(),
    ]);
  });

  test("Staff Augmentation page", async () => {
    const staffAugmentationLink = page.locator(
      'footer >> text="Staff Augmentation"',
    );

    await staffAugmentationLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${staffAugmentationUrl}`, { timeout: 10000 }),
      expect(
        page.getByText("Outcome-Driven Product Engineering"),
      ).toBeVisible(),
    ]);
  });

  test("Blog page", async () => {
    const blogLink = page.locator('footer >> text="Blog"');

    await blogLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${blogUrl}`, { timeout: 10000 }),
      expect(page).toHaveTitle("Blog | CroCoder"),
    ]);
  });

  test("Contact page", async () => {
    const contactLink = page.locator('footer >> text="Contact"');

    await contactLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${contactUrl}`, { timeout: 10000 }),
      expect(page.getByText("get in touch")).toBeVisible(),
    ]);
  });

  test("Youtube channel", async () => {
    const youtubeLink = page.locator(
      `footer >> a[href="${youtubeChannelUrl}"]`,
    );

    await youtubeLink.click();

    const acceptButton = page.getByRole("button", { name: "Accept all" });
    await acceptButton.click();

    await page.waitForURL((url) => url.href.includes("youtube.com/channel"), {
      timeout: 10000,
    });
    await expect(page).toHaveURL(`${mobileYoutubeChannelUrl}`);
  });

  test("LinkedIn page", async () => {
    const linkedInLink = page.locator(`footer >> a[href="${linkedInPageUrl}"]`);

    await linkedInLink.click();

    await Promise.allSettled([
      page.waitForURL(`${linkedInPageUrl}`, { timeout: 10000 }),
    ]);

    const popup = page.locator('button:has-text("Dismiss")');
    if (await popup.isVisible()) {
      await popup.click();
    }

    await expect(page).toHaveURL(`${linkedInPageUrl}`);
  });
});
