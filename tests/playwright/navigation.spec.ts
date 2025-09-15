import { test, expect } from "@playwright/test";

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

test.describe("Navigation via navigation bar to", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Home page with logo", async ({ page }) => {
    await expect(page.getByRole("navigation")).toBeVisible();

    const croCoderLogo = page
      .getByRole("navigation")
      .getByRole("img", { name: "Crocoder Crocodile Logo" });

    await expect(croCoderLogo).toBeVisible();
    await croCoderLogo.click();

    await expect(page).toHaveURL(`${baseUrl}/`);
    await expect(page.getByText("More than just developers")).toBeVisible();
  });

  test("Home page with text", async ({ page }) => {
    await expect(page.getByRole("navigation")).toBeVisible();

    const croCoderText = page
      .getByRole("navigation")
      .getByRole("img", { name: "Crocoder Text Logo" });

    await expect(croCoderText).toBeVisible();
    await croCoderText.click();

    await expect(page).toHaveURL(`${baseUrl}/`);
    await expect(page.getByText("More than just developers")).toBeVisible();
  });

  test("For CTOs page", async ({ page }) => {
    await expect(page.getByRole("navigation")).toBeVisible();

    const forCtosLink = page.getByRole("navigation").getByText("For CTOs");

    await expect(forCtosLink).toBeVisible();
    await forCtosLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${forCtosUrl}`, { timeout: 10000 }),
      expect(page.getByText("Integrated solutions for CTOs")).toBeVisible(),
    ]);
  });

  test("Blog page", async ({ page }) => {
    await expect(page.getByRole("navigation")).toBeVisible();

    const blogLink = page.getByRole("navigation").getByText("Blog");

    await expect(blogLink).toBeVisible();
    await blogLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${blogUrl}`, { timeout: 10000 }),
      expect(page).toHaveTitle("Blog | CroCoder"),
    ]);
  });

  test("Contact us page", async ({ page }) => {
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

  test("Book a call section", async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    await expect(page.getByRole("navigation")).toBeVisible();

    const bookACallLink = page.getByRole("navigation").getByText("Book a call");

    await expect(bookACallLink).toBeVisible();
    await bookACallLink.click();

    await expect(page).toHaveURL(`${baseUrl}/#${bookACallSection}`);
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });
});

test.describe("Navigation via footer links to", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Home page with logo", async ({ page }) => {
    const croCoderLogo = page.locator(
      'footer >> a >> img[alt="Crocoder Crocodile Logo"]',
    );

    await croCoderLogo.click();

    await expect(page).toHaveURL(`${baseUrl}/`);
    await expect(page.getByText("More than just developers")).toBeVisible();
  });

  test("Home page with text", async ({ page }) => {
    const croCoderText = page.locator(
      'footer >> a >> img[alt="Crocoder Text Logo"]',
    );

    await croCoderText.click();

    await expect(page).toHaveURL(`${baseUrl}/`);
    await expect(page.getByText("More than just developers")).toBeVisible();
  });

  test("Home page link", async ({ page }) => {
    const homeLink = page.locator('footer >> text="Home"');

    await homeLink.click();

    await expect(page).toHaveURL(`${baseUrl}/`);
    await expect(page.getByText("More than just developers")).toBeVisible();
  });

  test("For CTOs page", async ({ page }) => {
    const forCtosLink = page.locator('footer >> text="For CTOs"');

    await forCtosLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${forCtosUrl}`, { timeout: 10000 }),
      expect(page.getByText("Integrated solutions for CTOs")).toBeVisible(),
    ]);
  });

  test("Staff Augmentation page", async ({ page }) => {
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

  test("Blog page", async ({ page }) => {
    const blogLink = page.locator('footer >> text="Blog"');

    await blogLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${blogUrl}`, { timeout: 10000 }),
      expect(page).toHaveTitle("Blog | CroCoder"),
    ]);
  });

  test("Contact page", async ({ page }) => {
    const contactLink = page.locator('footer >> text="Contact"');

    await contactLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${contactUrl}`, { timeout: 10000 }),
      expect(page.getByText("get in touch")).toBeVisible(),
    ]);
  });

  test("Youtube channel", async ({ page }) => {
    const youtubeLink = page.locator(
      `footer >> a[href="${youtubeChannelUrl}"]`,
    );

    await youtubeLink.click();

    await Promise.allSettled([
      page.waitForSelector('button:has-text("Accept all")', { timeout: 10000 }),
      page.click('button:has-text("Accept all")'),
      page.waitForURL(`${youtubeChannelUrl}`, { timeout: 10000 }),
      expect(page).toHaveURL(`${youtubeChannelUrl}`),
    ]);
  });

  test("LinkedIn page", async ({ page }) => {
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
